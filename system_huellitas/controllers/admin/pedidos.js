// Obtener referencias a los elementos relevantes
const dropdownItems = document.querySelectorAll('.dropdown-item');
const estadoSeleccionado = document.getElementById('estadoSeleccionado');

// Iterar sobre cada elemento del menú desplegable y agregar un event listener
dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
        // Obtener el texto de la opción seleccionada
        const textoSeleccionado = this.textContent;
        
        // Actualizar el contenido del párrafo con el texto seleccionado
        estadoSeleccionado.textContent = textoSeleccionado;
        console.log(textoSeleccionado);
        console.log('ola');
    });
});
