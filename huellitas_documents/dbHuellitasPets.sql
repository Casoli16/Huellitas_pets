-- DROP DATABASE db_huellitas_pets;

CREATE DATABASE IF NOT EXISTS db_huellitas_pets;

USE db_huellitas_pets;

CREATE TABLE IF NOT EXISTS clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre_cliente VARCHAR(50) NOT NULL,
  apellido_cliente VARCHAR(50) NOT NULL,
  dui_cliente VARCHAR(10),
  CONSTRAINT dui_cliente_unico UNIQUE(dui_cliente),
  correo_cliente VARCHAR(100),
  CONSTRAINT correo_cliente_unico UNIQUE(correo_cliente),
  telefono_cliente VARCHAR(9),
  CONSTRAINT telefono_cliente_unico UNIQUE(telefono_cliente),
  nacimiento_cliente DATE,
  CONSTRAINT nacimiento_cliente_check_edad CHECK (nacimiento_cliente <= '2006-01-01'),
  direccion_cliente VARCHAR(250) NOT NULL,
  clave_cliente VARCHAR(200),
  estado_cliente ENUM ('Activo', 'Inactivo'),
  fecha_registro_cliente DATE DEFAULT NOW(),
  imagen_cliente VARCHAR(50) DEFAULT 'imagen_cliente.png'
);

CREATE TABLE IF NOT EXISTS permisos (
  id_permiso INT AUTO_INCREMENT PRIMARY KEY,
  nombre_permiso VARCHAR(100),
  agregar_actualizar_usuario BOOL,
  eliminar_usuario BOOL,
  agregar_actualizar_producto BOOL,
  eliminar_producto BOOL,
  borrar_comentario BOOL,
  agregar_actualizar_categoria BOOL,
  borrar_categoria BOOL,
  gestionar_cupon BOOL
);

CREATE TABLE IF NOT EXISTS administradores (
  id_admin INT AUTO_INCREMENT PRIMARY KEY,
  nombre_admin VARCHAR(50) NOT NULL,
  apellido_admin VARCHAR(50) NOT NULL,
  correo_admin VARCHAR(100),
  CONSTRAINT correo_admin_unico UNIQUE(correo_admin),
  alias_admin VARCHAR(50),
  CONSTRAINT alias_admin_unico UNIQUE(alias_admin),
  clave_admin VARCHAR(100),
  fecha_registro_admin DATE DEFAULT NOW(),
  imagen_admin VARCHAR(50) DEFAULT 'imagen_admin.png'
);

CREATE TABLE IF NOT EXISTS asignacion_permisos (
  id_asignacion_permiso INT AUTO_INCREMENT PRIMARY KEY,
  id_permiso INT,
  id_admin INT,
  CONSTRAINT fk_asignacion_permisos_permisos FOREIGN KEY (id_permiso) REFERENCES permisos (id_permiso),
  CONSTRAINT fk_asignacion_permisos_administradores FOREIGN KEY (id_admin) REFERENCES administradores (id_admin)
);

CREATE TABLE IF NOT EXISTS categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre_categoria VARCHAR(50) NOT NULL,
  descripcion_categoria VARCHAR(250) NOT NULL,
  imagen_categoria VARCHAR(50) DEFAULT 'imagen_categoria.png'
);

CREATE TABLE IF NOT EXISTS marcas (
  id_marca INT AUTO_INCREMENT PRIMARY KEY,
  nombre_marca VARCHAR(100) NOT NULL,
  imagen_marca VARCHAR(25) DEFAULT 'imagen_marca.png'
);

CREATE TABLE IF NOT EXISTS productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre_producto VARCHAR(50) NOT NULL,
  descripcion_producto VARCHAR(250) NOT NULL,
  precio_producto DECIMAL(5,2) NOT NULL,
  CONSTRAINT precio_producto_check CHECK(precio_producto > 0),
  imagen_producto VARCHAR(50) DEFAULT 'imagen_producto.png',
  estado_producto ENUM('Disponible', 'No disponible'),
  existencia_producto INT,
  CONSTRAINT existencia_producto_check CHECK(existencia_producto > 0),
  fecha_registro_producto DATE DEFAULT NOW(),
  mascotas ENUM('perro', 'gato'),
  id_categoria INT,
  id_marca INT,
  CONSTRAINT fk_productos_marca FOREIGN KEY (id_marca) REFERENCES marcas (id_marca),
  CONSTRAINT fk_productos_categoria FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
);

CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  estado_pedido ENUM('pendiente', 'completado', 'cancelado'),
  fecha_registro_pedido DATE DEFAULT NOW(),
  direccion_pedido VARCHAR(250) NOT NULL,
  id_cliente INT,
  CONSTRAINT fk_pedidos_clientes FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
);

CREATE TABLE IF NOT EXISTS cupon_oferta(
 id_cupon INT AUTO_INCREMENT PRIMARY KEY,
 codigo_cupon VARCHAR(50),
 CONSTRAINT codigo_cupon_check UNIQUE(codigo_cupon),
 porcentaje_cupon INT,
 estado_cupon BOOL,
 fecha_ingreso_cupon DATE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cupones_utilizados(
 id_utilizado INT AUTO_INCREMENT PRIMARY KEY,
 id_cupon INT,
 id_cliente INT,
 CONSTRAINT fk_cuponones_utilizados_idcupon FOREIGN KEY (id_cupon) REFERENCES cupon_oferta (id_cupon),	
 CONSTRAINT fk_cuponones_utilizados_idcliente FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
);

CREATE TABLE IF NOT EXISTS detalles_pedidos (
  id_detalle_pedido INT AUTO_INCREMENT PRIMARY KEY,
  cantidad_detalle_pedido INT,
  CONSTRAINT cantidad_detalle_pedido_check CHECK(cantidad_detalle_pedido > 0),
  precio_detalle_pedido DECIMAL(5,2) NOT NULL,
  CONSTRAINT precio_detalle_pedido_check CHECK(precio_detalle_pedido > 0),
  id_producto INT,
  id_pedido INT,
  CONSTRAINT fk_detalles_pedidos_productos FOREIGN KEY (id_producto) REFERENCES productos (id_producto),
  CONSTRAINT fk_detalles_pedidos_pedidos FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido)
);

CREATE TABLE IF NOT EXISTS valoraciones (
  id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
  calificacion_valoracion INT,
  CONSTRAINT calificacion_valoracion_check CHECK(calificacion_valoracion >= 0),
  comentario_valoracion VARCHAR(250),
  fecha_valoracion DATE DEFAULT NOW(),
  estado_valoracion BOOL,
  id_detalle_pedido INT,
  CONSTRAINT fk_valoraciones_detalles_pedidos FOREIGN KEY (id_detalle_pedido) REFERENCES detalles_pedidos(id_detalle_pedido)
);


DELIMITER //

CREATE PROCEDURE agregar_cupon_PA(codigo VARCHAR(100), porcentaje INT, estado BOOL)
BEGIN
    -- Declaramos la variable que contendrá el día de ingreso del cupón
    DECLARE fecha_actual DATE;
    SET fecha_actual = CURDATE();
    
    INSERT INTO cupon_oferta(codigo_cupon, porcentaje_cupon, estado_cupon, fecha_ingreso_cupon) VALUES (codigo, porcentaje, estado, fecha_actual);

END //

DELIMITER ;

CALL agregar_cupon_PA ('TREBOR', 30, 1);

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

SELECT * FROM productos
SELECT calcular_precio_total_producto(2, 5);	

