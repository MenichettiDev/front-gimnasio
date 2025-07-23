-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Jan 17, 2025 at 01:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gimnasio`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_asistencia`
--

CREATE TABLE `tb_asistencia` (
  `id_asistencia` int(11) NOT NULL,
  `id_atleta` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `asistio` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_asistencia`
--

INSERT INTO `tb_asistencia` (`id_asistencia`, `id_atleta`, `fecha`, `asistio`) VALUES
(1, 1, '2025-01-15', 1),
(2, 1, '2025-01-17', 0),
(3, 1, '2025-01-19', 1),
(4, 1, '2025-01-22', 1),
(5, 1, '2025-01-24', 0),
(6, 1, '2025-01-26', 1),
(7, 1, '2025-01-29', 1),
(8, 1, '2025-02-01', 0),
(9, 1, '2025-02-03', 1),
(10, 1, '2025-02-05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_atleta`
--

CREATE TABLE `tb_atleta` (
  `id_atleta` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `id_entrenador` int(11) NOT NULL,
  `id_gimnasio` int(11) NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_atleta`
--

INSERT INTO `tb_atleta` (`id_atleta`, `id_persona`, `id_entrenador`, `id_gimnasio`, `estado`, `fecha_registro`) VALUES
(1, 3, 1, 1, 'activo', '2024-01-15 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tb_ejercicios`
--

CREATE TABLE `tb_ejercicios` (
  `id_ejercicio` int(11) NOT NULL,
  `id_grupo_muscular` int(11) NOT NULL,
  `id_entrenador` int(11) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL,
  `img_1` varchar(200) DEFAULT NULL,
  `img_2` varchar(200) DEFAULT NULL,
  `img_3` varchar(200) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `link_video` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_ejercicios`
--

INSERT INTO `tb_ejercicios` (`id_ejercicio`, `id_grupo_muscular`, `id_entrenador`, `nombre`, `img_1`, `img_2`, `img_3`, `descripcion`, `link_video`) VALUES
(1, 1, NULL, 'Sentadilla con barra', NULL, NULL, NULL, 'Coloca la barra sobre tus hombros, mantén la espalda recta y baja las caderas hasta que tus muslos estén paralelos al suelo. Luego, sube de nuevo a la posición inicial. Este ejercicio trabaja los cuádriceps, glúteos y músculos del core.', NULL),
(2, 1, NULL, 'Prensa de pierna', NULL, NULL, NULL, 'Siéntate en la máquina de prensa, coloca los pies en la plataforma, empuja hacia arriba y luego baja controladamente hasta que tus piernas estén a 90 grados. Este ejercicio trabaja los cuádriceps, isquiotibiales y glúteos.', NULL),
(3, 1, NULL, 'Zancadas con mancuernas', NULL, NULL, NULL, 'Da un paso largo hacia adelante, baja las caderas hasta que ambas piernas estén en ángulos de 90 grados y luego sube. Este ejercicio trabaja los cuádriceps y glúteos.', NULL),
(4, 1, NULL, 'Sentadilla Hack', NULL, NULL, NULL, 'Colócate en la máquina de sentadilla hack, coloca los pies sobre la plataforma y empuja hacia arriba, luego baja controladamente hasta que tus piernas formen un ángulo de 90 grados. Este ejercicio se enfoca en los cuádriceps.', NULL),
(5, 1, NULL, 'Sentadilla frontal', NULL, NULL, NULL, 'Con la barra colocada en la parte delantera de los hombros, baja el torso y las caderas hasta que los muslos estén paralelos al suelo. Este ejercicio pone más énfasis en los cuádriceps y la parte anterior de las piernas.', NULL),
(6, 1, NULL, 'Extensiones de pierna en máquina', NULL, NULL, NULL, 'Siéntate en la máquina de extensiones de pierna, ajusta el peso y las almohadillas para que queden sobre tus tobillos, luego extiende las piernas hacia adelante hasta que estén completamente rectas. Este ejercicio aisla los cuádriceps.', NULL),
(7, 1, NULL, 'Sentadilla búlgara', NULL, NULL, NULL, 'Colócate frente a un banco, con un pie sobre el banco y el otro en el suelo. Baja la cadera y la rodilla trasera hasta que tu muslo esté paralelo al suelo. Este ejercicio trabaja principalmente los cuádriceps y los glúteos.', NULL),
(8, 1, NULL, 'Curls de piernas en máquina', NULL, NULL, NULL, 'Colócate en la máquina de curl para piernas, ajusta el peso y realiza un movimiento de flexión de las rodillas hasta llevar los talones hacia los glúteos. Aunque es más enfocado en los isquiotibiales, también activa los cuádriceps al estabilizar la pelvis.', NULL),
(9, 1, NULL, 'Sentadilla con mancuernas (Goblet squat)', NULL, NULL, NULL, 'Sostén una mancuerna cerca del pecho, mantén la espalda recta y realiza una sentadilla profunda. Este ejercicio trabaja los cuádriceps y glúteos, pero de forma más aislada debido a la posición de la mancuerna.', NULL),
(10, 1, NULL, 'Desplantes caminando', NULL, NULL, NULL, 'Da pasos largos hacia adelante y baja el torso hasta que ambas piernas estén en ángulo de 90 grados. Este ejercicio activa fuertemente los cuádriceps, pero también trabaja los glúteos y los isquiotibiales.', NULL),
(11, 1, NULL, 'Saltos pliométricos (Plyometric squat jumps)', NULL, NULL, NULL, 'Desde la posición de sentadilla, salta hacia arriba lo más alto posible, extendiendo las piernas. Este ejercicio es explosivo y trabaja principalmente los cuádriceps, además de activar los glúteos y las pantorrillas.', NULL),
(12, 1, NULL, 'Sentadilla con barra en Smith machine', NULL, NULL, NULL, 'Colócate en el Smith machine, con la barra sobre los hombros. Baja el torso y las caderas hasta que los muslos estén paralelos al suelo y luego empuja hacia arriba. Es similar a la sentadilla tradicional, pero con más control por el movimiento guiado.', NULL),
(13, 1, NULL, 'Sentadilla sumo con mancuernas', NULL, NULL, NULL, 'Sostén una mancuerna con ambas manos, abre las piernas más allá del ancho de los hombros y baja el torso, manteniendo las piernas separadas y los pies hacia afuera. Este ejercicio pone mayor énfasis en los cuádriceps internos.', NULL),
(14, 1, NULL, 'Sentadilla con kettlebell', NULL, NULL, NULL, 'Sostén un kettlebell cerca del pecho con ambas manos, y realiza una sentadilla profunda. Este ejercicio se enfoca principalmente en los cuádriceps y también en los glúteos.', NULL),
(15, 1, NULL, 'Salto en caja (Box jumps)', NULL, NULL, NULL, 'De pie frente a una caja o plataforma, salta hacia arriba con ambos pies, aterrizando sobre la caja. Este ejercicio trabaja los cuádriceps, glúteos y la potencia en las piernas.', NULL),
(16, 3, NULL, 'Press de banca con barra', NULL, NULL, NULL, 'Acuéstate en un banco plano, agarra la barra con las manos ligeramente más anchas que el ancho de los hombros. Baja la barra hasta el pecho y luego empújala hacia arriba hasta extender completamente los brazos. Este ejercicio trabaja principalmente el pectoral mayor.', NULL),
(17, 3, NULL, 'Press de banca con mancuernas', NULL, NULL, NULL, 'Similar al press de banca con barra, pero usando mancuernas. Esto permite un rango de movimiento más amplio y una activación mayor de los músculos estabilizadores. Baja las mancuernas hasta el nivel del pecho y luego empuja hacia arriba.', NULL),
(18, 3, NULL, 'Aperturas con mancuernas', NULL, NULL, NULL, 'Acuéstate en un banco plano, sostén una mancuerna en cada mano con los brazos extendidos, luego abre los brazos hacia los lados hasta que los codos estén a la altura del banco y vuelve a la posición inicial. Este ejercicio trabaja la parte externa del pectoral.', NULL),
(19, 3, NULL, 'Flexiones de pecho', NULL, NULL, NULL, 'Colócate en posición de plancha, con las manos a la altura del pecho. Baja el pecho hacia el suelo y luego empuja hacia arriba hasta que los brazos estén completamente extendidos. Este ejercicio trabaja el pectoral mayor, tríceps y hombros.', NULL),
(20, 3, NULL, 'Press de banca inclinado con barra', NULL, NULL, NULL, 'Colócate en un banco inclinado (30-45 grados), agarra la barra con las manos ligeramente más anchas que el ancho de los hombros y baja la barra hasta el nivel del pecho superior. Luego empuja hacia arriba. Este ejercicio trabaja la parte superior del pectoral.', NULL),
(21, 3, NULL, 'Press de banca inclinado con mancuernas', NULL, NULL, NULL, 'Similar al press de banca inclinado con barra, pero utilizando mancuernas. Esto permite un mayor rango de movimiento y trabaja más los músculos estabilizadores. Baja las mancuernas hasta el nivel del pecho y empuja hacia arriba.', NULL),
(22, 3, NULL, 'Aperturas con mancuernas en banco inclinado', NULL, NULL, NULL, 'Acuéstate en un banco inclinado con mancuernas en cada mano, abre los brazos hacia los lados y luego junta las mancuernas sobre tu pecho. Este ejercicio enfoca la parte superior del pectoral.', NULL),
(23, 3, NULL, 'Fondos entre bancos', NULL, NULL, NULL, 'Siéntate en un banco con las manos apoyadas a los lados. Coloca los talones de los pies en el suelo, con los codos flexionados baja el torso hacia el suelo, luego empuja hacia arriba. Este ejercicio trabaja el pectoral mayor y los tríceps.', NULL),
(24, 3, NULL, 'Press de pecho en máquina', NULL, NULL, NULL, 'En la Smith machine, ajusta el banco en posición plana. Agarra la barra y realiza un press de banca similar al convencional, pero con más control debido al movimiento guiado de la máquina.', NULL),
(25, 3, NULL, 'Pullover con mancuerna', NULL, NULL, NULL, 'Acuéstate en un banco plano, sostén una mancuerna con ambas manos y extiende los brazos por encima de tu pecho. Baja la mancuerna detrás de tu cabeza, manteniendo los codos ligeramente doblados, y luego vuelve a la posición inicial. Este ejercicio trabaja el pectoral mayor y los músculos de la caja torácica.', NULL),
(26, 3, NULL, 'Press de banca declinado con barra', NULL, NULL, NULL, 'Colócate en un banco declinado y agarra la barra con las manos ligeramente más anchas que el ancho de los hombros. Baja la barra hacia la parte inferior del pecho y empuja hacia arriba. Este ejercicio pone énfasis en la parte inferior del pectoral.', NULL),
(27, 3, NULL, 'Press de pecho con mancuernas en banco declinado', NULL, NULL, NULL, 'Similar al press de banca declinado con barra, pero usando mancuernas. Esto permite una mayor libertad de movimiento y activa más los músculos estabilizadores.', NULL),
(28, 3, NULL, 'Pullover en máquina', NULL, NULL, NULL, 'Colócate en una máquina de pullover, ajusta las almohadillas de los brazos y jala las manijas hacia adelante hasta que los brazos estén extendidos. Este ejercicio trabaja tanto los pectorales como los músculos de la caja torácica.', NULL),
(29, 3, NULL, 'Aperturas en máquina (Pec Deck)', NULL, NULL, NULL, 'Siéntate en la máquina Pec Deck con los antebrazos en los pads. Junta las manos frente a ti mientras mantienes los codos ligeramente doblados. Este ejercicio aísla el pectoral mayor, especialmente la parte media.', NULL),
(30, 3, NULL, 'Flexiones con elevación de pies', NULL, NULL, NULL, 'Similar a las flexiones tradicionales, pero con los pies elevados en un banco. Esta variación pone más énfasis en la parte superior del pectoral.', NULL),
(31, 2, NULL, 'Curl de pierna en máquina (acostado)', NULL, NULL, NULL, 'Acuéstate en la máquina de curl de pierna con los tobillos debajo de los rodillos. Flexiona las piernas hacia los glúteos y luego regresa a la posición inicial. Este ejercicio trabaja principalmente los isquiotibiales de manera aislada.', NULL),
(32, 2, NULL, 'Curl de pierna en máquina (sentado)', NULL, NULL, NULL, 'Siéntate en la máquina de curl de pierna, ajusta las almohadillas sobre tus muslos y coloca los tobillos debajo de los rodillos. Flexiona las piernas hacia los glúteos y luego vuelve a la posición inicial. Es similar al anterior pero con una ligera variación en el ángulo de trabajo.', NULL),
(33, 2, NULL, 'Peso muerto rumano', NULL, NULL, NULL, 'De pie, con las piernas ligeramente flexionadas y una barra frente a ti, baja el torso hacia adelante manteniendo la espalda recta. Luego vuelve a la posición inicial al levantar el torso. Este ejercicio trabaja principalmente los isquiotibiales y los glúteos.', NULL),
(34, 2, NULL, 'Peso muerto con mancuernas', NULL, NULL, NULL, 'Similar al peso muerto rumano, pero usando mancuernas. Mantén las mancuernas frente a tus muslos y baja el torso hacia adelante manteniendo la espalda recta. Regresa a la posición inicial al levantar el torso. Este ejercicio también activa los glúteos y los isquiotibiales.', NULL),
(35, 2, NULL, 'Buenos días', NULL, NULL, NULL, 'Con una barra sobre los hombros, realiza una flexión del torso hacia adelante, manteniendo las piernas ligeramente dobladas y la espalda recta. Este ejercicio trabaja los isquiotibiales, la zona lumbar y los glúteos.', NULL),
(36, 2, NULL, 'Elevación de caderas (Hip thrust)', NULL, NULL, NULL, 'Acuéstate en el suelo con los omóplatos apoyados en un banco y las piernas flexionadas. Coloca una barra sobre tus caderas y empuja las caderas hacia arriba hasta formar una línea recta desde las rodillas hasta los hombros. Este ejercicio trabaja los isquiotibiales, glúteos y la zona lumbar.', NULL),
(37, 2, NULL, 'Curl de pierna con fitball', NULL, NULL, NULL, 'Acuéstate sobre el suelo con los talones sobre un fitball. Eleva las caderas y, con los talones, tira del balón hacia tus glúteos, luego regresa a la posición inicial. Este ejercicio trabaja los isquiotibiales de manera funcional y también activa el core.', NULL),
(38, 2, NULL, 'Sprint o carrera en cuestas', NULL, NULL, NULL, 'Corre de manera explosiva en cuestas o en terreno inclinado. Este tipo de sprints pone mucho énfasis en los isquiotibiales, ayudando a mejorar la fuerza y la potencia en las piernas.', NULL),
(39, 2, NULL, 'Zancadas (Lunges)', NULL, NULL, NULL, 'Da un paso largo hacia adelante con una pierna, baja la cadera hasta que ambas rodillas estén a 90 grados y luego empuja hacia atrás para volver a la posición inicial. Este ejercicio trabaja los isquiotibiales, glúteos y cuádriceps.', NULL),
(40, 2, NULL, 'Sentadilla con barra (enfoque en isquiotibiales)', NULL, NULL, NULL, 'Realiza una sentadilla tradicional, pero con un ángulo de cadera más profundo y ligeramente más cerrado para poner más énfasis en los isquiotibiales. Mantén el torso erguido y empuja hacia arriba al final del movimiento.', NULL),
(41, 4, NULL, 'Hip Thrust (Elevación de caderas con barra)', NULL, NULL, NULL, 'Acuéstate en el suelo con los omóplatos apoyados en un banco y las piernas flexionadas. Coloca una barra sobre tus caderas y empuja las caderas hacia arriba hasta formar una línea recta desde las rodillas hasta los hombros. Este ejercicio trabaja principalmente los glúteos.', NULL),
(42, 4, NULL, 'Sentadillas (Squats)', NULL, NULL, NULL, 'Realiza una sentadilla tradicional bajando las caderas hacia atrás y abajo hasta que los muslos estén paralelos al suelo. Este ejercicio activa fuertemente los glúteos y cuádriceps.', NULL),
(43, 4, NULL, 'Zancadas (Lunges)', NULL, NULL, NULL, 'Da un paso largo hacia adelante, baja la cadera hasta que ambas rodillas estén a 90 grados y luego empuja hacia atrás para volver a la posición inicial. Este ejercicio trabaja los glúteos y los músculos de las piernas de forma unilateral.', NULL),
(44, 4, NULL, 'Sentadillas sumo (Sumo Squats)', NULL, NULL, NULL, 'Realiza una sentadilla con las piernas más separadas de lo normal (como un \"V\" invertida) y los pies apuntando hacia afuera. Este ejercicio pone mayor énfasis en los glúteos y los aductores.', NULL),
(45, 4, NULL, 'Peso muerto rumano (Romanian Deadlift)', NULL, NULL, NULL, 'Con las piernas ligeramente flexionadas, baja la barra hacia el suelo mientras mantienes la espalda recta, enfocándote en la activación de los glúteos y los isquiotibiales. Luego regresa a la posición inicial.', NULL),
(46, 4, NULL, 'Patada de glúteo en máquina', NULL, NULL, NULL, 'Colócate en la máquina de patadas de glúteo y, con la pierna extendida hacia atrás, contrae el glúteo para levantar la pierna. Este es un excelente ejercicio para aislar y activar los glúteos.', NULL),
(47, 4, NULL, 'Step-ups (Subir a un banco)', NULL, NULL, NULL, 'Coloca un pie sobre un banco o plataforma elevada y empuja hacia arriba para levantar el cuerpo. Regresa a la posición inicial. Este ejercicio trabaja los glúteos, cuádriceps y core.', NULL),
(48, 4, NULL, 'Patada de glúteo con cable', NULL, NULL, NULL, 'Usando una máquina de cables, coloca un tobillo en el agarre bajo del cable, patea hacia atrás enfocándote en la activación del glúteo. Este es un ejercicio muy eficaz para trabajar los glúteos de forma aislada.', NULL),
(49, 4, NULL, 'Elevación de caderas con fitball', NULL, NULL, NULL, 'Acuéstate con los pies sobre un fitball y las manos apoyadas en el suelo. Eleva las caderas hacia arriba apretando los glúteos. Este ejercicio ayuda a trabajar los glúteos y los músculos de la zona lumbar.', NULL),
(50, 4, NULL, 'Glute Bridge (Puente de glúteos)', NULL, NULL, NULL, 'Acuéstate sobre tu espalda con las piernas flexionadas y los pies planos en el suelo. Eleva las caderas hacia arriba apretando los glúteos al máximo, formando una línea recta desde los hombros hasta las rodillas.', NULL),
(51, 5, NULL, 'Remo con barra', NULL, NULL, NULL, 'De pie, con las piernas ligeramente flexionadas y el torso inclinado hacia adelante, agarra la barra con un agarre pronado (palmas hacia abajo) y tira de ella hacia tu abdomen, apretando los omóplatos al final del movimiento.', NULL),
(52, 5, NULL, 'Pull-up (Dominadas)', NULL, NULL, NULL, 'Colócate colgado de una barra de dominadas con las palmas mirando hacia afuera (agarre pronado). Jala tu cuerpo hacia arriba hasta que tu barbilla esté por encima de la barra y luego baja lentamente.', NULL),
(53, 5, NULL, 'Remo con mancuernas a una mano', NULL, NULL, NULL, 'Apoya una rodilla y una mano sobre un banco, agarra una mancuerna con la otra mano y realiza un movimiento de remo llevando el codo hacia atrás. Este ejercicio trabaja la parte superior de la espalda y los trapecios.', NULL),
(54, 5, NULL, 'Face Pull con cuerda (en máquina de cables)', NULL, NULL, NULL, 'Colócate frente a una máquina de cables con una cuerda adjunta. Agarra la cuerda con las manos en un agarre neutral y tira de ella hacia tu cara, separando los codos hacia los lados. Este ejercicio es excelente para trabajar la parte superior de la espalda y los deltoides posteriores.', NULL),
(55, 5, NULL, 'Pull-over con mancuerna', NULL, NULL, NULL, 'Acostado sobre un banco, sostiene una mancuerna con ambas manos y extiende los brazos por encima de tu pecho. Baja los brazos hacia atrás y luego regresa a la posición inicial. Este ejercicio trabaja los dorsales, pero también activa la parte alta de la espalda.', NULL),
(56, 5, NULL, 'Remo invertido (Inverted Row)', NULL, NULL, NULL, 'Colócate bajo una barra (en un rack o barra baja), agárrala con las manos en un agarre pronado y tira de tu torso hacia la barra. Este ejercicio trabaja la espalda alta y los músculos estabilizadores del core.', NULL),
(57, 5, NULL, 'Remo en máquina sentado', NULL, NULL, NULL, 'Siéntate en la máquina de remo, ajusta los pies y agarra las manijas. Jala las manijas hacia tu torso apretando los omóplatos al final del movimiento. Este ejercicio aísla la espalda media y alta.', NULL),
(58, 5, NULL, 'Remo con barra T', NULL, NULL, NULL, 'Colócate de pie en una barra T o máquina de remo T, agarra las manijas y tira de ellas hacia tu torso. Este ejercicio trabaja los trapecios, romboides y la parte alta de la espalda.', NULL),
(59, 5, NULL, 'Peso muerto con barra (enfoque en espalda alta)', NULL, NULL, NULL, 'Con una barra frente a ti y las piernas ligeramente flexionadas, levántala manteniendo la espalda recta, apretando los omóplatos al final del movimiento. Este ejercicio trabaja los isquiotibiales, glúteos, pero también la espalda alta.', NULL),
(60, 5, NULL, 'Shrugs (Encogimientos de hombros)', NULL, NULL, NULL, 'Con una barra o mancuernas en las manos, encoge los hombros hacia las orejas. Este ejercicio activa principalmente los trapecios, pero también ayuda a fortalecer la parte alta de la espalda.', NULL),
(61, 6, NULL, 'Peso muerto convencional', NULL, NULL, NULL, 'Colócate frente a una barra con los pies a la altura de los hombros, agárrala con las manos a la anchura de los hombros y levántala manteniendo la espalda recta y los abdominales contraídos. Este ejercicio trabaja los isquiotibiales, glúteos y espalda baja.', NULL),
(62, 6, NULL, 'Superman', NULL, NULL, NULL, 'Acuéstate boca abajo con los brazos extendidos hacia adelante y las piernas estiradas. Eleva las piernas y los brazos del suelo, apretando los glúteos y la espalda baja. Mantén la posición unos segundos y regresa. Este ejercicio activa la espalda baja y glúteos.', NULL),
(63, 6, NULL, 'Hiperextensiones', NULL, NULL, NULL, 'Acuéstate en una máquina de hiperextensiones, asegurándote de que tus caderas queden apoyadas sobre el cojín. Baja el torso hacia el suelo y luego levántalo hacia atrás, manteniendo la espalda recta. Este ejercicio trabaja la parte baja de la espalda.', NULL),
(64, 6, NULL, 'Good mornings', NULL, NULL, NULL, 'De pie, con una barra sobre los hombros, inclina el torso hacia adelante desde las caderas, manteniendo la espalda recta. Baja hasta que el torso esté paralelo al suelo y luego regresa a la posición inicial. Este ejercicio activa los isquiotibiales y la espalda baja.', NULL),
(65, 6, NULL, 'Deadlift rumano (Romanian Deadlift)', NULL, NULL, NULL, 'De pie con una barra frente a ti, baja la barra manteniendo la espalda recta y las piernas ligeramente flexionadas. Baja hasta que sientas el estiramiento en los isquiotibiales y luego vuelve a la posición inicial. Este ejercicio trabaja la espalda baja, glúteos e isquiotibiales.', NULL),
(66, 6, NULL, 'Kettlebell Swing', NULL, NULL, NULL, 'De pie, con las piernas ligeramente separadas, sujeta una kettlebell con ambas manos y, desde una posición de cuclillas, empuja la kettlebell hacia adelante y hacia arriba, usando la fuerza de las caderas. Este ejercicio trabaja la espalda baja, glúteos y core.', NULL),
(67, 6, NULL, 'Sentadilla sumo con barra', NULL, NULL, NULL, 'Realiza una sentadilla con los pies más separados de lo normal y los dedos apuntando hacia afuera. Mantén la espalda recta mientras bajas hacia el suelo. Este ejercicio trabaja la parte baja de la espalda, los glúteos y los aductores.', NULL),
(68, 6, NULL, 'Planchas (Planks)', NULL, NULL, NULL, 'Colócate en posición de push-up, pero apoya los codos en el suelo. Mantén el cuerpo recto, activando los abdominales y la espalda baja. Este ejercicio fortalece tanto el core como la espalda baja.', NULL),
(69, 6, NULL, 'Bridge (Puente)', NULL, NULL, NULL, 'Acuéstate boca arriba con las piernas flexionadas y los pies apoyados en el suelo. Eleva las caderas hacia el techo apretando los glúteos y la espalda baja, manteniendo los hombros en el suelo. Este ejercicio activa la parte baja de la espalda y los glúteos.', NULL),
(70, 6, NULL, 'Rows con cable en polea baja', NULL, NULL, NULL, 'Colócate de pie frente a una máquina de cables con un agarre bajo. Tira del cable hacia tu torso mientras mantienes la espalda recta y los codos pegados al cuerpo. Este ejercicio activa la parte baja de la espalda, romboides y trapecios.', NULL),
(71, 7, NULL, 'Curl de bíceps con barra', NULL, NULL, NULL, 'De pie, sujeta una barra con las manos a la altura de los hombros y las palmas hacia arriba. Flexiona los codos y eleva la barra hacia los hombros, manteniendo la espalda recta. Baja lentamente a la posición inicial. Este ejercicio trabaja los bíceps.', NULL),
(72, 7, NULL, 'Curl de bíceps con mancuernas', NULL, NULL, NULL, 'De pie, sujeta una mancuerna en cada mano con las palmas hacia adelante. Flexiona los codos y eleva las mancuernas hacia los hombros, luego baja lentamente. Este ejercicio trabaja los bíceps de forma aislada.', NULL),
(73, 7, NULL, 'Curl concentrado', NULL, NULL, NULL, 'Sentado en un banco, sujeta una mancuerna con una mano y apóyate en el muslo para estabilizarte. Flexiona el codo y eleva la mancuerna hacia el hombro, concentrando el esfuerzo en el bíceps. Luego baja lentamente. Este ejercicio aísla el bíceps.', NULL),
(74, 7, NULL, 'Curl predicador', NULL, NULL, NULL, 'Sentado en una máquina de curl predicador, coloca los brazos sobre el soporte y sujeta la barra con las palmas hacia arriba. Flexiona los codos y lleva la barra hacia los hombros, luego regresa lentamente. Este ejercicio aísla los bíceps.', NULL),
(75, 7, NULL, 'Curl martillo', NULL, NULL, NULL, 'De pie, sujeta una mancuerna en cada mano con las palmas enfrentadas. Flexiona los codos y eleva las mancuernas hacia los hombros, manteniendo las palmas enfrentadas. Este ejercicio trabaja los bíceps y los braquiales.', NULL),
(76, 7, NULL, 'Curl con barra Z', NULL, NULL, NULL, 'De pie, sujeta una barra Z con las manos a la altura de los hombros y las palmas hacia arriba. Flexiona los codos y eleva la barra hacia los hombros, luego baja lentamente. Este ejercicio reduce el estrés en las muñecas en comparación con el curl de barra recta.', NULL),
(77, 7, NULL, 'Curl en cable con barra', NULL, NULL, NULL, 'De pie frente a una máquina de cables, sujeta una barra con las palmas hacia arriba y tira del cable hacia los hombros, flexionando los codos. Este ejercicio trabaja los bíceps de forma constante durante todo el movimiento.', NULL),
(78, 7, NULL, 'Curl en banco inclinado', NULL, NULL, NULL, 'Acuéstate en un banco inclinado, sujeta una mancuerna en cada mano con las palmas hacia arriba. Flexiona los codos y eleva las mancuernas hacia los hombros, luego baja lentamente. Este ejercicio pone mayor énfasis en la parte baja del bíceps.', NULL),
(79, 7, NULL, 'Curl de bíceps con cuerda en polea', NULL, NULL, NULL, 'De pie frente a una máquina de cables, sujeta una cuerda con las manos en un agarre neutral. Flexiona los codos y lleva la cuerda hacia los hombros, separando ligeramente los codos hacia los lados. Este ejercicio trabaja los bíceps y la parte superior de los antebrazos.', NULL),
(80, 7, NULL, 'Curl de bíceps en máquina', NULL, NULL, NULL, 'Siéntate en la máquina de curl de bíceps, ajusta el asiento y agarra las manijas con las palmas hacia arriba. Flexiona los codos y lleva las manijas hacia los hombros, luego baja lentamente. Este ejercicio aísla los bíceps y proporciona un movimiento controlado.', NULL),
(81, 8, NULL, 'Fondos de triceps', NULL, NULL, NULL, 'Colócate entre dos barras paralelas y sujeta las barras con las manos. Baja el cuerpo doblando los codos hasta que los brazos formen un ángulo de 90 grados, luego empuja hacia arriba hasta extender completamente los codos. Este ejercicio trabaja principalmente los tríceps.', NULL),
(82, 8, NULL, 'Extensiones de triceps con cuerda en polea', NULL, NULL, NULL, 'De pie frente a una máquina de cables, agarra una cuerda con las palmas hacia abajo. Tira de la cuerda hacia abajo hasta que tus codos estén completamente extendidos, concentrándote en contraer los tríceps al final del movimiento.', NULL),
(83, 8, NULL, 'Extensión de triceps por encima de la cabeza con m', NULL, NULL, NULL, 'Siéntate en un banco o colócate de pie, agarra una mancuerna con ambas manos por encima de la cabeza. Baja la mancuerna detrás de la cabeza flexionando los codos y luego extiende los brazos hacia arriba. Este ejercicio trabaja los tríceps en toda su extensión.', NULL),
(84, 8, NULL, 'Patada de triceps', NULL, NULL, NULL, 'De pie, inclina ligeramente el torso hacia adelante y sostiene una mancuerna en una mano. Con el codo doblado, extiende el brazo hacia atrás hasta que el codo esté completamente recto. Este ejercicio aísla los tríceps, enfocándose en la parte posterior del brazo.', NULL),
(85, 8, NULL, 'Press de triceps en banco', NULL, NULL, NULL, 'Acuéstate en un banco plano, sujeta una barra con las palmas hacia arriba y los codos doblados a 90 grados. Empuja la barra hacia arriba hasta que los brazos estén completamente extendidos, activando los tríceps al final del movimiento.', NULL),
(86, 8, NULL, 'Extensiones de triceps en máquina', NULL, NULL, NULL, 'Siéntate en una máquina de extensión de triceps, ajusta el asiento y agarra las manijas con las palmas hacia abajo. Extiende los brazos hacia abajo hasta que los codos estén completamente rectos. Este ejercicio aísla los tríceps y proporciona un movimiento controlado.', NULL),
(87, 8, NULL, 'Dips asistidos', NULL, NULL, NULL, 'Colócate en una máquina de dips asistidos, ajusta el peso de asistencia y agarra las barras. Baja el cuerpo doblando los codos y luego empuja hacia arriba hasta que los brazos estén completamente extendidos. Este ejercicio trabaja los tríceps y el pecho.', NULL),
(88, 8, NULL, 'Extensión de triceps en polea baja', NULL, NULL, NULL, 'De pie frente a una máquina de cables, sujeta una barra con las palmas hacia abajo y extiende el brazo hacia abajo hasta que los codos estén completamente extendidos. Este ejercicio activa los tríceps, especialmente la porción larga del músculo.', NULL),
(89, 8, NULL, 'Push-ups con manos juntas', NULL, NULL, NULL, 'Colócate en una posición de push-up pero coloca las manos juntas directamente debajo del pecho. Baja el cuerpo hacia el suelo y empuja hacia arriba, concentrándote en los tríceps al realizar el movimiento. Este ejercicio también involucra el pecho y los hombros.', NULL),
(90, 8, NULL, 'Curl de triceps en cuerda en polea', NULL, NULL, NULL, 'De pie frente a una máquina de cables con una cuerda adjunta, agarra la cuerda con las palmas hacia abajo. Tira de la cuerda hacia abajo hasta que los codos estén completamente extendidos, separando las manos para un mayor enfoque en los tríceps.', NULL),
(91, 9, NULL, 'Press militar con barra', NULL, NULL, NULL, 'De pie o sentado, agarra una barra a la altura de los hombros con un agarre ligeramente más ancho que los hombros. Empuja la barra hacia arriba hasta que los brazos estén completamente extendidos. Este ejercicio trabaja principalmente los deltoides anteriores y medios.', NULL),
(92, 9, NULL, 'Elevaciones laterales con mancuernas', NULL, NULL, NULL, 'De pie, sujeta una mancuerna en cada mano y levanta los brazos hacia los lados hasta que lleguen a la altura de los hombros. Este ejercicio se enfoca en el deltoides medio y es excelente para dar amplitud a los hombros.', NULL),
(93, 9, NULL, 'Elevaciones frontales con mancuernas', NULL, NULL, NULL, 'De pie, sujeta una mancuerna en cada mano y levanta los brazos hacia el frente hasta que lleguen a la altura de los hombros. Este ejercicio trabaja el deltoides anterior.', NULL),
(94, 9, NULL, 'Remo al mentón con barra', NULL, NULL, NULL, 'De pie, agarra una barra con las manos a la altura de los muslos y con un agarre más estrecho que el ancho de los hombros. Jala la barra hacia arriba, manteniéndola cerca del cuerpo y levantando los codos hacia los lados. Este ejercicio trabaja principalmente el deltoides medio y trapecios.', NULL),
(95, 9, NULL, 'Elevaciones posteriores con mancuernas', NULL, NULL, NULL, 'Sentado o inclinado hacia adelante, sujeta una mancuerna en cada mano con los brazos colgando. Levanta las mancuernas hacia los lados, manteniendo los codos ligeramente doblados. Este ejercicio enfoca en el deltoides posterior.', NULL),
(96, 9, NULL, 'Press Arnold', NULL, NULL, NULL, 'Siéntate en un banco con respaldo, sujeta una barra a la altura de los hombros con las palmas hacia el rostro. Gira las muñecas mientras empujas la barra hacia arriba, extendiendo los brazos completamente. Este ejercicio trabaja todos los músculos del hombro, especialmente el deltoides anterior.', NULL),
(97, 9, NULL, 'Face Pull con cuerda', NULL, NULL, NULL, 'Colócate frente a una máquina de cables con una cuerda ajustada a la polea alta. Agarra la cuerda con las manos en un agarre neutral y tira de ella hacia tu cara, separando los codos hacia los lados. Este ejercicio activa los deltoides posteriores y los trapecios.', NULL),
(98, 9, NULL, 'Push Press', NULL, NULL, NULL, 'De pie, con la barra a la altura de los hombros, realiza un pequeño salto para asistir el movimiento de empujar la barra hacia arriba hasta que los brazos estén completamente extendidos. Este ejercicio trabaja principalmente los deltoides, pero también involucra las piernas y el core.', NULL),
(99, 9, NULL, 'Pájaro en máquina', NULL, NULL, NULL, 'Siéntate en una máquina para pájaro, sujeta las manijas y abre los brazos hacia los lados, manteniendo los codos ligeramente doblados. Este ejercicio se enfoca en los deltoides posteriores y es excelente para trabajar la parte trasera del hombro.', NULL),
(100, 9, NULL, 'Elevaciones laterales en polea', NULL, NULL, NULL, 'De pie, sujeta una polea baja con una mano. Eleva el brazo hacia el lado hasta que llegue a la altura del hombro, manteniendo el cuerpo recto. Este ejercicio trabaja el deltoides medio de forma constante debido a la tensión proporcionada por la polea.', NULL),
(101, 9, NULL, 'Press de hombros con mancuernas', NULL, NULL, NULL, 'Sentado en un banco con respaldo, sujeta una mancuerna en cada mano a la altura de los hombros. Empuja las mancuernas hacia arriba hasta que los brazos estén completamente extendidos. Este ejercicio trabaja el deltoides anterior y medio.', NULL),
(102, 9, NULL, 'Elevaciones laterales con cable', NULL, NULL, NULL, 'De pie, agarra una polea baja con una mano. Eleva el brazo hacia un lado hasta que llegue a la altura del hombro, manteniendo el codo ligeramente doblado. Este ejercicio se enfoca en el deltoides medio.', NULL),
(103, 9, NULL, 'Press en máquina de hombros', NULL, NULL, NULL, 'Siéntate en una máquina de press para hombros. Ajusta el asiento de modo que las manijas estén a la altura de los hombros. Empuja las manijas hacia arriba hasta que los brazos estén completamente extendidos. Este ejercicio trabaja el deltoides anterior y medio.', NULL),
(104, 9, NULL, 'Elevaciones frontales con barra', NULL, NULL, NULL, 'De pie, sujeta una barra con un agarre a la altura de los muslos. Eleva la barra hacia el frente hasta la altura de los hombros, luego bájala lentamente. Este ejercicio trabaja el deltoides anterior.', NULL),
(105, 9, NULL, 'Elevaciones posteriores en peck deck', NULL, NULL, NULL, 'Siéntate en una máquina peck deck, ajusta el asiento y coloca las manos en las manijas. Abre los brazos hacia los lados, manteniendo los codos ligeramente doblados. Este ejercicio se enfoca en los deltoides posteriores.', NULL),
(106, 9, NULL, 'Press de hombros en máquina Smith', NULL, NULL, NULL, 'De pie, coloca una barra en una máquina Smith a la altura de los hombros. Empuja la barra hacia arriba hasta que los brazos estén completamente extendidos. Este ejercicio trabaja principalmente el deltoides anterior.', NULL),
(107, 9, NULL, 'Pull-aparts con banda elástica', NULL, NULL, NULL, 'De pie, sujeta una banda elástica con ambas manos y mantenla estirada frente a ti. Separa las manos extendiendo los brazos hacia los lados hasta que tus manos lleguen a la altura de los hombros. Este ejercicio se enfoca en los deltoides posteriores y los trapecios.', NULL),
(108, 9, NULL, 'Kettlebell Press', NULL, NULL, NULL, 'De pie, con una kettlebell en cada mano a la altura de los hombros, empuja las kettlebells hacia arriba hasta que los brazos estén completamente extendidos. Este ejercicio trabaja los deltoides anterior y medio.', NULL),
(109, 9, NULL, 'Reverse Cable Fly', NULL, NULL, NULL, 'De pie, con una polea en cada lado de tu cuerpo a la altura de los hombros. Agarra las manijas con las palmas enfrentadas. Jala las manijas hacia atrás, manteniendo los codos ligeramente doblados. Este ejercicio trabaja los deltoides posteriores.', NULL),
(110, 9, NULL, 'Lateral Raise Machine', NULL, NULL, NULL, 'Siéntate en una máquina de elevaciones laterales. Coloca los brazos en los apoyos y levanta las manijas hacia los lados hasta que lleguen a la altura de los hombros. Este ejercicio se enfoca en el deltoides medio.', NULL),
(111, 10, NULL, 'Encogimientos de hombros con barra', NULL, NULL, NULL, 'De pie, sujeta una barra con un agarre a la altura de los muslos. Eleva los hombros hacia las orejas sin mover los brazos, enfocándote en los trapecios. Baja lentamente a la posición inicial. Este ejercicio trabaja los trapecios superiores.', NULL),
(112, 10, NULL, 'Encogimientos de hombros con mancuernas', NULL, NULL, NULL, 'De pie, sujeta una mancuerna en cada mano y levanta los hombros hacia las orejas, manteniendo los brazos rectos. Baja lentamente a la posición inicial. Este ejercicio trabaja los trapecios superiores.', NULL),
(113, 10, NULL, 'Remo con barra al mentón', NULL, NULL, NULL, 'De pie, sujeta una barra con un agarre estrecho. Levanta la barra hacia el mentón, manteniendo los codos hacia afuera. Este ejercicio trabaja tanto los trapecios como los deltoides.', NULL),
(114, 10, NULL, 'Remo en máquina para trapecios', NULL, NULL, NULL, 'Siéntate en una máquina de remo para trapecios, ajusta el asiento y agarra las manijas. Tira de las manijas hacia tu torso, concentrándote en activar los trapecios al final del movimiento. Este ejercicio aísla los trapecios.', NULL),
(115, 10, NULL, 'Remo con barra T', NULL, NULL, NULL, 'Coloca una barra en una máquina de remo T y agarra las manijas. Jala el peso hacia el torso mientras aprietas los omóplatos hacia adentro, enfocándote en los trapecios. Este ejercicio trabaja tanto los trapecios como los romboides.', NULL),
(116, 10, NULL, 'Shrugs con barra en máquina Smith', NULL, NULL, NULL, 'De pie, coloca una barra en una máquina Smith. Eleva los hombros hacia las orejas, concentrándote en los trapecios superiores. Baja lentamente a la posición inicial. Este ejercicio aísla los trapecios.', NULL),
(117, 10, NULL, 'Shrugs con kettlebell', NULL, NULL, NULL, 'De pie, sujeta una kettlebell en cada mano. Eleva los hombros hacia las orejas, manteniendo los brazos rectos. Baja lentamente a la posición inicial. Este ejercicio trabaja los trapecios superiores con una carga más inestable.', NULL),
(118, 10, NULL, 'Face Pull con cuerda', NULL, NULL, NULL, 'De pie, agarra una cuerda con las manos en un agarre neutral en una polea alta. Tira de la cuerda hacia tu cara, separando los codos hacia los lados. Este ejercicio activa los trapecios y los deltoides posteriores.', NULL),
(119, 10, NULL, 'Elevaciones laterales inclinadas en banco', NULL, NULL, NULL, 'Acostado boca abajo en un banco inclinado, sujeta una mancuerna en cada mano. Eleva las mancuernas hacia los lados, concentrándote en los trapecios y los deltoides posteriores. Este ejercicio trabaja los trapecios y hombros de forma conjunta.', NULL),
(120, 10, NULL, 'Remo en polea baja con barra', NULL, NULL, NULL, 'De pie, agarra una barra con un agarre amplio en una polea baja. Jala la barra hacia el torso, activando los trapecios y los romboides. Este ejercicio también involucra la parte media de la espalda.', NULL),
(121, 11, NULL, 'Crunch abdominal', NULL, NULL, NULL, 'Acuéstate en el suelo con las rodillas dobladas y los pies planos. Coloca las manos detrás de la cabeza o cruzadas sobre el pecho. Eleva la parte superior de la espalda hacia las rodillas, contrayendo los abdominales, y luego regresa lentamente. Este ejercicio trabaja principalmente los músculos abdominales rectos.', NULL),
(122, 11, NULL, 'Elevaciones de piernas', NULL, NULL, NULL, 'Acuéstate sobre tu espalda con las piernas estiradas. Eleva las piernas hacia el techo manteniéndolas rectas, y baja lentamente. Este ejercicio trabaja la parte inferior del abdomen.', NULL),
(123, 11, NULL, 'Plancha', NULL, NULL, NULL, 'Colócate en posición de push-up, pero con los codos doblados. Mantén el cuerpo recto y tenso, activando los abdominales, glúteos y hombros. Mantén la posición durante el tiempo que puedas. Este ejercicio trabaja todo el core.', NULL),
(124, 11, NULL, 'Crunch inverso', NULL, NULL, NULL, 'Acuéstate en el suelo con las manos a los lados y las piernas elevadas y dobladas. Lleva las rodillas hacia el pecho mientras levantas las caderas del suelo, y luego baja lentamente. Este ejercicio se enfoca en la parte inferior del abdomen.', NULL),
(125, 11, NULL, 'Bicicleta abdominal', NULL, NULL, NULL, 'Acuéstate sobre tu espalda, con las manos detrás de la cabeza y las piernas elevadas. Lleva una rodilla hacia el codo opuesto mientras extiendes la otra pierna. Alterna el movimiento en forma de pedaleo. Este ejercicio trabaja los músculos oblicuos y los abdominales rectos.', NULL),
(126, 11, NULL, 'Ab twist', NULL, NULL, NULL, 'Siéntate con las piernas dobladas y los pies planos en el suelo. Sostén un disco o balón medicinal con ambas manos y rota el torso de un lado a otro. Este ejercicio trabaja los oblicuos.', NULL),
(127, 11, NULL, 'Russian twists con balón medicinal', NULL, NULL, NULL, 'Sentado en el suelo, sostén un balón medicinal con las dos manos. Gira el torso de un lado a otro, tocando el balón en el suelo al final de cada giro. Este ejercicio se enfoca en los oblicuos y el abdomen.', NULL),
(128, 11, NULL, 'Elevaciones de piernas en barra', NULL, NULL, NULL, 'Cuélgate de una barra con las piernas rectas. Eleva las piernas hacia el pecho, manteniendo el control y evitando balanceos. Este ejercicio trabaja principalmente la parte inferior del abdomen.', NULL),
(129, 11, NULL, 'Mountain climbers', NULL, NULL, NULL, 'Colócate en una posición de push-up y alterna llevando una rodilla hacia el pecho rápidamente. Este ejercicio trabaja los abdominales, los oblicuos y mejora la resistencia cardiovascular.', NULL),
(130, 11, NULL, 'V-ups', NULL, NULL, NULL, 'Acuéstate sobre tu espalda con los brazos extendidos por encima de la cabeza. Eleva las piernas y la parte superior del cuerpo al mismo tiempo, tocando los dedos de los pies con las manos. Este ejercicio trabaja los abdominales superiores e inferiores.', NULL),
(131, 12, NULL, 'Curl de muñeca con barra', NULL, NULL, NULL, 'De pie, sujeta una barra con las palmas hacia arriba y los antebrazos apoyados sobre un banco o en las piernas. Flexiona las muñecas hacia arriba y hacia abajo, concentrándote en el movimiento de la muñeca. Este ejercicio trabaja principalmente los flexores de los antebrazos.', NULL),
(132, 12, NULL, 'Curl inverso con barra', NULL, NULL, NULL, 'De pie, sujeta una barra con las palmas hacia abajo y los antebrazos apoyados en las piernas o sobre un banco. Flexiona las muñecas hacia arriba y hacia abajo, concentrándote en los extensores de los antebrazos. Este ejercicio trabaja los músculos extensores de los antebrazos.', NULL),
(133, 12, NULL, 'Curl de muñeca con mancuernas', NULL, NULL, NULL, 'De pie o sentado, sujeta una mancuerna en cada mano con las palmas hacia arriba. Flexiona las muñecas hacia arriba y hacia abajo. Este ejercicio aísla los flexores de los antebrazos, con la ventaja de trabajar cada brazo por separado.', NULL),
(134, 12, NULL, 'Curl inverso con mancuernas', NULL, NULL, NULL, 'De pie o sentado, sujeta una mancuerna en cada mano con las palmas hacia abajo. Flexiona las muñecas hacia arriba y hacia abajo. Este ejercicio trabaja los extensores de los antebrazos, mejorando la fuerza y el tamaño.', NULL),
(135, 12, NULL, 'Farmer\'s Walk (Caminar con pesas)', NULL, NULL, NULL, 'Sujeta una mancuerna o kettlebell en cada mano y camina una distancia determinada. Mantén las muñecas firmes durante el recorrido, activando los músculos de los antebrazos para mantener el agarre. Este ejercicio también involucra la parte superior del cuerpo y mejora la resistencia del agarre.', NULL),
(136, 12, NULL, 'Dead Hang', NULL, NULL, NULL, 'Sujétate de una barra fija con un agarre en pronación (palmas hacia afuera) y mantén el cuerpo suspendido. Este ejercicio fortalece los músculos de los antebrazos y mejora la resistencia del agarre.', NULL),
(137, 12, NULL, 'Roller de muñeca', NULL, NULL, NULL, 'Usa un palo con una cuerda atada en el centro y un disco en el extremo. Sujeta el palo con ambas manos y enrolla la cuerda hasta que el disco toque el palo. Luego, desenrolla la cuerda. Este ejercicio trabaja los músculos flexores y extensores de los antebrazos.', NULL),
(138, 12, NULL, 'Curl de muñeca con barra Z', NULL, NULL, NULL, 'De pie, sujeta una barra Z con las palmas hacia arriba y los antebrazos apoyados en las piernas o sobre un banco. Flexiona las muñecas hacia arriba y hacia abajo. Este ejercicio se enfoca en los flexores de los antebrazos, proporcionando un rango de movimiento más natural.', NULL),
(139, 12, NULL, 'Flexión de muñeca en polea', NULL, NULL, NULL, 'Colócate frente a una máquina de polea baja, agarra la cuerda con las palmas hacia arriba y los antebrazos apoyados sobre un banco. Flexiona las muñecas hacia arriba y hacia abajo. Este ejercicio trabaja los flexores de los antebrazos y permite un movimiento constante de tensión.', NULL),
(140, 12, NULL, 'Reverse Wrist Curl en polea', NULL, NULL, NULL, 'Colócate frente a una máquina de polea baja con las palmas hacia abajo, sujeta la cuerda y deja que el peso tire de las muñecas hacia abajo. Luego, flexiona las muñecas hacia arriba. Este ejercicio trabaja los extensores de los antebrazos, ayudando a mejorar el agarre.', NULL),
(141, 13, NULL, 'Elevación de talones de pie', NULL, NULL, NULL, 'De pie, con los pies a la altura de los hombros, eleva los talones y sube lo más alto posible, concentrándote en contraer las pantorrillas. Baja lentamente y repite. Este ejercicio trabaja principalmente los músculos gastrocnemios de las pantorrillas.', NULL),
(142, 13, NULL, 'Elevación de talones en prensa', NULL, NULL, NULL, 'Siéntate en una prensa de piernas con los pies en la plataforma y las piernas extendidas. Coloca las puntas de los pies sobre la plataforma y eleva los talones lo más alto posible, concentrándote en las pantorrillas. Baja lentamente. Este ejercicio trabaja tanto los gastrocnemios como el sóleo.', NULL),
(143, 13, NULL, 'Elevación de talones sentado', NULL, NULL, NULL, 'Sentado en una máquina de elevación de talones, coloca los pies en la plataforma y las rodillas dobladas. Empuja con las puntas de los pies hacia arriba, contrayendo las pantorrillas al máximo. Este ejercicio se enfoca en el músculo sóleo, que está debajo de los gastrocnemios.', NULL),
(144, 13, NULL, 'Elevación de talones con barra', NULL, NULL, NULL, 'De pie, con una barra sobre los trapecios, coloca los pies sobre una plataforma elevada, dejando los talones colgando. Eleva los talones hacia arriba lo más que puedas, contrayendo las pantorrillas. Baja lentamente y repite el movimiento. Este ejercicio trabaja los gastrocnemios.', NULL),
(145, 13, NULL, 'Saltos de pantorrillas', NULL, NULL, NULL, 'De pie, realiza pequeños saltos, concentrándote en elevar los talones del suelo lo más rápido posible. Los saltos deben ser rápidos y constantes, activando las pantorrillas de manera explosiva. Este ejercicio también mejora la potencia en las pantorrillas.', NULL),
(146, 13, NULL, 'Elevación de talones en máquina Smith', NULL, NULL, NULL, 'De pie en una máquina Smith, coloca la barra sobre los trapecios, con los pies en una plataforma elevada y los talones colgando. Eleva los talones lo más alto posible, concentrándote en la contracción de las pantorrillas. Este ejercicio se enfoca en los gastrocnemios.', NULL),
(147, 13, NULL, 'Elevación de talones unipodal', NULL, NULL, NULL, 'De pie sobre una pierna, eleva el talón lo más alto posible, concentrándote en la contracción de la pantorrilla de la pierna que está en uso. Baja lentamente y repite el movimiento. Este ejercicio trabaja de forma unilateral las pantorrillas.', NULL),
(148, 13, NULL, 'Elevación de talones con mancuernas', NULL, NULL, NULL, 'De pie, sujeta una mancuerna en cada mano. Coloca los pies a la altura de los hombros y eleva los talones lo más alto posible, concentrándote en la contracción de las pantorrillas. Baja lentamente. Este ejercicio trabaja los gastrocnemios de las pantorrillas.', NULL),
(149, 13, NULL, 'Saltos de caja', NULL, NULL, NULL, 'Colócate frente a una caja o plataforma y salta hacia arriba y sobre la caja, concentrándote en empujar con las pantorrillas para el salto. Baja de la caja con control. Este ejercicio trabaja las pantorrillas y mejora la explosividad de las piernas.', NULL),
(150, 13, NULL, 'Elevación de talones en máquina de pantorrillas', NULL, NULL, NULL, 'Siéntate en una máquina de pantorrillas, coloca los pies en la plataforma y las rodillas dobladas. Empuja hacia arriba con las puntas de los pies, concentrándote en la contracción de las pantorrillas. Este ejercicio aísla las pantorrillas y es ideal para trabajar los gastrocnemios.', NULL),
(151, 14, NULL, 'Abducción de cadera en máquina', NULL, NULL, NULL, 'Siéntate en una máquina de abducción de cadera. Coloca las piernas dentro de los apoyos, ajusta el peso y empuja hacia afuera con las piernas, concentrándote en la contracción del glúteo medio y menor. Este ejercicio aísla el glúteo medio.', NULL),
(152, 14, NULL, 'Sentadillas laterales con banda', NULL, NULL, NULL, 'Colócate de pie con los pies separados a la altura de los hombros y una banda de resistencia alrededor de los muslos. Realiza una sentadilla lateral hacia un lado, manteniendo el torso recto y activando el glúteo medio. Este ejercicio también mejora la estabilidad de la cadera.', NULL),
(153, 14, NULL, 'Patadas laterales', NULL, NULL, NULL, 'De pie, con las manos apoyadas en una superficie estable, eleva una pierna lateralmente hacia el costado, manteniendo la pierna estirada y concentrándote en contraer el glúteo medio. Este ejercicio se enfoca en la parte lateral del glúteo.', NULL),
(154, 14, NULL, 'Puente de glúteos con una pierna', NULL, NULL, NULL, 'Acostado de espaldas con una pierna doblada y la otra estirada, eleva las caderas hasta formar una línea recta desde los hombros hasta las rodillas. Este ejercicio trabaja el glúteo medio y menor de forma unilateral.', NULL),
(155, 14, NULL, 'Step-up con mancuernas', NULL, NULL, NULL, 'De pie, frente a una caja o banco, coloca un pie sobre la plataforma y empuja con el talón para elevar todo el cuerpo. Baja lentamente y repite con la otra pierna. Este ejercicio activa el glúteo medio y menor, además de trabajar la pierna en su totalidad.', NULL),
(156, 14, NULL, 'Sentadillas sumo', NULL, NULL, NULL, 'De pie, con los pies más anchos que el ancho de los hombros y las puntas hacia afuera, realiza una sentadilla profunda. Este ejercicio trabaja los glúteos en su totalidad, con énfasis en el glúteo medio y menor.', NULL),
(157, 14, NULL, 'Abducción de cadera en posición lateral', NULL, NULL, NULL, 'Acostado de lado, coloca una pierna encima de la otra y eleva la pierna superior hacia el techo, manteniendo la pierna estirada. Este ejercicio se enfoca en el glúteo medio y menor.', NULL),
(158, 14, NULL, 'Fire Hydrant (hidrante)', NULL, NULL, NULL, 'Acuéstate a cuatro patas en el suelo. Eleva una pierna hacia un lado, doblando la rodilla a 90 grados. Este ejercicio activa principalmente el glúteo medio y menor, además de trabajar la estabilidad de la cadera.', NULL),
(159, 14, NULL, 'Patada hacia atrás en polea baja', NULL, NULL, NULL, 'Colócate frente a una polea baja con una correa en el tobillo. Empuja la pierna hacia atrás manteniéndola estirada, sintiendo la contracción en el glúteo medio y menor. Este ejercicio se enfoca en la activación de la cadera.', NULL),
(160, 14, NULL, 'Sentadillas búlgaras', NULL, NULL, NULL, 'De pie, coloca un pie sobre un banco detrás de ti. Baja la cadera en una sentadilla profunda, manteniendo la pierna delantera a 90 grados. Este ejercicio trabaja los glúteos, con énfasis en el glúteo medio y menor, además de fortalecer los muslos.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_entrenador`
--

CREATE TABLE `tb_entrenador` (
  `id_entrenador` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `dni` char(8) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_entrenador`
--

INSERT INTO `tb_entrenador` (`id_entrenador`, `id_persona`, `dni`, `fecha_ingreso`, `estado`) VALUES
(1, 2, '1234', '2020-03-01', 'activo');

-- --------------------------------------------------------

--
-- Table structure for table `tb_entrenador_gimnasio`
--

CREATE TABLE `tb_entrenador_gimnasio` (
  `id_entrenador` int(11) NOT NULL,
  `id_gimnasio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_entrenador_gimnasio`
--

INSERT INTO `tb_entrenador_gimnasio` (`id_entrenador`, `id_gimnasio`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_gimnasio`
--

CREATE TABLE `tb_gimnasio` (
  `id_gimnasio` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `horario_apertura` time DEFAULT NULL,
  `horario_cierre` time DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `descripcion` text DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_gimnasio`
--

INSERT INTO `tb_gimnasio` (`id_gimnasio`, `nombre`, `direccion`, `telefono`, `horario_apertura`, `horario_cierre`, `estado`, `descripcion`, `fecha_registro`) VALUES
(1, 'Apolo', 'Peron y Ardiles', '2657-', '00:00:06', '00:00:23', 'activo', 'Frente a Escuela', '2025-01-15 03:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tb_grupos_musculares`
--

CREATE TABLE `tb_grupos_musculares` (
  `id_grupo_muscular` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_grupos_musculares`
--

INSERT INTO `tb_grupos_musculares` (`id_grupo_muscular`, `nombre`) VALUES
(1, 'Cuádriceps'),
(2, 'Isquiotibiales'),
(3, 'Pecho'),
(4, 'Gluteos'),
(5, 'Espalda alta'),
(6, 'Espalda baja'),
(7, 'Bíceps'),
(8, 'Tríceps'),
(9, 'Hombros'),
(10, 'Trapecio'),
(11, 'Abdomen'),
(12, 'Antebrazos'),
(13, 'Pantorrillas'),
(14, 'Glúteo medio y menor');

-- --------------------------------------------------------

--
-- Table structure for table `tb_logros`
--

CREATE TABLE `tb_logros` (
  `id_logro` int(11) NOT NULL,
  `id_atleta` int(11) DEFAULT NULL,
  `nombre_logro` varchar(255) DEFAULT NULL,
  `descripcion_logro` text DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_logros`
--

INSERT INTO `tb_logros` (`id_logro`, `id_atleta`, `nombre_logro`, `descripcion_logro`, `fecha`) VALUES
(1, 1, 'Superación en press de banca', 'Aumento de 20 kg en el press de banca en 2 meses de entrenamiento.', '2025-01-15 12:00:00'),
(2, 1, 'Reducción de grasa corporal', 'Reducción del porcentaje de grasa corporal del 20% al 17.5% en 3 meses.', '2025-02-15 13:00:00'),
(3, 1, 'Aumento de masa muscular', 'Aumento de 5 kg de masa muscular en la parte superior del cuerpo en 2 meses.', '2025-03-01 14:00:00'),
(4, 1, 'Primera participación en competición', 'Participación exitosa en una competencia de culturismo, alcanzando el top 5.', '2025-04-15 11:30:00'),
(5, 1, 'Mejora en resistencia cardiovascular', 'Aumento del tiempo en la caminadora de 15 a 30 minutos corriendo a ritmo constante.', '2025-05-01 12:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `tb_membresia`
--

CREATE TABLE `tb_membresia` (
  `id_membresia` int(11) NOT NULL,
  `id_gimnasio` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `duracion` int(11) NOT NULL,
  `tipo` enum('mensual','anual','semanal','trimestral','') NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_membresia`
--

INSERT INTO `tb_membresia` (`id_membresia`, `id_gimnasio`, `nombre`, `descripcion`, `precio`, `duracion`, `tipo`, `fecha_creacion`, `estado`) VALUES
(1, 1, 'Membresía Mensual Básica', 'Acceso a las instalaciones del gimnasio con horario limitado de lunes a viernes. No incluye clases dirigidas.', 30.00, 30, 'mensual', '2025-01-01 13:00:00', 'activo'),
(2, 1, 'Membresía Mensual Premium', 'Acceso completo a todas las instalaciones del gimnasio, incluyendo clases dirigidas y actividades grupales. Acceso sin restricciones horarias.', 50.00, 30, 'mensual', '2025-01-01 13:00:00', 'activo'),
(3, 1, 'Membresía Anual Básica', 'Acceso a las instalaciones del gimnasio con horario limitado de lunes a viernes. Incluye 1 clase gratuita por mes.', 300.00, 365, 'anual', '2025-01-01 13:00:00', 'activo'),
(4, 1, 'Membresía Trimestral Premium', 'Acceso completo a todas las instalaciones del gimnasio y clases dirigidas durante 3 meses. Incluye acceso a entrenadores personales para 2 sesiones por mes.', 135.00, 90, 'trimestral', '2025-01-01 13:00:00', 'activo'),
(5, 1, 'Membresía Semanal', 'Acceso limitado durante una semana a las instalaciones del gimnasio, ideal para quienes visitan de manera ocasional.', 15.00, 7, 'semanal', '2025-01-01 13:00:00', 'activo'),
(6, 1, 'Membresía Anual Premium', 'Acceso completo a todas las instalaciones del gimnasio durante todo el año, incluye clases grupales, actividades especiales y sesiones de entrenamiento personalizadas.', 500.00, 365, 'anual', '2025-01-01 13:00:00', 'activo');

-- --------------------------------------------------------

--
-- Table structure for table `tb_menu`
--

CREATE TABLE `tb_menu` (
  `id_menu` bigint(20) UNSIGNED NOT NULL,
  `menu_descripcion` varchar(50) NOT NULL,
  `menu_icono` varchar(30) DEFAULT NULL,
  `menu_link` varchar(100) DEFAULT NULL,
  `menu_grupo` varchar(10) DEFAULT NULL,
  `menu_principal` int(11) DEFAULT NULL,
  `menu_orden` int(11) DEFAULT NULL,
  `menu_estado` tinyint(1) NOT NULL DEFAULT 1,
  `tipo_ruta` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_menu`
--

INSERT INTO `tb_menu` (`id_menu`, `menu_descripcion`, `menu_icono`, `menu_link`, `menu_grupo`, `menu_principal`, `menu_orden`, `menu_estado`, `tipo_ruta`) VALUES
(1, 'Inicio', 'bi bi-house', '/inicio', 'GM01', 1, 1, 1, '-'),
(2, 'Resumen', '', '/inicio/resumen', 'GM01', 0, 1, 1, '-'),
(3, 'Noticias', '-', '/inicio/noticias', 'GM01', 0, 2, 1, '-'),
(4, 'Cargar Atleta', '-', '/inicio/cargar-atleta', 'GM01', 0, 3, 1, '-'),
(5, 'Cargar pago', '-', '/inicio/cargar-pago', 'GM01', 0, 4, 1, '-'),
(6, '', '-', '/', 'GM01', 0, 5, 0, '-'),
(7, '', '-', '/', 'GM01', 0, 6, 0, '-'),
(8, '', '-', '/', 'GM01', 0, 7, 0, '-'),
(9, '', '-', '/', 'GM01', 0, 8, 0, '-'),
(10, '', '-', '/', 'GM01', 0, 9, 0, '-'),
(11, 'Mi Perfil', 'bi bi-file-person', '/perfil', 'GM02', 1, 2, 1, '-'),
(12, 'Perfil', '-', '/perfil/perfil', 'GM02', 0, 1, 1, '-'),
(13, 'Estadisticas progreso', '-', '/perfil/estadisticas', 'GM02', 0, 2, 1, '-'),
(14, 'Historial rutinas', '-', '/perfil/historial', 'GM02', 0, 3, 0, '-'),
(15, 'Estadisticas Coach', '-', '/perfil/coach', 'GM02', 0, 4, 1, '-'),
(16, '', '-', '/', 'GM02', 0, 5, 0, '-'),
(17, '', '-', '/', 'GM02', 0, 6, 0, '-'),
(18, '', '-', '/', 'GM02', 0, 7, 0, '-'),
(19, '', '-', '/', 'GM02', 0, 8, 0, '-'),
(20, '', '-', '/', 'GM02', 0, 9, 0, '-'),
(21, 'Rutinas', 'bx bx-book-bookmark', '/', 'GM03', 1, 3, 1, '-'),
(22, 'Actual', '-', '/rutinas/actual', 'GM03', 0, 1, 1, '-'),
(23, 'Mis rutinas', '-', '/rutinas/mis-rutinas', 'GM03', 0, 2, 1, '-'),
(24, 'Recomendadas', '-', '/rutinas/recomendadas', 'GM03', 0, 3, 1, '-'),
(25, 'Populares', '-', '/rutinas/populares', 'GM03', 0, 4, 1, '-'),
(26, 'Especificas', '-', '/rutinas/especificas', 'GM03', 0, 5, 1, '-'),
(27, 'Favoritas', '-', '/rutinas/favoritas', 'GM03', 0, 6, 1, '-'),
(28, 'Historial', '-', '/rutinas/historial', 'GM03', 0, 7, 1, '-'),
(29, 'Crear rutina', '-', '/rutinas/crear-rutina', 'GM03', 0, 8, 1, '-'),
(30, 'Crear frecuencia', '-', '/rutinas/crear-frecuencia', 'GM03', 0, 9, 1, '-'),
(31, 'Coach', '-', 'rutinas/coach', 'GM03', 0, 10, 1, '-'),
(32, 'Ejercicios', 'bx bx-dumbbell', '/ejercicios', 'GM04', 1, 4, 1, '-'),
(33, 'Buscar', '-', '/ejercicios/buscar', 'GM04', 0, 1, 1, '-'),
(34, 'Cargar nuevo', '-', '/ejercicios/cargar-nuevo', 'GM04', 0, 2, 1, '-'),
(35, 'Coach', '-', '/ejercicios/coach', 'GM04', 0, 3, 1, '-'),
(36, '', '-', '/', 'GM04', 0, 4, 0, '-'),
(37, '', '-', '/', 'GM04', 0, 5, 0, '-'),
(38, '', '-', '/', 'GM04', 0, 6, 0, '-'),
(39, '', '-', '/', 'GM04', 0, 7, 0, '-'),
(40, '', '-', '/', 'GM04', 0, 8, 0, '-'),
(41, '', '-', '/', 'GM04', 0, 9, 0, '-'),
(42, 'Asistencia', 'bx bxs-hand', '/asistencia', 'GM05', 1, 5, 1, '-'),
(43, 'Asistencia', '-', '/asistencia/asistencia', 'GM05', 0, 1, 1, '-'),
(44, 'Historial asistencia', '-', '/asistencia/historial', 'GM05', 0, 2, 1, '-'),
(45, 'Coach', '-', '/asistencia/coach', 'GM05', 0, 3, 1, '-'),
(46, '', '-', '/', 'GM05', 0, 4, 0, '-'),
(47, '', '-', '/', 'GM05', 0, 5, 0, '-'),
(48, '', '-', '/', 'GM05', 0, 6, 0, '-'),
(49, '', '-', '/', 'GM05', 0, 7, 0, '-'),
(50, '', '-', '/', 'GM05', 0, 8, 0, '-'),
(51, '', '-', '/', 'GM05', 0, 9, 0, '-'),
(52, 'Progreso', 'bi bi-percent', '/progreso', 'GM06', 1, 6, 1, '-'),
(53, 'Estadisticas', '-', '/progreso/estadistica', 'GM06', 0, 1, 1, '-'),
(54, 'Logros', '-', '/progreso/logros', 'GM06', 0, 2, 1, '-'),
(55, 'Metas', '-', '/progreso/metas', 'GM06', 0, 3, 1, '-'),
(56, '', '-', '/', 'GM06', 0, 4, 0, '-'),
(57, '', '-', '/', 'GM06', 0, 5, 0, '-'),
(58, '', '-', '/', 'GM06', 0, 6, 0, '-'),
(59, '', '-', '/', 'GM06', 0, 7, 0, '-'),
(60, '', '-', '/', 'GM06', 0, 8, 0, '-'),
(61, '', '-', '/', 'GM06', 0, 9, 0, '-'),
(62, 'Comunidad', 'bi bi-people-fill', '/comunidad', 'GM07', 1, 7, 1, '-'),
(63, 'Grupos', '-', 'comunidad/grupos', 'GM07', 0, 1, 1, '-'),
(64, 'Articulos', '-', 'comunidad/articulos', 'GM07', 0, 2, 1, '-'),
(65, '', '-', '/', 'GM07', 0, 3, 0, '-'),
(66, '', '-', '/', 'GM07', 0, 4, 0, '-'),
(67, '', '-', '/', 'GM07', 0, 5, 0, '-'),
(68, '', '-', '/', 'GM07', 0, 6, 0, '-'),
(69, '', '-', '/', 'GM07', 0, 7, 0, '-'),
(70, '', '-', '/', 'GM07', 0, 8, 0, '-'),
(71, '', '-', '/', 'GM07', 0, 9, 0, '-'),
(72, 'Configuracion', 'bi bi-gear', '/configuracion', 'GM08', 1, 8, 1, '-'),
(73, 'Configuracion1', '-', '/configuracion/editar-perfil', 'GM08', 0, 1, 1, '-'),
(74, 'Configuracion2', '-', '/configuracion2', 'GM08', 0, 2, 0, '-'),
(75, 'Configuracion3', '-', '/configuracion3', 'GM08', 0, 3, 0, '-'),
(76, 'Configuracion4', '-', '/configuracion4', 'GM08', 0, 4, 0, '-'),
(77, 'Configuracion4', '-', '/configuracion4', 'GM08', 0, 5, 0, '-'),
(78, 'Configuracion4', '-', '/configuracion4', 'GM08', 0, 6, 0, '-'),
(79, 'Configuracion4', '-', '/configuracion4', 'GM08', 0, 7, 0, '-'),
(80, 'Configuracion4', '-', '/configuracion4', 'GM08', 0, 8, 0, '-'),
(81, 'Ayuda', 'bi bi-info-circle', '/ayuda', 'GM09', 1, 9, 1, '-'),
(82, 'Preguntas frecuentes', '-', '/ayuda/faq', 'GM09', 0, 1, 1, '-'),
(83, 'Contacto', '-', '/ayuda/contacto', 'GM09', 0, 2, 1, '-'),
(84, '', '-', '/', 'GM09', 0, 3, 0, '-'),
(85, '', '-', '/', 'GM09', 0, 4, 0, '-'),
(86, '', '-', '/', 'GM09', 0, 5, 0, '-'),
(87, '', '-', '/', 'GM09', 0, 6, 0, '-'),
(88, '', '-', '/', 'GM09', 0, 7, 0, '-'),
(89, '', '-', '/', 'GM09', 0, 8, 0, '-');

-- --------------------------------------------------------

--
-- Table structure for table `tb_menu_perfil`
--

CREATE TABLE `tb_menu_perfil` (
  `id_acceso` bigint(20) UNSIGNED NOT NULL,
  `id_menu` bigint(20) UNSIGNED NOT NULL,
  `id_perfil` bigint(20) UNSIGNED NOT NULL,
  `estado_acceso` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_menu_perfil`
--

INSERT INTO `tb_menu_perfil` (`id_acceso`, `id_menu`, `id_perfil`, `estado_acceso`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 3, 1, 1),
(4, 4, 1, 1),
(5, 5, 1, 1),
(6, 6, 1, 1),
(7, 7, 1, 1),
(8, 8, 1, 1),
(9, 9, 1, 1),
(10, 10, 1, 1),
(11, 11, 1, 1),
(12, 12, 1, 1),
(13, 13, 1, 1),
(14, 14, 1, 1),
(15, 15, 1, 1),
(16, 16, 1, 1),
(17, 17, 1, 1),
(18, 18, 1, 1),
(19, 19, 1, 1),
(20, 20, 1, 1),
(21, 21, 1, 1),
(22, 22, 1, 1),
(23, 23, 1, 1),
(24, 24, 1, 1),
(25, 25, 1, 1),
(26, 26, 1, 1),
(27, 27, 1, 1),
(28, 28, 1, 1),
(29, 29, 1, 1),
(30, 30, 1, 1),
(31, 31, 1, 1),
(32, 32, 1, 1),
(33, 33, 1, 1),
(34, 34, 1, 1),
(35, 35, 1, 1),
(36, 36, 1, 1),
(37, 37, 1, 1),
(38, 38, 1, 1),
(39, 39, 1, 1),
(40, 40, 1, 1),
(41, 41, 1, 1),
(42, 42, 1, 1),
(43, 43, 1, 1),
(44, 44, 1, 1),
(45, 45, 1, 1),
(46, 46, 1, 1),
(47, 47, 1, 1),
(48, 48, 1, 1),
(49, 49, 1, 1),
(50, 50, 1, 1),
(51, 51, 1, 1),
(52, 52, 1, 1),
(53, 53, 1, 1),
(54, 54, 1, 1),
(55, 55, 1, 1),
(56, 56, 1, 1),
(57, 57, 1, 1),
(58, 58, 1, 1),
(59, 59, 1, 1),
(60, 60, 1, 1),
(61, 61, 1, 1),
(62, 62, 1, 1),
(63, 63, 1, 1),
(64, 64, 1, 1),
(65, 65, 1, 1),
(66, 66, 1, 1),
(67, 67, 1, 1),
(68, 68, 1, 1),
(69, 69, 1, 1),
(70, 70, 1, 1),
(71, 71, 1, 1),
(72, 72, 1, 1),
(73, 73, 1, 1),
(74, 74, 1, 1),
(75, 75, 1, 1),
(76, 76, 1, 1),
(77, 77, 1, 1),
(78, 78, 1, 1),
(79, 79, 1, 1),
(80, 80, 1, 1),
(81, 81, 1, 1),
(82, 82, 1, 1),
(83, 83, 1, 1),
(84, 84, 1, 1),
(85, 85, 1, 1),
(86, 86, 1, 1),
(87, 87, 1, 1),
(88, 88, 1, 1),
(89, 89, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_metas`
--

CREATE TABLE `tb_metas` (
  `id_meta` int(11) NOT NULL,
  `id_atleta` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `tipo_meta` varchar(50) DEFAULT NULL,
  `valor_objetivo` decimal(10,2) DEFAULT NULL,
  `fecha_establecimiento` date DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_metas`
--

INSERT INTO `tb_metas` (`id_meta`, `id_atleta`, `descripcion`, `tipo_meta`, `valor_objetivo`, `fecha_establecimiento`, `fecha_vencimiento`, `estado`) VALUES
(1, 1, 'Aumentar la masa muscular en la parte superior del cuerpo', 'Aumento de masa muscular', 5.00, '2025-01-15', '2025-03-15', 'En progreso'),
(2, 1, 'Reducir el porcentaje de grasa corporal', 'Reducción de grasa', 10.00, '2025-01-15', '2025-04-15', 'En progreso'),
(3, 1, 'Mejorar la resistencia cardiovascular', 'Resistencia cardiovascular', 30.00, '2025-01-15', '2025-06-15', 'No iniciada'),
(4, 1, 'Incrementar la fuerza en el press de banca', 'Fuerza', 20.00, '2025-01-15', '2025-02-28', 'Completada'),
(5, 1, 'Mejorar la flexibilidad en piernas', 'Flexibilidad', 15.00, '2025-01-15', '2025-03-01', 'En progreso'),
(6, 1, 'Mantener el peso corporal actual', 'Mantenimiento', 0.00, '2025-01-15', '2025-12-31', 'En progreso');

-- --------------------------------------------------------

--
-- Table structure for table `tb_nivel_dificultad`
--

CREATE TABLE `tb_nivel_dificultad` (
  `id_nivel` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_objetivo`
--

CREATE TABLE `tb_objetivo` (
  `id_objetivo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_pago`
--

CREATE TABLE `tb_pago` (
  `id_pago` int(11) NOT NULL,
  `id_atleta` int(11) NOT NULL,
  `id_membresia` int(11) NOT NULL,
  `fecha_pago` datetime NOT NULL DEFAULT current_timestamp(),
  `monto` decimal(10,2) NOT NULL,
  `forma_pago` enum('Efectivo','Transferencia','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_pago`
--

INSERT INTO `tb_pago` (`id_pago`, `id_atleta`, `id_membresia`, `fecha_pago`, `monto`, `forma_pago`) VALUES
(1, 1, 1, '2025-01-01 10:00:00', 30.00, 'Efectivo'),
(2, 1, 2, '2025-02-01 09:00:00', 50.00, 'Efectivo'),
(3, 1, 3, '2025-01-01 10:00:00', 300.00, 'Efectivo'),
(4, 1, 4, '2025-01-01 10:00:00', 135.00, 'Efectivo'),
(5, 1, 5, '2025-01-01 10:00:00', 15.00, 'Efectivo'),
(6, 1, 6, '2025-01-01 10:00:00', 500.00, 'Efectivo');

-- --------------------------------------------------------

--
-- Table structure for table `tb_perfil`
--

CREATE TABLE `tb_perfil` (
  `id_perfil` bigint(20) UNSIGNED NOT NULL,
  `nombre_perfil` varchar(100) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_perfil`
--

INSERT INTO `tb_perfil` (`id_perfil`, `nombre_perfil`, `estado`) VALUES
(1, 'Admin', 1),
(2, 'Coach', 1),
(3, 'Atleta', 1),
(4, 'Visita', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_persona`
--

CREATE TABLE `tb_persona` (
  `id_persona` int(11) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `id_acceso` int(11) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `apodo` varchar(30) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT current_timestamp(),
  `celular` varchar(15) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `foto_archivo` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_persona`
--

INSERT INTO `tb_persona` (`id_persona`, `dni`, `id_acceso`, `nombre`, `apellido`, `apodo`, `fecha_nacimiento`, `fecha_registro`, `celular`, `direccion`, `email`, `password`, `foto_archivo`) VALUES
(1, '1', 1, 'Franco', 'Menichetti', 'Fran', '1989-02-02', '2025-01-02 11:21:55', '0987654321', 'Avenida Siempre Viva 456', '1', '$2b$10$5t2sv9aI6C9cbDtFlWp1iekWGMk.Addu7ha6dWzK50CC2Uc.1/Rzi', NULL),
(2, '1234', 2, 'Daiana', 'Quintero', 'Moro', '1992-01-15', '2025-01-02 11:21:55', '1234567890', 'Calle Falsa 123', 'juan.perez@example.com', '$2b$10$5t2sv9aI6C9cbDtFlWp1iekWGMk.Addu7ha6dWzK50CC2Uc.1/Rzi', NULL),
(3, '12345', 3, 'Maria', 'Romero', 'Romerito', '1992-01-15', '2025-01-02 11:21:55', '1234567890', 'Calle Falsa 123', 'juan.perez@example.com', '$2b$10$5t2sv9aI6C9cbDtFlWp1iekWGMk.Addu7ha6dWzK50CC2Uc.1/Rzi', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_proceso`
--

CREATE TABLE `tb_proceso` (
  `id_proceso` int(11) NOT NULL,
  `id_atleta` int(11) NOT NULL,
  `fecha_medicion` date NOT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `altura` decimal(5,2) DEFAULT NULL,
  `biceps` decimal(10,0) DEFAULT NULL,
  `pecho` decimal(10,0) DEFAULT NULL,
  `hombros` decimal(10,0) DEFAULT NULL,
  `cintura` decimal(10,0) DEFAULT NULL,
  `gluteos` decimal(10,0) DEFAULT NULL,
  `cuadriceps` decimal(10,0) DEFAULT NULL,
  `gemelos` decimal(10,0) DEFAULT NULL,
  `antebrazo` decimal(10,0) DEFAULT NULL,
  `cuello` decimal(10,0) DEFAULT NULL,
  `grasa_corporal` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_proceso`
--

INSERT INTO `tb_proceso` (`id_proceso`, `id_atleta`, `fecha_medicion`, `peso`, `altura`, `biceps`, `pecho`, `hombros`, `cintura`, `gluteos`, `cuadriceps`, `gemelos`, `antebrazo`, `cuello`, `grasa_corporal`) VALUES
(1, 1, '2025-01-15', 75.50, 1.80, 35, 100, 120, 85, 95, 50, 38, 32, 38, 18.50),
(2, 1, '2025-02-15', 76.00, 1.80, 36, 102, 121, 86, 97, 51, 39, 33, 39, 18.00),
(3, 1, '2025-03-15', 77.00, 1.80, 37, 104, 123, 87, 99, 52, 40, 34, 40, 17.50),
(4, 1, '2025-04-15', 76.50, 1.80, 38, 105, 124, 88, 98, 53, 41, 35, 41, 17.00),
(5, 1, '2025-05-15', 75.00, 1.80, 38, 106, 125, 89, 97, 54, 42, 36, 42, 16.50);

-- --------------------------------------------------------

--
-- Table structure for table `tb_repeticion`
--

CREATE TABLE `tb_repeticion` (
  `id_repeticion` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `frecuencia` varchar(20) NOT NULL,
  `comentario` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_repeticion`
--

INSERT INTO `tb_repeticion` (`id_repeticion`, `nombre`, `frecuencia`, `comentario`) VALUES
(1, '4x8', '4 series de 8 repeti', 'Enfoque en hipertrofia y fuerza. Ayuda a aumentar el volumen muscular y desarrollar fuerza.'),
(2, '3x10', '3 series de 10 repet', 'Enfoque en desarrollo muscular general, adecuado para una combinación de fuerza y resistencia.'),
(3, '5x5', '5 series de 5 repeti', 'Enfoque en fuerza máxima. Se trabaja con pesos pesados y pocas repeticiones para aumentar la fuerza.'),
(4, '3x12', '3 series de 12 repet', 'Enfoque en resistencia muscular. Ideal para tonificación y resistencia.'),
(5, '4x6', '4 series de 6 repeti', 'Enfoque en fuerza, con algo de volumen. Ayuda a desarrollar fuerza sin perder volumen muscular.'),
(6, '2x15', '2 series de 15 repet', 'Enfoque en resistencia muscular. Ideal para trabajar la resistencia y mejorar la capacidad de repeti'),
(7, '3x20', '3 series de 20 repet', 'Enfoque en resistencia muscular. Trabajo para tonificar y mejorar la capacidad de trabajo a largo pl'),
(8, '1x25', '1 serie de 25 repeti', 'Enfoque en resistencia muscular en altas repeticiones. Ideal para aumentar la capacidad aeróbica.'),
(9, '5x10', '5 series de 10 repet', 'Enfoque balanceado entre volumen y fuerza. Estimula tanto la hipertrofia como la fuerza general.'),
(10, '4x12', '4 series de 12 repet', 'Enfoque en desarrollo muscular y resistencia. Ideal para trabajar tanto la resistencia como la hiper'),
(11, 'Escalera 10-8-6-4', 'Series descendentes ', 'Enfoque en aumentar la carga con menos repeticiones. Utilizado para incrementar la fuerza y la masa '),
(12, 'Escalera 6-8-10', 'Series ascendentes d', 'Enfoque en fuerza con repeticiones progresivas. Aumentas las repeticiones mientras reduces el peso. '),
(13, 'Piramidal 12-10-8-6', 'Series de 12, 10, 8,', 'Enfoque en fuerza y volumen muscular. Aumentas el peso mientras reduces las repeticiones, maximizand'),
(14, 'Piramidal Invertido ', 'Series de 6, 8, 10, ', 'Enfoque en fuerza y resistencia. Comienza con poco peso y aumenta gradualmente mientras aumentas las'),
(15, '10-15-20', 'Series de 10, 15 y 2', 'Enfoque en resistencia muscular. Ideal para mejorar la capacidad de resistencia mientras se aumenta ');

-- --------------------------------------------------------

--
-- Table structure for table `tb_rutina`
--

CREATE TABLE `tb_rutina` (
  `id_rutina` int(11) NOT NULL,
  `id_creador` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `cantidad_dias` enum('1','2','3','4','5','6','7') NOT NULL,
  `nivel_atleta` enum('Principiante','Intermedio','Avanzado','') NOT NULL,
  `objetivo` enum('Musculacion','Tonificacion','Resistencia','Peso','') NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_rutina`
--

INSERT INTO `tb_rutina` (`id_rutina`, `id_creador`, `nombre`, `cantidad_dias`, `nivel_atleta`, `objetivo`, `descripcion`) VALUES
(1, 1, 'Rutina de Musculación Básica', '3', 'Principiante', 'Musculacion', 'Rutina enfocada en el desarrollo muscular para principiantes, 3 días a la semana con ejercicios básicos de fuerza.'),
(2, 1, 'Rutina Intermedia de Tonificación', '4', 'Intermedio', 'Tonificacion', 'Rutina diseñada para tonificar el cuerpo, con ejercicios de resistencia y pesos ligeros. A realizarse 4 días a la semana.'),
(3, 1, 'Rutina Avanzada para Resistencia', '5', 'Avanzado', 'Resistencia', 'Rutina avanzada para mejorar la resistencia cardiovascular y muscular. Realizar 5 días a la semana, con entrenamientos de alta intensidad.'),
(4, 1, 'Rutina de Aumento de Peso', '5', 'Intermedio', 'Peso', 'Rutina para personas que desean ganar masa muscular y peso corporal, con énfasis en entrenamientos de fuerza y nutrición adecuada.'),
(5, 1, 'Rutina Full Body de Musculación', '3', 'Intermedio', 'Musculacion', 'Rutina de cuerpo completo enfocada en aumento de masa muscular, trabajando todos los grupos musculares en 3 días a la semana.'),
(6, 1, 'Rutina de Tonificación para Todo el Cuerpo', '4', 'Principiante', 'Tonificacion', 'Rutina de tonificación para tonificar y esculpir todo el cuerpo, utilizando pesos moderados y ejercicios de bajo impacto. Realizar 4 días a la semana.');

-- --------------------------------------------------------

--
-- Table structure for table `tb_rutina_atleta`
--

CREATE TABLE `tb_rutina_atleta` (
  `id_rutina_atleta` int(11) NOT NULL,
  `id_rutina` int(11) NOT NULL,
  `id_atleta` int(11) NOT NULL,
  `fecha_asignacion` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_rutina_atleta`
--

INSERT INTO `tb_rutina_atleta` (`id_rutina_atleta`, `id_rutina`, `id_atleta`, `fecha_asignacion`) VALUES
(1, 1, 1, '2025-01-01'),
(2, 2, 1, '2025-02-01'),
(3, 3, 1, '2025-03-01'),
(4, 4, 1, '2025-04-01'),
(5, 5, 1, '2025-05-01'),
(6, 6, 1, '2025-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `tb_rutina_ejercicios`
--

CREATE TABLE `tb_rutina_ejercicios` (
  `id_rutina_ejercicios` int(11) NOT NULL,
  `id_rutina` int(11) NOT NULL,
  `id_ejercicios` int(11) NOT NULL,
  `id_repeticion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_rutina_ejercicios`
--

INSERT INTO `tb_rutina_ejercicios` (`id_rutina_ejercicios`, `id_rutina`, `id_ejercicios`, `id_repeticion`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 2, 3, 3),
(4, 2, 4, 4),
(5, 3, 5, 5),
(6, 3, 6, 6),
(7, 4, 7, 7),
(8, 4, 8, 8),
(9, 5, 9, 9),
(10, 5, 10, 10),
(11, 6, 11, 11),
(12, 6, 12, 12),
(13, 6, 13, 13),
(14, 6, 14, 14),
(15, 6, 15, 15);

-- --------------------------------------------------------

--
-- Table structure for table `tb_rutina_favorita`
--

CREATE TABLE `tb_rutina_favorita` (
  `id_atleta` int(11) NOT NULL,
  `id_rutina` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_rutina_favorita`
--

INSERT INTO `tb_rutina_favorita` (`id_atleta`, `id_rutina`) VALUES
(1, 1),
(1, 3),
(1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tb_rutina_grupo_muscular`
--

CREATE TABLE `tb_rutina_grupo_muscular` (
  `id_rutina` int(11) NOT NULL,
  `id_grupo_muscular` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_rutina_grupo_muscular`
--

INSERT INTO `tb_rutina_grupo_muscular` (`id_rutina`, `id_grupo_muscular`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 7),
(3, 8),
(3, 9),
(4, 10),
(4, 11),
(5, 12),
(5, 13),
(6, 14);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_asistencia`
--
ALTER TABLE `tb_asistencia`
  ADD PRIMARY KEY (`id_asistencia`),
  ADD KEY `id_atleta` (`id_atleta`);

--
-- Indexes for table `tb_atleta`
--
ALTER TABLE `tb_atleta`
  ADD PRIMARY KEY (`id_atleta`),
  ADD KEY `id_entrenador` (`id_entrenador`),
  ADD KEY `id_gimnasio` (`id_gimnasio`),
  ADD KEY `id_persona` (`id_persona`);

--
-- Indexes for table `tb_ejercicios`
--
ALTER TABLE `tb_ejercicios`
  ADD PRIMARY KEY (`id_ejercicio`),
  ADD KEY `id_grupo_muscular` (`id_grupo_muscular`),
  ADD KEY `id_entrenador` (`id_entrenador`);

--
-- Indexes for table `tb_entrenador`
--
ALTER TABLE `tb_entrenador`
  ADD PRIMARY KEY (`id_entrenador`),
  ADD KEY `id_persona` (`id_persona`);

--
-- Indexes for table `tb_entrenador_gimnasio`
--
ALTER TABLE `tb_entrenador_gimnasio`
  ADD PRIMARY KEY (`id_entrenador`,`id_gimnasio`);

--
-- Indexes for table `tb_gimnasio`
--
ALTER TABLE `tb_gimnasio`
  ADD PRIMARY KEY (`id_gimnasio`);

--
-- Indexes for table `tb_grupos_musculares`
--
ALTER TABLE `tb_grupos_musculares`
  ADD PRIMARY KEY (`id_grupo_muscular`);

--
-- Indexes for table `tb_logros`
--
ALTER TABLE `tb_logros`
  ADD PRIMARY KEY (`id_logro`),
  ADD KEY `id_atleta` (`id_atleta`);

--
-- Indexes for table `tb_membresia`
--
ALTER TABLE `tb_membresia`
  ADD PRIMARY KEY (`id_membresia`),
  ADD KEY `id_gimnasio` (`id_gimnasio`);

--
-- Indexes for table `tb_menu`
--
ALTER TABLE `tb_menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indexes for table `tb_menu_perfil`
--
ALTER TABLE `tb_menu_perfil`
  ADD PRIMARY KEY (`id_acceso`),
  ADD KEY `id_menu` (`id_menu`),
  ADD KEY `id_perfil` (`id_perfil`);

--
-- Indexes for table `tb_metas`
--
ALTER TABLE `tb_metas`
  ADD PRIMARY KEY (`id_meta`),
  ADD KEY `id_atleta` (`id_atleta`);

--
-- Indexes for table `tb_nivel_dificultad`
--
ALTER TABLE `tb_nivel_dificultad`
  ADD PRIMARY KEY (`id_nivel`);

--
-- Indexes for table `tb_objetivo`
--
ALTER TABLE `tb_objetivo`
  ADD PRIMARY KEY (`id_objetivo`);

--
-- Indexes for table `tb_pago`
--
ALTER TABLE `tb_pago`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `fk_pago_atleta` (`id_atleta`),
  ADD KEY `id_membresia` (`id_membresia`);

--
-- Indexes for table `tb_perfil`
--
ALTER TABLE `tb_perfil`
  ADD PRIMARY KEY (`id_perfil`);

--
-- Indexes for table `tb_persona`
--
ALTER TABLE `tb_persona`
  ADD PRIMARY KEY (`id_persona`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indexes for table `tb_proceso`
--
ALTER TABLE `tb_proceso`
  ADD PRIMARY KEY (`id_proceso`),
  ADD KEY `id_atleta` (`id_atleta`);

--
-- Indexes for table `tb_repeticion`
--
ALTER TABLE `tb_repeticion`
  ADD PRIMARY KEY (`id_repeticion`);

--
-- Indexes for table `tb_rutina`
--
ALTER TABLE `tb_rutina`
  ADD PRIMARY KEY (`id_rutina`),
  ADD KEY `id_creador` (`id_creador`);

--
-- Indexes for table `tb_rutina_atleta`
--
ALTER TABLE `tb_rutina_atleta`
  ADD PRIMARY KEY (`id_rutina_atleta`),
  ADD KEY `id_rutina` (`id_rutina`),
  ADD KEY `id_atleta` (`id_atleta`);

--
-- Indexes for table `tb_rutina_ejercicios`
--
ALTER TABLE `tb_rutina_ejercicios`
  ADD PRIMARY KEY (`id_rutina_ejercicios`),
  ADD KEY `id_ejercicios` (`id_ejercicios`),
  ADD KEY `id_repeticion` (`id_repeticion`),
  ADD KEY `id_rutina` (`id_rutina`);

--
-- Indexes for table `tb_rutina_favorita`
--
ALTER TABLE `tb_rutina_favorita`
  ADD PRIMARY KEY (`id_atleta`,`id_rutina`),
  ADD KEY `id_rutina` (`id_rutina`);

--
-- Indexes for table `tb_rutina_grupo_muscular`
--
ALTER TABLE `tb_rutina_grupo_muscular`
  ADD PRIMARY KEY (`id_rutina`,`id_grupo_muscular`),
  ADD KEY `id_grupo_muscular` (`id_grupo_muscular`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_asistencia`
--
ALTER TABLE `tb_asistencia`
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tb_atleta`
--
ALTER TABLE `tb_atleta`
  MODIFY `id_atleta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_ejercicios`
--
ALTER TABLE `tb_ejercicios`
  MODIFY `id_ejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT for table `tb_entrenador`
--
ALTER TABLE `tb_entrenador`
  MODIFY `id_entrenador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_gimnasio`
--
ALTER TABLE `tb_gimnasio`
  MODIFY `id_gimnasio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_grupos_musculares`
--
ALTER TABLE `tb_grupos_musculares`
  MODIFY `id_grupo_muscular` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tb_logros`
--
ALTER TABLE `tb_logros`
  MODIFY `id_logro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_membresia`
--
ALTER TABLE `tb_membresia`
  MODIFY `id_membresia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_menu`
--
ALTER TABLE `tb_menu`
  MODIFY `id_menu` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `tb_menu_perfil`
--
ALTER TABLE `tb_menu_perfil`
  MODIFY `id_acceso` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `tb_metas`
--
ALTER TABLE `tb_metas`
  MODIFY `id_meta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_nivel_dificultad`
--
ALTER TABLE `tb_nivel_dificultad`
  MODIFY `id_nivel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_objetivo`
--
ALTER TABLE `tb_objetivo`
  MODIFY `id_objetivo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_pago`
--
ALTER TABLE `tb_pago`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_perfil`
--
ALTER TABLE `tb_perfil`
  MODIFY `id_perfil` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_persona`
--
ALTER TABLE `tb_persona`
  MODIFY `id_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_proceso`
--
ALTER TABLE `tb_proceso`
  MODIFY `id_proceso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_repeticion`
--
ALTER TABLE `tb_repeticion`
  MODIFY `id_repeticion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tb_rutina`
--
ALTER TABLE `tb_rutina`
  MODIFY `id_rutina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_rutina_atleta`
--
ALTER TABLE `tb_rutina_atleta`
  MODIFY `id_rutina_atleta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_rutina_ejercicios`
--
ALTER TABLE `tb_rutina_ejercicios`
  MODIFY `id_rutina_ejercicios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_asistencia`
--
ALTER TABLE `tb_asistencia`
  ADD CONSTRAINT `tb_asistencia_ibfk_1` FOREIGN KEY (`id_atleta`) REFERENCES `tb_atleta` (`id_atleta`);

--
-- Constraints for table `tb_atleta`
--
ALTER TABLE `tb_atleta`
  ADD CONSTRAINT `atleta_ibfk_1` FOREIGN KEY (`id_entrenador`) REFERENCES `tb_entrenador` (`id_entrenador`),
  ADD CONSTRAINT `tb_atleta_ibfk_1` FOREIGN KEY (`id_gimnasio`) REFERENCES `tb_gimnasio` (`id_gimnasio`),
  ADD CONSTRAINT `tb_atleta_ibfk_2` FOREIGN KEY (`id_persona`) REFERENCES `tb_persona` (`id_persona`);

--
-- Constraints for table `tb_ejercicios`
--
ALTER TABLE `tb_ejercicios`
  ADD CONSTRAINT `tb_ejercicios_ibfk_1` FOREIGN KEY (`id_grupo_muscular`) REFERENCES `tb_grupos_musculares` (`id_grupo_muscular`),
  ADD CONSTRAINT `tb_ejercicios_ibfk_2` FOREIGN KEY (`id_entrenador`) REFERENCES `tb_entrenador` (`id_entrenador`);

--
-- Constraints for table `tb_entrenador`
--
ALTER TABLE `tb_entrenador`
  ADD CONSTRAINT `tb_entrenador_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `tb_persona` (`id_persona`);

--
-- Constraints for table `tb_logros`
--
ALTER TABLE `tb_logros`
  ADD CONSTRAINT `tb_logros_ibfk_1` FOREIGN KEY (`id_atleta`) REFERENCES `tb_atleta` (`id_atleta`) ON DELETE CASCADE;

--
-- Constraints for table `tb_membresia`
--
ALTER TABLE `tb_membresia`
  ADD CONSTRAINT `tb_membresia_ibfk_1` FOREIGN KEY (`id_gimnasio`) REFERENCES `tb_gimnasio` (`id_gimnasio`);

--
-- Constraints for table `tb_menu_perfil`
--
ALTER TABLE `tb_menu_perfil`
  ADD CONSTRAINT `tb_menu_perfil_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `tb_menu` (`id_menu`),
  ADD CONSTRAINT `tb_menu_perfil_ibfk_2` FOREIGN KEY (`id_perfil`) REFERENCES `tb_perfil` (`id_perfil`);

--
-- Constraints for table `tb_metas`
--
ALTER TABLE `tb_metas`
  ADD CONSTRAINT `tb_metas_ibfk_1` FOREIGN KEY (`id_atleta`) REFERENCES `tb_atleta` (`id_atleta`);

--
-- Constraints for table `tb_pago`
--
ALTER TABLE `tb_pago`
  ADD CONSTRAINT `fk_pago_atleta` FOREIGN KEY (`id_atleta`) REFERENCES `tb_atleta` (`id_atleta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_pago_ibfk_1` FOREIGN KEY (`id_membresia`) REFERENCES `tb_membresia` (`id_membresia`);

--
-- Constraints for table `tb_proceso`
--
ALTER TABLE `tb_proceso`
  ADD CONSTRAINT `tb_proceso_ibfk_1` FOREIGN KEY (`id_atleta`) REFERENCES `tb_atleta` (`id_atleta`);

--
-- Constraints for table `tb_rutina`
--
ALTER TABLE `tb_rutina`
  ADD CONSTRAINT `tb_rutina_ibfk_1` FOREIGN KEY (`id_creador`) REFERENCES `tb_persona` (`id_persona`);

--
-- Constraints for table `tb_rutina_atleta`
--
ALTER TABLE `tb_rutina_atleta`
  ADD CONSTRAINT `tb_rutina_atleta_ibfk_1` FOREIGN KEY (`id_rutina`) REFERENCES `tb_rutina` (`id_rutina`),
  ADD CONSTRAINT `tb_rutina_atleta_ibfk_2` FOREIGN KEY (`id_atleta`) REFERENCES `tb_atleta` (`id_atleta`);

--
-- Constraints for table `tb_rutina_ejercicios`
--
ALTER TABLE `tb_rutina_ejercicios`
  ADD CONSTRAINT `tb_rutina_ejercicios_ibfk_1` FOREIGN KEY (`id_ejercicios`) REFERENCES `tb_ejercicios` (`id_ejercicio`),
  ADD CONSTRAINT `tb_rutina_ejercicios_ibfk_2` FOREIGN KEY (`id_repeticion`) REFERENCES `tb_repeticion` (`id_repeticion`),
  ADD CONSTRAINT `tb_rutina_ejercicios_ibfk_3` FOREIGN KEY (`id_rutina`) REFERENCES `tb_rutina` (`id_rutina`);

--
-- Constraints for table `tb_rutina_favorita`
--
ALTER TABLE `tb_rutina_favorita`
  ADD CONSTRAINT `tb_rutina_favorita_ibfk_1` FOREIGN KEY (`id_atleta`) REFERENCES `tb_atleta` (`id_atleta`),
  ADD CONSTRAINT `tb_rutina_favorita_ibfk_2` FOREIGN KEY (`id_rutina`) REFERENCES `tb_rutina` (`id_rutina`);

--
-- Constraints for table `tb_rutina_grupo_muscular`
--
ALTER TABLE `tb_rutina_grupo_muscular`
  ADD CONSTRAINT `tb_rutina_grupo_muscular_ibfk_1` FOREIGN KEY (`id_rutina`) REFERENCES `tb_rutina` (`id_rutina`),
  ADD CONSTRAINT `tb_rutina_grupo_muscular_ibfk_2` FOREIGN KEY (`id_grupo_muscular`) REFERENCES `tb_grupos_musculares` (`id_grupo_muscular`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
