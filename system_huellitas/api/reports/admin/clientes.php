<?php

// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/clientes_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report();
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Listado de clientes por meses');
// Se instancia el módelo marca para obtener los datos.
$clientes = new ClientesData();
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataClientes = $clientes->clientsList()) {
    //Descripcion del reporte
    $pdf->setFont('Arial', '', 11);
    $pdf->write(6, $pdf->encodeString('A continuación se podrá observar el listado de clientes (Nombre y apellido) registrados en Huellitas Pets por cada mes.'));

    //Espacio
    $pdf->ln(15);

// Variables para rastrear el mes actual y los clientes.
    $currentMonth = '';
    $clientesPorMes = [];

    // Se recorren los registros fila por fila.
    foreach ($dataClientes as $item) {
        // Si el mes actual es diferente del mes del item, imprimimos el mes anterior y sus clientes.
        if ($currentMonth != $item['mes']) {
            if ($currentMonth != '') {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(248, 225, 108);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 11);
                $pdf->cell(0, 10, $pdf->encodeString($currentMonth), 1, 1, 'C', true);
                $pdf->setFont('Arial', '', 11);
                $pdf->setFillColor(255, 255, 255); // Color blanco para la celda de clientes
                $pdf->multiCell(0, 10, $pdf->encodeString(implode("\n", $clientesPorMes)), 1, 'C');
                $pdf->ln(5);
            }
            // Se actualiza el mes actual y se reinicia la lista de clientes.
            $currentMonth = $item['mes'];
            $clientesPorMes = [];
        }
        // Se agrega el cliente a la lista del mes actual.
        $clientesPorMes[] = $item['nombreC'];
    }

    // Imprime la última fila con el último mes y sus clientes.
    if ($currentMonth != '') {
        // Se establece un color de relleno para los encabezados.
        $pdf->setFillColor(248, 225, 108);
        // Se establece la fuente para los encabezados.
        $pdf->setFont('Arial', 'B', 11);
        $pdf->cell(0, 10, $pdf->encodeString($currentMonth), 1, 1, 'C', true);
        $pdf->setFont('Arial', '', 11);
        $pdf->setFillColor(255, 255, 255); // Color blanco para la celda de clientes
        $pdf->multiCell(0, 10, $pdf->encodeString(implode("\n", $clientesPorMes)), 1, 'C');
    }

} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay marcas para mostrar'), 1, 1);
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'Cantidad de productos por marcas.pdf');