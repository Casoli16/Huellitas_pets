<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/cupones_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report();
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Cantidad de veces que se han utilizado sus cupones');
// Se instancia el módelo marca para obtener los datos.
$cupones = new CuponesData();
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if($dataCupones = $cupones->readReport()){
    //Descripcion del reporte
    $pdf->setFont('Arial', '', 11);
    $pdf->write(6, $pdf->encodeString('A continuación observará los cupones y las veces que han sido utilizadas, si sus cupones no los ha utilizado nadie, no se mostrará nada.'));

    //Espacio
    $pdf->ln(15);

    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(248, 225, 108);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);

    // Se imprimen las celdas con los encabezados.
    $pdf->cell(120, 10, 'Cupones', 1, 0, 'C', 1);
    $pdf->cell(66, 10, 'Veces utilizadas', 1, 1, 'C', 1);


    // Se establece la fuente para los datos de la tabla.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataCupones as $rowCupones){
    // Se imprime una celda con el nombre de la categoría.
    $pdf->cell(120, 10, $pdf->encodeString($rowCupones['codigo_cupon']), 1, 0, 'C');
    $pdf->cell(66, 10, $pdf->encodeString($rowCupones['cantidad_utilizado']), 1, 1, 'C');
    }
    
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay cupones para mostrar'), 1, 1);
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'cupones.pdf');