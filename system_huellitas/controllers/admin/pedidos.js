document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al span que contiene el texto del estado seleccionado
    const estadoSeleccionado = document.getElementById('estadoSeleccionado');

    // Función para manejar el clic en el botón "Completado"
    function handleCompletadoClick() {
        // Establecer el texto del estado seleccionado como "Completado"
        estadoSeleccionado.textContent = "Completado";
    }

    // Función para manejar el clic en el botón "Pendiente"
    function handlePendienteClick() {
        // Establecer el texto del estado seleccionado como "Pendiente"
        estadoSeleccionado.textContent = "Pendiente";
    }

    // Función para manejar el clic en el botón "Cancelado"
    function handleCanceladoClick() {
        // Establecer el texto del estado seleccionado como "Cancelado"
        estadoSeleccionado.textContent = "Cancelado";
    }

    // Agregar event listeners a los botones de opciones
    document.getElementById('completadooption').addEventListener('click', handleCompletadoClick);
    document.getElementById('pendienteoption').addEventListener('click', handlePendienteClick);
    document.getElementById('canceladooption').addEventListener('click', handleCanceladoClick);
});
