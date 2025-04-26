// Kit Violão Profissional - PWA Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const favoritesContainer = document.getElementById('favoritesContainer');
    const installPrompt = document.getElementById('installPrompt');
    const installButton = document.getElementById('installButton');
    const closePromptButton = document.getElementById('closePromptButton');
    
    // Variáveis para o prompt de instalação
    let deferredPrompt;
    
    // === NAVEGAÇÃO ===
    
    // Menu Mobile Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animar ícone do menu
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].classList.toggle('rotate-45');
            bars[1].classList.toggle('opacity-0');
            bars[2].classList.toggle('rotate-negative-45');
        });
    }
    
    // Links de navegação ativos
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remover classe ativa de todos os links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Adicionar classe ativa ao link clicado
            this.classList.add('active');
            
            // Fechar menu mobile ao clicar
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Destacar links de navegação com base na seção visível
    window.addEventListener('scroll', highlightNavOnScroll);
    
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section');
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // === GESTÃO DE FAVORITOS ===
    
    // Carregar favoritos do localStorage
    function loadFavorites() {
        const favorites = getFavoritesFromStorage();
        
        // Atualizar aparência dos botões de favoritos
        favoriteButtons.forEach(btn => {
            const path = btn.dataset.path;
            if (favorites.includes(path)) {
                markAsFavorite(btn);
            }
        });
        
        // Renderizar seção de favoritos
        renderFavoritesSection(favorites);
    }
    
    // Obter favoritos do localStorage
    function getFavoritesFromStorage() {
        const favoritesJSON = localStorage.getItem('favorites');
        return favoritesJSON ? JSON.parse(favoritesJSON) : [];
    }
    
    // Salvar favoritos no localStorage
    function saveFavoritesToStorage(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    // Adicionar ou remover favorito
    function toggleFavorite(path, btn) {
        let favorites = getFavoritesFromStorage();
        
        if (favorites.includes(path)) {
            // Remover dos favoritos
            favorites = favorites.filter(item => item !== path);
            btn.innerHTML = '<i class="far fa-heart"></i>';
            btn.classList.remove('active');
        } else {
            // Adicionar aos favoritos
            favorites.push(path);
            markAsFavorite(btn);
        }
        
        saveFavoritesToStorage(favorites);
        renderFavoritesSection(favorites);
    }
    
    // Marcar botão como favorito
    function markAsFavorite(btn) {
        btn.innerHTML = '<i class="fas fa-heart"></i>';
        btn.classList.add('active');
    }
    
    // Renderizar seção de favoritos
    function renderFavoritesSection(favorites) {
        if (!favoritesContainer) return;
        
        if (favorites.length === 0) {
            // Mostrar mensagem de "sem favoritos"
            favoritesContainer.innerHTML = `
                <div class="no-favorites">
                    <p>Você ainda não tem favoritos.</p>
                    <p>Marque materiais como favoritos clicando no ícone <i class="far fa-heart"></i> nos módulos.</p>
                </div>
            `;
            return;
        }
        
        // Construir cards de favoritos
        let favoritesHTML = '';
        
        favorites.forEach(path => {
            // Encontrar o botão de favorito correspondente para obter informações
            const relatedBtn = Array.from(favoriteButtons).find(btn => btn.dataset.path === path);
            
            if (relatedBtn) {
                // Extrair informações do módulo
                const moduleCard = relatedBtn.closest('.module-card');
                const title = moduleCard.querySelector('h3').textContent;
                const icon = moduleCard.querySelector('.module-icon').textContent;
                
                // Criar card de favorito
                favoritesHTML += `
                    <div class="module-card">
                        <div class="module-header">
                            <div class="module-icon">${icon}</div>
                            <h3>${title}</h3>
                        </div>
                        <a href="${path}" class="module-link">
                            Acessar
                            <span class="arrow">→</span>
                        </a>
                        <button class="favorite-btn active" data-path="${path}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                `;
            }
        });
        
        favoritesContainer.innerHTML = favoritesHTML;
        
        // Adicionar eventos aos botões de favorito na seção de favoritos
        const favoriteSectionBtns = favoritesContainer.querySelectorAll('.favorite-btn');
        favoriteSectionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const path = this.dataset.path;
                
                // Encontrar o botão original também e atualizar sua aparência
                const originalBtn = Array.from(favoriteButtons).find(b => b.dataset.path === path);
                
                toggleFavorite(path, this);
                
                if (originalBtn) {
                    if (this.classList.contains('active')) {
                        markAsFavorite(originalBtn);
                    } else {
                        originalBtn.innerHTML = '<i class="far fa-heart"></i>';
                        originalBtn.classList.remove('active');
                    }
                }
            });
        });
    }
    
    // Adicionar evento de clique aos botões de favorito
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const path = this.dataset.path;
            toggleFavorite(path, this);
        });
    });
    
    // === INSTALAÇÃO DO PWA ===
    
    // Capturar evento de instalação
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevenir que o Chrome mostre o prompt automaticamente
        e.preventDefault();
        
        // Salvar o evento para uso posterior
        deferredPrompt = e;
        
        // Mostrar prompt personalizado após 5 segundos
        setTimeout(() => {
            if (!localStorage.getItem('installPromptDismissed')) {
                installPrompt.classList.add('active');
            }
        }, 5000);
    });
    
    // Botão de instalação
    if (installButton) {
        installButton.addEventListener('click', async () => {
            // Esconder prompt personalizado
            installPrompt.classList.remove('active');
            
            // Mostrar prompt nativo do navegador
            if (deferredPrompt) {
                deferredPrompt.prompt();
                
                // Aguardar usuário responder ao prompt
                const { outcome } = await deferredPrompt.userChoice;
                
                // Resultado: 'accepted' ou 'dismissed'
                console.log(`Instalação ${outcome}`);
                
                // Limpar referência
                deferredPrompt = null;
            }
        });
    }
    
    // Botão para fechar prompt
    if (closePromptButton) {
        closePromptButton.addEventListener('click', () => {
            installPrompt.classList.remove('active');
            
            // Lembrar que o usuário dispensou o prompt
            localStorage.setItem('installPromptDismissed', 'true');
        });
    }
    
    // Verificar se o app já está instalado
    window.addEventListener('appinstalled', () => {
        // Esconder prompt
        installPrompt.classList.remove('active');
        
        // Limpar referência
        deferredPrompt = null;
        
        console.log('PWA instalado com sucesso');
    });
    
    // === MODO ESCURO ===
    
    // Verificar preferência do usuário
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Verificar configuração salva
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    // Adicionar toggle de tema no footer
    const footer = document.querySelector('footer .container');
    if (footer) {
        const themeToggle = document.createElement('button');
        themeToggle.classList.add('theme-toggle', 'btn', 'text-btn');
        themeToggle.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i> Modo claro' 
            : '<i class="fas fa-moon"></i> Modo escuro';
        footer.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Atualizar texto do botão
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo claro';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo escuro';
            }
        });
    }
    
    // === INICIALIZAÇÃO ===
    
    // Carregar favoritos
    loadFavorites();
    
    // Destacar link de navegação inicial
    highlightNavOnScroll();
});
// Funcionalidade para o botão de navegação flutuante
document.addEventListener('DOMContentLoaded', function() {
    const quickNavToggle = document.getElementById('quickNavToggle');
    const quickNavMenu = document.querySelector('.quick-nav-menu');
    
    if (quickNavToggle) {
        quickNavToggle.addEventListener('click', function() {
            quickNavMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.quick-nav') && quickNavMenu.classList.contains('active')) {
            quickNavMenu.classList.remove('active');
        }
    });
    
    // Verificar se estamos em uma página de bônus
    const isSubpage = window.location.pathname.includes('/Bônus Exclusivos');
    
    // Se estamos numa subpágina, verificar se existe botão de voltar
    if (isSubpage) {
        const hasBackButton = document.querySelector('.back-button');
        
        // Se não existir botão de voltar, adicionar
        if (!hasBackButton) {
            const header = document.querySelector('header') || document.body.firstElementChild;
            
            // Criar botão de voltar
            const backButton = document.createElement('a');
            backButton.className = 'back-button';
            backButton.href = findPathToIndex();
            backButton.innerHTML = '<i class="fas fa-home"></i> Voltar à Página Inicial';
            
            // Inserir no início do documento
            if (header) {
                header.insertAdjacentElement('afterbegin', backButton);
            } else {
                document.body.insertAdjacentElement('afterbegin', backButton);
            }
        }
    }
    
    // Função para encontrar o caminho relativo para o index.html
    function findPathToIndex() {
        const pathSegments = window.location.pathname.split('/');
        const depth = pathSegments.filter(segment => segment.length > 0).length;
        
        // Construir o caminho relativo baseado na profundidade
        if (depth <= 1) return './index.html';
        
        let path = '';
        for (let i = 0; i < depth - 1; i++) {
            path += '../';
        }
        
        return path + 'index.html';
    }
});