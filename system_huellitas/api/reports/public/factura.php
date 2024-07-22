<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/publicReport.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report();

// Se verifica si existe un valor para la marca, de lo contrario se muestra un mensaje.
if (isset($_GET['idPedido'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/pedidos_data.php');
    $URL ='http://localhost/Huellitas_pets/system_huellitas/api/';

    // Se instancian las entidades correspondientes.
    $pedido = new PedidosData();


    // Se establece el valor de la marca, de lo contrario se muestra un mensaje.
    if ($pedido->setIdPedido($_GET['idPedido'])) {
        // Se verifica si la marca existe, de lo contrario se muestra un mensaje.
        if ($rowPedido = $pedido->readFinishDetail()) {

            $item = $rowPedido[0];

            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Factura', $item['fecha']);
            $pdf->setFont('Arial', 'B', 10);
            $pdf->write(5, 'FACTURA A: ');
            $pdf->ln(7);
            $pdf->setFont('Arial', 'B', 12);
            $pdf->write(5,$pdf->encodeString("{$item['nombre_cliente']} {$item['apellido_cliente']}  "));
            $pdf->ln(15);
            $pdf->setFont('Arial', '', 11);
            $pdf->write(5, $pdf->encodeString("Teléfono:                      {$item['telefono_cliente']}"));
            $pdf->ln(7);
            $pdf->write(5, $pdf->encodeString("Correo electrónico:       {$item['correo_cliente']}"));
            $pdf->ln(7);
            $pdf->write(5, $pdf->encodeString("Dirección:                     {$item['direccion_pedido']} "));
            $pdf->ln(7);
            $pdf->write(5, $pdf->encodeString("Fecha de la compra:    {$item['fecha']} "));
            $pdf->ln(12);

            $pdf->setFont('Arial', 'B', 10);
            $pdf->setFillColor(238, 150, 75);
            $pdf->setTextColor(255, 255, 255 );
            $pdf->setDrawColor( 238,150,75);
            $pdf->cell(95, 10, $pdf->encodeString('DESCRIPCIÓN'), 1, 0, 'C', 1);
            $pdf->cell(30, 10, $pdf->encodeString('PRECIO'), 1, 0, 'C', 1);
            $pdf->cell(30, 10, $pdf->encodeString('CANTIDAD'), 1, 0, 'C', 1);
            $pdf->cell(30, 10, $pdf->encodeString('SUBTOTAL'), 1, 1, 'C', 1);

            $pdf->setTextColor(0, 0, 0 );
            $pdf->setFont('Arial', '', 11);

            $total = 0;

            // Recorrer los productos del pedido y añadirlos al reporte
            foreach ($rowPedido as $item) {
                $pdf->cell(95, 14, $pdf->encodeString($item['nombre_producto']), 1, 0, 'C', 0);
                $pdf->cell(30, 14, "$" . $pdf->encodeString($item['precio_detalle_pedido']), 1, 0, 'C', 0);
                $pdf->cell(30, 14, $pdf->encodeString($item['cantidad_detalle_pedido']), 1, 0, 'C', 0);

                $subtotal = ($item['precio_detalle_pedido']) * ($item['cantidad_detalle_pedido']);
                $pdf->cell(30, 14, "$" . $pdf->encodeString($subtotal), 1, 1, 'C', 0);
                $total += $subtotal;
            }

            $pdf->ln(6);

            $pdf->setFont('Arial', 'B', 12);
            $pdf->cell(140, 10, $pdf->encodeString("Términos y condiciones"), 0, 0, 'L', 0);
            $pdf->cell(27, 10, $pdf->encodeString('Subtotal: '), 0, 0, 'R', 0);
            $pdf->setFont('Arial', '', 12);
            $pdf->cell(16, 10, "$" . $pdf->encodeString($total), 0, 1, 'R', 0);

            $pdf->ln(2);

            $pdf->setFont('Arial', '', 10);
            $pdf->cell(140, 4, $pdf->encodeString("Envíe el pago dentro de los 30 días siguientes a la recepción de esta factura."), 0, 0, 'L', 0);
            $pdf->setTextColor(255, 255, 255 );
            $pdf->setFont('Arial', 'B', 12);
            $pdf->cell(30, 10, $pdf->encodeString('Total: '), 0, 0, 'C', 1);
            $pdf->cell(16, 10, "$" . $pdf->encodeString($total), 0, 1, 'C', 1);

            $pdf->setFont('Arial', '', 10);
            $pdf->setTextColor(0, 0, 0 );
            $pdf->cell(140, -4, $pdf->encodeString("Se cobrarán intereses de demora del 10% al mes."), 0, 0, 'L', 0);

            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'Factura de compra.pdf');
        } else {
            print('Pedido inexistente');
        }
    } else {
        print('ID del pedido no válido.');
    }
} else {
    print('No se proporcionó un ID de pedido.');
}

