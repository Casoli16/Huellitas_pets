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

-- Vista para ver el GET de los pedidos, contiene nombre de los clientes, fecha en cadena de texto y cantidad de productos llevada --
CREATE VIEW IF EXISTS pedidos_view AS
SELECT c.nombre_cliente AS cliente, DATE_FORMAT(p.fecha_registro_pedido, '%e de %M del %Y') AS fecha, dp.cantidad_detalle_pedido AS cantidad
FROM clientes c
INNER JOIN pedidos p ON c.id_cliente = p.id_cliente
INNER JOIN detalles_pedidos dp ON p.id_pedido = dp.id_pedido;
