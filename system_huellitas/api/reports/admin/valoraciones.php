<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/valoraciones_data.php');

try {
    // Se instancia la clase para crear el reporte.
    $pdf = new Report();
    // Se inicia el reporte con el encabezado del documento.
    $pdf->startReport('Conteo total de valoraciones');
    // Se instancia el modelo de valoraciones para obtener los datos.
    $valoraciones = new ValoracionesData();

    // Verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
    $dataValoraciones = $valoraciones->readConteoValoraciones();
    if ($dataValoraciones === false) {
        throw new Exception('Error al obtener los datos de valoraciones.');
    }

    // Descripción del reporte
    $pdf->setFont('Arial', '', 11);
    $pdf->write(6, $pdf->encodeString('A continuación, se podrán observar el total de cada calificación que tienen las valoraciones de los productos.'));

    // Espacio
    $pdf->ln(15);

    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(228, 205, 88);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 10);

    // Se imprimen las celdas con los encabezados.
    $pdf->cell(50, 10, 'Nombre del producto', 1, 0, 'C', 1);
    $pdf->cell(40, 10, 'Total de valoraciones', 1, 0, 'C', 1);
    $pdf->cell(20, 10, '5 Est.', 1, 0, 'C', 1);
    $pdf->cell(20, 10, '4 Est.', 1, 0, 'C', 1);
    $pdf->cell(20, 10, '3 Est.', 1, 0, 'C', 1);
    $pdf->cell(20, 10, '2 Est.', 1, 0, 'C', 1);
    $pdf->cell(20, 10, '1 Est.', 1, 1, 'C', 1);

    // Se establece la fuente para los datos de la tabla.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataValoraciones as $rowValoraciones) {
        // Guardar la posición actual X y Y
        $xPos = $pdf->GetX();
        $yPos = $pdf->GetY();

        // Guardar posición X y Y para el nombre del producto
        $xPosProducto = $xPos;
        $yPosProducto = $yPos;

        // Ajustar posición X y Y para el nombre del producto y calcular la altura
        $pdf->MultiCell(50, 8, $pdf->encodeString($rowValoraciones['nombre_producto']), 1, 'C');

        // Guardar posición Y actual después del nombre del producto
        $yPosProductoEnd = $pdf->GetY();

        // Calcular la altura de la celda basada en el nombre del producto
        $cellHeight = $yPosProductoEnd - $yPosProducto;

        // Ajustar posición X y Y para las demás celdas de la fila
        $pdf->SetXY($xPos + 50, $yPos);
        $pdf->Cell(40, $cellHeight, $pdf->encodeString($rowValoraciones['total_valoraciones']), 1, 0, 'C');
        $pdf->Cell(20, $cellHeight, $pdf->encodeString($rowValoraciones['calif_5']), 1, 0, 'C');
        $pdf->Cell(20, $cellHeight, $pdf->encodeString($rowValoraciones['calif_4']), 1, 0, 'C');
        $pdf->Cell(20, $cellHeight, $pdf->encodeString($rowValoraciones['calif_3']), 1, 0, 'C');
        $pdf->Cell(20, $cellHeight, $pdf->encodeString($rowValoraciones['calif_2']), 1, 0, 'C');
        $pdf->Cell(20, $cellHeight, $pdf->encodeString($rowValoraciones['calif_1']), 1, 1, 'C');

        // Verificar si se necesita agregar una nueva página antes de continuar con las filas siguientes
        if ($pdf->getY() > 250) { // 250 es un valor aproximado, ajusta según tus necesidades
            $pdf->AddPage();
            // Agregar encabezados nuevamente después de añadir una nueva página
            $pdf->SetFont('Arial', 'B', 11);
            $pdf->Cell(50, 10, 'Nombre del producto', 1, 0, 'C', true);
            $pdf->Cell(40, 10, 'Total de valoraciones', 1, 0, 'C', true);
            $pdf->Cell(20, 10, '5 Est.', 1, 0, 'C', true);
            $pdf->Cell(20, 10, '4 Est.', 1, 0, 'C', true);
            $pdf->Cell(20, 10, '3 Est.', 1, 0, 'C', true);
            $pdf->Cell(20, 10, '2 Est.', 1, 0, 'C', true);
            $pdf->Cell(20, 10, '1 Est.', 1, 1, 'C', true);
        }
    }

    // Espacio
    $pdf->ln(8);

    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 12);

    $pdf->write(6, $pdf->encodeString('Producto más comentado por la comunidad'));
    $pdf->ln(9);

    // Data para saber el producto con más valoraciones
    $dataValoracionesProductos = $valoraciones->readProductosMasValoraciones();
    if ($dataValoracionesProductos === false) {
        throw new Exception('Error al obtener los datos de productos más valorados.');
    }

    $rowValoracionesProductos = $dataValoracionesProductos;

    // Celda 1
    $pdf->setFillColor(238, 150, 75);
    $pdf->setTextColor(255, 255, 255);
    $pdf->cell(70, 10, $pdf->encodeString($rowValoracionesProductos['nombre_producto']), 1, 0, 'C', 1);

    // Celda 2
    $pdf->setFillColor(251, 222, 197);
    $pdf->setTextColor(176, 93, 0);
    $pdf->cell(120, 10, $pdf->encodeString($rowValoracionesProductos['total_valoraciones'] . ' Valoraciones'), 1, 1, 'C', 1);

    // Texto con negrita en el porcentaje de calificación
    $pdf->setFont('Arial', '', 11);
    $pdf->setTextColor(0, 0, 0);
    $pdf->write(10, $pdf->encodeString('El producto posee ' . $rowValoracionesProductos['total_valoraciones'] . ' valoraciones. Teniendo el promedio de calificación de '));

    // Cambia a negrita para el promedio de calificación
    $pdf->setFont('Arial', 'B', 11);
    $pdf->write(10, $pdf->encodeString($rowValoracionesProductos['promedio_calificacion']));

    // Restaura la fuente a normal
    $pdf->setFont('Arial', '', 11);
    $pdf->write(10, $pdf->encodeString(' de nota.'));

    // Se llama implícitamente al método footer() y se envía el documento al navegador web.
    $pdf->output('I', 'Cantidad de productos por marcas.pdf');
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
