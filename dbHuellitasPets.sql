CREATE DATABASE IF NOT EXISTS dbHuellitasPets;

USE dbHuellitasPets;

CREATE TABLE IF NOT EXISTS clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre_cliente VARCHAR(50),
  apellido_cliente VARCHAR(50),
  dui_cliente VARCHAR(10),
  correo_cliente VARCHAR(100),
  telefono_cliente VARCHAR(9),
  nacimiento_cliente DATE,
  direccion_cliente VARCHAR(250),
  clave_cliente VARCHAR(200),
  estado_cliente ENUM ('Activo', 'Inactivo'),
  fecha_registro_cliente DATE,
  imagen_cliente VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS permisos (
  id_permiso INT AUTO_INCREMENT PRIMARY KEY,
  nombre_permiso VARCHAR(100),
  agregar_actualizar_usuarios BOOL,
  eliminar_usuarios BOOL,
  agregar_actualizar_productos BOOL,
  eliminar_croductos BOOL,
  borrar_comentarios BOOL,
  agregar_actuaizar_subcategoria BOOL,
  borrar_subcategoria BOOL,
  gestionar_cupones BOOL
);

CREATE TABLE IF NOT EXISTS administradores (
  id_admin INT AUTO_INCREMENT PRIMARY KEY,
  nombre_admin VARCHAR(50),
  apellido_admin VARCHAR(50),
  correo_admin VARCHAR(100),
  alias_admin VARCHAR(50),
  clave_admin VARCHAR(100),
  fecha_registro_admin DATE,
  imagen_administrador VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS asignacionPermisos (
  id_asignacionPermiso INT AUTO_INCREMENT PRIMARY KEY,
  id_permiso INT,
  id_admin INT,
  CONSTRAINT fk_asignacionPermisos_permisos FOREIGN KEY (id_permiso) REFERENCES permisos (id_permiso),
  CONSTRAINT fk_asignacionPermisos_administradores FOREIGN KEY (id_admin) REFERENCES administradores (id_admin)
);

CREATE TABLE IF NOT EXISTS categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre_categoria VARCHAR(50),
  descripcion_categoria VARCHAR(250),
  imagen_categoria VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS marcas (
  id_marca INT AUTO_INCREMENT PRIMARY KEY,
  nombre_marca VARCHAR(100),
  imagen VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre_producto VARCHAR(50),
  descripcion_producto VARCHAR(250),
  precio_producto DECIMAL(5,2),
  imagen_producto VARCHAR(50),
  estado_producto ENUM('activo', 'inactivo'),
  existencia_producto INT,
  fecha_registro_producto DATE,
  mascotas ENUM('perro', 'gato'),
  id_admin INT,
  id_categoria INT,
  id_marca INT,
  CONSTRAINT fk_Productos_Admin FOREIGN KEY (id_admin) REFERENCES administradores (id_admin),
  CONSTRAINT fk_Productos_Marca FOREIGN KEY (id_marca) REFERENCES marcas (id_marca),
  CONSTRAINT fk_Productos_categoria FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
);

CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  estado_pedido ENUM('pendiente', 'completado', 'cancelado'),
  fecha_registro TIMESTAMP,
  direccion_pedido VARCHAR(250),
  id_cliente INT,
  CONSTRAINT fk_Pedidos_Clientes FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
);

CREATE TABLE IF NOT EXISTS cuponOferta(
 id_cupon INT AUTO_INCREMENT PRIMARY KEY,
 codigo VARCHAR(50) UNIQUE,
 porcentaje FLOAT,
 estado BOOL,
 fecha_ingreso DATE
);

CREATE TABLE IF NOT EXISTS cuponesUtilizados(
 id_utilizado INT AUTO_INCREMENT PRIMARY KEY,
 id_cupon INT,
 id_cliente INT,
 CONSTRAINT fk_cupononesUtilizados_idcupon FOREIGN KEY (id_cupon) REFERENCES cuponOferta (id_cupon),	
 CONSTRAINT fk_cupononesUtilizados_idcliente FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
);

CREATE TABLE IF NOT EXISTS detallesPedidos (
  id_detallePedido INT AUTO_INCREMENT PRIMARY KEY,
  cantidad_producto INT,
  precio_producto DECIMAL(5,2),
  id_producto INT,
  id_pedido INT,
  CONSTRAINT fk_DetallesPedidos_Productos FOREIGN KEY (id_producto) REFERENCES productos (id_producto),
  CONSTRAINT fk_DetallesPedidos_Pedidos FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido)
);

CREATE TABLE IF NOT EXISTS valoraciones (
  id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
  calificacion INT,
  comentario VARCHAR(250),
  fecha_valoracion DATE,
  estado BOOL,
  id_cliente INT,
  CONSTRAINT fk_Valoraciones_clientes FOREIGN KEY (id_clienteo) REFERENCES detallesPedidos (id_cliente)
);


/*SELECT * FROM valoraciones, detallespedidos, pedidos, productos, subcategorias, administradores, Permisos, clientes;*/
