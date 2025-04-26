document.addEventListener('DOMContentLoaded', function() {
    // Simulando um banco de dados de cifras
    const cifrasData = generateCifrasDatabase();
    let currentPage = 1;
    const itemsPerPage = 12;
    let filteredCifras = [...cifrasData];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Carregar dados iniciais
    renderCifras();
    updatePagination();
    
    // Event listeners para os botões de tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(this.dataset.tab).classList.add('active');
            
            if (this.dataset.tab === 'favorites') {
                renderFavorites();
            }
        });
    });
    
    // Pesquisa e filtragem
    document.getElementById('searchBtn').addEventListener('click', function() {
        filterCifras();
    });
    
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterCifras();
        }
    });
    
    document.getElementById('genreFilter').addEventListener('change', filterCifras);
    document.getElementById('difficultyFilter').addEventListener('change', filterCifras);
    
    // Paginação
    document.getElementById('nextPage').addEventListener('click', function() {
        if (currentPage < Math.ceil(filteredCifras.length / itemsPerPage)) {
            currentPage++;
            renderCifras();
            updatePagination();
        }
    });
    
    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderCifras();
            updatePagination();
        }
    });
    
    // Modal de visualização PDF
    const modal = document.getElementById('pdfViewer');
    document.getElementById('closePdfModal').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Função para gerar o banco de dados de cifras
    function generateCifrasDatabase() {
        const genres = ['mpb', 'rock', 'sertanejo', 'pop', 'gospel', 'reggae'];
        const difficulties = ['iniciante', 'intermediario', 'avancado'];
        const artists = [
            'Legião Urbana', 'Roberto Carlos', 'Tim Maia', 'Marilia Mendonça', 'Jorge & Mateus',
            'Caetano Veloso', 'Gilberto Gil', 'Chitãozinho & Xororó', 'Charlie Brown Jr.',
            'Raul Seixas', 'Djavan', 'Luan Santana', 'Anavitória', 'Tiago Iorc', 'Ed Sheeran',
            'Adele', 'Bob Marley', 'Beatles', 'Queen', 'Linkin Park', 'Coldplay'
        ];
        const songPrefixes = [
            'Amor', 'Coração', 'Vida', 'Sol', 'Lua', 'Céu', 'Mar', 'Estrela', 'Sonho', 
            'Flor', 'Tempo', 'Saudade', 'Caminho', 'Noite', 'Dia', 'Alma', 'Destino'
        ];
        const songSuffixes = [
            'da Minha Vida', 'de Verão', 'Eterno', 'Perdido', 'Sem Fim', 'Azul', 
            'Verdadeiro', 'Distante', 'Perfeito', 'de Cristal', 'em Chamas', 'Dourado'
        ];
        
        const cifras = [];
        
        // Gerar 1000 cifras
        for (let i = 0; i < 1000; i++) {
            const genre = genres[Math.floor(Math.random() * genres.length)];
            const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
            const artist = artists[Math.floor(Math.random() * artists.length)];
            
            // Gerar título da música
            let title;
            const titleType = Math.floor(Math.random() * 3);
            if (titleType === 0) {
                title = `${songPrefixes[Math.floor(Math.random() * songPrefixes.length)]} ${songSuffixes[Math.floor(Math.random() * songSuffixes.length)]}`;
            } else if (titleType === 1) {
                title = songPrefixes[Math.floor(Math.random() * songPrefixes.length)];
            } else {
                title = `${songPrefixes[Math.floor(Math.random() * songPrefixes.length)]} & ${songPrefixes[Math.floor(Math.random() * songPrefixes.length)]}`;
            }
            
            cifras.push({
                id: i + 1,
                title: title,
                artist: artist,
                genre: genre,
                difficulty: difficulty,
                pdfUrl: `cifras/cifra${i + 1}.pdf`, // URL fictícia
                thumbnailUrl: `https://picsum.photos/id/${(i % 100) + 100}/300/200` // Imagem aleatória
            });
        }
        
        return cifras;
    }
    
    // Função para filtrar cifras conforme os critérios
    function filterCifras() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const genre = document.getElementById('genreFilter').value;
        const difficulty = document.getElementById('difficultyFilter').value;
        
        filteredCifras = cifrasData.filter(cifra => {
            // Aplicar filtro de busca
            const matchesSearch = 
                cifra.title.toLowerCase().includes(searchTerm) ||
                cifra.artist.toLowerCase().includes(searchTerm) ||
                cifra.genre.toLowerCase().includes(searchTerm);
                
            // Aplicar filtro de gênero se selecionado
            const matchesGenre = genre === '' || cifra.genre === genre;
            
            // Aplicar filtro de dificuldade se selecionado
            const matchesDifficulty = difficulty === '' || cifra.difficulty === difficulty;
            
            return matchesSearch && matchesGenre && matchesDifficulty;
        });
        
        currentPage = 1;
        updateResultCount();
        renderCifras();
        updatePagination();
    }
    
    // Função para atualizar a contagem de resultados
    function updateResultCount() {
        document.getElementById('resultCount').textContent = filteredCifras.length;
    }
    
    // Função para renderizar as cifras na visualização atual
    function renderCifras() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentCifras = filteredCifras.slice(startIndex, endIndex);
        
        // Renderizar na visualização em grade
        const gridContainer = document.querySelector('.cifra-grid');
        gridContainer.innerHTML = '';
        
        currentCifras.forEach(cifra => {
            const card = document.createElement('div');
            card.className = 'cifra-card';
            
            // Definir classe de dificuldade
            let difficultyClass = '';
            let difficultyText = '';
            
            if (cifra.difficulty === 'iniciante') {
                difficultyClass = 'difficulty-easy';
                difficultyText = 'Iniciante';
            } else if (cifra.difficulty === 'intermediario') {
                difficultyClass = 'difficulty-medium';
                difficultyText = 'Intermediário';
            } else {
                difficultyClass = 'difficulty-hard';
                difficultyText = 'Avançado';
            }
            
            // Verificar se está nos favoritos
            const isFavorite = favorites.some(fav => fav.id === cifra.id);
            
            card.innerHTML = `
                <div class="cifra-thumbnail">
                    <img src="${cifra.thumbnailUrl}" alt="${cifra.title}">
                    <div class="cifra-overlay">
                        <div class="cifra-actions">
                            <button onclick="viewPdf(${cifra.id})"><i class="fas fa-eye"></i></button>
                            <button onclick="toggleFavorite(${cifra.id})"><i class="fas ${isFavorite ? 'fa-star' : 'far fa-star'}"></i></button>
                            <button onclick="downloadPdf(${cifra.id})"><i class="fas fa-download"></i></button>
                        </div>
                    </div>
                </div>
                <div class="cifra-info">
                    <h3 class="cifra-title">${cifra.title}</h3>
                    <p class="cifra-artist">${cifra.artist}</p>
                    <div class="cifra-meta">
                        <span class="cifra-genre">${capitalizeFirstLetter(cifra.genre)}</span>
                        <span class="cifra-difficulty ${difficultyClass}">${difficultyText}</span>
                    </div>
                </div>
            `;
            
            gridContainer.appendChild(card);
        });
        
        // Renderizar na visualização em lista
        const tableBody = document.getElementById('cifraTableBody');
        tableBody.innerHTML = '';
        
        currentCifras.forEach(cifra => {
            const row = document.createElement('tr');
            
            // Definir classe de dificuldade e texto
            let difficultyClass = '';
            let difficultyText = '';
            
            if (cifra.difficulty === 'iniciante') {
                difficultyClass = 'difficulty-easy';
                difficultyText = 'Iniciante';
            } else if (cifra.difficulty === 'intermediario') {
                difficultyClass = 'difficulty-medium';
                difficultyText = 'Intermediário';
            } else {
                difficultyClass = 'difficulty-hard';
                difficultyText = 'Avançado';
            }
            
            // Verificar se está nos favoritos
            const isFavorite = favorites.some(fav => fav.id === cifra.id);
            
            row.innerHTML = `
                <td>${cifra.title}</td>
                <td>${cifra.artist}</td>
                <td>${capitalizeFirstLetter(cifra.genre)}</td>
                <td><span class="cifra-difficulty ${difficultyClass}">${difficultyText}</span></td>
                <td>
                    <div class="table-actions">
                        <button onclick="viewPdf(${cifra.id})"><i class="fas fa-eye"></i></button>
                        <button onclick="toggleFavorite(${cifra.id})"><i class="fas ${isFavorite ? 'fa-star' : 'far fa-star'}"></i></button>
                        <button onclick="downloadPdf(${cifra.id})"><i class="fas fa-download"></i></button>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Função para atualizar a paginação
    function updatePagination() {
        const totalPages = Math.ceil(filteredCifras.length / itemsPerPage);
        document.getElementById('currentPage').textContent = `Página ${currentPage} de ${totalPages}`;
        
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === totalPages;
    }
    
    // Função para renderizar favoritos
    function renderFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        favoritesList.innerHTML = '';
        
        if (favorites.length === 0) {
            document.querySelector('.empty-favorites').style.display = 'block';
            return;
        }
        
        document.querySelector('.empty-favorites').style.display = 'none';
        
        // Criar uma grid para os favoritos
        const grid = document.createElement('div');
        grid.className = 'cifra-grid';
        
        favorites.forEach(cifra => {
            const card = document.createElement('div');
            card.className = 'cifra-card';
            
            // Definir classe de dificuldade
            let difficultyClass = '';
            let difficultyText = '';
            
            if (cifra.difficulty === 'iniciante') {
                difficultyClass = 'difficulty-easy';
                difficultyText = 'Iniciante';
            } else if (cifra.difficulty === 'intermediario') {
                difficultyClass = 'difficulty-medium';
                difficultyText = 'Intermediário';
            } else {
                difficultyClass = 'difficulty-hard';
                difficultyText = 'Avançado';
            }
            
            card.innerHTML = `
                <div class="cifra-thumbnail">
                    <img src="${cifra.thumbnailUrl}" alt="${cifra.title}">
                    <div class="cifra-overlay">
                        <div class="cifra-actions">
                            <button onclick="viewPdf(${cifra.id})"><i class="fas fa-eye"></i></button>
                            <button onclick="toggleFavorite(${cifra.id})"><i class="fas fa-star"></i></button>
                            <button onclick="downloadPdf(${cifra.id})"><i class="fas fa-download"></i></button>
                        </div>
                    </div>
                </div>
                <div class="cifra-info">
                    <h3 class="cifra-title">${cifra.title}</h3>
                    <p class="cifra-artist">${cifra.artist}</p>
                    <div class="cifra-meta">
                        <span class="cifra-genre">${capitalizeFirstLetter(cifra.genre)}</span>
                        <span class="cifra-difficulty ${difficultyClass}">${difficultyText}</span>
                    </div>
                </div>
            `;
            
            grid.appendChild(card);
        });
        
        favoritesList.appendChild(grid);
    }
    
    // Função auxiliar para capitalizar primeira letra
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Funções globais
    window.viewPdf = function(id) {
        const cifra = cifrasData.find(c => c.id === id);
        if (!cifra) return;
        
        document.getElementById('modalTitle').textContent = `${cifra.title} - ${cifra.artist}`;
        
        // Simular carregamento de um PDF
        document.getElementById('pdfContainer').innerHTML = `
            <div style="width:100%; text-align:center;">
                <p style="margin-bottom:20px;">Pré-visualização da cifra (simulação)</p>
                <img src="${cifra.thumbnailUrl}" style="max-width:100%; max-height:600px; border:1px solid #ddd;">
                <div style="margin-top:20px; font-family:monospace; text-align:left; padding:20px; background:#f8f9fa; border-radius:8px;">
                    <h3>${cifra.title}</h3>
                    <p>Artista: ${cifra.artist}</p>
                    <p>Tom: ${['C', 'D', 'E', 'F', 'G', 'A', 'B'][Math.floor(Math.random() * 7)]}</p>
                    <hr style="margin:10px 0;">
                    <p>[Intro]</p>
                    <p>C  G  Am  F</p>
                    <br>
                    <p>[Verso 1]</p>
                    <p>C                G</p>
                    <p>Esta é uma cifra simulada</p>
                    <p>Am                F</p>
                    <p>Para demonstração do sistema</p>
                    <br>
                    <p>[Refrão]</p>
                    <p>C       G        Am       F</p>
                    <p>Pack com 1.000 cifras interativas</p>
                    <p>C       G        Am       F</p>
                    <p>Tudo para seu violão ficar completo</p>
                </div>
            </div>
        `;
        
        document.getElementById('pageNum').textContent = '1';
        document.getElementById('pageCount').textContent = '3';
        
        // Marcar como favorito se já estiver na lista
        const isFavorite = favorites.some(fav => fav.id === cifra.id);
        document.getElementById('addFavorite').innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-star"></i>`;
        
        // Adicionar evento para o botão de favorito
        document.getElementById('addFavorite').onclick = function() {
            toggleFavorite(id);
            const isNowFavorite = favorites.some(fav => fav.id === id);
            this.innerHTML = `<i class="${isNowFavorite ? 'fas' : 'far'} fa-star"></i>`;
        };
        
        // Adicionar evento para o botão de download
        document.getElementById('downloadPdf').onclick = function() {
            downloadPdf(id);
        };
        
        modal.style.display = 'block';
    };
    
    window.toggleFavorite = function(id) {
        const cifra = cifrasData.find(c => c.id === id);
        if (!cifra) return;
        
        const index = favorites.findIndex(f => f.id === id);
        
        if (index === -1) {
            // Adicionar aos favoritos
            favorites.push(cifra);
            alert(`"${cifra.title}" foi adicionado aos favoritos!`);
        } else {
            // Remover dos favoritos
            favorites.splice(index, 1);
            alert(`"${cifra.title}" foi removido dos favoritos!`);
        }
        
        // Salvar no localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Recarregar a visualização atual
        if (document.querySelector('.tab-btn[data-tab="favorites"]').classList.contains('active')) {
            renderFavorites();
        } else {
            renderCifras();
        }
    };
    
    window.downloadPdf = function(id) {
        const cifra = cifrasData.find(c => c.id === id);
        if (!cifra) return;
        
        // Simulação de download (apenas uma mensagem)
        alert(`Download iniciado para: ${cifra.title} - ${cifra.artist}\n\nEm um ambiente de produção, isso baixaria o arquivo PDF.`);
    };
    
    // Botão de download geral
    document.getElementById('downloadAll').addEventListener('click', function() {
        alert('Em um ambiente de produção, isso baixaria um arquivo ZIP contendo todas as cifras filtradas.');
    });
});
