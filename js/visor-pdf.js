const proyectosPdf = {
  "vivienda-bloque": {
    titulo: "Vivienda<br>y bloque.",
    tipo: "Vivienda colectiva",
    ubicacion: "Sevilla · España",
    anio: "2025",
    archivo: "pdf/vivienda-bloque.pdf"
  },

  "fley-zoilo": {
    titulo: "Fley<br>Zoilo.",
    tipo: "Rehabilitación",
    ubicacion: "Sevilla · España",
    anio: "2025",
    archivo: "pdf/fley-zoilo.pdf"
  },

  "tfg-planos": {
    titulo: "Proyecto<br>final.",
    tipo: "Proyecto académico",
    ubicacion: "Sevilla · España",
    anio: "2025",
    archivo: "pdf/tfg-planos.pdf"
  },

  "viviendas": {
    titulo: "Viviendas<br>colectivas.",
    tipo: "Vivienda colectiva",
    ubicacion: "Sevilla · España",
    anio: "2024",
    archivo: "pdf/viviendas.pdf"
  },

  "torre-de-la-plata": {
    titulo: "Torre de<br>la Plata.",
    tipo: "Patrimonio e intervención",
    ubicacion: "Sevilla · España",
    anio: "2024",
    archivo: "pdf/torre-de-la-plata.pdf"
  },

  rehabilitacion: {
    titulo: "Proyecto de<br>rehabilitación.",
    tipo: "Rehabilitación arquitectónica",
    ubicacion: "Sevilla · España",
    anio: "2024",
    archivo: "pdf/rehabilitacion.pdf"
  }
};

function cargarProyectoPdf() {
  const parametros = new URLSearchParams(window.location.search);
  const idProyecto = parametros.get("proyecto");

  const proyecto = proyectosPdf[idProyecto];

  const titulo = document.querySelector("#pdf-project-title");
  const tipo = document.querySelector("#pdf-project-type");
  const ubicacion = document.querySelector("#pdf-project-location");
  const anio = document.querySelector("#pdf-project-year");

  const visorPdf = document.querySelector("#pdf-object");
  const enlaceAbrir = document.querySelector("#open-pdf-link");
  const enlaceDescargar = document.querySelector("#download-pdf-link");
  const enlaceAlternativo = document.querySelector("#fallback-pdf-link");

  if (!proyecto) {
    titulo.innerHTML = "Proyecto no<br>encontrado.";

    tipo.textContent = "Error de navegación";
    ubicacion.textContent = "Vuelve a la página principal";
    anio.textContent = "";

    visorPdf.style.display = "none";
    enlaceAbrir.style.display = "none";
    enlaceDescargar.style.display = "none";

    return;
  }

  document.title = `${proyecto.titulo.replace("<br>", " ")} | Portfolio`;

  titulo.innerHTML = proyecto.titulo;
  tipo.textContent = proyecto.tipo;
  ubicacion.textContent = proyecto.ubicacion;
  anio.textContent = proyecto.anio;

  visorPdf.data = proyecto.archivo;

  enlaceAbrir.href = proyecto.archivo;
  enlaceDescargar.href = proyecto.archivo;
  enlaceAlternativo.href = proyecto.archivo;
}

document.addEventListener("DOMContentLoaded", cargarProyectoPdf);