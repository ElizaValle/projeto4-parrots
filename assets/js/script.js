/* let numeroCards = 0;

let jogoMemoria = document.querySelector('.jogo-memoria');

function criaJogo() {

    const personagens = [
        'bobrossparrot.gif',
        'explodyparrot.gif',
        'fiestaparrot.gif',
        'metalparrot.gif',
        'revertitparrot.gif',
        'tripletsparrot.gif',
        'unicornparrot.gif',
    ];

    
    const cards = [];

    while(numeroCards %2 !== 0 || numeroCards < 4 || numeroCards > 14) {
        numeroCards = parseInt(prompt(`Com quantas cartas você que jogar? \n
        digite um número par entre 4 e 14`));
    }

    for(let i = 0; i < numeroCards; i++) {
        cards.push(`
            <div class="card" onclick="revelaCard(this)" data-test="card">
                <div class="front face">
                    <img class="front" src="./assets/images/${personagens[i]}" alt="frente" data-test="face-up-image" />
                </div>
                <div class="back face">
                    <img class="back" src="./assets/images/back.png" width="100px" height="100px" alt="verso" data-test = "face-down-image"/>
                </div>
            </div>
        `);
    }

    cards.sort(() => Math.random() - 0.5);

    for(let i = 0; i < numeroCards; i++) {
        jogoMemoria.innerHTML += cards[i];
    }
} 

let primeiraCarta = '';
let segundaCarta = '';
let qtdJogadas = 0;

function revelaCard(revelar) {
    
    qtdJogadas++;
    if(primeiraCarta === undefined) {
        primeiraCarta = revelar;
        revelar.classList.add('click');
    }
    else if(segundaCarta === undefined) {
        segundaCarta = revelar;
        revelar.classList.add('click');

        setTimeout(desviraCard, 1000);
    }
}

function desviraCard() {
    let firstCard = primeiraCarta.classList.value;
    let secondCard = segundaCarta.classList.value;

    if(firstCard !== secondCard) {
        primeiraCarta.classList.remove('click');
        segundaCarta.classList.remove('click');
    }
    else {
        setTimeout(fimJogo, 1000);
    }

    primeiraCarta = '';
    segundaCarta = '';
}

function fimJogo() {
    let finishGame = document.querySelectorAll('.click');

    if(finishGame.length == numeroCards) {
        alert('Você finalizou o jogo com ${qtdJogadas} jogadas!');
    }
}

criaJogo();  */


const jogoMemoria = document.querySelector('.jogo-memoria');

const imagens = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot',
];

let primeiraCarta = '';
let segundaCarta = '';

let numCards = 0;
let qtdJogadas = 0;

function verificaFimJogo() {

    const cardDesabilitado = document.querySelectorAll('.disabled-card');

    if(cardDesabilitado.length === numCards) {
        alert('Você finalizou o jogo com ${qtdJogadas} jogadas!');
    }

}

function verificaCards() {

    qtdJogadas++;

    const primeiraImagem = primeiraCarta.getAttribute('data-character');
    const segundaImagem = segundaCarta.getAttribute('data-character');

    if(primeiraImagem === segundaImagem) {

        primeiraCarta.firstChild.classList.add('disabled-card');
        segundaCarta.firstChild.classList.add('disabled-card');

        primeiraCarta = '';
        segundaCarta = '';

        verificaFimJogo();

    }
    else {

        setTimeout(() => {
            primeiraCarta.classList.remove('revela-card');
            segundaCarta.classList.remove('revela-card');

            primeiraCarta = '';
            segundaCarta = '';

        }, 1000);
    }

}

const revelaCard = ({target}) => {

    if(target.parentNode.className.includes('revela-card')) {
        return;
    }

    if(primeiraCarta === '') {
        target.parentNode.classList.add('revela-card');
        primeiraCarta = target.parentNode;
    }
    else if(segundaCarta === '') {
        target.parentNode.classList.add('revela-card');
        segundaCarta = target.parentNode;

        verificaCards();
    }   
} 

function criaCard(imagem) {

    const card = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');

    front.style.backgroundImage = `url('../assets/images/${imagens}.png')`;

    card.className = 'card';
    front.className = 'front face';
    back.className = 'back face';

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revelaCard);
    card.setAttribute('data-character', imagem);


    jogoMemoria.appendChild(card);

    return card;
}

function criaJogo() {

    while(numCards %2 !== 0 || numCards < 4 || numCards > 14) {
        numCards = parseInt(prompt(`Com quantas cartas você que jogar? \n
        digite um número par entre 4 e 14`));
    }

    /* const cards = [];

     for(let i = 0; i < numCards; i++) {
        cards.push(`
            <div class="card"  data-test="card">
                <div class="front face">
                    <img class="front" src="./assets/images/${imagens[i]}" alt="frente" data-test="face-up-image" />
                </div>
                <div class="back face">
                    <img class="back" src="./assets/images/back.png" width="100px" height="100px" alt="verso" data-test = "face-down-image"/>
                </div>
            </div>
        `);
    } 

    cards.sort(() => Math.random() - 0.5);

    for(let i = 0; i < numCards; i++) {
        jogoMemoria.innerHTML += cards[i];
    } */

    const duplicaImagens = [ ...imagens, ...imagens ];

    const embaralhaImagens = duplicaImagens.sort(() => Math.random() - 0.5);

    embaralhaImagens.forEach((imagem) => {

        const card = criaCard(imagem);
        jogoMemoria.appendChild(card);

    });
}

criaJogo();

















