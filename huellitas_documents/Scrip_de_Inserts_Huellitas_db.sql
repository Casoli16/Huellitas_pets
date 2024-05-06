USE db_huellitas_pets;

/*Inserts para la tabla de permisos*/
INSERT INTO permisos (nombre_permiso, ver_usuario, ver_cliente, ver_marca, ver_pedido, ver_comentario, ver_producto, ver_categoria, ver_cupon, ver_permiso
) VALUES
('Administrador', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('Moderador', FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE),
('Vendedor', FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE),
('Usuario Estándar', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE),
('Supervisor de Ventas', FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE),
('Asistente de Almacén', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('Experto en Productos', FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('Soporte al Cliente', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE),
('Editor de Contenido', FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE),
('Especialista en Cupones', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE),
('Usuario VIP', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('Analista de Datos', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('Asesor de Compras', FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE),
('Gerente de Operaciones', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE),
('Entrenador de Mascotas', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE),
('Diseñador de Productos', FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('Especialista en Bienestar Animal', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('Aficionado a las Mascotas', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE),
('Influencer Pet-friendly', FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE),
('Investigador de Tendencias', FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('Evaluador de Productos', FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('Experto en Nutrición Animal', FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('Planificador de Eventos Pet-friendly', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE),
('Diseñador de Tienda Virtual', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
('Explorador de Ofertas', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE);
SELECT * FROM permisos; 	

/*Inserts para la tabla de administradores*/
INSERT INTO administradores (nombre_admin, apellido_admin, correo_admin, alias_admin, clave_admin, fecha_registro_admin)
VALUES 
  ('Antonio', 'González', 'antonio_gonzalez@example.com', 'antonio', 'clave123', '2024-03-03'),
  ('Isabel', 'Ramírez', 'isabel_ramirez@example.com', 'isabel', 'contrasena456', '2024-03-03'),
  ('Francisco', 'Torres', 'francisco_torres@example.com', 'francisco', 'password789', '2024-03-03'),
  ('Cristina', 'Herrera', 'cristina_herrera@example.com', 'cristina', 'admin123', '2024-03-03'),
  ('Alberto', 'Fernández', 'alberto_fernandez@example.com', 'alberto', 'soporte456', '2024-03-03'),
  ('Marta', 'Navarro', 'marta_navarro@example.com', 'marta', 'producto789', '2024-03-03'),
  ('Juan', 'Iglesias', 'juan_iglesias@example.com', 'juan', 'cupon123', '2024-03-03'),
  ('Rosa', 'Moreno', 'rosa_moreno@example.com', 'rosa', 'vip456', '2024-03-03'),
  ('Diego', 'Molina', 'diego_molina@example.com', 'diego', 'datos789', '2024-03-03'),
  ('Natalia', 'Silva', 'natalia_silva@example.com', 'natalia', 'compras123', '2024-03-03'),
  ('Elena', 'Gómez', 'elena_gomez@example.com', 'elena', 'clave123', '2024-03-03'),
  ('Carlos', 'Martínez', 'carlos_martinez@example.com', 'carlos', 'contrasena456', '2024-03-03'),
  ('Ana', 'López', 'ana_lopez@example.com', 'ana', 'password789', '2024-03-03'),
  ('Javier', 'García', 'javier_garcia@example.com', 'javier', 'admin123', '2024-03-03'),
  ('Laura', 'Rodríguez', 'laura_rodriguez@example.com', 'laura', 'soporte456', '2024-03-03'),
  ('Daniel', 'Hernández', 'daniel_hernandez@example.com', 'daniel', 'producto789', '2024-03-03'),
  ('Sofía', 'Díaz', 'sofia_diaz@example.com', 'sofia', 'cupon123', '2024-03-03'),
  ('Pedro', 'Sánchez', 'pedro_sanchez@example.com', 'pedro', 'vip456', '2024-03-03'),
  ('María', 'Gutiérrez', 'maria_gutierrez@example.com', 'maria', 'datos789', '2024-03-03'),
  ('Manuel', 'Fernández', 'manuel_fernandez@example.com', 'manuel', 'compras123', '2024-03-03'),
  ('Eva', 'Pérez', 'eva_perez@example.com', 'eva', 'clave123', '2024-03-03'),
  ('Miguel', 'López', 'miguel_lopez@example.com', 'miguel', 'contrasena456', '2024-03-03'),
  ('Lucía', 'Martínez', 'lucia_martinez@example.com', 'lucia', 'password789', '2024-03-03'),
  ('Alejandro', 'Gómez', 'alejandro_gomez@example.com', 'alejandro', 'admin123', '2024-03-03'),
  ('Carmen', 'Sánchez', 'carmen_sanchez@example.com', 'carmen', 'soporte456', '2024-03-03');

SELECT * FROM administradores;

/*Inserts para la tabla de asignacion_permisos*/
INSERT INTO asignacion_permisos (id_permiso, id_admin)
VALUES 
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  (6, 6),
  (7, 7),
  (8, 8),
  (9, 9),
  (10, 10),
  (11, 11),
  (12, 12),
  (13, 13),
  (14, 14),
  (15, 15),
  (16, 16),
  (17, 17),
  (18, 18),
  (19, 19),
  (20, 20),
  (21, 21),
  (22, 22),
  (23, 23),
  (24, 24),
  (25, 25);

SELECT * FROM asignacion_permisos;

/*Inserts para la tabla de categorias*/
INSERT INTO categorias (nombre_categoria, descripcion_categoria, imagen_categoria)
VALUES 
  ('Alimentos Secos', 'Nutritivos alimentos secos para perros y gatos.', 'alimentos_secos.png'),
  ('Snacks y Golosinas', 'Deliciosos snacks y golosinas para consentir a tu mascota.', 'snacks_golosinas.png'),
  ('Juguetes Interactivos', 'Juguetes que mantendrán a tu mascota entretenida y activa.', 'juguetes_interactivos.png'),
  ('Camas y Cojines', 'Cómodas camas y cojines para un descanso pleno de tu mascota.', 'camas_cojines.png'),
  ('Collares y Correas', 'Elegantes collares y correas para pasear a tu mascota con estilo.', 'collares_correas.png'),
  ('Productos de Higiene', 'Artículos para el cuidado e higiene de tu mascota.', 'higiene_mascotas.png'),
  ('Ropa y Accesorios', 'Estilosa ropa y accesorios para vestir a tu mascota con elegancia.', 'ropa_accesorios.png'),
  ('Productos de Salud', 'Productos para el cuidado y bienestar de la salud de tu mascota.', 'salud_mascotas.png'),
  ('Transporte y Viaje', 'Artículos para llevar a tu mascota cómodamente durante los viajes.', 'transporte_viaje.png'),
  ('Juguetes para Roedores', 'Diversión asegurada con juguetes para roedores y pequeñas mascotas.', 'juguetes_roedores.png'),
  ('Hábitats para Reptiles', 'Espacios seguros y cómodos para tus reptiles y anfibios.', 'habitat_reptiles.png'),
  ('Comederos y Bebederos', 'Comederos y bebederos de alta calidad para satisfacer las necesidades de tu mascota.', 'comederos_bebederos.png'),
  ('Acuarios y Peceras', 'Ambientes acuáticos ideales para peces y otras criaturas acuáticas.', 'acuarios_peceras.png'),
  ('Cuidado Dental', 'Productos para el cuidado dental y bucal de perros y gatos.', 'cuidado_dental.png'),
  ('Artículos de Entrenamiento', 'Herramientas para entrenar y educar a tu mascota de manera efectiva.', 'entrenamiento_mascotas.png'),
  ('Collares Antipulgas', 'Collares efectivos para proteger a tu mascota de pulgas y garrapatas.', 'collares_antipulgas.png'),
  ('Casetas y Jaulas', 'Refugios seguros y cómodos para tu mascota.', 'casetas_jaulas.png'),
  ('Productos para Pájaros', 'Accesorios y alimentos para el cuidado de pájaros y aves domésticas.', 'productos_pajaros.png'),
  ('Aseo y Corte de Uñas', 'Herramientas para el aseo y corte de uñas de tu mascota.', 'aseo_corte_unas.png'),
  ('Suplementos Nutricionales', 'Suplementos para fortalecer la nutrición de tu mascota.', 'suplementos_nutricionales.png'),
  ('Cuidado de Ojos y Oídos', 'Productos especializados para el cuidado de los ojos y oídos de tu mascota.', 'cuidado_ojos_oidos.png'),
  ('Comida Húmeda', 'Deliciosa comida húmeda para perros y gatos.', 'comida_humeda.png'),
  ('Juguetes para Gatos', 'Juguetes divertidos y estimulantes para gatos activos.', 'juguetes_gatos.png'),
  ('Cepillos y Peines', 'Cepillos y peines para el cuidado del pelaje de tu mascota.', 'cepillos_peines.png'),
  ('Arena para Gatos', 'Arena absorbente y de calidad para la higiene del arenero de tu gato.', 'arena_gatos.png');

  
SELECT * FROM categorias;

/*Inserts para la tabla de marcas*/
INSERT INTO marcas (nombre_marca, imagen_marca)
VALUES 
  ('Royal Canin', 'royal_canin.png'),
  ('Hill''s Science Diet', 'hills_science_diet.png'),
  ('Purina Pro Plan', 'purina_pro_plan.png'),
  ('Pedigree', 'pedigree.png'),
  ('Iams', 'iams.png'),
  ('Whiskas', 'whiskas.png'),
  ('Kong', 'kong.png'),
  ('Frisco', 'frisco.png'),
  ('Hartz', 'hartz.png'),
  ('Tetra', 'tetra.png'),
  ('Feliway', 'feliway.png'),
  ('KONG', 'kong.png'),
  ('Chuckit!', 'chuckit.png'),
  ('Trixie', 'trixie.png'),
  ('Nylabone', 'nylabone.png'),
  ('FURminator', 'furminator.png'),
  ('Bio-Groom', 'bio_groom.png'),
  ('Greenies', 'greenies.png'),
  ('PetSafe', 'petsafe.png'),
  ('Sentry', 'sentry.png'),
  ('ZuPreem', 'zupreem.png'),
  ('Kaytee', 'kaytee.png'),
  ('Aqueon', 'aqueon.png'),
  ('Wellness', 'wellness.png'),
  ('Merrick', 'merrick.png');

SELECT * FROM marcas;

/*Inserts para la tabla de marcas*/
INSERT INTO productos (nombre_producto, descripcion_producto, precio_producto, imagen_producto, estado_producto, existencia_producto, fecha_registro_producto, mascotas, id_categoria, id_marca)
VALUES 
  ('Croquetas Premium', 'Nutritivas croquetas premium para perros y gatos.', 30.99, 'croquetas_premium.png', 'Disponible', 100, '2024-03-03', 'perro', 1, 3),
  ('Juguete Pelota Interactiva', 'Pelota interactiva para perros, ideal para juegos divertidos.', 12.50, 'pelota_interactiva.png', 'activo', 150, '2024-03-03', 'perro', 3, 7),
  ('Comedero Automático', 'Comedero automático programable para perros y gatos.', 45.75, 'comedero_automatico.png', 'activo', 50, '2024-03-03', 'perro', 6, 9),
  ('Arena Aglomerante', 'Arena aglomerante para gatos, controla olores y facilita la limpieza.', 14.99, 'arena_aglomerante.png', 'activo', 80, '2024-03-03', 'gato', 20, 11),
  ('Collar Ajustable', 'Collar ajustable para perros con diseño resistente y seguro.', 8.25, 'collar_ajustable.png', 'activo', 120, '2024-03-03', 'perro', 5, 4),
  ('Juguete para Roedores', 'Juguete interactivo para roedores, promueve el ejercicio.', 6.99, 'juguete_roedores.png', 'activo', 200, '2024-03-03', 'gato', 10, 13),
  ('Cama Suave y Cálida', 'Cama suave y cálida para perros y gatos, ideal para descansar.', 22.50, 'cama_suave_calida.png', 'activo', 90, '2024-03-03', 'perro', 4, 8),
  ('Acuario Completo', 'Acuario completo con accesorios, perfecto para peces tropicales.', 99.95, 'acuario_completo.png', 'activo', 300, '2024-03-03', 'gato', 12, 22),
  ('Snacks Naturales', 'Snacks naturales para perros, sin aditivos artificiales.', 9.75, 'snacks_naturales.png', 'activo', 150, '2024-03-03', 'perro', 2, 14),
  ('Cepillo para Gatos', 'Cepillo suave para el cuidado del pelaje de gatos.', 5.50, 'cepillo_gatos.png', 'activo', 100, '2024-03-03', 'gato', 16, 15),
  ('Juguete Dispensador de Comida', 'Juguete dispensador de comida para perros, estimula la mente.', 18.99, 'dispensador_comida.png', 'activo', 80, '2024-03-03', 'perro', 3, 6),
  ('Pecera de Diseño Moderno', 'Pecera de diseño moderno para peces ornamentales.', 65.50, 'pecera_moderna.png', 'activo', 40, '2024-03-03', 'gato', 11, 23),
  ('Set de Ropa para Perros', 'Set de ropa elegante y cómoda para perros pequeños.', 28.75, 'ropa_perros.png', 'activo', 60, '2024-03-03', 'perro', 7, 18),
  ('Caja de Arena para Roedores', 'Caja de arena para roedores, fácil de limpiar y mantener.', 11.99, 'caja_arena_roedores.png', 'activo', 120, '2024-03-03', 'gato', 10, 14),
  ('Cepillo de Dientes para Perros', 'Cepillo de dientes para perros, cuida la salud dental.', 6.25, 'cepillo_dientes_perros.png', 'activo', 100, '2024-03-03', 'perro', 14, 17),
  ('Alimento Húmedo para Gatos', 'Alimento húmedo para gatos, variedad de sabores y nutrientes.', 2.99, 'alimento_humedo_gatos.png', 'activo', 120, '2024-03-03', 'gato', 22, 5),
  ('Juguete Peluche para Cachorros', 'Peluche suave y seguro para cachorros, ideal para masticar.', 9.50, 'peluche_cachorros.png', 'activo', 80, '2024-03-03', 'perro', 3, 3),
  ('Caja Transportadora', 'Caja transportadora para gatos y perros pequeños, resistente y cómoda.', 34.99, 'caja_transportadora.png', 'activo', 40, '2024-03-03', 'gato', 8, 19),
  ('Juguete para Pájaros', 'Juguete colorido y divertido para entretener a pájaros.', 7.50, 'juguete_pajaros.png', 'activo', 60, '2024-03-03', 'gato', 18, 20),
  ('Set de Juguetes para Cachorros', 'Set variado de juguetes para cachorros, estimula el juego.', 19.99, 'set_juguetes_cachorros.png', 'activo', 100, '2024-03-03', 'perro', 3, 12),
  ('Alimento Especial para Aves', 'Alimento especializado para aves, con nutrientes esenciales.', 12.25, 'alimento_especial_aves.png', 'activo', 80, '2024-03-03', 'gato', 17, 21),
  ('Rascador para Gatos', 'Rascador resistente y divertido para gatos, cuida sus uñas.', 22.99, 'rascador_gatos.png', 'activo', 50, '2024-03-03', 'gato', 15, 10),
  ('Set de Juguetes para Peces', 'Set de juguetes para peces, proporciona enriquecimiento.', 14.75, 'set_juguetes_peces.png', 'activo', 60, '2024-03-03', 'gato', 12, 24),
  ('Comedero Elevado para Gatos', 'Comedero elevado para gatos, promueve una postura saludable.', 16.50, 'comedero_elevado_gatos.png', 'activo', 70, '2024-03-03', 'gato', 6, 16),
  ('Cuerda de Juego para Perros', 'Cuerda resistente para juegos interactivos con perros.', 9.25, 'cuerda_juego_perros.png', 'activo', 120, '2024-03-03', 'perro', 3, 7);

SELECT * FROM productos;

INSERT INTO clientes (nombre_cliente, apellido_cliente, dui_cliente, correo_cliente, telefono_cliente, nacimiento_cliente, direccion_cliente, clave_cliente, estado_cliente)
VALUES 
  ('Carlos Steven', 'Jiménez Álvarez', '02123456-0', 'carlosSJA@gmail.com', '81221234', '1996-06-04', 'Villa Lourdes #212', 'CSJA0604', 'Activo'),
  ('Patricia Elena', 'Rojas Miranda', '02234567-1', 'patriciaERM@gmail.com', '82332345', '1974-10-06', 'Parque Residencial Santa Lucía #223', 'PERM1006', 'Activo'),
  ('Manuel Alejandro', 'Figueroa Zelaya', '02345678-2', 'manuelAFZ@gmail.com', '83443456', '1982-08-20', 'Col. Los Ángeles #234', 'MAFZ0820', 'Activo'),
  ('Sofía Carolina', 'Guerrero López', '02456789-3', 'sofiaCGL@gmail.com', '84554567', '1990-12-13', 'Res. El Pedregal #245', 'SCGL1213', 'Activo'), 
  ('Daysi Karina', 'Castillo Lemus', '12345678-9', 'daysiLemus@gmail.com', '73542312', '1975-02-16', 'Col. Delicas del norte #4', 'DL0216', 'Activo'),
  ('Mario Alberto', 'Rodríguez Paz', '00123456-0', 'marioRPaz@gmail.com', '70011234', '1984-03-21', 'Urb. Los Pinos #12', 'MAR0321', 'Activo'),
  ('Luisa Fernanda', 'Morán Quintana', '00234567-1', 'luisaFQ@gmail.com', '71022345', '1990-07-08', 'Res. La Esperanza #23', 'LFQ0708', 'Activo'),
  ('Carlos Eduardo', 'Hernández Solís', '00345678-2', 'carlosEHS@gmail.com', '72033456', '1982-11-14', 'Col. Santa Mónica #34', 'CEHS1114', 'Activo'),
  ('Ana Patricia', 'Santos Marroquín', '00456789-3', 'anaPSM@gmail.com', '73044567', '1978-05-22', 'Lotif. El Paraíso #45', 'APSM0522', 'Activo'),
  ('Jorge Alejandro', 'López Gómez', '00567890-4', 'jorgeALG@gmail.com', '74055678', '1985-09-30', 'Villas de San Juan #56', 'JALG0930', 'Activo'),
  ('Sofía Isabel', 'Martínez Funes', '00678901-5', 'sofiaIMF@gmail.com', '75066789', '1992-01-16', 'Cond. Los Cipreses #67', 'SIMF0116', 'Activo'),
  ('Ricardo José', 'Castro Lemus', '00789012-6', 'ricardoJCL@gmail.com', '76077890', '1979-04-03', 'Barrio San Esteban #78', 'RJCL0403', 'Activo'),
  ('Daniela Alejandra', 'Vásquez Orellana', '00890123-7', 'danielaAVO@gmail.com', '77088901', '1987-06-19', 'Res. Las Margaritas #89', 'DAVO0619', 'Activo'),
  ('Miguel Ángel', 'Torres Pineda', '00901234-8', 'miguelATP@gmail.com', '78099012', '1981-10-10', 'Jardines del Valle #90', 'MATP1010', 'Activo'),
  ('Carmen Leticia', 'Navas Herrera', '01012345-9', 'carmenLNH@gmail.com', '79100123', '1993-12-24', 'Alamedas de La Paz #101', 'CLNH1224', 'Activo'),
  ('Oscar Mauricio', 'Reyes Mata', '01123456-0', 'oscarMRM@gmail.com', '70211234', '1986-08-15', 'Villa Sol #112', 'OMRM0815', 'Activo'),
  ('Gabriela María', 'Salazar Coto', '01234567-1', 'gabrielaMSC@gmail.com', '71322345', '1991-03-09', 'Col. San Francisco #123', 'GMSC0309', 'Activo'),
  ('Roberto Carlos', 'Menjívar Quintanilla', '01345678-2', 'robertoCMQ@gmail.com', '72433456', '1980-02-27', 'Paseo Los Héroes #134', 'RCMQ0227', 'Activo'),
  ('Andrea Nicole', 'González Ramírez', '01456789-3', 'andreaNGR@gmail.com', '73544567', '1994-07-13', 'Urbanización El Bosque #145', 'ANGR0713', 'Activo'),
  ('José Eduardo', 'Aguilar Campos', '01567890-4', 'joseEAC@gmail.com', '74655678', '1983-05-31', 'Res. Villa Hermosa #156', 'JEAC0531', 'Activo'),
  ('María Fernanda', 'Chávez Durán', '01678901-5', 'mariaFCD@gmail.com', '75766789', '1989-09-22', 'Lotificación Santa Clara #167', 'MFCD0922', 'Activo'),
  ('Kevin Alexander', 'Ortiz López', '01789012-6', 'kevinAOL@gmail.com', '76877890', '1977-12-08', 'Cumbres de Cuscatlán #178', 'KAOL1208', 'Activo'),
  ('Sandra Elizabeth', 'Pérez Castro', '01890123-7', 'sandraEPC@gmail.com', '77988901', '1995-04-14', 'Colinas de Santa Rita #189', 'SEPC0414', 'Activo'),
  ('David Antonio', 'Mejía Cortez', '01901234-8', 'davidAMC@gmail.com', '79099012', '1988-01-29', 'Residencial Los Pinos #190', 'DAMC0129', 'Activo'),
  ('Alejandra Stephanie', 'Ruiz Sánchez', '02012345-9', 'alejandraSRS@gmail.com', '80110123', '1976-11-17', 'Barrio San Miguelito #201', 'ASRS1117', 'Activo');

SELECT * FROM clientes;

INSERT INTO pedidos (estado_pedido, direccion_pedido, id_cliente)
VALUES 
  ('completado', 'Av. Los Álamos #12', 1),
  ('completado', 'Calle Roble #34', 2),
  ('pendiente', 'Blvd. Las Palmas #56', 3),
  ('cancelado', 'Av. Las Flores #78', 4),
  ('completado', 'Calle Cedro #90', 5),
  ('completado', 'Blvd. Los Laureles #123', 6),
  ('pendiente', 'Av. Los Pinos #145', 7),
  ('Cancelado', 'Calle Las Margaritas #167', 8),
  ('completado', 'Blvd. Los Lirios #189', 9),
  ('pendiente', 'Av. Los Naranjos #210', 10),
  ('pendiente', 'Calle Los Manzanos #232', 11),
  ('cancelado', 'Blvd. Las Orquídeas #254', 12),
  ('completado', 'Av. Los Eucaliptos #276', 13),
  ('completado', 'Calle Las Gardenias #298', 14),
  ('pendiente', 'Blvd. Los Fresnos #311', 15),
  ('cancelado', 'Av. Los Castaños #333', 16),
  ('completado', 'Calle Los Almendros #355', 17),
  ('completado', 'Blvd. Las Azaleas #377', 18),
  ('pendiente', 'Av. Los Cerezos #399', 19),
  ('cancelado', 'Calle Los Olmos #421', 20),
  ('completado', 'Blvd. Las Camelias #443', 21),
  ('completado', 'Av. Los Robles #465', 22),
  ('pendiente', 'Calle Las Jacarandas #487', 23),
  ('cancelado', 'Blvd. Los Sauces #509', 24),
  ('completado', 'Av. Los Tulipanes #531', 25);

SELECT * FROM pedidos;

INSERT INTO detalles_pedidos (cantidad_detalle_pedido, precio_detalle_pedido, id_producto, id_pedido)
VALUES 
  (20, 15.50, 1, 1),
  (10, 22.30, 2, 2),
  (30, 10.00, 3, 3),
  (40, 5.75, 4, 4),
  (50, 3.20, 5, 5),
  (20, 8.50, 6, 6),
  (10, 11.25, 7, 7),
  (30, 7.00, 8, 8),
  (40, 9.95, 9, 9),
  (50, 4.40, 10, 10),
  (20, 12.30, 11, 11),
  (10, 6.60, 12, 12),
  (30, 19.85, 13, 13),
  (40, 20.20, 14, 14),
  (50, 15.15, 15, 15),
  (20, 17.10, 16, 16),
  (10, 21.45, 17, 17),
  (30, 13.75, 18, 18),
  (40, 8.80, 19, 19),
  (50, 5.50, 20, 20),
  (20, 23.40, 21, 21),
  (10, 25.00, 22, 22),
  (30, 18.60, 23, 23),
  (40, 14.30, 24, 24),
  (50, 10.25, 25, 25);

SELECT * FROM detalles_pedidos;

INSERT INTO valoraciones (calificacion_valoracion, comentario_valoracion, estado_valoracion, id_detalle_pedido)
VALUES 
  (9.0, 'Excelente calidad y servicio', TRUE, 1),
  (7.5, 'Buen producto, pero entrega lenta', FALSE, 2),
  (8.0, 'Satisfecho con la compra', TRUE, 3),
  (6.5, 'Calidad aceptable, podría mejorar', TRUE, 4),
  (9.5, 'Superó mis expectativas', TRUE, 5),
  (8.5, 'Muy buen producto, lo recomiendo', TRUE, 6),
  (7.0, 'Satisfactorio, pero con margen de mejora', TRUE, 7),
  (5.5, 'No cumple con las expectativas', FALSE, 8),
  (9.2, 'Excelente atención al cliente', TRUE, 9),
  (6.8, 'Regular, esperaba más', FALSE, 10),
  (8.3, 'Buena relación calidad-precio', TRUE, 11),
  (7.8, 'Entrega a tiempo, producto en buen estado', TRUE, 12),
  (9.1, 'Producto de alta calidad, totalmente recomendado', TRUE, 13),
  (6.0, 'No estoy completamente satisfecho', FALSE, 14),
  (8.6, 'Gran compra, volvería a adquirirlo', TRUE, 15),
  (7.3, 'Buen servicio, producto cumple con lo prometido', TRUE, 16),
  (5.0, 'Decepcionado con el producto', FALSE, 17),
  (8.9, 'Excelente, sin quejas', TRUE, 18),
  (7.6, 'Buen producto, entrega puntual', TRUE, 19),
  (9.3, 'Increíble, por encima de lo esperado', TRUE, 20),
  (6.3, 'Aceptable, pero hay mejores opciones', FALSE, 21),
  (8.1, 'Contento con la compra, buen vendedor', TRUE, 22),
  (7.2, 'Satisfactorio pero con detalles menores', TRUE, 23),
  (5.8, 'No es lo que esperaba, pero el servicio es bueno', FALSE, 24),
  (9.4, 'Producto excepcional y entrega rápida', TRUE, 25);
  
SELECT * FROM valoraciones;

INSERT INTO cupones_oferta (codigo_cupon, porcentaje_cupon, estado_cupon)
VALUES 
  ('A1B2C3', 10, FALSE),
  ('D4E5F6', 15, FALSE),
  ('G7H8I9', 20, TRUE),
  ('J0K1L2', 25, TRUE),
  ('M3N4O5', 30, FALSE),
  ('P6Q7R8', 35, TRUE),
  ('S9T0U1', 40, FALSE),
  ('V2W3X4', 45, TRUE),
  ('Y5Z6A7', 50, TRUE),
  ('B8C9D0', 55, TRUE),
  ('E1F2G3', 5, FALSE),
  ('H4I5J6', 60, TRUE),
  ('K7L8M9', 65, TRUE),
  ('N0O1P2', 70, FALSE),
  ('Q3R4S5', 75, FALSE),
  ('T6U7V8', 80, TRUE),
  ('W9X0Y1', 85, TRUE),
  ('Z2A3B4', 90, FALSE),
  ('C5D6E7', 95, TRUE),
  ('F8G9H0', 12, FALSE),
  ('I1J2K3', 22, TRUE),
  ('L4M5N6', 32, FALSE),
  ('O7P8Q9', 42, TRUE),
  ('R0S1T2', 52, TRUE),
  ('U3V4W5', 62, FALSE);
  
SELECT * FROM cupones_oferta;

INSERT INTO cupones_utilizados (id_cupon, id_cliente)
VALUES 
   (1,1),
   (2,2),
   (3,3),
   (4,4),
   (5,5),
   (6,6),
   (7,7),
   (8,8),
   (9,9),
   (10,10),
   (11,11),
   (12,12),
   (13,13),
   (14,14),
   (15,15),
   (16,16),
   (17,17),
   (18,18),
   (19,19),
   (20,20),
   (21,21),
   (22,22),
   (23,23),
   (24,24),
   (25,25);
   
SELECT * FROM cupones_utilizados;


