// script.js

const malla = {
  "1º Semestre": [
    { codigo: "QIM100I", nombre: "Química General I" },
    { codigo: "MAT1000", nombre: "Pre Cálculo" },
    { codigo: "BIO141C", nombre: "Biología de la Celula" },
    { codigo: "BIO101A", nombre: "Tópicos de biología" },
    { codigo: "QIM101Q", nombre: "Lab. química general" }
  ],
  "2º Semestre": [
    { codigo: "QIM100A", nombre: "Química General II", prereq: ["QIM100I"] },
    { codigo: "BIO110C", nombre: "Biología de Organismos y comunidades" },
    { codigo: "MAT1100", nombre: "Cálculo I", prereq: ["MAT1000"] },
    { codigo: "FIS0109", nombre: "Lab. Física para Ciencias" },
    { codigo: "FIS109C", nombre: "Física para ciencias" },
    { codigo: "TTF", nombre: "teológico" }
  ],
  "3º Semestre": [
    { codigo: "BIO152C", nombre: "Bases físicas de los procesos biológicos", prereq: ["QIM100I", "MAT1000", "FIS109C", "BIO141C"] },
    { codigo: "BIO242C", nombre: "Bioestadística", prereq: ["MAT1000"] },
    { codigo: "QIM200", nombre: "Química orgánica fundamental", prereq: ["QIM100A"] }
  ],
  "4º Semestre": [
    { codigo: "BIO151E", nombre: "Biología de los microorganismos", prereq: ["BIO141C"] },
    { codigo: "QIM150", nombre: "Química-Física", prereq: ["MAT1100", "FIS109C", "QIM100I"] }
  ],
  "5º Semestre": [
    { codigo: "BIO226E", nombre: "Genética y evolución", prereq: ["BIO141C", "BIO242"] },
    { codigo: "BIO225C", nombre: "Fisiología y bioquímica/biología vegetal/celular", prereq: ["BIO151E", "BIO152C"] },
    { codigo: "BIO228C", nombre: "Bioquímica y genética molecular", prereq: ["QIM200"] },
    { codigo: "BIO297C", nombre: "Lab. Bioquímica, Biología celular", prereq: ["QIM200", "BIO151C"] }
  ],
  "6º Semestre": [
    { codigo: "BIO231C", nombre: "Ecología", prereq: ["BIO110C", "BIO242C"] },
    { codigo: "BIO298E", nombre: "Trabajo experimental en ecología", prereq: ["BIO242C"] },
    { codigo: "BIO219E", nombre: "Biología y diversidad vegetal", prereq: ["BIO110C"] },
    { codigo: "BIO227E", nombre: "Biología y diversidad animal", prereq: ["BIO110C"] },
    { codigo: "BIO299E", nombre: "Fisiología", prereq: ["BIO152C", "BIO228C"] },
    { codigo: "BIO299L", nombre: "Lab. de fisiología" }
  ],
  "7º y 8º Semestre": [
    { codigo: "BIO295A", nombre: "OPR Experiencia de investigación", prereq: ["BIO297C"] },
    { codigo: "BIO296C", nombre: "Seminario de investigación/Práctica extramural", prereq: ["BIO295A", "BIO297C", "BIO298E", "BIO299L"] },
    { codigo: "OPR", nombre: "Cursos optativos de profundización (60 crd)" },
    { codigo: "EXA", nombre: "Examen de grado" }
  ],
  "9º Semestre": [
    { codigo: "OPR2", nombre: "Cursos optativos de profundización de la especialidad (50 crd)" }
  ],
  "10º Semestre": [
    { codigo: "BIO2300", nombre: "Experiencia profecional dirigida", prereq: ["EXA"] }
  ],
};

let cursadas = new Set();

function renderMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  Object.entries(malla).forEach(([semestre, ramos]) => {
    const div = document.createElement("div");
    div.className = "semestre";
    const title = document.createElement("h3");
    title.textContent = semestre;
    div.appendChild(title);

    ramos.forEach(materia => {
      const mDiv = document.createElement("div");
      mDiv.textContent = `${materia.codigo} - ${materia.nombre}`;
      mDiv.className = "materia";

      const hasPrereqs = materia.prereq?.some(p => !cursadas.has(p));
      if (cursadas.has(materia.codigo)) {
        mDiv.classList.add("cursada");
      } else if (hasPrereqs) {
        mDiv.classList.add("bloqueada");
      }

      mDiv.addEventListener("click", () => {
        if (!hasPrereqs) {
          if (cursadas.has(materia.codigo)) {
            cursadas.delete(materia.codigo);
          } else {
            cursadas.add(materia.codigo);
          }
          renderMalla();
        }
      });

      div.appendChild(mDiv);
    });

    container.appendChild(div);
  });
}

renderMalla();
