/*Inserts para la tabla de permisos*/
INSERT INTO permisos (nombre_permiso, agregar_actualizar_usuario, eliminar_usuario, agregar_actualizar_producto, eliminar_producto, borrar_comentario, agregar_actualizar_categoria, borrar_categoria, gestionar_cupon)
VALUES 
  ('Administrador', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
  ('Moderador', FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE),
  ('Vendedor', FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE),
  ('Usuario Estándar', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
  ('Supervisor de Ventas', FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE),
  ('Asistente de Almacén', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
  ('Experto en Productos', FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, FALSE),
  ('Soporte al Cliente', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
  ('Editor de Contenido', FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
  ('Especialista en Cupones', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE),
  ('Usuario VIP', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
  ('Analista de Datos', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
  ('Asesor de Compras', FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE),
  ('Gerente de Operaciones', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
  ('Entrenador de Mascotas', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE),
  ('Diseñador de Productos', FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, FALSE),
  ('Especialista en Bienestar Animal', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
  ('Aficionado a las Mascotas', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE),
  ('Influencer Pet-friendly', FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE),
  ('Investigador de Tendencias', FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE),
  ('Evaluador de Productos', FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, FALSE),
  ('Experto en Nutrición Animal', FALSE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, FALSE),
  ('Planificador de Eventos Pet-friendly', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE),
  ('Diseñador de Tienda Virtual', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
  ('Explorador de Ofertas', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE);

SELECT * FROM permisos

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

SELECT * FROM administradores

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

SELECT * FROM asignacion_permisos

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

  
SELECT * FROM categorias

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

SELECT * FROM marcas

/*Inserts para la tabla de marcas*/
INSERT INTO productos (nombre_producto, descripcion_producto, precio_producto, imagen_producto, estado_producto, existencia_producto, fecha_registro_producto, mascotas, id_categoria, id_marca)
VALUES 
  ('Croquetas Premium', 'Nutritivas croquetas premium para perros y gatos.', 30.99, 'croquetas_premium.png', 'activo', 100, '2024-03-03', 'perro', 1, 1),
  ('Juguete Pelota Interactiva', 'Pelota interactiva para perros, ideal para juegos divertidos.', 12.50, 'pelota_interactiva.png', 'activo', 150, '2024-03-03', 'perro', 3, 7),
  ('Comedero Automático', 'Comedero automático programable para perros y gatos.', 45.75, 'comedero_automatico.png', 'activo', 50, '2024-03-03', 'perro', 6, 9),
  ('Arena Aglomerante', 'Arena aglomerante para gatos, controla olores y facilita la limpieza.', 14.99, 'arena_aglomerante.png', 'activo', 80, '2024-03-03', 'gato', 20, 11),
  ('Collar Ajustable', 'Collar ajustable para perros con diseño resistente y seguro.', 8.25, 'collar_ajustable.png', 'activo', 120, '2024-03-03', 'perro', 5, 4),
  ('Juguete para Roedores', 'Juguete interactivo para roedores, promueve el ejercicio.', 6.99, 'juguete_roedores.png', 'activo', 200, '2024-03-03', 'gato', 10, 13),
  ('Cama Suave y Cálida', 'Cama suave y cálida para perros y gatos, ideal para descansar.', 22.50, 'cama_suave_calida.png', 'activo', 90, '2024-03-03', 'perro', 4, 8),
  ('Acuario Completo', 'Acuario completo con accesorios, perfecto para peces tropicales.', 99.95, 'acuario_completo.png', 'activo', 30, '2024-03-03', 'gato', 12, 22),
  ('Snacks Naturales', 'Snacks naturales para perros, sin aditivos artificiales.', 9.75, 'snacks_naturales.png', 'activo', 150, '2024-03-03', 'perro', 2, 14),
  ('Cepillo para Gatos', 'Cepillo suave para el cuidado del pelaje de gatos.', 5.50, 'cepillo_gatos.png', 'activo', 100, '2024-03-03', 'gato', 16, 15),
  ('Juguete Dispensador de Comida', 'Juguete dispensador de comida para perros, estimula la mente.', 18.99, 'dispensador_comida.png', 'activo', 80, '2024-03-03', 'perro', 3, 6),
  ('Pecera de Diseño Moderno', 'Pecera de diseño moderno para peces ornamentales.', 65.50, 'pecera_moderna.png', 'activo', 40, '2024-03-03', 'gato', 11, 23),
  ('Set de Ropa para Perros', 'Set de ropa elegante y cómoda para perros pequeños.', 28.75, 'ropa_perros.png', 'activo', 60, '2024-03-03', 'perro', 7, 18),
  ('Caja de Arena para Roedores', 'Caja de arena para roedores, fácil de limpiar y mantener.', 11.99, 'caja_arena_roedores.png', 'activo', 120, '2024-03-03', 'gato', 10, 14),
  ('Cepillo de Dientes para Perros', 'Cepillo de dientes para perros, cuida la salud dental.', 6.25, 'cepillo_dientes_perros.png', 'activo', 100, '2024-03-03', 'perro', 14, 17),
  ('Alimento Húmedo para Gatos', 'Alimento húmedo para gatos, variedad de sabores y nutrientes.', 2.99, 'alimento_humedo_gatos.png', 'activo', 120, '2024-03-03', 'gato', 22, 5),
  ('Juguete Peluche para Cachorros', 'Peluche suave y seguro para cachorros, ideal para masticar.', 9.50, 'peluche_cachorros.png', 'activo', 80, '2024-03-03', 'perro', 3, 2),
  ('Caja Transportadora', 'Caja transportadora para gatos y perros pequeños, resistente y cómoda.', 34.99, 'caja_transportadora.png', 'activo', 40, '2024-03-03', 'gato', 8, 19),
  ('Juguete para Pájaros', 'Juguete colorido y divertido para entretener a pájaros.', 7.50, 'juguete_pajaros.png', 'activo', 60, '2024-03-03', 'gato', 18, 20),
  ('Set de Juguetes para Cachorros', 'Set variado de juguetes para cachorros, estimula el juego.', 19.99, 'set_juguetes_cachorros.png', 'activo', 100, '2024-03-03', 'perro', 3, 12),
  ('Alimento Especial para Aves', 'Alimento especializado para aves, con nutrientes esenciales.', 12.25, 'alimento_especial_aves.png', 'activo', 80, '2024-03-03', 'gato', 17, 21),
  ('Rascador para Gatos', 'Rascador resistente y divertido para gatos, cuida sus uñas.', 22.99, 'rascador_gatos.png', 'activo', 50, '2024-03-03', 'gato', 15, 10),
  ('Set de Juguetes para Peces', 'Set de juguetes para peces, proporciona enriquecimiento.', 14.75, 'set_juguetes_peces.png', 'activo', 60, '2024-03-03', 'gato', 12, 24),
  ('Comedero Elevado para Gatos', 'Comedero elevado para gatos, promueve una postura saludable.', 16.50, 'comedero_elevado_gatos.png', 'activo', 70, '2024-03-03', 'gato', 6, 16),
  ('Cuerda de Juego para Perros', 'Cuerda resistente para juegos interactivos con perros.', 9.25, 'cuerda_juego_perros.png', 'activo', 120, '2024-03-03', 'perro', 3, 7);

SELECT * FROM productos