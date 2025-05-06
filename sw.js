// Nome do cache para armazenamento offline
const CACHE_NAME = 'domine-violao-v3';
const STATIC_CACHE_NAME = 'domine-violao-static-v3';
const DYNAMIC_CACHE_NAME = 'domine-violao-dynamic-v3';

// Lista de recursos para cache offline inicial - usando caminhos relativos
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './img/icon-192.svg',
  './img/icon-512.svg',
  './img/maskable-icon.svg',
  './img/placeholder.svg',
  './img/Mockup .png',
  './img/logo nova.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Recursos críticos que devem sempre estar disponíveis offline
const CRITICAL_ASSETS = [
  './index.html',
  './style.css',
  './script.js',
  './img/placeholder.svg',
  './img/logo nova.png',
  './manifest.json'
];

// Instalação do Service Worker e cache inicial
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache estático principal
      caches.open(STATIC_CACHE_NAME)
        .then(cache => {
          console.log('Cache estático inicializado');
          return cache.addAll(urlsToCache).catch(error => {
            console.error('Erro ao adicionar recursos ao cache estático:', error);
            // Tenta continuar mesmo com erro em alguns recursos
            return Promise.resolve();
          });
        }),
      // Cache separado para recursos críticos
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Cache crítico inicializado');
          return cache.addAll(CRITICAL_ASSETS).catch(error => {
            console.error('Erro ao adicionar recursos críticos ao cache:', error);
            // Continua mesmo com erro pois tentaremos novamente no próximo evento activate
            return Promise.resolve();
          });
        })
    ])
    .then(() => self.skipWaiting())
    .catch(error => {
      console.error('Erro durante a instalação do service worker:', error);
      // Continua mesmo com erro para permitir atualização posterior
      return self.skipWaiting();
    })
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
    })
    .then(() => {
      console.log('Service Worker atualizado para a versão mais recente');
      return self.clients.claim();
    })
    .catch(error => {
      console.error('Erro durante ativação do service worker:', error);
      // Tenta continuar mesmo com erro
      return self.clients.claim();
    })
  );
});

// Estratégia de Cache: Stale-While-Revalidate para melhor experiência móvel
self.addEventListener('fetch', event => {
  // Ignora requisições para APIs externas ou analytics
  if (!event.request.url.startsWith('http')) return;
  
  // Para conteúdo HTML, usa Network-First para ter conteúdo sempre atualizado
  if (event.request.headers.get('Accept') && event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone a resposta para usar no cache
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseClone);
            })
            .catch(err => console.error('Erro ao salvar HTML no cache:', err));
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(response => {
              return response || caches.match('./index.html');
            })
            .catch(error => {
              console.error('Erro ao recuperar HTML do cache:', error);
              // Tenta entregar a página inicial como fallback
              return caches.match('./index.html');
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
              if (networkResponse.ok) {
                const responseToCache = networkResponse.clone();
                caches.open(DYNAMIC_CACHE_NAME)
                  .then(cache => cache.put(event.request, responseToCache))
                  .catch(err => console.error('Erro ao atualizar recurso no cache:', err));
              }
              return networkResponse;
            })
            .catch(error => {
              console.log('Falha ao buscar recurso:', error);
              // Se for uma imagem, retorna um placeholder
              if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
                return caches.match('./img/placeholder.svg');
              }
              // Para outros recursos, deixa o erro ser propagado
              throw error;
            });
          
          // Retorna o cache enquanto a rede é verificada em segundo plano
          return cachedResponse || fetchPromise;
        })
        .catch(error => {
          console.error('Erro no tratamento de recurso estático:', error);
          if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return caches.match('./img/placeholder.svg');
          }
          // Retorna erro para outros recursos
          throw error;
        })
    );
    return;
  }

  // Para outros recursos, usa Network-First mais simples
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Não cacheia respostas com erro
        if(!response || response.status !== 200) {
          return response;
        }
        
        // Clone a resposta para usar no cache
        const responseClone = response.clone();
        caches.open(DYNAMIC_CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseClone);
          })
          .catch(err => console.error('Erro ao cachear recurso:', err));
          
        return response;
      })
      .catch(error => {
        return caches.match(event.request)
          .catch(err => {
            console.error('Erro ao buscar no cache:', err);
            throw error;
          });
      })
  );
});

// Função para limitar o tamanho do cache
function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0])
          .then(() => trimCache(cacheName, maxItems))
          .catch(err => console.error('Erro ao limitar o tamanho do cache:', err));
      }
    });
  }).catch(err => console.error('Erro ao abrir cache para limitar tamanho:', err));
}

// Função para sincronizar favoritos quando estiver online
async function syncFavorites() {
  // Implementação para sincronizar dados quando online
  try {
    const db = await openDatabase();
    const pendingItems = await db.getAll('sync-pending');
    
    // Processa itens pendentes
    if (pendingItems.length > 0) {
      console.log('Sincronizando dados pendentes...');
      // Implementação real da sincronização:
      // Por enquanto apenas mantemos um registro dos itens pendentes
      console.log(`${pendingItems.length} itens para sincronizar`);
      
      // Aqui você implementaria a sincronização real com um servidor
      // Por exemplo: fetch('./api/sync', { method: 'POST', body: JSON.stringify(pendingItems) });
      
      // Após sincronização bem-sucedida, limpar os itens pendentes
      // await db.clear('sync-pending');
    }
  } catch (error) {
    console.error('Erro na sincronização:', error);
  }
}

// Função para abrir o banco de dados IndexedDB (simulada)
async function openDatabase() {
  // Simulação simples para o exemplo
  return {
    getAll: async (storeName) => {
      // Retorna array vazio para simular que não há itens pendentes
      return [];
    },
    clear: async (storeName) => {
      // Simulação da limpeza do armazenamento
      return true;
    }
  };
}

// Ouvinte para o evento sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites());
  }
});

// Ouvinte para notificações push
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Novidades do Domine o Violão!';
  const options = {
    body: data.body || 'Da Primeira Nota à Sua Primeira Música - Confira as novidades no seu aplicativo!',
    icon: './img/logo nova.png',
    badge: './img/logo nova.png'
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
      .catch(err => console.error('Erro ao mostrar notificação:', err))
  );
});

// Ouvinte para cliques em notificações
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({type: 'window'})
      .then(windowClients => {
        // Se já tiver uma janela aberta, foco nela
        if (windowClients.length > 0) {
          windowClients[0].focus();
        } else {
          // Caso contrário, abre uma nova
          clients.openWindow('./index.html');
        }
      })
      .catch(err => console.error('Erro ao tratar clique na notificação:', err))
  );
});