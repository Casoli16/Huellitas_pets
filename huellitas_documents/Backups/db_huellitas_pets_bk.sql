-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: db_huellitas_pets
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administradores` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_admin` varchar(50) NOT NULL,
  `apellido_admin` varchar(50) NOT NULL,
  `correo_admin` varchar(100) DEFAULT NULL,
  `alias_admin` varchar(50) DEFAULT NULL,
  `clave_admin` varchar(100) DEFAULT NULL,
  `fecha_registro_admin` date DEFAULT current_timestamp(),
  `imagen_admin` varchar(50) DEFAULT 'imagen_admin.png',
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `correo_admin_unico` (`correo_admin`),
  UNIQUE KEY `alias_admin_unico` (`alias_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
INSERT INTO `administradores` VALUES (1,'Antonio','González','antonio_gonzalez@example.com','antonio','clave123','2024-03-03','imagen_admin.png'),(2,'Isabel','Ramírez','isabel_ramirez@example.com','isabel','contrasena456','2024-03-03','imagen_admin.png'),(3,'Francisco','Torres','francisco_torres@example.com','francisco','password789','2024-03-03','imagen_admin.png'),(4,'Cristina','Herrera','cristina_herrera@example.com','cristina','admin123','2024-03-03','imagen_admin.png'),(5,'Alberto','Fernández','alberto_fernandez@example.com','alberto','soporte456','2024-03-03','imagen_admin.png'),(6,'Marta','Navarro','marta_navarro@example.com','marta','producto789','2024-03-03','imagen_admin.png'),(7,'Juan','Iglesias','juan_iglesias@example.com','juan','cupon123','2024-03-03','imagen_admin.png'),(8,'Rosa','Moreno','rosa_moreno@example.com','rosa','vip456','2024-03-03','imagen_admin.png'),(9,'Diego','Molina','diego_molina@example.com','diego','datos789','2024-03-03','imagen_admin.png'),(10,'Natalia','Silva','natalia_silva@example.com','natalia','compras123','2024-03-03','imagen_admin.png'),(11,'Elena','Gómez','elena_gomez@example.com','elena','clave123','2024-03-03','imagen_admin.png'),(12,'Carlos','Martínez','carlos_martinez@example.com','carlos','contrasena456','2024-03-03','imagen_admin.png'),(13,'Ana','López','ana_lopez@example.com','ana','password789','2024-03-03','imagen_admin.png'),(14,'Javier','García','javier_garcia@example.com','javier','admin123','2024-03-03','imagen_admin.png'),(15,'Laura','Rodríguez','laura_rodriguez@example.com','laura','soporte456','2024-03-03','imagen_admin.png'),(16,'Daniel','Hernández','daniel_hernandez@example.com','daniel','producto789','2024-03-03','imagen_admin.png'),(17,'Sofía','Díaz','sofia_diaz@example.com','sofia','cupon123','2024-03-03','imagen_admin.png'),(18,'Pedro','Sánchez','pedro_sanchez@example.com','pedro','vip456','2024-03-03','imagen_admin.png'),(19,'María','Gutiérrez','maria_gutierrez@example.com','maria','datos789','2024-03-03','imagen_admin.png'),(20,'Manuel','Fernández','manuel_fernandez@example.com','manuel','compras123','2024-03-03','imagen_admin.png'),(21,'Eva','Pérez','eva_perez@example.com','eva','clave123','2024-03-03','imagen_admin.png'),(22,'Miguel','López','miguel_lopez@example.com','miguel','contrasena456','2024-03-03','imagen_admin.png'),(23,'Lucía','Martínez','lucia_martinez@example.com','lucia','password789','2024-03-03','imagen_admin.png'),(24,'Alejandro','Gómez','alejandro_gomez@example.com','alejandro','admin123','2024-03-03','imagen_admin.png'),(25,'Carmen','Sánchez','carmen_sanchez@example.com','carmen','soporte456','2024-03-03','imagen_admin.png');
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignacion_permisos`
--

DROP TABLE IF EXISTS `asignacion_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asignacion_permisos` (
  `id_asignacion_permiso` int(11) NOT NULL AUTO_INCREMENT,
  `id_permiso` int(11) DEFAULT NULL,
  `id_admin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_asignacion_permiso`),
  KEY `fk_asignacion_permisos_permisos` (`id_permiso`),
  KEY `fk_asignacion_permisos_administradores` (`id_admin`),
  CONSTRAINT `fk_asignacion_permisos_administradores` FOREIGN KEY (`id_admin`) REFERENCES `administradores` (`id_admin`),
  CONSTRAINT `fk_asignacion_permisos_permisos` FOREIGN KEY (`id_permiso`) REFERENCES `permisos` (`id_permiso`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacion_permisos`
--

LOCK TABLES `asignacion_permisos` WRITE;
/*!40000 ALTER TABLE `asignacion_permisos` DISABLE KEYS */;
INSERT INTO `asignacion_permisos` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,5),(6,6,6),(7,7,7),(8,8,8),(9,9,9),(10,10,10),(11,11,11),(12,12,12),(13,13,13),(14,14,14),(15,15,15),(16,16,16),(17,17,17),(18,18,18),(19,19,19),(20,20,20),(21,21,21),(22,22,22),(23,23,23),(24,24,24),(25,25,25);
/*!40000 ALTER TABLE `asignacion_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(50) NOT NULL,
  `descripcion_categoria` varchar(250) NOT NULL,
  `imagen_categoria` varchar(50) DEFAULT 'imagen_categoria.png',
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Alimentos Secos','Nutritivos alimentos secos para perros y gatos.','alimentos_secos.png'),(2,'Snacks y Golosinas','Deliciosos snacks y golosinas para consentir a tu mascota.','snacks_golosinas.png'),(3,'Juguetes Interactivos','Juguetes que mantendrán a tu mascota entretenida y activa.','juguetes_interactivos.png'),(4,'Camas y Cojines','Cómodas camas y cojines para un descanso pleno de tu mascota.','camas_cojines.png'),(5,'Collares y Correas','Elegantes collares y correas para pasear a tu mascota con estilo.','collares_correas.png'),(6,'Productos de Higiene','Artículos para el cuidado e higiene de tu mascota.','higiene_mascotas.png'),(7,'Ropa y Accesorios','Estilosa ropa y accesorios para vestir a tu mascota con elegancia.','ropa_accesorios.png'),(8,'Productos de Salud','Productos para el cuidado y bienestar de la salud de tu mascota.','salud_mascotas.png'),(9,'Transporte y Viaje','Artículos para llevar a tu mascota cómodamente durante los viajes.','transporte_viaje.png'),(10,'Juguetes para Roedores','Diversión asegurada con juguetes para roedores y pequeñas mascotas.','juguetes_roedores.png'),(11,'Hábitats para Reptiles','Espacios seguros y cómodos para tus reptiles y anfibios.','habitat_reptiles.png'),(12,'Comederos y Bebederos','Comederos y bebederos de alta calidad para satisfacer las necesidades de tu mascota.','comederos_bebederos.png'),(13,'Acuarios y Peceras','Ambientes acuáticos ideales para peces y otras criaturas acuáticas.','acuarios_peceras.png'),(14,'Cuidado Dental','Productos para el cuidado dental y bucal de perros y gatos.','cuidado_dental.png'),(15,'Artículos de Entrenamiento','Herramientas para entrenar y educar a tu mascota de manera efectiva.','entrenamiento_mascotas.png'),(16,'Collares Antipulgas','Collares efectivos para proteger a tu mascota de pulgas y garrapatas.','collares_antipulgas.png'),(17,'Casetas y Jaulas','Refugios seguros y cómodos para tu mascota.','casetas_jaulas.png'),(18,'Productos para Pájaros','Accesorios y alimentos para el cuidado de pájaros y aves domésticas.','productos_pajaros.png'),(19,'Aseo y Corte de Uñas','Herramientas para el aseo y corte de uñas de tu mascota.','aseo_corte_unas.png'),(20,'Suplementos Nutricionales','Suplementos para fortalecer la nutrición de tu mascota.','suplementos_nutricionales.png'),(21,'Cuidado de Ojos y Oídos','Productos especializados para el cuidado de los ojos y oídos de tu mascota.','cuidado_ojos_oidos.png'),(22,'Comida Húmeda','Deliciosa comida húmeda para perros y gatos.','comida_humeda.png'),(23,'Juguetes para Gatos','Juguetes divertidos y estimulantes para gatos activos.','juguetes_gatos.png'),(24,'Cepillos y Peines','Cepillos y peines para el cuidado del pelaje de tu mascota.','cepillos_peines.png'),(25,'Arena para Gatos','Arena absorbente y de calidad para la higiene del arenero de tu gato.','arena_gatos.png');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(50) NOT NULL,
  `apellido_cliente` varchar(50) NOT NULL,
  `dui_cliente` varchar(10) DEFAULT NULL,
  `correo_cliente` varchar(100) DEFAULT NULL,
  `telefono_cliente` varchar(9) DEFAULT NULL,
  `nacimiento_cliente` date DEFAULT NULL,
  `direccion_cliente` varchar(250) NOT NULL,
  `clave_cliente` varchar(200) DEFAULT NULL,
  `estado_cliente` enum('Activo','Inactivo') DEFAULT NULL,
  `fecha_registro_cliente` date DEFAULT current_timestamp(),
  `imagen_cliente` varchar(50) DEFAULT 'imagen_cliente.png',
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `dui_cliente_unico` (`dui_cliente`),
  UNIQUE KEY `correo_cliente_unico` (`correo_cliente`),
  UNIQUE KEY `telefono_cliente_unico` (`telefono_cliente`),
  CONSTRAINT `nacimiento_cliente_check_edad` CHECK (`nacimiento_cliente` <= '2006-01-01')
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Carlos Steven','Jiménez Álvarez','02123456-0','carlosSJA@gmail.com','81221234','1996-06-04','Villa Lourdes #212','CSJA0604','Activo','2024-03-05','imagen_cliente.png'),(2,'Patricia Elena','Rojas Miranda','02234567-1','patriciaERM@gmail.com','82332345','1974-10-06','Parque Residencial Santa Lucía #223','PERM1006','Activo','2024-03-05','imagen_cliente.png'),(3,'Manuel Alejandro','Figueroa Zelaya','02345678-2','manuelAFZ@gmail.com','83443456','1982-08-20','Col. Los Ángeles #234','MAFZ0820','Activo','2024-03-05','imagen_cliente.png'),(4,'Sofía Carolina','Guerrero López','02456789-3','sofiaCGL@gmail.com','84554567','1990-12-13','Res. El Pedregal #245','SCGL1213','Activo','2024-03-05','imagen_cliente.png'),(5,'Daysi Karina','Castillo Lemus','12345678-9','daysiLemus@gmail.com','73542312','1975-02-16','Col. Delicas del norte #4','DL0216','Activo','2024-03-05','imagen_cliente.png'),(6,'Mario Alberto','Rodríguez Paz','00123456-0','marioRPaz@gmail.com','70011234','1984-03-21','Urb. Los Pinos #12','MAR0321','Activo','2024-03-05','imagen_cliente.png'),(7,'Luisa Fernanda','Morán Quintana','00234567-1','luisaFQ@gmail.com','71022345','1990-07-08','Res. La Esperanza #23','LFQ0708','Activo','2024-03-05','imagen_cliente.png'),(8,'Carlos Eduardo','Hernández Solís','00345678-2','carlosEHS@gmail.com','72033456','1982-11-14','Col. Santa Mónica #34','CEHS1114','Activo','2024-03-05','imagen_cliente.png'),(9,'Ana Patricia','Santos Marroquín','00456789-3','anaPSM@gmail.com','73044567','1978-05-22','Lotif. El Paraíso #45','APSM0522','Activo','2024-03-05','imagen_cliente.png'),(10,'Jorge Alejandro','López Gómez','00567890-4','jorgeALG@gmail.com','74055678','1985-09-30','Villas de San Juan #56','JALG0930','Activo','2024-03-05','imagen_cliente.png'),(11,'Sofía Isabel','Martínez Funes','00678901-5','sofiaIMF@gmail.com','75066789','1992-01-16','Cond. Los Cipreses #67','SIMF0116','Activo','2024-03-05','imagen_cliente.png'),(12,'Ricardo José','Castro Lemus','00789012-6','ricardoJCL@gmail.com','76077890','1979-04-03','Barrio San Esteban #78','RJCL0403','Activo','2024-03-05','imagen_cliente.png'),(13,'Daniela Alejandra','Vásquez Orellana','00890123-7','danielaAVO@gmail.com','77088901','1987-06-19','Res. Las Margaritas #89','DAVO0619','Activo','2024-03-05','imagen_cliente.png'),(14,'Miguel Ángel','Torres Pineda','00901234-8','miguelATP@gmail.com','78099012','1981-10-10','Jardines del Valle #90','MATP1010','Activo','2024-03-05','imagen_cliente.png'),(15,'Carmen Leticia','Navas Herrera','01012345-9','carmenLNH@gmail.com','79100123','1993-12-24','Alamedas de La Paz #101','CLNH1224','Activo','2024-03-05','imagen_cliente.png'),(16,'Oscar Mauricio','Reyes Mata','01123456-0','oscarMRM@gmail.com','70211234','1986-08-15','Villa Sol #112','OMRM0815','Activo','2024-03-05','imagen_cliente.png'),(17,'Gabriela María','Salazar Coto','01234567-1','gabrielaMSC@gmail.com','71322345','1991-03-09','Col. San Francisco #123','GMSC0309','Activo','2024-03-05','imagen_cliente.png'),(18,'Roberto Carlos','Menjívar Quintanilla','01345678-2','robertoCMQ@gmail.com','72433456','1980-02-27','Paseo Los Héroes #134','RCMQ0227','Activo','2024-03-05','imagen_cliente.png'),(19,'Andrea Nicole','González Ramírez','01456789-3','andreaNGR@gmail.com','73544567','1994-07-13','Urbanización El Bosque #145','ANGR0713','Activo','2024-03-05','imagen_cliente.png'),(20,'José Eduardo','Aguilar Campos','01567890-4','joseEAC@gmail.com','74655678','1983-05-31','Res. Villa Hermosa #156','JEAC0531','Activo','2024-03-05','imagen_cliente.png'),(21,'María Fernanda','Chávez Durán','01678901-5','mariaFCD@gmail.com','75766789','1989-09-22','Lotificación Santa Clara #167','MFCD0922','Activo','2024-03-05','imagen_cliente.png'),(22,'Kevin Alexander','Ortiz López','01789012-6','kevinAOL@gmail.com','76877890','1977-12-08','Cumbres de Cuscatlán #178','KAOL1208','Activo','2024-03-05','imagen_cliente.png'),(23,'Sandra Elizabeth','Pérez Castro','01890123-7','sandraEPC@gmail.com','77988901','1995-04-14','Colinas de Santa Rita #189','SEPC0414','Activo','2024-03-05','imagen_cliente.png'),(24,'David Antonio','Mejía Cortez','01901234-8','davidAMC@gmail.com','79099012','1988-01-29','Residencial Los Pinos #190','DAMC0129','Activo','2024-03-05','imagen_cliente.png'),(25,'Alejandra Stephanie','Ruiz Sánchez','02012345-9','alejandraSRS@gmail.com','80110123','1976-11-17','Barrio San Miguelito #201','ASRS1117','Activo','2024-03-05','imagen_cliente.png');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cupones_oferta`
--

DROP TABLE IF EXISTS `cupones_oferta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cupones_oferta` (
  `id_cupon` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_cupon` varchar(50) DEFAULT NULL,
  `porcentaje_cupon` int(11) DEFAULT NULL,
  `estado_cupon` tinyint(1) DEFAULT NULL,
  `fecha_ingreso_cupon` date DEFAULT current_timestamp(),
  PRIMARY KEY (`id_cupon`),
  UNIQUE KEY `codigo_cupon_unique` (`codigo_cupon`),
  CONSTRAINT `porcentaje_cupon_check` CHECK (`porcentaje_cupon` > 0)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cupones_oferta`
--

LOCK TABLES `cupones_oferta` WRITE;
/*!40000 ALTER TABLE `cupones_oferta` DISABLE KEYS */;
INSERT INTO `cupones_oferta` VALUES (1,'A1B2C3',10,0,'2024-03-05'),(2,'D4E5F6',15,0,'2024-03-05'),(3,'G7H8I9',20,1,'2024-03-05'),(4,'J0K1L2',25,1,'2024-03-05'),(5,'M3N4O5',30,0,'2024-03-05'),(6,'P6Q7R8',35,1,'2024-03-05'),(7,'S9T0U1',40,0,'2024-03-05'),(8,'V2W3X4',45,1,'2024-03-05'),(9,'Y5Z6A7',50,1,'2024-03-05'),(10,'B8C9D0',55,1,'2024-03-05'),(11,'E1F2G3',5,0,'2024-03-05'),(12,'H4I5J6',60,1,'2024-03-05'),(13,'K7L8M9',65,1,'2024-03-05'),(14,'N0O1P2',70,0,'2024-03-05'),(15,'Q3R4S5',75,0,'2024-03-05'),(16,'T6U7V8',80,1,'2024-03-05'),(17,'W9X0Y1',85,1,'2024-03-05'),(18,'Z2A3B4',90,0,'2024-03-05'),(19,'C5D6E7',95,1,'2024-03-05'),(20,'F8G9H0',12,0,'2024-03-05'),(21,'I1J2K3',22,1,'2024-03-05'),(22,'L4M5N6',32,0,'2024-03-05'),(23,'O7P8Q9',42,1,'2024-03-05'),(24,'R0S1T2',52,1,'2024-03-05'),(25,'U3V4W5',62,0,'2024-03-05');
/*!40000 ALTER TABLE `cupones_oferta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cupones_utilizados`
--

DROP TABLE IF EXISTS `cupones_utilizados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cupones_utilizados` (
  `id_utilizado` int(11) NOT NULL AUTO_INCREMENT,
  `id_cupon` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_utilizado`),
  KEY `fk_cuponones_utilizados_idcupon` (`id_cupon`),
  KEY `fk_cuponones_utilizados_idcliente` (`id_cliente`),
  CONSTRAINT `fk_cuponones_utilizados_idcliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `fk_cuponones_utilizados_idcupon` FOREIGN KEY (`id_cupon`) REFERENCES `cupones_oferta` (`id_cupon`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cupones_utilizados`
--

LOCK TABLES `cupones_utilizados` WRITE;
/*!40000 ALTER TABLE `cupones_utilizados` DISABLE KEYS */;
INSERT INTO `cupones_utilizados` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,5),(6,6,6),(7,7,7),(8,8,8),(9,9,9),(10,10,10),(11,11,11),(12,12,12),(13,13,13),(14,14,14),(15,15,15),(16,16,16),(17,17,17),(18,18,18),(19,19,19),(20,20,20),(21,21,21),(22,22,22),(23,23,23),(24,24,24),(25,25,25);
/*!40000 ALTER TABLE `cupones_utilizados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalles_pedidos`
--

DROP TABLE IF EXISTS `detalles_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalles_pedidos` (
  `id_detalle_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad_detalle_pedido` int(11) DEFAULT NULL,
  `precio_detalle_pedido` decimal(5,2) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_pedido`),
  KEY `fk_detalles_pedidos_productos` (`id_producto`),
  KEY `fk_detalles_pedidos_pedidos` (`id_pedido`),
  CONSTRAINT `fk_detalles_pedidos_pedidos` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  CONSTRAINT `fk_detalles_pedidos_productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `cantidad_detalle_pedido_check` CHECK (`cantidad_detalle_pedido` > 0),
  CONSTRAINT `precio_detalle_pedido_check` CHECK (`precio_detalle_pedido` > 0)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_pedidos`
--

LOCK TABLES `detalles_pedidos` WRITE;
/*!40000 ALTER TABLE `detalles_pedidos` DISABLE KEYS */;
INSERT INTO `detalles_pedidos` VALUES (1,20,15.50,1,1),(2,10,22.30,2,2),(3,30,10.00,3,3),(4,40,5.75,4,4),(5,50,3.20,5,5),(6,20,8.50,6,6),(7,10,11.25,7,7),(8,30,7.00,8,8),(9,40,9.95,9,9),(10,50,4.40,10,10),(11,20,12.30,11,11),(12,10,6.60,12,12),(13,30,19.85,13,13),(14,40,20.20,14,14),(15,50,15.15,15,15),(16,20,17.10,16,16),(17,10,21.45,17,17),(18,30,13.75,18,18),(19,40,8.80,19,19),(20,50,5.50,20,20),(21,20,23.40,21,21),(22,10,25.00,22,22),(23,30,18.60,23,23),(24,40,14.30,24,24),(25,50,10.25,25,25);
/*!40000 ALTER TABLE `detalles_pedidos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER actualizar_existencias AFTER INSERT ON detalles_pedidos
FOR EACH ROW
BEGIN 
	UPDATE productos
	SET existencia_producto = existencia_producto - NEW.cantidad_detalle_pedido
	WHERE id_producto = NEW.id_producto;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marcas` (
  `id_marca` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_marca` varchar(100) NOT NULL,
  `imagen_marca` varchar(25) DEFAULT 'imagen_marca.png',
  PRIMARY KEY (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Royal Canin','royal_canin.png'),(2,'Hill\'s Science Diet','hills_science_diet.png'),(3,'Purina Pro Plan','purina_pro_plan.png'),(4,'Pedigree','pedigree.png'),(5,'Iams','iams.png'),(6,'Whiskas','whiskas.png'),(7,'Kong','kong.png'),(8,'Frisco','frisco.png'),(9,'Hartz','hartz.png'),(10,'Tetra','tetra.png'),(11,'Feliway','feliway.png'),(12,'KONG','kong.png'),(13,'Chuckit!','chuckit.png'),(14,'Trixie','trixie.png'),(15,'Nylabone','nylabone.png'),(16,'FURminator','furminator.png'),(17,'Bio-Groom','bio_groom.png'),(18,'Greenies','greenies.png'),(19,'PetSafe','petsafe.png'),(20,'Sentry','sentry.png'),(21,'ZuPreem','zupreem.png'),(22,'Kaytee','kaytee.png'),(23,'Aqueon','aqueon.png'),(24,'Wellness','wellness.png'),(25,'Merrick','merrick.png');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `estado_pedido` enum('pendiente','completado','cancelado') DEFAULT NULL,
  `fecha_registro_pedido` date DEFAULT current_timestamp(),
  `direccion_pedido` varchar(250) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_pedidos_clientes` (`id_cliente`),
  CONSTRAINT `fk_pedidos_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'completado','2024-03-05','Av. Los Álamos #12',1),(2,'completado','2024-03-05','Calle Roble #34',2),(3,'pendiente','2024-03-05','Blvd. Las Palmas #56',3),(4,'cancelado','2024-03-05','Av. Las Flores #78',4),(5,'completado','2024-03-05','Calle Cedro #90',5),(6,'completado','2024-03-05','Blvd. Los Laureles #123',6),(7,'pendiente','2024-03-05','Av. Los Pinos #145',7),(8,'cancelado','2024-03-05','Calle Las Margaritas #167',8),(9,'completado','2024-03-05','Blvd. Los Lirios #189',9),(10,'pendiente','2024-03-05','Av. Los Naranjos #210',10),(11,'pendiente','2024-03-05','Calle Los Manzanos #232',11),(12,'cancelado','2024-03-05','Blvd. Las Orquídeas #254',12),(13,'completado','2024-03-05','Av. Los Eucaliptos #276',13),(14,'completado','2024-03-05','Calle Las Gardenias #298',14),(15,'pendiente','2024-03-05','Blvd. Los Fresnos #311',15),(16,'cancelado','2024-03-05','Av. Los Castaños #333',16),(17,'completado','2024-03-05','Calle Los Almendros #355',17),(18,'completado','2024-03-05','Blvd. Las Azaleas #377',18),(19,'pendiente','2024-03-05','Av. Los Cerezos #399',19),(20,'cancelado','2024-03-05','Calle Los Olmos #421',20),(21,'completado','2024-03-05','Blvd. Las Camelias #443',21),(22,'completado','2024-03-05','Av. Los Robles #465',22),(23,'pendiente','2024-03-05','Calle Las Jacarandas #487',23),(24,'cancelado','2024-03-05','Blvd. Los Sauces #509',24),(25,'completado','2024-03-05','Av. Los Tulipanes #531',25);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permisos` (
  `id_permiso` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_permiso` varchar(100) DEFAULT NULL,
  `agregar_actualizar_usuario` tinyint(1) DEFAULT NULL,
  `eliminar_usuario` tinyint(1) DEFAULT NULL,
  `agregar_actualizar_producto` tinyint(1) DEFAULT NULL,
  `eliminar_producto` tinyint(1) DEFAULT NULL,
  `borrar_comentario` tinyint(1) DEFAULT NULL,
  `agregar_actualizar_categoria` tinyint(1) DEFAULT NULL,
  `borrar_categoria` tinyint(1) DEFAULT NULL,
  `gestionar_cupon` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_permiso`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,'Administrador',1,1,1,1,1,1,1,1),(2,'Moderador',0,0,1,0,1,1,0,0),(3,'Vendedor',0,0,1,0,0,1,0,1),(4,'Usuario Estándar',0,0,0,0,1,0,0,0),(5,'Supervisor de Ventas',0,0,1,0,1,1,0,1),(6,'Asistente de Almacén',0,0,1,0,0,0,0,0),(7,'Experto en Productos',0,0,1,0,0,1,0,0),(8,'Soporte al Cliente',0,0,0,0,1,0,0,0),(9,'Editor de Contenido',0,0,0,0,1,1,0,0),(10,'Especialista en Cupones',0,0,0,0,0,0,0,1),(11,'Usuario VIP',0,0,1,0,0,0,0,0),(12,'Analista de Datos',0,0,0,0,0,0,0,0),(13,'Asesor de Compras',0,0,1,0,1,0,1,0),(14,'Gerente de Operaciones',1,1,1,1,1,1,1,1),(15,'Entrenador de Mascotas',0,0,1,0,0,0,1,0),(16,'Diseñador de Productos',0,0,1,0,0,1,0,0),(17,'Especialista en Bienestar Animal',0,0,0,0,0,0,0,0),(18,'Aficionado a las Mascotas',0,0,0,0,1,0,1,0),(19,'Influencer Pet-friendly',0,0,1,0,1,1,0,1),(20,'Investigador de Tendencias',0,0,0,0,0,1,0,0),(21,'Evaluador de Productos',0,0,1,0,0,1,0,0),(22,'Experto en Nutrición Animal',0,0,1,0,0,1,0,0),(23,'Planificador de Eventos Pet-friendly',0,0,0,0,0,0,0,1),(24,'Diseñador de Tienda Virtual',0,0,0,0,0,0,0,0),(25,'Explorador de Ofertas',0,0,0,0,0,0,0,1);
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(50) NOT NULL,
  `descripcion_producto` varchar(250) NOT NULL,
  `precio_producto` decimal(5,2) NOT NULL,
  `imagen_producto` varchar(50) DEFAULT 'imagen_producto.png',
  `estado_producto` enum('Disponible','No disponible') DEFAULT NULL,
  `existencia_producto` int(11) DEFAULT NULL,
  `fecha_registro_producto` date DEFAULT current_timestamp(),
  `mascotas` enum('perro','gato') DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_marca` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `fk_productos_marca` (`id_marca`),
  KEY `fk_productos_categoria` (`id_categoria`),
  CONSTRAINT `fk_productos_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`),
  CONSTRAINT `fk_productos_marca` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id_marca`),
  CONSTRAINT `precio_producto_check` CHECK (`precio_producto` > 0),
  CONSTRAINT `existencia_producto_check` CHECK (`existencia_producto` > 0)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Croquetas Premium','Nutritivas croquetas premium para perros y gatos.',30.99,'croquetas_premium.png','',80,'2024-03-03','perro',1,1),(2,'Juguete Pelota Interactiva','Pelota interactiva para perros, ideal para juegos divertidos.',12.50,'pelota_interactiva.png','',140,'2024-03-03','perro',3,7),(3,'Comedero Automático','Comedero automático programable para perros y gatos.',45.75,'comedero_automatico.png','',20,'2024-03-03','perro',6,9),(4,'Arena Aglomerante','Arena aglomerante para gatos, controla olores y facilita la limpieza.',14.99,'arena_aglomerante.png','',40,'2024-03-03','gato',20,11),(5,'Collar Ajustable','Collar ajustable para perros con diseño resistente y seguro.',8.25,'collar_ajustable.png','',70,'2024-03-03','perro',5,4),(6,'Juguete para Roedores','Juguete interactivo para roedores, promueve el ejercicio.',6.99,'juguete_roedores.png','',180,'2024-03-03','gato',10,13),(7,'Cama Suave y Cálida','Cama suave y cálida para perros y gatos, ideal para descansar.',22.50,'cama_suave_calida.png','',80,'2024-03-03','perro',4,8),(8,'Acuario Completo','Acuario completo con accesorios, perfecto para peces tropicales.',99.95,'acuario_completo.png','',270,'2024-03-03','gato',12,22),(9,'Snacks Naturales','Snacks naturales para perros, sin aditivos artificiales.',9.75,'snacks_naturales.png','',110,'2024-03-03','perro',2,14),(10,'Cepillo para Gatos','Cepillo suave para el cuidado del pelaje de gatos.',5.50,'cepillo_gatos.png','',50,'2024-03-03','gato',16,15),(11,'Juguete Dispensador de Comida','Juguete dispensador de comida para perros, estimula la mente.',18.99,'dispensador_comida.png','',60,'2024-03-03','perro',3,6),(12,'Pecera de Diseño Moderno','Pecera de diseño moderno para peces ornamentales.',65.50,'pecera_moderna.png','',30,'2024-03-03','gato',11,23),(13,'Set de Ropa para Perros','Set de ropa elegante y cómoda para perros pequeños.',28.75,'ropa_perros.png','',30,'2024-03-03','perro',7,18),(14,'Caja de Arena para Roedores','Caja de arena para roedores, fácil de limpiar y mantener.',11.99,'caja_arena_roedores.png','',80,'2024-03-03','gato',10,14),(15,'Cepillo de Dientes para Perros','Cepillo de dientes para perros, cuida la salud dental.',6.25,'cepillo_dientes_perros.png','',50,'2024-03-03','perro',14,17),(16,'Alimento Húmedo para Gatos','Alimento húmedo para gatos, variedad de sabores y nutrientes.',2.99,'alimento_humedo_gatos.png','',100,'2024-03-03','gato',22,5),(17,'Juguete Peluche para Cachorros','Peluche suave y seguro para cachorros, ideal para masticar.',9.50,'peluche_cachorros.png','',70,'2024-03-03','perro',3,2),(18,'Caja Transportadora','Caja transportadora para gatos y perros pequeños, resistente y cómoda.',34.99,'caja_transportadora.png','',10,'2024-03-03','gato',8,19),(19,'Juguete para Pájaros','Juguete colorido y divertido para entretener a pájaros.',7.50,'juguete_pajaros.png','',20,'2024-03-03','gato',18,20),(20,'Set de Juguetes para Cachorros','Set variado de juguetes para cachorros, estimula el juego.',19.99,'set_juguetes_cachorros.png','',50,'2024-03-03','perro',3,12),(21,'Alimento Especial para Aves','Alimento especializado para aves, con nutrientes esenciales.',12.25,'alimento_especial_aves.png','',60,'2024-03-03','gato',17,21),(22,'Rascador para Gatos','Rascador resistente y divertido para gatos, cuida sus uñas.',22.99,'rascador_gatos.png','',40,'2024-03-03','gato',15,10),(23,'Set de Juguetes para Peces','Set de juguetes para peces, proporciona enriquecimiento.',14.75,'set_juguetes_peces.png','',30,'2024-03-03','gato',12,24),(24,'Comedero Elevado para Gatos','Comedero elevado para gatos, promueve una postura saludable.',16.50,'comedero_elevado_gatos.png','',30,'2024-03-03','gato',6,16),(25,'Cuerda de Juego para Perros','Cuerda resistente para juegos interactivos con perros.',9.25,'cuerda_juego_perros.png','',70,'2024-03-03','perro',3,7);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoraciones`
--

DROP TABLE IF EXISTS `valoraciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `valoraciones` (
  `id_valoracion` int(11) NOT NULL AUTO_INCREMENT,
  `calificacion_valoracion` int(11) DEFAULT NULL,
  `comentario_valoracion` varchar(250) DEFAULT NULL,
  `fecha_valoracion` date DEFAULT current_timestamp(),
  `estado_valoracion` tinyint(1) DEFAULT NULL,
  `id_detalle_pedido` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_valoracion`),
  KEY `fk_valoraciones_detalles_pedidos` (`id_detalle_pedido`),
  CONSTRAINT `fk_valoraciones_detalles_pedidos` FOREIGN KEY (`id_detalle_pedido`) REFERENCES `detalles_pedidos` (`id_detalle_pedido`),
  CONSTRAINT `calificacion_valoracion_check` CHECK (`calificacion_valoracion` >= 0)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoraciones`
--

LOCK TABLES `valoraciones` WRITE;
/*!40000 ALTER TABLE `valoraciones` DISABLE KEYS */;
INSERT INTO `valoraciones` VALUES (1,9,'Excelente calidad y servicio','2024-03-05',1,1),(2,8,'Buen producto, pero entrega lenta','2024-03-05',0,2),(3,8,'Satisfecho con la compra','2024-03-05',1,3),(4,7,'Calidad aceptable, podría mejorar','2024-03-05',1,4),(5,10,'Superó mis expectativas','2024-03-05',1,5),(6,9,'Muy buen producto, lo recomiendo','2024-03-05',1,6),(7,7,'Satisfactorio, pero con margen de mejora','2024-03-05',1,7),(8,6,'No cumple con las expectativas','2024-03-05',0,8),(9,9,'Excelente atención al cliente','2024-03-05',1,9),(10,7,'Regular, esperaba más','2024-03-05',0,10),(11,8,'Buena relación calidad-precio','2024-03-05',1,11),(12,8,'Entrega a tiempo, producto en buen estado','2024-03-05',1,12),(13,9,'Producto de alta calidad, totalmente recomendado','2024-03-05',1,13),(14,6,'No estoy completamente satisfecho','2024-03-05',0,14),(15,9,'Gran compra, volvería a adquirirlo','2024-03-05',1,15),(16,7,'Buen servicio, producto cumple con lo prometido','2024-03-05',1,16),(17,5,'Decepcionado con el producto','2024-03-05',0,17),(18,9,'Excelente, sin quejas','2024-03-05',1,18),(19,8,'Buen producto, entrega puntual','2024-03-05',1,19),(20,9,'Increíble, por encima de lo esperado','2024-03-05',1,20),(21,6,'Aceptable, pero hay mejores opciones','2024-03-05',0,21),(22,8,'Contento con la compra, buen vendedor','2024-03-05',1,22),(23,7,'Satisfactorio pero con detalles menores','2024-03-05',1,23),(24,6,'No es lo que esperaba, pero el servicio es bueno','2024-03-05',0,24),(25,9,'Producto excepcional y entrega rápida','2024-03-05',1,25);
/*!40000 ALTER TABLE `valoraciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-05  9:43:28
