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
    private $date = null;

    /*
*   Método para iniciar el reporte con el encabezado del documento.
*   Parámetros: $title (título del reporte) $description(descripcion del reporte).
*   Retorno: ninguno.
*/
    public function startReport($title, $date)
    {
        // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en los reportes.
        session_start();

        // Se verifica si un administrador ha iniciado sesión para generar el documento, de lo contrario se direcciona a la página web principal.
        if(isset($_SESSION['idCliente'])){
            $this->title = $title;
            $this->date = $date;
            $this->setTitle('Huellitas pets - Factura', true);
            $this->setMargins(15, 40, 15);
            $this->addPage('p', 'letter');
            $this->aliasNbPages();
            $this->setDrawColor( 186,186,183);
            //Cuando llegue 50 milimetros antes del final hara un salto de pagina.
            $this->setAutoPageBreak(true, 50);
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
        //Imagenes para el diseño del reporte
        $this->image('../../images/report/header2.png', 0, 0, 230);
        $this->image('../../images/report/footer2.png', 0, 252, 230);
        $this->image('../../images/report/header3.png', 15, 33, 45);

        //Titulo del reporte
        $this->setFont('Arial', 'B', 25);
        $this->cell(185, 10, $this->encodeString($this->title), 0, 1,'R');
        $this->setFont('Arial', '', 12);
        $this->cell(185, 10, $this->encodeString($this->encodeString($this->date)) . date(', H:i:s'), 0, 1,'R');
        $this->setFont('Arial', '', 10);
        //Espacio
        $this->ln(8);
    }

    /*
    *   Se sobrescribe el método de la librería para establecer la plantilla del pie de los reportes.
    *   Se llama automáticamente en el método output()
    */
    public function footer()
    {
        // Se establece la posición para el número de página (a 15 milímetros del final).
        $this->setY(-15);
        $this->setTextColor(0, 0, 0 );
        // Se establece la fuente para el número de página.
        $this->setFont('Arial', '', 9);
//        $this->cell(0, 0,  "Generado por " . $this->encodeString($_SESSION['nombreAdmin']), 0, 1, 'C');
        // Se imprime una celda con el número de página.
        $this->cell(0, 10, $this->encodeString('Página ') . $this->pageNo() . '/{nb}', 0, 1, 'C');

    }
}