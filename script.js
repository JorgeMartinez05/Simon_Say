/*
 * Variables globales y estructura básica
*/
let secuencia = [];          // Almacena la secuencia generada por el juego
let secuenciaUsuario = [];   // Almacena la secuencia que ingresa el usuario
let ronda = 0;               // Contador de rondas
let nombreJugador = "";      // Nombre que ingresa el usuario en el formulario

// Bloquear clics mientras se reproduce la secuencia
let secuenciaEnProgreso = false;
// Flag para indicar que el juego ya terminó
let juegoTerminadoFlag = false;

/*
 * Referencias al DOM (sin listeners todavía)
*/
const menuPrincipal = document.getElementById("menuPrincipal");
const pantallaJuego = document.getElementById("pantallaJuego");
const formJugador = document.getElementById("formJugador");
const nombreInput = document.getElementById("nombreJugador");
const rondaActual = document.getElementById("rondaActual");
const bienvenida = document.getElementById("bienvenida");
const mensajeFin = document.getElementById("mensajeFin");

const btnVerPuntajes = document.getElementById("btnVerPuntajes");
const tablaPuntajes = document.getElementById("tablaPuntajes");
const btnCerrarPuntajes = document.getElementById("btnCerrarPuntajes");
const cuerpoPuntajes = document.getElementById("cuerpoPuntajes");

const btnVerde = document.getElementById("btnVerde");
const btnRojo = document.getElementById("btnRojo");
const btnAmarillo = document.getElementById("btnAmarillo");
const btnAzul = document.getElementById("btnAzul");

const btnReiniciar = document.getElementById("btnReiniciar");
const btnVolverMenu = document.getElementById("btnVolverMenu");

// Mostrará "Secuencia..." o "¡Tu turno!"
const labelTurno = document.getElementById("labelTurno");


/*
 * Sonido (beeps)
 */
// Beeps cortos
const sonidoBeep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");



/*
 * Listeners en botones de color
 */
btnVerde.addEventListener("click", () => manejarClickColor("verde"));
btnRojo.addEventListener("click", () => manejarClickColor("rojo"));
btnAmarillo.addEventListener("click", () => manejarClickColor("amarillo"));
btnAzul.addEventListener("click", () => manejarClickColor("azul"));

/*
* Listeners en formulario, reinicio y menú
*/
formJugador.addEventListener("submit", (e) => {
  e.preventDefault();
  nombreJugador = nombreInput.value.trim();
  if(nombreJugador){
    iniciarJuego();
  }
});

btnReiniciar.addEventListener("click", () => {
  iniciarLogica();
});
btnVolverMenu.addEventListener("click", () => {
  volverAlMenu();
});


/*
 * Ver y cerrar puntajes
 */
btnVerPuntajes.addEventListener("click", mostrarPuntajes);
btnCerrarPuntajes.addEventListener("click", () => {
  tablaPuntajes.classList.add("oculto");
});

/*
 * Funciones principales del juego
 */
function iniciarJuego(){
  // Ocultamos el menú, mostramos la pantalla de juego
  menuPrincipal.classList.add("oculto");
  pantallaJuego.classList.remove("oculto");

  // Mensaje de bienvenida con el nombre del jugador
  bienvenida.textContent = `Hola ${nombreJugador}, ¡vamos a jugar!`;

  // Inicia la parte lógica (rondas, secuencia, etc.)
  iniciarLogica();
}

function iniciarLogica(){
  secuencia = [];
  secuenciaUsuario = [];
  ronda = 0;
  mensajeFin.classList.add("oculto");

  // Reiniciamos flags
  secuenciaEnProgreso = false;
  juegoTerminadoFlag = false;

  siguienteRonda();
}

/* Genera la siguiente ronda y muestra la secuencia */
function siguienteRonda(){
  ronda++;
  rondaActual.textContent = ronda;

  const colores = ["verde","rojo","amarillo","azul"];
  const colorRandom = colores[Math.floor(Math.random() * colores.length)];
  secuencia.push(colorRandom);

  // Iniciamos la reproducción de la secuencia
  reproducirSecuencia();
}
/*
 * Reproducción de la secuencia
 */
function reproducirSecuencia(){
    secuenciaEnProgreso = true;      // Bloquea clics
    labelTurno.textContent = "Secuencia..."; // Indicamos en pantalla
  
    musicaSuspenso.currentTime = 0;
    musicaSuspenso.play().catch(err => {
      console.warn("No se pudo reproducir la música de suspenso:", err);
    });
  
    let i = 0;
    const intervalo = setInterval(() => {
      iluminarColor(secuencia[i]);
      i++;
      if(i >= secuencia.length){
        clearInterval(intervalo);
  
        // Detenemos la música
        musicaSuspenso.pause();
        musicaSuspenso.currentTime = 0;
  
        // Desbloqueamos clics
        secuenciaEnProgreso = false;
        labelTurno.textContent = "¡Tu turno!"; // Indicamos que ya puede jugar
  
        // Limpiamos la secuencia del usuario para la nueva ronda
        secuenciaUsuario = [];
      }
    }, 600);
  }
  
  /* Ilumina un color y reproduce un beep corto */
  function iluminarColor(color){
    const boton = document.getElementById(`btn${capitalizar(color)}`);
    const sonido = obtenerSonido(color);
  
    if(boton){
      boton.classList.add("activo");
      if(sonido){
        sonido.currentTime = 0;
        sonido.play().catch(err => console.warn("Error al reproducir beep:", err));
      }
      setTimeout(() => {
        boton.classList.remove("activo");
      }, 300);
    }
  }
  

  /* Retorna el beep  */
function obtenerSonido(color){
    // (aquí todos los colores usan el mismo beep: sonidoBeep)
    
    switch(color){
      case "verde":    return sonidoBeep;
      case "rojo":     return sonidoBeep;
      case "amarillo": return sonidoBeep;
      case "azul":     return sonidoBeep;
      default:         return null;
    }
  }
  
  /*
   * Manejo de clic del usuario
   */
  function manejarClickColor(color){
    // Bloqueamos clic si:
    // 1) la secuencia sigue en progreso
    // 2) el juego ya terminó
    if(secuenciaEnProgreso || juegoTerminadoFlag){
      return;
    }
  
    // Agregamos el color que el usuario presionó
    secuenciaUsuario.push(color);
    iluminarColor(color);
  
    // Verificamos de inmediato el color ingresado
    const idx = secuenciaUsuario.length - 1;
    if(secuenciaUsuario[idx] !== secuencia[idx]){
      juegoTerminado();
      return;
    }
  
    // Si el usuario completó la secuencia sin error
    if(secuenciaUsuario.length === secuencia.length){
      setTimeout(() => {
        siguienteRonda();
      }, 800);
    }
  }
  
  /*
   * Fin del juego y puntajes
   */
  function juegoTerminado(){
    juegoTerminadoFlag = true;         
    mensajeFin.classList.remove("oculto");
    labelTurno.textContent = "¡Fallaste!";
  
    // Puntaje = ronda - 1
    guardarPuntaje(nombreJugador, ronda - 1);
  }
  
  function guardarPuntaje(nombre, puntaje){
    let puntajes = JSON.parse(localStorage.getItem("puntajesSimon")) || [];
    let registro = puntajes.find(p => p.nombre === nombre);
  
    if(registro){
      if(puntaje > registro.puntaje){
        registro.puntaje = puntaje;
      }
    } else {
      puntajes.push({ nombre, puntaje });
    }
    localStorage.setItem("puntajesSimon", JSON.stringify(puntajes));
  }
  /*
 * Mostrar y cerrar puntajes
 */
function mostrarPuntajes(){
    cuerpoPuntajes.innerHTML = "";
    let puntajes = JSON.parse(localStorage.getItem("puntajesSimon")) || [];
    // Ordenamos desc
    puntajes.sort((a,b) => b.puntaje - a.puntaje);
  
    puntajes.forEach(p => {
      const fila = document.createElement("tr");
      const tdNombre = document.createElement("td");
      const tdPuntaje = document.createElement("td");
      tdNombre.textContent = p.nombre;
      tdPuntaje.textContent = p.puntaje;
      fila.appendChild(tdNombre);
      fila.appendChild(tdPuntaje);
      cuerpoPuntajes.appendChild(fila);
    });
    tablaPuntajes.classList.remove("oculto");
  }
  
  /*
   * Navegación
   */
  function volverAlMenu(){
    pantallaJuego.classList.add("oculto");
    menuPrincipal.classList.remove("oculto");
  }
  
  /*
   * Auxiliar
   */
  function capitalizar(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  