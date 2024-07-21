<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report();

// Se verifica si existe un valor para el producto, de lo contrario se muestra un mensaje.
if (isset($_GET['idProducto'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/productos_data.php');
    require_once('../../models/data/valoraciones_data.php');
    $URL ='http://localhost/Huellitas_pets/system_huellitas/api/';

    // Se instancian las entidades correspondientes.
    $productos = new productosData();
    $valoraciones = new ValoracionesData();

    // Se establece el valor del producto, de lo contrario se muestra un mensaje.
    if ($productos->setIdProducto($_GET['idProducto']) && $valoraciones->setIdProducto($_GET['idProducto'])) {
        // Se verifica si el producto existe, de lo contrario se muestra un mensaje.
        if ($rowProducto = $productos->readOne()) {

            foreach ($rowProducto as $item1){
                // Se inicia el reporte con el encabezado del documento.
                $pdf->startReport('Valoraciones del producto: ' . $item1['nombre_producto']);
                $pdf->ln(5);
                $pdf->image("${URL}images/productos/{$item1['imagen_producto']}", 90, 63, 35, 30);
                $pdf->ln(28);
                break;
            }

            // Se verifica si existen valoraciones para mostrar, de lo contrario se imprime un mensaje.
            if ($dataValoraciones = $valoraciones->readComentariosReporte()) {
                $pdf->setFont('Arial', '', 11);
                $pdf->write(6, $pdf->encodeString('En la siguiente tabla se podrán observar todas las valoraciones del producto.'));
                $pdf->ln(10);
                $pdf->setFillColor(248, 225, 108);
                $pdf->setFont('Arial', 'B', 11);

                // Encabezados de las columnas
                $pdf->cell(85, 10, 'Comentario', 1, 0, 'C', true);
                $pdf->cell(30, 10, 'Calificacion', 1, 0, 'C', true);
                $pdf->cell(30, 10, 'Fecha', 1, 0, 'C', true);
                $pdf->cell(40, 10, 'Cliente', 1, 1, 'C', true);

                // Se recorren los registros fila por fila.
                foreach ($dataValoraciones as $item2) {
                    $pdf->setFont('Arial', '', 11);

                    // Guardar posición actual X y Y
                    $xPos = $pdf->GetX();
                    $yPos = $pdf->GetY();

                    // Guardar posición X y Y para el comentario
                    $xPosComment = $xPos;
                    $yPosComment = $yPos;

                    // Ajustar posición X y Y para el comentario
                    $pdf->multiCell(85, 7.2, $pdf->encodeString($item2['comentario']), 1, 'C'); // Reducir altura de celda y espacio entre líneas

                    // Guardar posición Y actual después de comentario
                    $yPosCommentEnd = $pdf->GetY();

                    // Ajustar posición X y Y para la calificación
                    $pdf->setXY($xPos + 85, $yPos);
                    $pdf->cell(30, $yPosCommentEnd - $yPosComment, $pdf->encodeString($item2['calificacion']), 1, 0, 'C');
                    
                    // Ajustar posición X y Y para la fecha
                    $pdf->setXY($xPos + 115, $yPos);
                    $pdf->cell(30, $yPosCommentEnd - $yPosComment, $pdf->encodeString($item2['fecha']), 1, 0, 'C');

                    // Ajustar posición X y Y para el nombre del cliente
                    $pdf->setXY($xPos + 145, $yPos);
                    $pdf->cell(40, $yPosCommentEnd - $yPosComment, $pdf->encodeString($item2['nombre_cliente'] . ' ' . $item2['apellido_cliente']), 1, 1, 'C');

                    // Verificar si se necesita agregar una nueva página antes de continuar con las filas siguientes
                    if ($pdf->getY() > 250) { // 250 es un valor aproximado, ajusta según tus necesidades
                        $pdf->addPage();
                        // Agregar encabezados nuevamente después de añadir una nueva página
                        $pdf->setFont('Arial', 'B', 11);
                        $pdf->cell(85, 10, 'Comentario', 1, 0, 'C', true);
                        $pdf->cell(30, 10, 'Calificacion', 1, 0, 'C', true);
                        $pdf->cell(30, 10, 'Fecha', 1, 0, 'C', true);
                        $pdf->cell(40, 10, 'Cliente', 1, 1, 'C', true);
                    }
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('El producto no posee valoraciones'), 0, 1, 'C');
            }

            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'Productos por marca.pdf');
        } else {
            print('Producto inexistente');
        }
    } else {
        print('ID de producto no válido.');
    }
} else {
    print('No se proporcionó un ID de producto.');
}
