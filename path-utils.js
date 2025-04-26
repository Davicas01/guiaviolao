/**
 * Utilitários para lidar com caminhos relativos no site
 * Adicione este script antes de outros scripts em todas as páginas
 */

// Calcula o caminho relativo para a raiz do site
function getPathToRoot() {
    // Obter o caminho atual (por exemplo: /Bônus%20Exclusivos%20-%20Kit%20Violão%20Profissional/Modo%20Toque%20Agora%20com%20IA/index.html)
    const currentPath = window.location.pathname;
    
    // Dividir o caminho por "/"
    const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
    
    // Se estamos na raiz, não precisamos de ajuste no caminho
    if (pathSegments.length <= 1) {
        return '';
    }
    
    // Caso contrário, precisamos voltar N diretórios (onde N é a profundidade atual)
    const depth = pathSegments.length - 1;
    
    // Criar o caminho relativo para a raiz (ex: "../../" para profundidade 2)
    return '../'.repeat(depth);
}

// Resolve um caminho relativo à raiz do site
function resolvePathFromRoot(path) {
    // Se o caminho já começar com "/" ou "http", ele já é absoluto
    if (path.startsWith('/') || path.startsWith('http')) {
        return path;
    }
    
    return getPathToRoot() + path;
}

// Ajusta todos os links na página para usar caminhos corretos
function fixAllLinks() {
    // Encontrar todos os links (a) e ajustar seus hrefs
    document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="mailto"])').forEach(link => {
        const originalHref = link.getAttribute('href');
        if (!originalHref.startsWith('#')) {
            link.setAttribute('href', resolvePathFromRoot(originalHref));
        }
    });
    
    // Encontrar todos os botões de favoritos e ajustar seus data-path
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        // Manter o data-path original, mas usar o caminho resolvido para operações
        const originalPath = btn.getAttribute('data-path');
        btn.setAttribute('data-resolved-path', resolvePathFromRoot(originalPath));
    });
}

// Executar automaticamente quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', fixAllLinks);
