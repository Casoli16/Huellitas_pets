document.addEventListener('DOMContentLoaded', async() => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
} );


/*
// Código de Francisco para las estrellas
const stars = document.querySelectorAll('.star');

stars.forEach(function(star, producto){
    star.addEventListener('click', function(){
        for (let i=0; i<=producto; i++){
            stars[i].classList.add('checked');
        }  
        for (let i=producto+1; i<stars.length; i++){
            stars[i].classList.remove('checked');
        }        
    })
})
*/ 