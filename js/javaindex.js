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

function iniciarPlanoInteractivo() {
  const zonasPlano = document.querySelectorAll(".real-plan-space");

  const panelInfo = document.querySelector("#market-plan-info");
  const numeroInfo = document.querySelector(
    "#market-plan-info-number"
  );
  const tituloInfo = document.querySelector(
    "#market-plan-info-title"
  );
  const textoInfo = document.querySelector(
    "#market-plan-info-text"
  );

  if (
    zonasPlano.length === 0 ||
    !panelInfo ||
    !numeroInfo ||
    !tituloInfo ||
    !textoInfo
  ) {
    return;
  }

  const informacionZonas = {
    market: {
      numero: "01",
      titulo: "Mercado",
      texto:
        "Espacio principal destinado a la actividad comercial. La distribución organiza los puestos, los recorridos interiores y las relaciones visuales entre las distintas áreas."
    },

    access: {
      numero: "02",
      titulo: "Acceso principal",
      texto:
        "Punto de entrada al mercado. Esta zona articula la llegada desde el espacio urbano y organiza la transición hacia el interior del edificio."
    },

    vestibule: {
      numero: "03",
      titulo: "Vestíbulo",
      texto:
        "Área de distribución situada junto al acceso. Permite orientar al visitante y conectar el acceso principal con los recorridos interiores del mercado."
    },

    "cold-rooms": {
      numero: "04",
      titulo: "Cámaras frigoríficas",
      texto:
        "Zona técnica destinada a la conservación de productos. Se ubica en una posición funcional respecto al área comercial y a los servicios del mercado."
    },

    toilets: {
      numero: "05",
      titulo: "Aseos",
      texto:
        "Núcleo de servicios integrado en la planta baja y dispuesto para facilitar el acceso tanto a usuarios como al personal del mercado."
    },

    "changing-rooms": {
      numero: "06",
      titulo: "Vestuarios",
      texto:
        "Espacio de apoyo destinado al personal. Se relaciona con las zonas de servicio y las instalaciones del edificio."
    },

    ventilation: {
      numero: "07",
      titulo: "Instalación de ventilación",
      texto:
        "Área técnica destinada a los sistemas de ventilación necesarios para garantizar las condiciones ambientales y de funcionamiento del mercado."
    },

    electricity: {
      numero: "08",
      titulo: "Instalación eléctrica",
      texto:
        "Espacio técnico para la infraestructura eléctrica del edificio, situado junto a otras áreas de apoyo y mantenimiento."
    }
  };

  function mostrarInformacion(zona) {
    const idZona = zona.dataset.space;
    const informacion = informacionZonas[idZona];

    if (!informacion) {
      return;
    }

    zonasPlano.forEach((item) => {
      item.classList.remove("active");
    });

    zona.classList.add("active");

    numeroInfo.textContent = informacion.numero;
    tituloInfo.textContent = informacion.titulo;
    textoInfo.textContent = informacion.texto;

    panelInfo.classList.add("visible");
  }

  zonasPlano.forEach((zona) => {
    zona.addEventListener("click", () => {
      mostrarInformacion(zona);
    });

    zona.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        mostrarInformacion(zona);
      }
    });
  });
}

function iniciarFormularioContacto() {
  const formulario = document.querySelector("#contact-form");
  const estadoFormulario = document.querySelector("#form-status");
  const botonEnviar = document.querySelector("#form-submit");
  const textoBoton = document.querySelector(".form-submit-text");

  if (!formulario || !estadoFormulario || !botonEnviar || !textoBoton) {
    return;
  }

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const datosFormulario = new FormData(formulario);

    botonEnviar.disabled = true;
    textoBoton.textContent = "Enviando...";
    estadoFormulario.textContent = "";
    estadoFormulario.className = "form-status";

    try {
      const respuesta = await fetch(formulario.action, {
        method: "POST",
        body: datosFormulario,
        headers: {
          Accept: "application/json"
        }
      });

      const resultado = await respuesta.json();

      if (resultado.success) {
        estadoFormulario.textContent =
          "Mensaje enviado correctamente. Te responderé lo antes posible.";

        estadoFormulario.classList.add("success");

        formulario.reset();
      } else {
        throw new Error(
          resultado.message || "No se ha podido enviar el formulario."
        );
      }
    } catch (error) {
      console.error(error);

      estadoFormulario.textContent =
        "No se ha podido enviar el mensaje. Inténtalo de nuevo o escribe directamente al correo electrónico.";

      estadoFormulario.classList.add("error");
    } finally {
      botonEnviar.disabled = false;
      textoBoton.textContent = "Enviar mensaje";
    }
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
  iniciarPlanoInteractivo();
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
  iniciarPlanoInteractivo();
  iniciarFormularioContacto();
}
}

document.addEventListener("DOMContentLoaded", iniciarPagina);