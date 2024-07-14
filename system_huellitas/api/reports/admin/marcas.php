<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/marcas_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report();
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Cantidad de productos por marcas');
// Se instancia el módelo marca para obtener los datos.
$marcas = new MarcasData();
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if($dataMarcas = $marcas->productsByMarcas()){
    //Descripcion del reporte
    $pdf->setFont('Arial', '', 11);
    $pdf->write(6, $pdf->encodeString('A continuación se podrán observar las marcas asociadas que estan siendo utitlizadas y la cantidad de productos correspondiente a cada marca.'));

    //Espacio
    $pdf->ln(15);

    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(248, 225, 108);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);

    // Se imprimen las celdas con los encabezados.
    $pdf->cell(120, 10, 'Marca', 1, 0, 'C', 1);
    $pdf->cell(66, 10, 'Cantidad de productos', 1, 1, 'C', 1);


    // Se establece la fuente para los datos de la tabla.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataMarcas as $rowMarcas){
    // Se imprime una celda con el nombre de la categoría.
    $pdf->cell(120, 10, $pdf->encodeString($rowMarcas['marca']), 1, 0, 'C');
    $pdf->cell(66, 10, $pdf->encodeString($rowMarcas['cantidad_total_productos']), 1, 1, 'C');
    }
    //Espacio
    $pdf->ln(8);

    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 12);

    $pdf->write(6, $pdf->encodeString('Marca con más productos'));
    $pdf->ln(9);

    //Data para saber la marca con mas productos
    $dataMarcasProductos = $marcas->marca_con_mas_productos();
    $rowMarcaProducto = $dataMarcasProductos;

    //Celda 1
    $pdf->setFillColor(238, 150, 75);
    $pdf->setTextColor(255, 255, 255 );
    $pdf->cell(70, 10, $pdf->encodeString($rowMarcaProducto['marca']), 1, 0, 'C', 1);

    //Celda 2
    $pdf->setFillColor(251, 222, 197);
    $pdf->setTextColor(176, 93, 0 );
    $pdf->cell(120, 10, $pdf->encodeString($rowMarcaProducto['cantidad_total_productos']. ' productos'), 1, 1, 'C', 1);

    //Text
    $pdf->setFont('Arial', '', 11);
    $pdf->setTextColor(0, 0, 0 );
    $pdf->write(10, $pdf->encodeString('Tiene un total de '. $rowMarcaProducto['cantidad_total_productos']. ' productos, conviertiéndola en la marca con más productos en Huellitas Pets.'));

} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay marcas para mostrar'), 1, 1);
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'Marcas.pdf');