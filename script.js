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