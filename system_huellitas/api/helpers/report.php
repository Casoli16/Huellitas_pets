<?php
// Se incluye la clase para generar archivos PDF.
require_once('C:/xampp/htdocs/Huellitas_pets/system_huellitas/api/libraries/fpdf185/fpdf.php');

/*
*   Clase para definir las plantillas de los reportes del sitio privado.
*   Para más información http://www.fpdf.org/
 *
 */
class Report extends FPDF
{
    // Constante para definir la ruta de las vistas del sitio privado.
    const CLIENT_URL = 'http://localhost/Huellitas_pets/system_huellitas/views/admin';
    // Propiedad para guardar el título del reporte.
    private $title = null;

    /*
*   Método para iniciar el reporte con el encabezado del documento.
*   Parámetros: $title (título del reporte).
*   Retorno: ninguno.
*/
    public function startReport($title)
    {
        // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en los reportes.
        session_start();
        // Se verifica si un administrador ha iniciado sesión para generar el documento, de lo contrario se direcciona a la página web principal.
        if(isset($_SESSION['idAdministrador'])){
            $this->title = $title;
            $this->setTitle('Huellitas pets - Reporte', true);
            $this->setMargins(15, 15, 15);
            $this->addPage('p', 'letter');
            $this->aliasNbPages();
        } else{
            header('location' . self::CLIENT_URL);
        }
    }

    /*
    *   Método para codificar una cadena de alfabeto español a UTF-8.
    *   Parámetros: $string (cadena).
    *   Retorno: cadena convertida.
    */
    public function encodeString($string)
    {
        return mb_convert_encoding($string, 'ISO-8859-1', 'utf8');

    }

    /*
    *   Se sobrescribe el método de la librería para establecer la plantilla del encabezado de los reportes.
    *   Se llama automáticamente en el método addPage()
    */
    public function header()
    {
        $this->image('../../images/report/header.png', 15, 15, 20);
        $this->cell(20);
        $this->setFont('Arial', 'B', 15);
        $this->cell(166, 10, $this->encodeString($this->title), 0, 1,'C');
        $this->ln(10);
    }

    /*
    *   Se sobrescribe el método de la librería para establecer la plantilla del pie de los reportes.
    *   Se llama automáticamente en el método output()
    */
    public function footer()
    {
        // Se establece la posición para el número de página (a 15 milímetros del final).
        $this->setY(-50);
        // Se establece la fuente para el número de página.
        $this->setFont('Arial', 'I', 8);
        // Se imprime una celda con el número de página.
        $this->cell(0, 10, $this->encodeString('Página ') . $this->pageNo() . '/{nb}', 0, 0, 'C');
    }
}