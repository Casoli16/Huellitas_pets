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

    let option = {
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
*   Función asíncrona para cargar las opciones en un select de formulario, en caso de que la lista sea estatica.
*   Parámetros: textlist (Lista de opciones), select (id del select), selected (dato opcional con el valor seleccionado).
*   Retorno: ninguno.
*/

const fillSelectStatic = (textList, select, selectedText = null) => {
    let content = '';

    // Comprobamos si la lista de textos está vacía.
    if (textList.length === 0) {
        content += '<option>No hay opciones disponibles</option>';
    } else {
        // Recorremos la lista de textos y generamos las opciones del select.
        textList.forEach(text => {
            // El valor y el texto serán iguales.
            const value = text;
            // Verificamos si esta opción debe estar seleccionada.
            if (value !== selectedText) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    }

    // Agregamos las opciones al elemento select mediante su id.
    document.getElementById(select).innerHTML = content;
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


/*
*   Función asíncrona para cargar las opciones en un select de formulario.
*   Parámetros: filename (nombre del archivo), action (acción a realizar), select (identificador del select en el formulario) y selected (dato opcional con el valor seleccionado).
*   Retorno: ninguno.
*/
const fillSelectPost = async (filename, action, form, select, selected = null) => {
    // Petición para obtener los datos.
    const DATA = await fetchData(filename, action, form);
    console.log(DATA);
    let content = '';
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
    if (DATA.status) {
        content += '<option value="0" selected>Seleccione una opción</option>';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se obtiene el dato del primer campo.
            value = Object.values(row)[0];
            // Se obtiene el dato del segundo campo.
            text = Object.values(row)[3];
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
    console.log(content);
    console.log(select);
    // Se agregan las opciones a la etiqueta select mediante el id.
    document.getElementById(select).innerHTML = content;
}

// /*
// *   Función para mostrar la opcion seleccionada de un formulario en base a opciones ya predefinidas.
// *   Parámetros: selectedElement (identificar el id del select en el forms), valueToSelect (Opcion que queremos mostrar en el select, comparara si esta opcion se encuentra en el select).
// *   Retorno: ninguno.
// */
function preselectOption(selectElement, valueToSelect) {
    // Seleccionar el elemento select
    const select = document.getElementById(selectElement);

    // Recorrer las opciones del select
    for (const option of select.options) {
        if (option.value === valueToSelect) {
            // Seleccionar la opción coincidente
            option.selected = true;

            // Si hay un input asociado, asignar el valor seleccionado
            const associatedInput = document.getElementById(`${selectElement}-input`);
            if (associatedInput) {
                associatedInput.value = valueToSelect;
            }
            break; // Detener el bucle una vez encontrada la opción
        }
    }
}


// Funcion para cerrar la sesion del admin.
const logOut = async () => {
    const RESPONSE = await confirmAction('¿Está seguro que desea cerrar sesión?');

    if (RESPONSE) {
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


/*
*   Función para generar un gráfico de barras verticales.
*   Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), xAxis (datos para el eje X), yAxis (datos para el eje Y), legend (etiqueta para los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/

// Variable que guardara la grafica que se cree
let graph = null;
const barGraph = (canvas, xAxis, yAxis, legend, title) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    //Verifica si la variable graph cuenta con una grafica previamente creada, si es si entonces la va destruir
    if (graph) {
        graph.destroy();
    }

    // Vuelve a guardar la nueva grafica en la variable graph
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    graph = new Chart(document.getElementById(canvas), {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            }
        }
    });
}