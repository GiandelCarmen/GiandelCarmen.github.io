// script.js

// Obtiene los elementos del contador, botón, mensaje y cuenta regresiva
const countElement = document.getElementById('count');
const incrementButton = document.getElementById('incrementButton');
const messageElement = document.getElementById('message');
const countdownElement = document.getElementById('countdown');

// Intervalo de tiempo en milisegundos (5 minutos)
const interval = 5 * 60 * 1000;

// Obtiene el valor actual del contador desde el almacenamiento local o inicializa en 0
let count = parseInt(localStorage.getItem('waterCount')) || 0;

// Obtiene la última vez que se hizo clic en el botón desde el almacenamiento local
let lastClickTime = parseInt(localStorage.getItem('lastClickTime')) || 0;

// Obtiene la fecha del último reinicio desde el almacenamiento local
let lastResetDate = localStorage.getItem('lastResetDate');

// Obtiene la fecha actual
const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

// Mensajes personalizados
const messages = [
    "Sigue tomando agua o estás estreñido.",
    "Ya está aflojando.",
    "¡Genial, tu poto está feliz!",
    "¡Oe, tanto!",
    "¡Qué cagón eres!"
];

// Inicializa la interfaz al cargar la página
function initialize() {
    // Verifica si es un nuevo día y reinicia el contador si es necesario
    if (lastResetDate !== today) {
        count = 0;
        localStorage.setItem('waterCount', count);
        lastResetDate = today;
        localStorage.setItem('lastResetDate', lastResetDate);
        incrementButton.textContent = 'He tomado agua'; // Texto inicial del botón
        incrementButton.disabled = false; // Habilita el botón
    }

    updateCount();
    updateButtonState();
}

// Actualiza la interfaz con el valor actual del contador
function updateCount() {
    countElement.textContent = count;
    // Muestra el mensaje basado en el número de veces que se ha presionado el botón
    if (count > 0 && count <= messages.length) {
        messageElement.textContent = messages[count - 1];
    } else if (count > messages.length) {
        messageElement.textContent = messages[messages.length - 1];
    }

    // Cambia el texto del botón cuando el contador llegue a 10
    if (count >= 7) {
        incrementButton.textContent = 'Regrese mañana';
        incrementButton.disabled = true;
    }
}

// Calcula el tiempo restante y actualiza el contador de cuenta regresiva
function updateCountdown() {
    const now = Date.now();
    const timePassed = now - lastClickTime;
    const timeRemaining = Math.max(interval - timePassed, 0);
    const remainingMinutes = Math.floor(timeRemaining / (60 * 1000));
    const remainingSeconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
    
    if (timeRemaining > 0) {
        countdownElement.textContent = `Tiempo restante: ${remainingMinutes}m ${remainingSeconds}s`;
    } else {
        countdownElement.textContent = '';
    }
}

// Actualiza el estado del botón y el mensaje basado en el tiempo transcurrido
function updateButtonState() {
    const now = Date.now();
    if (now - lastClickTime < interval && count < 7) {
        // Desactiva el botón si no ha pasado el intervalo de tiempo
        incrementButton.disabled = true;
        updateCountdown();
    } else if (count < 7) {
        // Habilita el botón si ha pasado el intervalo de tiempo
        incrementButton.disabled = false;
        countdownElement.textContent = '';
    }
}

// Incrementa el contador y guarda el valor en el almacenamiento local
function incrementCount() {
    // Solo incrementa el contador si el botón está habilitado
    if (!incrementButton.disabled && count < 7) {
        count++;
        localStorage.setItem('waterCount', count);
        lastClickTime = Date.now();
        localStorage.setItem('lastClickTime', lastClickTime);
        updateCount();
        updateButtonState();
    }
}

// Añade un evento al botón para incrementar el contador al hacer clic
incrementButton.addEventListener('click', incrementCount);

// Inicializa la interfaz al cargar la página
initialize();

// Configura un intervalo para verificar el estado del botón cada segundo
setInterval(updateButtonState, 1000);
