// Função para mostrar o toast
function showToast(message, type) {
  const toast = document.getElementById("responseMessage");
  toast.textContent = message;
  toast.classList.remove("success", "error");
  toast.classList.add(type, "show");

  // Após 3 segundos, escondemos o toast
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // 3 segundos
}

/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  if (!toggle || !nav) return; // Retorna se qualquer um dos elementos não for encontrado

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("nav-menu").classList.remove("show");
  });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const { offsetHeight, offsetTop } = section;
    const sectionId = section.getAttribute("id");
    const sectionLink = document.querySelector(
      `.nav__menu a[href*=${sectionId}]`
    );

    // Verifica se a seção está visível na tela
    if (
      scrollPosition >= offsetTop - 58 &&
      scrollPosition <= offsetTop + offsetHeight
    ) {
      sectionLink.classList.add("active-link");
    } else {
      sectionLink.classList.remove("active-link");
    }
  });
};

window.addEventListener("scroll", () => {
  scrollActive();
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

/*===== SEND FORM =====*/
// Inicialize o EmailJS com sua chave pública
emailjs.init("OH-gvD1TmasV1thFV");

// Adiciona o evento de envio do formulário
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados do formulário
    const formData = new FormData(this);

    // Envia o e-mail com os dados do formulário usando EmailJS
    emailjs.sendForm("service_wi886xj", "template_hbr8a31", this).then(
      function (response) {
        console.log("Sucesso:", response);
        // Exibe a mensagem de sucesso
        showToast("Mensagem enviada com sucesso!", "success");
      },
      function (error) {
        console.log("Erro:", error);
        // Exibe a mensagem de erro
        showToast("Ocorreu um erro. Tente novamente.", "error");
      }
    );
  });
