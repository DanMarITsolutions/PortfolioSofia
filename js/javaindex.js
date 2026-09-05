async function cargarComponente(contenedorId, rutaComponente) {
  const contenedor = document.getElementById(contenedorId);

  if (!contenedor) {
    console.error(`No se ha encontrado el contenedor: ${contenedorId}`);
    return;
  }

  try {
    const respuesta = await fetch(rutaComponente);

    if (!respuesta.ok) {
      throw new Error(
        `No se pudo cargar el componente: ${rutaComponente}`
      );
    }

    const componenteHtml = await respuesta.text();
    contenedor.innerHTML = componenteHtml;
  } catch (error) {
    console.error(error);

    contenedor.innerHTML = `
      <p style="
        padding: 15px;
        font-family: Arial, sans-serif;
        color: #b00020;
        background-color: #f4f2ed;
      ">
        Error al cargar: ${rutaComponente}
      </p>
    `;
  }
}

function iniciarNavbar() {
  const header = document.querySelector(".header");
  const menuToggle = document.querySelector("#menu-toggle");
  const navMenu = document.querySelector("#nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!header || !menuToggle || !navMenu) {
    console.warn("No se ha podido iniciar el navbar.");
    return;
  }

  function cambiarHeaderConScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  cambiarHeaderConScroll();

  window.addEventListener("scroll", cambiarHeaderConScroll);

  menuToggle.addEventListener("click", () => {
    const menuAbierto = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active");

    menuToggle.setAttribute(
      "aria-expanded",
      menuAbierto.toString()
    );

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

  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
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

  if (elementosReveal.length === 0) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elementosReveal.forEach((elemento) => {
      elemento.classList.add("visible");
    });

    return;
  }

  document.documentElement.classList.add("animations-ready");

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
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elementosReveal.forEach((elemento) => {
    observer.observe(elemento);
  });
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

document.addEventListener("DOMContentLoaded", iniciarPagina);