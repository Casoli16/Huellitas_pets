<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once ('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once ('../../models/data/pedidos_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report();
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Sus ventas y la predicción para el siguiente mes');
$URL = 'http://localhost/Huellitas_pets/system_huellitas/api/';

// Se instancia el modelo pedidos para obtener los datos.
$pedidos = new PedidosData();

// Descripción del reporte
$pdf->setFont('Arial', '', 11);
$pdf->write(6, $pdf->encodeString('A continuación se mostrará una gráfica con sus pedidos actuales a nivel mensual. La certeza de la predicción aumentará en su posibilidad de certeza mientras más meses transcurran con ventas.'));

// Espacio
$pdf->ln(15);

// Obtener el nombre de la imagen y los datos
$imagen = $pedidos->getReporteImagen();
//$datos = $pedidos->setReporteDatos();

// Se establece un color de relleno para los encabezados.
$pdf->setFillColor(248, 225, 108);

// Se imprimen los items
$pdf->setFont('Arial', '', 9);
$pdf->write(6, $pdf->encodeString('Gráfica de su siguiente mes según la predicción.'));

// Se establece la fuente para los datos de la tabla.

$pdf->image($URL . 'images/graphics/' . $_GET['imagen'], 19, 98, 175, 56);

$pdf->ln(80);
$pdf->setFont('Arial', '', 11);
$pdf->write(6, $pdf->encodeString('Analisis.'));
// Se establece un color de relleno para los encabezados.
$pdf->setFillColor(248, 225, 108);


// Se establece la fuente para los datos de la tabla.
$pdf->ln(80);
$pdf->ln(10);
$pdf->setFont('Arial', '', 9);
//$pdf->write(6, $pdf->encodeString($_GET['analisis']));
//Validator::deleteFile($URL . 'images/graphics/',  $_GET['imagen']);
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'pedidos.pdf');
unlink($URL . 'images/graphics/' . $_GET['imagen']);