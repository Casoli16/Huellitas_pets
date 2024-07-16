USE db_huellitas_pets;

 -- TRIGGER, PROCEDIMIENTOS, ALTER Y FUNCION

DELIMITER //

CREATE PROCEDURE agregar_cupon_PA(codigo VARCHAR(100), porcentaje INT, estado BOOL)
BEGIN
    -- Declaramos la variable que contendrá el día de ingreso del cupón
    DECLARE fecha_actual DATE;
    SET fecha_actual = CURDATE();
    
    INSERT INTO cupones_oferta(codigo_cupon, porcentaje_cupon, estado_cupon, fecha_ingreso_cupon) VALUES (codigo, porcentaje, estado, fecha_actual);

END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE actualizar_cupon_PA(codigo VARCHAR(100), porcentaje INT, estado BOOL, id INT)
BEGIN
    -- Declaramos la variable que contendrá el día de ingreso del cupón
    UPDATE cupones_oferta 
	 SET codigo_cupon = codigo,  porcentaje_cupon = porcentaje, estado_cupon = estado
	 WHERE id_cupon = id;  

END //

DELIMITER ;

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

CREATE TRIGGER actualizar_existencias
AFTER INSERT ON detalles_pedidos
FOR EACH ROW
BEGIN
  UPDATE productos
   SET existencia_producto = existencia_producto - NEW.cantidad_detalle_pedido
  WHERE id_producto = NEW.id_producto;


   IF ((SELECT existencia_producto FROM productos WHERE id_producto = NEW.id_producto) != 0) THEN
    UPDATE productos
   SET estado_producto = 1
   WHERE id_producto = NEW.id_producto;
    ELSE
       UPDATE productos
   SET estado_producto = 0
   WHERE id_producto = NEW.id_producto;
   END IF;
END

//
DELIMITER ;

-- TRIGGER PARA ACTUALIZAR EXISTENCIAS DE PRODUCTO SI SE HACE UN PEDIDO --
DELIMITER //

CREATE TRIGGER actualizar_existencias_update
BEFORE UPDATE ON detalles_pedidos
FOR EACH ROW
BEGIN
    -- Devolver la cantidad del detalle pedido a las existencias (sumar la cantidad antigua)
    UPDATE productos
    SET existencia_producto = existencia_producto + OLD.cantidad_detalle_pedido
    WHERE id_producto = OLD.id_producto;

    -- Actualizar las existencias restando la nueva cantidad del detalle pedido
    UPDATE productos
    SET existencia_producto = existencia_producto - NEW.cantidad_detalle_pedido
    WHERE id_producto = NEW.id_producto;

    -- Controlar el estado del producto en función de las existencias
    IF ((SELECT existencia_producto FROM productos WHERE id_producto = NEW.id_producto) != 0) THEN
        UPDATE productos
        SET estado_producto = 1
        WHERE id_producto = NEW.id_producto;
    ELSE
        UPDATE productos
        SET estado_producto = 0
        WHERE id_producto = NEW.id_producto;
    END IF;
END//

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

-- Vista para ver el GET de los pedidos, contiene nombre de los clientes, fecha en cadena de texto y cantidad de productos llevada --
CREATE VIEW pedidos_view AS
SELECT c.nombre_cliente  AS cliente,
       DATE_FORMAT(p.fecha_registro_pedido, '%e de %M del %Y') AS fecha,
       SUM(dp.cantidad_detalle_pedido) AS cantidad,
       p.estado_pedido,
       p.id_pedido AS id_pedido
FROM clientes c
INNER JOIN pedidos p ON c.id_cliente = p.id_cliente
INNER JOIN detalles_pedidos dp ON p.id_pedido = dp.id_pedido
GROUP BY c.nombre_cliente, p.fecha_registro_pedido, p.estado_pedido, p.id_pedido;



-- Vista para ver la parte 1 de los productos del detalle pedido, es del GET parte I
CREATE VIEW pedido_view_one_I AS
SELECT 
    p.id_pedido,
    dp.id_detalle_pedido,
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
    CONCAT(c.nombre_cliente, ' ', c.apellido_cliente) AS nombre_cliente,
    CONCAT('$', (
        SELECT SUM(precio) 
        FROM pedido_view_two_I 
        WHERE id_pedido = p.id_pedido
    )) AS precio_total
FROM 
    pedidos p
    INNER JOIN clientes c ON p.id_cliente = c.id_cliente;


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
SELECT id_producto, nombre_producto, descripcion_producto, precio_producto, imagen_producto, existencia_producto, nombre_marca, nombre_categoria  FROM productosView;
-- Vista que calcula los nuevos clientes que se han registrado en la tienda durante los ultimos siete dias
CREATE VIEW nuevos_usuarios AS
SELECT COUNT(*) AS newUsers
FROM clientes WHERE clientes.fecha_registro_cliente >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY);

-- Filtra la fecha que sea mayor a la de hace siete días, para eso utilizamos la función DATE_SUB,
-- que permite restarle siete días a la fecha actual.

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

-- Vista para conocer las marcas de un perro o gato
CREATE VIEW vista_categorias_mascotas AS
SELECT DISTINCT
    c.id_categoria, 
    c.imagen_categoria, 
    c.nombre_categoria,
    c.descripcion_categoria,
    p.estado_producto, 
    p.mascotas
FROM 
    categorias c
JOIN 
    productos p ON c.id_categoria = p.id_categoria;

SELECT * FROM vista_categorias_mascotas;
-- Vista para ver las marcas en base de que si es un perro o gato
CREATE VIEW vista_mascotas_marca AS
SELECT 
    m.nombre_marca AS marca,
    m.id_marca AS idMarca,
    p.mascotas,
    p.estado_producto AS estadoProducto
FROM 
    productos p
JOIN 
    marcas m ON p.id_marca = m.id_marca;

-- Vista para ver las categorias en base de que si es un perro o gato
CREATE VIEW vista_mascotas_categoria AS
SELECT 
    c.id_categoria AS idCategoria,
    p.mascotas,
    p.estado_producto AS estadoProducto,
    c.nombre_categoria AS categoria
FROM 
    productos p
JOIN 
    categorias c ON p.id_categoria = c.id_categoria;

-- Vista para ver los productos
CREATE VIEW vista_productos_puntuacion AS
SELECT
    c.id_categoria AS id_categoria,
    p.id_marca AS id_marca,
    p.precio_producto AS precio_producto,
    m.nombre_marca AS Marca,
    p.id_producto AS id_producto,
    p.nombre_producto AS nombre_producto,
    p.imagen_producto AS imagen_producto,
    p.mascotas AS mascota,
    p.estado_producto,
    p.existencia_producto AS existencias,
    COALESCE(ROUND(AVG(v.calificacion_valoracion) / 2), 5) AS puntuacion_producto
FROM
    productos p
JOIN
    categorias c ON p.id_categoria = c.id_categoria
JOIN
    marcas m ON p.id_marca = m.id_marca
LEFT JOIN
    detalles_pedidos d ON p.id_producto = d.id_producto
LEFT JOIN
    valoraciones v ON d.id_detalle_pedido = v.id_detalle_pedido
GROUP BY
    p.id_producto;


SELECT * FROM vista_productos_puntuacion WHERE id_producto = 7;

-- Vista para saber si un cupón esta disponible para el usuario:
CREATE VIEW vista_cupones_cliente AS
SELECT
    c.id_cliente,
    co.porcentaje_cupon,
    co.codigo_cupon,
    CASE
        WHEN cu.id_cliente IS NOT NULL THEN 'Cupón utilizado'
        WHEN co.estado_cupon = 1 THEN 'Cupón disponible'
        ELSE 'Cupón no encontrado'
    END AS mensaje,
    co.id_cupon
FROM
    clientes c
LEFT JOIN
    cupones_utilizados cu ON c.id_cliente = cu.id_cliente
LEFT JOIN
    cupones_oferta co ON cu.id_cupon = co.id_cupon
UNION
SELECT
    c.id_cliente,
    co.porcentaje_cupon,
    co.codigo_cupon,
    'Cupón disponible' AS mensaje,
    co.id_cupon
FROM
    clientes c
JOIN
    cupones_oferta co ON co.estado_cupon = 1
LEFT JOIN
    cupones_utilizados cu ON c.id_cliente = cu.id_cliente AND cu.id_cupon = co.id_cupon
WHERE
    cu.id_cupon IS NULL;
    
SELECT * FROM vista_cupones_cliente;
SELECT * FROM productos;


CREATE VIEW vista_productos_comentarios AS
SELECT
    p.id_producto AS id_producto,
    v.calificacion_valoracion AS calificacion,
    v.comentario_valoracion AS comentario,
    v.fecha_valoracion AS fecha,
   DATE_FORMAT(v.fecha_valoracion, 'Publicado el %d de %M del %Y')  AS fecha_formato,
    v.estado_valoracion AS estado,
    cl.nombre_cliente AS nombre_cliente,
    cl.apellido_cliente,
    cl.imagen_cliente AS imagen_cliente
FROM
    productos p
LEFT JOIN
    detalles_pedidos d ON p.id_producto = d.id_producto
JOIN
	pedidos pd ON d.id_pedido = pd.id_pedido
JOIN
	clientes cl ON pd.id_cliente = cl.id_cliente
LEFT JOIN
    valoraciones v ON d.id_detalle_pedido = v.id_detalle_pedido;

SELECT * FROM vista_productos_comentarios WHERE id_producto = 2 AND estado = 1 ORDER BY calificacion DESC;

/*Metodo para guardar un comentario en valoraciones*/
SELECT * FROM pedidos;
SELECT * FROM cupones_utilizados;
USE db_huellitas_pets;
CALL crear_detalle_pedido (1, 2, 1, 1, 1);

DROP PROCEDURE IF EXISTS crear_detalle_pedido;
DELIMITER //

CREATE PROCEDURE crear_detalle_pedido (
    IN p_id_pedido INT,
    IN p_cantidad_detalle_pedido INT,
    IN p_id_producto INT,
    IN p_id_cupon INT,
    IN p_id_cliente INT
)
BEGIN
    -- Declarar las variables para almacenar los valores necesarios
    DECLARE p_cupon_porcentaje INT DEFAULT 0;
    DECLARE p_precio_unitario DECIMAL(10,2);
    DECLARE p_precio_total DECIMAL(10,2);
    DECLARE p_precio_total_con_cupon DECIMAL(10,2);

    -- Obtener el precio unitario del producto
    SELECT precio_producto INTO p_precio_unitario
    FROM productos
    WHERE id_producto = p_id_producto;

    -- Calcular el precio total sin aplicar el cupón
    SET p_precio_total = p_cantidad_detalle_pedido * p_precio_unitario;

    -- Verificar si el cupón es válido (id_cupon != 0)
    IF p_id_cupon != 0 THEN
        -- Obtener el porcentaje de descuento del cupón
        SELECT porcentaje_cupon INTO p_cupon_porcentaje
        FROM cupones_oferta
        WHERE id_cupon = p_id_cupon;

        -- Calcular el precio total con el descuento del cupón
        SET p_precio_total_con_cupon = p_precio_total * (1 - p_cupon_porcentaje / 100);

        -- Registrar el cupón como utilizado por el cliente
        INSERT INTO cupones_utilizados (id_cupon, id_cliente) 
        VALUES (p_id_cupon, p_id_cliente);

        -- Insertar el detalle del pedido con el precio con descuento
        INSERT INTO detalles_pedidos(id_producto, precio_detalle_pedido, cantidad_detalle_pedido, id_pedido)
        VALUES(p_id_producto, p_precio_total_con_cupon, p_cantidad_detalle_pedido, p_id_pedido);
    ELSE
        -- Insertar el detalle del pedido sin aplicar ningún descuento
        INSERT INTO detalles_pedidos(id_producto, precio_detalle_pedido, cantidad_detalle_pedido, id_pedido)
        VALUES(p_id_producto, p_precio_total, p_cantidad_detalle_pedido, p_id_pedido);
    END IF;

END //

DELIMITER ;



DELIMITER //

CREATE PROCEDURE insertar_valoracion (
    IN p_calificacion_valoracion INT,
    IN p_comentario_valoracion VARCHAR(250),
    IN p_estado_valoracion BOOL,
    IN p_id_cliente INT,
    IN p_id_producto INT
)
BEGIN
    DECLARE v_id_detalle_pedido INT;

    -- Obtener el id_detalle_pedido correspondiente al id_cliente y id_producto
    SELECT dp.id_detalle_pedido
    INTO v_id_detalle_pedido
    FROM detalles_pedidos dp
    INNER JOIN pedidos p ON dp.id_pedido = p.id_pedido
    WHERE p.id_cliente = p_id_cliente AND dp.id_producto = p_id_producto
    ORDER BY dp.id_detalle_pedido DESC
    LIMIT 1;

    -- Insertar el nuevo registro en la tabla valoraciones
    INSERT INTO valoraciones (calificacion_valoracion, comentario_valoracion, estado_valoracion, id_detalle_pedido)
    VALUES (p_calificacion_valoracion, p_comentario_valoracion, p_estado_valoracion, v_id_detalle_pedido);
END;

DELIMITER ;

-- -Vista para los clientes con mayores pedidos
CREATE VIEW top5_clientes_mayores_pedidos AS
SELECT 
    c.id_cliente,
    CONCAT(c.nombre_cliente, ' ', c.apellido_cliente) AS nombre_completo,
    COUNT(p.id_pedido) AS cantidad_pedidos
FROM 
    clientes c
JOIN 
    pedidos p ON c.id_cliente = p.id_cliente
WHERE 
    p.estado_pedido = 'Completado'
GROUP BY 
    c.id_cliente, nombre_completo
ORDER BY 
    cantidad_pedidos DESC
LIMIT 5;

-- -Vista para los clientes con mayore volumenes de productosd comprados
CREATE VIEW top5_clientes_mayoria_productos AS
SELECT 
    c.id_cliente,
    CONCAT(c.nombre_cliente, ' ', c.apellido_cliente) AS nombre_completo,
    SUM(dp.cantidad_detalle_pedido) AS cantidad_productos
FROM 
    clientes c
JOIN 
    pedidos p ON c.id_cliente = p.id_cliente
JOIN 
    detalles_pedidos dp ON p.id_pedido = dp.id_pedido
WHERE 
    p.estado_pedido = 'Completado'
GROUP BY 
    c.id_cliente, nombre_completo
ORDER BY 
    cantidad_productos DESC
LIMIT 5;

-- -.Vista para los productos más comprados por mes
CREATE VIEW productos_mas_vendidos_por_mes AS
SELECT 
    DATE_FORMAT(p.fecha_registro_pedido, '%Y-%m') AS anio_mes,
    DATE_FORMAT(p.fecha_registro_pedido, '%M-%Y') AS nombre_mes,
    SUM(dp.cantidad_detalle_pedido) AS cantidad_total
FROM 
    pedidos p
JOIN 
    detalles_pedidos dp ON p.id_pedido = dp.id_pedido
WHERE 
    p.estado_pedido = 'Completado'
GROUP BY 
    DATE_FORMAT(p.fecha_registro_pedido, '%Y-%m'),
    DATE_FORMAT(p.fecha_registro_pedido, '%M-%Y')
ORDER BY 
    anio_mes ASC;


SELECT * FROM productos_mas_vendidos_por_mes;
SELECT * FROM top5_clientes_mayoria_productos;
SELECT * FROM top5_clientes_mayores_pedidos;
SELECT * FROM productos;
SELECT * FROM pedidos;
SELECT * FROM detalles_pedidos;
SELECT * FROM clientes;
SELECT * FROM cupones_oferta;


CREATE VIEW cantidad_productos_marcas AS
SELECT
    m.nombre_marca AS marca,
    COUNT(p.id_producto) AS cantidad_total_productos
FROM productos p
INNER JOIN marcas m ON p.id_marca = m.id_marca GROUP BY m.id_marca;


SELECT * FROM cantidad_productos_marcas;
SELECT * FROM cantidad_productos_marcas ORDER BY cantidad_total_productos DESC LIMIT 1;

Create VIEW clientes_grafica AS
SELECT 
    mes.mes AS Mes,
    COALESCE(COUNT(c.id_cliente), 0) AS total_clientes
FROM 
    (
        SELECT 'Enero' AS mes, 1 AS mes_num UNION ALL
        SELECT 'Febrero' AS mes, 2 AS mes_num UNION ALL
        SELECT 'Marzo' AS mes, 3 AS mes_num UNION ALL
        SELECT 'Abril' AS mes, 4 AS mes_num UNION ALL
        SELECT 'Mayo' AS mes, 5 AS mes_num UNION ALL
        SELECT 'Junio' AS mes, 6 AS mes_num UNION ALL
        SELECT 'Julio' AS mes, 7 AS mes_num UNION ALL
        SELECT 'Agosto' AS mes, 8 AS mes_num UNION ALL
        SELECT 'Septiembre' AS mes, 9 AS mes_num UNION ALL
        SELECT 'Octubre' AS mes, 10 AS mes_num UNION ALL
        SELECT 'Noviembre' AS mes, 11 AS mes_num UNION ALL
        SELECT 'Diciembre' AS mes, 12 AS mes_num
    ) AS mes
LEFT JOIN 
    clientes c ON MONTH(c.fecha_registro_cliente) = mes.mes_num
    AND YEAR(c.fecha_registro_cliente) = 2024
GROUP BY 
    mes.mes, mes.mes_num
ORDER BY 
    mes.mes_num;

SELECT * FROM clientes_grafica;

CREATE VIEW productos_by_marca AS
    SELECT
        m.id_marca AS idMarca,
        m.nombre_marca AS marca,
        p.id_producto AS idProducto,
        COUNT(p.id_producto) AS cantidad,
        p.nombre_producto AS nombre,
        p.imagen_producto AS imagenP,
        m.imagen_marca AS imagenM
FROM productos p
INNER JOIN marcas m ON p.id_marca = m.id_marca GROUP BY p.id_producto;

CREATE VIEW listadoClientes
AS
    SELECT
        CONCAT(c.nombre_cliente, ' ', c.apellido_cliente) as nombreC,
        CONCAT(UCASE(SUBSTRING(DATE_FORMAT(c.fecha_registro_cliente, '%M'), 1, 1)),
        LCASE(SUBSTRING(DATE_FORMAT(c.fecha_registro_cliente, '%M'), 2))) AS mes
FROM clientes c;

SELECT * FROM listadoClientes;

-- VISTA PARA SABER CUANTOS CLIENTES SE REGISTRARON EN EL MES ACTUAL
CREATE VIEW currentMonth
AS
    SELECT
        DATE_FORMAT(fecha_registro_cliente, '%M') AS mes_actual,
        COUNT(*) AS total_clientes
    FROM clientes
    WHERE MONTH(fecha_registro_cliente) = MONTH(CURRENT_DATE());

SELECT * FROM currentMonth;

-- VISTA PARA SABER CUANTOS CLIENTES SE REGISTRARON EL MES PASADO.
ALTER VIEW lastMonth
AS
    SELECT
        MONTHNAME(CURRENT_DATE() - INTERVAL 1 MONTH ) as mes_pasado,
        COUNT(*) AS total_clientes
    FROM clientes
    WHERE MONTH(fecha_registro_cliente) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH );

SELECT * FROM lastMonth;

CREATE VIEW vista_conteo_valoraciones_producto AS
SELECT
    p.id_producto AS id_producto,
    COUNT(*) AS total_valoraciones,
    SUM(CASE WHEN v.calificacion_valoracion = 5 THEN 1 ELSE 0 END) AS calif_5,
    SUM(CASE WHEN v.calificacion_valoracion = 4 THEN 1 ELSE 0 END) AS calif_4,
    SUM(CASE WHEN v.calificacion_valoracion = 3 THEN 1 ELSE 0 END) AS calif_3,
    SUM(CASE WHEN v.calificacion_valoracion = 2 THEN 1 ELSE 0 END) AS calif_2,
    SUM(CASE WHEN v.calificacion_valoracion = 1 THEN 1 ELSE 0 END) AS calif_1
FROM
    productos p
LEFT JOIN
    detalles_pedidos d ON p.id_producto = d.id_producto
JOIN
    pedidos pd ON d.id_pedido = pd.id_pedido
LEFT JOIN
    valoraciones v ON d.id_detalle_pedido = v.id_detalle_pedido
GROUP BY
    p.id_producto;

