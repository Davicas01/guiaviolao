// Nome do cache para armazenamento offline
const CACHE_NAME = 'kit-violao-v2';
const STATIC_CACHE_NAME = 'kit-violao-static-v2';
const DYNAMIC_CACHE_NAME = 'kit-violao-dynamic-v2';

// Lista de recursos para cache offline inicial
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/img/icon-192.svg',
  '/img/icon-512.svg',
  '/img/maskable-icon.svg',
  '/img/placeholder.svg',
  '/img/Mockup .png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Recursos críticos que devem sempre estar disponíveis offline
const CRITICAL_ASSETS = [
  '/index.html',
  '/style.css',
  '/script.js',
  '/img/placeholder.svg',
  '/manifest.json'
];

// Instalação do Service Worker e cache inicial
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache estático principal
      caches.open(STATIC_CACHE_NAME)
        .then(cache => {
          console.log('Cache estático inicializado');
          return cache.addAll(urlsToCache);
        }),
      // Cache separado para recursos críticos
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Cache crítico inicializado');
          return cache.addAll(CRITICAL_ASSETS);
        })
    ])
    .then(() => self.skipWaiting())
  );
});

// Ativar o novo Service Worker quando houver atualização
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!currentCaches.includes(cacheName)) {
            // Exclui caches antigos que não estejam na lista atual
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker atualizado para a versão mais recente');
      return self.clients.claim();
    })
  );
});

// Estratégia de Cache: Stale-While-Revalidate para melhor experiência móvel
self.addEventListener('fetch', event => {
  // Ignora requisições para APIs externas ou analytics
  if (!event.request.url.startsWith('http')) return;
  
  // Para conteúdo HTML, usa Network-First para ter conteúdo sempre atualizado
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone a resposta para usar no cache
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(response => {
              return response || caches.match('/index.html');
            });
        })
    );
    return;
  }
  
  // Para arquivos CSS, JS e imagens, usa Stale-While-Revalidate
  if (
    event.request.url.match(/\.(css|js|png|jpg|jpeg|svg|gif)$/) ||
    event.request.url.includes('fonts.googleapis') ||
    event.request.url.includes('cdnjs.cloudflare')
  ) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Atualiza o cache com a nova resposta
              const responseToCache = networkResponse.clone();
              caches.open(DYNAMIC_CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
              return networkResponse;
            })
            .catch(error => {
              console.log('Falha ao buscar recurso:', error);
              // Se for uma imagem, retorna um placeholder
              if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
                return caches.match('/img/placeholder.svg');
              }
            });
          
          // Retorna o cache enquanto a rede é verificada em segundo plano
          return cachedResponse || fetchPromise;
        })
    );
    return;
  }
  
  // Para outras solicitações, usa Cache First
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna do cache se disponível
        }
        
        // Caso contrário, vai para a rede
        return fetch(event.request.clone())
          .then(response => {
            // Se a resposta não for válida, apenas retorna-a
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Caso contrário, armazena no cache dinâmico
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE_NAME)
              .then(cache => {
                if (!event.request.url.includes('?')) {
                  cache.put(event.request, responseToCache);
                }
              });
            
            return response;
          })
          .catch(() => {
            // Se a rede falhar, tenta servir uma página offline
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Gerencia o limite de tamanho do cache dinâmico
self.addEventListener('message', event => {
  if (event.data.action === 'trimCache') {
    trimCache(DYNAMIC_CACHE_NAME, 50); // Limita a 50 itens
  }
});

// Função para limitar o tamanho do cache
function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(() => trimCache(cacheName, maxItems));
      }
    });
  });
}

// Evento de sincronização em background quando a conexão é reestabelecida
self.addEventListener('sync', event => {
  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites());
  }
});

// Função para sincronizar favoritos quando estiver online
async function syncFavorites() {
  // Implementação para sincronizar dados quando online
  try {
    const db = await openDatabase();
    const pendingItems = await db.getAll('sync-pending');
    
    // Processa itens pendentes
    if (pendingItems.length > 0) {
      console.log('Sincronizando dados pendentes...');
      // Aqui você implementaria a sincronização real com um servidor
    }
  } catch (error) {
    console.error('Erro na sincronização:', error);
  }
}

// Função para abrir o banco de dados IndexedDB para sincronização offline
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('kit-violao-offline', 1);
    
    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('sync-pending')) {
        db.createObjectStore('sync-pending', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = event => resolve(event.target.result);
    request.onerror = event => reject(event.target.error);
  });
}

// Gerencia notificações push
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Nova atualização disponível!',
      icon: '/img/icon-192.svg',
      badge: '/img/badge-icon.png',
      vibrate: [100, 50, 100, 50, 100],
      data: {
        url: data.url || '/',
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Ver agora',
          icon: '/img/checkmark.png'
        },
        {
          action: 'close',
          title: 'Depois',
          icon: '/img/xmark.png'
        },
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(
        data.title || 'Kit Violão Profissional', 
        options
      )
    );
  }
});

// Evento que acontece quando o usuário clica em uma notificação
self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const action = event.action;
  
  if (action === 'close') {
    notification.close();
  } else {
    // Abre a janela do aplicativo no URL especificado
    event.waitUntil(
      clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      })
      .then(clientList => {
        // Verifica se já há uma janela/aba aberta
        for (let client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(notification.data.url);
            client.focus();
            return;
          }
        }
        
        // Se não houver uma janela aberta, abra uma nova
        if (clients.openWindow) {
          return clients.openWindow(notification.data.url);
        }
      })
    );
    
    notification.close();
  }
});