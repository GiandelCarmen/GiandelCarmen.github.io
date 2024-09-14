// script.js

// Función para mostrar una alerta cuando el formulario se envía
function handleSubmit(event) {
    // Previene el envío real del formulario
    event.preventDefault();

    // Muestra una alerta
    alert('Formulario enviado.');
}

// Agrega el evento al formulario cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', handleSubmit);
});
