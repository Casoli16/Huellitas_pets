// CONTROLADOR GENERAL DE TODAS LAS PAGINAS WEB

const SERVER_URL = 'http://localhost/Huellitas_pets/system_huellitas/api/';

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


//  Función asíncrona para intercambiar datos con el servidor.
//  Parámetros: filename (nombre del archivo), action (accion a realizar) y form (objeto opcional con los datos que serán enviados al servidor).
//  Retorno: constante tipo objeto con los datos en formato JSON.
const fetchData = async(filename, action, form = null) => {
    const OPTIONS = {};
    if (form) {
        OPTIONS.method = 'post';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'get';
    }
    try {
        const PATH = new URL(SERVER_URL + filename);
        PATH.searchParams.append('action', action);
        const RESPONSE = await fetch(PATH.href, OPTIONS);
        return await RESPONSE.json();
    } catch (error){
        console.log(error);
    }
}

const chart = document.getElementById('myChart');

new Chart(chart, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
            backgroundColor: 'rgb(249, 87, 56)'
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
