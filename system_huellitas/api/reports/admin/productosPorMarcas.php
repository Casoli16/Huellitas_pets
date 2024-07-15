<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report();

// Se verifica si existe un valor para la marca, de lo contrario se muestra un mensaje.
if (isset($_GET['idMarca'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/marcas_data.php');
    $URL ='http://localhost/Huellitas_pets/system_huellitas/api/';

    // Se instancian las entidades correspondientes.
    $marca = new MarcasData();
    // Se establece el valor de la marca, de lo contrario se muestra un mensaje.
    if ($marca->setIdMarca($_GET['idMarca'])) {
        // Se verifica si la marca existe, de lo contrario se muestra un mensaje.
        if ($rowMarca = $marca->readOne()) {

            foreach ($rowMarca as $item1){
                // Se inicia el reporte con el encabezado del documento.
                $pdf->startReport('Productos de la marca ' . $item1['nombre_marca']);
                $pdf->ln(5);
                $pdf->image("${URL}images/marcas/{$item1['imagen_marca']}", 90,63,35, 30);
                $pdf->ln(28);
                break;
            }

            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataMarca = $marca->productosMarca()) {
                $pdf->setFont('Arial', '', 11);
                $pdf->write(6, $pdf->encodeString('En la siguiente tabla se podrán obervar todos los productos que estan asociados a esta marca.'));
                $pdf->ln(10);
                $pdf->setFillColor(248, 225, 108);
                $pdf->setFont('Arial', 'B', 11);
                $pdf->cell(0, 10, 'Nombre del producto', 1, 1,'C', 1);
                // Se recorren los registros fila por fila.
                foreach ($dataMarca as $item2) {
                    $pdf->setFont('Arial', '', 11);
                    $pdf->cell(0, 10, $pdf->encodeString($item2['nombre']), 1, 1, 'C');
                }

                $pdf->ln(5);

                $totalProducts = $marca->productsTotalByIdMarca();
                $pdf->setFont('Arial', 'B', 11);
                $pdf->cell(65, 10, 'Total de productos en esta marca:', 0, 0);
                $pdf->setFont('Arial', '', 11);
                $pdf->cell(50, 10, $pdf->encodeString($totalProducts['total']. ' productos'), 0, 1);

            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay productos para la marca'), 0, 1, 'C');
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'Productos por marca.pdf');
        } else {
            print('Marca inexistente');
        }
    } else {
        print('ID de marca no válido.');
    }
} else {
    print('No se proporcionó un ID de marca.');
}

