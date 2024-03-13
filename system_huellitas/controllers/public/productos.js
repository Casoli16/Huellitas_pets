document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencia al span que contiene el texto del estado seleccionado
    const marcas = document.getElementById('MarcaS');

    // Función para manejar el clic en el botón "Completado"
    function handleM1Click() {
        // Establecer el texto del estado seleccionado como "Completado"
        marcas.textContent = "Pedigree";
    }

    // Función para manejar el clic en el botón "Pendiente"
    function handleM2Click() {
        // Establecer el texto del estado seleccionado como "Pendiente"
        marcas.textContent = "Rufo";
    }

    // Función para manejar el clic en el botón "Cancelado"
    function handleM3Click() {
        // Establecer el texto del estado seleccionado como "Cancelado"
        marcas.textContent = "Dogui";
    }

    // Agregar event listeners a los botones de opciones
    document.getElementById('pedigreeoption').addEventListener('click', handleM1Click);
    document.getElementById('Rufooption').addEventListener('click', handleM2Click);
    document.getElementById('Doguioption').addEventListener('click', handleM3Click);
     // Obtener referencia al span que contiene el texto del estado seleccionado
     const estadoSeleccionado = document.getElementById('CategoriaS');

     // Función para manejar el clic en el botón "Completado"
     function handleCompletadoClick() {
         // Establecer el texto del estado seleccionado como "Completado"
         estadoSeleccionado.textContent = "Comida";
     }
 
     // Función para manejar el clic en el botón "Pendiente"
     function handlePendienteClick() {
         // Establecer el texto del estado seleccionado como "Pendiente"
         estadoSeleccionado.textContent = "Salud";
     }
 
     // Función para manejar el clic en el botón "Cancelado"
     function handleCanceladoClick() {
         // Establecer el texto del estado seleccionado como "Cancelado"
         estadoSeleccionado.textContent = "Entretenimiento";
     }
 
     // Agregar event listeners a los botones de opciones
     document.getElementById('comidaoption').addEventListener('click', handleCompletadoClick);
     document.getElementById('saludoption').addEventListener('click', handlePendienteClick);
     document.getElementById('entretemientooption').addEventListener('click', handleCanceladoClick);
});
