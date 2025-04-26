document.addEventListener('DOMContentLoaded', function() {
    // Verificar se a função getPathToRoot existe (caso este script carregue antes do script.js)
    if (typeof getPathToRoot !== 'function') {
        window.getPathToRoot = function() {
            const currentPath = window.location.pathname;
            const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
            if (pathSegments.length <= 1) return '';
            const depth = pathSegments.length - 1;
            return '../'.repeat(depth);
        };
    }

    // Usar o caminho para a raiz em todos os links
    const pathToRoot = getPathToRoot();
    
    // Atualizar o template de navegação para usar caminhos absolutos
    const template = `
        <a href="${pathToRoot}index.html#inicio"><i class="fas fa-home"></i> Início</a>
        <a href="${pathToRoot}index.html#metodo"><i class="fas fa-book-open"></i> Método</a>
        <a href="${pathToRoot}index.html#bonus"><i class="fas fa-gift"></i> Bônus</a>
        <a href="${pathToRoot}index.html#favoritos"><i class="fas fa-heart"></i> Favoritos</a>
        <div class="violao-nav-divider"></div>
        <a href="${pathToRoot}Guia_violao/index.html"><i class="fas fa-guitar"></i> Guia Completo</a>
    `;
    
    // Criar o contêiner de navegação flutuante
    const navContainer = document.createElement('div');
    navContainer.className = 'violao-nav-container';
    
    // Criar o botão flutuante
    const navButton = document.createElement('button');
    navButton.className = 'violao-nav-button';
    navButton.innerHTML = '<i class="fas fa-guitar"></i>';
    navButton.setAttribute('aria-label', 'Menu de Navegação');
    
    // Criar o menu dropdown
    const navMenu = document.createElement('div');
    navMenu.className = 'violao-nav-menu';
    
    // Adicionar itens ao menu
    navMenu.innerHTML = template;
    
    // Adicionar botão "Bônus" com submenu
    const bonusButton = document.createElement('a');
    bonusButton.href = "#";
    bonusButton.className = 'violao-nav-dropdown-toggle';
    bonusButton.innerHTML = '<i class="fas fa-gift"></i> Acessar Bônus <i class="fas fa-chevron-down"></i>';
    
    // Criar submenu de bônus
    const bonusSubmenu = document.createElement('div');
    bonusSubmenu.className = 'violao-nav-submenu';
    
    // Lista de bônus disponíveis
    const bonusList = [
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
    
    // Preencher submenu de bônus
    bonusList.forEach(bonus => {
        const bonusLink = document.createElement('a');
        bonusLink.href = `${pathToRoot}${bonus.path}`;
        bonusLink.innerHTML = `<i class="${bonus.icon}"></i> ${bonus.name}`;
        bonusSubmenu.appendChild(bonusLink);
    });
    
    // Adicionar o submenu após o botão de bônus
    navMenu.appendChild(bonusButton);
    navMenu.appendChild(bonusSubmenu);
    
    // Montar a estrutura
    navContainer.appendChild(navButton);
    navContainer.appendChild(navMenu);
    
    // Adicionar ao corpo do documento
    document.body.appendChild(navContainer);
    
    // Adicionar evento para exibir/ocultar o menu
    navButton.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    });
    
    // Adicionar evento para exibir/ocultar o submenu de bônus
    bonusButton.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        bonusSubmenu.classList.toggle('active');
    });
    
    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', function() {
        navMenu.classList.remove('active');
        bonusSubmenu.classList.remove('active');
    });
    
    // Impedir que cliques dentro do menu fechem o próprio menu
    navMenu.addEventListener('click', function(e) {
        // Não propague cliques no menu exceto em links que não são dropdown
        if (!e.target.classList.contains('violao-nav-dropdown-toggle')) {
            e.stopPropagation();
        }
    });
    
    // Adicionar estilos CSS
    addNavigationStyles();
    
    // Função para adicionar estilos CSS
    function addNavigationStyles() {
        if (document.getElementById('violao-nav-styles')) return;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'violao-nav-styles';
        styleSheet.textContent = `
            .violao-nav-container {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 9999;
                font-family: 'Montserrat', 'Inter', 'Segoe UI', sans-serif;
            }
            
            .violao-nav-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: #8B4513;
                color: white;
                border: none;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                z-index: 10;
            }
            
            .violao-nav-button:hover {
                transform: scale(1.1);
                background: #D2691E;
            }
            
            .violao-nav-menu {
                position: absolute;
                bottom: 75px;
                right: 0;
                background: white;
                border-radius: 12px;
                box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
                width: 220px;
                padding: 10px 0;
                display: none;
                flex-direction: column;
                transition: all 0.3s ease;
                max-height: 85vh;
                overflow-y: auto;
            }
            
            .violao-nav-menu.active {
                display: flex;
            }
            
            .violao-nav-menu a {
                padding: 12px 20px;
                color: #333;
                text-decoration: none;
                font-weight: 600;
                font-size: 14px;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .violao-nav-menu a:hover {
                background-color: rgba(139, 69, 19, 0.1);
                color: #8B4513;
            }
            
            .violao-nav-divider {
                height: 1px;
                background: rgba(0,0,0,0.1);
                margin: 8px 0;
            }
            
            .violao-nav-dropdown-toggle {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .violao-nav-submenu {
                display: none;
                flex-direction: column;
                background: #f9f9f9;
                margin: 0;
                max-height: 300px;
                overflow-y: auto;
            }
            
            .violao-nav-submenu.active {
                display: flex;
            }
            
            .violao-nav-submenu a {
                padding-left: 35px;
                font-size: 13px;
            }
            
            @media (max-width: 768px) {
                .violao-nav-container {
                    bottom: 20px;
                    right: 20px;
                }
                
                .violao-nav-button {
                    width: 50px;
                    height: 50px;
                    font-size: 20px;
                }
            }
        `;
        
        document.head.appendChild(styleSheet);
        
        // Verificar se FontAwesome está presente, caso contrário, adicioná-lo
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fontAwesome = document.createElement('link');
            fontAwesome.rel = 'stylesheet';
            fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            document.head.appendChild(fontAwesome);
        }
    }
});
