document.addEventListener('DOMContentLoaded', function() {
    // Criar o elemento de navegação flutuante
    function createQuickNav() {
        // Verificar se já existe um quick-nav na página
        if (document.querySelector('.quick-nav')) {
            return;
        }

        const quickNav = document.createElement('div');
        quickNav.className = 'quick-nav';
        
        // HTML do botão e menu
        quickNav.innerHTML = `
            <button id="quickNavToggle" class="quick-nav-toggle">
                <i class="fas fa-guitar"></i>
            </button>
            <div class="quick-nav-menu">
                <a href="${getPathToRoot()}index.html"><i class="fas fa-home"></i> Tela Principal</a>
                <a href="${getPathToRoot()}Guia_violao/index.html"><i class="fas fa-book-open"></i> Guia Violão</a>
                <a href="#" id="quickNavBonus"><i class="fas fa-gift"></i> Bônus Exclusivos</a>
            </div>
        `;
        
        document.body.appendChild(quickNav);
        
        // Configurar eventos
        setupQuickNavEvents();
        loadBonusList();
    }
    
    // Configurar os eventos do menu
    function setupQuickNavEvents() {
        const quickNavToggle = document.getElementById('quickNavToggle');
        const quickNavMenu = document.querySelector('.quick-nav-menu');
        
        if (quickNavToggle) {
            quickNavToggle.addEventListener('click', function() {
                quickNavMenu.classList.toggle('active');
            });
        }
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.quick-nav') && quickNavMenu && quickNavMenu.classList.contains('active')) {
                quickNavMenu.classList.remove('active');
            }
        });
        
        // Configurar botão de bônus para mostrar submenu
        const bonusButton = document.getElementById('quickNavBonus');
        if (bonusButton) {
            bonusButton.addEventListener('click', function(e) {
                e.preventDefault();
                const bonusSubmenu = document.getElementById('bonusSubmenu');
                if (bonusSubmenu) {
                    bonusSubmenu.classList.toggle('active');
                }
            });
        }
    }
    
    // Carregar lista de bônus disponíveis
    function loadBonusList() {
        const bonuses = [
            { name: "Checklist Interativo", path: "Bônus Exclusivos - Kit Violão Profissional/Checklist Interativo - 3 Dias/index.html", icon: "fas fa-tasks" },
            { name: "Desafio Anti-Pestana", path: "Bônus Exclusivos - Kit Violão Profissional/Desafio Anti-Pestana/index.html", icon: "fas fa-hand-rock" },
            { name: "Gerador de Acordes", path: "Bônus Exclusivos - Kit Violão Profissional/Gerador de Acordes Aleatórios/index.html", icon: "fas fa-random" },
            { name: "Mapa dos Acordes", path: "Bônus Exclusivos - Kit Violão Profissional/Mapa Interativo dos Acordes/index.html", icon: "fas fa-map-marked-alt" },
            { name: "Destravando os Dedos", path: "Bônus Exclusivos - Kit Violão Profissional/Mini-curso Destravando os Dedos/index.html", icon: "fas fa-hand-sparkles" },
            { name: "Ritmo Guiado", path: "Bônus Exclusivos - Kit Violão Profissional/Modo Ritmo Guiado/index.html", icon: "fas fa-heartbeat" },
            { name: "Toque com IA", path: "Bônus Exclusivos - Kit Violão Profissional/Modo Toque Agora com IA/index.html", icon: "fas fa-robot" },
            { name: "Cifras em PDF", path: "Bônus Exclusivos - Kit Violão Profissional/Pack com 1.000 Cifras em PDF Interativo/index.html", icon: "fas fa-file-pdf" },
            { name: "Planner com IA", path: "Bônus Exclusivos - Kit Violão Profissional/Planner Inteligente com IA/index.html", icon: "fas fa-calendar-alt" },
            { name: "Jogo de Treino", path: "Bônus Exclusivos - Kit Violão Profissional/Jogo de Treino Musical/index.html", icon: "fas fa-gamepad" }
        ];
        
        // Criar submenu para bônus
        const bonusSubmenu = document.createElement('div');
        bonusSubmenu.id = 'bonusSubmenu';
        bonusSubmenu.className = 'quick-nav-submenu';
        
        const submenuHTML = bonuses.map(bonus => {
            return `<a href="${getPathToRoot()}${bonus.path}"><i class="${bonus.icon}"></i> ${bonus.name}</a>`;
        }).join('');
        
        bonusSubmenu.innerHTML = submenuHTML;
        
        // Adicionar submenu ao menu principal
        const bonusButton = document.getElementById('quickNavBonus');
        if (bonusButton) {
            bonusButton.parentNode.insertBefore(bonusSubmenu, bonusButton.nextSibling);
        }
    }
    
    // Determinar o caminho relativo para a raiz do projeto
    function getPathToRoot() {
        // Conta quantos níveis de diretório estamos abaixo da raiz
        const pathSegments = window.location.pathname.split('/');
        const depth = pathSegments.filter(segment => segment.length > 0 && !segment.includes('.')).length;
        
        // Se estamos na raiz ou apenas um nível abaixo
        if (depth <= 1) return './';
        
        // Caso contrário, calculamos quantos "../" precisamos para voltar à raiz
        let path = '';
        for (let i = 0; i < depth - 1; i++) {
            path += '../';
        }
        
        return path;
    }
    
    // Adicionar estilos CSS
    function addQuickNavStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = getPathToRoot() + 'quick-nav.css';
        document.head.appendChild(link);
        
        // Adicionar também FontAwesome se não estiver presente
        if (!document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]')) {
            const fontAwesome = document.createElement('link');
            fontAwesome.rel = 'stylesheet';
            fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            document.head.appendChild(fontAwesome);
        }
    }
    
    // Inicializar
    addQuickNavStyles();
    createQuickNav();
});
