const CLIENTES_API = 'services/public/clientes.php';

const CLIENTE_IMAGE = document.getElementById('imagen');

const CLIENTE_NAME = document.getElementById('nombreCliente'),
    CLIENTE_TELEFONO = document.getElementById('telefonoCliente'),
    CLIENTE_CORREO = document.getElementById('correoCliente'),
    CLIENTE_DIRECCION = document.getElementById('direccionCliente'),
    CLIENTE_FECHA_REGISTRO =  document.getElementById('fechaInicioCliente'),

    CLIENTE_DUI = document.getElementById('duiCliente');

// Método del evento para cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () =>{
    loadTemplate();
    
    getData();
})

const getData = async (form = null) => {
    //Peticion a nuestra api para obtener info del usuario logeado
    const DATA = await fetchData(CLIENTES_API, 'readProfile');
    //Verifica si la respuesta fue satisfactoria, si no manda un mensaje de error.
    if (DATA.status) {
        const ROW = DATA.dataset;
        //Manda el nombre del usuario.
        CLIENTE_NAME.textContent = ROW.nombre_cliente;
        //Manda la imagen del usuario.
        CLIENTE_IMAGE.src = SERVER_URL + 'images/clientes/' + ROW.imagen_cliente;
        //Manda el correo del usuario.
        CLIENTE_CORREO.textContent = ROW.correo_cliente;
        //Manda el DUI del usuario.
        CLIENTE_DUI.textContent = ROW.dui_cliente;
        //Manda el teléfono del usuario.
        CLIENTE_TELEFONO.textContent = ROW.telefono_cliente;
        //Manda el teléfono del usuario.
        CLIENTE_DIRECCION.textContent = ROW.telefono_cliente;
        //Manda la fecha en que se registro el usuario.
        CLIENTE_FECHA_REGISTRO.textContent = ROW.fecha_registro;
    } else {
        sweetAlert(2, DATA.error, true);
    }
}