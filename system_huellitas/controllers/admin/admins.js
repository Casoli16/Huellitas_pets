const ADMINISTRADOR_API = 'services/admin/admins.php';

const SEARCH_FORM = document.getElementById('search_admin');
const TABLE_BODY = document.getElementById('tableBody'),
      ROWS_FOUND = document.getElementById('rowsFound');
const SAVE_MODAL = new bootstrap.Modal('#agregar_admin'),
      MODAL_TITLE = document.getElementById('modalTitle');

// Constante para estableces los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
      ID_ADMIN = document.getElementById('idAdministrador'),
      NOMBRE_ADMIN = document.getElementById('nombreAdmin'),
      APELLIDO_ADMIN = document.getElementById('apellidoAdmin'),
      CORREO_ADMIN = document.getElementById('correoAdmin'),
      ALIAS_ADMIN = document.getElementById('aliasAdmin'),
      CLAVE_ADMIN = document.getElementById('claveAdmin'),
      CONFIRMAR_CLAVE = document.getElementById('confirmarContraAdmin');

//Metodo del evento para cuando el documento ha cargago.
document.addEventListener("DOMContentLoaded", () => {
    //MAIN_TITLE.textContent = 'Administradores';
    fillTable();
});

SAVE_FORM.addEventListener('submit', async (event)=> {
    event.preventDefault();
    (ID_ADMIN.value) ? action = 'updateRow' : action = 'createRow';
    const FORM = new FormData(SAVE_FORM);
    const DATA = await fetchData(ADMINISTRADOR_API, action, FORM);

    if(DATA.status) {
        SAVE_MODAL.hide();
        sweetAlert(1, DATA.message, true);
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

const fillTable = async (form = null) =>{
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    (form) ? action = 'searchRows' : action = 'readAll';
    const  DATA = await fetchData(ADMINISTRADOR_API, action, form);

    if(DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
               <tr>
                    <td>${row.imagen_admin}</td>
                    <td>${row.nombre_admin}</td>
                    <td>${row.apellido_admin}</td>
                    <td>${row.correo_admin}</td> 
                    <td>${row.fecha_registro_admin}</td> 
                    <td>Permiso</td> 
                    <td>
                       <button type="button" class="btn btn-light">
                            <img src="../../resources/img/svg/info_icon.svg" width="33px">
                       </button>
                    </td>  
                    <td>
                       <button type="button" class="btn btn-light" onclick="openDelete(${row.id_admin})">
                            <img src="../../resources/img/svg/delete_icon.svg" width="35px">
                       </button>
                       <button type="button" class="btn btn-light" onclick="openUpdate(${row.id_admin})">
                            <img src="../../resources/img/svg/edit_icon.svg" width="35px">
                       </button>
                    </td>                                                  
            `;
        });
        ROWS_FOUND.textContent = DATA.message;
    } else{
        sweetAlert(4, DATA.error, true);
    }

}
