document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencia al span que contiene el texto del estado seleccionado
    const estadoSeleccionado = document.getElementById('estadoSeleccionado1');

    // Función para manejar el clic en el botón "Completado"
    function handleCompletadoClick() {
        // Establecer el texto del estado seleccionado como "Completado"
        estadoSeleccionado.textContent = "Activo";
    }

    // Función para manejar el clic en el botón "Pendiente"
    function handlePendienteClick() {
        // Establecer el texto del estado seleccionado como "Pendiente"
        estadoSeleccionado.textContent = "Inactivo";
    }


    // Agregar event listeners a los botones de opciones
    document.getElementById('Activoooption').addEventListener('click', handleCompletadoClick);
    document.getElementById('Pendienteeoption').addEventListener('click', handlePendienteClick);
});
