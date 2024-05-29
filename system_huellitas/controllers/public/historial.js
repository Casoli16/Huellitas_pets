const CLIENTES_API = 'services/public/clientes.php';
const HISTORIAL = document.getElementById('historialContainer');

// Método del evento para cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", () => {
    loadTemplate();
    fillHistorial();
});

const fillHistorial = async () => {
    const DATA = await fetchData(CLIENTES_API, 'readHistorial');

    if (DATA.status) {
        HISTORIAL.innerHTML = '';
        DATA.dataset.forEach(row => {
            HISTORIAL.innerHTML += `
                <h5><b>${row.fecha_registro}</b></h5>
                <div class="row py-3">
                    <div class="col-1 py-2">
                        <img class="image-fluid" src="../../resources/img/png/historial_compra_img.png" alt="">
                    </div>
                    <div class="col-12 col-lg-10">
                        <div class="row">
                            <div class="col-9 col-lg-11 py-3">
                                <h6><b>${row.nombre_producto}</b></h6>
                                <div class="row">
                                    <div class="col-8 col-lg-4">
                                        <p class="fs-6">Cantidad: ${row.cantidad_detalle_pedido} Unidades</p>
                                    </div>
                                    <div class="col-8 col-lg-4 ">
                                        <p class="fs-6">Precio Individual: $${row.precio_individual}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-3 col-lg-1">
                                <h5 class="py-4"><b>$${row.precio_detalle_pedido}</b></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            `;
        });
    } else {
        alert('Error: ' + DATA.error);
    }
};