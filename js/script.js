const botaoMenu = document.querySelector(".botao-menu");
const navegacao = document.querySelector(".navegacao");

botaoMenu.addEventListener("click", function () {

    navegacao.classList.toggle("ativo");

    const menuAberto = navegacao.classList.contains("ativo");

    botaoMenu.setAttribute("aria-expanded", menuAberto);
    botaoMenu.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );
});
const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
        navegacao.classList.remove("ativo");

        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
    });
});