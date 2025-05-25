document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                     otherItem.querySelector('.accordion-content').style.padding = "0 20px";
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active')) {
                content.style.padding = "20px"; // Apply padding before calculating height
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
                content.style.padding = "0 20px"; // Remove padding on close
            }
        });
    });

    // Smooth scroll for internal links (if any were added back)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Ensure it's a valid internal link and not just "#"
            if (targetId.length > 1 && document.querySelector(targetId)) {
                 e.preventDefault();
                 document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Implementar mudanças de abas para seções de acordes/ritmos
    const tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show the corresponding content
                const target = button.getAttribute('data-target');
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                document.getElementById(target).style.display = 'block';
            });
        });
        
        // Activate the first tab by default
        tabButtons[0].click();
    }

    // Implementar o contador de progresso para o plano de prática
    const practiceItems = document.querySelectorAll('.practice-list li');
    if (practiceItems.length > 0) {
        practiceItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('completed');
                updatePracticeProgress();
            });
            
            // Adicionar classe para estilizar como clicável
            item.classList.add('clickable');
        });
    }

    function updatePracticeProgress() {
        const cardContainers = document.querySelectorAll('.practice-card');
        
        cardContainers.forEach(container => {
            const items = container.querySelectorAll('.practice-list li');
            const completedItems = container.querySelectorAll('.practice-list li.completed');
            
            if (items.length > 0) {
                const progress = Math.round((completedItems.length / items.length) * 100);
                const progressDisplay = container.querySelector('.practice-progress');
                
                if (progressDisplay) {
                    progressDisplay.textContent = `${progress}% Concluído`;
                    
                    const progressBar = container.querySelector('.progress-fill');
                    if (progressBar) {
                        progressBar.style.width = `${progress}%`;
                    }
                }
            }
        });
    }

    // Botão "Voltar ao topo" (adicionar funcionalidade)
    const scrollTopBtn = document.querySelector('.fixed-nav-button');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollTopBtn.style.display = "flex";
            } else {
                scrollTopBtn.style.display = "none";
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            if (scrollTopBtn.getAttribute('href') === '#') {
                e.preventDefault();
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        });
    }

    // Inicializar tooltips para acordes (se implementados)
    const chordCards = document.querySelectorAll('.chord-card');
    if (chordCards.length > 0) {
        chordCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('expanded');
            });
        });
    }
});

// Função para atualizar o tracker de progresso
function updateTracker(skill, level, value) {
    const cell = document.querySelector(`.tracker-row:nth-child(${skill + 1}) .tracker-cell:nth-child(${level + 1}) .progress-fill`);
    if (cell) {
        cell.style.width = `${value}%`;
    }
}

// Adicione esse código no arquivo script.js ou em um bloco <script> no final do body

document.addEventListener('DOMContentLoaded', function() {
    // Botão de navegação flutuante
    const navToggleBtn = document.getElementById('navToggleBtn');
    const navDropdown = document.getElementById('navDropdown');
    const navCloseBtn = document.getElementById('navCloseBtn');
    
    if (navToggleBtn && navDropdown) {
        // Abrir menu ao clicar no botão
        navToggleBtn.addEventListener('click', function() {
            navDropdown.classList.toggle('active');
        });
        
        // Fechar menu ao clicar no botão de fechar
        navCloseBtn.addEventListener('click', function() {
            navDropdown.classList.remove('active');
        });
        
        // Fechar menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            if (!navToggleBtn.contains(event.target) && 
                !navDropdown.contains(event.target)) {
                navDropdown.classList.remove('active');
            }
        });
        
        // Navegar suavemente para seções ao clicar nos links do menu
        document.querySelectorAll('.nav-item[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Fechar o menu dropdown
                    navDropdown.classList.remove('active');
                    
                    // Scroll suave para a seção
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Ajuste para compensar o header fixo
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});

// Script para a seção de diagnóstico interativo
document.addEventListener('DOMContentLoaded', function() {
    // Selecionando elementos
    const difficultyOptions = document.querySelectorAll('.difficulty-option');
    const subOptions = document.querySelectorAll('.sub-options');
    const diagnosticButton = document.getElementById('diagnosticButton');
    const diagnosticResults = document.getElementById('diagnostic-results');
    const trackerButtons = document.querySelectorAll('.tracker-btn');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    // Botão para abrir formulário de pergunta
    const openQuestionFormBtn = document.getElementById('openQuestionForm');
    const questionForm = document.getElementById('questionForm');
    const cancelQuestionBtn = document.getElementById('cancelQuestion');
    const submitQuestionBtn = document.getElementById('submitQuestion');
    
    // Vídeos
    const videoCards = document.querySelectorAll('.video-card');
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const closeVideoPlayerBtn = document.getElementById('closeVideoPlayer');
    const videoDescription = document.getElementById('videoDescription');
    
    // Elementos do resultado
    const identifiedProblem = document.getElementById('identified-problem');
    const problemCauses = document.getElementById('problem-causes');
    const solutionSteps = document.getElementById('solution-steps');
    const specificExercises = document.getElementById('specific-exercises');
    const recommendedResources = document.getElementById('recommended-resources');
    
    // Banco de soluções (simplificado - seria mais extenso em produção)
    const solutionDatabase = {
        acordes: {
            posicao: {
                iniciante: {
                    problem: "Dificuldade em posicionar corretamente os dedos para formar acordes",
                    causes: [
                        "Músculos da mão ainda não desenvolvidos para as posições específicas",
                        "Posicionamento incorreto do polegar atrás do braço",
                        "Tentando pressionar com a parte plana do dedo em vez da ponta"
                    ],
                    steps: [
                        "Pratique um dedo de cada vez, adicionando gradualmente os outros",
                        "Posicione o polegar no centro do braço, na parte oposta aos dedos médio e anelar",
                        "Use a ponta dos dedos, mantendo-os arqueados como se estivesse segurando uma bola pequena",
                        "Pratique exercícios de flexibilidade para fortalecer a mão esquerda"
                    ],
                    exercises: "<div class='specific-exercises'><h5>Exercício de Acordes Progressivos</h5><p>1. Coloque apenas o dedo indicador na posição do acorde<br>2. Toque algumas vezes, verificando o som<br>3. Adicione o dedo médio, toque novamente<br>4. Continue adicionando um dedo por vez<br>5. Repita para cada acorde problemático</p></div>",
                    resources: [
                        "Capítulo 'Postura e Posição das Mãos' deste guia",
                        "Vídeo 'Técnica Correta para Acordes' na biblioteca",
                        "Aplicativo 'ChordBank' para visualização interativa de acordes"
                    ]
                },
                // Mais níveis e soluções seriam adicionados aqui
            }
            // Mais sub-opções seriam adicionadas aqui
        },
        // Mais categorias de problemas seriam adicionadas aqui
    };
    
    // Selecionar uma dificuldade
    difficultyOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover seleção anterior
            difficultyOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Selecionar opção atual
            this.classList.add('selected');
            
            // Esconder todas as sub-opções
            subOptions.forEach(sub => sub.style.display = 'none');
            
            // Mostrar a sub-opção relacionada
            const difficulty = this.getAttribute('data-difficulty');
            const targetSubOptions = document.getElementById(`${difficulty}-options`);
            if (targetSubOptions) {
                targetSubOptions.style.display = 'block';
            }
        });
    });
    
    // Botão de diagnóstico
    diagnosticButton.addEventListener('click', function() {
        // Simulação de carregamento
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisando...';
        this.disabled = true;
        
        setTimeout(() => {
            generateDiagnostic();
            this.innerHTML = '<i class="fas fa-search"></i> Analisar e Mostrar Soluções';
            this.disabled = false;
            
            // Mostrar resultados com animação
            diagnosticResults.style.display = 'block';
            
            // Scroll suave para os resultados
            diagnosticResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1500);
    });
    
    // Função para gerar o diagnóstico
    function generateDiagnostic() {
        // Obter os valores selecionados
        const selectedDifficulty = document.querySelector('.difficulty-option.selected');
        
        if (!selectedDifficulty) {
            // Se nenhuma dificuldade foi selecionada
            alert('Por favor, selecione sua principal dificuldade');
            return;
        }
        
        const difficulty = selectedDifficulty.getAttribute('data-difficulty');
        const subSelect = document.getElementById(`${difficulty}-select`);
        const subOption = subSelect.value;
        
        const level = document.querySelector('input[name="level"]:checked').value;
        
        // Buscar solução no banco de dados
        let solution = null;
        try {
            solution = solutionDatabase[difficulty][subOption][level];
        } catch (e) {
            // Solução não encontrada, usar solução padrão
            solution = {
                problem: "Dificuldade com " + difficulty + " (" + subOption + ")",
                causes: ["Esta dificuldade é comum em seu nível", "Requer prática consistente e deliberada"],
                steps: ["Pratique exercícios específicos diariamente", "Use o metrônomo para medir seu progresso", "Considere orientação de um professor para feedback específico"],
                exercises: "<div class='specific-exercises'><h5>Exercício Recomendado</h5><p>Dedique 10-15 minutos diários focando especificamente nesta dificuldade, usando uma abordagem progressiva de menor para maior complexidade.</p></div>",
                resources: ["Seção relevante neste guia", "Vídeos tutoriais específicos", "Comunidade online de violonistas"]
            };
        }
        
        // Preencher o resultado
        identifiedProblem.textContent = solution.problem;
        
        problemCauses.innerHTML = '';
        solution.causes.forEach(cause => {
            const li = document.createElement('li');
            li.textContent = cause;
            problemCauses.appendChild(li);
        });
        
        solutionSteps.innerHTML = '';
        solution.steps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            solutionSteps.appendChild(li);
        });
        
        specificExercises.innerHTML = solution.exercises;
        
        recommendedResources.innerHTML = '';
        solution.resources.forEach(resource => {
            const li = document.createElement('li');
            li.textContent = resource;
            recommendedResources.appendChild(li);
        });
    }
    
    // Controle de progresso
    trackerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            const currentProgress = parseInt(progressFill.style.width) || 0;
            
            // Se for botão de reset, zera o progresso
            if (this.classList.contains('reset')) {
                progressFill.style.width = '0%';
                progressPercentage.textContent = '0%';
                return;
            }
            
            // Adiciona ao progresso atual
            let newProgress = Math.min(currentProgress + value, 100);
            progressFill.style.width = newProgress + '%';
            progressPercentage.textContent = newProgress + '%';
            
            // Mudar cor conforme progresso
            if (newProgress < 30) {
                progressFill.style.backgroundColor = '#f44336'; // Vermelho
            } else if (newProgress < 70) {
                progressFill.style.backgroundColor = '#ff9800'; // Laranja
            } else {
                progressFill.style.backgroundColor = '#4caf50'; // Verde
            }
        });
    });
    
    // Formulário de pergunta
    if (openQuestionFormBtn && questionForm) {
        openQuestionFormBtn.addEventListener('click', function() {
            questionForm.style.display = 'block';
            openQuestionFormBtn.style.display = 'none';
        });
        
        cancelQuestionBtn.addEventListener('click', function() {
            questionForm.style.display = 'none';
            openQuestionFormBtn.style.display = 'block';
        });
        
        submitQuestionBtn.addEventListener('click', function() {
            const textarea = questionForm.querySelector('textarea');
            if (textarea.value.trim() === '') {
                alert('Por favor, escreva sua pergunta antes de enviar.');
                return;
            }
            
            // Simulação de envio
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            this.disabled = true;
            
            setTimeout(() => {
                questionForm.innerHTML = `
                    <div class="submission-success">
                        <i class="fas fa-check-circle" style="color: #4caf50; font-size: 32px; margin-bottom: 15px;"></i>
                        <h5>Pergunta enviada com sucesso!</h5>
                        <p>Sua dúvida foi encaminhada à comunidade. Você receberá notificação quando obtiver respostas.</p>
                    </div>
                `;
            }, 1500);
        });
    }
    
    // Biblioteca de vídeos
    if (videoCards.length > 0 && videoPlayerContainer) {
        // Dados dos vídeos (seriam carregados dinamicamente)
        const videosData = [
            {
                title: "Dominando Acordes de Pestana",
                description: "Este tutorial apresenta uma abordagem progressiva para dominar acordes de pestana sem dor ou frustração. O método de 5 passos inclui exercícios de fortalecimento, posicionamento correto do polegar e técnicas de pressão direcionada que reduzem o esforço necessário em 40%.",
            },
            {
                title: "Trocas Rápidas de Acordes",
                description: "Aprenda o sistema de 4 passos para acelerar suas transições entre acordes. Esta técnica foca em identificar dedos-pivô, criar mapas mentais de movimento e desenvolver a memória muscular através de exercícios cronometrados progressivos.",
            },
            {
                title: "Precisão Rítmica",
                description: "Métodos comprovados para desenvolver seu senso rítmico, incluindo técnicas de subdivisão, contagem interna e exercícios com o metrônomo que evoluem em complexidade. Inclui dicas para coordenação entre as mãos e manutenção do tempo.",
            },
            {
                title: "Condicionamento dos Dedos",
                description: "Esta série de exercícios foi desenvolvida para fortalecer e aumentar a flexibilidade dos dedos da mão esquerda. Inclui exercícios de alongamento, fortalecimento por posição e técnicas para desenvolver independência entre os dedos.",
            }
        ];
        
        videoCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                // Preencher informações do vídeo
                const videoTitle = this.querySelector('.video-info h5').textContent;
                videoDescription.querySelector('h4').textContent = videoTitle;
                videoDescription.querySelector('p').textContent = videosData[index].description;
                
                // Abrir o player
                videoPlayerContainer.classList.add('active');
                document.body.style.overflow = 'hidden'; // Impedir rolagem
            });
        });
        
        // Fechar o player
        closeVideoPlayerBtn.addEventListener('click', function() {
            videoPlayerContainer.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar rolagem
        });
        
        // Fechar ao clicar fora do player
        videoPlayerContainer.addEventListener('click', function(e) {
            if (e.target === videoPlayerContainer) {
                videoPlayerContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Biblioteca de Padrões Rítmicos Interativos
document.addEventListener('DOMContentLoaded', function() {
    // Verifique se estamos na página com a seção de ritmos
    if (document.getElementById('biblioteca-ritmos')) {
        initRhythmBuilder();
    }
});

function initRhythmBuilder() {
    let tempo = 80;
    let isPlaying = false;
    let intervalId = null;
    let currentBeat = 0;
    let timeSignature = '4/4';
    let selectedStroke = 'down';
    let beatCount = 5; // Padrão 4/4 com upbeat no final
    
    // Referências aos elementos
    const tempoDisplay = document.getElementById('tempo-display');
    const tempoUp = document.getElementById('tempo-up');
    const tempoDown = document.getElementById('tempo-down');
    const playBtn = document.getElementById('rhythm-play');
    const stopBtn = document.getElementById('rhythm-stop');
    const resetBtn = document.getElementById('rhythm-reset');
    const currentPatternDisplay = document.getElementById('current-pattern');
    const beatActions = document.querySelectorAll('.beat-action');
    const beats = document.querySelectorAll('.beat');
    const strokeBtns = document.querySelectorAll('.stroke-btn');
    const timeSignatureInputs = document.querySelectorAll('input[name="time-signature"]');
    const styleSelector = document.getElementById('rhythm-style');
    const patternCards = document.querySelectorAll('.pattern-card');
    const checkboxes = document.querySelectorAll('.progress-check');
    const progressBar = document.getElementById('rhythm-progress-bar');
    
    // Controles de andamento
    tempoUp.addEventListener('click', function() {
        if (tempo < 200) {
            tempo += 5;
            tempoDisplay.textContent = `${tempo} BPM`;
            if (isPlaying) {
                stopRhythm();
                playRhythm();
            }
        }
    });
    
    tempoDown.addEventListener('click', function() {
        if (tempo > 40) {
            tempo -= 5;
            tempoDisplay.textContent = `${tempo} BPM`;
            if (isPlaying) {
                stopRhythm();
                playRhythm();
            }
        }
    });
    
    // Play/Stop
    playBtn.addEventListener('click', playRhythm);
    stopBtn.addEventListener('click', stopRhythm);
    resetBtn.addEventListener('click', resetRhythm);
    
    // Mudar o tipo de batida ao clicar
    beatActions.forEach(action => {
        action.addEventListener('click', function() {
            const beat = this.getAttribute('data-beat');
            const currentAction = this.getAttribute('data-action');
            
            // Define o próximo tipo de batida (down -> up -> mute -> none -> down)
            let nextAction;
            switch (currentAction) {
                case 'down': nextAction = 'up'; break;
                case 'up': nextAction = 'mute'; break;
                case 'mute': nextAction = 'none'; break;
                case 'none': nextAction = 'down'; break;
                default: nextAction = 'down';
            }
            
            // Atualiza o elemento
            this.setAttribute('data-action', nextAction);
            
            // Atualiza o visual
            switch (nextAction) {
                case 'down': this.textContent = '↓'; break;
                case 'up': this.textContent = '↑'; break;
                case 'mute': this.textContent = '×'; break;
                case 'none': this.textContent = '∅'; break;
            }
            
            // Atualiza a notação do padrão atual
            updateCurrentPattern();
        });
    });
    
    // Seleção de tipo de batida
    strokeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            selectedStroke = this.getAttribute('data-stroke');
            
            // Remove a classe active de todos os botões
            strokeBtns.forEach(b => b.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
        });
    });
    
    // Alteração do compasso
    timeSignatureInputs.forEach(input => {
        input.addEventListener('change', function() {
            timeSignature = this.value;
            
            // Ajusta a visualização baseada no compasso
            adjustTimeSignatureView();
        });
    });
    
    // Seleção de estilo
    styleSelector.addEventListener('change', function() {
        const style = this.value;
        loadStylePattern(style);
    });
    
    // Cards de padrões pré-definidos
    patternCards.forEach(card => {
        card.addEventListener('click', function() {
            const pattern = this.getAttribute('data-pattern');
            loadPatternPreset(pattern);
        });
    });
    
    // Checkboxes de progresso
    checkboxes.forEach(check => {
        check.addEventListener('change', updateProgressBar);
        
        // Carregar estado salvo (se houver)
        const rhythm = check.getAttribute('data-rhythm');
        const level = check.getAttribute('data-level');
        const savedState = localStorage.getItem(`rhythm-${rhythm}-${level}`);
        
        if (savedState === 'true') {
            check.checked = true;
        }
    });
    
    // Botões de salvar e compartilhar
    const saveBtn = document.getElementById('save-pattern');
    const shareBtn = document.getElementById('share-pattern');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const pattern = currentPatternDisplay.textContent.trim();
            localStorage.setItem('saved-rhythm-pattern', pattern);
            alert('Padrão salvo com sucesso!');
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const pattern = currentPatternDisplay.textContent.trim();
            const text = `Estou praticando este padrão rítmico no violão: ${pattern} #MeuRitmoNoViolão`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Meu Ritmo Personalizado',
                    text: text,
                    url: window.location.href
                }).catch(console.error);
            } else {
                // Fallback para navegadores que não suportam a API Share
                prompt('Copie o texto abaixo para compartilhar:', text);
            }
        });
    }
    
    // Funções auxiliares
    function playRhythm() {
        if (isPlaying) return;
        
        isPlaying = true;
        playBtn.disabled = true;
        stopBtn.disabled = false;
        
        const beatDuration = 60000 / tempo; // duração de um beat em ms
        
        intervalId = setInterval(() => {
            // Desativa o beat anterior
            beats.forEach(beat => beat.classList.remove('active'));
            
            // Ativa o beat atual
            beats[currentBeat].classList.add('active');
            
            // Toca o som correspondente (simulado)
            const action = beatActions[currentBeat].getAttribute('data-action');
            if (action !== 'none') {
                playBeatSound(action);
            }
            
            // Avança para o próximo beat
            currentBeat = (currentBeat + 1) % beatCount;
        }, beatDuration);
    }
    
    function stopRhythm() {
        if (!isPlaying) return;
        
        clearInterval(intervalId);
        isPlaying = false;
        playBtn.disabled = false;
        stopBtn.disabled = true;
        
        // Reseta a visualização
        beats.forEach(beat => beat.classList.remove('active'));
    }
    
    function resetRhythm() {
        stopRhythm();
        currentBeat = 0;
        
        // Carrega o padrão básico
        loadPatternPreset('pop-basic');
    }
    
    function updateCurrentPattern() {
        let pattern = '';
        
        beatActions.forEach((action, index) => {
            if (index < beatCount) {
                const actionType = action.getAttribute('data-action');
                
                switch (actionType) {
                    case 'down': pattern += '↓ '; break;
                    case 'up': pattern += '↑ '; break;
                    case 'mute': pattern += '× '; break;
                    case 'none': pattern += '∅ '; break;
                }
            }
        });
        
        currentPatternDisplay.textContent = pattern.trim();
    }
    
    function adjustTimeSignatureView() {
        // Ajusta a visualização baseada no compasso selecionado
        switch (timeSignature) {
            case '4/4':
                beatCount = 5; // 4 beats + 1 upbeat
                // Mostra todos os beats
                beats.forEach((beat, index) => {
                    const parent = beat.parentNode;
                    parent.style.display = index < 5 ? 'block' : 'none';
                });
                beatActions.forEach((action, index) => {
                    const parent = action.parentNode;
                    parent.style.display = index < 5 ? 'block' : 'none';
                });
                break;
            case '3/4':
                beatCount = 3;
                // Mostra apenas 3 beats
                beats.forEach((beat, index) => {
                    const parent = beat.parentNode;
                    parent.style.display = index < 3 ? 'block' : 'none';
                    
                    if (index < 3) {
                        beat.textContent = index + 1;
                    }
                });
                beatActions.forEach((action, index) => {
                    const parent = action.parentNode;
                    parent.style.display = index < 3 ? 'block' : 'none';
                });
                break;
            case '6/8':
                beatCount = 6;
                // Mostra 6 beats
                beats.forEach((beat, index) => {
                    const parent = beat.parentNode;
                    parent.style.display = index < 6 ? 'block' : 'none';
                    
                    if (index < 6) {
                        // Para 6/8, os beats são 1, 1+, 2, 2+, 3, 3+
                        if (index % 2 === 0) {
                            beat.textContent = (index / 2) + 1;
                        } else {
                            beat.textContent = '+';
                        }
                    }
                });
                beatActions.forEach((action, index) => {
                    const parent = action.parentNode;
                    parent.style.display = index < 6 ? 'block' : 'none';
                });
                break;
        }
        
        // Atualiza o padrão atual
        updateCurrentPattern();
    }
    
    function loadStylePattern(style) {
        switch (style) {
            case 'pop':
                loadPatternPreset('pop-basic');
                break;
            case 'bossa':
                loadPatternPreset('bossa-nova');
                break;
            case 'folk':
                loadPatternPreset('folk-alternate');
                break;
            case 'reggae':
                loadPatternPreset('reggae-upbeat');
                break;
            case 'blues':
                loadPatternPreset('blues-shuffle');
                break;
            case 'country':
                loadPatternPreset('country-travis');
                break;
        }
    }
    
    function loadPatternPreset(preset) {
        switch (preset) {
            case 'pop-basic':
                // Define o compasso
                document.querySelector('input[value="4/4"]').checked = true;
                timeSignature = '4/4';
                adjustTimeSignatureView();
                
                // Define as batidas
                setActionType(0, 'down');
                setActionType(1, 'down');
                setActionType(2, 'up');
                setActionType(3, 'down');
                setActionType(4, 'up');
                break;
                
            case 'folk-alternate':
                document.querySelector('input[value="4/4"]').checked = true;
                timeSignature = '4/4';
                adjustTimeSignatureView();
                
                setActionType(0, 'down');
                setActionType(1, 'up');
                setActionType(2, 'down');
                setActionType(3, 'up');
                setActionType(4, 'none');
                break;
                
            case 'bossa-nova':
                document.querySelector('input[value="4/4"]').checked = true;
                timeSignature = '4/4';
                adjustTimeSignatureView();
                
                setActionType(0, 'down');
                setActionType(1, 'mute');
                setActionType(2, 'up');
                setActionType(3, 'down');
                setActionType(4, 'mute');
                break;
                
            case 'reggae-upbeat':
                document.querySelector('input[value="4/4"]').checked = true;
                timeSignature = '4/4';
                adjustTimeSignatureView();
                
                setActionType(0, 'none');
                setActionType(1, 'up');
                setActionType(2, 'none');
                setActionType(3, 'up');
                setActionType(4, 'none');
                break;
                
            case 'blues-shuffle':
                document.querySelector('input[value="6/8"]').checked = true;
                timeSignature = '6/8';
                adjustTimeSignatureView();
                
                setActionType(0, 'down');
                setActionType(1, 'none');
                setActionType(2, 'up');
                setActionType(3, 'down');
                setActionType(4, 'none');
                setActionType(5, 'up');
                break;
                
            case 'country-travis':
                document.querySelector('input[value="4/4"]').checked = true;
                timeSignature = '4/4';
                adjustTimeSignatureView();
                
                setActionType(0, 'down');
                setActionType(1, 'up');
                setActionType(2, 'mute');
                setActionType(3, 'up');
                setActionType(4, 'none');
                break;
        }
        
        // Atualiza a exibição do padrão
        updateCurrentPattern();
    }
    
    function setActionType(index, actionType) {
        if (index >= beatActions.length) return;
        
        const action = beatActions[index];
        action.setAttribute('data-action', actionType);
        
        switch (actionType) {
            case 'down': action.textContent = '↓'; break;
            case 'up': action.textContent = '↑'; break;
            case 'mute': action.textContent = '×'; break;
            case 'none': action.textContent = '∅'; break;
        }
    }
    
    function playBeatSound(action) {
        // Aqui poderia integrar com uma biblioteca de áudio como Tone.js
        // Por enquanto, apenas simulamos visualmente
        
        // Efeito visual quando um beat é tocado
        const flash = document.createElement('div');
        flash.className = 'beat-flash';
        flash.style.position = 'fixed';
        flash.style.top = '20px';
        flash.style.right = '20px';
        flash.style.width = '20px';
        flash.style.height = '20px';
        flash.style.borderRadius = '50%';
        flash.style.zIndex = '9999';
        
        // Cor diferente para cada tipo de batida
        switch (action) {
            case 'down': flash.style.backgroundColor = '#e74c3c'; break;
            case 'up': flash.style.backgroundColor = '#3498db'; break;
            case 'mute': flash.style.backgroundColor = '#f39c12'; break;
        }
        
        document.body.appendChild(flash);
        
        // Animação de fade-out
        setTimeout(() => {
            flash.style.transition = 'all 0.3s';
            flash.style.opacity = '0';
            flash.style.transform = 'scale(1.5)';
            
            // Remove o elemento após a animação
            setTimeout(() => {
                document.body.removeChild(flash);
            }, 300);
        }, 1);
    }
    
    function updateProgressBar() {
        // Salva o estado do checkbox
        const rhythm = this.getAttribute('data-rhythm');
        const level = this.getAttribute('data-level');
        localStorage.setItem(`rhythm-${rhythm}-${level}`, this.checked);
        
        // Calcula o progresso geral
        let checked = 0;
        let total = 0;
        
        checkboxes.forEach(check => {
            total++;
            if (check.checked) checked++;
        });
        
        const progress = (checked / total) * 100;
        progressBar.style.width = `${progress}%`;
        document.querySelector('.progress-status').textContent = `${Math.round(progress)}% Completo`;
    }
    
    // Inicializa a barra de progresso
    updateProgressBar.call({ getAttribute: () => {}, checked: false });
    
    // Inicia com o padrão básico
    loadPatternPreset('pop-basic');
}