// Este script é um auxiliar para adicionar o botão de navegação rápida a todas as páginas de bônus

document.addEventListener('DOMContentLoaded', function() {
    // Inserir o script de quick-nav em todas as páginas de bônus
    const htmlFiles = document.querySelectorAll('a[href$=".html"]');
    
    console.log(`Encontradas ${htmlFiles.length} possíveis páginas para atualizar.`);
    
    htmlFiles.forEach(link => {
        const path = link.getAttribute('href');
        
        // Verificar se é uma página de bônus
        if (path.includes('Bônus') || path.includes('Guia_violao')) {
            console.log(`Atualizando página: ${path}`);
            
            // Aqui você implementaria o código para modificar o arquivo HTML
            // Como este é apenas um exemplo ilustrativo, não implementaremos a modificação real
            
            // Em um cenário real, você usaria uma API como FileSystem ou Node.js para ler o arquivo,
            // adicionar a tag de script e salvá-lo novamente
        }
    });
    
    alert('Para adicionar o botão de navegação rápida a todas as páginas de bônus, adicione a seguinte linha antes do fechamento </body> em cada página HTML:\n\n<script src="../../../quick-nav.js"></script>\n\nAjuste os "../" conforme a profundidade da pasta.');
});
