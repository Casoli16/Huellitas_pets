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

// Obtener el arreglo y pasarlo de cadena de texto a arreglo
$arreglodescode = $_GET['ventas'];
$ventas = json_decode($arreglodescode, true);

// Calcular el porcentaje de cambio
$porcentajeCambio = abs(($ventas[1] - $ventas[0]) / $ventas[0] * 100);
$porcentajeCambio = number_format($porcentajeCambio, 2, '.', '');

if ($ventas[0] < $ventas[1]) {
    $tipo = 'crecimiento';
    if ($porcentajeCambio >= 5) {
        $gravedad = ' un gran ';
        $analisis = ' por lo que se recomienda seguir con la misma estrategia de ventas';
        $newPorcentaje = ' del ' . $porcentajeCambio . '%, ';
    } else {
        $gravedad = ' un leve ';
        $analisis = ' por lo que se recomienda mejorar la estrategia de ventas';
        $newPorcentaje = ' del ' . $porcentajeCambio . '%, ';
    }
} elseif ($ventas[0] > $ventas[1]) {
    $tipo = 'decrecimiento';
    if ($porcentajeCambio <= -5) {
        $analisis = ' por lo que se recomienda cambiar la estrategia de ventas';
        $gravedad = ' un gran ';
        $newPorcentaje = ' del ' . $porcentajeCambio . '%, ';
    } else {
        $analisis = ' por lo que se recomienda mantener o mejorar la estrategia de ventas';
        $gravedad = ' un leve ';
        $newPorcentaje = ' del ' . $porcentajeCambio . '%, ';
    }
} else {
    $analisis = ' por lo que se recomienda seguir con la misma estrategia de ventas';
    $tipo = 'estabilidad';
    $gravedad = '';
    $newPorcentaje = '';
}

// Se establece un color de relleno para los encabezados.
$pdf->setFillColor(248, 225, 108);

// Se imprimen los items
$pdf->setFont('Arial', 'B', 10);
$pdf->write(6, $pdf->encodeString('Gráfica de su siguiente mes según la predicción.'));

// Se establece la fuente para los datos de la tabla.

$pdf->image($URL . 'images/graphics/' . $_GET['imagen'], 19, 98, 175, 56);

$pdf->ln(80);
$pdf->setFont('Arial', 'B', 11);
$pdf->write(6, $pdf->encodeString('Analisis.'));
// Se establece un color de relleno para los encabezados.
$pdf->setFillColor(248, 225, 108);
$pdf->ln(10);
$pdf->setFont('Arial', '', 10);
$pdf->write(6, $pdf->encodeString('Sus resultados en ventas del mes actual fueron de ' . $ventas[0] . ' pedidos y se predice que el siguiente mes serán ' . $ventas[1] . ' pedidos.'));
$pdf->ln(7);
$pdf->setFont('Arial', '', 10);
$pdf->write(6, $pdf->encodeString('Se estima que sus ventas tendrán'. $gravedad . $tipo . $newPorcentaje . $analisis . '. Recuerde considerar que sus ventas pueden ser influenciadas por festividades u otras circunstancias.'));
//$pdf->write(6, $pdf->encodeString($_GET['analisis']));
//Validator::deleteFile($URL . 'images/graphics/',  $_GET['imagen']);
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'pedidos.pdf');
unlink($URL . 'images/graphics/' . $_GET['imagen']);
