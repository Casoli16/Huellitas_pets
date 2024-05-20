USE db_huellitas_pets;

 -- TRIGGER, PROCEDIMIENTO Y FUNCION

DELIMITER //

CREATE PROCEDURE agregar_cupon_PA(codigo VARCHAR(100), porcentaje INT, estado BOOL)
BEGIN
    -- Declaramos la variable que contendrá el día de ingreso del cupón
    DECLARE fecha_actual DATE;
    SET fecha_actual = CURDATE();
    
    INSERT INTO cupones_oferta(codigo_cupon, porcentaje_cupon, estado_cupon, fecha_ingreso_cupon) VALUES (codigo, porcentaje, estado, fecha_actual);

END //

DELIMITER ;

CALL agregar_cupon_PA ('TREBOR', 30, 1);

DELIMITER //

CREATE PROCEDURE actualizar_cupon_PA(codigo VARCHAR(100), porcentaje INT, estado BOOL, id INT)
BEGIN
    -- Declaramos la variable que contendrá el día de ingreso del cupón
    UPDATE cupones_oferta 
	 SET codigo_cupon = codigo,  porcentaje_cupon = porcentaje, estado_cupon = estado
	 WHERE id_cupon = id;  

END //

DELIMITER ;

CALL actualizar_cupon_PA ('POPOTE', 35, 1, 2);
-- Función para calcular precio total de varios productos
DELIMITER //

CREATE FUNCTION calcular_precio_total_producto(producto_id INT, cantidad_detalle_pedido INT)
RETURNS DECIMAL(10,2)
BEGIN
    DECLARE precio_total DECIMAL(10,2);
    DECLARE total DECIMAL(10,2);

    SELECT precio_producto INTO precio_total
    FROM productos
    WHERE id_producto = producto_id;

    SET total = precio_total * cantidad_detalle_pedido;

    RETURN total;
END //

DELIMITER ;

-- TRIGGER PARA ACTUALIZAR EXISTENCIAS DE PRODUCTO SI SE HACE UN PEDIDO --
DELIMITER //

CREATE TRIGGER actualizar_existencias AFTER INSERT ON detalles_pedidos
FOR EACH ROW
BEGIN 
	UPDATE productos
	SET existencia_producto = existencia_producto - NEW.cantidad_detalle_pedido
	WHERE id_producto = NEW.id_producto;
END

//
DELIMITER ;

-- TRIGGER PARA ACTUALIZAR EXISTENCIAS DE PRODUCTO SI SE ELIMINA UN PEDIDO --
DELIMITER //

CREATE TRIGGER devolver_existencias BEFORE DELETE ON detalles_pedidos
FOR EACH ROW
BEGIN
    UPDATE productos
    SET existencia_producto = existencia_producto + OLD.cantidad_detalle_pedido
    WHERE id_producto = OLD.id_producto;
END;

//
DELIMITER ;
DELETE FROM valoraciones WHERE id_detalle_pedido = 1;
DELETE FROM detalles_pedidos WHERE id_detalle_pedido = 1;

-- Vista para ver el GET de los pedidos, contiene nombre de los clientes, fecha en cadena de texto y cantidad de productos llevada --
CREATE VIEW pedidos_view AS
SELECT c.nombre_cliente AS cliente,
       DATE_FORMAT(p.fecha_registro_pedido, '%e de %M del %Y') AS fecha,
       SUM(dp.cantidad_detalle_pedido) AS cantidad,
       p.estado_pedido,
       p.id_pedido AS id_pedido
FROM clientes c
INNER JOIN pedidos p ON c.id_cliente = p.id_cliente
INNER JOIN detalles_pedidos dp ON p.id_pedido = dp.id_pedido
GROUP BY c.nombre_cliente, p.fecha_registro_pedido, p.estado_pedido, p.id_pedido;

SET lc_time_names = 'es_ES'; SELECT * FROM pedidos_view;
SET lc_time_names = 'es_ES'; SELECT * FROM pedidos_view WHERE cliente LIKE '%Carlos%' OR fecha LIKE '$ $';


-- Vista para ver la parte 1 de los productos del detalle pedido, es del GET parte I
CREATE VIEW pedido_view_one_I AS
SELECT 
    p.id_pedido,
    dp.id_detalle_pedido,
    dp.cantidad_detalle_pedido AS cantidad,
    CONCAT('$', dp.precio_detalle_pedido) AS precio,
    m.nombre_marca,
    pr.nombre_producto,
    pr.imagen_producto
FROM
    pedidos p
    INNER JOIN detalles_pedidos dp ON p.id_pedido = dp.id_pedido
    INNER JOIN productos pr ON dp.id_producto = pr.id_producto
    INNER JOIN marcas m ON pr.id_marca = m.id_marca;

SELECT * FROM pedido_view_one_I WHERE Id_pedido = 2;

-- Vista para ver la paerte 1.2 de los productos del detalle pedido, este entrega el precio sin el signo $, solo eso cambia:

CREATE VIEW pedido_view_two_I AS
SELECT 
    p.id_pedido,
    dp.cantidad_detalle_pedido AS cantidad,
    dp.precio_detalle_pedido AS precio,
    m.nombre_marca,
    pr.nombre_producto,
    pr.imagen_producto
FROM 
    pedidos p
    INNER JOIN detalles_pedidos dp ON p.id_pedido = dp.id_pedido
    INNER JOIN productos pr ON dp.id_producto = pr.id_producto
    INNER JOIN marcas m ON pr.id_marca = m.id_marca;

-- Vista para ver la parte 2 de los productos, este muestra información del pedido y el total a pagar:
CREATE VIEW pedido_view_two_II AS
SELECT 
    p.id_pedido,
    p.estado_pedido AS estado,
    p.direccion_pedido AS direccion,
    c.nombre_cliente,
    CONCAT('$', (
        SELECT SUM(precio) 
        FROM pedido_view_two_I 
        WHERE id_pedido = p.id_pedido
    )) AS precio_total
FROM 
    pedidos p
    INNER JOIN clientes c ON p.id_cliente = c.id_cliente;

SELECT * FROM pedido_view_two_II WHERE id_pedido = 2;

-- Vista para poder ver el tipo de permiso que tiene un usuario
CREATE VIEW admin_permisos_view AS
SELECT
    ap.id_asignacion_permiso,
    a.id_admin,
    a.nombre_admin,
    p.nombre_permiso,
    ap.id_permiso
FROM
    administradores a
    INNER JOIN asignacion_permisos ap ON a.id_admin = ap.id_admin
    INNER JOIN permisos p ON p.id_permiso = ap.id_permiso;

SELECT * FROM admin_permisos_view;


-- Vista para poder ver los permisos de un administrador

CREATE VIEW vista_permisos_administrador AS
SELECT 
    a.id_admin,
    GROUP_CONCAT(' ', p.nombre_permiso) AS nombre_permiso,
    IFNULL(MAX(p.ver_usuario), FALSE) AS ver_usuario,
    IFNULL(MAX(p.ver_cliente), FALSE) AS ver_cliente,
    IFNULL(MAX(p.ver_marca), FALSE) AS ver_marca,
    IFNULL(MAX(p.ver_pedido), FALSE) AS ver_pedido,
    IFNULL(MAX(p.ver_comentario), FALSE) AS ver_comentario,
    IFNULL(MAX(p.ver_producto), FALSE) AS ver_producto,
    IFNULL(MAX(p.ver_categoria), FALSE) AS ver_categoria,
    IFNULL(MAX(p.ver_cupon), FALSE) AS ver_cupon,
    IFNULL(MAX(p.ver_permiso), FALSE) AS ver_permiso
FROM 
    administradores a
LEFT JOIN 
    asignacion_permisos ap ON a.id_admin = ap.id_admin
LEFT JOIN 
    permisos p ON ap.id_permiso = p.id_permiso
GROUP BY
    a.id_admin;


CREATE VIEW cupones_oferta_vista AS
SELECT 
    id_cupon,
    codigo_cupon,
    porcentaje_cupon,
    estado_cupon,
    DATE_FORMAT(fecha_ingreso_cupon, '%d de %M del %Y') AS fecha_ingreso_cupon_formato
FROM 
    cupones_oferta
ORDER BY 
    fecha_ingreso_cupon DESC;

SELECT * FROM cupones_oferta_vista;

-- Vista para ver todos los detalles de un producto.
CREATE VIEW  productosView AS
    SELECT
        p.id_producto,
        p.nombre_producto,
        p.descripcion_producto,
        p.precio_producto,
        p.imagen_producto,
        p.estado_producto,
        p.existencia_producto,
        DATE_FORMAT(p.fecha_registro_producto, '%d de %M del %Y') AS fecha_registro_producto,
        p.mascotas,	
        p.id_categoria,
        m.nombre_marca,
        p.id_marca,
        c.nombre_categoria

FROM
    productos p
    INNER JOIN marcas m ON m.id_marca = p.id_marca
    INNER JOIN categorias c ON c.id_categoria = p.id_categoria;


-- Vista que calcula los nuevos clientes que se han registrado en la tienda durante los ultimos siete dias
CREATE VIEW nuevos_usuarios AS
SELECT COUNT(*) AS newUsers
FROM clientes
-- Filtra la fecha que sea mayor a la de hace siete días, para eso utilizamos la función DATE_SUB,
-- que permite restarle siete días a la fecha actual.
WHERE clientes.fecha_registro_cliente >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY);

-- Vista que permite saber el producto mas vendido.
CREATE VIEW producto_ventas_view AS
SELECT dp.id_producto, COUNT(*) AS cantidad_vendido,
       pv.nombre_producto,
       pv.nombre_categoria
FROM detalles_pedidos dp
INNER JOIN productosView pv ON pv.id_producto = dp.id_producto
GROUP BY dp.id_producto
ORDER BY cantidad_vendido DESC
LIMIT 1;

