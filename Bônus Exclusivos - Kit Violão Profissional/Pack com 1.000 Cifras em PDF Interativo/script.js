document.addEventListener('DOMContentLoaded', function() {
    // Simulando um banco de dados de cifras
    const cifrasData = generateCifrasDatabase();
    let currentPage = 1;
    const itemsPerPage = 12;
    let filteredCifras = [...cifrasData];
    
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
        return [
            {
                id: 1,
                title: "Evidências",
                artist: "Chitãozinho & Xororó",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/evidencias.pdf",
                thumbnailUrl: "https://picsum.photos/id/101/300/200",
                cifra: `[Intro] G  D  Em  C  G  D  C

[Verso 1]
G                    D/F#
Quando eu digo que deixei de te amar
Em                  C
É porque eu te amo
G                    D/F#
Quando eu digo que não quero mais você
          C
É porque eu te quero

[Pré-refrão]
D                            C
São só palavras e o que eu sinto mesmo
          Em
É que eu não consigo é ficar sem você
         D
O teu amor é tudo
                G - D7
Que eu preciso para viver

[Refrão]
G                    D/F#
Se eu te disser que não te quero mais
Em                  C
É porque eu te quero
G                    D/F#
Eu tenho medo de te dar meu coração
          C
E confessar que eu estou
D
Em tuas mãos

G                    D/F#
Mas não posso imaginar o que vai ser de mim
Em                  C
Se eu te perder um dia
G                    D/F#
Eu me afasto e me defendo de você
          C
Mas depois me entrego

D                            C
Faço tipo, falo coisas que eu não sou
          Em
Mas depois eu nego
         D
Mas a verdade é que eu sou
                G - D7
Louco por você

[Refrão]
G                    D/F#
Se eu te disser que não te quero mais
Em                  C
É porque eu te quero
G                    D/F#
Eu tenho medo de te dar meu coração
          C
E confessar que eu estou
D
Em tuas mãos

G                    D/F#
Mas não posso imaginar o que vai ser de mim
Em                  C
Se eu te perder um dia
G                    D/F#
Eu me afasto e me defendo de você
          C
Mas depois me entrego

D                            C
Faço tipo, falo coisas que eu não sou
          Em
Mas depois eu nego
         D
Mas a verdade é que eu sou
                G
Louco por você`
            },
            {
                id: 2,
                title: "Leilão",
                artist: "César Menotti & Fabiano",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/leilao.pdf",
                thumbnailUrl: "https://picsum.photos/id/102/300/200",
                cifra: `[Intro] G  D/F#  Em  C

G       D/F#          Em             C
Tá rolando o leilão do meu coração partido
G       D/F#          Em             C
Mas estão todos com medo do bem mais sofrido
Em                 C
Dizem que é complicado dividir a vida
G       D/F#          Em             C
E eu que sempre fui tão decidido
G       D/F#          Em             C
Estou aqui morrendo de saudade
Em                 C
Dizem que é complicado dividir a vida

[Refrão]
G       D/F#          Em             C
Tá rolando o leilão do meu coração partido
G       D/F#          Em             C
Mas estão todos com medo do bem mais sofrido
Em                 C
Dizem que é complicado dividir a vida`
            },
            {
                id: 3,
                title: "Infiel",
                artist: "Marília Mendonça",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/infiel.pdf",
                thumbnailUrl: "https://picsum.photos/id/103/300/200",
                cifra: `[Intro] G  Em  C  D

G                          Em
Você dormia aqui em casa e na mesma noite
C                    D
Em outra cama, outro alguém
G                          Em
Você jurava estar sozinha
C                    D
Mas tinha outro além

[Refrão]
G                          Em
Você é infiel, infiel
C                    D
Não consigo entender
G                          Em
Você é infiel, infiel
C                    D
Não consigo entender`
            },
            {
                id: 4,
                title: "Primeiros Erros",
                artist: "Capital Inicial",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/primeiros-erros.pdf",
                thumbnailUrl: "https://picsum.photos/id/104/300/200",
                cifra: `[Intro] G  D  Em  C

G                      D
Meu caminho é cada manhã
Em                  C
Não procure saber onde vou
G               D    
Meu destino não é de ninguém
Em                  C  
E eu não deixo os meus passos no chão

G                      D
Se você não entende, não vê
Em                  C
Se não me vê, não entende
G               D    
Não procure saber onde estou
Em                  C  
Se o meu jeito te surpreende

[Refrão]
G                      D
Se o meu corpo virasse sol
Em                  C
Minha mente virasse sol
G               D    
Mas só chove, chove
Em                  C  
Chove, chove, chove`
            },
            {
                id: 5,
                title: "Dias de Luta, Dias de Glória",
                artist: "Charlie Brown Jr.",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/dias-de-luta.pdf",
                thumbnailUrl: "https://picsum.photos/id/105/300/200",
                cifra: `[Intro] Em  C  G  D

Em          C
É uma vida, é duas
G                D
E é tanta coisa que eu nem sei contar
Em          C
São dias de luta, dias de glória
G                D
É tanta coisa que eu nem sei contar

[Refrão]
Em          C
Dias de luta, dias de glória
G                D
Dias de luta, dias de glória`
            },
            {
                id: 6,
                title: "Hey Jude",
                artist: "Beatles",
                genre: "internacional",
                difficulty: "iniciante",
                pdfUrl: "cifras/hey-jude.pdf",
                thumbnailUrl: "https://picsum.photos/id/106/300/200",
                cifra: `F              C             C7           F
Hey Jude, don't make it bad, take a sad song
Bb            F          C            F
And make it better, remember to let her
Bb             F             C
Into your heart, then you can start
             F
To make it better`
            },
            {
                id: 7,
                title: "Just the Way You Are",
                artist: "Bruno Mars",
                genre: "internacional",
                difficulty: "iniciante",
                pdfUrl: "cifras/just-the-way-you-are.pdf",
                thumbnailUrl: "https://picsum.photos/id/107/300/200",
                cifra: `F                  Dm
When I see your face
Bb                         F
There's not a thing that I would change
                  Dm
'Cause you're amazing
Bb               F
Just the way you are`
            },
            {
                id: 8,
                title: "A Noite",
                artist: "Tiê",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/a-noite.pdf",
                thumbnailUrl: "https://picsum.photos/id/108/300/200",
                cifra: `G         D          Em          C
A noite, ela é muito mais solitária, se eu não te vejo
G         D          Em          C
A noite, ela é muito mais perigosa, se eu não te beijo`
            },
            {
                id: 9,
                title: "Garota de Ipanema",
                artist: "Tom Jobim",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/garota-de-ipanema.pdf",
                thumbnailUrl: "https://picsum.photos/id/109/300/200",
                cifra: `F7M        G7       Gm7   F#7
Olha que coisa mais linda
F7M         G7      Gm7   F#7
Mais cheia de graça
F7M        G7       Gm7   F#7
É ela menina que vem e que passa
F7M         G7      Gm7   F#7
Num doce balanço a caminho do mar`
            },
            {
                id: 10,
                title: "O Tempo Não Para",
                artist: "Cazuza",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/o-tempo-nao-para.pdf",
                thumbnailUrl: "https://picsum.photos/id/110/300/200",
                cifra: `A     D            A     D
Disparo contra o sol
A      D           A  D
Sou forte, sou por acaso
A    D              A    D
Minha metralhadora cheia de mágoas
A   D           A
Eu sou um cara
       D         A
Cansado de correr
     D            A
Na direção contrária`
            },
            {
                id: 11,
                title: "Asa Branca",
                artist: "Luiz Gonzaga",
                genre: "forro",
                difficulty: "iniciante",
                pdfUrl: "cifras/asa-branca.pdf",
                thumbnailUrl: "https://picsum.photos/id/111/300/200",
                cifra: `G                          C
Quando olhei a terra ardendo
D7                     G
Qual fogueira de São João
G                      C
Eu perguntei a Deus do céu, ai
D7                       G
Por que tamanha judiação

G                      C
Que braseiro, que fornalha
D7                    G
Nem um pé de plantação
G                      C
Por falta d'água perdi meu gado
D7                    G
Morreu de sede meu alazão`
            },
            {
                id: 12,
                title: "Aquarela",
                artist: "Toquinho",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/aquarela.pdf",
                thumbnailUrl: "https://picsum.photos/id/112/300/200",
                cifra: `G       C           D       G
Numa folha qualquer eu desenho um sol amarelo
G        C             D        G
E com cinco ou seis retas é fácil fazer um castelo
G       C           D       G
Corro o lápis em torno da mão e me dou uma luva
G        C             D        G
E se faço chover, com dois riscos tenho um guarda-chuva`
            },
            {
                id: 59,
                title: "Roupa Nova - Dona",
                artist: "Roupa Nova",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/dona.pdf",
                thumbnailUrl: "https://picsum.photos/id/159/300/200",
                cifra: `G           D/F#        Em
Dona desses traiçoeiros sonhos sempre verdadeiros
C           G/B         Am7
Oh, dona desses animais
D7
Dona de seus instintos naturais`
            },
            {
                id: 60,
                title: "Skank - Garota Nacional",
                artist: "Skank",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/garota-nacional.pdf",
                thumbnailUrl: "https://picsum.photos/id/160/300/200",
                cifra: `E
Ela é bela, sabe ser
A
Você vê, por onde anda
E
O que quer, ela tem
A
Tem o dom de seduzir`
            },
            {
                id: 13,
                title: "Perfect",
                artist: "Ed Sheeran",
                genre: "pop",
                difficulty: "intermediario",
                pdfUrl: "cifras/perfect.pdf",
                thumbnailUrl: "https://picsum.photos/id/113/300/200",
                cifra: `G                 Em
I found a love for me
C                          D
Darling just dive right in, and follow my lead
G                     Em
Well I found a girl beautiful and sweet
C                                D
I never knew you were the someone waiting for me

Em                   C
'Cause we were just kids when we fell in love
G                     D
Not knowing what it was
Em                   C
I will not give you up this time`
            },
            {
                id: 14,
                title: "Wish You Were Here",
                artist: "Pink Floyd",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/wish-you-were-here.pdf",
                thumbnailUrl: "https://picsum.photos/id/114/300/200",
                cifra: `C                D/F#
So, so you think you can tell
Am                    G
Heaven from hell, blue skies from pain
D                     C                  Am
Can you tell a green field from a cold steel rail?
D                     C                   Am
A smile from a veil? Do you think you can tell?`
            },
            {
                id: 15,
                title: "No Woman, No Cry",
                artist: "Bob Marley",
                genre: "reggae",
                difficulty: "iniciante",
                pdfUrl: "cifras/no-woman-no-cry.pdf",
                thumbnailUrl: "https://picsum.photos/id/115/300/200",
                cifra: `C       G            Am         F
No woman, no cry, no woman, no cry
C       G            Am         F
No woman, no cry, no woman, no cry

C       G            Am         F
Said, said, said I remember when we used to sit
C       G            Am         F
In the government yard in Trenchtown`
            },
            {
                id: 16,
                title: "Ai Se Eu Te Pego",
                artist: "Michel Teló",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/ai-se-eu-te-pego.pdf",
                thumbnailUrl: "https://picsum.photos/id/116/300/200",
                cifra: `Am               F
Nossa, nossa! Assim você me mata
C                    G
Ai, se eu te pego, ai, ai, se eu te pego
Am               F
Delícia, delícia! Assim você me mata
C                    G
Ai, se eu te pego, ai, ai, se eu te pego`
            },
            {
                id: 17,
                title: "Let It Be",
                artist: "The Beatles",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/let-it-be.pdf",
                thumbnailUrl: "https://picsum.photos/id/117/300/200",
                cifra: `C              G                 Am          F
When I find myself in times of trouble, Mother Mary comes to me
C                 G              F  C
Speaking words of wisdom, let it be
C              G                 Am          F
And in my hour of darkness, she is standing right in front of me
C                 G              F  C
Speaking words of wisdom, let it be

Am         G          F          C
Let it be, let it be, let it be, let it be
C                 G              F  C
Whisper words of wisdom, let it be`
            },
            {
                id: 18,
                title: "Knockin' on Heaven's Door",
                artist: "Bob Dylan",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/knockin-on-heavens-door.pdf",
                thumbnailUrl: "https://picsum.photos/id/118/300/200",
                cifra: `[Intro] G  D  Am  G  D  C

[Verso]
G              D              Am
Mama, take this badge off of me
G          D             C
I can't use it anymore
G           D                  Am
It's getting dark, too dark to see
G         D                 C
I feel I'm knocking on heaven's door

[Refrão]
G            D                  Am
Knock, knock, knocking on heaven's door
G            D                  C
Knock, knock, knocking on heaven's door
G            D                  Am
Knock, knock, knocking on heaven's door
G            D                  C
Knock, knock, knocking on heaven's door`
            },
            {
                id: 19,
                title: "Velha Infância",
                artist: "Tribalistas",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/velha-infancia.pdf",
                thumbnailUrl: "https://picsum.photos/id/119/300/200",
                cifra: `[Intro] G  C  G  D  (2x)

[Verso 1]
G               C     G          D
Você é assim, um sonho pra mim
G                 C               G        D
Quero te encher de beijos, eu entendo você
G               C      G              D
Você é assim, um sonho pra mim
G                C              G    D      Em   Bm  C  D
Quero te encher de beijos, eu entendo você`
            },
            {
                id: 20,
                title: "Trem-Bala",
                artist: "Ana Vilela",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/trem-bala.pdf",
                thumbnailUrl: "https://picsum.photos/id/120/300/200",
                cifra: `[Intro] G D/F# Em C G D Em C

[Verso 1]
G                 D/F#            Em
Não é sobre ter todas as pessoas do mundo pra si
C             G                 D                Em           C
É sobre saber que em algum lugar alguém zela por ti
G                 D/F#                Em
É sobre cantar e poder escutar mais do que a própria voz
C             G           D            Em         C
É sobre dançar na chuva de vida que cai sobre nós`
            },
            {
                id: 21,
                title: "Leãozinho",
                artist: "Caetano Veloso",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/leaozinho.pdf",
                thumbnailUrl: "https://picsum.photos/id/121/300/200",
                cifra: `C             Am
Gosto muito de te ver, leãozinho
Em            Am
Caminhando sob o sol
F             G         C    Am
Gosto muito de você, leãozinho`
            },
            {
                id: 22,
                title: "Construção",
                artist: "Chico Buarque",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/construcao.pdf",
                thumbnailUrl: "https://picsum.photos/id/122/300/200",
                cifra: `Em               Am
Amou daquela vez como se fosse a última
B7               Em
Beijou sua mulher como se fosse a última`
            },
            {
                id: 23,
                title: "Aquarela",
                artist: "Toquinho",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/aquarela.pdf",
                thumbnailUrl: "https://picsum.photos/id/123/300/200",
                cifra: `G       C           D       G
Numa folha qualquer eu desenho um sol amarelo
G        C             D        G
E com cinco ou seis retas é fácil fazer um castelo
G       C           D       G
Corro o lápis em torno da mão e me dou uma luva
G        C             D        G
E se faço chover, com dois riscos tenho um guarda-chuva`
            },
            {
                id: 24,
                title: "Oceano",
                artist: "Djavan",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/oceano.pdf",
                thumbnailUrl: "https://picsum.photos/id/124/300/200",
                cifra: `C            G        Am          E7
Assim que o dia amanheceu lá no mar alto da paixão
F        G     Em      Am
Dava pra ver o tempo ruir
F           Dm   G7    C
Dava pra ver o tempo ruir`
            },
            {
                id: 25,
                title: "Asa Branca",
                artist: "Luiz Gonzaga",
                genre: "forro",
                difficulty: "iniciante",
                pdfUrl: "cifras/asa-branca.pdf",
                thumbnailUrl: "https://picsum.photos/id/125/300/200",
                cifra: `G                          C
Quando olhei a terra ardendo
D7                     G
Qual fogueira de São João
G                      C
Eu perguntei a Deus do céu, ai
D7                       G
Por que tamanha judiação

G                      C
Que braseiro, que fornalha
D7                    G
Nem um pé de plantação
G                      C
Por falta d'água perdi meu gado
D7                    G
Morreu de sede meu alazão`
            },
            {
                id: 26,
                title: "Dias de Luta, Dias de Glória",
                artist: "Charlie Brown Jr.",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/dias-de-luta.pdf",
                thumbnailUrl: "https://picsum.photos/id/126/300/200",
                cifra: `Em          C
É uma vida, é duas
G                D
E é tanta coisa que eu nem sei contar
Em          C
São dias de luta, dias de glória
G                D
É tanta coisa que eu nem sei contar

[Refrão]
Em          C
Dias de luta, dias de glória
G                D
Dias de luta, dias de glória`
            },
            {
                id: 27,
                title: "Primeiros Erros",
                artist: "Capital Inicial",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/primeiros-erros.pdf",
                thumbnailUrl: "https://picsum.photos/id/127/300/200",
                cifra: `G                      D
Meu caminho é cada manhã
Em                  C
Não procure saber onde vou
G               D    
Meu destino não é de ninguém
Em                  C  
E eu não deixo os meus passos no chão

G                      D
Se você não entende, não vê
Em                  C
Se não me vê, não entende
G               D    
Não procure saber onde estou
Em                  C  
Se o meu jeito te surpreende

[Refrão]
G                      D
Se o meu corpo virasse sol
Em                  C
Minha mente virasse sol
G               D    
Mas só chove, chove
Em                  C  
Chove, chove, chove`
            },
            {
                id: 28,
                title: "Knockin' on Heaven's Door",
                artist: "Bob Dylan",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/knockin-on-heavens-door.pdf",
                thumbnailUrl: "https://picsum.photos/id/128/300/200",
                cifra: `[Intro] G  D  Am  G  D  C

[Verso]
G              D              Am
Mama, take this badge off of me
G          D             C
I can't use it anymore
G           D                  Am
It's getting dark, too dark to see
G         D                 C
I feel I'm knocking on heaven's door

[Refrão]
G            D                  Am
Knock, knock, knocking on heaven's door
G            D                  C
Knock, knock, knocking on heaven's door
G            D                  Am
Knock, knock, knocking on heaven's door
G            D                  C
Knock, knock, knocking on heaven's door`
            },
            {
                id: 29,
                title: "Let It Be",
                artist: "The Beatles",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/let-it-be.pdf",
                thumbnailUrl: "https://picsum.photos/id/129/300/200",
                cifra: `[Intro] C G Am F C G F C

[Verso]
C              G                 Am          F
When I find myself in times of trouble, Mother Mary comes to me
C                 G              F  C
Speaking words of wisdom, let it be
C              G                 Am          F
And in my hour of darkness, she is standing right in front of me
C                 G              F  C
Speaking words of wisdom, let it be

[Refrão]
Am         G          F          C
Let it be, let it be, let it be, let it be
C                 G              F  C
Whisper words of wisdom, let it be`
            },
            {
                id: 30,
                title: "Perfect",
                artist: "Ed Sheeran",
                genre: "pop",
                difficulty: "intermediario",
                pdfUrl: "cifras/perfect.pdf",
                thumbnailUrl: "https://picsum.photos/id/130/300/200",
                cifra: `[Intro] G Em C D (2x)

[Verso 1]
G                          Em
Eu encontrei um amor para mim
                C                    D
Querida, apenas mergulhe e me siga
G                         Em
Eu encontrei uma garota linda e doce
           C                                D
Oh, eu nunca soube que você era o alguém esperando por mim

[Pré-Refrão]
G                                     Em
Porque nós éramos apenas crianças quando nos apaixonamos
             C                            D                  G
Sem saber o que era, eu não vou desistir de você desta vez
                           Em
Mas querida, apenas me beije devagar
            C                                D
Seu coração é tudo o que possuo, e seu sorriso é a minha casa

[Refrão]
         G                Em
Quando você olha nos meus olhos
          C                     D                    G
Querida, você me segura nos seus braços, Baby, eu estou dançando no escuro
                       Em                   C
Com você entre meus braços, Descalço na grama
           D                     G
Ouvindo nossa canção favorita, quando você disse que estava bagunçada
      Em              C
Eu sussurrei por baixo da respiração
        D                       G
Mas você me ouviu, querida, você parece perfeita essa noite

[Instrumental] G Em C D G

[Verso 2]
G                             Em
Bem, eu encontrei uma mulher, mais forte do que qualquer um que eu conheço
                C                         D
Ela compartilha meus sonhos, espero que algum dia compartilhe sua casa
G                         Em
Eu encontrei um amor, para carregar mais do que meus segredos
           C                                D
Para carregar amor, para carregar filhos do nosso próprio

[Pré-Refrão]
G                                     Em
Nós ainda somos crianças, mas estamos tão apaixonados
             C                            D                  G
Lutando contra todas as probabilidades, eu sei que vamos ficar bem desta vez
                           Em
Querida, apenas segure minha mão
            C                                D
Seja minha garota, eu serei seu homem

[Refrão]
         G                Em
Quando eu vi minha mulher
          C                     D                    G
Linda, mais do que eu jamais conheci
                       Em                   C
Eu não mereço isso, querida, você parece perfeita essa noite`
            },
            {
                id: 31,
                title: "Aquarela",
                artist: "Toquinho",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/aquarela.pdf",
                thumbnailUrl: "https://picsum.photos/id/131/300/200",
                cifra: `[Intro] G  C  D  G

G       C           D       G
Numa folha qualquer eu desenho um sol amarelo
G        C             D        G
E com cinco ou seis retas é fácil fazer um castelo
G       C           D       G
Corro o lápis em torno da mão e me dou uma luva
G        C             D        G
E se faço chover, com dois riscos tenho um guarda-chuva

G       C           D       G
Se um pinguinho de tinta cai num pedacinho azul do papel
G        C             D        G
Num instante imagino uma linda gaivota a voar no céu
G       C           D       G
Vai voando, contornando a imensa curva norte e sul
G        C             D        G
Vou com ela, viajando Havaí, Pequim ou Istambul
G       C           D       G
Pinto um barco à vela, branco navegando, é tanto céu e mar num beijo azul`
            },
            {
                id: 32,
                title: "Asa Branca",
                artist: "Luiz Gonzaga",
                genre: "forro",
                difficulty: "iniciante",
                pdfUrl: "cifras/asa-branca.pdf",
                thumbnailUrl: "https://picsum.photos/id/132/300/200",
                cifra: `G                          C
Quando olhei a terra ardendo
D7                     G
Qual fogueira de São João
G                      C
Eu perguntei a Deus do céu, ai
D7                       G
Por que tamanha judiação

G                      C
Que braseiro, que fornalha
D7                    G
Nem um pé de plantação
G                      C
Por falta d'água perdi meu gado
D7                    G
Morreu de sede meu alazão

G                      C
Hoje longe muitas léguas
D7                    G
Numa triste solidão
G                      C
Espero a chuva cair de novo
D7                    G
Pra eu voltar pro meu sertão`
            },
            {
                id: 33,
                title: "Leãozinho",
                artist: "Caetano Veloso",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/leaozinho.pdf",
                thumbnailUrl: "https://picsum.photos/id/133/300/200",
                cifra: `C             Am
Gosto muito de te ver, leãozinho
Em            Am
Caminhando sob o sol
F             G         C    Am
Gosto muito de você, leãozinho

C             Am
Para desentristecer, leãozinho
Em            Am
O meu coração tão só
F             G         C    Am
Basta eu encontrar você no caminho`
            },
            {
                id: 34,
                title: "Dias de Luta, Dias de Glória",
                artist: "Charlie Brown Jr.",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/dias-de-luta.pdf",
                thumbnailUrl: "https://picsum.photos/id/134/300/200",
                cifra: `[Intro] Em  C  G  D

Em          C
É uma vida, é duas
G                D
E é tanta coisa que eu nem sei contar
Em          C
São dias de luta, dias de glória
G                D
É tanta coisa que eu nem sei contar

[Refrão]
Em          C
Dias de luta, dias de glória
G                D
Dias de luta, dias de glória`
            },
            {
                id: 35,
                title: "Knockin' on Heaven's Door",
                artist: "Bob Dylan",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/knockin-on-heavens-door.pdf",
                thumbnailUrl: "https://picsum.photos/id/135/300/200",
                cifra: `[Intro] G  D  Am  G  D  C

[Verso]
G              D              Am
Mama, take this badge off of me
G          D             C
I can't use it anymore
G           D                  Am
It's getting dark, too dark to see
G         D                 C
I feel I'm knocking on heaven's door

[Refrão]
G            D                  Am
Knock, knock, knocking on heaven's door
G            D                  C
Knock, knock, knocking on heaven's door
G            D                  Am
Knock, knock, knocking on heaven's door
G            D                  C
Knock, knock, knocking on heaven's door`
            },
            {
                id: 36,
                title: "Let It Be",
                artist: "The Beatles",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/let-it-be.pdf",
                thumbnailUrl: "https://picsum.photos/id/136/300/200",
                cifra: `[Intro] C G Am F C G F C

[Verso]
C              G                 Am          F
When I find myself in times of trouble, Mother Mary comes to me
C                 G              F  C
Speaking words of wisdom, let it be
C              G                 Am          F
And in my hour of darkness, she is standing right in front of me
C                 G              F  C
Speaking words of wisdom, let it be

[Refrão]
Am         G          F          C
Let it be, let it be, let it be, let it be
C                 G              F  C
Whisper words of wisdom, let it be`
            },
            {
                id: 37,
                title: "Perfect",
                artist: "Ed Sheeran",
                genre: "pop",
                difficulty: "intermediario",
                pdfUrl: "cifras/perfect.pdf",
                thumbnailUrl: "https://picsum.photos/id/137/300/200",
                cifra: `[Intro] G Em C D (2x)

[Verso 1]
G                          Em
Eu encontrei um amor para mim
                C                    D
Querida, apenas mergulhe e me siga
G                         Em
Eu encontrei uma garota linda e doce
           C                                D
Oh, eu nunca soube que você era o alguém esperando por mim

[Pré-Refrão]
G                                     Em
Porque nós éramos apenas crianças quando nos apaixonamos
             C                            D                  G
Sem saber o que era, eu não vou desistir de você desta vez
                           Em
Mas querida, apenas me beije devagar
            C                                D
Seu coração é tudo o que possuo, e seu sorriso é a minha casa

[Refrão]
         G                Em
Quando você olha nos meus olhos
          C                     D                    G
Querida, você me segura nos seus braços, Baby, eu estou dançando no escuro
                       Em                   C
Com você entre meus braços, Descalço na grama
           D                     G
Ouvindo nossa canção favorita, quando você disse que estava bagunçada
      Em              C
Eu sussurrei por baixo da respiração
        D                       G
Mas você me ouviu, querida, você parece perfeita essa noite

[Instrumental] G Em C D G

[Verso 2]
G                             Em
Bem, eu encontrei uma mulher, mais forte do que qualquer um que eu conheço
                C                         D
Ela compartilha meus sonhos, espero que algum dia compartilhe sua casa
G                         Em
Eu encontrei um amor, para carregar mais do que meus segredos
           C                                D
Para carregar amor, para carregar filhos do nosso próprio

[Pré-Refrão]
G                                     Em
Nós ainda somos crianças, mas estamos tão apaixonados
             C                            D                  G
Lutando contra todas as probabilidades, eu sei que vamos ficar bem desta vez
                           Em
Querida, apenas segure minha mão
            C                                D
Seja minha garota, eu serei seu homem

[Refrão]
         G                Em
Quando eu vi minha mulher
          C                     D                    G
Linda, mais do que eu jamais conheci
                       Em                   C
Eu não mereço isso, querida, você parece perfeita essa noite`
            },
            {
                id: 38,
                title: "Tempo Perdido",
                artist: "Legião Urbana",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/tempo-perdido.pdf",
                thumbnailUrl: "https://picsum.photos/id/138/300/200",
                cifra: `[Intro] C G Am F C G F C

[Verso 1]
C              G                 Am          F
Todos os dias quando acordo
C                 G              F  C
Não tenho mais o tempo que passou
C              G                 Am          F
Mas tenho muito tempo
C                 G              F  C
Temos todo o tempo do mundo

[Verso 2]
C              G                 Am          F
Todos os dias antes de dormir
C                 G              F  C
Lembro e esqueço como foi o dia
C              G                 Am          F
Sempre em frente
C                 G              F  C
Não temos tempo a perder

[Refrão]
Am         G          F          C
Nosso suor sagrado
Am         G          F          C
É bem mais belo que esse sangue amargo
Am         G          F          C
E tão sério

[Verso 3]
C              G                 Am          F
E selvagem, selvagem, selvagem
C                 G              F  C
Veja o sol dessa manhã tão cinza
C              G                 Am          F
A tempestade que chega é da cor dos teus olhos
C                 G              F  C
Castanhos

[Final]
C G Am F C G F C (repete e finaliza)`
            },
            {
                id: 39,
                title: "Yellow",
                artist: "Coldplay",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/yellow.pdf",
                thumbnailUrl: "https://picsum.photos/id/139/300/200",
                cifra: `[Intro] G D C G D C

[Verso 1]
G       D        C
Look at the stars
G       D        C
Look how they shine for you
G       D        C
And everything you do
G       D        C
Yeah, they were all yellow

[Verso 2]
G       D        C
I came along
G       D        C
I wrote a song for you
G       D        C
And all the things you do
G       D        C
And it was called yellow

[Refrão]
G          D           C
So then I took my turn
G          D           C
Oh what a thing to have done
G          D           C
And it was all yellow

[Bridge]
C         D        G
Your skin, oh yeah, your skin and bones
C         D        G
Turn into something beautiful
C         D        G
You know, you know I love you so
C         D        G
You know I love you so`
            },
            {
                id: 40,
                title: "Stand by Me",
                artist: "Ben E. King",
                genre: "internacional",
                difficulty: "iniciante",
                pdfUrl: "cifras/stand-by-me.pdf",
                thumbnailUrl: "https://picsum.photos/id/140/300/200",
                cifra: `[Intro] G Em C D

G        Em      C        D
When the night has come and the land is dark
G        Em      C        D
And the moon is the only light we'll see
G        Em      C        D
No, I won't be afraid, oh, I won't be afraid
G        Em      C        D
Just as long as you stand, stand by me`
            },
            {
                id: 41,
                title: "Pais e Filhos",
                artist: "Legião Urbana",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/pais-e-filhos.pdf",
                thumbnailUrl: "https://picsum.photos/id/141/300/200",
                cifra: `[Intro] C G Am F

C         G           Am         F
Estátuas e cofres e paredes pintadas
C         G           Am         F
Ninguém sabe o que aconteceu
C         G           Am         F
Ela se jogou da janela do quinto andar
C         G           Am         F
Nada é fácil de entender`
            },
            {
                id: 42,
                title: "Tocando em Frente",
                artist: "Almir Sater & Renato Teixeira",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/tocando-em-frente.pdf",
                thumbnailUrl: "https://picsum.photos/id/142/300/200",
                cifra: `[Intro] G C D G

G           C         D         G
Ando devagar porque já tive pressa
G           C         D         G
E levo esse sorriso porque já chorei demais
G           C         D         G
Hoje me sinto mais forte, mais feliz quem sabe
G           C         D         G
Só levo a certeza de que muito pouco eu sei, eu nada sei`
            },
            {
                id: 43,
                title: "Adele - Someone Like You",
                artist: "Adele",
                genre: "pop",
                difficulty: "intermediario",
                pdfUrl: "cifras/someone-like-you.pdf",
                thumbnailUrl: "https://picsum.photos/id/143/300/200",
                cifra: `A               C#m
I heard that you're settled down
F#m              D
That you found a girl and you're married now
A               C#m
I heard that your dreams came true
F#m                  D
Guess she gave you things I didn't give to you`
            },
            {
                id: 44,
                title: "Djavan - Oceano",
                artist: "Djavan",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/oceano.pdf",
                thumbnailUrl: "https://picsum.photos/id/144/300/200",
                cifra: `C            G        Am          E7
Assim que o dia amanheceu lá no mar alto da paixão
F        G     Em      Am
Dava pra ver o tempo ruir
F           Dm   G7    C
Dava pra ver o tempo ruir`
            },
            {
                id: 45,
                title: "Tim Maia - Azul da Cor do Mar",
                artist: "Tim Maia",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/azul-da-cor-do-mar.pdf",
                thumbnailUrl: "https://picsum.photos/id/145/300/200",
                cifra: `G                    Em
Ah! Se o mundo inteiro me pudesse ouvir
Am               D7
Tenho muito pra contar
G                 Em
Dizer que aprendi e na vida a gente
Am            D7
Tem que entender que um nasce pra sofrer
G          Em
Enquanto o outro ri`
            },
            {
                id: 46,
                title: "Exaltasamba - Tá Vendo Aquela Lua",
                artist: "Exaltasamba",
                genre: "pagode",
                difficulty: "iniciante",
                pdfUrl: "cifras/ta-vendo-aquela-lua.pdf",
                thumbnailUrl: "https://picsum.photos/id/146/300/200",
                cifra: `G                     D   
Tá vendo aquela lua que brilha lá no céu?
Em                    C
Se você me pedir eu vou buscar`
            },
            {
                id: 47,
                title: "Milton Nascimento - Canção da América",
                artist: "Milton Nascimento",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/cancao-da-america.pdf",
                thumbnailUrl: "https://picsum.photos/id/147/300/200",
                cifra: `G            D/F#         Em
Amigo é coisa para se guardar
C               G     D
Debaixo de sete chaves
G          D/F#  Em
Dentro do coração
C              G     D      G
Assim falava a canção que na América ouvi`
            },
            {
                id: 48,
                title: "CPM 22 - Um Minuto Para o Fim do Mundo",
                artist: "CPM 22",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/um-minuto-para-o-fim-do-mundo.pdf",
                thumbnailUrl: "https://picsum.photos/id/148/300/200",
                cifra: `D   A           F#m
Me sinto só mas eu sei
      G             D
Que um dia eu chego lá
A           F#m
Milhões de olhos no
G      D
Mesmo lugar`
            },
            {
                id: 49,
                title: "Guns N' Roses - Sweet Child O' Mine",
                artist: "Guns N' Roses",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/sweet-child-o-mine.pdf",
                thumbnailUrl: "https://picsum.photos/id/149/300/200",
                cifra: `D         C         G         D
She's got a smile that it seems to me
D       C          G         D
Reminds me of childhood memories
D       C         G          D
Where everything was as fresh as the bright blue sky`
            },
            {
                id: 50,
                title: "Natiruts - Quero Ser Feliz Também",
                artist: "Natiruts",
                genre: "reggae",
                difficulty: "iniciante",
                pdfUrl: "cifras/quero-ser-feliz-tambem.pdf",
                thumbnailUrl: "https://picsum.photos/id/150/300/200",
                cifra: `G   D     Em    C
É preciso paz pra sorrir
G     D     Em     C
É preciso chuva pra florir
G  D  Em      C
Paz, quero paz`
            },
            {
                id: 51,
                title: "Elis Regina - Como Nossos Pais",
                artist: "Elis Regina",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/como-nossos-pais.pdf",
                thumbnailUrl: "https://picsum.photos/id/151/300/200",
                cifra: `C            Am          F             G
Ainda somos os mesmos e vivemos como os nossos pais
C            Am          F             G
Ainda somos os mesmos e vivemos como os nossos pais`
            },
            {
                id: 52,
                title: "Tiago Iorc - Amei Te Ver",
                artist: "Tiago Iorc",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/amei-te-ver.pdf",
                thumbnailUrl: "https://picsum.photos/id/152/300/200",
                cifra: `G                   Em
Amei te ver, amei te ver
C                     D
Você mudou, o que mudou?
G                      Em
Como eu imaginei, como eu imaginei
C                         D
Eu quis você, cê quis também`
            },
            {
                id: 53,
                title: "Green Day - Boulevard Of Broken Dreams",
                artist: "Green Day",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/boulevard-of-broken-dreams.pdf",
                thumbnailUrl: "https://picsum.photos/id/153/300/200",
                cifra: `Em     G      D       A
I walk a lonely road
Em        G        D    A
The only one that I have ever known
Em       G       D         A
Don't know where it goes
Em          G           D        A
But it's home to me, and I walk alone`
            },
            {
                id: 54,
                title: "Falamansa - Xote dos Milagres",
                artist: "Falamansa",
                genre: "forro",
                difficulty: "iniciante",
                pdfUrl: "cifras/xote-dos-milagres.pdf",
                thumbnailUrl: "https://picsum.photos/id/154/300/200",
                cifra: `G             C     D      G
Estava esquecido não sonhava mais
G            C   D     G
Meu coração sem ter alegria
C         G            D       G
Mas aconteceu, como pode acontecer
C       G          D
Você chegou e me salvou`
            },
            {
                id: 55,
                title: "Aline Barros - Ressuscita-me",
                artist: "Aline Barros",
                genre: "gospel",
                difficulty: "iniciante",
                pdfUrl: "cifras/ressuscita-me.pdf",
                thumbnailUrl: "https://picsum.photos/id/155/300/200",
                cifra: `G                  D
Senhor, me sondas e me conheces
Em                 D/F#
Conheces meu levantar
C                  D         G
E meu sentar, sabes todos os caminhos meus`
            },
            {
                id: 56,
                title: "Bon Jovi - Livin' On A Prayer",
                artist: "Bon Jovi",
                genre: "internacional",
                difficulty: "intermediario",
                pdfUrl: "cifras/livin-on-a-prayer.pdf",
                thumbnailUrl: "https://picsum.photos/id/156/300/200",
                cifra: `Em                C
Once upon a time, not so long ago
D                     Em
Tommy used to work on the docks
Em                C
Union's been on strike
D                     Em
He's down on his luck, it's tough, so tough`
            },
            {
                id: 57,
                title: "Planta e Raiz - Aquele Lugar",
                artist: "Planta e Raiz",
                genre: "reggae",
                difficulty: "iniciante",
                pdfUrl: "cifras/aquele-lugar.pdf",
                thumbnailUrl: "https://picsum.photos/id/157/300/200",
                cifra: `G           C        D        G
Naquela manhã acordei mais cedo
      C          D          G
Para ver o sol nascendo no quintal
C            D            G        Em
Senti o ar mais puro e eu me lembrei
C             D              G
De que ali era meu melhor lugar`
            },
            {
                id: 58,
                title: "Aviões do Forró - Inquilina",
                artist: "Aviões do Forró",
                genre: "forro",
                difficulty: "iniciante",
                pdfUrl: "cifras/inquilina.pdf",
                thumbnailUrl: "https://picsum.photos/id/158/300/200",
                cifra: `G            D
Você já pode ir juntando
Em              C
Suas coisas pra sair da minha vida
G             D
Já cancelei seu contrato
Em           C
Você não mora mais no meu coração`
            },
            {
                id: 63,
                title: "Jorge Ben Jor - Taj Mahal",
                artist: "Jorge Ben Jor",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/taj-mahal.pdf",
                thumbnailUrl: "https://picsum.photos/id/201/300/200",
                cifra: `A7
Taj Mahal, Taj Mahal
D7
Taj Mahal, Taj Mahal
A7
Foi a Índia, foi o sol
D7
Foi você, meu amor`
            },
            {
                id: 64,
                title: "Kid Abelha - Como Eu Quero",
                artist: "Kid Abelha",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/como-eu-quero.pdf",
                thumbnailUrl: "https://picsum.photos/id/202/300/200",
                cifra: `G         D         Em
Troque seu cachorro por uma criança pobre
C         G         D
Sem parente, sem carinho, sem rango, sem cobre`
            },
            {
                id: 65,
                title: "Roupa Nova - Linda Demais",
                artist: "Roupa Nova",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/linda-demais.pdf",
                thumbnailUrl: "https://picsum.photos/id/203/300/200",
                cifra: `C         G/B       Am
Você é linda demais
F         G         C
Perfeita aos olhos meus`
            },
            {
                id: 66,
                title: "Zé Ramalho - Chão de Giz",
                artist: "Zé Ramalho",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/chao-de-giz.pdf",
                thumbnailUrl: "https://picsum.photos/id/204/300/200",
                cifra: `Am           G
Eu desço dessa solidão
F           E7
Espalho coisas sobre um chão de giz`
            },
            {
                id: 67,
                title: "Titãs - Epitáfio",
                artist: "Titãs",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/epitafio.pdf",
                thumbnailUrl: "https://picsum.photos/id/205/300/200",
                cifra: `C         G         Am
Devia ter amado mais
F         C         G
Ter chorado mais
Am        F
Ter visto o sol nascer`
            },
            {
                id: 68,
                title: "Ana Carolina - Quem de Nós Dois",
                artist: "Ana Carolina",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/quem-de-nos-dois.pdf",
                thumbnailUrl: "https://picsum.photos/id/206/300/200",
                cifra: `C         G         Am
Eu sei que você gosta de brincar
F         G         C
De amores, às vezes`
            },
            {
                id: 69,
                title: "Paralamas do Sucesso - Lanterna dos Afogados",
                artist: "Paralamas do Sucesso",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/lanterna-dos-afogados.pdf",
                thumbnailUrl: "https://picsum.photos/id/207/300/200",
                cifra: `G         D         Em
Quando você olhar pro céu
C         G         D
E ver uma lanterna acesa`
            },
            {
                id: 70,
                title: "Fábio Jr. - Alma Gêmea",
                artist: "Fábio Jr.",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/alma-gemea.pdf",
                thumbnailUrl: "https://picsum.photos/id/208/300/200",
                cifra: `C         G         Am
Alma gêmea, bate coração
F         G         C
Asa de anjo, luz de tentação`
            },
            {
                id: 71,
                title: "Lulu Santos - Tempos Modernos",
                artist: "Lulu Santos",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/tempos-modernos.pdf",
                thumbnailUrl: "https://picsum.photos/id/209/300/200",
                cifra: `G         D         Em
Eu vejo a vida melhor no futuro
C         G         D
Eu vejo isso por cima do muro`
            },
            {
                id: 72,
                title: "Os Paralamas do Sucesso - Meu Erro",
                artist: "Paralamas do Sucesso",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/meu-erro.pdf",
                thumbnailUrl: "https://picsum.photos/id/210/300/200",
                cifra: `C         G         Am
Eu quis dizer, você não quis escutar
F         G         C
Agora não peça, não me faça promessas`
            },
            {
                id: 73,
                title: "Djavan - Sina",
                artist: "Djavan",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/sina.pdf",
                thumbnailUrl: "https://picsum.photos/id/211/300/200",
                cifra: `G      D/F#  Em        C
A luz de um novo dia vem chegando
G      D/F#   Em      C
Eu penso em você, eu penso em você
G     D/F# Em        C
E fico imaginando nós dois
G      D/F#   Em      C
Eu penso em você, eu penso em você`
            },
            {
                id: 74,
                title: "Led Zeppelin - Stairway To Heaven",
                artist: "Led Zeppelin",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/stairway-to-heaven.pdf",
                thumbnailUrl: "https://picsum.photos/id/212/300/200",
                cifra: `Am      E+      C       D
There's a lady who's sure
Am        E+     C        D
All that glitters is gold
C       D       F  G  Am
And she's buying a stairway to heaven`
            },
            {
                id: 75,
                title: "Pixote - Nem de Graça",
                artist: "Pixote",
                genre: "pagode",
                difficulty: "iniciante",
                pdfUrl: "cifras/nem-de-graca.pdf",
                thumbnailUrl: "https://picsum.photos/id/213/300/200",
                cifra: `C          G
Foi tanto tempo
           Am        F
Com você me iludindo
C          G                         Am   F
Pensou que ia me enganar a vida inteira
C           G
Um dia você
           Am         F
Me vem pedindo perdão
C          G            Am      F
Chorando, dizendo que se arrependeu`
            },
            {
                id: 76,
                title: "Raça Negra - Cheia de Manias",
                artist: "Raça Negra",
                genre: "pagode",
                difficulty: "iniciante",
                pdfUrl: "cifras/cheia-de-manias.pdf",
                thumbnailUrl: "https://picsum.photos/id/214/300/200",
                cifra: `G                      D
Ela é cheia, cheia de manias
Em               C
Uma menina cheia, cheia de manias
G                      D
Ela é cheia, cheia de manias
Em               C
Uma menina cheia, cheia de manias`
            },
            {
                id: 77,
                title: "Revelação - Tá Escrito",
                artist: "Revelação",
                genre: "pagode",
                difficulty: "iniciante",
                pdfUrl: "cifras/ta-escrito.pdf",
                thumbnailUrl: "https://picsum.photos/id/215/300/200",
                cifra: `G                 D
É preciso saber viver
Em                C
É preciso saber viver`
            },
            {
                id: 78,
                title: "Rodriguinho - Fatalmente",
                artist: "Rodriguinho",
                genre: "pagode",
                difficulty: "iniciante",
                pdfUrl: "cifras/fatalmente.pdf",
                thumbnailUrl: "https://picsum.photos/id/216/300/200",
                cifra: `Dm                  F
Quase um ano que a gente
          C                 Gm
Se separou por tantas brigas sem sentido
Dm                   F
Não te liguei, não dei notícia
         C                  Gm
Até por dar-te o tempo que havia pedido`
            },
            {
                id: 79,
                title: "Sorriso Maroto - Ainda Gosto de Você",
                artist: "Sorriso Maroto",
                genre: "pagode",
                difficulty: "iniciante",
                pdfUrl: "cifras/ainda-gosto-de-voce.pdf",
                thumbnailUrl: "https://picsum.photos/id/217/300/200",
                cifra: `Em           Am
Desculpe a visita
D            G
Mas não pude evitar
C           Am
Essa saudade de você
D            G
Me faz lembrar
Em           Am
O tempo passa
D            G
Mas não vou te esquecer`
            },
            {
                id: 80,
                title: "Só Pra Contrariar - Domingo",
                artist: "Só Pra Contrariar",
                genre: "pagode",
                difficulty: "iniciante",
                pdfUrl: "cifras/domingo.pdf",
                thumbnailUrl: "https://picsum.photos/id/218/300/200",
                cifra: `G          D/F#           Em
Te vejo todos os dias na minha janela
C                   D
Minha vista ainda é bela
G         D/F#             Em
Sempre espero por você até anoitecer
C            D
Até o sol se pôr`
            },
            {
                id: 81,
                title: "Fundo de Quintal - O Show Tem Que Continuar",
                artist: "Fundo de Quintal",
                genre: "pagode",
                difficulty: "iniciante",
                pdfUrl: "cifras/o-show-tem-que-continuar.pdf",
                thumbnailUrl: "https://picsum.photos/id/219/300/200",
                cifra: `G                C            D          G
Eu quero ver você sorrir, quero ver você cantar
G              C             D           G
Quero ver você sambar, quero ver se apaixonar`
            },
            {
                id: 82,
                title: "Péricles - Melhor Eu Ir",
                artist: "Péricles",
                genre: "pagode",
                difficulty: "iniciante",
                pdfUrl: "cifras/melhor-eu-ir.pdf",
                thumbnailUrl: "https://picsum.photos/id/220/300/200",
                cifra: `Dm      Bb            A            Dm
É, não, não dá mais para te enganar
Dm               Bb            A
Fingir que tudo vai mudar, não vai
        Dm              Bb         A
Dessa vez é bem melhor eu ir de vez`
            },
            {
                id: 83,
                title: "Ivete Sangalo - Se Eu Não Te Amasse Tanto Assim",
                artist: "Ivete Sangalo",
                genre: "axé",
                difficulty: "iniciante",
                pdfUrl: "cifras/se-eu-nao-te-amasse.pdf",
                thumbnailUrl: "https://picsum.photos/id/221/300/200",
                cifra: `C        G/B      Am
Se eu não te amasse tanto assim
F        G        C
Talvez perdesse os sonhos dentro de mim`
            },
            {
                id: 84,
                title: "Roupa Nova - Dona",
                artist: "Roupa Nova",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/dona.pdf",
                thumbnailUrl: "https://picsum.photos/id/222/300/200",
                cifra: `G           D/F#        Em
Dona desses traiçoeiros sonhos sempre verdadeiros
C           G/B         Am7
Oh, dona desses animais
D7
Dona de seus instintos naturais`
            },
            {
                id: 85,
                title: "Skank - Sutilmente",
                artist: "Skank",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/sutilmente.pdf",
                thumbnailUrl: "https://picsum.photos/id/223/300/200",
                cifra: `C9        G
E sutilmente me faz pensar
Am7       F7M
Que tudo pode mudar`
            },
            {
                id: 86,
                title: "Ana Carolina - Garganta",
                artist: "Ana Carolina",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/garganta.pdf",
                thumbnailUrl: "https://picsum.photos/id/224/300/200",
                cifra: `Am7        D7
Minha garganta reclama
G7M        C7M
Você na minha cama`
            },
            {
                id: 87,
                title: "Jota Quest - Só Hoje",
                artist: "Jota Quest",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/so-hoje.pdf",
                thumbnailUrl: "https://picsum.photos/id/225/300/200",
                cifra: `C9        G
Hoje preciso de você
Am7       F7M
Com qualquer humor, com qualquer sorriso`
            },
            {
                id: 88,
                title: "Fresno - Desde Quando Você Se Foi",
                artist: "Fresno",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/desde-quando-voce-se-foi.pdf",
                thumbnailUrl: "https://picsum.photos/id/226/300/200",
                cifra: `C        G/B      Am
Desde quando você se foi
F        G        C
A solidão ficou em mim`
            },
            {
                id: 89,
                title: "Luan Santana - Meteoro",
                artist: "Luan Santana",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/meteoro.pdf",
                thumbnailUrl: "https://picsum.photos/id/227/300/200",
                cifra: `G        D/F#      Em
Foi como ver o mar
C        G/B      Am7
A primeira vez que meus olhos se viram no seu olhar`
            },
            {
                id: 90,
                title: "Zeca Pagodinho - Deixa a Vida Me Levar",
                artist: "Zeca Pagodinho",
                genre: "samba",
                difficulty: "iniciante",
                pdfUrl: "cifras/deixa-a-vida-me-levar.pdf",
                thumbnailUrl: "https://picsum.photos/id/228/300/200",
                cifra: `G7        C7
Deixa a vida me levar
G7        C7
Vida leva eu`
            },
            {
                id: 91,
                title: "Nando Reis - Por Onde Andei",
                artist: "Nando Reis",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/por-onde-andei.pdf",
                thumbnailUrl: "https://picsum.photos/id/229/300/200",
                cifra: `C9        G
Por onde andei
Am7       F7M
Enquanto você me procurava?`
            },
            {
                id: 92,
                title: "Fagner - Borbulhas de Amor",
                artist: "Fagner",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/borbulhas-de-amor.pdf",
                thumbnailUrl: "https://picsum.photos/id/230/300/200",
                cifra: `G        D/F#      Em
Tenho um coração
C        G/B      Am7
Dividido entre a esperança e a razão`
            },
            {
                id: 93,
                title: "Legião Urbana - Ainda É Cedo",
                artist: "Legião Urbana",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/ainda-e-cedo.pdf",
                thumbnailUrl: "https://picsum.photos/id/231/300/200",
                cifra: `[Intro] E B C#m A (2x)

[Verso 1]
E     B     C#m       A
Uma menina me ensinou
E      B      C#m    A
Quase tudo que eu sei
E     B       C#m         A
Era quase escravidão
E      B     C#m         A
Mas ela me tratava como um rei

[Verso 2]
C#m         G#m
Ela falava alemão
A               E
E eu um pouco de inglês
C#m       G#m        A              B
Quase não dava pra gente se entender
C#m         G#m
Mas ela me ensinou
A               E
O que eu sei até hoje
C#m        G#m      A            B
O que eu ainda sei, o que eu ainda sei

[Refrão]
E        G#m      A        E
Ainda é cedo, amor, mal começaste a conhecer a vida
F#m        C#m      A        B
Já anuncias a hora da partida, sem saber mesmo o rumo que irás tomar

[Final]
E        G#m      A        E
Ainda é cedo, amor, mal começaste a conhecer a vida
F#m        C#m      A        B
Já anuncias a hora da partida, sem saber mesmo o rumo que irás tomar`
            },
            {
                id: 94,
                title: "Rita Lee - Ovelha Negra",
                artist: "Rita Lee",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/ovelha-negra.pdf",
                thumbnailUrl: "https://picsum.photos/id/232/300/200",
                cifra: `[Intro] G D Em C D (2x)

[Verso]
G          D
Levava uma vida sossegada
Em        C           D
Gostava de sombra e água fresca
G          D
Meu Deus, quanto tempo
Em       C      D
Eu passei sem saber

[Refrão]
G    C     D      Em     C      D
Ah! Ah! Ah! A vida é mesmo uma festa
G    C     D      Em     C      D
Ah! Ah! Ah! Descobri que gostava apenas de beleza
G    C     D      Em     C      D
Ah! Ah! Ah! Não sei quando tudo se quebrou
G    C     D      G
Ah! Ah! Ah! Mas sei que nada restou`
            },
            {
                id: 95,
                title: "Alceu Valença - Anunciação",
                artist: "Alceu Valença",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/anunciacao.pdf",
                thumbnailUrl: "https://picsum.photos/id/233/300/200",
                cifra: `[Intro] Am Em B7 Em

Em                           Am
Na bruma leve das paixões que vêm de dentro
B7                          Em
Tu vens chegando pra brincar no meu quintal
Em                      Am
No teu cavalo peito nu, cabelo ao vento
B7                         Em
E o sol quarando nossas roupas no varal

[Refrão]
Am   B7  Em
Tu vens, tu vens
C          Am   D7        G
Eu já escuto os teus sinais
Em   B7    Em
Tu vens, tu vens
C          Am    B7        Em
Eu já escuto os teus sinais`
            },
            {
                id: 96,
                title: "Marisa Monte - Amor I Love You",
                artist: "Marisa Monte",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/amor-i-love-you.pdf",
                thumbnailUrl: "https://picsum.photos/id/234/300/200",
                cifra: `[Intro] D Bm G A (2x)

D               Bm
Deixa eu dizer que te amo
G                 A
Deixa eu pensar em você
D              Bm
Isso me acalma, me acolhe a alma
G              A
Isso me ajuda a viver

[Refrão]
D       A/C#       Bm
Hoje contei pras paredes
G                 D
Coisas do meu coração
A/C#            Bm
Passeei no tempo, caminhei nas horas
G               D    A
Mais do que passo a paixão
D       A/C#      Bm
É um espelho sem razão
G        D        A    Bm  G  A
Quer amor, amor, amor, I love you`
            },
            {
                id: 97,
                title: "Caetano Veloso - Sampa",
                artist: "Caetano Veloso",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/sampa.pdf",
                thumbnailUrl: "https://picsum.photos/id/235/300/200",
                cifra: `[Intro] E7 Am D7 G C Am B7 Em

Em                 Am
Alguma coisa acontece no meu coração
D7                  G               C
Que só quando cruza a Ipiranga e a Avenida São João
Am     B7         Em
É que quando eu cheguei por aqui eu nada entendi
Am                           B7                  Em
Da dura poesia concreta de tuas esquinas, da deselegância discreta de tuas meninas

C            B7
Ainda não havia para mim Rita Lee
C                B7
A tua mais completa tradução
C           Am           B7        Em
Alguma coisa acontece no meu coração
Am            D7              G             C
Que só quando cruza a Ipiranga e a Avenida São João`
            },
            {
                id: 98,
                title: "O Rappa - O Que Sobrou do Céu",
                artist: "O Rappa",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/o-que-sobrou-do-ceu.pdf",
                thumbnailUrl: "https://picsum.photos/id/236/300/200",
                cifra: `[Intro] Em G C D (2x)

Em              G
Todo dia quando acordo
C              D
Não tenho mais
Em               G
O tempo que passou
C              D
Mas tenho muito tempo
Em              G        C        D
Temos todo o tempo do mundo

[Refrão]
Em      G         C         D
Toda manhã você chega calado
Em       G      C             D
Com a luz do dia, com um sorriso no rosto
Em        G         C            D
Como se nessa vida houvesse alegria
Em       G        C        D
Como se nessa vida existisse beleza

[Final]
Em                 G         C        D
E é isso que me dá força pra seguir em frente
Em                G            C        D
Todo dia quando eu acordo tenho o seu sorriso`
            },
            {
                id: 99,
                title: "Anavitória - Singular",
                artist: "Anavitória",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/singular.pdf",
                thumbnailUrl: "https://picsum.photos/id/237/300/200",
                cifra: `[Intro] C Em Am F G

C           Em      Am
De todas as coisas que eu já te falei
F               G
Das que eu ainda vou te confessar
C          Em          Am
É que mesmo sem saber seu nome
F               G
Já te amava pelo simples dom
F            Em         Am
De me fazer sorrir e derreter
Dm               G
Todo o gelo que há em mim
F            G         C
Um anjo me mandou você

[Refrão]
Am    Em         F     C    G
Se a vida nos deixar ficar
Am      Em         F
Eu vou te amar por toda vida
C       G         Am  F C G
Você é singular pra mim
Am    Em           F
És quem me faz sorrir assim`
            },
            {
                id: 100,
                title: "Tim Maia - Ela Partiu",
                artist: "Tim Maia",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/ela-partiu.pdf",
                thumbnailUrl: "https://picsum.photos/id/238/300/200",
                cifra: `[Intro] A D E A

A        D         E          A
Ela partiu, foi numa onda do mar
A         D          E           A
Foi no vento que passa e me deixou
A        D          E           A
Não sei o que fazer de mim
A             D         E    A
Acabou meu tempo de sonhar

[Refrão]
D            E
E eu não sei mais quanto tempo espero
A         F#m
E não sei quando é que eu volto
D             E          A
Pro meu lugar no mundo de alguém`
            },
            {
                id: 101,
                title: "Jorge & Mateus - Propaganda",
                artist: "Jorge & Mateus",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/propaganda.pdf",
                thumbnailUrl: "https://picsum.photos/id/239/300/200",
                cifra: `[Intro] D A Bm G (2x)

D           A
Olhei, parei, sorri
Bm           G
Só de pensar em te ver
D           A
Nem dormi, ansioso
Bm            G
Pra saber como é que é

D                A
De cara eu já vi que é proposta indecente
Bm                    G
Mas quem é que pode com essa vontade da gente

[Refrão]
D                 A          Bm               G
To apaixonado, tão apaixonado, tão apaixonado por você
D                 A          Bm               G
To empolgado, tão empolgado, tão empolgado por você
D                 A
To fascinado, admirado
Bm               G
Tão de bem com você
D                 A                Bm                  G
To apaixonado, que vontade, to com vontade de você`
            },
            {
                id: 102,
                title: "Cássia Eller - Palavras ao Vento",
                artist: "Cássia Eller",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/palavras-ao-vento.pdf",
                thumbnailUrl: "https://picsum.photos/id/240/300/200",
                cifra: `[Intro] D Bm G A 

D               Bm              G              A
Jogaram as palavras ao vento, e o vento não vai levar
D               Bm              G              A
Jogaram as palavras ao vento, e o vento não vai levar

G             A            F#m           Bm
Jogaram as palavras ao vento pra me machucar
G             A              F#m            Bm
Coisas que se dizem num momento sem pensar

G             A            F#m           Bm
O vento não vai levar, o vento não vai levar
G             A            F#m           Bm
O vento não vai levar, o vento não vai levar`
            },
            {
                id: 103,
                title: "Zezé Di Camargo & Luciano - É o Amor",
                artist: "Zezé Di Camargo & Luciano",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/e-o-amor.pdf",
                thumbnailUrl: "https://picsum.photos/id/241/300/200",
                cifra: `[Intro] G D/F# Em C D G

G                 D/F#
Eu não vou negar que sou louco por você
Em           C      D       G
Tô maluco pra te ver, foi assim
G              D/F#
Desde o momento em que eu te vi
Em           C       D        G
Minha vida é você, só você

G                 D/F#
Eu não vou negar que sou louco por você
Em           C      D       G
Tô maluco pra te ver, foi assim

[Refrão]
G                 D/F#
É o amor, que mexe com minha cabeça e me deixa assim
Em               C      D      G
Que faz eu pensar em você e esquecer de mim
G                 D/F#
Que faz eu esquecer que a vida é feita pra viver
Em            C      D      G
É o amor, que veio como um tufão e me deixou assim
G                 D/F#
Que faz eu pensar em você e esquecer de mim
Em                  C      D       G
Que faz eu esquecer que a vida é feita pra viver`
            },
            {
                id: 104,
                title: "Mamonas Assassinas - Pelados em Santos",
                artist: "Mamonas Assassinas",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/pelados-em-santos.pdf",
                thumbnailUrl: "https://picsum.photos/id/242/300/200",
                cifra: `[Intro] Fm Bb Eb Ab

Eb                      Bb
Mina, seus cabelo é da hora
Fm                       Cm
Seu corpão violão, meu docinho de coco
Eb                      Bb
Tá me deixando louco, tô ficando tonto
Fm                        Cm
Se eu te pego, não tem pra ninguém
Eb                      Bb
Não tem pra mais ninguém, o amor
Fm                      Cm
É com esse seu jeito, seu corpão, seu rosto

Ab            Eb
Meu docinho de coco 
Bb7          Eb
Eu quero é ficar com você
Ab            Eb
Meu docinho de coco 
Bb7          Eb
Eu quero é ficar com você

[Refrão]
Eb                   Ab
Ai, ai, ai, eu vou a Santos
Bb                       Eb
De trem, ai, ai, eu vou de trem
Eb                   Ab
Ai, ai, ai, eu vou a Santos
Bb                       Eb
De trem, ai, ai, eu vou de trem`
            },
            {
                id: 105,
                title: "Queen - Bohemian Rhapsody",
                artist: "Queen",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/bohemian-rhapsody.pdf",
                thumbnailUrl: "https://picsum.photos/id/243/300/200",
                cifra: `[Intro] A# F Gm Gm

Gm             Eb
Is this the real life?
Bb                    F
Is this just fantasy?
Gm                     Eb
Caught in a landslide, no escape from reality
Gm                    Bb7
Open your eyes, look up to the skies and see
Eb              Bb
I'm just a poor boy, I need no sympathy
Ab         Eb         Bb     F
Because I'm easy come, easy go, little high, little low
Ab        Eb             Bb                F
Any way the wind blows doesn't really matter to me
Eb
To me

[Verso 1]
Bb                F
Mama, just killed a man
Bb                           Eb
Put a gun against his head, pulled my trigger now he's dead
Bb               F
Mama, life had just begun
Bb                            Eb
But now I've gone and thrown it all away
Ab           Eb                     Bb            F   Bb
Mama, oooooh, didn't mean to make you cry
         Gm                Bb
If I'm not back again this time tomorrow
Gm           Bb
Carry on, carry on
         Eb
As if nothing really matters`
            },
            {
                id: 106,
                title: "Engenheiros do Hawaii - Infinita Highway",
                artist: "Engenheiros do Hawaii",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/infinita-highway.pdf",
                thumbnailUrl: "https://picsum.photos/id/244/300/200",
                cifra: `[Intro] F C Bb F (2x)

F              C
Você me faz correr demais
Bb              F
Os riscos desta highway
F              C
Você me faz correr atrás
Bb                F
Do horizonte desta highway

F                 C
Ninguém por perto, silêncio no deserto
Bb                  F
Deserta highway, estamos sós
F                 C
E nenhum dos dois, sabe exatamente
Bb                F
Onde vai dar essa highway

[Refrão]
         C             Bb
Mas não importa, quando eu
         F            Dm
Quero roubar sua luz, mais luz
        C             Bb            F
Que o sol, teu brilho ofusca os olhos meus

F                 C
Por isso é sempre bom lembrar
Bb                  F
Que o retrovisor, não diminui`
            },
            {
                id: 107,
                title: "Gilberto Gil - Andar com Fé",
                artist: "Gilberto Gil",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/andar-com-fe.pdf",
                thumbnailUrl: "https://picsum.photos/id/245/300/200",
                cifra: `[Intro] D A7 D G A7 D

D                       A7
Andar com fé eu vou, que a fé não costuma falhar
D                              G     A7      D
Andar com fé eu vou, que a fé não costuma falhar
D                       A7
Andar com fé eu vou, que a fé não costuma falhar
D                              G     A7      D
Andar com fé eu vou, que a fé não costuma falhar

D                            A7
A pé ou de avião, baixando o sertão ou no litoral
D                                  G         A7        D
Andando em procissão ou dançando o carnaval, o carnaval

Bm                               A7       D
Feito menino, correndo atrás da bola na rua
Bm                           A7      D
Pulando obstáculo, ou amarelinha, com chuva`
            }            ,
            {
                id: 108,
                title: "Estradas do Tempo",
                artist: "Violões do Cerrado",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/estradas-do-tempo.pdf",
                thumbnailUrl: "https://picsum.photos/id/246/300/200",
                cifra: `[Intro] Am G F E7 (2x)
            
            Am                  G
            Na estrada que percorro sozinho
            F                     E7
            Entre o céu e a terra, vou seguindo
            Am                    G
            Cada passo deixa marcas no caminho
            F                     E7
            Cada escolha, uma história por contar
            
            [Refrão]
            Dm                G
            E quando a noite chega
            C                 Am
            Com seu manto de mistério
            Dm                G
            As estrelas são as luzes
            C                E7
            Que me guiam pelo tempo
            
            [Verso 2]
            Am                G
            Tantas curvas já passei
            F                   E7
            Tantas pedras encontrei
            Am                    G
            Mas o horizonte sempre chama
            F                    E7
            E eu não posso parar de caminhar`
            },
            {
                id: 109,
                title: "Flor do Sertão",
                artist: "Raízes Nordestinas",
                genre: "forro",
                difficulty: "iniciante",
                pdfUrl: "cifras/flor-do-sertao.pdf",
                thumbnailUrl: "https://picsum.photos/id/247/300/200",
                cifra: `[Intro] D A7 D G A7 D
            
            D                A7
            Na terra seca do sertão
                          D
            Uma flor nasceu
                         G
            No meio da poeira
                      D
            Do chão que ardeu
                       A7        D
            Mas resistiu e floresceu
            
            [Refrão]
            G               D
            Ó flor, flor do sertão
            A7                D
            Tão forte como meu coração
            G               D
            Ó flor, flor do sertão
            A7                D
            Que vive mesmo na solidão
            
            [Verso 2]
            D                 A7
            O sol castiga sem piedade
                           D
            Mas você não cede
                          G
            As águas são raras
                          D
            Mas você não sede
                         A7       D
            E segue em frente com fé`
            },
            {
                id: 110,
                title: "Reflexos da Cidade",
                artist: "Urbe Coletivo",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/reflexos-da-cidade.pdf",
                thumbnailUrl: "https://picsum.photos/id/248/300/200",
                cifra: `[Intro] Em C G D (2x)
            
            Em                    C
            Luzes que piscam na avenida
            G                    D
            Olhos que não veem mais nada
            Em                 C
            Prédios que tocam o céu
            G                     D
            Mas não alcançam as estrelas
            
            [Refrão]
            Am            C
            São os reflexos da cidade
            G             D
            Entre o concreto e a solidão
            Am            C
            São os reflexos da cidade
            G             D
            Que moram no meu coração
            
            [Verso 2]
            Em                   C
            Buzinas, passos apressados
            G                   D
            O tempo que não espera
            Em                  C
            Entre sorrisos perdidos
            G                      D
            Procuro alguma primavera`
            },
            {
                id: 111,
                title: "Ondas do Mar Aberto",
                artist: "Maresia",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/ondas-do-mar.pdf",
                thumbnailUrl: "https://picsum.photos/id/249/300/200",
                cifra: `[Intro] Bm G A F# (2x)
            
            Bm              G
            Nas ondas do mar aberto
            A                  F#
            Meu pensamento navega
            Bm              G
            Entre correntes de sentimentos
            A               F#
            E a brisa que me carrega
            
            [Refrão]
            G              D
            Vou ao encontro do horizonte
            Em                   A
            Onde o céu beija o oceano
            G              D
            Vou ao encontro do horizonte
            Em               A
            Sem temer o desengano
            
            [Verso 2]
            Bm              G
            Cada onda tem uma história
            A                   F#
            Cada maré traz lembranças
            Bm                G
            No balanço do mar da vida
            A                 F#
            Encontro minhas esperanças`
            },
            {
                id: 112,
                title: "Vento na Janela",
                artist: "Aurora do Campo",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/vento-na-janela.pdf",
                thumbnailUrl: "https://picsum.photos/id/250/300/200",
                cifra: `[Intro] C F G C
            
            C              F
            O vento bate na janela
            G               C
            Trazendo sons da natureza
            Am             F
            As cortinas dançam leves
            G                C
            Como se fossem borboletas
            
            [Refrão]
            F               G
            Deixa entrar esse vento
            C               Am
            Que traz novas histórias
            F               G
            Deixa entrar esse vento
            C
            Renovando a memória
            
            [Verso 2]
            C                F
            A casa cheia de segredos
            G               C
            Guarda o tempo que passou
            Am              F
            Mas o vento sempre chega
            G                  C
            Com o novo que chegou`
            },
            {
                id: 113,
                title: "Canção das Montanhas",
                artist: "Altitude Serrana",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/cancao-das-montanhas.pdf",
                thumbnailUrl: "https://picsum.photos/id/251/300/200",
                cifra: `[Intro] D A Bm G (2x)
            
            D                    A
            No alto das montanhas verdes
            Bm                  G
            Onde as nuvens tocam o chão
            D                   A
            O silêncio fala mais alto
            Bm                G
            Que qualquer canção
            
            [Refrão]
            G               D
            E as montanhas cantam
            A                  Bm
            Uma melodia ancestral
            G              D
            E as montanhas guardam
            A              Bm
            Segredos do natural
            
            [Verso 2]
            D                  A
            Pássaros cruzam o vale
            Bm                 G
            Em busca do seu lugar
            D                   A
            O eco da voz das pedras
            Bm                G
            Ressoa no meu cantar`
            },
            {
                id: 114,
                title: "Lua de Cristal",
                artist: "Noites Claras",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/lua-de-cristal.pdf",
                thumbnailUrl: "https://picsum.photos/id/252/300/200",
                cifra: `[Intro] G D Em C (2x)
            
            G                D
            Lua de cristal no céu
            Em                 C
            Brilhando sobre nós dois
            G                  D
            Ilumina os caminhos
            Em                C
            Que nos levam até depois
            
            [Refrão]
            C               D
            Lua que clareia a noite
            G              Em
            E os sonhos de quem quer
            C               D
            Lua que ilumina a vida
            G
            De você e eu
            
            [Verso 2]
            G                D
            Entre estrelas e segredos
            Em                C
            Encontrei minha canção
            G                 D
            Na luz prateada da lua
            Em                C
            Descobri minha paixão`
            },
            {
                id: 115,
                title: "Rota dos Navegantes",
                artist: "Bússolas do Mar",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/rota-dos-navegantes.pdf",
                thumbnailUrl: "https://picsum.photos/id/253/300/200",
                cifra: `[Intro] Dm Bb F C (2x)
            
            Dm              Bb
            Cartas náuticas antigas
            F                C
            Mostram o caminho do mar
            Dm              Bb
            Entre ilhas e continentes
            F                  C
            A história vamos navegar
            
            [Refrão]
            F                  C
            Na rota dos navegantes
            Bb                Dm
            Onde o destino se traça
            F                 C
            Na rota dos navegantes
            Bb               A
            Nossa jornada não passa
            
            [Verso 2]
            Dm               Bb
            Bússolas apontam o norte
            F                 C
            Mas é o coração que guia
            Dm               Bb
            Entre corais e tormentas
            F                C
            Encontramos a harmonia`
            },
            {
                id: 116,
                title: "Entardecer na Cidade",
                artist: "Concreto e Poesia",
                genre: "pop",
                difficulty: "intermediario",
                pdfUrl: "cifras/entardecer.pdf",
                thumbnailUrl: "https://picsum.photos/id/254/300/200",
                cifra: `[Intro] C Em Am F G (2x)
            
            C                Em
            O sol se põe devagar
            Am                F             G
            Entre os prédios da cidade agitada
            C                 Em
            As sombras crescem no chão
            Am              F           G
            E a correria vai se acalmando
            
            [Refrão]
            F              G
            No entardecer da vida
            Em             Am
            Quando o dia se despede
            F              G
            No entardecer dourado
            C
            Há beleza que não se mede
            
            [Verso 2]
            C                 Em
            As luzes vão se acendendo
            Am                  F             G
            Enquanto o céu pinta-se de laranja e roxo
            C                  Em
            A cidade muda seu ritmo
            Am            F            G
            E mostra sua outra face`
            },
            {
                id: 117,
                title: "Dança das Chamas",
                artist: "Ritos Ancestrais",
                genre: "world",
                difficulty: "avancado",
                pdfUrl: "cifras/danca-das-chamas.pdf",
                thumbnailUrl: "https://picsum.photos/id/255/300/200",
                cifra: `[Intro] Am E7 Dm E7 Am (2x)
            
            Am              E7
            Na dança das chamas
            Dm             E7           Am
            Os espíritos antigos despertam
            Am             E7
            Tambores ressoam
            Dm            E7        Am
            Ao ritmo do coração da terra
            
            [Refrão]
            Dm             Am
            Dança, dança, livre
            E7             Am
            Como o fogo que não se apaga
            Dm             Am
            Dança, dança, forte
            E7            Am
            Como ancestrais que não se calam
            
            [Verso 2]
            Am               E7
            Círculos de luz na escuridão
            Dm               E7         Am
            Contam histórias que o tempo guardou
            Am                E7
            Movimentos que atravessam eras
            Dm             E7        Am
            Em cada gesto, vida se renovou`
            }            ,
            {
                id: 118,
                title: "Ventos do Vale",
                artist: "Cordas Livres",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/ventos-do-vale.pdf",
                thumbnailUrl: "https://picsum.photos/id/256/300/200",
                cifra: `[Intro] D A Bm G (2x)
            
            D               A
            Pelos campos do vale
            Bm              G
            O vento vem cantar
            D                A
            Trazendo nas suas asas
            Bm                 G
            Histórias de outro lugar
            
            [Refrão]
            G              D
            Vento que vem, vento que vai
            A                 Bm
            Leva saudade, traz liberdade
            G              D
            Vento que vai, vento que vem
            A              Bm
            Sopra esperança também
            
            [Verso 2]
            D                A
            Nas montanhas distantes
            Bm              G
            Ecoam os sons do ar
            D               A
            E a melodia do vento
            Bm              G
            Me faz querer sonhar`
            },
            {
                id: 119,
                title: "Cores da Natureza",
                artist: "Jasmins da Mata",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/cores-da-natureza.pdf",
                thumbnailUrl: "https://picsum.photos/id/257/300/200",
                cifra: `[Intro] F C Am G (2x)
            
            F              C
            Verde das florestas
            Am               G
            Azul do céu sem fim
            F               C
            Cada cor tem seu tom
            Dm              G
            Cada cor fala em mim
            
            [Refrão]
            Bb              F
            São as cores da natureza
            C               Dm
            Que pintam meu coração
            Bb              F
            São as cores da beleza
            C               F
            Que inspiram esta canção
            
            [Verso 2]
            F               C
            Amarelo do sol que aquece
            Am              G
            Vermelho do entardecer
            F                C
            As cores vão se misturando
            Dm                G
            Como a vida a florescer`
            },
            {
                id: 120,
                title: "Madrugada Sertaneja",
                artist: "Trio Horizonte",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/madrugada-sertaneja.pdf",
                thumbnailUrl: "https://picsum.photos/id/258/300/200",
                cifra: `[Intro] G D Em C (2x)
            
            G                D
            Na madrugada sertaneja
            Em               C
            O galo canta no terreiro
            G                 D
            A lua ainda brilha clara
            Em              C
            No céu estrelado de janeiro
            
            [Refrão]
            C               D
            O campo acorda devagar
            G                Em
            No balanço da viola
            C                D
            E a vida segue seu caminho
            G
            No compasso da natureza
            
            [Verso 2]
            G                D
            O café quente na chaleira
            Em                C
            O cheiro de pão na fornalha
            G                D
            Simplicidade verdadeira
            Em               C
            Que o sertanejo não falha`
            },
            {
                id: 121,
                title: "Ondas do Oceano",
                artist: "Marés do Sul",
                genre: "pop",
                difficulty: "intermediario",
                pdfUrl: "cifras/ondas-do-oceano.pdf",
                thumbnailUrl: "https://picsum.photos/id/259/300/200",
                cifra: `[Intro] Am F C G (2x)
            
            Am              F
            Ondas que vêm e que vão
            C                G
            No ritmo do coração
            Am            F
            Mistérios do mar sem fim
            C              G
            Contam segredos pra mim
            
            [Refrão]
            F              C
            Ondas do oceano profundo
            G              Am
            Lavam as margens da terra
            F              C
            Levam tristezas embora
            G              Am
            Trazem o sal que me espera
            
            [Verso 2]
            Am              F
            Brisa marinha no rosto
            C               G
            Areia fina nos pés
            Am              F
            Momento de paz infinito
            C               G
            Vida que flui através`
            },
            {
                id: 122,
                title: "Batuque do Morro",
                artist: "Roda de Samba Raiz",
                genre: "samba",
                difficulty: "avancado",
                pdfUrl: "cifras/batuque-do-morro.pdf",
                thumbnailUrl: "https://picsum.photos/id/260/300/200",
                cifra: `[Intro] Dm A7 Dm C7 F A7 Dm
            
            Dm                 A7
            Lá no alto do morro o samba rola
            Dm                C7
            A noite inteira até o amanhecer
            F                 C
            Pandeiro, cavaco e violão
            A7                Dm
            Fazem a alma se remexer
            
            [Refrão]
            F                 C
            É o batuque que chama
            A7                Dm
            É o povo que responde
            F                 C
            Na palma da mão, no pé
            A7               Dm
            O samba não se esconde
            
            [Verso 2]
            Dm                A7
            A lua observa lá do céu
            Dm                  C7
            Abençoando os bambas do lugar
            F                 C
            Batuque que ecoa pelo ar
            A7                Dm
            Fazendo todo mundo cantar`
            },
            {
                id: 123,
                title: "Luz da Manhã",
                artist: "Aurora Nova",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/luz-da-manha.pdf",
                thumbnailUrl: "https://picsum.photos/id/261/300/200",
                cifra: `[Intro] C G Am F (2x)
            
            C               G
            A luz da manhã desperta
            Am              F
            Novos sonhos em mim
            C               G
            Cada dia que começa
            Am              F
            É um novo recomeçar
            
            [Refrão]
            F               G
            E eu sigo em frente
            Am              C
            Com o sol a me guiar
            F               G
            Deixo pra trás as sombras
            Am              F   G   C
            E encontro um novo lugar
            
            [Verso 2]
            C               G
            As nuvens se dissipam
            Am              F
            Clareia o horizonte
            C               G
            Cada passo que eu dou
            Am              F
            Me leva mais adiante`
            },
            {
                id: 124,
                title: "Voar Como o Vento",
                artist: "Asas Livres",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/voar-como-o-vento.pdf",
                thumbnailUrl: "https://picsum.photos/id/262/300/200",
                cifra: `[Intro] E B C#m A (2x)
            
            E               B
            Quero voar como o vento
            C#m             A
            Livre por sobre o mar
            E               B
            Sentir a brisa no rosto
            C#m             A
            Sem ter com o que me preocupar
            
            [Refrão]
            A               B
            Vou rasgar os céus
            C#m             G#m
            Cruzar as fronteiras
            A               B
            Alcançar horizontes
            E
            Que nem posso imaginar
            
            [Verso 2]
            E               B
            Deixo pra trás o medo
            C#m             A
            Abro as asas e vou
            E               B
            O mundo é muito pequeno
            C#m             A
            Para quem sabe voar`
            },
            {
                id: 125,
                title: "Canção da Terra",
                artist: "Filhos da Natureza",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/cancao-da-terra.pdf",
                thumbnailUrl: "https://picsum.photos/id/263/300/200",
                cifra: `[Intro] Am G F E7 (2x)
            
            Am              G
            A terra canta em silêncio
            F               E7
            Uma canção ancestral
            Am              G
            Que poucos param pra ouvir
            F               E7
            Mas que nunca deixou de ecoar
            
            [Refrão]
            Dm              Am
            É o pulsar da vida
            E7              Am
            É o clamor da floresta
            Dm              G
            É o sussurro das águas
            C               E7
            Que ainda resiste e não se cala
            
            [Verso 2]
            Am              G
            Árvores, rios e montanhas
            F               E7
            Têm muito o que nos contar
            Am              G
            Histórias de um tempo antigo
            F               E7
            Que precisamos resgatar`
            },
            {
                id: 126,
                title: "Batidas do Coração",
                artist: "Pulsação",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/batidas-do-coracao.pdf",
                thumbnailUrl: "https://picsum.photos/id/264/300/200",
                cifra: `[Intro] G D Em C (2x)
            
            G               D
            As batidas do coração
            Em              C
            Marcam o ritmo da vida
            G               D
            Cada pulso, cada emoção
            Em              C
            Uma história a ser vivida
            
            [Refrão]
            C               D
            E quando te vejo sorrir
            G               Em
            Meu coração acelera
            C               D
            São batidas de amor
            G
            Que nunca param de tocar
            
            [Verso 2]
            G               D
            O tempo passa devagar
            Em              C
            Quando estou ao seu lado
            G               D
            E meu peito a vibrar
            Em              C
            Diz que estou apaixonado`
            },
            {
                id: 127,
                title: "Noite Estrelada",
                artist: "Cosmos",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/noite-estrelada.pdf",
                thumbnailUrl: "https://picsum.photos/id/265/300/200",
                cifra: `[Intro] D A G D (2x)
            
            D               A
            Na noite estrelada
            G               D
            Encontrei meu caminho
            D               A
            Luzes cintilantes
            G               D
            Guiando meu destino
            
            [Refrão]
            G               A
            Estrelas que brilham
            Bm              G
            Contam histórias antigas
            D               A
            Segredos do universo
            G               D
            Que o tempo não apaga
            
            [Verso 2]
            D               A
            A lua no horizonte
            G               D
            Ilumina a escuridão
            D               A
            E o céu noturno imenso
            G               D
            Acalenta o coração`
            },
            {
                id: 128,
                title: "Festa na Aldeia",
                artist: "Tambores da Terra",
                genre: "world",
                difficulty: "avancado",
                pdfUrl: "cifras/festa-na-aldeia.pdf",
                thumbnailUrl: "https://picsum.photos/id/266/300/200",
                cifra: `[Intro] Em D C B7 (2x)
            
            Em              D
            Os tambores ressoam
            C               B7
            Na festa da aldeia
            Em              D
            Ancestralidade viva
            C               B7
            Que o tempo não leva
            
            [Refrão]
            G               D
            Dança, povo, dança
            Am              C
            Celebra a existência
            G               D
            Honra os antepassados
            B7              Em
            Preserva a essência
            
            [Verso 2]
            Em              D
            O fogo ilumina rostos
            C               B7
            De gerações unidas
            Em              D
            Compartilhando histórias
            C               B7
            Renovando a vida`
            },
            {
                id: 129,
                title: "Caminhos de Terra",
                artist: "Poeira da Estrada",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/caminhos-de-terra.pdf",
                thumbnailUrl: "https://picsum.photos/id/267/300/200",
                cifra: `[Intro] C G Am F (2x)
            
            C               G
            Caminhos de terra batida
            Am              F
            Que levam a qualquer lugar
            C               G
            O viajante segue sozinho
            Am              F
            Sem saber onde vai chegar
            
            [Refrão]
            F               G
            A estrada é longa, amigo
            Em              Am
            Mas vale a pena seguir
            F               G
            Cada passo é uma história
            C
            Cada curva um porvir
            
            [Verso 2]
            C               G
            Poeira vermelha nos pés
            Am              F
            Sol forte sobre a cabeça
            C               G
            A sede aperta a garganta
            Am              F
            Mas a vontade não cessa`
            },
            {
                id: 130,
                title: "Dança da Chuva",
                artist: "Gotas Musicais",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/danca-da-chuva.pdf",
                thumbnailUrl: "https://picsum.photos/id/268/300/200",
                cifra: `[Intro] Am Em F G (2x)
            
            Am              Em
            Pingos de chuva dançando
            F               G
            Na janela embaçada
            Am              Em
            Melodia que encanta
            F               G
            Numa tarde nublada
            
            [Refrão]
            C               F
            Dança da chuva, vem molhar
            G               Am
            O chão seco da cidade
            C               F
            Lava as ruas, limpa a alma
            G               Am
            Traz nova felicidade
            
            [Verso 2]
            Am              Em
            Nuvens escuras no céu
            F               G
            Trovões ao longe a rufar
            Am              Em
            A natureza tem seu ritmo
            F               G
            Que devemos respeitar`
            },
            {
                id: 131,
                title: "Sonhos de Criança",
                artist: "Astronautas do Quintal",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/sonhos-de-crianca.pdf",
                thumbnailUrl: "https://picsum.photos/id/269/300/200",
                cifra: `[Intro] D G A D (2x)
            
            D               G
            Castelos de areia
            A               D
            Dragões de papel
            D               G
            Astronautas do quintal
            A               D
            Princesas do carrossel
            
            [Refrão]
            G               A
            Sonhos de criança
            Bm              G
            Nunca devem acabar
            D               A
            Mesmo quando crescemos
            G               D
            Precisamos sonhar
            
            [Verso 2]
            D               G
            Chuva de estrelas cadentes
            A               D
            Tesouros no fim do arco-íris
            D               G
            Mundos mágicos distantes
            A               D
            Que só a imaginação visita`
            },
            {
                id: 132,
                title: "Café com Viola",
                artist: "Manhãs da Roça",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/cafe-com-viola.pdf",
                thumbnailUrl: "https://picsum.photos/id/270/300/200",
                cifra: `[Intro] G D C G (2x)
            
            G               D
            Café fresco na chaleira
            C               G
            Viola no canto da sala
            G               D
            O sol nascendo na serra
            C               G
            E o galo que não se cala
            
            [Refrão]
            C               D
            É mais um dia que começa
            Em              G
            Na simplicidade da roça
            C               D
            Trabalho, fé e alegria
            G
            Na paz que o campo nos dá
            
            [Verso 2]
            G               D
            Mãos calejadas de esperança
            C               G
            Plantam o futuro na terra
            G               D
            A viola toca baixinho
            C               G
            Histórias de quem não desiste`
            }            ,
            {
                id: 133,
                title: "Manhã de Sol",
                artist: "Raios de Luz",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/manha-de-sol.pdf",
                thumbnailUrl: "https://picsum.photos/id/271/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D               A
                Acordar com o sol
                Bm              G
                É como um novo começo
                D               A
                Cada dia que nasce
                Bm              G
                Traz uma nova canção
                
                [Refrão]
                G               A
                E o sol vai brilhar
                Bm              G
                Iluminando o caminho
                D               A
                E o dia vai sorrir
                Bm              G
                Espantando a escuridão`
            },
            {
                id: 134,
                title: "Entre Montanhas",
                artist: "Vales Verdes",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/entre-montanhas.pdf",
                thumbnailUrl: "https://picsum.photos/id/272/300/200",
                cifra: `[Intro] C Am Em G (2x)
                
                C               Am
                Entre montanhas verdes
                Em              G
                Encontrei a paz que buscava
                C               Am
                O vento sussurra segredos
                Em              G
                Que só a alma entende
                
                [Refrão]
                F               G
                Voar como as águias
                Em              Am
                Sobre os vales profundos
                F               G
                Sentir a liberdade
                C
                Que só a natureza nos dá`
            },
            {
                id: 135,
                title: "Caminho das Pedras",
                artist: "Trilhas Antigas",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/caminho-das-pedras.pdf",
                thumbnailUrl: "https://picsum.photos/id/273/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G               D
                No caminho das pedras
                Em              C
                Aprendi a caminhar
                G               D
                Cada passo é um ensinamento
                Em              C
                Cada tropeço uma lição
                
                [Refrão]
                C               D
                A vida é essa estrada
                Em              C
                De pedras e de flores
                G               D
                O que importa é seguir
                Em              C
                Com força e com amor`
            },
            {
                id: 136,
                title: "Mar de Estrelas",
                artist: "Constelação",
                genre: "pop",
                difficulty: "avancado",
                pdfUrl: "cifras/mar-de-estrelas.pdf",
                thumbnailUrl: "https://picsum.photos/id/274/300/200",
                cifra: `[Intro] Bm G D A (2x)
                
                Bm              G
                Sob o céu estrelado
                D               A
                Mergulho em pensamentos
                Bm              G
                Cada estrela é um desejo
                D               A
                Cada brilho uma esperança
                
                [Refrão]
                G               A
                E nesse mar de estrelas
                Bm              G
                Navego sem destino
                D               A
                Buscando o horizonte
                Bm              G
                Onde sonhos se realizam`
            },
            {
                id: 137,
                title: "Passos na Areia",
                artist: "Pegadas",
                genre: "reggae",
                difficulty: "iniciante",
                pdfUrl: "cifras/passos-na-areia.pdf",
                thumbnailUrl: "https://picsum.photos/id/275/300/200",
                cifra: `[Intro] A E F#m D (2x)
                
                A               E
                Deixo meus passos na areia
                F#m             D
                O mar vem e leva embora
                A               E
                Assim são nossas vidas
                F#m             D
                Marcas que o tempo apaga
                
                [Refrão]
                D               E
                Mas o que fica na alma
                F#m             D
                Nem o mar pode levar
                A               E
                São lembranças e sorrisos
                F#m             D
                Que o coração vai guardar`
            },
            {
                id: 138,
                title: "Fogo e Paixão",
                artist: "Chamas do Amor",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/fogo-e-paixao.pdf",
                thumbnailUrl: "https://picsum.photos/id/276/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D               A
                O fogo que arde em mim
                Bm              G
                É a paixão que não se apaga
                D               A
                Nem toda a água do mar
                Bm              G
                Pode apagar essa chama
                
                [Refrão]
                G               A
                Fogo e paixão
                Bm              A
                Sentimentos que não se explicam
                G               A
                Fogo e paixão
                D
                Que consomem meu coração`
            },
            {
                id: 139,
                title: "Samba da Vida",
                artist: "Batuque Carioca",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/samba-da-vida.pdf",
                thumbnailUrl: "https://picsum.photos/id/277/300/200",
                cifra: `[Intro] Dm A7 Dm C7 F A7 Dm
                
                Dm              A7
                A vida é como um samba
                Dm              C7
                Tem que ter balanço e ginga
                F               C
                No compasso do pandeiro
                A7              Dm
                O coração tambem balança
                
                [Refrão]
                F               C
                É no samba da vida
                A7              Dm
                Que encontro alegria
                F               C
                Entre risos e abraços
                A7              Dm
                Vou seguindo meu dia`
            },
            {
                id: 140,
                title: "Vento Leste",
                artist: "Brisas do Oriente",
                genre: "world",
                difficulty: "avancado",
                pdfUrl: "cifras/vento-leste.pdf",
                thumbnailUrl: "https://picsum.photos/id/278/300/200",
                cifra: `[Intro] Am Em F G (2x)
                
                Am              Em
                Vento que vem do leste
                F               G
                Trazendo histórias antigas
                Am              Em
                De terras distantes
                F               G
                E culturas milenares
                
                [Refrão]
                C               G
                Nas asas do vento leste
                Am              Em
                Viajo sem sair do lugar
                F               G
                Sonhando com outros mundos
                Am              G
                Que ainda vou conhecer`
            },
            {
                id: 141,
                title: "Flor do Campo",
                artist: "Pétalas Silvestres",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/flor-do-campo.pdf",
                thumbnailUrl: "https://picsum.photos/id/279/300/200",
                cifra: `[Intro] G C D G (2x)
                
                G               C
                Como flor do campo
                D               G
                Simples e verdadeira
                G               C
                Cresce em qualquer terra
                D               G
                Resiste a qualquer tempo
                
                [Refrão]
                C               D
                Flor do campo, flor singela
                G               Em
                Tua beleza é natural
                C               D
                Flor do campo, flor singela
                G
                És um presente especial`
            },
            {
                id: 142,
                title: "Melodia do Silêncio",
                artist: "Acordes Sutis",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/melodia-do-silencio.pdf",
                thumbnailUrl: "https://picsum.photos/id/280/300/200",
                cifra: `[Intro] Dm Am Bb A7 (2x)
                
                Dm              Am
                No silêncio da noite
                Bb              A7
                Escuto a mais bela canção
                Dm              Am
                São as notas do universo
                Bb              A7
                Tocando em meu coração
                
                [Refrão]
                F               C
                A melodia do silêncio
                Bb              A7
                É a mais pura expressão
                Dm              Am
                De tudo o que sentimos
                Bb              A7
                Quando faltam as palavras`
            },
            {
                id: 143,
                title: "Roda de Amigos",
                artist: "Confraria Musical",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/roda-de-amigos.pdf",
                thumbnailUrl: "https://picsum.photos/id/281/300/200",
                cifra: `[Intro] D G A D (2x)
                
                D               G
                Na roda de amigos
                A               D
                O violão vai passando
                D               G
                Cada um canta sua história
                A               D
                E todos vão se encontrando
                
                [Refrão]
                G               A
                É na roda que a gente
                D               Bm
                Compartilha alegrias
                G               A
                É na roda que a gente
                D
                Vai curando as feridas`
            },
            {
                id: 144,
                title: "Dançando na Chuva",
                artist: "Gotas Musicais",
                genre: "pop",
                difficulty: "intermediario",
                pdfUrl: "cifras/dancando-na-chuva.pdf",
                thumbnailUrl: "https://picsum.photos/id/282/300/200",
                cifra: `[Intro] C Em Am F (2x)
                
                C               Em
                Quando a chuva cai
                Am              F
                Não me escondo mais
                C               Em
                Abro os braços e danço
                Am              F
                Celebrando a vida
                
                [Refrão]
                F               G
                Dançando na chuva
                Em              Am
                Lavando a alma
                F               G
                Dançando na chuva
                C
                Renovando a esperança`
            },
            {
                id: 145,
                title: "Espírito Livre",
                artist: "Asas do Vento",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/espirito-livre.pdf",
                thumbnailUrl: "https://picsum.photos/id/283/300/200",
                cifra: `[Intro] E B C#m A (2x)
                
                E               B
                Meu espírito é livre
                C#m             A
                Como o vento que não se prende
                E               B
                Vou por onde me leva o coração
                C#m             A
                Sem medo de me perder
                
                [Refrão]
                A               B
                Liberdade é o que busco
                C#m             A
                Liberdade é o que sou
                E               B
                Nas asas do meu destino
                A               E
                Eu voo mais alto que posso`
            },
            {
                id: 146,
                title: "Raízes Profundas",
                artist: "Terra Fértil",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/raizes-profundas.pdf",
                thumbnailUrl: "https://picsum.photos/id/284/300/200",
                cifra: `[Intro] Am Em F G (2x)
                
                Am              Em
                Minhas raízes são profundas
                F               G
                Conectadas à terra mãe
                Am              Em
                De onde vim, para onde vou
                F               G
                O ciclo eterno da existência
                
                [Refrão]
                C               G
                Raízes que me sustentam
                Am              Em
                Quando os ventos fortes sopram
                F               G
                Raízes que me nutrem
                Am              G
                Com a sabedoria ancestral`
            },
            {
                id: 147,
                title: "Encontro de Almas",
                artist: "Conexão Espiritual",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/encontro-de-almas.pdf",
                thumbnailUrl: "https://picsum.photos/id/285/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G               D
                Quando duas almas se encontram
                Em              C
                O universo celebra
                G               D
                São estrelas que colidiram
                Em              C
                Criando uma nova constelação
                
                [Refrão]
                C               D
                Encontro de almas
                Em              C
                Destinos entrelaçados
                G               D
                Encontro de almas
                Em              C
                Amor em estado puro`
            },
            {
                id: 148,
                title: "Rio de Memórias",
                artist: "Águas Cristalinas",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/rio-de-memorias.pdf",
                thumbnailUrl: "https://picsum.photos/id/286/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D               A
                Como um rio que corre
                Bm              G
                Minhas memórias fluem
                D               A
                Algumas claras como cristal
                Bm              G
                Outras turvas pelo tempo
                
                [Refrão]
                G               A
                No rio das memórias
                Bm              G
                Navego entre passado e presente
                D               A
                No rio das memórias
                Bm              G
                Encontro quem fui e quem sou`
            },
            {
                id: 149,
                title: "Dança do Fogo",
                artist: "Chamas Ancestrais",
                genre: "world",
                difficulty: "avancado",
                pdfUrl: "cifras/danca-do-fogo.pdf",
                thumbnailUrl: "https://picsum.photos/id/287/300/200",
                cifra: `[Intro] Em D C B7 (2x)
                
                Em              D
                Ao redor da fogueira
                C               B7
                Os ancestrais dançam
                Em              D
                Celebrando a força do fogo
                C               B7
                Elemento de transformação
                
                [Refrão]
                Am              B7
                Na dança do fogo
                Em              D
                Purificamos a alma
                C               D
                Na dança do fogo
                Em              B7
                Renascemos das cinzas`
            },
            {
                id: 150,
                title: "Jardim Secreto",
                artist: "Flores do Amanhã",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/jardim-secreto.pdf",
                thumbnailUrl: "https://picsum.photos/id/288/300/200",
                cifra: `[Intro] C G Am Em F G C (2x)
                
                C               G
                No meu jardim secreto
                Am              Em
                Cultivo sonhos e esperanças
                F               G
                Regados com paciência
                C
                E amor incondicional
                
                [Refrão]
                F               G
                Jardim onde florescem
                Em              Am
                As sementes do amanhã
                F               G
                Jardim onde crescem
                C
                Os frutos da felicidade`
            },
            {
                id: 151,
                title: "Tambores da Mata",
                artist: "Percussão Natural",
                genre: "world",
                difficulty: "intermediario",
                pdfUrl: "cifras/tambores-da-mata.pdf",
                thumbnailUrl: "https://picsum.photos/id/289/300/200",
                cifra: `[Intro] Am Em G F (2x)
                
                Am              Em
                Os tambores da mata chamam
                G               F
                Ecoando entre as árvores
                Am              Em
                Uma mensagem ancestral
                G               F
                Que só o coração entende
                
                [Refrão]
                C               G
                É o pulsar da terra
                Am              G
                É o ritmo da vida
                F               G
                Os tambores da mata
                Am              Em
                Chamando para dançar`
            },
            {
                id: 152,
                title: "Céu de Outono",
                artist: "Estações",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/ceu-de-outono.pdf",
                thumbnailUrl: "https://picsum.photos/id/290/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G               D
                Sob o céu de outono
                Em              C
                As folhas caem devagar
                G               D
                Cada uma conta uma história
                Em              C
                De uma estação que se vai
                
                [Refrão]
                C               D
                O outono traz mudanças
                Em              C
                Cores que se transformam
                G               D
                O outono é um lembrete
                Em              C
                Que tudo passa e se renova`
            }            ,
            {
                id: 153,
                title: "Alvorada Serena",
                artist: "Brisa do Campo",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/alvorada-serena.pdf",
                thumbnailUrl: "https://picsum.photos/id/291/300/200",
                cifra: `[Intro] C G Am F (2x)
                
                C               G
                Quando o sol desperta
                Am              F
                A natureza acorda
                C               G
                Pássaros cantam em festa
                Am              F
                No alvorecer do dia
                
                [Refrão]
                F               G
                Alvorada serena
                Am              G
                Inspira meus sonhos
                F               G
                Alvorada serena
                C
                Renova minha fé`
            },
            {
                id: 154,
                title: "Paisagem Sonora",
                artist: "Ecos da Terra",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/paisagem-sonora.pdf",
                thumbnailUrl: "https://picsum.photos/id/292/300/200",
                cifra: `[Intro] D A Bm F#m G A D (2x)
                
                D               A
                Montanhas ao horizonte
                Bm              F#m
                Rios cortando o vale
                G               A
                O céu em tons de aquarela
                D
                Pinta minha paisagem
                
                [Refrão]
                G               A
                E o som da natureza
                F#m             Bm
                Compõe a melodia
                G               A
                Que embala meus passos
                D
                Nessa jornada sem fim`
            },
            {
                id: 155,
                title: "Canção do Caminhante",
                artist: "Passos Livres",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/cancao-caminhante.pdf",
                thumbnailUrl: "https://picsum.photos/id/293/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em              C
                Pés na estrada, coração aberto
                G               D
                Seguindo sem destino certo
                Em              C
                O caminho me chama, eu vou
                G               D
                Para onde o vento me levar
                
                [Refrão]
                C               D
                Sou caminhante, alma errante
                Em              C
                Tenho o mundo inteiro pra explorar
                G               D
                Cada passo me leva mais adiante
                Em              D
                Na estrada que me faz sonhar`
            },
            {
                id: 156,
                title: "Memórias de Verão",
                artist: "Sol Nascente",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/memorias-de-verao.pdf",
                thumbnailUrl: "https://picsum.photos/id/294/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G               D
                Tardes quentes na praia
                Em              C
                Conversas até o amanhecer
                G               D
                Risos soltos ao vento
                Em              C
                Momentos que não vou esquecer
                
                [Refrão]
                C               D
                São memórias de verão
                Em              C
                Guardadas no coração
                G               D
                São memórias de verão
                Em              C
                Que nunca vão se apagar`
            },
            {
                id: 157,
                title: "Estrela do Mar",
                artist: "Navegantes",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/estrela-do-mar.pdf",
                thumbnailUrl: "https://picsum.photos/id/295/300/200",
                cifra: `[Intro] Bm F#m G A (2x)
                
                Bm              F#m
                Brilha no céu noturno
                G               A
                Minha estrela do mar
                Bm              F#m
                Guia dos navegantes
                G               A
                Luz a me orientar
                
                [Refrão]
                D               A
                Nas águas profundas
                G               F#m
                Da vida em movimento
                Bm              G
                Minha estrela do mar
                A               D
                Me traz de volta ao porto
                
                [Ponte]
                F#m             Bm
                Quando a tempestade vier
                G               A
                E as ondas agitarem o mar
                F#m             Bm
                Olho para o céu e te vejo
                G               A
                Brilhando a me guiar`
            },
            {
                id: 158,
                title: "Portais do Tempo",
                artist: "Dimensão Paralela",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/portais-do-tempo.pdf",
                thumbnailUrl: "https://picsum.photos/id/296/300/200",
                cifra: `[Intro] Am G F E7 (2x)
                
                Am              G
                Entre dimensões paralelas
                F               E7
                Viajo através dos portais
                Am              G
                O tempo é apenas ilusão
                F               E7
                Quando se vive entre mundos
                
                [Refrão]
                Dm              Am
                Portais do tempo se abrem
                E7              Am
                Para quem sabe enxergar
                Dm              G
                Passado, presente e futuro
                C               E7
                Em uma dança circular
                
                [Solo] Am G F E7 Am G F E7`
            },
            {
                id: 159,
                title: "Marulhar",
                artist: "Ondas do Mar",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/marulhar.pdf",
                thumbnailUrl: "https://picsum.photos/id/297/300/200",
                cifra: `[Intro] C Am Em G (2x)
                
                C               Am
                O som do mar a marulhar
                Em              G
                Traz paz ao meu coração
                C               Am
                As ondas vêm e vão
                Em              G
                No ritmo da canção
                
                [Refrão]
                F               C
                Marulhar, marulhar
                G               Am
                Embala meu navegar
                F               C
                Marulhar, marulhar
                G               C
                Me ensina a sonhar`
            },
            {
                id: 160,
                title: "Balada da Montanha",
                artist: "Picos Nevados",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/balada-montanha.pdf",
                thumbnailUrl: "https://picsum.photos/id/298/300/200",
                cifra: `[Intro] D Bm G A (2x)
                
                D               Bm
                No alto da montanha
                G               A
                Onde o ar é puro e frio
                D               Bm
                Encontrei minha liberdade
                G               A
                Longe do mundo lá embaixo
                
                [Refrão]
                G               A
                Balada da montanha
                Bm              G
                Canção das alturas
                D               A
                Balada da montanha
                G               D
                Que ecoa na alma pura
                
                [Ponte]
                F#m             Bm
                Nuvens que passam ao meu redor
                G               A
                Céu que parece mais perto
                F#m             Bm
                Silêncio que fala ao coração
                G               A
                Na linguagem do universo`
            },
            {
                id: 161,
                title: "Jardins da Memória",
                artist: "Sementes do Tempo",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/jardins-memoria.pdf",
                thumbnailUrl: "https://picsum.photos/id/299/300/200",
                cifra: `[Intro] C Em Am F G (2x)
                
                C               Em
                Planto sementes de lembranças
                Am              F
                No jardim da minha memória
                C               Em
                Rego com gotas de saudade
                Am              G
                Colho flores de nostalgia
                
                [Refrão]
                F               G
                Nos jardins da memória
                Em              Am
                O tempo nunca passa
                F               G
                Nos jardins da memória
                C
                O amor sempre floresce`
            },
            {
                id: 162,
                title: "Ritmo da Floresta",
                artist: "Tambores da Mata",
                genre: "world",
                difficulty: "intermediario",
                pdfUrl: "cifras/ritmo-floresta.pdf",
                thumbnailUrl: "https://picsum.photos/id/300/300/200",
                cifra: `[Intro] Am Em G F (2x)
                
                Am              Em
                No coração da floresta
                G               F
                Pulsa um ritmo ancestral
                Am              Em
                Tambores que falam à alma
                G               F
                Dançando com os elementos
                
                [Refrão]
                C               G
                É o ritmo da floresta
                Am              Em
                Que corre em minhas veias
                F               G
                É o ritmo da floresta
                Am
                Que me conecta à terra`
            },
            {
                id: 163,
                title: "Café da Manhã",
                artist: "Amanhecer Rural",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/cafe-da-manha.pdf",
                thumbnailUrl: "https://picsum.photos/id/301/300/200",
                cifra: `[Intro] G D C G (2x)
                
                G               D
                Café fumegando na mesa
                C               G
                Pão quentinho saindo do forno
                G               D
                O galo cantando no terreiro
                C               G
                Anunciando mais um dia
                
                [Refrão]
                C               D
                É hora do café da manhã
                Em              C
                Na simplicidade do campo
                G               D
                É hora do café da manhã
                C               G
                Momento de agradecer à vida`
            },
            {
                id: 164,
                title: "Dançando na Chuva",
                artist: "Gotas de Alegria",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/dancando-na-chuva.pdf",
                thumbnailUrl: "https://picsum.photos/id/302/300/200",
                cifra: `[Intro] F C Dm Bb (2x)
                
                F               C
                Gotas que caem do céu
                Dm              Bb
                Molhando meus pés descalços
                F               C
                Não preciso me esconder
                Dm              Bb
                Vou dançar com a chuva
                
                [Refrão]
                Bb              C
                Dançando na chuva
                Dm              Bb
                Celebrando a vida
                F               C
                Dançando na chuva
                Bb              F
                Com a alma lavada`
            },
            {
                id: 165,
                title: "Vento Sul",
                artist: "Brisas do Sul",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/vento-sul.pdf",
                thumbnailUrl: "https://picsum.photos/id/303/300/200",
                cifra: `[Intro] Am G F E7 (2x)
                
                Am              G
                Vento sul traz histórias
                F               E7
                De terras distantes
                Am              G
                Sussurra segredos antigos
                F               E7
                Nas folhas do outono
                
                [Refrão]
                Dm              E7
                Vento sul, mensageiro
                Am              G
                Carrega minhas palavras
                F               G
                Vento sul, companheiro
                Am
                Que nunca me abandona
                
                [Ponte]
                C               G
                Por onde passou, por onde andou
                Dm              E7
                Quantas histórias escutou
                Am              G
                Por onde passou, por onde andou
                F               E7
                Quantos segredos guardou`
            },
            {
                id: 166,
                title: "Lua Cheia",
                artist: "Noites Claras",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/lua-cheia.pdf",
                thumbnailUrl: "https://picsum.photos/id/304/300/200",
                cifra: `[Intro] D G A D (2x)
                
                D               G
                Lua cheia no céu escuro
                A               D
                Ilumina minha solidão
                D               G
                Sua luz prateada e mágica
                A               D
                Toca meu coração
                
                [Refrão]
                G               A
                Lua cheia, confidente
                Bm              G
                Testemunha dos meus segredos
                D               A
                Lua cheia, companheira
                G               D
                Nas noites de insônia`
            },
            {
                id: 167,
                title: "Horizontes",
                artist: "Navegantes do Céu",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/horizontes.pdf",
                thumbnailUrl: "https://picsum.photos/id/305/300/200",
                cifra: `[Intro] E B C#m A (2x)
                
                E               B
                Além do horizonte visível
                C#m             A
                Existe um mundo a descobrir
                E               B
                Céus inexplorados me chamam
                C#m             A
                Para uma jornada sem fim
                
                [Refrão]
                A               B
                Horizontes a cruzar
                C#m             G#m
                Fronteiras a quebrar
                A               B
                Horizontes a explorar
                E
                Sem olhar para trás
                
                [Solo] E B C#m A E B C#m A
                
                [Ponte]
                G#m             C#m
                O medo tenta me parar
                A               B
                Mas a coragem é mais forte
                G#m             C#m
                A dúvida quer me frear
                A               B
                Mas o desejo de ir além prevalece`
            },
            {
                id: 168,
                title: "Amor em Versos",
                artist: "Poetas do Coração",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/amor-em-versos.pdf",
                thumbnailUrl: "https://picsum.photos/id/306/300/200",
                cifra: `[Intro] F C Dm Bb C (2x)
                
                F               C
                Não sei dizer "eu te amo"
                Dm              Bb
                Sem usar a poesia
                F               C
                Cada palavra é um verso
                Dm              C
                Que escrevo com melodia
                
                [Refrão]
                Bb              C
                É amor em versos
                F               Dm
                Sentimento em canção
                Bb              C
                É amor em versos
                F
                Escritos no coração
                
                [Ponte]
                Am              Dm
                As rimas são imperfeitas
                Bb              C
                Como todo amor real
                Am              Dm
                Mas o sentimento é puro
                Bb              C
                Como um poema imortal`
            },
            {
                id: 169,
                title: "Brisa do Mar",
                artist: "Navegantes da Costa",
                genre: "reggae",
                difficulty: "iniciante",
                pdfUrl: "cifras/brisa-do-mar.pdf",
                thumbnailUrl: "https://picsum.photos/id/307/300/200",
                cifra: `[Intro] C G Am Em F G C (2x)
                
                C               G
                A brisa do mar no rosto
                Am              Em
                Traz o perfume do sal
                F               G
                Relaxa a mente e o corpo
                C
                É uma terapia natural
                
                [Refrão]
                F               G
                Brisa do mar, me leva
                Em              Am
                Para longe do stress
                F               G
                Brisa do mar, me ensina
                C
                A viver com mais leveza`
            },
            {
                id: 170,
                title: "Caminho das Pedras",
                artist: "Trilhas Antigas",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/caminho-pedras.pdf",
                thumbnailUrl: "https://picsum.photos/id/308/300/200",
                cifra: `[Intro] Am C G E (2x)
                
                Am              C
                No caminho das pedras
                G               E
                Aprendi a caminhar devagar
                Am              C
                Cada passo é uma lição
                G               E
                Cada pedra é um desafio
                
                [Refrão]
                C               D
                Trilhando o caminho das pedras
                Em              C
                Construindo minha história
                G               D
                Trilhando o caminho das pedras
                Am              E
                Encontrando minha força
                
                [Ponte]
                F               C
                Tropeços que me ensinam
                G               Am
                Quedas que me fortalecem
                F               C
                Obstáculos que me mostram
                G               E
                Que posso sempre mais`
            },
            {
                id: 171,
                title: "Paz Interior",
                artist: "Essência Zen",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/paz-interior.pdf",
                thumbnailUrl: "https://picsum.photos/id/309/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D               A
                Em meio ao caos do mundo
                Bm              G
                Busco minha paz interior
                D               A
                No silêncio dos pensamentos
                Bm              G
                Encontro meu verdadeiro eu
                
                [Refrão]
                G               A
                Paz interior, tesouro raro
                Bm              G
                Que ninguém pode roubar
                D               A
                Paz interior, luz da alma
                G               D
                Que me ajuda a caminhar`
            },
            {
                id: 172,
                title: "Noite de Verão",
                artist: "Brisas Noturnas",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/noite-de-verao.pdf",
                thumbnailUrl: "https://picsum.photos/id/310/300/200",
                cifra: `[Intro] C Em Am F G (2x)
                
                C               Em
                Estrelas brilham no céu
                Am              F
                Grilos cantam no jardim
                C               Em
                A brisa morna acaricia
                Am              G
                Numa noite de verão
                
                [Refrão]
                F               G
                Noite de verão
                Em              Am
                Sonhos ao luar
                F               G
                Noite de verão
                C
                Momentos pra guardar`
            }            ,
            {
                id: 173,
                title: "Pétalas no Vento",
                artist: "Florais da Terra",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/petalas-no-vento.pdf",
                thumbnailUrl: "https://picsum.photos/id/311/300/200",
                cifra: `[Intro] Am F C G (2x)
                
                Am              F
                Pétalas dançam no vento
                C               G
                Como memórias ao léu
                Am              F
                Cores que pintam o tempo
                C               G
                Em um caleidoscópio no céu
                
                [Refrão]
                F               C
                Voa, pétala, voa
                G               Am
                Leva contigo meus sonhos
                F               C
                Voa, pétala, voa
                G               Am
                E traz de volta o amor
                
                [Verso 2]
                Am              F
                Perfume que enche os sentidos
                C               G
                Suavidade que acalma a dor
                Am              F
                No jardim dos encontros perdidos
                C               G
                Renascem as sementes do amor`
            },
            {
                id: 174,
                title: "Rock da Estrada",
                artist: "Poeira Sonora",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/rock-da-estrada.pdf",
                thumbnailUrl: "https://picsum.photos/id/312/300/200",
                cifra: `[Intro] E A D A (2x)
                
                E               A
                Motor ligado, estrada à frente
                D               A
                O sol nascendo no horizonte
                E               A
                Uma canção para me acompanhar
                D               A
                E a liberdade para encontrar
                
                [Refrão]
                D               A
                É o rock da estrada
                E               A
                Levando pra longe de casa
                D               A
                É o rock da estrada
                E               A
                Onde a vida acontece de verdade
                
                [Verso 2]
                E               A
                Cada curva, uma nova surpresa
                D               A
                Cada parada, uma nova certeza
                E               A
                A poeira no rosto é medalha
                D               A
                Na batalha da vida que não falha`
            },
            {
                id: 175,
                title: "Samba da Madrugada",
                artist: "Bambas do Alvorecer",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/samba-da-madrugada.pdf",
                thumbnailUrl: "https://picsum.photos/id/313/300/200",
                cifra: `[Intro] Dm A7 Dm A7 Dm Gm A7 Dm (2x)
                
                Dm                  A7
                Quando a noite vai embora
                                 Dm
                E o dia ainda não chegou
                Dm7                 Gm
                É na roda de samba que eu vou
                A7                  Dm
                Espantar toda minha dor
                
                [Refrão]
                F                   C
                É o samba da madrugada
                A7                  Dm
                Que me faz esquecer
                Gm                  Dm
                O pandeiro e o cavaco
                A7                  Dm
                Até o dia amanhecer
                
                [Verso 2]
                Dm                  A7
                Tem cachaça, tem cerveja
                                 Dm
                Tem a roda pra sambar
                Dm7                 Gm
                Tem amigos de verdade
                A7                  Dm
                E histórias pra contar`
            },
            {
                id: 176,
                title: "Planície Dourada",
                artist: "Horizontes do Sul",
                genre: "folk",
                difficulty: "avancado",
                pdfUrl: "cifras/planicie-dourada.pdf",
                thumbnailUrl: "https://picsum.photos/id/314/300/200",
                cifra: `[Intro] D Bm G A (2x)
                
                D                   Bm
                Na imensidão da planície dourada
                G                   A
                Onde o vento sopra liberdade
                D                   Bm
                Cavalos selvagens em disparada
                G                   A
                Cortando a vastidão da tarde
                
                [Refrão]
                G                   A
                Vejo o sol se pondo devagar
                Bm                  G
                Tingindo o céu de vermelho
                D                   A
                É a natureza a nos ensinar
                G                   D
                Que a beleza está no simples
                
                [Ponte]
                F#m                 Bm
                As estrelas já começam a surgir
                G                   A
                A lua cheia se ergue majestosa
                F#m                 Bm
                Esse momento ninguém vai me tirar
                G                   A
                A planície dourada é minha casa`
            },
            {
                id: 177,
                title: "Dançando na Areia",
                artist: "Maré Alta",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/dancando-na-areia.pdf",
                thumbnailUrl: "https://picsum.photos/id/315/300/200",
                cifra: `[Intro] C G Am F (2x)
                
                C                   G
                O verão chegou com tudo
                Am                  F
                O calor esquenta o clima
                C                   G
                Na praia todo mundo junto
                Am                  F
                Curtindo o som que anima
                
                [Refrão]
                F                   G
                Dançando na areia
                Am                  G
                Com o mar aos nossos pés
                F                   G
                Dançando na areia
                C
                Até o sol se pôr
                
                [Verso 2]
                C                   G
                Bronzeado, suor e alegria
                Am                  F
                Sorrisos por todo lado
                C                   G
                A vida passa mais bonita
                Am                  F
                Com amigos ao meu lado`
            },
            {
                id: 178,
                title: "Coração Sertanejo",
                artist: "Alma do Campo",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/coracao-sertanejo.pdf",
                thumbnailUrl: "https://picsum.photos/id/316/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Do fundo do meu peito brota
                Em                  C
                Um sentimento verdadeiro
                G                   D
                Amor pela terra que me criou
                Em                  C
                Meu coração é sertanejo
                
                [Refrão]
                C                   D
                Na viola eu ponho a alma
                Em                  C
                Nas palavras minha dor
                G                   D
                Meu coração é sertanejo
                Em                  C
                Batendo forte de amor
                
                [Verso 2]
                G                   D
                A poeira da estrada me conhece
                Em                  C
                Os passarinhos cantam meu nome
                G                   D
                As estrelas me guiam na noite
                Em                  C
                E a lua clareia meu caminho`
            },
            {
                id: 179,
                title: "Canção do Exílio",
                artist: "Poetas da Terra",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/cancao-do-exilio.pdf",
                thumbnailUrl: "https://picsum.photos/id/317/300/200",
                cifra: `[Intro] Am Em F C G (2x)
                
                Am                  Em
                Minha terra tem palmeiras
                F                   C
                Onde canta o sabiá
                Am                  Em
                As aves que aqui gorjeiam
                F                   G
                Não gorjeiam como lá
                
                [Refrão]
                C                   G
                Nosso céu tem mais estrelas
                Am                  F
                Nossas várzeas têm mais flores
                C                   G
                Nossos bosques têm mais vida
                F                   C
                Nossa vida mais amores
                
                [Verso 2]
                Am                  Em
                Em cismar, sozinho, à noite
                F                   C
                Mais prazer encontro eu lá
                Am                  Em
                Minha terra tem palmeiras
                F                   G
                Onde canta o sabiá`
            },
            {
                id: 180,
                title: "Sintonia Perfeita",
                artist: "Ondas Positivas",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/sintonia-perfeita.pdf",
                thumbnailUrl: "https://picsum.photos/id/318/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                Quando te encontrei por acaso
                Bm                  G
                Algo diferente aconteceu
                D                   A
                Foi como se o tempo parasse
                Bm                  G
                E tudo em mim se acendeu
                
                [Refrão]
                G                   A
                Sintonia perfeita
                Bm                  G
                Nossos corações em harmonia
                D                   A
                Sintonia perfeita
                G                   D
                Como uma bela melodia
                
                [Verso 2]
                D                   A
                Não precisa de muitas palavras
                Bm                  G
                Um olhar já diz tudo pra mim
                D                   A
                Estamos na mesma frequência
                Bm                  G
                Nosso amor não terá fim`
            },
            {
                id: 181,
                title: "Ritual de Fogo",
                artist: "Tribos Ancestrais",
                genre: "world",
                difficulty: "avancado",
                pdfUrl: "cifras/ritual-de-fogo.pdf",
                thumbnailUrl: "https://picsum.photos/id/319/300/200",
                cifra: `[Intro] Em D C D (2x)
                
                Em                  D
                No centro da grande roda
                C                   D
                O fogo dança e ilumina
                Em                  D
                Tambores marcam o ritmo
                C                   D
                Da cerimônia divina
                
                [Refrão]
                Am                  Em
                Ritual de fogo sagrado
                C                   D
                Conecta céu e terra
                Am                  Em
                Ritual de fogo ancestral
                C                   D
                Sabedoria que não se enterra
                
                [Verso 2]
                Em                  D
                Vozes antigas entoam cantos
                C                   D
                Que atravessam gerações
                Em                  D
                O fogo limpa e transforma
                C                   D
                Purifica os corações`
            },
            {
                id: 182,
                title: "Beijo de Cristal",
                artist: "Lágrimas do Céu",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/beijo-de-cristal.pdf",
                thumbnailUrl: "https://picsum.photos/id/320/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Um beijo suave como orvalho
                Em                  C
                Transparente como cristal
                G                   D
                Nossos lábios se encontraram
                Em                  C
                Em um momento especial
                
                [Refrão]
                C                   D
                Beijo de cristal
                Em                  C
                Puro como a água da fonte
                G                   D
                Beijo de cristal
                Em                  C
                Que me faz flutuar nas nuvens
                
                [Verso 2]
                G                   D
                Lembro ainda do seu toque
                Em                  C
                Da sensação de paz sem fim
                G                   D
                Como um sonho que não acaba
                Em                  C
                Você deixou marcas em mim`
            },
            {
                id: 183,
                title: "Tempestade Eletrônica",
                artist: "Circuitos Digitais",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/tempestade-eletronica.pdf",
                thumbnailUrl: "https://picsum.photos/id/321/300/200",
                cifra: `[Intro] E A B7 E (2x)
                
                E                   A
                Circuitos em ebulição
                B7                  E
                Energia correndo nas veias
                E                   A
                Uma tempestade de bits
                B7                  E
                Eclodindo em minha cabeça
                
                [Refrão]
                A                   B7
                Tempestade eletrônica
                C#m                 A
                Relâmpagos de ideias
                E                   B7
                Tempestade eletrônica
                A                   E
                Revolucionando meu ser
                
                [Solo] E A B7 E A B7 C#m A
                
                [Verso 2]
                E                   A
                Códigos binários pulsando
                B7                  E
                No ritmo do meu coração
                E                   A
                A matrix da realidade
                B7                  E
                Expandindo minha percepção`
            },
            {
                id: 184,
                title: "Balanço do Coqueiro",
                artist: "Beira-Mar",
                genre: "axé",
                difficulty: "iniciante",
                pdfUrl: "cifras/balanco-do-coqueiro.pdf",
                thumbnailUrl: "https://picsum.photos/id/322/300/200",
                cifra: `[Intro] A E F#m D (2x)
                
                A                   E
                No balanço do coqueiro
                F#m                 D
                A brisa traz o cheiro do mar
                A                   E
                O calor do sol na areia
                F#m                 D
                Me convida a dançar
                
                [Refrão]
                D                   E
                É o balanço do coqueiro
                F#m                 D
                É o ritmo do verão
                A                   E
                É o balanço do coqueiro
                D                   A
                Que mexe com meu coração
                
                [Verso 2]
                A                   E
                Todo mundo na avenida
                F#m                 D
                O trio elétrico a passar
                A                   E
                A alegria contagiante
                F#m                 D
                Ninguém consegue parar`
            },
            {
                id: 185,
                title: "Chuva de Bençãos",
                artist: "Almas Renovadas",
                genre: "gospel",
                difficulty: "iniciante",
                pdfUrl: "cifras/chuva-de-bencaos.pdf",
                thumbnailUrl: "https://picsum.photos/id/323/300/200",
                cifra: `[Intro] G C Em D (2x)
                
                G                   C
                Como chuva que cai do céu
                Em                  D
                Tuas bênçãos caem sobre mim
                G                   C
                Renovando minha esperança
                Em                  D
                Fazendo-me crer no amanhã
                
                [Refrão]
                C                   D
                Chuva de bênçãos, chuva de amor
                Em                  C
                Inundando meu ser com paz
                G                   D
                Chuva de bênçãos, chuva de fé
                Em                  D
                Lavando minh'alma em graça
                
                [Verso 2]
                G                   C
                Nas tempestades da vida
                Em                  D
                Tua presença é meu abrigo
                G                   C
                Nas secas do deserto
                Em                  D
                És água que me faz viver`
            },
            {
                id: 186,
                title: "Pôr do Sol na Montanha",
                artist: "Horizontes de Luz",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/por-do-sol-na-montanha.pdf",
                thumbnailUrl: "https://picsum.photos/id/324/300/200",
                cifra: `[Intro] C Am G F (2x)
                
                C                   Am
                O sol se esconde lentamente
                G                   F
                Por trás da grande montanha
                C                   Am
                Tingindo o céu com suas cores
                G                   F
                Em um espetáculo sem igual
                
                [Refrão]
                F                   G
                Pôr do sol na montanha
                Am                  F
                Momento de contemplação
                C                   G
                Pôr do sol na montanha
                F                   C
                Renovando minha inspiração
                
                [Verso 2]
                C                   Am
                Laranja, vermelho e roxo
                G                   F
                Se misturam no horizonte
                C                   Am
                Enquanto a noite se aproxima
                G                   F
                Trazendo estrelas para brilhar`
            },
            {
                id: 187,
                title: "Galopando Livre",
                artist: "Cavaleiros do Pampa",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/galopando-livre.pdf",
                thumbnailUrl: "https://picsum.photos/id/325/300/200",
                cifra: `[Intro] G D C G (2x)
                
                G                   D
                Sinto o vento no rosto
                C                   G
                Quando estou a galopar
                G                   D
                Pelos campos verdejantes
                C                   G
                Onde o céu parece tocar
                
                [Refrão]
                C                   D
                Galopando livre nos campos
                Em                  C
                Como o vento que não se pode prender
                G                   D
                Galopando livre nos campos
                C                   G
                É assim que quero viver
                
                [Verso 2]
                G                   D
                O cavalo é meu companheiro
                C                   G
                Entende meus sentimentos
                G                   D
                Juntos cruzamos fronteiras
                C                   G
                Em busca de novos momentos`
            },
            {
                id: 188,
                title: "Notas de Jazz",
                artist: "Quinta Essência",
                genre: "jazz",
                difficulty: "avancado",
                pdfUrl: "cifras/notas-de-jazz.pdf",
                thumbnailUrl: "https://picsum.photos/id/326/300/200",
                cifra: `[Intro] Dm7 G7 Cmaj7 Am7 Dm7 G7 Cmaj7 (2x)
                
                Dm7                 G7
                Notas que flutuam no ar
                Cmaj7               Am7
                Improvisações que tocam a alma
                Dm7                 G7
                O saxofone chora baixinho
                Cmaj7
                Enquanto o piano responde
                
                [Refrão]
                Fmaj7               G7
                São notas de jazz na noite
                Em7                 Am7
                Preenchendo os espaços vazios
                Dm7                 G7
                São notas de jazz na alma
                Cmaj7
                Curando feridas antigas
                
                [Solo] Dm7 G7 Cmaj7 Am7 Dm7 G7 Cmaj7
                
                [Verso 2]
                Dm7                 G7
                O contrabaixo marca o tempo
                Cmaj7               Am7
                A bateria segue o ritmo do coração
                Dm7                 G7
                O trompete sobe aos céus
                Cmaj7
                Anunciando novas melodias`
            },
            {
                id: 189,
                title: "Lua de São Jorge",
                artist: "Filhos de Ogum",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/lua-de-sao-jorge.pdf",
                thumbnailUrl: "https://picsum.photos/id/327/300/200",
                cifra: `[Intro] Dm A7 Dm Gm Dm A7 Dm (2x)
                
                Dm                  A7
                Na lua cheia de São Jorge
                                  Dm
                Os tambores vão tocar
                Dm                  Gm
                A umbanda se prepara
                Dm        A7        Dm
                A festa vai começar
                
                [Refrão]
                F                   C
                É lua de São Jorge
                A7                  Dm
                Guerreiro e protetor
                Gm                  Dm
                É lua de São Jorge
                A7                  Dm
                Afasta todo mal e toda dor
                
                [Verso 2]
                Dm                  A7
                Espada reluzente em punho
                                  Dm
                O santo cavaleiro vem
                Dm                  Gm
                Montado em seu cavalo branco
                Dm        A7        Dm
                Trazendo a paz e o bem`
            },
            {
                id: 190,
                title: "Ciranda da Vida",
                artist: "Roda do Tempo",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/ciranda-da-vida.pdf",
                thumbnailUrl: "https://picsum.photos/id/328/300/200",
                cifra: `[Intro] D G A D (2x)
                
                D                   G
                A vida é uma ciranda
                A                   D
                Que gira sem parar
                D                   G
                Uns entram, outros saem
                A                   D
                No eterno circular
                
                [Refrão]
                G                   A
                Ciranda, cirandinha
                Bm                  G
                Vamos todos cirandar
                D                   A
                A vida é movimento
                G                   D
                E o tempo não vai esperar
                
                [Verso 2]
                D                   G
                As mãos dadas em roda
                A                   D
                Unidos pelo amor
                D                   G
                As vozes em harmonia
                A                   D
                Cantando sem temor`
            },
            {
                id: 173,
                title: "Pétalas no Vento",
                artist: "Florais da Terra",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/petalas-no-vento.pdf",
                thumbnailUrl: "https://picsum.photos/id/311/300/200",
                cifra: `[Intro] Am F C G (2x)
                
                Am              F
                Pétalas dançam no vento
                C               G
                Como memórias ao léu
                Am              F
                Cores que pintam o tempo
                C               G
                Em um caleidoscópio no céu
                
                [Refrão]
                F               C
                Voa, pétala, voa
                G               Am
                Leva contigo meus sonhos
                F               C
                Voa, pétala, voa
                G               Am
                E traz de volta o amor
                
                [Verso 2]
                Am              F
                Perfume que enche os sentidos
                C               G
                Suavidade que acalma a dor
                Am              F
                No jardim dos encontros perdidos
                C               G
                Renascem as sementes do amor`
            },
            {
                id: 174,
                title: "Rock da Estrada",
                artist: "Poeira Sonora",
                genre: "rock",
                difficulty: "iniciante",
                pdfUrl: "cifras/rock-da-estrada.pdf",
                thumbnailUrl: "https://picsum.photos/id/312/300/200",
                cifra: `[Intro] E A D A (2x)
                
                E               A
                Motor ligado, estrada à frente
                D               A
                O sol nascendo no horizonte
                E               A
                Uma canção para me acompanhar
                D               A
                E a liberdade para encontrar
                
                [Refrão]
                D               A
                É o rock da estrada
                E               A
                Levando pra longe de casa
                D               A
                É o rock da estrada
                E               A
                Onde a vida acontece de verdade
                
                [Verso 2]
                E               A
                Cada curva, uma nova surpresa
                D               A
                Cada parada, uma nova certeza
                E               A
                A poeira no rosto é medalha
                D               A
                Na batalha da vida que não falha`
            },
            {
                id: 175,
                title: "Samba da Madrugada",
                artist: "Bambas do Alvorecer",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/samba-da-madrugada.pdf",
                thumbnailUrl: "https://picsum.photos/id/313/300/200",
                cifra: `[Intro] Dm A7 Dm A7 Dm Gm A7 Dm (2x)
                
                Dm                  A7
                Quando a noite vai embora
                                 Dm
                E o dia ainda não chegou
                Dm7                 Gm
                É na roda de samba que eu vou
                A7                  Dm
                Espantar toda minha dor
                
                [Refrão]
                F                   C
                É o samba da madrugada
                A7                  Dm
                Que me faz esquecer
                Gm                  Dm
                O pandeiro e o cavaco
                A7                  Dm
                Até o dia amanhecer
                
                [Verso 2]
                Dm                  A7
                Tem cachaça, tem cerveja
                                 Dm
                Tem a roda pra sambar
                Dm7                 Gm
                Tem amigos de verdade
                A7                  Dm
                E histórias pra contar`
            },
            {
                id: 176,
                title: "Planície Dourada",
                artist: "Horizontes do Sul",
                genre: "folk",
                difficulty: "avancado",
                pdfUrl: "cifras/planicie-dourada.pdf",
                thumbnailUrl: "https://picsum.photos/id/314/300/200",
                cifra: `[Intro] D Bm G A (2x)
                
                D                   Bm
                Na imensidão da planície dourada
                G                   A
                Onde o vento sopra liberdade
                D                   Bm
                Cavalos selvagens em disparada
                G                   A
                Cortando a vastidão da tarde
                
                [Refrão]
                G                   A
                Vejo o sol se pondo devagar
                Bm                  G
                Tingindo o céu de vermelho
                D                   A
                É a natureza a nos ensinar
                G                   D
                Que a beleza está no simples
                
                [Ponte]
                F#m                 Bm
                As estrelas já começam a surgir
                G                   A
                A lua cheia se ergue majestosa
                F#m                 Bm
                Esse momento ninguém vai me tirar
                G                   A
                A planície dourada é minha casa`
            },
            {
                id: 177,
                title: "Dançando na Areia",
                artist: "Maré Alta",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/dancando-na-areia.pdf",
                thumbnailUrl: "https://picsum.photos/id/315/300/200",
                cifra: `[Intro] C G Am F (2x)
                
                C                   G
                O verão chegou com tudo
                Am                  F
                O calor esquenta o clima
                C                   G
                Na praia todo mundo junto
                Am                  F
                Curtindo o som que anima
                
                [Refrão]
                F                   G
                Dançando na areia
                Am                  G
                Com o mar aos nossos pés
                F                   G
                Dançando na areia
                C
                Até o sol se pôr
                
                [Verso 2]
                C                   G
                Bronzeado, suor e alegria
                Am                  F
                Sorrisos por todo lado
                C                   G
                A vida passa mais bonita
                Am                  F
                Com amigos ao meu lado`
            },
            {
                id: 178,
                title: "Coração Sertanejo",
                artist: "Alma do Campo",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/coracao-sertanejo.pdf",
                thumbnailUrl: "https://picsum.photos/id/316/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Do fundo do meu peito brota
                Em                  C
                Um sentimento verdadeiro
                G                   D
                Amor pela terra que me criou
                Em                  C
                Meu coração é sertanejo
                
                [Refrão]
                C                   D
                Na viola eu ponho a alma
                Em                  C
                Nas palavras minha dor
                G                   D
                Meu coração é sertanejo
                Em                  C
                Batendo forte de amor
                
                [Verso 2]
                G                   D
                A poeira da estrada me conhece
                Em                  C
                Os passarinhos cantam meu nome
                G                   D
                As estrelas me guiam na noite
                Em                  C
                E a lua clareia meu caminho`
            },
            {
                id: 179,
                title: "Canção do Exílio",
                artist: "Poetas da Terra",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/cancao-do-exilio.pdf",
                thumbnailUrl: "https://picsum.photos/id/317/300/200",
                cifra: `[Intro] Am Em F C G (2x)
                
                Am                  Em
                Minha terra tem palmeiras
                F                   C
                Onde canta o sabiá
                Am                  Em
                As aves que aqui gorjeiam
                F                   G
                Não gorjeiam como lá
                
                [Refrão]
                C                   G
                Nosso céu tem mais estrelas
                Am                  F
                Nossas várzeas têm mais flores
                C                   G
                Nossos bosques têm mais vida
                F                   C
                Nossa vida mais amores
                
                [Verso 2]
                Am                  Em
                Em cismar, sozinho, à noite
                F                   C
                Mais prazer encontro eu lá
                Am                  Em
                Minha terra tem palmeiras
                F                   G
                Onde canta o sabiá`
            },
            {
                id: 180,
                title: "Sintonia Perfeita",
                artist: "Ondas Positivas",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/sintonia-perfeita.pdf",
                thumbnailUrl: "https://picsum.photos/id/318/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                Quando te encontrei por acaso
                Bm                  G
                Algo diferente aconteceu
                D                   A
                Foi como se o tempo parasse
                Bm                  G
                E tudo em mim se acendeu
                
                [Refrão]
                G                   A
                Sintonia perfeita
                Bm                  G
                Nossos corações em harmonia
                D                   A
                Sintonia perfeita
                G                   D
                Como uma bela melodia
                
                [Verso 2]
                D                   A
                Não precisa de muitas palavras
                Bm                  G
                Um olhar já diz tudo pra mim
                D                   A
                Estamos na mesma frequência
                Bm                  G
                Nosso amor não terá fim`
            },
            {
                id: 181,
                title: "Ritual de Fogo",
                artist: "Tribos Ancestrais",
                genre: "world",
                difficulty: "avancado",
                pdfUrl: "cifras/ritual-de-fogo.pdf",
                thumbnailUrl: "https://picsum.photos/id/319/300/200",
                cifra: `[Intro] Em D C D (2x)
                
                Em                  D
                No centro da grande roda
                C                   D
                O fogo dança e ilumina
                Em                  D
                Tambores marcam o ritmo
                C                   D
                Da cerimônia divina
                
                [Refrão]
                Am                  Em
                Ritual de fogo sagrado
                C                   D
                Conecta céu e terra
                Am                  Em
                Ritual de fogo ancestral
                C                   D
                Sabedoria que não se enterra
                
                [Verso 2]
                Em                  D
                Vozes antigas entoam cantos
                C                   D
                Que atravessam gerações
                Em                  D
                O fogo limpa e transforma
                C                   D
                Purifica os corações`
            },
            {
                id: 182,
                title: "Beijo de Cristal",
                artist: "Lágrimas do Céu",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/beijo-de-cristal.pdf",
                thumbnailUrl: "https://picsum.photos/id/320/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Um beijo suave como orvalho
                Em                  C
                Transparente como cristal
                G                   D
                Nossos lábios se encontraram
                Em                  C
                Em um momento especial
                
                [Refrão]
                C                   D
                Beijo de cristal
                Em                  C
                Puro como a água da fonte
                G                   D
                Beijo de cristal
                Em                  C
                Que me faz flutuar nas nuvens
                
                [Verso 2]
                G                   D
                Lembro ainda do seu toque
                Em                  C
                Da sensação de paz sem fim
                G                   D
                Como um sonho que não acaba
                Em                  C
                Você deixou marcas em mim`
            },
            {
                id: 183,
                title: "Tempestade Eletrônica",
                artist: "Circuitos Digitais",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/tempestade-eletronica.pdf",
                thumbnailUrl: "https://picsum.photos/id/321/300/200",
                cifra: `[Intro] E A B7 E (2x)
                
                E                   A
                Circuitos em ebulição
                B7                  E
                Energia correndo nas veias
                E                   A
                Uma tempestade de bits
                B7                  E
                Eclodindo em minha cabeça
                
                [Refrão]
                A                   B7
                Tempestade eletrônica
                C#m                 A
                Relâmpagos de ideias
                E                   B7
                Tempestade eletrônica
                A                   E
                Revolucionando meu ser
                
                [Solo] E A B7 E A B7 C#m A
                
                [Verso 2]
                E                   A
                Códigos binários pulsando
                B7                  E
                No ritmo do meu coração
                E                   A
                A matrix da realidade
                B7                  E
                Expandindo minha percepção`
            },
            {
                id: 184,
                title: "Balanço do Coqueiro",
                artist: "Beira-Mar",
                genre: "axé",
                difficulty: "iniciante",
                pdfUrl: "cifras/balanco-do-coqueiro.pdf",
                thumbnailUrl: "https://picsum.photos/id/322/300/200",
                cifra: `[Intro] A E F#m D (2x)
                
                A                   E
                No balanço do coqueiro
                F#m                 D
                A brisa traz o cheiro do mar
                A                   E
                O calor do sol na areia
                F#m                 D
                Me convida a dançar
                
                [Refrão]
                D                   E
                É o balanço do coqueiro
                F#m                 D
                É o ritmo do verão
                A                   E
                É o balanço do coqueiro
                D                   A
                Que mexe com meu coração
                
                [Verso 2]
                A                   E
                Todo mundo na avenida
                F#m                 D
                O trio elétrico a passar
                A                   E
                A alegria contagiante
                F#m                 D
                Ninguém consegue parar`
            },
            {
                id: 185,
                title: "Chuva de Bençãos",
                artist: "Almas Renovadas",
                genre: "gospel",
                difficulty: "iniciante",
                pdfUrl: "cifras/chuva-de-bencaos.pdf",
                thumbnailUrl: "https://picsum.photos/id/323/300/200",
                cifra: `[Intro] G C Em D (2x)
                
                G                   C
                Como chuva que cai do céu
                Em                  D
                Tuas bênçãos caem sobre mim
                G                   C
                Renovando minha esperança
                Em                  D
                Fazendo-me crer no amanhã
                
                [Refrão]
                C                   D
                Chuva de bênçãos, chuva de amor
                Em                  C
                Inundando meu ser com paz
                G                   D
                Chuva de bênçãos, chuva de fé
                Em                  D
                Lavando minh'alma em graça
                
                [Verso 2]
                G                   C
                Nas tempestades da vida
                Em                  D
                Tua presença é meu abrigo
                G                   C
                Nas secas do deserto
                Em                  D
                És água que me faz viver`
            },
            {
                id: 186,
                title: "Pôr do Sol na Montanha",
                artist: "Horizontes de Luz",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/por-do-sol-na-montanha.pdf",
                thumbnailUrl: "https://picsum.photos/id/324/300/200",
                cifra: `[Intro] C Am G F (2x)
                
                C                   Am
                O sol se esconde lentamente
                G                   F
                Por trás da grande montanha
                C                   Am
                Tingindo o céu com suas cores
                G                   F
                Em um espetáculo sem igual
                
                [Refrão]
                F                   G
                Pôr do sol na montanha
                Am                  F
                Momento de contemplação
                C                   G
                Pôr do sol na montanha
                F                   C
                Renovando minha inspiração
                
                [Verso 2]
                C                   Am
                Laranja, vermelho e roxo
                G                   F
                Se misturam no horizonte
                C                   Am
                Enquanto a noite se aproxima
                G                   F
                Trazendo estrelas para brilhar`
            },
            {
                id: 187,
                title: "Galopando Livre",
                artist: "Cavaleiros do Pampa",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/galopando-livre.pdf",
                thumbnailUrl: "https://picsum.photos/id/325/300/200",
                cifra: `[Intro] G D C G (2x)
                
                G                   D
                Sinto o vento no rosto
                C                   G
                Quando estou a galopar
                G                   D
                Pelos campos verdejantes
                C                   G
                Onde o céu parece tocar
                
                [Refrão]
                C                   D
                Galopando livre nos campos
                Em                  C
                Como o vento que não se pode prender
                G                   D
                Galopando livre nos campos
                C                   G
                É assim que quero viver
                
                [Verso 2]
                G                   D
                O cavalo é meu companheiro
                C                   G
                Entende meus sentimentos
                G                   D
                Juntos cruzamos fronteiras
                C                   G
                Em busca de novos momentos`
            },
            {
                id: 188,
                title: "Notas de Jazz",
                artist: "Quinta Essência",
                genre: "jazz",
                difficulty: "avancado",
                pdfUrl: "cifras/notas-de-jazz.pdf",
                thumbnailUrl: "https://picsum.photos/id/326/300/200",
                cifra: `[Intro] Dm7 G7 Cmaj7 Am7 Dm7 G7 Cmaj7 (2x)
                
                Dm7                 G7
                Notas que flutuam no ar
                Cmaj7               Am7
                Improvisações que tocam a alma
                Dm7                 G7
                O saxofone chora baixinho
                Cmaj7
                Enquanto o piano responde
                
                [Refrão]
                Fmaj7               G7
                São notas de jazz na noite
                Em7                 Am7
                Preenchendo os espaços vazios
                Dm7                 G7
                São notas de jazz na alma
                Cmaj7
                Curando feridas antigas
                
                [Solo] Dm7 G7 Cmaj7 Am7 Dm7 G7 Cmaj7
                
                [Verso 2]
                Dm7                 G7
                O contrabaixo marca o tempo
                Cmaj7               Am7
                A bateria segue o ritmo do coração
                Dm7                 G7
                O trompete sobe aos céus
                Cmaj7
                Anunciando novas melodias`
            },
            {
                id: 189,
                title: "Lua de São Jorge",
                artist: "Filhos de Ogum",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/lua-de-sao-jorge.pdf",
                thumbnailUrl: "https://picsum.photos/id/327/300/200",
                cifra: `[Intro] Dm A7 Dm Gm Dm A7 Dm (2x)
                
                Dm                  A7
                Na lua cheia de São Jorge
                                  Dm
                Os tambores vão tocar
                Dm                  Gm
                A umbanda se prepara
                Dm        A7        Dm
                A festa vai começar
                
                [Refrão]
                F                   C
                É lua de São Jorge
                A7                  Dm
                Guerreiro e protetor
                Gm                  Dm
                É lua de São Jorge
                A7                  Dm
                Afasta todo mal e toda dor
                
                [Verso 2]
                Dm                  A7
                Espada reluzente em punho
                                  Dm
                O santo cavaleiro vem
                Dm                  Gm
                Montado em seu cavalo branco
                Dm        A7        Dm
                Trazendo a paz e o bem`
            },
            {
                id: 190,
                title: "Ciranda da Vida",
                artist: "Roda do Tempo",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/ciranda-da-vida.pdf",
                thumbnailUrl: "https://picsum.photos/id/328/300/200",
                cifra: `[Intro] D G A D (2x)
                
                D                   G
                A vida é uma ciranda
                A                   D
                Que gira sem parar
                D                   G
                Uns entram, outros saem
                A                   D
                No eterno circular
                
                [Refrão]
                G                   A
                Ciranda, cirandinha
                Bm                  G
                Vamos todos cirandar
                D                   A
                A vida é movimento
                G                   D
                E o tempo não vai esperar
                
                [Verso 2]
                D                   G
                As mãos dadas em roda
                A                   D
                Unidos pelo amor
                D                   G
                As vozes em harmonia
                A                   D
                Cantando sem temor`
            },
            {
                id: 191,
                title: "Aurora Boreal",
                artist: "Luzes do Norte",
                genre: "pop",
                difficulty: "intermediario",
                pdfUrl: "cifras/aurora-boreal.pdf",
                thumbnailUrl: "https://picsum.photos/id/329/300/200",
                cifra: `[Intro] Am Em G F (2x)
                
                Am                  Em
                Sob o céu gelado do norte
                G                   F
                Luzes dançam em cores vivas
                Am                  Em
                Fenômeno mágico da natureza
                G                   F
                Tocando as almas sensíveis
                
                [Refrão]
                C                   G
                Aurora boreal, espetáculo divino
                Am                  F
                Pintura no céu feita a mão
                C                   G
                Aurora boreal, mistério cristalino
                F                   Am
                Que enche de encanto o coração`
            }           ,
            {
                id: 192,
                title: "Caminho das Águas",
                artist: "Rio Cristalino",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/caminho-das-aguas.pdf",
                thumbnailUrl: "https://picsum.photos/id/330/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em                  C
                O rio segue seu caminho
                G                   D
                Entre pedras e curvas sem fim
                Em                  C
                Levando histórias e sonhos
                G                   D
                Na corrente que passa por mim
                
                [Refrão]
                C                   D
                Águas que correm pro mar
                Em                  C
                Levam meus pensamentos
                G                   D
                Águas que nunca param
                Em                  C
                Ensinam sobre o tempo
                
                [Verso 2]
                Em                  C
                Nas margens crescem esperanças
                G                   D
                Raízes firmes a se espalhar
                Em                  C
                Como a vida que sempre segue
                G                   D
                Sabendo onde quer chegar`
            },
            {
                id: 193,
                title: "Vento Livre",
                artist: "Asas do Tempo",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/vento-livre.pdf",
                thumbnailUrl: "https://picsum.photos/id/331/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Vento livre na campina
                Em                  C
                Brincando com as folhas secas
                G                   D
                Sussurrando nas árvores
                Em                  C
                Segredos de outras terras
                
                [Refrão]
                C                   D
                Sopra vento, leva embora
                Em                  C
                Tudo que me aprisiona
                G                   D
                Sopra vento, traz de volta
                Em                  C
                A liberdade que me abandona
                
                [Verso 2]
                G                   D
                Nas asas do vento viajo
                Em                  C
                Por lugares nunca vistos
                G                   D
                Carregando sonhos e planos
                Em                  C
                Voando sem destino fixo`
            },
            {
                id: 194,
                title: "Montanha Sagrada",
                artist: "Cume das Almas",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/montanha-sagrada.pdf",
                thumbnailUrl: "https://picsum.photos/id/332/300/200",
                cifra: `[Intro] Am F C G (2x)
                
                Am                  F
                No topo da montanha sagrada
                C                   G
                Onde o céu toca a terra
                Am                  F
                Encontrei a resposta perdida
                C                   G
                Para as dúvidas que carrego
                
                [Refrão]
                F                   G
                Montanha de pedra e mistério
                Am                  Em
                Guardião de segredos antigos
                F                   G
                Montanha que toca as estrelas
                C
                Abençoa meu caminho
                
                [Solo] Am F C G Am F C G
                
                [Verso 2]
                Am                  F
                A neblina esconde os caminhos
                C                   G
                Mas meus passos são seguros
                Am                  F
                A escalada é difícil e longa
                C                   G
                Mas a vista compensa tudo`
            },
            {
                id: 195,
                title: "Sol de Primavera",
                artist: "Jardim Florido",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/sol-de-primavera.pdf",
                thumbnailUrl: "https://picsum.photos/id/333/300/200",
                cifra: `[Intro] D G A D (2x)
                
                D                   G
                O sol da primavera chegou
                A                   D
                Trazendo cores e aromas
                D                   G
                Flores desabrocham no campo
                A                   D
                Celebrando a vida nova
                
                [Refrão]
                G                   A
                Sol de primavera, brilha
                Bm                  G
                Aquece o que estava frio
                D                   A
                Sol de primavera, ilumina
                G                   D
                Os caminhos esquecidos
                
                [Verso 2]
                D                   G
                As abelhas dançam no ar
                A                   D
                Borboletas coloridas voam
                D                   G
                O mundo inteiro se renova
                A                   D
                Com sua luz transformadora`
            },
            {
                id: 196,
                title: "Noite de Estrelas",
                artist: "Céu Profundo",
                genre: "pop",
                difficulty: "intermediario",
                pdfUrl: "cifras/noite-de-estrelas.pdf",
                thumbnailUrl: "https://picsum.photos/id/334/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em                  C
                Sob o manto escuro da noite
                G                   D
                Milhares de estrelas brilham
                Em                  C
                Constelações contam histórias
                G                   D
                De tempos que já passaram
                
                [Refrão]
                C                   D
                Noite de estrelas cintilantes
                Em                  C
                Iluminando a escuridão
                G                   D
                Noite de estrelas cadentes
                Em
                Realizando os desejos do coração
                
                [Ponte]
                Am                  C
                Quantos segredos guardados
                G                   D
                No infinito do universo
                Am                  C
                Quantos mundos desconhecidos
                G                   D
                Que ainda vamos descobrir`
            },
            {
                id: 197,
                title: "Roda de Capoeira",
                artist: "Berimbau de Ouro",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/roda-de-capoeira.pdf",
                thumbnailUrl: "https://picsum.photos/id/335/300/200",
                cifra: `[Intro] Dm A7 Dm Gm A7 Dm (2x)
                
                Dm                  A7
                O berimbau toca na roda
                                  Dm
                Chamando todos pra jogar
                Dm                  Gm
                Pandeiros e atabaques
                A7                  Dm
                Começam a acompanhar
                
                [Refrão]
                F                   C
                Na roda de capoeira
                A7                  Dm
                A tradição vai se manter
                Gm                  Dm
                Ginga, esquiva e rasteira
                A7                  Dm
                Angola vai prevalecer
                
                [Verso 2]
                Dm                  A7
                A história dos ancestrais
                                  Dm
                Nos movimentos vai contar
                Dm                  Gm
                A luta pela liberdade
                A7                  Dm
                Que nunca vai se acabar`
            },
            {
                id: 198,
                title: "Magia do Mar",
                artist: "Ondas Azuis",
                genre: "reggae",
                difficulty: "iniciante",
                pdfUrl: "cifras/magia-do-mar.pdf",
                thumbnailUrl: "https://picsum.photos/id/336/300/200",
                cifra: `[Intro] G Em C D (2x)
                
                G                   Em
                Sinto a brisa do mar no rosto
                C                   D
                Enquanto observo o horizonte
                G                   Em
                Ondas que vêm e que vão
                C                   D
                Trazendo paz ao coração
                
                [Refrão]
                C                   D
                É a magia do mar
                G                   Em
                Que me faz sonhar
                C                   D
                É a magia do mar
                G
                Que me ensina a amar
                
                [Verso 2]
                G                   Em
                Conchas e estrelas na areia
                C                   D
                Contam histórias do oceano
                G                   Em
                O sol se pondo ao longe
                C                   D
                Pinta o céu de laranja e roxo`
            },
            {
                id: 199,
                title: "Batuque do Coração",
                artist: "Tambores da Alma",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/batuque-coracao.pdf",
                thumbnailUrl: "https://picsum.photos/id/337/300/200",
                cifra: `[Intro] D Bm G A (2x)
                
                D                   Bm
                Meu coração bate forte
                G                   A
                Como um tambor no terreiro
                D                   Bm
                A vida pulsa em mim
                G                   A
                No ritmo brasileiro
                
                [Refrão]
                G                   A
                É o batuque do coração
                Bm                  G
                Que me faz dançar
                D                   A
                É o batuque do coração
                G                   D
                Que me faz cantar
                
                [Verso 2]
                D                   Bm
                A música corre nas veias
                G                   A
                O samba está na alma
                D                   Bm
                Nem toda tristeza do mundo
                G                   A
                Tira esse ritmo que acalma`
            },
            {
                id: 200,
                title: "Flor do Cerrado",
                artist: "Ipê Amarelo",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/flor-do-cerrado.pdf",
                thumbnailUrl: "https://picsum.photos/id/338/300/200",
                cifra: `[Intro] C G Am Em F G C (2x)
                
                C                   G
                No cerrado ressecado
                Am                  Em
                Uma flor teima em nascer
                F                   G
                Resistente e colorida
                C
                Insiste em florescer
                
                [Refrão]
                F                   G
                Flor do cerrado, valente
                Em                  Am
                Ensina sobre persistir
                F                   G
                Flor do cerrado, esperança
                C
                De um novo tempo a surgir
                
                [Verso 2]
                C                   G
                Entre espinhos e pedras
                Am                  Em
                Encontra força pra crescer
                F                   G
                Com as gotas do orvalho
                C
                Consegue sobreviver`
            },
            {
                id: 201,
                title: "Caminho das Nuvens",
                artist: "Altitude Máxima",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/caminho-das-nuvens.pdf",
                thumbnailUrl: "https://picsum.photos/id/339/300/200",
                cifra: `[Intro] E B C#m A (2x)
                
                E                   B
                Nas alturas do céu infinito
                C#m                 A
                Traço caminhos invisíveis
                E                   B
                Entre nuvens de algodão
                C#m                 A
                Voo sem destino certo
                
                [Refrão]
                A                   B
                No caminho das nuvens
                C#m                 A
                Encontro a liberdade
                E                   B
                No caminho das nuvens
                A                   E
                Descubro a verdade
                
                [Solo] E B C#m A E B A E
                
                [Verso 2]
                E                   B
                O horizonte é apenas o começo
                C#m                 A
                De uma jornada sem fim
                E                   B
                As asas do pensamento
                C#m                 A
                Me levam pra longe daqui`
            },
            {
                id: 202,
                title: "Dança da Chuva",
                artist: "Ritual das Águas",
                genre: "world",
                difficulty: "intermediario",
                pdfUrl: "cifras/danca-da-chuva.pdf",
                thumbnailUrl: "https://picsum.photos/id/340/300/200",
                cifra: `[Intro] Am Em F G (2x)
                
                Am                  Em
                Círculos na água formados
                F                   G
                Pelas gotas que caem do céu
                Am                  Em
                Dançam em ritmo constante
                F                   G
                Uma música ancestral
                
                [Refrão]
                C                   G
                É a dança da chuva sagrada
                Am                  F
                Que lava a terra e a alma
                C                   G
                É a dança da chuva abençoada
                F                   Am
                Que traz vida nova e esperança
                
                [Verso 2]
                Am                  Em
                Tambores ecoam nas nuvens
                F                   G
                Trovões anunciando sua chegada
                Am                  Em
                Relâmpagos cortam o céu
                F                   G
                Iluminando a noite fechada`
            },
            {
                id: 203,
                title: "Jardim Interior",
                artist: "Sementes de Luz",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/jardim-interior.pdf",
                thumbnailUrl: "https://picsum.photos/id/341/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Dentro de mim há um jardim
                Em                  C
                Onde cultivo o que sou
                G                   D
                Flores de amor, árvores de paciência
                Em                  C
                Sementes de transformação
                
                [Refrão]
                C                   D
                Jardim interior, oásis de paz
                Em                  C
                Refúgio nas tempestades da vida
                G                   D
                Jardim interior, fonte de luz
                Em                  C
                Que ilumina meu caminho
                
                [Verso 2]
                G                   D
                Cada gesto de bondade
                Em                  C
                É água que rega essa terra
                G                   D
                Cada pensamento positivo
                Em                  C
                É sol que faz tudo florescer`
            },
            {
                id: 204,
                title: "Festa na Aldeia",
                artist: "Raízes da Terra",
                genre: "world",
                difficulty: "intermediario",
                pdfUrl: "cifras/festa-na-aldeia.pdf",
                thumbnailUrl: "https://picsum.photos/id/342/300/200",
                cifra: `[Intro] Em D C B7 (2x)
                
                Em                  D
                A aldeia se prepara em festa
                C                   B7
                Tambores chamam para dançar
                Em                  D
                Pinturas coloridas nos corpos
                C                   B7
                Contam histórias do lugar
                
                [Refrão]
                Am                  B7
                Na festa da aldeia ancestral
                Em                  D
                Celebramos quem somos
                C                   B7
                Na festa da aldeia tradicional
                Em
                Honramos nossos antepassados
                
                [Ponte]
                G                   D
                O fogo ilumina a noite
                C                   B7
                Sombras dançam ao redor
                G                   D
                Cantos elevam-se ao céu
                C                   B7
                Conectando mundos através do amor`
            },
            {
                id: 205,
                title: "Luz da Manhã",
                artist: "Sol Nascente",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/luz-da-manha.pdf",
                thumbnailUrl: "https://picsum.photos/id/343/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                Quando o sol desponta no horizonte
                Bm                  G
                Trazendo um novo dia
                D                   A
                Sinto a esperança renascer
                Bm                  G
                E o coração se alegrar
                
                [Refrão]
                G                   A
                É a luz da manhã
                Bm                  G
                Que renova minhas forças
                D                   A
                É a luz da manhã
                G                   D
                Que me faz acreditar
                
                [Verso 2]
                D                   A
                Orvalho fresco sobre a grama
                Bm                  G
                Pássaros cantando ao redor
                D                   A
                A vida despertando aos poucos
                Bm                  G
                Na sinfonia do amanhecer`
            },
            {
                id: 206,
                title: "Melodia do Vento",
                artist: "Sussurros da Natureza",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/melodia-vento.pdf",
                thumbnailUrl: "https://picsum.photos/id/344/300/200",
                cifra: `[Intro] C Am Em G (2x)
                
                C                   Am
                O vento traz uma melodia
                Em                  G
                Que só o coração pode ouvir
                C                   Am
                Sussurros entre as folhas
                Em                  G
                Histórias de um tempo sem fim
                
                [Refrão]
                F                   G
                Melodia do vento que passa
                Em                  Am
                Tocando a alma em canção
                F                   G
                Melodia do vento que leva
                C
                As tristezas para longe daqui
                
                [Verso 2]
                C                   Am
                Entre montanhas e vales
                Em                  G
                A música continua a fluir
                C                   Am
                De norte a sul, leste a oeste
                Em                  G
                O vento não cansa de seguir`
            },
            {
                id: 207,
                title: "Reflexo das Estrelas",
                artist: "Espelho d'Água",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/reflexo-estrelas.pdf",
                thumbnailUrl: "https://picsum.photos/id/345/300/200",
                cifra: `[Intro] Dm Am Bb A7 (2x)
                
                Dm                  Am
                No lago calmo da noite
                Bb                  A7
                Estrelas vêm se banhar
                Dm                  Am
                Reflexos de luz distante
                Bb                  A7
                Que o tempo não pode apagar
                
                [Refrão]
                F                   C
                Reflexo das estrelas na água
                Bb                  A7
                Espelho do céu aqui na terra
                Dm                  Am
                Reflexo das estrelas eternas
                Bb                  A7
                Brilhando em dupla beleza
                
                [Ponte]
                Gm                  Dm
                Entre o céu e a água
                Bb                  A7
                Existe uma ponte invisível
                Gm                  Dm
                Que conecta dois mundos
                Bb                  A7
                Na dança cósmica do universo`
            },
            {
                id: 208,
                title: "Cavalgada na Serra",
                artist: "Tropeiros do Sul",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/cavalgada-serra.pdf",
                thumbnailUrl: "https://picsum.photos/id/346/300/200",
                cifra: `[Intro] G D C G (2x)
                
                G                   D
                Montado em meu cavalo
                C                   G
                Percorro serras e vales
                G                   D
                O vento frio da montanha
                C                   G
                No rosto a me acompanhar
                
                [Refrão]
                C                   D
                Na cavalgada da serra
                Em                  C
                Encontro minha verdade
                G                   D
                Na cavalgada da serra
                C                   G
                Descubro minha liberdade
                
                [Verso 2]
                G                   D
                Cascos batendo na terra
                C                   G
                Marcando o ritmo da jornada
                G                   D
                Entre pinheiros e araucárias
                C                   G
                Sigo minha caminhada`
            },
            {
                id: 209,
                title: "Canção do Pescador",
                artist: "Redes do Mar",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/cancao-pescador.pdf",
                thumbnailUrl: "https://picsum.photos/id/347/300/200",
                cifra: `[Intro] Am F C G (2x)
                
                Am                  F
                No balanço da maré
                C                   G
                Sigo em meu barco a pescar
                Am                  F
                A lua ilumina o caminho
                C                   G
                Nas águas profundas do mar
                
                [Refrão]
                F                   G
                Sou pescador de histórias
                Am                  F
                De sonhos e de sustento
                C                   G
                Sou pescador de esperanças
                Am
                Nas redes do sentimento
                
                [Verso 2]
                Am                  F
                O sol nascendo no horizonte
                C                   G
                Anuncia um novo dia
                Am                  F
                Gaivotas seguem meu barco
                C                   G
                Em alegre companhia`
            },
            {
                id: 210,
                title: "Brilho da Lua",
                artist: "Noites Prateadas",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/brilho-da-lua.pdf",
                thumbnailUrl: "https://picsum.photos/id/348/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                A noite chega mansamente
                Bm                  G
                Trazendo a lua no céu
                D                   A
                Seu brilho prateado e mágico
                Bm                  G
                Ilumina os caminhos meus
                
                [Refrão]
                G                   A
                O brilho da lua me guia
                Bm                  G
                Nas noites mais escuras
                D                   A
                O brilho da lua me acalma
                G                   D
                Nas horas de amargura
                
                [Verso 2]
                D                   A
                Segredos contados em silêncio
                Bm                  G
                Sob sua luz confidencial
                D                   A
                Romances que nascem à noite
                Bm                  G
                Têm na lua uma cúmplice leal`
            },
            {
                id: 211,
                title: "Folhas ao Vento",
                artist: "Ciclos da Natureza",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/folhas-ao-vento.pdf",
                thumbnailUrl: "https://picsum.photos/id/349/300/200",
                cifra: `[Intro] Am Em F G (2x)
                
                Am                  Em
                Folhas caem no outono
                F                   G
                Dançando ao sabor do vento
                Am                  Em
                Ciclos que se renovam
                F                   G
                No eterno movimento
                
                [Refrão]
                C                   G
                Folhas ao vento, girando
                Am                  F
                Ensinando sobre soltar
                C                   G
                Folhas ao vento, voando
                F                   Am
                Mostrando como se reinventar
                
                [Ponte]
                Dm                  Am
                O que parece ser um fim
                F                   G
                É apenas um novo começo
                Dm                  Am
                A árvore se despe agora
                F                   G
                Para logo mais florescer`
            }            // Adicionar estas cifras ao array de cifras existente
            
            ,{
                id: 212,
                title: "Memórias do Sertão",
                artist: "Violeiros do Vale",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/memorias-do-sertao.pdf",
                thumbnailUrl: "https://picsum.photos/id/350/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Nas terras secas do sertão
                Em                  C
                Minha história começou
                G                   D
                Entre espinhos e mandacarus
                Em                  C
                Meu coração se formou
                
                [Refrão]
                C                   D
                Memórias do sertão
                Em                  C
                Gravadas na palma da mão
                G                   D
                Memórias do sertão
                Em                  C
                Que carrego no coração
                
                [Verso 2]
                G                   D
                O sol forte castigando a terra
                Em                  C
                A esperança de chuva no olhar
                G                   D
                A fé de quem nunca desiste
                Em                  C
                E o amor por esse lugar`
            },
            {
                id: 213,
                title: "Noites de Verão",
                artist: "Beira da Praia",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/noites-de-verao.pdf",
                thumbnailUrl: "https://picsum.photos/id/351/300/200",
                cifra: `[Intro] C G Am F (2x)
                
                C                   G
                Estrelas brilham no céu
                Am                  F
                Areia quente sob os pés
                C                   G
                Conversas ao som do mar
                Am                  F
                Noites que não vou esquecer
                
                [Refrão]
                F                   G
                Noites de verão
                Am                  F
                Momentos de pura magia
                C                   G
                Noites de verão
                F                   C
                Que me trazem alegria
                
                [Verso 2]
                C                   G
                Violão tocando na fogueira
                Am                  F
                Amigos cantando em harmonia
                C                   G
                Ondas quebrando na areia
                Am                  F
                Celebrando mais um dia`
            },
            {
                id: 214,
                title: "Asas da Liberdade",
                artist: "Voo Rasante",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/asas-da-liberdade.pdf",
                thumbnailUrl: "https://picsum.photos/id/352/300/200",
                cifra: `[Intro] Em G D A (2x)
                
                Em                  G
                Eu quero voar mais alto
                D                   A
                Onde ninguém pode me alcançar
                Em                  G
                Romper as barreiras do medo
                D                   A
                E novos horizontes encontrar
                
                [Refrão]
                C                   D
                Asas da liberdade
                G                   Em
                Me levem para longe daqui
                C                   D
                Asas da liberdade
                Em
                Me façam livre enfim
                
                [Solo] Em G D A Em G D A
                
                [Ponte]
                C                   D
                O vento sopra forte
                Bm                  Em
                Tentando me derrubar
                C                   D
                Mas minhas asas são fortes
                A                   Em
                Nada vai me parar`
            },
            {
                id: 215,
                title: "Roda de Samba",
                artist: "Bambas do Beco",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/roda-de-samba.pdf",
                thumbnailUrl: "https://picsum.photos/id/353/300/200",
                cifra: `[Intro] Dm A7 Dm Gm A7 Dm (2x)
                
                Dm                  A7
                Na roda de samba do bairro
                                  Dm
                Todo mundo se encontra
                Dm                  Gm
                O pandeiro marca o ritmo
                A7                  Dm
                E o coração acompanha
                
                [Refrão]
                F                   C
                É no samba que a vida sorri
                A7                  Dm
                É no samba que me encontro
                Gm                  Dm
                É no samba que eu sou feliz
                A7                  Dm
                É no samba que eu conto
                
                [Verso 2]
                Dm                  A7
                Cerveja gelada na mesa
                                  Dm
                Amigos de toda uma vida
                Dm                  Gm
                Histórias que não têm fim
                A7                  Dm
                Numa noite bem vivida`
            },
            {
                id: 216,
                title: "Canto da Sereia",
                artist: "Mistérios do Mar",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/canto-da-sereia.pdf",
                thumbnailUrl: "https://picsum.photos/id/354/300/200",
                cifra: `[Intro] Am C G Em F G Am (2x)
                
                Am                  C
                No fundo do oceano azul
                G                   Em
                Onde o sol não pode tocar
                F                   G
                Mora uma doce sereia
                Am
                Com seu canto a encantar
                
                [Refrão]
                F                   G
                Canto da sereia, mistério
                Em                  Am
                Que atrai os navegantes
                F                   G
                Canto da sereia, segredo
                Am
                Que mora nas profundezas
                
                [Ponte]
                C                   G
                Entre corais e tesouros
                Dm                  Am
                Ela tece sua melodia
                F                   G
                Quem escuta nunca esquece
                E                   Am
                E volta dia após dia`
            },
            {
                id: 217,
                title: "Balada do Cowboy",
                artist: "Poeira da Estrada",
                genre: "country",
                difficulty: "iniciante",
                pdfUrl: "cifras/balada-cowboy.pdf",
                thumbnailUrl: "https://picsum.photos/id/355/300/200",
                cifra: `[Intro] G D C G (2x)
                
                G                   D
                Com meu chapéu e botas
                C                   G
                Cavalgo pela pradaria
                G                   D
                A lua é minha companheira
                C                   G
                E as estrelas são meu guia
                
                [Refrão]
                C                   D
                Sou um cowboy solitário
                Em                  C
                Na estrada sempre a vagar
                G                   D
                Sou um cowboy solitário
                C                   G
                Com histórias pra contar
                
                [Verso 2]
                G                   D
                O sol castiga impiedoso
                C                   G
                Mas não me faz desistir
                G                   D
                Tenho o oeste como destino
                C                   G
                E promessas a cumprir`
            },
            {
                id: 218,
                title: "Batuque do Terreiro",
                artist: "Axé Ancestral",
                genre: "world",
                difficulty: "intermediario",
                pdfUrl: "cifras/batuque-terreiro.pdf",
                thumbnailUrl: "https://picsum.photos/id/356/300/200",
                cifra: `[Intro] Em D C B7 (2x)
                
                Em                  D
                Os tambores acordam a noite
                C                   B7
                Chamando os orixás
                Em                  D
                As palmas marcam o compasso
                C                   B7
                A festa vai começar
                
                [Refrão]
                Am                  B7
                Batuque do terreiro sagrado
                Em                  D
                Ancestralidade que não morre
                C                   B7
                Batuque do terreiro antigo
                Em
                Que nas veias ainda corre
                
                [Verso 2]
                Em                  D
                Dança, gira, vibra e sente
                C                   B7
                A energia que vem de além
                Em                  D
                Cores, cantos, fé e axé
                C                   B7
                Tradição que se mantém`
            },
            {
                id: 219,
                title: "Horizonte Azul",
                artist: "Navegantes do Céu",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/horizonte-azul.pdf",
                thumbnailUrl: "https://picsum.photos/id/357/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                Onde o céu encontra o mar
                Bm                  G
                Existe um lugar especial
                D                   A
                Onde os sonhos podem voar
                Bm                  G
                E a paz parece mais real
                
                [Refrão]
                G                   A
                Horizonte azul, infinito
                Bm                  G
                Limite que não limita
                D                   A
                Horizonte azul, distante
                G                   D
                Que meus olhos nunca alcançam
                
                [Verso 2]
                D                   A
                Navegar sem medo ou pressa
                Bm                  G
                Apenas sentindo o vento
                D                   A
                O barco segue seu rumo
                Bm                  G
                Guiado pelo firmamento`
            },
            {
                id: 220,
                title: "Flores de Inverno",
                artist: "Estações da Alma",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/flores-de-inverno.pdf",
                thumbnailUrl: "https://picsum.photos/id/358/300/200",
                cifra: `[Intro] Am F C G (2x)
                
                Am                  F
                Mesmo no frio mais intenso
                C                   G
                Algumas flores conseguem nascer
                Am                  F
                Resistentes e delicadas
                C                   G
                Ensinam sobre sobreviver
                
                [Refrão]
                F                   C
                Flores de inverno, milagres
                G                   Am
                Que desafiam a estação
                F                   C
                Flores de inverno, esperança
                G                   Am
                Que floresce no coração
                
                [Ponte]
                Dm                  Am
                Após a neve mais densa
                F                   G
                A primavera sempre virá
                Dm                  Am
                Depois da noite mais escura
                F                   E7
                Um novo sol brilhará`
            },
            {
                id: 221,
                title: "Ritmo da Cidade",
                artist: "Concreto Urbano",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/ritmo-da-cidade.pdf",
                thumbnailUrl: "https://picsum.photos/id/359/300/200",
                cifra: `[Intro] E A B7 E (2x)
                
                E                   A
                Buzinas, passos apressados
                B7                  E
                O pulsar da metrópole viva
                E                   A
                Prédios que tocam as nuvens
                B7                  E
                Uma sinfonia agressiva
                
                [Refrão]
                A                   B7
                É o ritmo da cidade
                C#m                 A
                Que não para de tocar
                E                   B7
                É o ritmo da cidade
                A                   E
                Impossível escapar
                
                [Solo] E A B7 E A B7 C#m A
                
                [Verso 2]
                E                   A
                Luzes que nunca se apagam
                B7                  E
                Sonhos que nunca adormecem
                E                   A
                Entre o caos e a esperança
                B7                  E
                Histórias que se entrelaçam`
            },
            {
                id: 222,
                title: "Canção da Chuva",
                artist: "Gotas Musicais",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/cancao-da-chuva.pdf",
                thumbnailUrl: "https://picsum.photos/id/360/300/200",
                cifra: `[Intro] C Am Em G (2x)
                
                C                   Am
                A chuva cai mansamente
                Em                  G
                Tocando sua melodia
                C                   Am
                Nas telhas, janelas e ruas
                Em                  G
                Uma natural harmonia
                
                [Refrão]
                F                   G
                Canção da chuva, som sereno
                Em                  Am
                Que acalma qualquer aflição
                F                   G
                Canção da chuva, som eterno
                C
                Que embala o coração
                
                [Verso 2]
                C                   Am
                Pequenas gotas que dançam
                Em                  G
                No ritmo do vento frio
                C                   Am
                Formando poças e riachos
                Em                  G
                Que correm para o rio`
            },
            {
                id: 223,
                title: "Estrela Cadente",
                artist: "Luz Noturna",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/estrela-cadente.pdf",
                thumbnailUrl: "https://picsum.photos/id/361/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                No céu escuro da noite
                Em                  C
                Uma luz corta o firmamento
                G                   D
                Rápida como um suspiro
                Em                  C
                Como um fugaz pensamento
                
                [Refrão]
                C                   D
                Estrela cadente, desejo
                Em                  C
                Faço um pedido em silêncio
                G                   D
                Estrela cadente, mistério
                Em                  C
                Que cruza o universo imenso
                
                [Ponte]
                Am                  C
                Será que alguém escuta
                G                   D
                Os desejos que fazemos?
                Am                  C
                Ou são apenas luzes
                G                   D
                Que no céu reconhecemos?`
            },
            {
                id: 224,
                title: "Dança do Fogo",
                artist: "Tribos Ancestrais",
                genre: "world",
                difficulty: "avancado",
                pdfUrl: "cifras/danca-do-fogo.pdf",
                thumbnailUrl: "https://picsum.photos/id/362/300/200",
                cifra: `[Intro] Em D C B7 (2x)
                
                Em                  D
                Ao redor da grande fogueira
                C                   B7
                Os corpos se movem em transe
                Em                  D
                Sombras projetadas nas pedras
                C                   B7
                Contam histórias distantes
                
                [Refrão]
                Am                  B7
                É a dança do fogo sagrado
                Em                  D
                Ritual que transcende o tempo
                C                   B7
                É a dança do fogo eterno
                Em
                Conectando céu e terra
                
                [Verso 2]
                Em                  D
                Faíscas que sobem ao céu
                C                   B7
                Como preces aos ancestrais
                Em                  D
                O calor que aquece os corpos
                C                   B7
                E as almas dos mortais`
            },
            {
                id: 225,
                title: "Balada do Viajante",
                artist: "Andarilhos do Tempo",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/balada-viajante.pdf",
                thumbnailUrl: "https://picsum.photos/id/363/300/200",
                cifra: `[Intro] Am G F Em (2x)
                
                Am                  G
                Com uma mochila nas costas
                F                   Em
                E o mundo inteiro pela frente
                Am                  G
                Cada passo é uma descoberta
                F                   Em
                Cada olhar um presente
                
                [Refrão]
                C                   G
                Sou um viajante sem destino
                F                   Am
                Minha casa é o horizonte
                C                   G
                Sou um viajante do mundo
                F                   Em
                Meu mapa é o coração
                
                [Ponte]
                Dm                  Am
                As estradas me conhecem
                F                   G
                As cidades me acolhem
                Dm                  Am
                As montanhas me desafiam
                F                   E7
                Os rios me guiam`
            },
            {
                id: 226,
                title: "Cores do Entardecer",
                artist: "Paleta Natural",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/cores-entardecer.pdf",
                thumbnailUrl: "https://picsum.photos/id/364/300/200",
                cifra: `[Intro] F C Dm Bb (2x)
                
                F                   C
                O sol se despede devagar
                Dm                  Bb
                Pintando o céu com suas cores
                F                   C
                Laranja, vermelho e violeta
                Dm                  Bb
                Uma aquarela de esplendores
                
                [Refrão]
                Bb                  C
                Cores do entardecer
                Dm                  Bb
                Pinceladas do divino
                F                   C
                Cores do entardecer
                Bb                  F
                Obra-prima da natureza
                
                [Verso 2]
                F                   C
                Os pássaros voltam aos ninhos
                Dm                  Bb
                O vento sopra mais sereno
                F                   C
                O dia se despede em silêncio
                Dm                  Bb
                E a noite chega sem receio`
            },
            {
                id: 227,
                title: "Festa na Aldeia",
                artist: "Tambores da Terra",
                genre: "world",
                difficulty: "intermediario",
                pdfUrl: "cifras/festa-na-aldeia.pdf",
                thumbnailUrl: "https://picsum.photos/id/365/300/200",
                cifra: `[Intro] Em D C B7 (2x)
                
                Em                  D
                Na aldeia todos se reúnem
                C                   B7
                Ao redor do fogo ancestral
                Em                  D
                Tambores ecoam na floresta
                C                   B7
                Em uma batida ritual
                
                [Refrão]
                Am                  B7
                É festa na aldeia hoje
                Em                  D
                Os espíritos vêm dançar
                C                   B7
                É festa na aldeia agora
                Em
                A tradição vai continuar
                
                [Verso 2]
                Em                  D
                Pinturas adornam os corpos
                C                   B7
                Penas decoram os cabelos
                Em                  D
                Cantos elevam-se aos céus
                C                   B7
                Em agradecimento sincero`
            },
            {
                id: 228,
                title: "Ondas do Mar",
                artist: "Maresia",
                genre: "reggae",
                difficulty: "iniciante",
                pdfUrl: "cifras/ondas-do-mar.pdf",
                thumbnailUrl: "https://picsum.photos/id/366/300/200",
                cifra: `[Intro] G Em C D (2x)
                
                G                   Em
                As ondas vêm e vão
                C                   D
                No ritmo do meu coração
                G                   Em
                Trazendo paz e calma
                C                   D
                Levando embora a dor
                
                [Refrão]
                C                   D
                Ondas do mar, vai e vem
                G                   Em
                Balançando meus pensamentos
                C                   D
                Ondas do mar, movimento
                G
                Que me conecta com a vida
                
                [Verso 2]
                G                   Em
                Na areia eu me deito
                C                   D
                Ouvindo seu suave som
                G                   Em
                O sol aquece meu corpo
                C                   D
                Enquanto o mar canta sua canção`
            },
            {
                id: 229,
                title: "Caminho das Estrelas",
                artist: "Viajantes Cósmicos",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/caminho-estrelas.pdf",
                thumbnailUrl: "https://picsum.photos/id/367/300/200",
                cifra: `[Intro] E B C#m A (2x)
                
                E                   B
                No infinito do universo
                C#m                 A
                Traçamos nosso caminho
                E                   B
                Entre planetas e cometas
                C#m                 A
                Buscando nosso destino
                
                [Refrão]
                A                   B
                No caminho das estrelas
                C#m                 A
                Descobrimos quem somos
                E                   B
                No caminho das estrelas
                A                   E
                Encontramos nossa essência
                
                [Solo] E B C#m A E B C#m A
                
                [Ponte]
                G#m                 C#m
                A gravidade nos puxa
                A                   B
                Mas o espírito quer voar
                G#m                 C#m
                Entre dimensões e galáxias
                A                   B
                Nosso ser vai navegar`
            },
            {
                id: 230,
                title: "Jardim dos Sonhos",
                artist: "Sementes da Imaginação",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/jardim-sonhos.pdf",
                thumbnailUrl: "https://picsum.photos/id/368/300/200",
                cifra: `[Intro] C Am F G (2x)
                
                C                   Am
                No jardim dos meus sonhos
                F                   G
                Flores impossíveis florescem
                C                   Am
                Árvores tocam as nuvens
                F                   G
                E os frutos nunca apodrecem
                
                [Refrão]
                F                   G
                Jardim dos sonhos, refúgio
                Em                  Am
                Onde a realidade se dobra
                F                   G
                Jardim dos sonhos, oásis
                C
                Onde a imaginação sobra
                
                [Verso 2]
                C                   Am
                Pássaros de cores vibrantes
                F                   G
                Cantam melodias encantadas
                C                   Am
                O tempo corre diferente
                F                   G
                Em horas nunca contadas`
            },
            {
                id: 231,
                title: "Galope Livre",
                artist: "Cavaleiros do Pampa",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/galope-livre.pdf",
                thumbnailUrl: "https://picsum.photos/id/369/300/200",
                cifra: `[Intro] G D C G (2x)
                
                G                   D
                No campo aberto a galopar
                C                   G
                Sinto o vento no meu rosto
                G                   D
                Meu cavalo é meu irmão
                C                   G
                Na liberdade está nosso gosto
                
                [Refrão]
                C                   D
                Galope livre pelos campos
                Em                  C
                Sem freios ou amarras
                G                   D
                Galope livre pela vida
                C                   G
                Sem medos ou barreiras
                
                [Verso 2]
                G                   D
                A poeira sobe no horizonte
                C                   G
                Anunciando nossa chegada
                G                   D
                O sol brilha sobre nós
                C                   G
                Iluminando nossa jornada`
            }            ,
            {
                id: 232,
                title: "Canção da Montanha",
                artist: "Ecos da Serra",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/cancao-montanha.pdf",
                thumbnailUrl: "https://picsum.photos/id/370/300/200",
                cifra: `[Intro] Am Em G F (2x)
                
                Am                  Em
                No topo da grande montanha
                G                   F
                Onde o vento sopra mais forte
                Am                  Em
                Escuto a voz da natureza
                G                   F
                Contando segredos antigos
                
                [Refrão]
                C                   G
                Montanha de pedra e sonhos
                Em                  Am
                Guardiã de tantos mistérios
                F                   G
                Montanha que toca o céu
                Am
                Minha eterna companheira
                
                [Verso 2]
                Am                  Em
                Nuvens dançam ao seu redor
                G                   F
                Como um véu de pura magia
                Am                  Em
                Árvores centenárias contam
                G                   F
                Histórias de outro tempo`
            },
            {
                id: 233,
                title: "Verão na Cidade",
                artist: "Calor Urbano",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/verao-na-cidade.pdf",
                thumbnailUrl: "https://picsum.photos/id/371/300/200",
                cifra: `[Intro] D G A D (2x)
                
                D                   G
                O asfalto quente da cidade
                A                   D
                Reflete o sol do meio-dia
                D                   G
                As pessoas buscam sombra
                A                   D
                Tentando escapar da agonia
                
                [Refrão]
                G                   A
                Verão na cidade grande
                Bm                  G
                Um calor que não tem fim
                D                   A
                Verão na cidade grande
                G                   D
                Mas a noite traz alívio assim
                
                [Verso 2]
                D                   G
                Sorvetes, picolés e praia
                A                   D
                Todo mundo quer se refrescar
                D                   G
                Ventiladores não dão conta
                A                   D
                Das gotículas a escorrer`
            },
            {
                id: 234,
                title: "Dança das Borboletas",
                artist: "Jardim Encantado",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/danca-borboletas.pdf",
                thumbnailUrl: "https://picsum.photos/id/372/300/200",
                cifra: `[Intro] C Am F G (2x)
                
                C                   Am
                Asas coloridas no ar
                F                   G
                Bailando entre as flores
                C                   Am
                Voo leve e delicado
                F                   G
                Espalhando suas cores
                
                [Refrão]
                F                   G
                Dança das borboletas
                Em                  Am
                Coreografia natural
                F                   G
                Dança das borboletas
                C
                Espetáculo sem igual
                
                [Ponte]
                Dm                  Am
                O jardim se transforma
                F                   G
                Em palco iluminado
                Dm                  Am
                Cada flor é um cenário
                F                   G
                Para esse balé alado`
            },
            {
                id: 235,
                title: "Mar Aberto",
                artist: "Navegantes do Oceano",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/mar-aberto.pdf",
                thumbnailUrl: "https://picsum.photos/id/373/300/200",
                cifra: `[Intro] E B C#m A (2x)
                
                E                   B
                No horizonte sem fim
                C#m                 A
                Onde o céu toca o mar
                E                   B
                Navego em busca de mim
                C#m                 A
                Sem medo de naufragar
                
                [Refrão]
                A                   B
                Mar aberto, desafio constante
                C#m                 A
                Ondas que testam minha coragem
                E                   B
                Mar aberto, caminho incerto
                A                   E
                Que leva à minha verdade
                
                [Solo] E B C#m A E B C#m A
                
                [Ponte]
                G#m                 C#m
                Tempestades vêm e vão
                A                   B
                Mas o marinheiro persiste
                G#m                 C#m
                Entre estrelas e bússolas
                A                   B
                Encontra seu norte verdadeiro`
            },
            {
                id: 236,
                title: "Beijo de Mel",
                artist: "Doces Palavras",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/beijo-mel.pdf",
                thumbnailUrl: "https://picsum.photos/id/374/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Seus lábios têm gosto de mel
                Em                  C
                Doces como o amanhecer
                G                   D
                Cada beijo é uma viagem
                Em                  C
                Que me faz enlouquecer
                
                [Refrão]
                C                   D
                Beijo de mel, sabor único
                Em                  C
                Que me faz sonhar acordado
                G                   D
                Beijo de mel, vício delicioso
                Em                  C
                Que me deixa apaixonado
                
                [Verso 2]
                G                   D
                Meus dias são mais coloridos
                Em                  C
                Quando posso te beijar
                G                   D
                O mundo gira mais devagar
                Em                  C
                Quando estamos a nos amar`
            },
            {
                id: 237,
                title: "Tambores da Noite",
                artist: "Lua Ancestral",
                genre: "world",
                difficulty: "intermediario",
                pdfUrl: "cifras/tambores-noite.pdf",
                thumbnailUrl: "https://picsum.photos/id/375/300/200",
                cifra: `[Intro] Dm Am Gm A7 (2x)
                
                Dm                  Am
                Quando a noite cai no horizonte
                Gm                  A7
                Os tambores começam a falar
                Dm                  Am
                Língua antiga dos ancestrais
                Gm                  A7
                Que poucos sabem interpretar
                
                [Refrão]
                F                   C
                Tambores da noite, mensageiros
                Bb                  A7
                Entre mundos a ecoar
                Dm                  Gm
                Tambores da noite, guardiões
                A7                  Dm
                De segredos a revelar
                
                [Ponte]
                Bb                  F
                Cada batida é uma palavra
                C                   Dm
                Cada ritmo uma história
                Bb                  F
                Na linguagem do coração
                A7                  Dm
                Que atravessa gerações`
            },
            {
                id: 238,
                title: "Campos Dourados",
                artist: "Colheita Fértil",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/campos-dourados.pdf",
                thumbnailUrl: "https://picsum.photos/id/376/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                Campos dourados ao sol
                Bm                  G
                Ondulando como mar de ouro
                D                   A
                Trigo maduro e farto
                Bm                  G
                Promessa de fartura e pão
                
                [Refrão]
                G                   A
                Nos campos dourados da vida
                Bm                  G
                Colhemos o que plantamos
                D                   A
                Nos campos dourados do tempo
                G                   D
                Deixamos nosso legado
                
                [Verso 2]
                D                   A
                O vento sussurra entre espigas
                Bm                  G
                Contando histórias do campo
                D                   A
                O trabalho duro compensa
                Bm                  G
                Na colheita abundante`
            },
            {
                id: 239,
                title: "Trilhas da Serra",
                artist: "Montanhistas",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/trilhas-serra.pdf",
                thumbnailUrl: "https://picsum.photos/id/377/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em                  C
                Nas trilhas da serra verde
                G                   D
                Encontro minha liberdade
                Em                  C
                Cada passo é uma descoberta
                G                   D
                Cada curva uma novidade
                
                [Refrão]
                C                   D
                Trilhas da serra, caminhos
                Em                  C
                Que levam ao meu interior
                G                   D
                Trilhas da serra, jornada
                Em                  D
                De autoconhecimento e amor
                
                [Verso 2]
                Em                  C
                O ar puro da montanha
                G                   D
                Limpa a mente e o coração
                Em                  C
                A vista lá do alto ensina
                G                   D
                Lições de contemplação`
            },
            {
                id: 240,
                title: "Flor do Cacto",
                artist: "Deserto Florido",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/flor-do-cacto.pdf",
                thumbnailUrl: "https://picsum.photos/id/378/300/200",
                cifra: `[Intro] Am Em F G (2x)
                
                Am                  Em
                No deserto árido e seco
                F                   G
                Uma beleza improvável nasce
                Am                  Em
                Do cacto espinhoso e rude
                F                   G
                Brota uma flor delicada
                
                [Refrão]
                C                   G
                Flor do cacto, resistência
                Am                  F
                Beleza que desafia o impossível
                C                   G
                Flor do cacto, esperança
                F                   Am
                Que na adversidade floresce
                
                [Ponte]
                Dm                  Am
                As aparências enganam
                F                   G
                Quem vê espinhos não imagina
                Dm                  Am
                Que dentro de cada dificuldade
                F                   G
                Existe um milagre esperando`
            },
            {
                id: 241,
                title: "Luar do Sertão",
                artist: "Sertanejos da Lua",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/luar-sertao.pdf",
                thumbnailUrl: "https://picsum.photos/id/379/300/200",
                cifra: `[Intro] G D7 G C G D7 G (2x)
                
                G                   D7
                Não há, ó gente, oh não
                G
                Luar como este do sertão
                G                   D7
                Não há, ó gente, oh não
                                  G
                Luar como este do sertão
                
                [Verso]
                G                   D7
                Oh que saudade do luar da minha terra
                G
                Lá na serra branquejando folhas secas pelo chão
                C                   G
                Este luar cá da cidade tão escuro
                G                   D7              G
                Não tem aquela saudade do luar lá do sertão
                
                [Refrão]
                G                   D7
                Não há, ó gente, oh não
                G
                Luar como este do sertão
                G                   D7
                Não há, ó gente, oh não
                                  G
                Luar como este do sertão`
            },
            {
                id: 242,
                title: "Sonhos de Papel",
                artist: "Origamistas",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/sonhos-papel.pdf",
                thumbnailUrl: "https://picsum.photos/id/380/300/200",
                cifra: `[Intro] C G Am F (2x)
                
                C                   G
                Dobra aqui, dobra ali
                Am                  F
                Um novo mundo vai surgir
                C                   G
                Das mãos habilidosas
                Am                  F
                Nascem sonhos de papel
                
                [Refrão]
                F                   G
                Sonhos de papel voando
                Am                  F
                No vento da imaginação
                C                   G
                Sonhos de papel criando
                F                   C
                Novas formas de expressão
                
                [Verso 2]
                C                   G
                Barcos, aviões e estrelas
                Am                  F
                Tudo pode acontecer
                C                   G
                Na arte milenar do origami
                Am                  F
                A criatividade vai crescer`
            },
            {
                id: 243,
                title: "Jazz na Madrugada",
                artist: "Saxofone Noturno",
                genre: "jazz",
                difficulty: "avancado",
                pdfUrl: "cifras/jazz-madrugada.pdf",
                thumbnailUrl: "https://picsum.photos/id/381/300/200",
                cifra: `[Intro] Dm7 G7 Cmaj7 Am7 Dm7 G7 Cmaj7 (2x)
                
                Dm7                 G7
                Nas ruas vazias da cidade
                Cmaj7               Am7
                Um saxofone chora ao longe
                Dm7                 G7
                Notas que fluem como água
                Cmaj7
                Na calada da madrugada
                
                [Refrão]
                Fmaj7               G7
                Jazz na madrugada, improviso
                Em7                 Am7
                Sentimentos em forma de som
                Dm7                 G7
                Jazz na madrugada, poesia
                Cmaj7
                Que ecoa no coração
                
                [Solo] Dm7 G7 Cmaj7 Am7 Dm7 G7 Cmaj7
                
                [Verso 2]
                Dm7                 G7
                Blues que penetra na alma
                Cmaj7               Am7
                Criando atmosfera única
                Dm7                 G7
                Acordes dissonantes que se resolvem
                Cmaj7
                Como os problemas da vida`
            },
            {
                id: 244,
                title: "Riacho da Serra",
                artist: "Águas Cristalinas",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/riacho-serra.pdf",
                thumbnailUrl: "https://picsum.photos/id/382/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Águas claras do riacho
                Em                  C
                Descendo a serra em canções
                G                   D
                Pedras polidas pelo tempo
                Em                  C
                Contam antigas histórias
                
                [Refrão]
                C                   D
                Riacho da serra, água viva
                Em                  C
                Que mata a sede do viajante
                G                   D
                Riacho da serra, melodia
                Em                  C
                Que embala os sonhos errantes
                
                [Verso 2]
                G                   D
                Margeado por samambaias
                Em                  C
                E flores silvestres coloridas
                G                   D
                O caminho que ele traça
                Em                  C
                É mapa para almas perdidas`
            },
            {
                id: 245,
                title: "Batuque de Rua",
                artist: "Ritmos Urbanos",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/batuque-rua.pdf",
                thumbnailUrl: "https://picsum.photos/id/383/300/200",
                cifra: `[Intro] Dm A7 Dm Gm A7 Dm (2x)
                
                Dm                  A7
                Na esquina da avenida principal
                                  Dm
                O batuque começa a tocar
                Dm                  Gm
                Pandeiros, tamborins e cuícas
                A7                  Dm
                Fazem o povo delirar
                
                [Refrão]
                F                   C
                É o batuque da rua
                A7                  Dm
                Que ninguém consegue parar
                Gm                  Dm
                É o batuque da rua
                A7                  Dm
                Que faz qualquer um sambar
                
                [Verso 2]
                Dm                  A7
                O suor escorre no rosto
                                  Dm
                Dos ritmistas a se expressar
                Dm                  Gm
                A batida é contagiante
                A7                  Dm
                Faz o corpo balançar`
            },
            {
                id: 246,
                title: "Viajante das Estrelas",
                artist: "Cosmos Interior",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/viajante-estrelas.pdf",
                thumbnailUrl: "https://picsum.photos/id/384/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em                  C
                Entre galáxias e nebulosas
                G                   D
                Viajo nas asas da mente
                Em                  C
                Cada estrela é uma parada
                G                   D
                Cada planeta um aprendizado
                
                [Refrão]
                C                   D
                Sou viajante das estrelas
                G                   Em
                Explorador do universo interior
                C                   D
                Sou viajante das estrelas
                Em
                Em busca do meu verdadeiro eu
                
                [Solo] Em C G D Em C G D
                
                [Ponte]
                Am                  C
                Nas fronteiras do cosmos
                G                   D
                Os limites se desfazem
                Am                  C
                A realidade se dobra
                G                   D
                E novos mundos se revelam`
            },
            {
                id: 247,
                title: "Chuva no Sertão",
                artist: "Terra Molhada",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/chuva-sertao.pdf",
                thumbnailUrl: "https://picsum.photos/id/385/300/200",
                cifra: `[Intro] G D C G (2x)
                
                G                   D
                Depois de tanta espera
                C                   G
                A chuva enfim chegou
                G                   D
                Molhando a terra seca
                C                   G
                Que o sol castigou
                
                [Refrão]
                C                   D
                É chuva no sertão, benção
                Em                  C
                Que faz a vida renovar
                G                   D
                É chuva no sertão, milagre
                C                   G
                Que faz o verde brotar
                
                [Verso 2]
                G                   D
                Plantações ressurgem
                C                   G
                O gado volta a pastar
                G                   D
                A esperança renasce
                C                   G
                No sorriso do lugar`
            },
            {
                id: 248,
                title: "Voo do Condor",
                artist: "Andes Místicos",
                genre: "world",
                difficulty: "intermediario",
                pdfUrl: "cifras/voo-condor.pdf",
                thumbnailUrl: "https://picsum.photos/id/386/300/200",
                cifra: `[Intro] Am Em G F (2x)
                
                Am                  Em
                Nas alturas dos Andes sagrados
                G                   F
                O condor paira majestoso
                Am                  Em
                Suas asas abertas ao vento
                G                   F
                Como guardiões do céu
                
                [Refrão]
                C                   G
                Voo do condor, liberdade
                Em                  Am
                Que transcende fronteiras
                F                   G
                Voo do condor, sabedoria
                Am
                Dos ancestrais que observa
                
                [Ponte]
                Dm                  Am
                Entre montanhas e vales
                F                   G
                O espírito da ave flutua
                Dm                  Am
                Ligando o céu e a terra
                F                   E7
                Em uma dança eterna`
            },
            {
                id: 249,
                title: "Canção do Entardecer",
                artist: "Pôr do Sol Acústico",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/cancao-entardecer.pdf",
                thumbnailUrl: "https://picsum.photos/id/387/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                Quando o sol se despede
                Bm                  G
                Pintando o céu de laranja
                D                   A
                Meu coração se aquieta
                Bm                  G
                Preparando-se para a noite
                
                [Refrão]
                G                   A
                Canção do entardecer
                Bm                  G
                Melodia do dia que se vai
                D                   A
                Canção do entardecer
                G                   D
                Prelúdio das estrelas que virão
                
                [Verso 2]
                D                   A
                Os pássaros voltam aos ninhos
                Bm                  G
                Cantando sua última canção
                D                   A
                As primeiras estrelas surgem
                Bm                  G
                Timidamente no firmamento`
            },
            {
                id: 250,
                title: "Dança dos Elementos",
                artist: "Quatro Forças",
                genre: "world",
                difficulty: "avancado",
                pdfUrl: "cifras/danca-elementos.pdf",
                thumbnailUrl: "https://picsum.photos/id/388/300/200",
                cifra: `[Intro] Em D C B7 (2x)
                
                Em                  D
                Terra firme sob os pés
                C                   B7
                Fogo ardente no coração
                Em                  D
                Água fluindo nas veias
                C                   B7
                Ar preenchendo os pulmões
                
                [Refrão]
                Am                  B7
                Na dança dos elementos
                Em                  D
                Encontramos o equilíbrio
                C                   D
                Na dança dos elementos
                Em
                Descobrimos quem somos
                
                [Ponte]
                G                   D
                Cada elemento tem seu papel
                C                   B7
                Na grande sinfonia da vida
                G                   D
                Cada elemento nos ensina
                C                   B7
                Uma lição sobre existir`
            },
            {
                id: 251,
                title: "Café na Varanda",
                artist: "Manhã Tranquila",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/cafe-varanda.pdf",
                thumbnailUrl: "https://picsum.photos/id/389/300/200",
                cifra: `[Intro] C G Am F (2x)
                
                C                   G
                Na varanda de madeira
                Am                  F
                O dia começa devagar
                C                   G
                Uma xícara de café quente
                Am                  F
                E o tempo para contemplar
                
                [Refrão]
                F                   G
                Café na varanda, momento
                Em                  Am
                Que me traz serenidade
                F                   G
                Café na varanda, rituais
                C
                Que dão sentido à vida
                
                [Verso 2]
                C                   G
                Passarinhos na mangueira
                Am                  F
                Cantam sua melodia matinal
                C                   G
                O orvalho ainda nas folhas
                Am                  F
                Brilha como cristais ao sol`
            },
            {
                id: 252,
                title: "Ruas da Cidade",
                artist: "Horizonte Urbano",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/ruas-cidade.pdf",
                thumbnailUrl: "https://picsum.photos/id/390/300/200",
                cifra: `[Intro] E A D A (2x)
                
                E                   A
                Pelas ruas da cidade grande
                D                   A
                Caminho observando a vida
                E                   A
                Cada esquina uma história
                D                   A
                Cada olhar uma despedida
                
                [Refrão]
                D                   A
                Nas ruas da cidade
                E                   A
                Somos todos anônimos
                D                   A
                Nas ruas da cidade
                E                   A
                A solidão nos une
                
                [Solo] E A D A E A D A
                
                [Verso 2]
                E                   A
                Entre prédios e viadutos
                D                   A
                A humanidade se esconde
                E                   A
                Buscando um pouco de sentido
                D                   A
                No caos que nos consome`
            },
            {
                id: 253,
                title: "Samba da Antiga",
                artist: "Velha Guarda",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/samba-antiga.pdf",
                thumbnailUrl: "https://picsum.photos/id/391/300/200",
                cifra: `[Intro] Dm A7 Dm Gm A7 Dm (2x)
                
                Dm                  A7
                No quintal da vovó Candinha
                                  Dm
                O samba rolava solto
                Dm                  Gm
                Pandeiro, violão e cavaquinho
                A7                  Dm
                Cantando histórias do povo
                
                [Refrão]
                F                   C
                Samba da antiga, tradição
                A7                  Dm
                Que corre no sangue e na alma
                Gm                  Dm
                Samba da antiga, herança
                A7                  Dm
                Que o tempo não cala
                
                [Verso 2]
                Dm                  A7
                Os bambas se reuniam
                                  Dm
                Para celebrar a vida
                Dm                  Gm
                Com versos improvisados
                A7                  Dm
                E muita filosofia`
            },
            {
                id: 254,
                title: "Poesia das Ruas",
                artist: "Concreto Lírico",
                genre: "rap",
                difficulty: "intermediario",
                pdfUrl: "cifras/poesia-ruas.pdf",
                thumbnailUrl: "https://picsum.photos/id/392/300/200",
                cifra: `[Intro] Am Em G F (2x)
                
                Am                  Em
                Nas calçadas quebradas da periferia
                G                   F
                Nasce uma poesia crua e verdadeira
                Am                  Em
                Palavras que refletem realidades
                G                   F
                Que muitos preferem não enxergar
                
                [Refrão]
                C                   G
                É a poesia das ruas falando
                Em                  Am
                Com o ritmo do coração da cidade
                F                   G
                É a poesia das ruas gritando
                Am
                Verdades que precisam ser ouvidas
                
                [Ponte]
                Dm                  Am
                Entre becos e vielas
                F                   G
                A arte encontra seu caminho
                Dm                  Am
                Microfones improvisados
                F                   G
                Amplificam vozes silenciadas`
            },
            {
                id: 255,
                title: "Girassol",
                artist: "Flores do Campo",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/girassol.pdf",
                thumbnailUrl: "https://picsum.photos/id/393/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                Como o girassol que segue
                Bm                  G
                Fielmente o caminho do sol
                D                   A
                Meu coração busca a luz
                Bm                  G
                Mesmo nos dias nublados
                
                [Refrão]
                G                   A
                Girassol, ensina-me
                Bm                  G
                A sempre buscar a luz
                D                   A
                Girassol, mostra-me
                G                   D
                Como crescer forte e vibrante
                
                [Verso 2]
                D                   A
                Campos amarelos ondulam
                Bm                  G
                Como um mar ensolarado
                D                   A
                Cada flor um pequeno sol
                Bm                  G
                Iluminando o mundo ao redor`
            },
            {
                id: 256,
                title: "Sons da Floresta",
                artist: "Natureza Viva",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/sons-floresta.pdf",
                thumbnailUrl: "https://picsum.photos/id/394/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em                  C
                No silêncio da floresta densa
                G                   D
                Mil sons se fazem ouvir
                Em                  C
                O canto dos pássaros ao amanhecer
                G                   D
                O vento nas folhas a sussurrar
                
                [Refrão]
                C                   D
                São os sons da floresta
                G                   Em
                A grande orquestra natural
                C                   D
                São os sons da floresta
                Em
                Sinfonia da vida selvagem
                
                [Verso 2]
                Em                  C
                O tamborilar da chuva nas folhas
                G                   D
                O murmurar do riacho cristalino
                Em                  C
                O uivar distante do lobo
                G                   D
                Compõem essa melodia divina`
            },
            {
                id: 257,
                title: "Travessia do Deserto",
                artist: "Oásis de Esperança",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/travessia-deserto.pdf",
                thumbnailUrl: "https://picsum.photos/id/395/300/200",
                cifra: `[Intro] Am Dm G C F Dm E7 Am (2x)
                
                Am                  Dm
                Na aridez do deserto da vida
                G                   C
                Caminho em busca de um oásis
                F                   Dm
                O sol inclemente castiga
                E7                  Am
                Mas não perco a esperança
                
                [Refrão]
                C                   G
                É a travessia do deserto
                Dm                  Am
                Que fortalece o espírito
                F                   G
                É a travessia do deserto
                Am
                Que revela quem somos
                
                [Ponte]
                F                   C
                Entre dunas e miragens
                G                   Am
                A verdade se esconde
                F                   C
                Apenas os persistentes
                G                   E7
                Encontram seu caminho`
            },
            {
                id: 258,
                title: "Valsando com as Estrelas",
                artist: "Dançarinos do Céu",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/valsando-estrelas.pdf",
                thumbnailUrl: "https://picsum.photos/id/396/300/200",
                cifra: `[Intro] Em B7 Em Am B7 Em (2x)
                
                Em                  B7
                No salão celestial da noite
                Em
                As estrelas dançam em silêncio
                Am                  Em
                Uma valsa cósmica e eterna
                B7                  Em
                Que encanta os olhos dos mortais
                
                [Refrão]
                G                   D
                Valsando com as estrelas
                Am                  Em
                No ritmo do universo
                C                   B7
                Valsando com as estrelas
                Em
                Na melodia do infinito
                
                [Verso 2]
                Em                  B7
                Constelações rodopiando
                Em
                Formando desenhos no céu escuro
                Am                  Em
                A lua como mestra de cerimônias
                B7                  Em
                Ilumina o grande baile cósmico`
            },
            {
                id: 259,
                title: "Coração de Papel",
                artist: "Origami Emocional",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/coracao-papel.pdf",
                thumbnailUrl: "https://picsum.photos/id/397/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Dobrei meu coração como papel
                Em                  C
                Tentando dar-lhe nova forma
                G                   D
                Cada vinco uma memória
                Em                  C
                Cada dobra uma emoção
                
                [Refrão]
                C                   D
                Coração de papel, frágil
                Em                  C
                Que o vento pode levar
                G                   D
                Coração de papel, arte
                Em                  C
                Que as mãos criaram com amor
                
                [Verso 2]
                G                   D
                Com paciência e cuidado
                Em                  C
                Transformo a dor em beleza
                G                   D
                Origami de sentimentos
                Em                  C
                Que voa como tsuru livre`
            },
            {
                id: 260,
                title: "Navegar é Preciso",
                artist: "Marinheiros do Tempo",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/navegar.pdf",
                thumbnailUrl: "https://picsum.photos/id/398/300/200",
                cifra: `[Intro] Am Em F G Am (2x)
                
                Am                  Em
                No vasto oceano da existência
                F                   G
                Navego em busca do meu norte
                Am                  Em
                Bússola apontando para sonhos
                F                   G
                Velas içadas pela esperança
                
                [Refrão]
                C                   G
                Navegar é preciso, sempre
                Em                  Am
                Mesmo com ventos contrários
                F                   G
                Navegar é preciso, vida
                Am
                Mesmo em mares desconhecidos
                
                [Bridge]
                Dm                  Am
                Entre tempestades e calmarias
                F                   G
                A jornada continua
                Dm                  Am
                O importante é o movimento
                F                   E7
                Pois parados nos afundamos`
            },
            {
                id: 261,
                title: "Asas de Liberdade",
                artist: "Voo Rasante",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/asas-liberdade.pdf",
                thumbnailUrl: "https://picsum.photos/id/399/300/200",
                cifra: `[Intro] E B C#m A (2x)
                
                E                   B
                Quero voar além das nuvens
                C#m                 A
                Onde o ar é mais rarefeito
                E                   B
                Sentir o vento nas minhas asas
                C#m                 A
                E a liberdade no meu peito
                
                [Refrão]
                A                   B
                Asas de liberdade, voe alto
                C#m                 A
                Sem medo de cair ou falhar
                E                   B
                Asas de liberdade, sonhe longe
                A                   E
                Sem fronteiras para limitar
                
                [Solo] E B C#m A E B C#m A
                
                [Bridge]
                G#m                 C#m
                O céu infinito me chama
                A                   B
                Para dançar entre estrelas
                G#m                 C#m
                Abandonando as correntes
                A                   B
                Que me prendiam ao chão`
            }            ,
            {
                id: 262,
                title: "Liberdade de Voar",
                artist: "Horizonte Infinito",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/liberdade-voar.pdf",
                thumbnailUrl: "https://picsum.photos/id/400/300/200",
                cifra: `[Intro] Am F C G (2x)
                
                Am                  F
                Pássaros cortam o céu azul
                C                   G
                Sem medo, sem amarras
                Am                  F
                Eu queria ter essa leveza
                C                   G
                Essa liberdade de ir e vir
                
                [Refrão]
                F                   G
                Liberdade de voar, de ser
                Em                  Am
                De descobrir novos horizontes
                F                   G
                Liberdade de sonhar, de crer
                C                   Am
                Que o mundo pode ser melhor
                
                [Verso 2]
                Am                  F
                As nuvens são meu caminho
                C                   G
                O vento é minha direção
                Am                  F
                Não preciso de mapas ou bússolas
                C                   G
                Apenas do pulsar do coração`
            },
            {
                id: 263,
                title: "Caminho da Montanha",
                artist: "Serra Azul",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/caminho-montanha.pdf",
                thumbnailUrl: "https://picsum.photos/id/401/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                No caminho da montanha
                Em                  C
                Aprendi a caminhar devagar
                G                   D
                Cada passo é uma conquista
                Em                  C
                Cada pausa uma contemplação
                
                [Refrão]
                C                   D
                Montanha que me ensina
                Em                  C
                A persistir sem desistir
                G                   D
                Montanha que me mostra
                Em                  C
                Que a jornada é mais importante que o fim
                
                [Verso 2]
                G                   D
                O ar rarefeito me prova
                Em                  C
                Que todo esforço tem valor
                G                   D
                A vista lá do cume me confirma
                Em                  C
                Que a luta sempre vale a pena`
            },
            {
                id: 264,
                title: "Mar de Emoções",
                artist: "Oceano Azul",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/mar-emocoes.pdf",
                thumbnailUrl: "https://picsum.photos/id/402/300/200",
                cifra: `[Intro] F C Dm Am Bb C F (2x)
                
                F                   C
                Mergulho em meus sentimentos
                Dm                  Am
                Como quem mergulha no oceano
                Bb                  C
                Ondas de alegria e tristeza
                F
                Me levam em sua correnteza
                
                [Refrão]
                Bb                  C
                Mar de emoções, profundo
                Dm                  Bb
                Que me faz rir e chorar
                F                   C
                Mar de emoções, intenso
                Bb                  F
                Que me ensina a navegar
                
                [Ponte]
                Am                  Dm
                Entre marés altas e baixas
                Bb                  C
                Vou aprendendo a nadar
                Am                  Dm
                Às vezes me afogo, mas sempre
                Bb                  C
                Encontro forças para continuar`
            },
            {
                id: 265,
                title: "Noites de Saudade",
                artist: "Lua Melancólica",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/noites-saudade.pdf",
                thumbnailUrl: "https://picsum.photos/id/403/300/200",
                cifra: `[Intro] G Em C D (2x)
                
                G                   Em
                A noite chega devagar
                C                   D
                Trazendo lembranças suas
                G                   Em
                A lua brilha no céu escuro
                C                   D
                Como brilhava em seus olhos
                
                [Refrão]
                C                   D
                Noites de saudade sem fim
                Em                  C
                Dias esperando seu retorno
                G                   D
                Noites de saudade assim
                C                   G
                Me fazem escrever essa canção
                
                [Verso 2]
                G                   Em
                A distância é uma inimiga
                C                   D
                Que separa dois corações
                G                   Em
                Mas nem o tempo nem o espaço
                C                   D
                Podem apagar essas emoções`
            },
            {
                id: 266,
                title: "Coração de Bamba",
                artist: "Raízes do Samba",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/coracao-bamba.pdf",
                thumbnailUrl: "https://picsum.photos/id/404/300/200",
                cifra: `[Intro] Dm A7 Dm Gm A7 Dm (2x)
                
                Dm                  A7
                Meu coração é de bamba
                                  Dm
                Não sabe viver sem o samba
                Dm                  Gm
                Quando o surdo marca o compasso
                A7                  Dm
                Minha alma entra na roda
                
                [Refrão]
                F                   C
                É o coração de bamba
                A7                  Dm
                Que pulsa forte no peito
                Gm                  Dm
                É o coração de bamba
                A7                  Dm
                Que não conhece desfeita
                
                [Verso 2]
                Dm                  A7
                Na roda da vida eu sigo
                                  Dm
                Com gingado e alegria
                Dm                  Gm
                No carnaval da existência
                A7                  Dm
                Meu samba é minha poesia`
            },
            {
                id: 267,
                title: "Pétalas e Espinhos",
                artist: "Jardim Secreto",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/petalas-espinhos.pdf",
                thumbnailUrl: "https://picsum.photos/id/405/300/200",
                cifra: `[Intro] C G Am Em F G C (2x)
                
                C                   G
                Rosas têm espinhos e beleza
                Am                  Em
                Como o amor tem dor e alegria
                F                   G
                Não existe flor sem seus riscos
                C
                Nem amor sem suas contradições
                
                [Refrão]
                F                   G
                Pétalas e espinhos juntos
                Em                  Am
                Na mesma haste de emoção
                F                   G
                Pétalas e espinhos fazem
                C
                A beleza da paixão
                
                [Ponte]
                Am                  Em
                Os espinhos protegem a flor
                F                   G
                Como as mágoas protegem o coração
                Am                  Em
                Mas é preciso arriscar-se às vezes
                F                   G
                Para sentir o perfume da vida`
            },
            {
                id: 268,
                title: "Vento Norte",
                artist: "Brisas Geladas",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/vento-norte.pdf",
                thumbnailUrl: "https://picsum.photos/id/406/300/200",
                cifra: `[Intro] Em Bm C Am B7 (2x)
                
                Em                  Bm
                O vento norte traz o frio
                C                   Am
                Atravessando vales e montanhas
                Em                  Bm
                Carregando histórias antigas
                C                   B7
                De terras distantes e estranhas
                
                [Refrão]
                Am                  B7
                Vento norte, mensageiro
                Em                  C
                De mudanças e transformações
                Am                  B7
                Vento norte, companheiro
                Em
                Nas minhas reflexões
                
                [Verso 2]
                Em                  Bm
                Sopra forte, sem clemência
                C                   Am
                Derrubando o que não tem raiz
                Em                  Bm
                Ensina sobre resiliência
                C                   B7
                E como se manter firme e feliz`
            },
            {
                id: 269,
                title: "Ciclos da Vida",
                artist: "Quatro Estações",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/ciclos-vida.pdf",
                thumbnailUrl: "https://picsum.photos/id/407/300/200",
                cifra: `[Intro] Am F C G Em F G Am (2x)
                
                Am                  F
                Primavera traz renovação
                C                   G
                O verão, calor e abundância
                Em                  F
                O outono nos lembra da impermanência
                G                   Am
                E o inverno do silêncio e da espera
                
                [Refrão]
                F                   C
                Ciclos da vida girando
                G                   Am
                Como as estações do ano
                F                   C
                Ciclos da vida ensinando
                G                   Am
                Que tudo sempre passa e volta
                
                [Ponte]
                Dm                  Am
                Nada permanece igual
                F                   G
                O movimento é a única constante
                Dm                  Am
                Aceitar as mudanças
                F                   E7
                É a chave para a felicidade`
            },
            {
                id: 270,
                title: "Dance Comigo",
                artist: "Ritmos da Paixão",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/dance-comigo.pdf",
                thumbnailUrl: "https://picsum.photos/id/408/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                A música toca no rádio
                Bm                  G
                Seu corpo pede movimento
                D                   A
                Vamos esquecer os problemas
                Bm                  G
                E dançar esse momento
                
                [Refrão]
                G                   A
                Dance comigo esta noite
                Bm                  G
                Como se não houvesse amanhã
                D                   A
                Dance comigo agora
                G                   D
                Deixe seu corpo falar
                
                [Verso 2]
                D                   A
                Não importa se errar o passo
                Bm                  G
                A perfeição não é necessária
                D                   A
                O que vale é sentir o ritmo
                Bm                  G
                E deixar a alma leve e livre`
            },
            {
                id: 271,
                title: "Mistérios do Tempo",
                artist: "Relógio Cósmico",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/misterios-tempo.pdf",
                thumbnailUrl: "https://picsum.photos/id/409/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em                  C
                O tempo escorre entre os dedos
                G                   D
                Como areia fina da ampulheta
                Em                  C
                Passado, presente e futuro
                G                   D
                Se fundem em dimensões secretas
                
                [Refrão]
                C                   D
                Mistérios do tempo, enigmas
                G                   Em
                Que a ciência tenta decifrar
                C                   D
                Mistérios do tempo, segredos
                Em
                Que o coração consegue entender
                
                [Solo] Em C G D Em C G D
                
                [Ponte]
                Am                  C
                As horas passam depressa
                G                   D
                Quando estamos felizes
                Am                  C
                E se arrastam tão devagar
                G                   D
                Nos momentos de tristeza`
            },
            {
                id: 272,
                title: "Estrela da Manhã",
                artist: "Aurora Boreal",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/estrela-manha.pdf",
                thumbnailUrl: "https://picsum.photos/id/410/300/200",
                cifra: `[Intro] C G Am F G C (2x)
                
                C                   G
                Estrela da manhã que brilha
                Am                  F
                Antes do sol despertar
                G                   C
                Guia dos navegantes perdidos
                G                   C
                Luz que me ajuda a encontrar
                
                [Refrão]
                F                   G
                Minha estrela da manhã
                Em                  Am
                Que ilumina meu caminho
                F                   G
                Minha estrela, minha luz
                C
                Meu norte, meu destino
                
                [Verso 2]
                C                   G
                Quando a noite parece sem fim
                Am                  F
                E a escuridão quer me abraçar
                G                   C
                Procuro seu brilho no céu
                G                   C
                E encontro força pra continuar`
            },
            {
                id: 273,
                title: "Alma Sertaneja",
                artist: "Violeiros do Oeste",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/alma-sertaneja.pdf",
                thumbnailUrl: "https://picsum.photos/id/411/300/200",
                cifra: `[Intro] G D C G (2x)
                
                G                   D
                No coração do Brasil profundo
                C                   G
                Onde a poeira encontra o céu
                G                   D
                Vive um povo simples e forte
                C                   G
                Com alma forjada em fogo e mel
                
                [Refrão]
                C                   D
                Alma sertaneja, genuína
                Em                  C
                Que conhece a dor e a alegria
                G                   D
                Alma sertaneja, verdadeira
                C                   G
                Que não se dobra nem se rende
                
                [Verso 2]
                G                   D
                Na dureza da vida aprendi
                C                   G
                Que a persistência vence o destino
                G                   D
                No calor do sertão entendi
                C                   G
                Que somos todos peregrinos`
            },
            {
                id: 274,
                title: "Batuque de Coco",
                artist: "Coqueiros da Praia",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/batuque-coco.pdf",
                thumbnailUrl: "https://picsum.photos/id/412/300/200",
                cifra: `[Intro] Em D C B7 (2x)
                
                Em                  D
                Na beira da praia o coco cai
                C                   B7
                E o som da quebrada ecoa
                Em                  D
                As mãos batem no compasso
                C                   B7
                E os pés marcam na areia
                
                [Refrão]
                Am                  B7
                Batuque de coco, tradição
                Em                  D
                Que vem dos antigos, dos ancestrais
                C                   B7
                Batuque de coco, cultura
                Em
                Que corre nas veias do povo
                
                [Verso 2]
                Em                  D
                Homens e mulheres em roda
                C                   B7
                Dançando ao som dos tambores
                Em                  D
                Contam histórias de vida
                C                   B7
                Em versos de improviso`
            },
            {
                id: 275,
                title: "Flores no Inverno",
                artist: "Estações Contrárias",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/flores-inverno.pdf",
                thumbnailUrl: "https://picsum.photos/id/413/300/200",
                cifra: `[Intro] C Em Am F G C (2x)
                
                C                   Em
                Mesmo no inverno mais frio
                Am                  F
                Algumas flores conseguem nascer
                G                   C
                Mostrando que a esperança
                G                   C
                É mais forte que qualquer estação
                
                [Refrão]
                F                   G
                Flores no inverno, milagre
                Em                  Am
                Que desafia a natureza
                F                   G
                Flores no inverno, prova
                C
                Que a vida sempre vence
                
                [Verso 2]
                C                   Em
                Sob a neve e o gelo
                Am                  F
                A semente aguarda pacientemente
                G                   C
                Sabendo que seu momento virá
                G                   C
                E sua beleza florescerá`
            },
            {
                id: 276,
                title: "Rock da Estrada",
                artist: "Motores Ligados",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/rock-estrada.pdf",
                thumbnailUrl: "https://picsum.photos/id/414/300/200",
                cifra: `[Intro] E A D A (2x)
                
                E                   A
                Na estrada da vida acelerando
                D                   A
                Com o vento batendo no rosto
                E                   A
                A liberdade tem gosto de poeira
                D                   A
                E o ronco do motor é a trilha sonora
                
                [Refrão]
                D                   A
                É o rock da estrada
                E                   A
                Que corre em minhas veias
                D                   A
                É o rock da estrada
                E                   A
                Que me mantém em movimento
                
                [Solo] E A D A E A D A
                
                [Ponte]
                C#m                 F#m
                Cada curva é um novo desafio
                A                   B
                Cada reta uma oportunidade
                C#m                 F#m
                Não olho pelo retrovisor
                A                   B
                O passado já passou, só sigo em frente`
            },
            {
                id: 277,
                title: "Melodia da Chuva",
                artist: "Gotas Musicais",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/melodia-chuva.pdf",
                thumbnailUrl: "https://picsum.photos/id/415/300/200",
                cifra: `[Intro] Am Em F G (2x)
                
                Am                  Em
                A chuva cai suavemente
                F                   G
                Cada gota uma nota musical
                Am                  Em
                Compondo no telhado
                F                   G
                Uma sinfonia natural
                
                [Refrão]
                C                   G
                Melodia da chuva, serena
                Am                  F
                Que acalma minha ansiedade
                C                   G
                Melodia da chuva, tranquila
                F                   Am
                Que embala meus pensamentos
                
                [Verso 2]
                Am                  Em
                Janela embaçada pelo vapor
                F                   G
                Mundo lá fora em tons de cinza
                Am                  Em
                Dentro, o calor do lar
                F                   G
                E a música que a natureza traz`
            },
            {
                id: 278,
                title: "Céu de Santo Antônio",
                artist: "Festas Juninas",
                genre: "forró",
                difficulty: "iniciante",
                pdfUrl: "cifras/ceu-santo-antonio.pdf",
                thumbnailUrl: "https://picsum.photos/id/416/300/200",
                cifra: `[Intro] D A7 D G A7 D (2x)
                
                D                   A7
                O céu se enche de balões coloridos
                                  D
                É noite de Santo Antônio
                D                   G
                A fogueira ilumina o terreiro
                A7                  D
                E o forró já começou
                
                [Refrão]
                G                   D
                São João, São Pedro e Santo Antônio
                A7                  D
                Abençoem nossa festa
                G                   D
                Com muita alegria e fartura
                A7                  D
                Com amor e harmonia
                
                [Verso 2]
                D                   A7
                Cheiro de milho e quentão
                                  D
                Bandeirinhas coloridas
                D                   G
                Sanfona, zabumba e triângulo
                A7                  D
                Anunciam que é tempo de festejar`
            },
            {
                id: 279,
                title: "Pés no Chão",
                artist: "Raízes Profundas",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/pes-no-chao.pdf",
                thumbnailUrl: "https://picsum.photos/id/417/300/200",
                cifra: `[Intro] C G Am Em F G C (2x)
                
                C                   G
                Com os pés firmes no chão
                Am                  Em
                E os olhos mirando o horizonte
                F                   G
                Sigo meu caminho sem ilusões
                C
                Mas cheio de esperança
                
                [Refrão]
                F                   G
                Pés no chão, coração nas nuvens
                Em                  Am
                Equilíbrio perfeito para viver
                F                   G
                Pés no chão, mente livre
                C
                Para sonhar e realizar
                
                [Ponte]
                Am                  Em
                O vento pode soprar forte
                F                   G
                Tentar me derrubar, me desviar
                Am                  Em
                Mas minhas raízes são profundas
                F                   G
                Sustentam meus sonhos mais altos`
            },
            {
                id: 280,
                title: "Janela para o Mar",
                artist: "Vista Oceânica",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/janela-mar.pdf",
                thumbnailUrl: "https://picsum.photos/id/418/300/200",
                cifra: `[Intro] D Bm G A (2x)
                
                D                   Bm
                Da minha janela vejo o mar
                G                   A
                Imenso, azul, sem fim
                D                   Bm
                Ondas que vêm e que vão
                G                   A
                Como os dias da minha vida
                
                [Refrão]
                G                   A
                Janela para o mar, moldura
                Bm                  G
                Do mais belo quadro vivo
                D                   A
                Janela para o mar, portal
                G                   D
                Que me leva à liberdade
                
                [Verso 2]
                D                   Bm
                Barcos navegando ao longe
                G                   A
                Gaivotas dançando no ar
                D                   Bm
                A brisa salgada que entra
                G                   A
                Trazendo histórias de além-mar`
            },
            {
                id: 281,
                title: "Acorde Maior",
                artist: "Notas Positivas",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/acorde-maior.pdf",
                thumbnailUrl: "https://picsum.photos/id/419/300/200",
                cifra: `[Intro] Cmaj7 Am7 Dm7 G7 (2x)
                
                Cmaj7               Am7
                A música tem o poder de curar
                Dm7                 G7
                De transformar tristeza em alegria
                Cmaj7               Am7
                Um simples acorde maior
                Dm7                 G7
                Pode mudar todo um dia cinzento
                
                [Refrão]
                Fmaj7               G7
                Acorde maior, som do otimismo
                Em7                 Am7
                Que colore o mundo em tons de esperança
                Dm7                 G7
                Acorde maior, luz em melodia
                Cmaj7
                Que espanta as sombras da alma
                
                [Solo] Cmaj7 Am7 Dm7 G7 Cmaj7 Am7 Dm7 G7
                
                [Ponte]
                Em7                 Am7
                Entre bemóis e sustenidos
                Dm7                 G7
                A vida compõe sua sinfonia
                Em7                 Am7
                E mesmo nas dissonâncias
                Dm7                 G7
                Encontramos a harmonia perfeita`
            },
            {
                id: 282,
                title: "Fogueira de São João",
                artist: "Balão Colorido",
                genre: "forró",
                difficulty: "iniciante",
                pdfUrl: "cifras/fogueira-sao-joao.pdf",
                thumbnailUrl: "https://picsum.photos/id/420/300/200",
                cifra: `[Intro] D G A7 D (2x)
                
                D                   G
                A fogueira está acesa
                A7                  D
                Iluminando o arraial
                D                   G
                A sanfona toca alegre
                A7                  D
                Começou o São João
                
                [Refrão]
                G                   A7
                Pula fogueira ioiô
                D                   Bm
                Pula fogueira iaiá
                G                   A7
                São João está chegando
                D
                É hora de festejar
                
                [Verso 2]
                D                   G
                Milho verde, canjica e pamonha
                A7                  D
                Quentão para esquentar
                D                   G
                Bandeirinhas coloridas
                A7                  D
                E muita dança de quadrilha`
            },
            {
                id: 283,
                title: "Coração de Menina",
                artist: "Emoções Juvenis",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/coracao-menina.pdf",
                thumbnailUrl: "https://picsum.photos/id/421/300/200",
                cifra: `[Intro] C G Am F G C (2x)
                
                C                   G
                No coração de menina
                Am                  F
                Cabem sonhos gigantes
                G                   C
                Esperanças multicoloridas
                G                   C
                E amor sem limites
                
                [Refrão]
                F                   G
                Coração de menina, puro
                Em                  Am
                Que ainda não conhece desilusão
                F                   G
                Coração de menina, doce
                C
                Que ama sem reservas ou condição
                
                [Verso 2]
                C                   G
                Olhos brilhantes que veem
                Am                  F
                Um mundo cheio de possibilidades
                G                   C
                Sorrisos que iluminam o caminho
                G                   C
                E afastam toda escuridão`
            },
            {
                id: 284,
                title: "Fogo da Paixão",
                artist: "Chamas Intensas",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/fogo-paixao.pdf",
                thumbnailUrl: "https://picsum.photos/id/422/300/200",
                cifra: `[Intro] A E F#m D (2x)
                
                A                   E
                Como fogo que não se apaga
                F#m                 D
                Arde em mim essa paixão
                A                   E
                Nem toda água do oceano
                F#m                 D
                Poderia esfriar meu coração
                
                [Refrão]
                D                   E
                É o fogo da paixão
                F#m                 D
                Que me consome noite e dia
                A                   E
                É o fogo da paixão
                D                   A
                Que me mantém vivo e ardente
                
                [Verso 2]
                A                   E
                Seus olhos têm o poder
                F#m                 D
                De incendiar minha alma
                A                   E
                Seu toque é como brasa
                F#m                 D
                Que marca fundo minha pele`
            },
            {
                id: 285,
                title: "Valsa das Flores",
                artist: "Jardim Encantado",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/valsa-flores.pdf",
                thumbnailUrl: "https://picsum.photos/id/423/300/200",
                cifra: `[Intro] Em B7 Em Am B7 Em (2x)
                
                Em                  B7
                No jardim da primavera
                Em
                As flores dançam ao vento
                Am                  Em
                Uma valsa delicada e bela
                B7                  Em
                Que encanta os sentidos
                
                [Refrão]
                G                   D
                Valsa das flores, dança suave
                Am                  Em
                Que celebra o renascer da vida
                C                   B7
                Valsa das flores, movimento
                Em
                Que pinta o mundo de cores
                
                [Bridge]
                C                   G
                Pétalas rodopiando no ar
                Am                  B7
                Como bailarinas em seu palco
                C                   G
                Perfume que embriaga a alma
                Am                  B7
                E traz memórias de felicidade`
            },
            {
                id: 286,
                title: "Fronteiras do Desconhecido",
                artist: "Exploradores Cósmicos",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/fronteiras-desconhecido.pdf",
                thumbnailUrl: "https://picsum.photos/id/424/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em                  C
                Para além do horizonte visível
                G                   D
                Existe um mundo a explorar
                Em                  C
                Fronteiras que desafiam a mente
                G                   D
                E fazem o espírito voar
                
                [Refrão]
                C                   D
                Nas fronteiras do desconhecido
                G                   Em
                Está a verdadeira aventura
                C                   D
                Nas fronteiras do desconhecido
                Em
                Descobrimos quem realmente somos
                
                [Solo] Em C G D Em C G D
                
                [Ponte]
                Am                  C
                O medo tenta nos paralisar
                G                   D
                Diante do que é novo e diferente
                Am                  C
                Mas a curiosidade é mais forte
                G                   D
                E nos empurra sempre adiante`
            },
            {
                id: 287,
                title: "Sorriso de Criança",
                artist: "Alegria Infantil",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/sorriso-crianca.pdf",
                thumbnailUrl: "https://picsum.photos/id/425/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Não há nada mais sincero
                Em                  C
                Que o sorriso de uma criança
                G                   D
                Puro como água cristalina
                Em                  C
                Brilhante como sol da manhã
                
                [Refrão]
                C                   D
                Sorriso de criança, luz
                Em                  C
                Que ilumina o mundo inteiro
                G                   D
                Sorriso de criança, força
                Em                  C
                Que renova nossa esperança
                
                [Verso 2]
                G                   D
                Na simplicidade do brincar
                Em                  C
                Na alegria sem compromisso
                G                   D
                No olhar cheio de surpresas
                Em                  C
                Vemos a essência da felicidade`
            },
            {
                id: 288,
                title: "Café com Viola",
                artist: "Manhãs Sertanejas",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/cafe-viola.pdf",
                thumbnailUrl: "https://picsum.photos/id/426/300/200",
                cifra: `[Intro] G D C G (2x)
                
                G                   D
                Manhãzinha na fazenda
                C                   G
                O galo canta no terreiro
                G                   D
                Café fresquinho na mesa
                C                   G
                E a viola no canto da sala
                
                [Refrão]
                C                   D
                Café com viola, simplicidade
                Em                  C
                Que faz a vida valer a pena
                G                   D
                Café com viola, tradição
                C                   G
                Que passa de pai para filho
                
                [Verso 2]
                G                   D
                Da janela vejo o campo verde
                C                   G
                O gado pastando tranquilo
                G                   D
                A vida segue seu ritmo
                C                   G
                Sem pressa, sem agonia`
            },
            {
                id: 289,
                title: "Dança das Águas",
                artist: "Rio Cristalino",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/danca-aguas.pdf",
                thumbnailUrl: "https://picsum.photos/id/427/300/200",
                cifra: `[Intro] Am F C G (2x)
                
                Am                  F
                Entre pedras o rio desce
                C                   G
                Dançando em curvas sinuosas
                Am                  F
                Águas claras que refletem o céu
                C                   G
                E contam segredos ancestrais
                
                [Refrão]
                F                   G
                Na dança das águas, movimento
                Em                  Am
                Que nunca cessa ou se repete
                F                   G
                Na dança das águas, lições
                Am
                De persistência e adaptação
                
                [Ponte]
                Dm                  Am
                Ora calma como um lago
                F                   G
                Ora forte como uma cachoeira
                Dm                  Am
                A água segue seu caminho
                F                   E7
                Contornando obstáculos sem parar`
            },
            {
                id: 290,
                title: "Voo do Beija-flor",
                artist: "Asas Coloridas",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/voo-beija-flor.pdf",
                thumbnailUrl: "https://picsum.photos/id/428/300/200",
                cifra: `[Intro] C Am7 F G7 (2x)
                
                C                   Am7
                Rápido como um pensamento
                F                   G7
                Colorido como um arco-íris
                C                   Am7
                O beija-flor visita as flores
                F                   G7
                Em seu balé aéreo preciso
                
                [Refrão]
                Fmaj7               G7
                Voo do beija-flor, mágico
                Em7                 Am7
                Que desafia nossa compreensão
                Fmaj7               G7
                Voo do beija-flor, símbolo
                Cmaj7
                Da beleza em movimento
                
                [Solo] Cmaj7 Am7 Fmaj7 G7 Cmaj7 Am7 Fmaj7 G7
                
                [Ponte]
                Em7                 Am7
                Suas asas batem tão rápido
                Fmaj7               G7
                Que nossos olhos mal conseguem ver
                Em7                 Am7
                Pairando no ar como por magia
                Fmaj7               G7
                Uma joia viva da natureza`
            },
            {
                id: 291,
                title: "Sabor do Brasil",
                artist: "Temperos Nacionais",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/sabor-brasil.pdf",
                thumbnailUrl: "https://picsum.photos/id/429/300/200",
                cifra: `[Intro] D A7 D G A7 D (2x)
                
                D                   A7
                Tempero, suor e paixão
                                  D
                No caldeirão da cultura
                D                   G
                Mistura que dá esse sabor
                A7                  D
                Que só o Brasil tem
                
                [Refrão]
                G                   A7
                É o sabor do Brasil
                D                   Bm
                Que tempera nossa alma
                G                   A7
                É o sabor do Brasil
                D
                Que o mundo inteiro prova
                
                [Verso 2]
                D                   A7
                Da feijoada à moqueca
                                  D
                Do acarajé ao pato no tucupi
                D                   G
                Cada região, cada prato
                A7                  D
                Conta uma história de nós`
            },
            {
                id: 292,
                title: "Soul da Periferia",
                artist: "Vozes do Gueto",
                genre: "r&b",
                difficulty: "intermediario",
                pdfUrl: "cifras/soul-periferia.pdf",
                thumbnailUrl: "https://picsum.photos/id/430/300/200",
                cifra: `[Intro] Dm Bb F C (2x)
                
                Dm                  Bb
                Da lama nascem flores fortes
                F                   C
                Das dificuldades surge a arte
                Dm                  Bb
                No ritmo da vida na quebrada
                F                   C
                Encontramos nossa identidade
                
                [Refrão]
                Bb                  C
                É o soul da periferia
                Dm                  Bb
                Batida que vem do coração
                F                   C
                É o soul da periferia
                Bb                  F
                Mensagem de transformação
                
                [Ponte]
                Gm                  Dm
                Entre becos e vielas
                Bb                  C
                A música flui como rio
                Gm                  Dm
                Palavras que são balas de luz
                Bb                  C
                Contra a escuridão do preconceito`
            },
            {
                id: 293,
                title: "Ciranda da Lua",
                artist: "Rodas do Luar",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/ciranda-lua.pdf",
                thumbnailUrl: "https://picsum.photos/id/431/300/200",
                cifra: `[Intro] Em Bm C Am B7 (2x)
                
                Em                  Bm
                A lua dança no céu estrelado
                C                   Am
                Girando em volta da Terra
                Em                  Bm
                Como crianças de mãos dadas
                C                   B7
                Na roda de uma ciranda
                
                [Refrão]
                Am                  Bm
                Ciranda da lua, mistério
                Em                  C
                Que ilumina nossas noites
                Am                  Bm
                Ciranda da lua, magia
                Em
                Que nos faz sonhar acordados
                
                [Verso 2]
                Em                  Bm
                Ora cheia, ora minguante
                C                   Am
                Ora crescente, ora nova
                Em                  Bm
                Sempre mudando de forma
                C                   B7
                Mas nunca deixando de brilhar`
            },
            {
                id: 294,
                title: "Trovão nas Montanhas",
                artist: "Tempestade Serrana",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/trovao-montanhas.pdf",
                thumbnailUrl: "https://picsum.photos/id/432/300/200",
                cifra: `[Intro] Em G D A (2x)
                
                Em                  G
                Nuvens escuras se formam
                D                   A
                Sobre os picos das serras
                Em                  G
                O ar pesa com a eletricidade
                D                   A
                E o silêncio é quase absoluto
                
                [Refrão]
                G                   A
                Trovão nas montanhas, poder
                Bm                  G
                Que ecoa pelos vales profundos
                D                   A
                Trovão nas montanhas, força
                G                   Em
                Que faz a terra tremer
                
                [Solo] Em G D A Em G D A
                
                [Ponte]
                C                   G
                A tempestade é implacável
                D                   A
                Mas também é passageira
                C                   G
                Depois da fúria vem a calma
                D                   A
                E o céu se abre novamente`
            },
            {
                id: 295,
                title: "Raízes Brasileiras",
                artist: "Identidade Nacional",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/raizes-brasileiras.pdf",
                thumbnailUrl: "https://picsum.photos/id/433/300/200",
                cifra: `[Intro] D A7 Bm G (2x)
                
                D                   A7
                Somos feitos de tantas misturas
                Bm                  G
                Cores, credos, culturas e sons
                D                   A7
                África, Europa, América, Ásia
                Bm                  G
                Nas veias do nosso coração
                
                [Refrão]
                G                   A7
                Raízes brasileiras, profundas
                Bm                  G
                Que sustentam nossa identidade
                D                   A7
                Raízes brasileiras, diversas
                G                   D
                Que fazem nossa força e unidade
                
                [Verso 2]
                D                   A7
                Do samba ao forró, do frevo ao rock
                Bm                  G
                Da capoeira ao maracatu
                D                   A7
                Expressões de um povo que sabe
                Bm                  G
                Transformar dor em alegria`
            },
            {
                id: 296,
                title: "Luz do Sol Nascente",
                artist: "Aurora Dourada",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/luz-sol-nascente.pdf",
                thumbnailUrl: "https://picsum.photos/id/434/300/200",
                cifra: `[Intro] C G Am F G C (2x)
                
                C                   G
                O sol desponta no horizonte
                Am                  F
                Pintando o céu de dourado
                G                   C
                Anunciando um novo dia
                G                   C
                E renovando a esperança
                
                [Refrão]
                F                   G
                Luz do sol nascente, brilho
                Em                  Am
                Que afasta toda escuridão
                F                   G
                Luz do sol nascente, força
                C
                Que renova minha fé
                
                [Verso 2]
                C                   G
                Raios que atravessam as nuvens
                Am                  F
                Despertando a vida ao redor
                G                   C
                A natureza celebra em cores
                G                   C
                O milagre diário da renovação`
            },
            {
                id: 297,
                title: "Meu Lugar no Mundo",
                artist: "Pertencimento",
                genre: "pop",
                difficulty: "intermediario",
                pdfUrl: "cifras/meu-lugar-mundo.pdf",
                thumbnailUrl: "https://picsum.photos/id/435/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                Procurei por tanto tempo
                Bm                  G
                Um lugar para chamar de meu
                D                   A
                Um cantinho nesse mundo vasto
                Bm                  G
                Onde eu pudesse ser eu mesmo
                
                [Refrão]
                G                   A
                Meu lugar no mundo, encontro
                Bm                  G
                Onde meu coração se acalma
                D                   A
                Meu lugar no mundo, refúgio
                G                   D
                Onde posso ser autêntico
                
                [Verso 2]
                D                   A
                Não é um ponto no mapa
                Bm                  G
                Nem uma casa ou endereço
                D                   A
                É onde encontro aconchego
                Bm                  G
                Nos braços dos que amo`
            },
            {
                id: 298,
                title: "Batuque de Angola",
                artist: "Tambores Ancestrais",
                genre: "world",
                difficulty: "avancado",
                pdfUrl: "cifras/batuque-angola.pdf",
                thumbnailUrl: "https://picsum.photos/id/436/300/200",
                cifra: `[Intro] Dm A7 Dm Gm A7 Dm (2x)
                
                Dm                  A7
                Do outro lado do oceano
                                  Dm
                Vieram ritmos ancestrais
                Dm                  Gm
                Tambores que falam aos deuses
                A7                  Dm
                E contam histórias de luta
                
                [Refrão]
                F                   C
                É o batuque de Angola
                A7                  Dm
                Herança de nossos ancestrais
                Gm                  Dm
                É o batuque de Angola
                A7                  Dm
                Que mantém viva a tradição
                
                [Solo] Dm A7 Dm Gm A7 Dm F C A7 Dm Gm A7 Dm
                
                [Ponte]
                Bb                  F
                Cada batida é uma palavra
                A7                  Dm
                Cada ritmo uma oração
                Bb                  F
                Conexão com nossas raízes
                A7                  Dm
                Que o tempo não conseguiu apagar`
            },
            {
                id: 299,
                title: "Brisa da Serra",
                artist: "Ventos da Montanha",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/brisa-serra.pdf",
                thumbnailUrl: "https://picsum.photos/id/437/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Brisa suave que desce a serra
                Em                  C
                Trazendo o perfume das flores
                G                   D
                Acariciando rostos cansados
                Em                  C
                Sussurrando canções de conforto
                
                [Refrão]
                C                   D
                Brisa da serra, alívio
                Em                  C
                Nos dias quentes de verão
                G                   D
                Brisa da serra, carinho
                Em                  C
                Que toca a alma de mansinho
                
                [Verso 2]
                G                   D
                Entre os pinheiros ela passa
                Em                  C
                Fazendo dançar as folhagens
                G                   D
                Levando sementes e sonhos
                Em                  C
                Para germinar em novos lugares`
            },
            {
                id: 300,
                title: "Chama da Paixão",
                artist: "Coração em Fogo",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/chama-paixao.pdf",
                thumbnailUrl: "https://picsum.photos/id/438/300/200",
                cifra: `[Intro] A E F#m D (2x)
                
                A                   E
                Quando seus olhos encontram os meus
                F#m                 D
                Sinto uma chama acender
                A                   E
                Um fogo que queima por dentro
                F#m                 D
                E não consigo conter
                
                [Refrão]
                D                   E
                É a chama da paixão
                F#m                 D
                Que arde sem parar
                A                   E
                É a chama da paixão
                D                   A
                Que só você faz despertar
                
                [Verso 2]
                A                   E
                Teu beijo é como gasolina
                F#m                 D
                Que faz o fogo aumentar
                A                   E
                Teu toque é faísca certeira
                F#m                 D
                Que não me deixa esfriar`
            },
            {
                id: 301,
                title: "Sonhos de Liberdade",
                artist: "Asas ao Vento",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/sonhos-liberdade.pdf",
                thumbnailUrl: "https://picsum.photos/id/439/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em                  C
                Preso entre paredes invisíveis
                G                   D
                Construídas por medos e convenções
                Em                  C
                Sonho com espaços sem limites
                G                   D
                Onde posso simplesmente ser
                
                [Refrão]
                C                   D
                Sonhos de liberdade, anseios
                G                   Em
                Que habitam minha alma inquieta
                C                   D
                Sonhos de liberdade, asas
                Em
                Que um dia vou poder abrir
                
                [Solo] Em C G D Em C G D
                
                [Ponte]
                Am                  C
                As correntes que me prendem
                G                   D
                Não são de ferro, são de ideias
                Am                  C
                A prisão que me limita
                G                   D
                Está dentro da minha mente`
            }            ,
            {
                id: 262,
                title: "Liberdade de Voar",
                artist: "Horizonte Infinito",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/liberdade-voar.pdf",
                thumbnailUrl: "https://picsum.photos/id/400/300/200",
                cifra: `[Intro] Am F C G (2x)
                
                Am                  F
                Pássaros cortam o céu azul
                C                   G
                Sem medo, sem amarras
                Am                  F
                Eu queria ter essa leveza
                C                   G
                Essa liberdade de ir e vir
                
                [Refrão]
                F                   G
                Liberdade de voar, de ser
                Em                  Am
                De descobrir novos horizontes
                F                   G
                Liberdade de sonhar, de crer
                C                   Am
                Que o mundo pode ser melhor
                
                [Verso 2]
                Am                  F
                As nuvens são meu caminho
                C                   G
                O vento é minha direção
                Am                  F
                Não preciso de mapas ou bússolas
                C                   G
                Apenas do pulsar do coração`
            },
            {
                id: 263,
                title: "Caminho da Montanha",
                artist: "Serra Azul",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/caminho-montanha.pdf",
                thumbnailUrl: "https://picsum.photos/id/401/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                No caminho da montanha
                Em                  C
                Aprendi a caminhar devagar
                G                   D
                Cada passo é uma conquista
                Em                  C
                Cada pausa uma contemplação
                
                [Refrão]
                C                   D
                Montanha que me ensina
                Em                  C
                A persistir sem desistir
                G                   D
                Montanha que me mostra
                Em                  C
                Que a jornada é mais importante que o fim
                
                [Verso 2]
                G                   D
                O ar rarefeito me prova
                Em                  C
                Que todo esforço tem valor
                G                   D
                A vista lá do cume me confirma
                Em                  C
                Que a luta sempre vale a pena`
            },
            {
                id: 264,
                title: "Mar de Emoções",
                artist: "Oceano Azul",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/mar-emocoes.pdf",
                thumbnailUrl: "https://picsum.photos/id/402/300/200",
                cifra: `[Intro] F C Dm Am Bb C F (2x)
                
                F                   C
                Mergulho em meus sentimentos
                Dm                  Am
                Como quem mergulha no oceano
                Bb                  C
                Ondas de alegria e tristeza
                F
                Me levam em sua correnteza
                
                [Refrão]
                Bb                  C
                Mar de emoções, profundo
                Dm                  Bb
                Que me faz rir e chorar
                F                   C
                Mar de emoções, intenso
                Bb                  F
                Que me ensina a navegar
                
                [Ponte]
                Am                  Dm
                Entre marés altas e baixas
                Bb                  C
                Vou aprendendo a nadar
                Am                  Dm
                Às vezes me afogo, mas sempre
                Bb                  C
                Encontro forças para continuar`
            },
            {
                id: 265,
                title: "Noites de Saudade",
                artist: "Lua Melancólica",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/noites-saudade.pdf",
                thumbnailUrl: "https://picsum.photos/id/403/300/200",
                cifra: `[Intro] G Em C D (2x)
                
                G                   Em
                A noite chega devagar
                C                   D
                Trazendo lembranças suas
                G                   Em
                A lua brilha no céu escuro
                C                   D
                Como brilhava em seus olhos
                
                [Refrão]
                C                   D
                Noites de saudade sem fim
                Em                  C
                Dias esperando seu retorno
                G                   D
                Noites de saudade assim
                C                   G
                Me fazem escrever essa canção
                
                [Verso 2]
                G                   Em
                A distância é uma inimiga
                C                   D
                Que separa dois corações
                G                   Em
                Mas nem o tempo nem o espaço
                C                   D
                Podem apagar essas emoções`
            },
            {
                id: 266,
                title: "Coração de Bamba",
                artist: "Raízes do Samba",
                genre: "samba",
                difficulty: "intermediario",
                pdfUrl: "cifras/coracao-bamba.pdf",
                thumbnailUrl: "https://picsum.photos/id/404/300/200",
                cifra: `[Intro] Dm A7 Dm Gm A7 Dm (2x)
                
                Dm                  A7
                Meu coração é de bamba
                                  Dm
                Não sabe viver sem o samba
                Dm                  Gm
                Quando o surdo marca o compasso
                A7                  Dm
                Minha alma entra na roda
                
                [Refrão]
                F                   C
                É o coração de bamba
                A7                  Dm
                Que pulsa forte no peito
                Gm                  Dm
                É o coração de bamba
                A7                  Dm
                Que não conhece desfeita
                
                [Verso 2]
                Dm                  A7
                Na roda da vida eu sigo
                                  Dm
                Com gingado e alegria
                Dm                  Gm
                No carnaval da existência
                A7                  Dm
                Meu samba é minha poesia`
            },
            {
                id: 267,
                title: "Pétalas e Espinhos",
                artist: "Jardim Secreto",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/petalas-espinhos.pdf",
                thumbnailUrl: "https://picsum.photos/id/405/300/200",
                cifra: `[Intro] C G Am Em F G C (2x)
                
                C                   G
                Rosas têm espinhos e beleza
                Am                  Em
                Como o amor tem dor e alegria
                F                   G
                Não existe flor sem seus riscos
                C
                Nem amor sem suas contradições
                
                [Refrão]
                F                   G
                Pétalas e espinhos juntos
                Em                  Am
                Na mesma haste de emoção
                F                   G
                Pétalas e espinhos fazem
                C
                A beleza da paixão
                
                [Ponte]
                Am                  Em
                Os espinhos protegem a flor
                F                   G
                Como as mágoas protegem o coração
                Am                  Em
                Mas é preciso arriscar-se às vezes
                F                   G
                Para sentir o perfume da vida`
            },
            {
                id: 268,
                title: "Vento Norte",
                artist: "Brisas Geladas",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/vento-norte.pdf",
                thumbnailUrl: "https://picsum.photos/id/406/300/200",
                cifra: `[Intro] Em Bm C Am B7 (2x)
                
                Em                  Bm
                O vento norte traz o frio
                C                   Am
                Atravessando vales e montanhas
                Em                  Bm
                Carregando histórias antigas
                C                   B7
                De terras distantes e estranhas
                
                [Refrão]
                Am                  B7
                Vento norte, mensageiro
                Em                  C
                De mudanças e transformações
                Am                  B7
                Vento norte, companheiro
                Em
                Nas minhas reflexões
                
                [Verso 2]
                Em                  Bm
                Sopra forte, sem clemência
                C                   Am
                Derrubando o que não tem raiz
                Em                  Bm
                Ensina sobre resiliência
                C                   B7
                E como se manter firme e feliz`
            },
            {
                id: 269,
                title: "Ciclos da Vida",
                artist: "Quatro Estações",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/ciclos-vida.pdf",
                thumbnailUrl: "https://picsum.photos/id/407/300/200",
                cifra: `[Intro] Am F C G Em F G Am (2x)
                
                Am                  F
                Primavera traz renovação
                C                   G
                O verão, calor e abundância
                Em                  F
                O outono nos lembra da impermanência
                G                   Am
                E o inverno do silêncio e da espera
                
                [Refrão]
                F                   C
                Ciclos da vida girando
                G                   Am
                Como as estações do ano
                F                   C
                Ciclos da vida ensinando
                G                   Am
                Que tudo sempre passa e volta
                
                [Ponte]
                Dm                  Am
                Nada permanece igual
                F                   G
                O movimento é a única constante
                Dm                  Am
                Aceitar as mudanças
                F                   E7
                É a chave para a felicidade`
            },
            {
                id: 270,
                title: "Dance Comigo",
                artist: "Ritmos da Paixão",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/dance-comigo.pdf",
                thumbnailUrl: "https://picsum.photos/id/408/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                A música toca no rádio
                Bm                  G
                Seu corpo pede movimento
                D                   A
                Vamos esquecer os problemas
                Bm                  G
                E dançar esse momento
                
                [Refrão]
                G                   A
                Dance comigo esta noite
                Bm                  G
                Como se não houvesse amanhã
                D                   A
                Dance comigo agora
                G                   D
                Deixe seu corpo falar
                
                [Verso 2]
                D                   A
                Não importa se errar o passo
                Bm                  G
                A perfeição não é necessária
                D                   A
                O que vale é sentir o ritmo
                Bm                  G
                E deixar a alma leve e livre`
            },
            {
                id: 271,
                title: "Mistérios do Tempo",
                artist: "Relógio Cósmico",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/misterios-tempo.pdf",
                thumbnailUrl: "https://picsum.photos/id/409/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em                  C
                O tempo escorre entre os dedos
                G                   D
                Como areia fina da ampulheta
                Em                  C
                Passado, presente e futuro
                G                   D
                Se fundem em dimensões secretas
                
                [Refrão]
                C                   D
                Mistérios do tempo, enigmas
                G                   Em
                Que a ciência tenta decifrar
                C                   D
                Mistérios do tempo, segredos
                Em
                Que o coração consegue entender
                
                [Solo] Em C G D Em C G D
                
                [Ponte]
                Am                  C
                As horas passam depressa
                G                   D
                Quando estamos felizes
                Am                  C
                E se arrastam tão devagar
                G                   D
                Nos momentos de tristeza`
            },
            {
                id: 272,
                title: "Estrela da Manhã",
                artist: "Aurora Boreal",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/estrela-manha.pdf",
                thumbnailUrl: "https://picsum.photos/id/410/300/200",
                cifra: `[Intro] C G Am F G C (2x)
                
                C                   G
                Estrela da manhã que brilha
                Am                  F
                Antes do sol despertar
                G                   C
                Guia dos navegantes perdidos
                G                   C
                Luz que me ajuda a encontrar
                
                [Refrão]
                F                   G
                Minha estrela da manhã
                Em                  Am
                Que ilumina meu caminho
                F                   G
                Minha estrela, minha luz
                C
                Meu norte, meu destino
                
                [Verso 2]
                C                   G
                Quando a noite parece sem fim
                Am                  F
                E a escuridão quer me abraçar
                G                   C
                Procuro seu brilho no céu
                G                   C
                E encontro força pra continuar`
            },
            {
                id: 273,
                title: "Alma Sertaneja",
                artist: "Violeiros do Oeste",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/alma-sertaneja.pdf",
                thumbnailUrl: "https://picsum.photos/id/411/300/200",
                cifra: `[Intro] G D C G (2x)
                
                G                   D
                No coração do Brasil profundo
                C                   G
                Onde a poeira encontra o céu
                G                   D
                Vive um povo simples e forte
                C                   G
                Com alma forjada em fogo e mel
                
                [Refrão]
                C                   D
                Alma sertaneja, genuína
                Em                  C
                Que conhece a dor e a alegria
                G                   D
                Alma sertaneja, verdadeira
                C                   G
                Que não se dobra nem se rende
                
                [Verso 2]
                G                   D
                Na dureza da vida aprendi
                C                   G
                Que a persistência vence o destino
                G                   D
                No calor do sertão entendi
                C                   G
                Que somos todos peregrinos`
            },
            {
                id: 274,
                title: "Batuque de Coco",
                artist: "Coqueiros da Praia",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/batuque-coco.pdf",
                thumbnailUrl: "https://picsum.photos/id/412/300/200",
                cifra: `[Intro] Em D C B7 (2x)
                
                Em                  D
                Na beira da praia o coco cai
                C                   B7
                E o som da quebrada ecoa
                Em                  D
                As mãos batem no compasso
                C                   B7
                E os pés marcam na areia
                
                [Refrão]
                Am                  B7
                Batuque de coco, tradição
                Em                  D
                Que vem dos antigos, dos ancestrais
                C                   B7
                Batuque de coco, cultura
                Em
                Que corre nas veias do povo
                
                [Verso 2]
                Em                  D
                Homens e mulheres em roda
                C                   B7
                Dançando ao som dos tambores
                Em                  D
                Contam histórias de vida
                C                   B7
                Em versos de improviso`
            },
            {
                id: 275,
                title: "Flores no Inverno",
                artist: "Estações Contrárias",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/flores-inverno.pdf",
                thumbnailUrl: "https://picsum.photos/id/413/300/200",
                cifra: `[Intro] C Em Am F G C (2x)
                
                C                   Em
                Mesmo no inverno mais frio
                Am                  F
                Algumas flores conseguem nascer
                G                   C
                Mostrando que a esperança
                G                   C
                É mais forte que qualquer estação
                
                [Refrão]
                F                   G
                Flores no inverno, milagre
                Em                  Am
                Que desafia a natureza
                F                   G
                Flores no inverno, prova
                C
                Que a vida sempre vence
                
                [Verso 2]
                C                   Em
                Sob a neve e o gelo
                Am                  F
                A semente aguarda pacientemente
                G                   C
                Sabendo que seu momento virá
                G                   C
                E sua beleza florescerá`
            },
            {
                id: 276,
                title: "Rock da Estrada",
                artist: "Motores Ligados",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/rock-estrada.pdf",
                thumbnailUrl: "https://picsum.photos/id/414/300/200",
                cifra: `[Intro] E A D A (2x)
                
                E                   A
                Na estrada da vida acelerando
                D                   A
                Com o vento batendo no rosto
                E                   A
                A liberdade tem gosto de poeira
                D                   A
                E o ronco do motor é a trilha sonora
                
                [Refrão]
                D                   A
                É o rock da estrada
                E                   A
                Que corre em minhas veias
                D                   A
                É o rock da estrada
                E                   A
                Que me mantém em movimento
                
                [Solo] E A D A E A D A
                
                [Ponte]
                C#m                 F#m
                Cada curva é um novo desafio
                A                   B
                Cada reta uma oportunidade
                C#m                 F#m
                Não olho pelo retrovisor
                A                   B
                O passado já passou, só sigo em frente`
            },
            {
                id: 277,
                title: "Melodia da Chuva",
                artist: "Gotas Musicais",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/melodia-chuva.pdf",
                thumbnailUrl: "https://picsum.photos/id/415/300/200",
                cifra: `[Intro] Am Em F G (2x)
                
                Am                  Em
                A chuva cai suavemente
                F                   G
                Cada gota uma nota musical
                Am                  Em
                Compondo no telhado
                F                   G
                Uma sinfonia natural
                
                [Refrão]
                C                   G
                Melodia da chuva, serena
                Am                  F
                Que acalma minha ansiedade
                C                   G
                Melodia da chuva, tranquila
                F                   Am
                Que embala meus pensamentos
                
                [Verso 2]
                Am                  Em
                Janela embaçada pelo vapor
                F                   G
                Mundo lá fora em tons de cinza
                Am                  Em
                Dentro, o calor do lar
                F                   G
                E a música que a natureza traz`
            },
            {
                id: 278,
                title: "Céu de Santo Antônio",
                artist: "Festas Juninas",
                genre: "forró",
                difficulty: "iniciante",
                pdfUrl: "cifras/ceu-santo-antonio.pdf",
                thumbnailUrl: "https://picsum.photos/id/416/300/200",
                cifra: `[Intro] D A7 D G A7 D (2x)
                
                D                   A7
                O céu se enche de balões coloridos
                                  D
                É noite de Santo Antônio
                D                   G
                A fogueira ilumina o terreiro
                A7                  D
                E o forró já começou
                
                [Refrão]
                G                   D
                São João, São Pedro e Santo Antônio
                A7                  D
                Abençoem nossa festa
                G                   D
                Com muita alegria e fartura
                A7                  D
                Com amor e harmonia
                
                [Verso 2]
                D                   A7
                Cheiro de milho e quentão
                                  D
                Bandeirinhas coloridas
                D                   G
                Sanfona, zabumba e triângulo
                A7                  D
                Anunciam que é tempo de festejar`
            },
            {
                id: 279,
                title: "Pés no Chão",
                artist: "Raízes Profundas",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/pes-no-chao.pdf",
                thumbnailUrl: "https://picsum.photos/id/417/300/200",
                cifra: `[Intro] C G Am Em F G C (2x)
                
                C                   G
                Com os pés firmes no chão
                Am                  Em
                E os olhos mirando o horizonte
                F                   G
                Sigo meu caminho sem ilusões
                C
                Mas cheio de esperança
                
                [Refrão]
                F                   G
                Pés no chão, coração nas nuvens
                Em                  Am
                Equilíbrio perfeito para viver
                F                   G
                Pés no chão, mente livre
                C
                Para sonhar e realizar
                
                [Ponte]
                Am                  Em
                O vento pode soprar forte
                F                   G
                Tentar me derrubar, me desviar
                Am                  Em
                Mas minhas raízes são profundas
                F                   G
                Sustentam meus sonhos mais altos`
            },
            {
                id: 280,
                title: "Janela para o Mar",
                artist: "Vista Oceânica",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/janela-mar.pdf",
                thumbnailUrl: "https://picsum.photos/id/418/300/200",
                cifra: `[Intro] D Bm G A (2x)
                
                D                   Bm
                Da minha janela vejo o mar
                G                   A
                Imenso, azul, sem fim
                D                   Bm
                Ondas que vêm e que vão
                G                   A
                Como os dias da minha vida
                
                [Refrão]
                G                   A
                Janela para o mar, moldura
                Bm                  G
                Do mais belo quadro vivo
                D                   A
                Janela para o mar, portal
                G                   D
                Que me leva à liberdade
                
                [Verso 2]
                D                   Bm
                Barcos navegando ao longe
                G                   A
                Gaivotas dançando no ar
                D                   Bm
                A brisa salgada que entra
                G                   A
                Trazendo histórias de além-mar`
            },
            {
                id: 281,
                title: "Acorde Maior",
                artist: "Notas Positivas",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/acorde-maior.pdf",
                thumbnailUrl: "https://picsum.photos/id/419/300/200",
                cifra: `[Intro] Cmaj7 Am7 Dm7 G7 (2x)
                
                Cmaj7               Am7
                A música tem o poder de curar
                Dm7                 G7
                De transformar tristeza em alegria
                Cmaj7               Am7
                Um simples acorde maior
                Dm7                 G7
                Pode mudar todo um dia cinzento
                
                [Refrão]
                Fmaj7               G7
                Acorde maior, som do otimismo
                Em7                 Am7
                Que colore o mundo em tons de esperança
                Dm7                 G7
                Acorde maior, luz em melodia
                Cmaj7
                Que espanta as sombras da alma
                
                [Solo] Cmaj7 Am7 Dm7 G7 Cmaj7 Am7 Dm7 G7
                
                [Ponte]
                Em7                 Am7
                Entre bemóis e sustenidos
                Dm7                 G7
                A vida compõe sua sinfonia
                Em7                 Am7
                E mesmo nas dissonâncias
                Dm7                 G7
                Encontramos a harmonia perfeita`
            },
            {
                id: 282,
                title: "Fogueira de São João",
                artist: "Balão Colorido",
                genre: "forró",
                difficulty: "iniciante",
                pdfUrl: "cifras/fogueira-sao-joao.pdf",
                thumbnailUrl: "https://picsum.photos/id/420/300/200",
                cifra: `[Intro] D G A7 D (2x)
                
                D                   G
                A fogueira está acesa
                A7                  D
                Iluminando o arraial
                D                   G
                A sanfona toca alegre
                A7                  D
                Começou o São João
                
                [Refrão]
                G                   A7
                Pula fogueira ioiô
                D                   Bm
                Pula fogueira iaiá
                G                   A7
                São João está chegando
                D
                É hora de festejar
                
                [Verso 2]
                D                   G
                Milho verde, canjica e pamonha
                A7                  D
                Quentão para esquentar
                D                   G
                Bandeirinhas coloridas
                A7                  D
                E muita dança de quadrilha`
            },
            {
                id: 283,
                title: "Coração de Menina",
                artist: "Emoções Juvenis",
                genre: "pop",
                difficulty: "iniciante",
                pdfUrl: "cifras/coracao-menina.pdf",
                thumbnailUrl: "https://picsum.photos/id/421/300/200",
                cifra: `[Intro] C G Am F G C (2x)
                
                C                   G
                No coração de menina
                Am                  F
                Cabem sonhos gigantes
                G                   C
                Esperanças multicoloridas
                G                   C
                E amor sem limites
                
                [Refrão]
                F                   G
                Coração de menina, puro
                Em                  Am
                Que ainda não conhece desilusão
                F                   G
                Coração de menina, doce
                C
                Que ama sem reservas ou condição
                
                [Verso 2]
                C                   G
                Olhos brilhantes que veem
                Am                  F
                Um mundo cheio de possibilidades
                G                   C
                Sorrisos que iluminam o caminho
                G                   C
                E afastam toda escuridão`
            },
            {
                id: 284,
                title: "Fogo da Paixão",
                artist: "Chamas Intensas",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/fogo-paixao.pdf",
                thumbnailUrl: "https://picsum.photos/id/422/300/200",
                cifra: `[Intro] A E F#m D (2x)
                
                A                   E
                Como fogo que não se apaga
                F#m                 D
                Arde em mim essa paixão
                A                   E
                Nem toda água do oceano
                F#m                 D
                Poderia esfriar meu coração
                
                [Refrão]
                D                   E
                É o fogo da paixão
                F#m                 D
                Que me consome noite e dia
                A                   E
                É o fogo da paixão
                D                   A
                Que me mantém vivo e ardente
                
                [Verso 2]
                A                   E
                Seus olhos têm o poder
                F#m                 D
                De incendiar minha alma
                A                   E
                Seu toque é como brasa
                F#m                 D
                Que marca fundo minha pele`
            },
            {
                id: 285,
                title: "Valsa das Flores",
                artist: "Jardim Encantado",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/valsa-flores.pdf",
                thumbnailUrl: "https://picsum.photos/id/423/300/200",
                cifra: `[Intro] Em B7 Em Am B7 Em (2x)
                
                Em                  B7
                No jardim da primavera
                Em
                As flores dançam ao vento
                Am                  Em
                Uma valsa delicada e bela
                B7                  Em
                Que encanta os sentidos
                
                [Refrão]
                G                   D
                Valsa das flores, dança suave
                Am                  Em
                Que celebra o renascer da vida
                C                   B7
                Valsa das flores, movimento
                Em
                Que pinta o mundo de cores
                
                [Bridge]
                C                   G
                Pétalas rodopiando no ar
                Am                  B7
                Como bailarinas em seu palco
                C                   G
                Perfume que embriaga a alma
                Am                  B7
                E traz memórias de felicidade`
            },
            {
                id: 286,
                title: "Fronteiras do Desconhecido",
                artist: "Exploradores Cósmicos",
                genre: "rock",
                difficulty: "intermediario",
                pdfUrl: "cifras/fronteiras-desconhecido.pdf",
                thumbnailUrl: "https://picsum.photos/id/424/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em                  C
                Para além do horizonte visível
                G                   D
                Existe um mundo a explorar
                Em                  C
                Fronteiras que desafiam a mente
                G                   D
                E fazem o espírito voar
                
                [Refrão]
                C                   D
                Nas fronteiras do desconhecido
                G                   Em
                Está a verdadeira aventura
                C                   D
                Nas fronteiras do desconhecido
                Em
                Descobrimos quem realmente somos
                
                [Solo] Em C G D Em C G D
                
                [Ponte]
                Am                  C
                O medo tenta nos paralisar
                G                   D
                Diante do que é novo e diferente
                Am                  C
                Mas a curiosidade é mais forte
                G                   D
                E nos empurra sempre adiante`
            },
            {
                id: 287,
                title: "Sorriso de Criança",
                artist: "Alegria Infantil",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/sorriso-crianca.pdf",
                thumbnailUrl: "https://picsum.photos/id/425/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Não há nada mais sincero
                Em                  C
                Que o sorriso de uma criança
                G                   D
                Puro como água cristalina
                Em                  C
                Brilhante como sol da manhã
                
                [Refrão]
                C                   D
                Sorriso de criança, luz
                Em                  C
                Que ilumina o mundo inteiro
                G                   D
                Sorriso de criança, força
                Em                  C
                Que renova nossa esperança
                
                [Verso 2]
                G                   D
                Na simplicidade do brincar
                Em                  C
                Na alegria sem compromisso
                G                   D
                No olhar cheio de surpresas
                Em                  C
                Vemos a essência da felicidade`
            },
            {
                id: 288,
                title: "Café com Viola",
                artist: "Manhãs Sertanejas",
                genre: "sertanejo",
                difficulty: "iniciante",
                pdfUrl: "cifras/cafe-viola.pdf",
                thumbnailUrl: "https://picsum.photos/id/426/300/200",
                cifra: `[Intro] G D C G (2x)
                
                G                   D
                Manhãzinha na fazenda
                C                   G
                O galo canta no terreiro
                G                   D
                Café fresquinho na mesa
                C                   G
                E a viola no canto da sala
                
                [Refrão]
                C                   D
                Café com viola, simplicidade
                Em                  C
                Que faz a vida valer a pena
                G                   D
                Café com viola, tradição
                C                   G
                Que passa de pai para filho
                
                [Verso 2]
                G                   D
                Da janela vejo o campo verde
                C                   G
                O gado pastando tranquilo
                G                   D
                A vida segue seu ritmo
                C                   G
                Sem pressa, sem agonia`
            },
            {
                id: 289,
                title: "Dança das Águas",
                artist: "Rio Cristalino",
                genre: "folk",
                difficulty: "intermediario",
                pdfUrl: "cifras/danca-aguas.pdf",
                thumbnailUrl: "https://picsum.photos/id/427/300/200",
                cifra: `[Intro] Am F C G (2x)
                
                Am                  F
                Entre pedras o rio desce
                C                   G
                Dançando em curvas sinuosas
                Am                  F
                Águas claras que refletem o céu
                C                   G
                E contam segredos ancestrais
                
                [Refrão]
                F                   G
                Na dança das águas, movimento
                Em                  Am
                Que nunca cessa ou se repete
                F                   G
                Na dança das águas, lições
                Am
                De persistência e adaptação
                
                [Ponte]
                Dm                  Am
                Ora calma como um lago
                F                   G
                Ora forte como uma cachoeira
                Dm                  Am
                A água segue seu caminho
                F                   E7
                Contornando obstáculos sem parar`
            },
            {
                id: 290,
                title: "Voo do Beija-flor",
                artist: "Asas Coloridas",
                genre: "mpb",
                difficulty: "avancado",
                pdfUrl: "cifras/voo-beija-flor.pdf",
                thumbnailUrl: "https://picsum.photos/id/428/300/200",
                cifra: `[Intro] C Am7 F G7 (2x)
                
                C                   Am7
                Rápido como um pensamento
                F                   G7
                Colorido como um arco-íris
                C                   Am7
                O beija-flor visita as flores
                F                   G7
                Em seu balé aéreo preciso
                
                [Refrão]
                Fmaj7               G7
                Voo do beija-flor, mágico
                Em7                 Am7
                Que desafia nossa compreensão
                Fmaj7               G7
                Voo do beija-flor, símbolo
                Cmaj7
                Da beleza em movimento
                
                [Solo] Cmaj7 Am7 Fmaj7 G7 Cmaj7 Am7 Fmaj7 G7
                
                [Ponte]
                Em7                 Am7
                Suas asas batem tão rápido
                Fmaj7               G7
                Que nossos olhos mal conseguem ver
                Em7                 Am7
                Pairando no ar como por magia
                Fmaj7               G7
                Uma joia viva da natureza`
            },
            {
                id: 291,
                title: "Sabor do Brasil",
                artist: "Temperos Nacionais",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/sabor-brasil.pdf",
                thumbnailUrl: "https://picsum.photos/id/429/300/200",
                cifra: `[Intro] D A7 D G A7 D (2x)
                
                D                   A7
                Tempero, suor e paixão
                                  D
                No caldeirão da cultura
                D                   G
                Mistura que dá esse sabor
                A7                  D
                Que só o Brasil tem
                
                [Refrão]
                G                   A7
                É o sabor do Brasil
                D                   Bm
                Que tempera nossa alma
                G                   A7
                É o sabor do Brasil
                D
                Que o mundo inteiro prova
                
                [Verso 2]
                D                   A7
                Da feijoada à moqueca
                                  D
                Do acarajé ao pato no tucupi
                D                   G
                Cada região, cada prato
                A7                  D
                Conta uma história de nós`
            },
            {
                id: 292,
                title: "Soul da Periferia",
                artist: "Vozes do Gueto",
                genre: "r&b",
                difficulty: "intermediario",
                pdfUrl: "cifras/soul-periferia.pdf",
                thumbnailUrl: "https://picsum.photos/id/430/300/200",
                cifra: `[Intro] Dm Bb F C (2x)
                
                Dm                  Bb
                Da lama nascem flores fortes
                F                   C
                Das dificuldades surge a arte
                Dm                  Bb
                No ritmo da vida na quebrada
                F                   C
                Encontramos nossa identidade
                
                [Refrão]
                Bb                  C
                É o soul da periferia
                Dm                  Bb
                Batida que vem do coração
                F                   C
                É o soul da periferia
                Bb                  F
                Mensagem de transformação
                
                [Ponte]
                Gm                  Dm
                Entre becos e vielas
                Bb                  C
                A música flui como rio
                Gm                  Dm
                Palavras que são balas de luz
                Bb                  C
                Contra a escuridão do preconceito`
            },
            {
                id: 293,
                title: "Ciranda da Lua",
                artist: "Rodas do Luar",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/ciranda-lua.pdf",
                thumbnailUrl: "https://picsum.photos/id/431/300/200",
                cifra: `[Intro] Em Bm C Am B7 (2x)
                
                Em                  Bm
                A lua dança no céu estrelado
                C                   Am
                Girando em volta da Terra
                Em                  Bm
                Como crianças de mãos dadas
                C                   B7
                Na roda de uma ciranda
                
                [Refrão]
                Am                  Bm
                Ciranda da lua, mistério
                Em                  C
                Que ilumina nossas noites
                Am                  Bm
                Ciranda da lua, magia
                Em
                Que nos faz sonhar acordados
                
                [Verso 2]
                Em                  Bm
                Ora cheia, ora minguante
                C                   Am
                Ora crescente, ora nova
                Em                  Bm
                Sempre mudando de forma
                C                   B7
                Mas nunca deixando de brilhar`
            },
            {
                id: 294,
                title: "Trovão nas Montanhas",
                artist: "Tempestade Serrana",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/trovao-montanhas.pdf",
                thumbnailUrl: "https://picsum.photos/id/432/300/200",
                cifra: `[Intro] Em G D A (2x)
                
                Em                  G
                Nuvens escuras se formam
                D                   A
                Sobre os picos das serras
                Em                  G
                O ar pesa com a eletricidade
                D                   A
                E o silêncio é quase absoluto
                
                [Refrão]
                G                   A
                Trovão nas montanhas, poder
                Bm                  G
                Que ecoa pelos vales profundos
                D                   A
                Trovão nas montanhas, força
                G                   Em
                Que faz a terra tremer
                
                [Solo] Em G D A Em G D A
                
                [Ponte]
                C                   G
                A tempestade é implacável
                D                   A
                Mas também é passageira
                C                   G
                Depois da fúria vem a calma
                D                   A
                E o céu se abre novamente`
            },
            {
                id: 295,
                title: "Raízes Brasileiras",
                artist: "Identidade Nacional",
                genre: "mpb",
                difficulty: "intermediario",
                pdfUrl: "cifras/raizes-brasileiras.pdf",
                thumbnailUrl: "https://picsum.photos/id/433/300/200",
                cifra: `[Intro] D A7 Bm G (2x)
                
                D                   A7
                Somos feitos de tantas misturas
                Bm                  G
                Cores, credos, culturas e sons
                D                   A7
                África, Europa, América, Ásia
                Bm                  G
                Nas veias do nosso coração
                
                [Refrão]
                G                   A7
                Raízes brasileiras, profundas
                Bm                  G
                Que sustentam nossa identidade
                D                   A7
                Raízes brasileiras, diversas
                G                   D
                Que fazem nossa força e unidade
                
                [Verso 2]
                D                   A7
                Do samba ao forró, do frevo ao rock
                Bm                  G
                Da capoeira ao maracatu
                D                   A7
                Expressões de um povo que sabe
                Bm                  G
                Transformar dor em alegria`
            },
            {
                id: 296,
                title: "Luz do Sol Nascente",
                artist: "Aurora Dourada",
                genre: "folk",
                difficulty: "iniciante",
                pdfUrl: "cifras/luz-sol-nascente.pdf",
                thumbnailUrl: "https://picsum.photos/id/434/300/200",
                cifra: `[Intro] C G Am F G C (2x)
                
                C                   G
                O sol desponta no horizonte
                Am                  F
                Pintando o céu de dourado
                G                   C
                Anunciando um novo dia
                G                   C
                E renovando a esperança
                
                [Refrão]
                F                   G
                Luz do sol nascente, brilho
                Em                  Am
                Que afasta toda escuridão
                F                   G
                Luz do sol nascente, força
                C
                Que renova minha fé
                
                [Verso 2]
                C                   G
                Raios que atravessam as nuvens
                Am                  F
                Despertando a vida ao redor
                G                   C
                A natureza celebra em cores
                G                   C
                O milagre diário da renovação`
            },
            {
                id: 297,
                title: "Meu Lugar no Mundo",
                artist: "Pertencimento",
                genre: "pop",
                difficulty: "intermediario",
                pdfUrl: "cifras/meu-lugar-mundo.pdf",
                thumbnailUrl: "https://picsum.photos/id/435/300/200",
                cifra: `[Intro] D A Bm G (2x)
                
                D                   A
                Procurei por tanto tempo
                Bm                  G
                Um lugar para chamar de meu
                D                   A
                Um cantinho nesse mundo vasto
                Bm                  G
                Onde eu pudesse ser eu mesmo
                
                [Refrão]
                G                   A
                Meu lugar no mundo, encontro
                Bm                  G
                Onde meu coração se acalma
                D                   A
                Meu lugar no mundo, refúgio
                G                   D
                Onde posso ser autêntico
                
                [Verso 2]
                D                   A
                Não é um ponto no mapa
                Bm                  G
                Nem uma casa ou endereço
                D                   A
                É onde encontro aconchego
                Bm                  G
                Nos braços dos que amo`
            },
            {
                id: 298,
                title: "Batuque de Angola",
                artist: "Tambores Ancestrais",
                genre: "world",
                difficulty: "avancado",
                pdfUrl: "cifras/batuque-angola.pdf",
                thumbnailUrl: "https://picsum.photos/id/436/300/200",
                cifra: `[Intro] Dm A7 Dm Gm A7 Dm (2x)
                
                Dm                  A7
                Do outro lado do oceano
                                  Dm
                Vieram ritmos ancestrais
                Dm                  Gm
                Tambores que falam aos deuses
                A7                  Dm
                E contam histórias de luta
                
                [Refrão]
                F                   C
                É o batuque de Angola
                A7                  Dm
                Herança de nossos ancestrais
                Gm                  Dm
                É o batuque de Angola
                A7                  Dm
                Que mantém viva a tradição
                
                [Solo] Dm A7 Dm Gm A7 Dm F C A7 Dm Gm A7 Dm
                
                [Ponte]
                Bb                  F
                Cada batida é uma palavra
                A7                  Dm
                Cada ritmo uma oração
                Bb                  F
                Conexão com nossas raízes
                A7                  Dm
                Que o tempo não conseguiu apagar`
            },
            {
                id: 299,
                title: "Brisa da Serra",
                artist: "Ventos da Montanha",
                genre: "mpb",
                difficulty: "iniciante",
                pdfUrl: "cifras/brisa-serra.pdf",
                thumbnailUrl: "https://picsum.photos/id/437/300/200",
                cifra: `[Intro] G D Em C (2x)
                
                G                   D
                Brisa suave que desce a serra
                Em                  C
                Trazendo o perfume das flores
                G                   D
                Acariciando rostos cansados
                Em                  C
                Sussurrando canções de conforto
                
                [Refrão]
                C                   D
                Brisa da serra, alívio
                Em                  C
                Nos dias quentes de verão
                G                   D
                Brisa da serra, carinho
                Em                  C
                Que toca a alma de mansinho
                
                [Verso 2]
                G                   D
                Entre os pinheiros ela passa
                Em                  C
                Fazendo dançar as folhagens
                G                   D
                Levando sementes e sonhos
                Em                  C
                Para germinar em novos lugares`
            },
            {
                id: 300,
                title: "Chama da Paixão",
                artist: "Coração em Fogo",
                genre: "sertanejo",
                difficulty: "intermediario",
                pdfUrl: "cifras/chama-paixao.pdf",
                thumbnailUrl: "https://picsum.photos/id/438/300/200",
                cifra: `[Intro] A E F#m D (2x)
                
                A                   E
                Quando seus olhos encontram os meus
                F#m                 D
                Sinto uma chama acender
                A                   E
                Um fogo que queima por dentro
                F#m                 D
                E não consigo conter
                
                [Refrão]
                D                   E
                É a chama da paixão
                F#m                 D
                Que arde sem parar
                A                   E
                É a chama da paixão
                D                   A
                Que só você faz despertar
                
                [Verso 2]
                A                   E
                Teu beijo é como gasolina
                F#m                 D
                Que faz o fogo aumentar
                A                   E
                Teu toque é faísca certeira
                F#m                 D
                Que não me deixa esfriar`
            },
            {
                id: 301,
                title: "Sonhos de Liberdade",
                artist: "Asas ao Vento",
                genre: "rock",
                difficulty: "avancado",
                pdfUrl: "cifras/sonhos-liberdade.pdf",
                thumbnailUrl: "https://picsum.photos/id/439/300/200",
                cifra: `[Intro] Em C G D (2x)
                
                Em                  C
                Preso entre paredes invisíveis
                G                   D
                Construídas por medos e convenções
                Em                  C
                Sonho com espaços sem limites
                G                   D
                Onde posso simplesmente ser
                
                [Refrão]
                C                   D
                Sonhos de liberdade, anseios
                G                   Em
                Que habitam minha alma inquieta
                C                   D
                Sonhos de liberdade, asas
                Em
                Que um dia vou poder abrir
                
                [Solo] Em C G D Em C G D
                
                [Ponte]
                Am                  C
                As correntes que me prendem
                G                   D
                Não são de ferro, são de ideias
                Am                  C
                A prisão que me limita
                G                   D
                Está dentro da minha mente`
            }            
                        ,{
                            id: 302,
                            title: "Luar do Sertão",
                            artist: "Prata da Casa",
                            genre: "sertanejo",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/luar-sertao.pdf",
                            thumbnailUrl: "https://picsum.photos/id/440/300/200",
                            cifra: `[Intro] G D C G (2x)
                            
                            G                   D
                            Não há, ó gente, ó não
                            C                   G
                            Luar como esse do sertão
                            G                   D
                            Não há, ó gente, ó não
                            C                   G
                            Luar como esse do sertão
                            
                            [Verso 1]
                            G                   D
                            Oh! que saudades do luar da minha terra
                            C                   G
                            Lá na serra branquejando folhas secas pelo chão
                            G                   D
                            Este luar cá da cidade tão escuro
                            C                   G
                            Não tem aquela saudade do luar lá do sertão`
                        },
                        {
                            id: 303,
                            title: "Vento no Litoral",
                            artist: "Ondas do Mar",
                            genre: "mpb",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/vento-litoral.pdf",
                            thumbnailUrl: "https://picsum.photos/id/441/300/200",
                            cifra: `[Intro] D A Bm G A (2x)
                            
                            D               A
                            De tarde quero descansar
                            Bm              G
                            Chegar até a praia e ver
                            D               A
                            Se o vento ainda está forte
                            Bm              G           A
                            E vai ser bom subir nas pedras
                            
                            [Refrão]
                            D               A
                            Sei que faço isso pra esquecer
                            Bm              G
                            Eu deixo a onda me acertar
                            D               A
                            E o vento vai levando tudo embora
                            Bm              G           A
                            E o sal na minha pele me faz lembrar`
                        },
                        {
                            id: 304,
                            title: "Pássaros",
                            artist: "Céu Azul",
                            genre: "folk",
                            difficulty: "avancado",
                            pdfUrl: "cifras/passaros.pdf",
                            thumbnailUrl: "https://picsum.photos/id/442/300/200",
                            cifra: `[Intro] Em C G D (2x)
                            
                            Em              C
                            Pássaros migram no inverno
                            G               D
                            Buscando calor e abrigo
                            Em              C
                            Como pensamentos inquietos
                            G               D
                            Que não param num só lugar
                            
                            [Refrão]
                            C               D
                            Voar para além das nuvens
                            Em              C
                            Sentir o vento nas asas
                            G               D
                            Voar para além do horizonte
                            Em
                            Encontrar a liberdade`
                        },
                        {
                            id: 305,
                            title: "Coração de Estudante",
                            artist: "Alma Jovem",
                            genre: "mpb",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/coracao-estudante.pdf",
                            thumbnailUrl: "https://picsum.photos/id/443/300/200",
                            cifra: `[Intro] D A Bm G (2x)
                            
                            D               A
                            Quero falar de uma coisa
                            Bm              G
                            Adivinha onde ela fica
                            D               A
                            Dentro do peito do homem
                            Bm              G
                            Guardada em forma de amor
                            
                            [Refrão]
                            G               A
                            Coração de estudante
                            Bm              G
                            Há que se cuidar da vida
                            D               A
                            Há que se cuidar do mundo
                            G               D
                            Tomar conta da amizade`
                        },
                        {
                            id: 306,
                            title: "Flores do Campo",
                            artist: "Jardim Selvagem",
                            genre: "mpb",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/flores-campo.pdf",
                            thumbnailUrl: "https://picsum.photos/id/444/300/200",
                            cifra: `[Intro] Am F C G (2x)
                            
                            Am              F
                            Todas as flores do campo têm
                            C               G
                            Um lugar no tempo e no vento
                            Am              F
                            E quando menos se espera encontram
                            C               G
                            Um coração que as mereça
                            
                            [Refrão]
                            F               G
                            As flores do campo, selvagens
                            Am              F
                            Que nunca ninguém cultivou
                            C               G
                            As flores do campo, sinceras
                            Am
                            Que só a natureza criou`
                        },
                        {
                            id: 307,
                            title: "Canção do Entardecer",
                            artist: "Sol Poente",
                            genre: "folk",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/cancao-entardecer.pdf",
                            thumbnailUrl: "https://picsum.photos/id/445/300/200",
                            cifra: `[Intro] G D Em C (2x)
                            
                            G               D
                            Quando o sol se deita no horizonte
                            Em              C
                            E pinta o céu de vermelho
                            G               D
                            Meu coração se aquieta
                            Em              C
                            Preparando-se para a noite
                            
                            [Refrão]
                            C               D
                            É a canção do entardecer
                            Em              C
                            Que me embala docemente
                            G               D
                            É a canção do entardecer
                            Em              C
                            Que me traz serenidade`
                        },
                        {
                            id: 308,
                            title: "Maré Alta",
                            artist: "Pescadores da Praia",
                            genre: "mpb",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/mare-alta.pdf",
                            thumbnailUrl: "https://picsum.photos/id/446/300/200",
                            cifra: `[Intro] Em D C B7 (2x)
                            
                            Em              D
                            O mar se agita e cresce
                            C               B7
                            A maré sobe sem parar
                            Em              D
                            Barcos dançam nas ondas
                            C               B7
                            Como folhas ao vento
                            
                            [Refrão]
                            Am              B7
                            Maré alta, força da natureza
                            Em              D
                            Que não podemos controlar
                            C               B7
                            Maré alta, ciclo eterno
                            Em
                            Que vem e vai sem avisar`
                        },
                        {
                            id: 309,
                            title: "Estação das Flores",
                            artist: "Primavera Eterna",
                            genre: "pop",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/estacao-flores.pdf",
                            thumbnailUrl: "https://picsum.photos/id/447/300/200",
                            cifra: `[Intro] C G Am F G C (2x)
                            
                            C               G
                            Na estação das flores
                            Am              F
                            Tudo renasce com vigor
                            G               C
                            Cores vibrantes e perfumes
                            G               C
                            Enchem o ar com seu esplendor
                            
                            [Refrão]
                            F               G
                            É tempo de renovação
                            Em              Am
                            De deixar o velho partir
                            F               G
                            É tempo de celebrar a vida
                            C
                            E novos caminhos descobrir`
                        },
                        {
                            id: 310,
                            title: "Chuva de Verão",
                            artist: "Tempestade Tropical",
                            genre: "mpb",
                            difficulty: "avancado",
                            pdfUrl: "cifras/chuva-verao.pdf",
                            thumbnailUrl: "https://picsum.photos/id/448/300/200",
                            cifra: `[Intro] Dm Am Bb A7 (2x)
                            
                            Dm              Am
                            A chuva cai forte no verão
                            Bb              A7
                            Refrescando o calor do dia
                            Dm              Am
                            Traz alívio e renovação
                            Bb              A7
                            Para a terra que ardia
                            
                            [Refrão]
                            F               C
                            Chuva de verão, bênção
                            Bb              A7
                            Que molha o chão ressequido
                            Dm              Am
                            Chuva de verão, presente
                            Bb              A7
                            Que a natureza nos dá`
                        },
                        {
                            id: 311,
                            title: "Caminho das Pedras",
                            artist: "Trilhas Antigas",
                            genre: "rock",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/caminho-pedras.pdf",
                            thumbnailUrl: "https://picsum.photos/id/449/300/200",
                            cifra: `[Intro] E A D A (2x)
                            
                            E               A
                            No caminho das pedras
                            D               A
                            Aprendi a andar com cuidado
                            E               A
                            Cada passo é uma decisão
                            D               A
                            Que define aonde vou chegar
                            
                            [Refrão]
                            D               A
                            É o caminho das pedras
                            E               A
                            Que me ensinou a persistir
                            D               A
                            É o caminho das pedras
                            E               A
                            Que me mostrou como seguir`
                        },
                        {
                            id: 312,
                            title: "Vento Norte",
                            artist: "Brisas Frias",
                            genre: "folk",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/vento-norte.pdf",
                            thumbnailUrl: "https://picsum.photos/id/450/300/200",
                            cifra: `[Intro] Am Em F G (2x)
                            
                            Am              Em
                            O vento norte traz o frio
                            F               G
                            Que arrepia até os ossos
                            Am              Em
                            Traz histórias de outros mundos
                            F               G
                            E segredos bem guardados
                            
                            [Refrão]
                            C               G
                            Vento norte, mensageiro
                            Am              F
                            De tempos que estão por vir
                            C               G
                            Vento norte, companheiro
                            F               Am
                            Que ajuda a refletir`
                        },
                        {
                            id: 313,
                            title: "Dança dos Pássaros",
                            artist: "Asas Coloridas",
                            genre: "mpb",
                            difficulty: "avancado",
                            pdfUrl: "cifras/danca-passaros.pdf",
                            thumbnailUrl: "https://picsum.photos/id/451/300/200",
                            cifra: `[Intro] D Bm G A (2x)
                            
                            D               Bm
                            No balé aéreo da natureza
                            G               A
                            Pássaros dançam sua melodia
                            D               Bm
                            Cores vibrantes cortam o céu
                            G               A
                            Em movimentos de pura harmonia
                            
                            [Refrão]
                            G               A
                            É a dança dos pássaros
                            Bm              G
                            Coreografia divina
                            D               A
                            É a dança dos pássaros
                            G               D
                            Que celebra a vida`
                        },
                        {
                            id: 314,
                            title: "Velhas Histórias",
                            artist: "Memórias Antigas",
                            genre: "mpb",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/velhas-historias.pdf",
                            thumbnailUrl: "https://picsum.photos/id/452/300/200",
                            cifra: `[Intro] C Am F G (2x)
                            
                            C               Am
                            Nas páginas amareladas do tempo
                            F               G
                            Encontro histórias já esquecidas
                            C               Am
                            Personagens que já se foram
                            F               G
                            Mas suas lições permanecem
                            
                            [Refrão]
                            F               G
                            Velhas histórias, sabedoria
                            Em              Am
                            Que atravessam gerações
                            F               G
                            Velhas histórias, memórias
                            C
                            Que não deixamos morrer`
                        },
                        {
                            id: 315,
                            title: "Céu Estrelado",
                            artist: "Constelação",
                            genre: "folk",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/ceu-estrelado.pdf",
                            thumbnailUrl: "https://picsum.photos/id/453/300/200",
                            cifra: `[Intro] G D Em C (2x)
                            
                            G               D
                            Sob o manto da noite escura
                            Em              C
                            Milhões de estrelas brilham
                            G               D
                            Contam histórias silenciosas
                            Em              C
                            Para quem sabe observar
                            
                            [Refrão]
                            C               D
                            Céu estrelado, infinito
                            Em              C
                            Que desperta a imaginação
                            G               D
                            Céu estrelado, mistério
                            Em              C
                            Que inspira contemplação`
                        },
                        {
                            id: 316,
                            title: "Chama Interior",
                            artist: "Fogo Sagrado",
                            genre: "rock",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/chama-interior.pdf",
                            thumbnailUrl: "https://picsum.photos/id/454/300/200",
                            cifra: `[Intro] Em C G D (2x)
                            
                            Em              C
                            Dentro de cada um de nós
                            G               D
                            Arde uma chama que não se apaga
                            Em              C
                            Mesmo nas noites mais escuras
                            G               D
                            Ela persiste e nos guia
                            
                            [Refrão]
                            C               D
                            É a chama interior, força
                            G               Em
                            Que nos mantém vivos e lutando
                            C               D
                            É a chama interior, luz
                            Em
                            Que nunca deixamos se apagar`
                        },
                        {
                            id: 317,
                            title: "Madrugada Serena",
                            artist: "Silêncio Noturno",
                            genre: "mpb",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/madrugada-serena.pdf",
                            thumbnailUrl: "https://picsum.photos/id/455/300/200",
                            cifra: `[Intro] D A Bm G (2x)
                            
                            D               A
                            Na madrugada serena
                            Bm              G
                            Quando tudo está em paz
                            D               A
                            Os pensamentos mais profundos
                            Bm              G
                            Vêm à tona sem disfarce
                            
                            [Refrão]
                            G               A
                            Madrugada serena, silêncio
                            Bm              G
                            Que permite escutar o coração
                            D               A
                            Madrugada serena, momento
                            G               D
                            De encontro com a própria alma`
                        },
                        {
                            id: 318,
                            title: "Menina da Janela",
                            artist: "Olhares Distantes",
                            genre: "pop",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/menina-janela.pdf",
                            thumbnailUrl: "https://picsum.photos/id/456/300/200",
                            cifra: `[Intro] F C Dm Am Bb C F (2x)
                            
                            F               C
                            Toda tarde ela está lá
                            Dm              Am
                            Olhando o mundo pela janela
                            Bb              C
                            Sonhando com o que existe além
                            F
                            Das paredes que a cercam
                            
                            [Refrão]
                            Bb              C
                            Menina da janela, sonhadora
                            Dm              Bb
                            Que viaja sem sair do lugar
                            F               C
                            Menina da janela, esperança
                            Bb              F
                            Um dia você vai voar`
                        },
                        {
                            id: 319,
                            title: "Sertão Veredas",
                            artist: "Riachos do Cerrado",
                            genre: "sertanejo",
                            difficulty: "avancado",
                            pdfUrl: "cifras/sertao-veredas.pdf",
                            thumbnailUrl: "https://picsum.photos/id/457/300/200",
                            cifra: `[Intro] G D Em C D G (2x)
                            
                            G               D
                            No meio do sertão bruto
                            Em              C
                            Pequenos oásis de vida
                            D               G
                            Veredas de águas cristalinas
                            D               G
                            Onde a esperança persiste
                            
                            [Refrão]
                            C               D
                            Sertão veredas, contraste
                            Em              C
                            Entre a seca e a abundância
                            G               D
                            Sertão veredas, lições
                            C               G
                            Que a natureza nos ensina`
                        },
                        {
                            id: 320,
                            title: "Balada da Montanha",
                            artist: "Pico Nevado",
                            genre: "folk",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/balada-montanha.pdf",
                            thumbnailUrl: "https://picsum.photos/id/458/300/200",
                            cifra: `[Intro] Am Em F G (2x)
                            
                            Am              Em
                            No topo da grande montanha
                            F               G
                            O silêncio é um mestre sábio
                            Am              Em
                            O ar rarefeito nos lembra
                            F               G
                            Da fragilidade da vida
                            
                            [Refrão]
                            C               G
                            Balada da montanha, elevação
                            Am              F
                            Que nos aproxima do céu
                            C               G
                            Balada da montanha, jornada
                            F               Am
                            Que nos ensina sobre persistência`
                        },
                        {
                            id: 321,
                            title: "Sonho de Papel",
                            artist: "Aviões do Céu",
                            genre: "pop",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/sonho-papel.pdf",
                            thumbnailUrl: "https://picsum.photos/id/459/300/200",
                            cifra: `[Intro] G D Em C (2x)
                            
                            G               D
                            Um avião de papel lançado
                            Em              C
                            Da janela de um apartamento
                            G               D
                            Carrega sonhos e esperanças
                            Em              C
                            Nas suas asas frágeis
                            
                            [Refrão]
                            C               D
                            Sonho de papel, tão leve
                            Em              C
                            Que o vento pode carregar
                            G               D
                            Sonho de papel, tão livre
                            Em              C
                            Que ninguém pode segurar`
                        },
                        {
                            id: 322,
                            title: "Flores da Resistência",
                            artist: "Jardim de Concreto",
                            genre: "mpb",
                            difficulty: "avancado",
                            pdfUrl: "cifras/flores-resistencia.pdf",
                            thumbnailUrl: "https://picsum.photos/id/460/300/200",
                            cifra: `[Intro] Em C G D (2x)
                            
                            Em              C
                            Entre rachaduras no asfalto
                            G               D
                            Pequenas flores teimam em nascer
                            Em              C
                            Mostrando que a vida encontra
                            G               D
                            Caminhos onde parece impossível
                            
                            [Refrão]
                            C               D
                            Flores da resistência, milagre
                            G               Em
                            Que desafia o concreto e o aço
                            C               D
                            Flores da resistência, símbolo
                            Em
                            De que nunca devemos desistir`
                        },
                        {
                            id: 323,
                            title: "Canto da Sereia",
                            artist: "Mistérios do Mar",
                            genre: "folk",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/canto-sereia.pdf",
                            thumbnailUrl: "https://picsum.photos/id/461/300/200",
                            cifra: `[Intro] Am Em F G (2x)
                            
                            Am              Em
                            Nas profundezas do oceano
                            F               G
                            Um canto misterioso ecoa
                            Am              Em
                            Seduzindo marinheiros desavisados
                            F               G
                            Para um destino incerto
                            
                            [Refrão]
                            F               G
                            É o canto da sereia, fascinante
                            Am              F
                            Que embriaga os sentidos
                            C               G
                            É o canto da sereia, misterioso
                            F               Am
                            Que atrai irresistivelmente`
                        },
                        {
                            id: 324,
                            title: "Folhas de Outono",
                            artist: "Estações do Ano",
                            genre: "mpb",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/folhas-outono.pdf",
                            thumbnailUrl: "https://picsum.photos/id/462/300/200",
                            cifra: `[Intro] D A Bm G (2x)
                            
                            D               A
                            Folhas amareladas caem
                            Bm              G
                            Formando tapetes no chão
                            D               A
                            Anunciam a mudança de ciclo
                            Bm              G
                            E a chegada dos dias frios
                            
                            [Refrão]
                            G               A
                            Folhas de outono, dança
                            Bm              G
                            Que o vento orquestra com maestria
                            D               A
                            Folhas de outono, metáfora
                            G               D
                            Das transformações da vida`
                        },
                        {
                            id: 325,
                            title: "Canção da Terra",
                            artist: "Raízes Profundas",
                            genre: "folk",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/cancao-terra.pdf",
                            thumbnailUrl: "https://picsum.photos/id/463/300/200",
                            cifra: `[Intro] Em Am D G (2x)
                            
                            Em              Am
                            A terra canta em silêncio
                            D               G
                            Uma canção que poucos ouvem
                            Em              Am
                            Nas raízes das árvores antigas
                            D               B7
                            Nos ventos das montanhas
                            
                            [Refrão]
                            C               D
                            É a canção da terra, origem
                            Em              C
                            De onde todos nós viemos
                            G               D
                            É a canção da terra, lembrança
                            Em              Am
                            Do que nunca devemos esquecer`
                        },
                        {
                            id: 326,
                            title: "Beijo de Luz",
                            artist: "Raios Solares",
                            genre: "pop",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/beijo-luz.pdf",
                            thumbnailUrl: "https://picsum.photos/id/464/300/200",
                            cifra: `[Intro] C G Am F G C (2x)
                            
                            C               G
                            Os primeiros raios da manhã
                            Am              F
                            Beijam suavemente a terra
                            G               C
                            Despertando cores e vida
                            G               C
                            Com seu toque dourado
                            
                            [Refrão]
                            F               G
                            Beijo de luz, carinho
                            Em              Am
                            Que aquece e revigora
                            F               G
                            Beijo de luz, promessa
                            C
                            De um novo dia que começa`
                        },
                        {
                            id: 327,
                            title: "Caminho das Águas",
                            artist: "Rio Corrente",
                            genre: "mpb",
                            difficulty: "avancado",
                            pdfUrl: "cifras/caminho-aguas.pdf",
                            thumbnailUrl: "https://picsum.photos/id/465/300/200",
                            cifra: `[Intro] Am F C G (2x)
                            
                            Am              F
                            Da nascente à foz, a água
                            C               G
                            Traça seu caminho sinuoso
                            Am              F
                            Contornando obstáculos
                            C               G
                            Persistente em sua jornada
                            
                            [Refrão]
                            F               G
                            O caminho das águas, fluxo
                            Em              Am
                            Que nunca se detém por muito tempo
                            F               G
                            O caminho das águas, lição
                            Am
                            Sobre adaptação e persistência`
                        },
                        {
                            id: 328,
                            title: "Olhos do Céu",
                            artist: "Estrelas Brilhantes",
                            genre: "folk",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/olhos-ceu.pdf",
                            thumbnailUrl: "https://picsum.photos/id/466/300/200",
                            cifra: `[Intro] D A Bm G (2x)
                            
                            D               A
                            As estrelas são olhos do céu
                            Bm              G
                            Observando tudo em silêncio
                            D               A
                            Testemunhas dos segredos
                            Bm              G
                            Que contamos na escuridão
                            
                            [Refrão]
                            G               A
                            Olhos do céu, misteriosos
                            Bm              G
                            Que guardam histórias antigas
                            D               A
                            Olhos do céu, eternos
                            G               D
                            Que nunca deixam de brilhar`
                        },
                        {
                            id: 329,
                            title: "Tempestade de Areia",
                            artist: "Deserto Místico",
                            genre: "rock",
                            difficulty: "avancado",
                            pdfUrl: "cifras/tempestade-areia.pdf",
                            thumbnailUrl: "https://picsum.photos/id/467/300/200",
                            cifra: `[Intro] Em C G D (2x)
                            
                            Em              C
                            Grãos de areia dançam no ar
                            G               D
                            Formando cortinas espessas
                            Em              C
                            Apagando pegadas e memórias
                            G               D
                            Transformando a paisagem
                            
                            [Refrão]
                            C               D
                            Tempestade de areia, força
                            G               Em
                            Que nos mostra nossa pequenez
                            C               D
                            Tempestade de areia, poder
                            Em
                            Que nos ensina respeito`
                        },
                        {
                            id: 330,
                            title: "Carrossel de Memórias",
                            artist: "Tempo Passado",
                            genre: "mpb",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/carrossel-memorias.pdf",
                            thumbnailUrl: "https://picsum.photos/id/468/300/200",
                            cifra: `[Intro] F C Dm Am Bb C F (2x)
                            
                            F               C
                            Girando em círculos eternos
                            Dm              Am
                            As lembranças vêm e vão
                            Bb              C
                            Como um carrossel colorido
                            F
                            De momentos que não voltarão
                            
                            [Refrão]
                            Bb              C
                            Carrossel de memórias, gira
                            Dm              Bb
                            Trazendo alegrias e tristezas
                            F               C
                            Carrossel de memórias, vida
                            Bb              F
                            Em seus altos e baixos`
                        },
                        {
                            id: 331,
                            title: "Dança da Chuva",
                            artist: "Ritual Ancestral",
                            genre: "world",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/danca-chuva.pdf",
                            thumbnailUrl: "https://picsum.photos/id/469/300/200",
                            cifra: `[Intro] Em D C B7 (2x)
                            
                            Em              D
                            Pés descalços tocam o chão
                            C               B7
                            Corpos se movem em ritual
                            Em              D
                            Invocando as forças da natureza
                            C               B7
                            Para que as nuvens se abram
                            
                            [Refrão]
                            Am              B7
                            É a dança da chuva, antiga
                            Em              D
                            Tradição que atravessa os tempos
                            C               B7
                            É a dança da chuva, conexão
                            Em
                            Entre o homem e os elementos`
                        },
                        {
                            id: 332,
                            title: "Asas do Tempo",
                            artist: "Relógio Voador",
                            genre: "pop",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/asas-tempo.pdf",
                            thumbnailUrl: "https://picsum.photos/id/470/300/200",
                            cifra: `[Intro] C G Am F G C (2x)
                            
                            C               G
                            O tempo voa como um pássaro
                            Am              F
                            Que ninguém consegue pegar
                            G               C
                            Momentos que escapam pelos dedos
                            G               C
                            Sem chance de recuperar
                            
                            [Refrão]
                            F               G
                            Nas asas do tempo, viajamos
                            Em              Am
                            Sem poder controlar a direção
                            F               G
                            Nas asas do tempo, aprendemos
                            C
                            A valorizar cada momento`
                        },
                        {
                            id: 333,
                            title: "Beira do Rio",
                            artist: "Pescadores da Margem",
                            genre: "mpb",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/beira-rio.pdf",
                            thumbnailUrl: "https://picsum.photos/id/471/300/200",
                            cifra: `[Intro] G D Em C (2x)
                            
                            G               D
                            Sentado na beira do rio
                            Em              C
                            Observando as águas passar
                            G               D
                            Aprendo que a vida é movimento
                            Em              C
                            Que nunca para de fluir
                            
                            [Refrão]
                            C               D
                            Beira do rio, lugar
                            Em              C
                            De reflexão e contemplação
                            G               D
                            Beira do rio, escola
                            Em              C
                            Que ensina sobre transformação`
                        },
                        {
                            id: 334,
                            title: "Janela para o Infinito",
                            artist: "Cosmos Interior",
                            genre: "rock",
                            difficulty: "avancado",
                            pdfUrl: "cifras/janela-infinito.pdf",
                            thumbnailUrl: "https://picsum.photos/id/472/300/200",
                            cifra: `[Intro] Em C G D (2x)
                            
                            Em              C
                            Dentro de cada um de nós
                            G               D
                            Existe uma janela secreta
                            Em              C
                            Que se abre para o infinito
                            G               D
                            Para o mistério da existência
                            
                            [Refrão]
                            C               D
                            Janela para o infinito, portal
                            G               Em
                            Que conecta o finito ao eterno
                            C               D
                            Janela para o infinito, passagem
                            Em
                            Que transcende as limitações`
                        },
                        {
                            id: 335,
                            title: "Trilha da Mata",
                            artist: "Exploradores Verdes",
                            genre: "folk",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/trilha-mata.pdf",
                            thumbnailUrl: "https://picsum.photos/id/473/300/200",
                            cifra: `[Intro] D A Bm G (2x)
                            
                            D               A
                            Seguindo a trilha na floresta
                            Bm              G
                            Entre árvores centenárias
                            D               A
                            Cada passo revela segredos
                            Bm              G
                            De um mundo quase esquecido
                            
                            [Refrão]
                            G               A
                            Trilha da mata, caminho
                            Bm              G
                            Que nos reconecta à origem
                            D               A
                            Trilha da mata, jornada
                            G               D
                            De descoberta interior`
                        },
                        {
                            id: 336,
                            title: "Dança das Borboletas",
                            artist: "Asas Coloridas",
                            genre: "mpb",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/danca-borboletas.pdf",
                            thumbnailUrl: "https://picsum.photos/id/474/300/200",
                            cifra: `[Intro] C G Am F G C (2x)
                            
                            C               G
                            No jardim florido da vida
                            Am              F
                            Borboletas dançam ao vento
                            G               C
                            Cada uma com suas cores
                            G               C
                            Em um balé delicado
                            
                            [Refrão]
                            F               G
                            É a dança das borboletas
                            Em              Am
                            Efêmera e fascinante
                            F               G
                            É a dança das borboletas
                            C
                            Uma lição sobre beleza`
                        },
                        {
                            id: 337,
                            title: "Fogo da Paixão",
                            artist: "Chama Ardente",
                            genre: "sertanejo",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/fogo-paixao.pdf",
                            thumbnailUrl: "https://picsum.photos/id/475/300/200",
                            cifra: `[Intro] D A Bm G (2x)
                            
                            D               A
                            Um incêndio dentro do peito
                            Bm              G
                            Que nem água consegue apagar
                            D               A
                            É o fogo da paixão que queima
                            Bm              G
                            E consome sem cessar
                            
                            [Refrão]
                            G               A
                            É o fogo da paixão
                            Bm              G
                            Que arde sem controle
                            D               A
                            É o fogo da paixão
                            G               D
                            Que nos faz perder a razão`
                        },
                        {
                            id: 338,
                            title: "Sonata da Lua",
                            artist: "Noites Claras",
                            genre: "mpb",
                            difficulty: "avancado",
                            pdfUrl: "cifras/sonata-lua.pdf",
                            thumbnailUrl: "https://picsum.photos/id/476/300/200",
                            cifra: `[Intro] Em B7 Em Am B7 Em (2x)
                            
                            Em              B7
                            A lua compõe silenciosa
                            Em
                            Sua sonata para os amantes
                            Am              Em
                            Notas de prata que encantam
                            B7              Em
                            E inspiram poetas noturnos
                            
                            [Refrão]
                            G               D
                            Sonata da lua, música
                            Am              Em
                            Que acalma corações inquietos
                            C               B7
                            Sonata da lua, melodia
                            Em
                            Que narra histórias de amor`
                        },
                        {
                            id: 339,
                            title: "Revoada de Pássaros",
                            artist: "Céu Azul",
                            genre: "folk",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/revoada-passaros.pdf",
                            thumbnailUrl: "https://picsum.photos/id/477/300/200",
                            cifra: `[Intro] Am Em F G (2x)
                            
                            Am              Em
                            Como pontos negros no céu
                            F               G
                            Os pássaros formam desenhos
                            Am              Em
                            Unidos em um só movimento
                            F               G
                            Como se fossem um só ser
                            
                            [Refrão]
                            C               G
                            Revoada de pássaros, liberdade
                            Am              F
                            Que corta o horizonte em harmonia
                            C               G
                            Revoada de pássaros, beleza
                            F               Am
                            Que nos lembra o valor da união`
                        },
                        {
                            id: 340,
                            title: "Caminhos do Mar",
                            artist: "Navegantes",
                            genre: "mpb",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/caminhos-mar.pdf",
                            thumbnailUrl: "https://picsum.photos/id/478/300/200",
                            cifra: `[Intro] D G A D (2x)
                            
                            D               G
                            No vastidão azul do oceano
                            A               D
                            Traçamos nossos caminhos
                            D               G
                            Cada barco uma história
                            A               D
                            Cada viagem um destino
                            
                            [Refrão]
                            G               A
                            Caminhos do mar, rotas
                            Bm              G
                            Que ligam pessoas e mundos
                            D               A
                            Caminhos do mar, estradas
                            G               D
                            Onde aventuras acontecem`
                        },
                        {
                            id: 341,
                            title: "Castelos de Areia",
                            artist: "Ondas da Praia",
                            genre: "pop",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/castelos-areia.pdf",
                            thumbnailUrl: "https://picsum.photos/id/479/300/200",
                            cifra: `[Intro] C Am F G (2x)
                            
                            C               Am
                            Na beira da praia construímos
                            F               G
                            Castelos de areia efêmeros
                            C               Am
                            Sabendo que a maré virá
                            F               G
                            E levará todo o nosso esforço
                            
                            [Refrão]
                            F               G
                            Castelos de areia, símbolo
                            Em              Am
                            Da impermanência de tudo
                            F               G
                            Castelos de areia, lição
                            C
                            De que devemos aproveitar o momento`
                        },
                        {
                            id: 342,
                            title: "Canção do Viajante",
                            artist: "Estrada Infinita",
                            genre: "folk",
                            difficulty: "avancado",
                            pdfUrl: "cifras/cancao-viajante.pdf",
                            thumbnailUrl: "https://picsum.photos/id/480/300/200",
                            cifra: `[Intro] Em C G D (2x)
                            
                            Em              C
                            Com a mochila nas costas
                            G               D
                            E o coração cheio de sonhos
                            Em              C
                            Parto em busca de aventuras
                            G               D
                            Em terras desconhecidas
                            
                            [Refrão]
                            C               D
                            Sou um viajante, um nômade
                            G               Em
                            Que faz do mundo seu lar
                            C               D
                            Sou um viajante, um peregrino
                            Em
                            Que na estrada encontra paz`
                        },
                        {
                            id: 343,
                            title: "Flor do Inverno",
                            artist: "Jardim Gelado",
                            genre: "mpb",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/flor-inverno.pdf",
                            thumbnailUrl: "https://picsum.photos/id/481/300/200",
                            cifra: `[Intro] Am F C G (2x)
                            
                            Am              F
                            Na estação mais fria do ano
                            C               G
                            Uma flor resiste ao gelo
                            Am              F
                            Mostrando sua beleza delicada
                            C               G
                            Em meio ao branco da neve
                            
                            [Refrão]
                            F               G
                            Flor do inverno, resistência
                            Am              F
                            Que desafia as adversidades
                            C               G
                            Flor do inverno, esperança
                            Am
                            Que nem o frio consegue matar`
                        },
                        {
                            id: 344,
                            title: "Ventos do Leste",
                            artist: "Brisas Orientais",
                            genre: "world",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/ventos-leste.pdf",
                            thumbnailUrl: "https://picsum.photos/id/482/300/200",
                            cifra: `[Intro] Dm Am Gm A7 (2x)
                            
                            Dm              Am
                            Ventos que vêm do oriente
                            Gm              A7
                            Trazendo aromas exóticos
                            Dm              Am
                            Carregam histórias e tradições
                            Gm              A7
                            De terras distantes e místicas
                            
                            [Refrão]
                            F               C
                            Ventos do leste, mensageiros
                            Gm              A7
                            De culturas milenares
                            Dm              Am
                            Ventos do leste, viajantes
                            Gm              A7
                            Que conectam mundos diferentes`
                        },
                        {
                            id: 345,
                            title: "Canção da Floresta",
                            artist: "Sons da Mata",
                            genre: "mpb",
                            difficulty: "avancado",
                            pdfUrl: "cifras/cancao-floresta.pdf",
                            thumbnailUrl: "https://picsum.photos/id/483/300/200",
                            cifra: `[Intro] Em Bm C Am B7 (2x)
                            
                            Em              Bm
                            No silêncio verde da floresta
                            C               Am
                            Mil vozes formam uma sinfonia
                            Em              Bm
                            Pássaros, insetos e o vento
                            C               B7
                            Em perfeita harmonia natural
                            
                            [Refrão]
                            Am              B7
                            Canção da floresta, melodia
                            Em              C
                            Que acalma a alma agitada
                            Am              B7
                            Canção da floresta, terapia
                            Em
                            Para o coração cansado`
                        },
                        {
                            id: 346,
                            title: "Dança do Fogo",
                            artist: "Chamas Ancestrais",
                            genre: "world",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/danca-fogo.pdf",
                            thumbnailUrl: "https://picsum.photos/id/484/300/200",
                            cifra: `[Intro] Am Em F E7 (2x)
                            
                            Am              Em
                            Ao redor da fogueira sagrada
                            F               E7
                            Corpos se movem em transe
                            Am              Em
                            Celebrando a força primitiva
                            F               E7
                            Do elemento que transforma
                            
                            [Refrão]
                            Dm              E7
                            É a dança do fogo, ritual
                            Am              F
                            Que conecta passado e presente
                            Dm              E7
                            É a dança do fogo, celebração
                            Am
                            Da luz que vence as trevas`
                        },
                        {
                            id: 347,
                            title: "Estrela da Manhã",
                            artist: "Primeiro Raio",
                            genre: "mpb",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/estrela-manha.pdf",
                            thumbnailUrl: "https://picsum.photos/id/485/300/200",
                            cifra: `[Intro] G D Em C (2x)
                            
                            G               D
                            Antes do sol nascer
                            Em              C
                            Brilha no céu uma estrela
                            G               D
                            Anunciando a chegada do dia
                            Em              C
                            Trazendo esperança renovada
                            
                            [Refrão]
                            C               D
                            Estrela da manhã, guia
                            Em              C
                            Que ilumina os caminhos obscuros
                            G               D
                            Estrela da manhã, promessa
                            Em              C
                            De que após a noite vem o dia`
                        },
                        {
                            id: 348,
                            title: "Caminho das Estrelas",
                            artist: "Constelação",
                            genre: "rock",
                            difficulty: "avancado",
                            pdfUrl: "cifras/caminho-estrelas.pdf",
                            thumbnailUrl: "https://picsum.photos/id/486/300/200",
                            cifra: `[Intro] Em G D A (2x)
                            
                            Em              G
                            No infinito do universo
                            D               A
                            Há um caminho de estrelas
                            Em              G
                            Que nos guia através do cosmos
                            D               A
                            Em nossa jornada espiritual
                            
                            [Refrão]
                            C               D
                            Caminho das estrelas, rota
                            G               Em
                            Que nos conecta ao divino
                            C               D
                            Caminho das estrelas, luz
                            Em
                            Que nunca se extingue`
                        },
                        {
                            id: 349,
                            title: "Canção do Pastor",
                            artist: "Montanhas Verdes",
                            genre: "folk",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/cancao-pastor.pdf",
                            thumbnailUrl: "https://picsum.photos/id/487/300/200",
                            cifra: `[Intro] C G Am F G C (2x)
                            
                            C               G
                            Nas colinas verdejantes
                            Am              F
                            O pastor guia seu rebanho
                            G               C
                            Com uma canção simples e antiga
                            G               C
                            Que ecoa pelos vales
                            
                            [Refrão]
                            F               G
                            Canção do pastor, melodia
                            Em              Am
                            Que acalma os animais inquietos
                            F               G
                            Canção do pastor, tradição
                            C
                            Transmitida através de gerações`
                        },
                        {
                            id: 350,
                            title: "Asas de Liberdade",
                            artist: "Voo Livre",
                            genre: "pop",
                            difficulty: "iniciante",
                            pdfUrl: "cifras/asas-liberdade.pdf",
                            thumbnailUrl: "https://picsum.photos/id/488/300/200",
                            cifra: `[Intro] D A Bm G (2x)
                            
                            D               A
                            Quero voar como um pássaro
                            Bm              G
                            Livre de amarras e correntes
                            D               A
                            Sentir o vento nas asas
                            Bm              G
                            E explorar novos horizontes
                            
                            [Refrão]
                            G               A
                            Asas de liberdade, sonho
                            Bm              G
                            Que habita o coração humano
                            D               A
                            Asas de liberdade, anseio
                            G               D
                            Por um mundo sem barreiras`
                        },
                        {
                            id: 351,
                            title: "Mar de Emoções",
                            artist: "Ondas Sentimentais",
                            genre: "mpb",
                            difficulty: "intermediario",
                            pdfUrl: "cifras/mar-emocoes.pdf",
                            thumbnailUrl: "https://picsum.photos/id/489/300/200",
                            cifra: `[Intro] C Am Em G (2x)
                            
                            C               Am
                            Como ondas que vão e vêm
                            Em              G
                            Os sentimentos flutuam em mim
                            C               Am
                            Ora calmos como um lago
                            Em              G
                            Ora intensos como tempestade
                            
                            [Refrão]
                            F               G
                            Mar de emoções, oceano
                            Em              Am
                            Que habita dentro de cada ser
                            F               G
                            Mar de emoções, profundo
                            C
                            Que poucos ousam explorar`
                        }
        ]
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
            
            card.innerHTML = `
                <div class="cifra-thumbnail">
                    <img src="${cifra.thumbnailUrl}" alt="${cifra.title}">
                    <div class="cifra-overlay">
                        <div class="cifra-actions">
                            <button onclick="viewPdf(${cifra.id})"><i class="fas fa-eye"></i></button>
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
            
            row.innerHTML = `
                <td>${cifra.title}</td>
                <td>${cifra.artist}</td>
                <td>${capitalizeFirstLetter(cifra.genre)}</td>
                <td><span class="cifra-difficulty ${difficultyClass}">${difficultyText}</span></td>
                <td>
                    <div class="table-actions">
                        <button onclick="viewPdf(${cifra.id})"><i class="fas fa-eye"></i></button>
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
    
    // Função auxiliar para capitalizar primeira letra
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Funções globais
    window.viewPdf = function(id) {
        const cifra = cifrasData.find(c => c.id === id);
        if (!cifra) return;
        
        document.getElementById('modalTitle').textContent = `${cifra.title} - ${cifra.artist}`;
        
        document.getElementById('pdfContainer').innerHTML = `
            <div style="width:100%; text-align:center;">
                <p style="margin-bottom:20px;">Pré-visualização da cifra</p>
                <img src="${cifra.thumbnailUrl}" style="max-width:100%; max-height:600px; border:1px solid #ddd;">
                <div style="margin-top:20px; font-family:monospace; text-align:left; padding:20px; background:#f8f9fa; border-radius:8px;">
                    <pre style="white-space:pre-wrap;">${cifra.cifra || 'Cifra em breve disponível.'}</pre>
                </div>
            </div>
        `;
        
        document.getElementById('pageNum').textContent = '1';
        document.getElementById('pageCount').textContent = '1';
        
        modal.style.display = 'block';
    };

    // Função para carregar e renderizar cifras no bônus de 1000 cifras
    function loadCifras() {
        const cifrasData = generateCifrasDatabase(); // Obtém o banco de dados de cifras
        const cifrasContainer = document.getElementById('cifraContainer'); // Contêiner no HTML

        cifrasContainer.innerHTML = ''; // Limpa o contêiner

        cifrasData.forEach(cifra => {
            const cifraCard = document.createElement('div');
            cifraCard.className = 'cifra-card';

            cifraCard.innerHTML = `
                <div class="cifra-thumbnail">
                    <img src="${cifra.thumbnailUrl}" alt="${cifra.title}">
                </div>
                <div class="cifra-info">
                    <h3>${cifra.title}</h3>
                    <p>${cifra.artist}</p>
                    <p><strong>Gênero:</strong> ${cifra.genre}</p>
                    <p><strong>Dificuldade:</strong> ${cifra.difficulty}</p>
                    <button onclick="viewPdf(${cifra.id})">Ver PDF</button>
                </div>
            `;

            cifrasContainer.appendChild(cifraCard);
        });
    }

    // Chama a função ao carregar a página
    document.addEventListener('DOMContentLoaded', loadCifras);
});
