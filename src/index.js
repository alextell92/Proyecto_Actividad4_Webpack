import _ from "lodash";
import "./estilo.css";
import "./estilo.scss";
import eightBit from "8bit";
import config from "./config.yaml";

import json5 from "./config.json5";

console.log("Go")
if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
      .then(registration=>{
          console.log('SW Registrado',registration);
  })
      .catch(err=>
          {console.log('SW no registrado',err)
  });
  });

}

var filtro = "none";
const listadoFiltros = json5.filtros;
const img = new Image();

const contenedorDivPrincipal = document.createElement("div");
const contenedorDiv = document.createElement("div");
const canvasDiv=document.createElement("div");

canvasDiv.classList.add("mycanvas");
const h1 = document.createElement("h1");
const h4 = document.createElement("h4");
h1.textContent = config.titulo;
//h1.style.textAlign = "center";
h4.textContent = config.descripcion;
//h4.style.textAlign = "center";
contenedorDivPrincipal.appendChild(h1);
contenedorDivPrincipal.appendChild(h4);
contenedorDivPrincipal.classList.add("principal");
contenedorDiv.classList.add("mi-contenedor");


const slider = document.createElement("input");
slider.type = "range";
slider.min = 1;
slider.max = 100;
slider.value = 10; // Valor inicial
slider.style.display = filtro === "none" ? "none" : "block";

const etiqueta = document.createElement("label");
etiqueta.textContent = `${filtro === "none" ? "Filtro" : filtro}: ${
  slider.value
}%`;

etiqueta.style.marginTop = "1px";
etiqueta.style.display = filtro === "none" ? "none" : "block"; // Mostrar la etiqueta
etiqueta.style.textAlign = "center"; // Centrar la etiqueta

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/*";
fileInput.id = "fileInput";
fileInput.style.display = "none"; // Ocultar el input de archivo

const select = document.createElement("select");
select.id = "selectFiltro";
select.style.marginTop = "10px";


contenedorDiv.appendChild(select);
contenedorDiv.appendChild(slider);
contenedorDiv.appendChild(etiqueta);

contenedorDiv.appendChild(fileInput);

const customButton = document.createElement("button");
customButton.id = "customButton";
customButton.textContent = "Cargar Imagen";
customButton.style.marginTop = "5px";
contenedorDivPrincipal.appendChild(customButton);


const canvas = document.createElement("canvas");
canvas.id = "myCanvas";

contenedorDiv.appendChild(canvas);
canvasDiv.appendChild(canvas);

const ctx = canvas.getContext("2d");
contenedorDivPrincipal.appendChild(contenedorDiv);
contenedorDivPrincipal.appendChild(canvasDiv);

document.body.appendChild(contenedorDivPrincipal);

const optionDefault = document.createElement("option");
optionDefault.value = "0"; // valor por defecto
optionDefault.textContent = "Seleccionar filtro"; // texto para mostrar al usuario
select.appendChild(optionDefault); // Agregar la opción por defecto al select

listadoFiltros.forEach((item) => {
  const option = document.createElement("option"); // :contentReference[oaicite:8]{index=8}
  option.value = item.valor; // texto para enviar al servidor
  option.textContent = item.nombre;
  select.appendChild(option); // Agregar la opción al select
});

select.addEventListener("change", (event) => {
  switch (event.target.value) {
    case "1":
      filtro = "sepia";
      slider.style.display = "block";
      etiqueta.style.display = "block"; // Mostrar la etiqueta
      slider.value = 10; // Valor inicial
      console.log("Seleccionado " + event.target.value);
      etiqueta.textContent = `${filtro}: ${slider.value}%`;
      ctx.filter = `sepia(${slider.value}%)`;;
      ctx.drawImage(img, 0, 0);
     
      break;
    case "2":
      filtro = "blancoynegro";
      slider.style.display = "block";
      etiqueta.style.display = "block"; // Mostrar la etiqueta
      slider.value = 10; // Valor inicial
      console.log("Seleccionado " + event.target.value);
      etiqueta.textContent = `${filtro}: ${slider.value}%`;
      ctx.filter = `brightness(${slider.value}%) contrast(150%) saturate(0%) brightness(150%)`;
      ctx.drawImage(img, 0, 0);
      break;
    case "3":
      filtro="vintage";
    
      slider.style.display = "none";
      etiqueta.style.display = "none"; // Mostrar la etiqueta
      slider.value = 10; // Valor inicial
      console.log("Seleccionado " + event.target.value);
      etiqueta.textContent = `${filtro}: ${slider.value}%`;
      ctx.filter = `saturate(0%) sepia(100%) contrast(150%) saturate(150%)`;
      ctx.drawImage(img, 0, 0);
      break;
    case "4":
      filtro = "brillo";
      slider.style.display = "block";
      etiqueta.style.display = "block"; // Mostrar la etiqueta
      slider.value = 10; // Valor inicial
      console.log("Seleccionado " + event.target.value);
      etiqueta.textContent = `${filtro}: ${slider.value}%`;
      ctx.filter = `brightness(${slider.value}%)`;
      ctx.drawImage(img, 0, 0);
      break;
    case "5":
      filtro = "blur";
      slider.style.display = "block";
      etiqueta.style.display = "block"; // Mostrar la etiqueta
      slider.value = 10; // Valor inicial
      console.log("Seleccionado " + event.target.value);
    
      etiqueta.textContent = `${filtro}: ${slider.value}px`;
      ctx.filter = `blur(${slider.value}px) grayscale(5%)`;
      ctx.drawImage(img, 0, 0);
      break;
      case "6":
      filtro = "frio";
      slider.style.display = "none";
      etiqueta.style.display = "none"; // Mostrar la etiqueta
      slider.value = 10; // Valor inicial
      console.log("Seleccionado " + event.target.value);
      etiqueta.textContent = `${filtro}: ${slider.value}deg`;
      ctx.filter = `hue-rotate(180deg) sepia(75%) contrast(150%) saturate(300%) hue-rotate(180deg)`;
      ctx.drawImage(img, 0, 0);
        break;
    case "7":
      filtro = "8bits";
      slider.style.display = "block";
      etiqueta.style.display = "block"; // Mostrar la etiqueta
      etiqueta.textContent = `${filtro}: ${slider.value}%`;
      slider.value = 10; // Valor inicial
      ctx.drawImage(img, 0, 0);
      eightBit(canvas, img, slider.value);
      break;
    // …
    default:
    // código a ejecutar si ningún case coincide
  }
});

customButton.addEventListener("click", () => {
  fileInput.click(); // Dispara el input oculto
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Aplica un filtro
      // ctx.filter = 'sepia(70%)';

      dibujarImagen(0);
      // ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

function dibujarImagen(caleValue) {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (filtro === "none") {
    ctx.filter = "none";
  } else {
    if (filtro === "8bit") {
      console.log("Seleccionado " + filtro + " con valor " + caleValue);
    } else {
      ctx.filter = `${filtro}(${caleValue}%)`;
    }
  }
  ctx.drawImage(img, 0, 0);
  etiqueta.textContent = `${filtro}: ${caleValue}%`;
}

// Evento en tiempo real al mover el slider
slider.addEventListener("input", () => {
  switch (filtro) {
    case "blur":
      ctx.filter = `blur(${slider.value}px)`;
      etiqueta.textContent = `${filtro}: ${slider.value}px`;
      ctx.drawImage(img, 0, 0);
      break;
    case "brillo":
      ctx.filter = `brightness(${slider.value}%)`;
      etiqueta.textContent = `${filtro}: ${slider.value}px`;
      ctx.drawImage(img, 0, 0);
      break;
    case "vintage":
      console.log("Seleccionado " + filtro + " con valor " + slider.value);
      ctx.filter = `saturate(0%) sepia(100%) contrast(150%) saturate(${slider.value}%))`;
      etiqueta.textContent = `${filtro}: ${slider.value}px`;
      ctx.drawImage(img, 0, 0);
      break;
    case "blancoynegro":
      ctx.filter = `brightness(${slider.value}%) contrast(150%) saturate(0%) brightness(150%)`;
      ctx.drawImage(img, 0, 0);
      etiqueta.textContent = `${filtro}: ${slider.value}%`;
      break;
    case "frio":
      ctx.filter = `hue-rotate(180deg) sepia(75%) contrast(150%) saturate(300%) hue-rotate(180deg)`;
      ctx.drawImage(img, 0, 0);
      etiqueta.textContent = `${filtro}: ${slider.value}%`; 
      break;
    case "sepia":
      ctx.filter = `sepia(${slider.value}%)`;
      ctx.drawImage(img, 0, 0);
      etiqueta.textContent = `${filtro}: ${slider.value}%`;
      break;
    case "8bits":
      ctx.drawImage(img, 0, 0);
      eightBit(canvas, img, slider.value);
      etiqueta.textContent = `${filtro}: ${slider.value}%`;
      break;
  }
});


/*
Blanco y negro 
filter: brightness(70%) contrast(150%) saturate(0%) brightness(150%);

calor atardecer:
filter: sepia(50%) contrast(150%) saturate(200%) brightness(100%) hue-rotate(-15deg);


Efecto frio
filter: hue-rotate(180deg) sepia(75%) contrast(150%) saturate(300%) hue-rotate(180deg);


verde neon
filter: hue-rotate(-30deg) sepia(75%) contrast(150%) saturate(300%) hue-rotate(30deg);


*/ 