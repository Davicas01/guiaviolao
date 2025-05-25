/**
 * Script para injetar automaticamente o botão de navegação em todas as páginas HTML
 * Para usar: execute este script uma vez em cada pasta que contém arquivos HTML
 */

// Lista de todos os arquivos HTML no diretório atual e subdiretórios
const fs = require('fs');
const path = require('path');

// Função para encontrar todos os arquivos HTML recursivamente
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (path.extname(file).toLowerCase() === '.html') {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Obter caminhos relativos
function getRelativePath(from, to) {
    return path.relative(path.dirname(from), to).replace(/\\/g, '/');
}

// Injetar o script em cada arquivo HTML
function injectScript(htmlFiles, scriptPath) {
    const scriptToInject = '<script src="{path}"></script>';
    
    htmlFiles.forEach(file => {
        console.log(`Processando: ${file}`);
        let content = fs.readFileSync(file, 'utf8');
        
        // Verificar se o script já está incluído
        if (content.includes('violao-nav.js')) {
            console.log(`- Script já incluído em ${file}`);
            return;
        }
        
        // Calcular caminho relativo para o script
        const relativePath = getRelativePath(file, scriptPath);
        
        // Substituir </body> pela inclusão do script + </body>
        const injectedScript = scriptToInject.replace('{path}', relativePath);
        content = content.replace('</body>', `    ${injectedScript}\n</body>`);
        
        // Salvar arquivo modificado
        fs.writeFileSync(file, content);
        console.log(`- Script injetado em ${file}`);
    });
}

// Diretório base
const baseDir = __dirname;
const scriptPath = path.join(baseDir, 'violao-nav.js');

// Encontrar todos os arquivos HTML
const htmlFiles = findHtmlFiles(baseDir);
console.log(`Encontrados ${htmlFiles.length} arquivos HTML`);

// Injetar o script em cada arquivo
injectScript(htmlFiles, scriptPath);
console.log('Processo concluído!');
