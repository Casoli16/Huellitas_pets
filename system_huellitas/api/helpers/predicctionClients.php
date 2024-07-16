<?php

class predicctionClients {
    public function newUserNextMonth($totalActual, $totalPasado)
    {
        //Calculamos la tasa de crecimiento;
        $tasaCrecimiento = (($totalActual - $totalPasado) / $totalPasado) * 100;

        // Calculamos la proyeccion futura.
        $proyeccionFutura = ($totalActual * (1 + ($tasaCrecimiento / 100)));

        return [(int)$proyeccionFutura, (int)$tasaCrecimiento];
    }
}