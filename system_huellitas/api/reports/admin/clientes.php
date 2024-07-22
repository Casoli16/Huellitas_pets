<?php

// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/clientes_data.php');
require_once('../../helpers/predicctionClients.php');


// Se instancia la clase para crear el reporte.
$pdf = new Report();
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Listado de clientes por meses');
// Se instancia el módelo marca para obtener los datos.
$clientes = new ClientesData();
$predicction = new predicctionClients();

//// Ancho de la tabla
//$w = 201;
//
//// Alto de las líneas divisorias
//$h = 10;
//
//// Posición inicial del cursor
//$y = 101;


// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataClientes = $clientes->clientsList()) {
    //Descripcion del reporte
    $pdf->setFont('Arial', '', 11);
    $pdf->write(6, $pdf->encodeString('A continuación se podrá observar el listado de clientes (Nombre y apellido) registrados en Huellitas Pets por cada mes.'));

    // -----------------------------------------------------------------------------------
    $actualMonth = $clientes->currentMonth();
    $lastMonth = $clientes->lastMonth();

    $data = $predicction->newUserNextMonth($actualMonth['total_clientes'], $lastMonth['total_clientes']);

    // ------------------------------------------------------------------------------------

    //Espacio
    $pdf->ln(10);

// Variables para rastrear el mes actual y los clientes.
    $currentMonth = '';
    $clientesPorMes = [];

    $pdf->setDrawColor( 186,186,183);
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

//        $pdf->Line(15, $y, $w, $y);
//        // Incrementar la posición vertical
//        $y += $h;
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

    $pdf->setFont('Arial', 'B', 12);
    $pdf->ln(8);
    $pdf->write(6, $pdf->encodeString("Predicción para el siguiente mes de ${actualMonth['mes_actual']}"));
    $pdf->setFont('Arial', '', 11);
    $pdf->ln(9);
    $pdf->write(6, $pdf->encodeString("De acuerdo a los datos registrados durante este mes y el mes anterior, en ${actualMonth['mes_actual']} se tuvo un total de ${actualMonth['total_clientes']} clientes registrados, mientras que en ${lastMonth['mes_pasado']} un total de ${lastMonth['total_clientes']} clientes registrados, por lo tanto comparando ambos meses se tuvo una tasa de crecimiento del $data[1]%."));
    $pdf->setFont('Arial', 'B', 11);
    $pdf->ln(10);
    $pdf->write(6, $pdf->encodeString("Proyección futura"));
    $pdf->ln(8);
    $pdf->setFont('Arial', '', 11);
    $pdf->write(6, $pdf->encodeString("De acuerdo a los datos estadísticos obtenidos, se espera que para el siguiente mes se tenga un promedio de $data[0] clientes nuevos."));
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay marcas para mostrar'), 1, 1);
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'Cantidad de productos por marcas.pdf');