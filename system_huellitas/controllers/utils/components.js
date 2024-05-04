// CONTROLADOR GENERAL DE TODAS LAS PAGINAS WEB

const SERVER_URL = 'http://localhost/Huellitas_pets/system_huellitas/api/';

// Funcion para mostrar un mensaje de confirmacion.
const confirmAction = (message) => {
    return swal({
        title: 'Advertencia',
        text: message,
        icon: 'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: false,
                visible: true
            },
            confirm: {
                text: 'Sí',
                value: true,
                visible: true
            }
        }
    });
}

// funcion para manejar los mensajes de notificacion al usuario.

const sweetAlert = async (type, text, timer, url = null) => {
    switch (type) {
        case 1:
            title = 'Éxito';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error'
            break;
        case 3:
            title = 'Advertencia';
            icon = 'info'
    }

    let option =  {
        title: title,
        text: text,
        icon: icon,
        closeOnClickOutside: false,
        closeOnEsc: false,
        button: {
            text: 'Aceptar'
        }
    };

    //Se verifica que el timer tiene un valor true, de ser asi entonces le asigna el valor de 3000, de ser false sera null
    (timer) ? option.timer = 3000 : option.timer = null;
    //Espera a que termine de realizar la accion para finalmente mostrar el mensaje
    await swal(option);
    (url) ? location.href = url : undefined;
}

/*
*   Función asíncrona para cargar las opciones en un select de formulario.
*   Parámetros: filename (nombre del archivo), action (acción a realizar), select (identificador del select en el formulario) y selected (dato opcional con el valor seleccionado).
*   Retorno: ninguno.
*/
const fillSelect = async (filename, action, select, selected = null) => {
    // Petición para obtener los datos.
    const DATA = await fetchData(filename, action);
    let content = '';
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
    if (DATA.status) {
        content += '<option value="" selected>Seleccione una opción</option>';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se obtiene el dato del primer campo.
            value = Object.values(row)[0];
            // Se obtiene el dato del segundo campo.
            text = Object.values(row)[1];
            // Se verifica cada valor para enlistar las opciones.
            if (value != selected) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option>No hay opciones disponibles</option>';
    }
    // Se agregan las opciones a la etiqueta select mediante el id.
    document.getElementById(select).innerHTML = content;
}


//Funcion para los graficos.

// const chart = document.getElementById('myChart');
//
// new Chart(chart, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             borderWidth: 1,
//             backgroundColor: 'rgb(249, 87, 56)'
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

// Funcion para cerrar la sesion del admin.
const logOut = async () => {
    const RESPONSE = await confirmAction('¿Está seguro que desea cerrar sesión?');

    if(RESPONSE) {
        // Peticion para eliminar la sesion
        const DATA = await fetchData(USER_API, 'logOut');
        //Si la respuesta es buena entonces mostrara un mensaje de exito y redijira al index.html
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.exception, false);
        }
    }
}

//  Función asíncrona para intercambiar datos con el servidor.
//  Parámetros: filename (nombre del archivo), action (accion a realizar) y form (objeto opcional con los datos que serán enviados al servidor).
//  Retorno: constante tipo objeto con los datos en formato JSON.
const fetchData = async (filename, action, form = null) => {
    // Se define una constante tipo objeto para establecer las opciones de la petición.
    const OPTIONS = {};
    // Se determina el tipo de petición a realizar.
    if (form) {
        OPTIONS.method = 'post';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'get';
    }
    try {
        // Se declara una constante tipo objeto con la ruta específica del servidor.
        const PATH = new URL(SERVER_URL + filename);
        // Se agrega un parámetro a la ruta con el valor de la acción solicitada.
        PATH.searchParams.append('action', action);
        // Se define una constante tipo objeto con la respuesta de la petición.
        const RESPONSE = await fetch(PATH.href, OPTIONS);
        // Se retorna el resultado en formato JSON.
        const DATA = await RESPONSE.json();
        return DATA;
    } catch (error) {
        // Se muestra un mensaje en la consola del navegador web cuando ocurre un problema.
        console.log(error);
    }
}


