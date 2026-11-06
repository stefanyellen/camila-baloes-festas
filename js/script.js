/* =========================
   ELEMENTOS DO MENU
========================= */

const botaoMenu = document.querySelector(".botao-menu");
const navegacao = document.querySelector(".navegacao");
const linksMenu = document.querySelectorAll(".menu a");


/* =========================
   ABRIR E FECHAR MENU MOBILE
========================= */

botaoMenu.addEventListener("click", function () {

    navegacao.classList.toggle("ativo");

    const menuAberto = navegacao.classList.contains("ativo");

    botaoMenu.setAttribute("aria-expanded", menuAberto);

    botaoMenu.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );
});


/* =========================
   FUNÇÃO DE ROLAGEM SUAVE
========================= */

function rolarSuavemente(destino, duracao = 600) {

    const inicio = window.scrollY;

    const alturaCabecalho =
        document.querySelector(".cabecalho").offsetHeight;

    const posicaoDestino =
        destino.getBoundingClientRect().top
        + window.scrollY
        - alturaCabecalho
        - 20;

    const distancia = posicaoDestino - inicio;

    let tempoInicial = null;


    function animarRolagem(tempoAtual) {

        if (tempoInicial === null) {
            tempoInicial = tempoAtual;
        }

        const tempoDecorrido = tempoAtual - tempoInicial;

        const progresso = Math.min(
            tempoDecorrido / duracao,
            1
        );


        const suavizacao =
            progresso < 0.5
                ? 2 * progresso * progresso
                : 1 - Math.pow(-2 * progresso + 2, 2) / 2;


        window.scrollTo(
            0,
            inicio + distancia * suavizacao
        );


        if (progresso < 1) {
            requestAnimationFrame(animarRolagem);
        }
    }


    requestAnimationFrame(animarRolagem);
}


/* =========================
   CLIQUES DO MENU
========================= */

linksMenu.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const destinoId = link.getAttribute("href");

        if (!destinoId.startsWith("#")) {
            return;
        }

        const destino = document.querySelector(destinoId);

        if (!destino) {
            return;
        }


        event.preventDefault();


        navegacao.classList.remove("ativo");

        botaoMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        botaoMenu.setAttribute(
            "aria-label",
            "Abrir menu"
        );


        rolarSuavemente(destino);
    });
});


/* =========================
   ELEMENTOS DA GALERIA
========================= */

const imagensGaleria =
    document.querySelectorAll(".item-galeria img");

const lightbox =
    document.querySelector("#lightbox");

const imagemLightbox =
    document.querySelector(".lightbox-imagem");

const contadorLightbox =
    document.querySelector(".lightbox-contador");

const botaoFecharLightbox =
    document.querySelector(".lightbox-fechar");

const botaoAnterior =
    document.querySelector(".lightbox-anterior");

const botaoProxima =
    document.querySelector(".lightbox-proxima");


/*
    Guarda qual imagem está aberta.

    0 = primeira imagem
    1 = segunda imagem
    2 = terceira imagem
    ...
*/

let imagemAtual = 0;


/* =========================
   MOSTRAR IMAGEM
========================= */

function mostrarImagem(indice) {

    /*
        Se chegarmos depois da última imagem,
        voltamos para a primeira.
    */

    if (indice >= imagensGaleria.length) {
        indice = 0;
    }


    /*
        Se tentarmos voltar antes da primeira,
        vamos para a última.
    */

    if (indice < 0) {
        indice = imagensGaleria.length - 1;
    }


    imagemAtual = indice;


    const imagemSelecionada =
        imagensGaleria[imagemAtual];


    imagemLightbox.src =
        imagemSelecionada.src;

    imagemLightbox.alt =
        imagemSelecionada.alt;


    contadorLightbox.textContent =
        `${imagemAtual + 1} / ${imagensGaleria.length}`;
}


/* =========================
   ABRIR LIGHTBOX
========================= */

function abrirLightbox(indice) {

    mostrarImagem(indice);

    lightbox.classList.add("ativo");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";
}


/* =========================
   FECHAR LIGHTBOX
========================= */

function fecharLightbox() {

    lightbox.classList.remove("ativo");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}


/* =========================
   CLIQUE NAS IMAGENS
========================= */

imagensGaleria.forEach(function (imagem, indice) {

    imagem.addEventListener("click", function () {

        abrirLightbox(indice);
    });
});


/* =========================
   BOTÃO PRÓXIMA
========================= */

botaoProxima.addEventListener("click", function () {

    mostrarImagem(imagemAtual + 1);
});


/* =========================
   BOTÃO ANTERIOR
========================= */

botaoAnterior.addEventListener("click", function () {

    mostrarImagem(imagemAtual - 1);
});


/* =========================
   BOTÃO FECHAR
========================= */

botaoFecharLightbox.addEventListener("click", function () {

    fecharLightbox();
});


/* =========================
   FECHAR CLICANDO NO FUNDO
========================= */

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        fecharLightbox();
    }
});


/* =========================
   CONTROLES PELO TECLADO
========================= */

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("ativo")) {
        return;
    }


    if (event.key === "ArrowRight") {

        mostrarImagem(imagemAtual + 1);
    }


    if (event.key === "ArrowLeft") {

        mostrarImagem(imagemAtual - 1);
    }


    if (event.key === "Escape") {

        fecharLightbox();
    }
});