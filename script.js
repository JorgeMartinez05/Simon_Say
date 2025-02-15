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