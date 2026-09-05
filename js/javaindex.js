async function cargarComponente(contenedorId, rutaComponente) {
  const contenedor = document.getElementById(contenedorId);

  try {
    const respuesta = await fetch(rutaComponente);

    if (!respuesta.ok) {
      throw new Error(`No se pudo cargar: ${rutaComponente}`);
    }

    const componenteHtml = await respuesta.text();
    contenedor.innerHTML = componenteHtml;
  } catch (error) {
    console.error(error);
  }
}

async function iniciarPagina() {
  await cargarComponente(
    "navbar-container",
    "componentes/navbar.html"
  );

  await cargarComponente(
    "footer-container",
    "componentes/footer.html"
  );

  iniciarNavbar();
  iniciarFooter();
  iniciarAnimaciones();
}

function iniciarNavbar() {
  const header = document.querySelector(".header");
  const menuToggle = document.querySelector("#menu-toggle");
  const navMenu = document.querySelector("#nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!header || !menuToggle || !navMenu) {
    return;
  }

  function cambiarHeaderConScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", cambiarHeaderConScroll);
  cambiarHeaderConScroll();

  menuToggle.addEventListener("click", () => {
    const menuAbierto = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", menuAbierto);

    if (menuAbierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

function iniciarFooter() {
  const currentYear = document.querySelector("#current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}

function iniciarAnimaciones() {
  const elementosReveal = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  elementosReveal.forEach((elemento) => {
    observer.observe(elemento);
  });
}

iniciarPagina();