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


        /* Movimento começa devagar,
           acelera e termina devagar */

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


        /* Impede o pulo padrão do navegador */

        event.preventDefault();


        /* Fecha o menu mobile */

        navegacao.classList.remove("ativo");

        botaoMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        botaoMenu.setAttribute(
            "aria-label",
            "Abrir menu"
        );


        /* Faz a página deslizar */

        rolarSuavemente(destino);
    });
});