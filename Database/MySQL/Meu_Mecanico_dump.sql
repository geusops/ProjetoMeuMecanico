-- MySQL dump 10.13  Distrib 8.0.43, for macos15 (arm64)
--
-- Host: localhost    Database: meu_mecanico
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administradores` (
  `id_admin` int(11) NOT NULL,
  PRIMARY KEY (`id_admin`),
  CONSTRAINT `fk_admin_usuario` FOREIGN KEY (`id_admin`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacoes`
--

DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes` (
  `id_avaliacao` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `id_oficina` int(11) NOT NULL,
  `nota` int(11) DEFAULT NULL CHECK (`nota` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `data` date DEFAULT NULL,
  PRIMARY KEY (`id_avaliacao`),
  KEY `fk_avaliacao_cliente` (`id_cliente`),
  KEY `fk_avaliacao_oficina` (`id_oficina`),
  CONSTRAINT `fk_avaliacao_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE,
  CONSTRAINT `fk_avaliacao_oficina` FOREIGN KEY (`id_oficina`) REFERENCES `oficinas` (`id_oficina`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
INSERT INTO `avaliacoes` VALUES (1,7,1,5,'Excelente atendimento','2026-03-03'),(2,7,2,4,'Bom serviço','2026-03-03'),(3,7,3,5,'Muito profissional','2026-03-03'),(4,7,4,4,'Serviço rápido','2026-03-03'),(5,7,5,5,'Oficina premium de alto nível','2026-03-03'),(6,7,6,4,'Diagnóstico preciso','2026-03-03');
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  CONSTRAINT `fk_cliente_usuario` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (5,'(11) 98888-7777','São Paulo - SP'),(7,'(11) 98888-7777','São Paulo - SP');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mecanicos`
--

DROP TABLE IF EXISTS `mecanicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mecanicos` (
  `id_mecanico` int(11) NOT NULL,
  `especialidades` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_mecanico`),
  CONSTRAINT `fk_mecanico_usuario` FOREIGN KEY (`id_mecanico`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mecanicos`
--

LOCK TABLES `mecanicos` WRITE;
/*!40000 ALTER TABLE `mecanicos` DISABLE KEYS */;
INSERT INTO `mecanicos` VALUES (1,'Mecânica geral','(11) 90000-0001'),(2,'Suspensão e freios','(11) 90000-0002'),(3,'Motor e câmbio','(11) 90000-0003'),(4,'Troca de óleo','(11) 90000-0004'),(5,'Carros premium','(11) 90000-0005'),(6,'Diagnóstico eletrônico','(11) 90000-0006');
/*!40000 ALTER TABLE `mecanicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oficinas`
--

DROP TABLE IF EXISTS `oficinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oficinas` (
  `id_oficina` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `foto_path` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `id_mecanico` int(11) NOT NULL,
  `especialidade` varchar(100) DEFAULT NULL,
  `avaliacao` decimal(2,1) DEFAULT NULL,
  `latitude_oficina` decimal(10,8) DEFAULT NULL,
  `longitude_oficina` decimal(11,8) DEFAULT NULL,
  PRIMARY KEY (`id_oficina`),
  KEY `fk_oficina_mecanico` (`id_mecanico`),
  CONSTRAINT `fk_oficina_mecanico` FOREIGN KEY (`id_mecanico`) REFERENCES `mecanicos` (`id_mecanico`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oficinas`
--

LOCK TABLES `oficinas` WRITE;
/*!40000 ALTER TABLE `oficinas` DISABLE KEYS */;
INSERT INTO `oficinas` VALUES (1,'Oficina São Jorge','/uploads/oficinas/1/principal.jpg','Av. Paulista, 1200 - Bela Vista, São Paulo - SP','(11) 90000-0001',1,'Mecânica geral',4.7,-23.56141400,-46.65588100),(2,'Auto Center Speed Car','/uploads/oficinas/2/principal.jpg','Rua Tuiuti, 850 - Tatuapé, São Paulo - SP','(11) 90000-0002',2,'Suspensão e freios',4.3,-23.54228100,-46.57245600),(3,'Mecânica do Zé','/uploads/oficinas/3/principal.jpg','Av. Itaquera, 2300 - Itaquera, São Paulo - SP','(11) 90000-0003',3,'Motor e câmbio',4.8,-23.55393500,-46.49132500),(4,'Box 4 Rodas','/uploads/oficinas/4/principal.jpg','Rua das Oficinas, 45 - Mooca, São Paulo - SP','(11) 90000-0004',4,'Troca de óleo',4.1,-23.55523400,-46.60412300),(5,'Prime Motors','/uploads/oficinas/5/principal.jpg','Av. Interlagos, 4100 - Interlagos, São Paulo - SP','(11) 90000-0005',5,'Carros premium',4.9,-23.68285500,-46.69123400),(6,'Garage Pro','/uploads/oficinas/6/principal.jpg','Rua dos Trilhos, 300 - Brás, São Paulo - SP','(11) 90000-0006',6,'Diagnóstico eletrônico',4.4,-23.54923400,-46.60123400),(27,'Centro Automotivo Sé','/uploads/oficinas/27/principal.jpg','Praça da Sé, 100 - Sé, São Paulo - SP','(11) 91111-0001',1,'Mecânica Geral',4.5,-23.55050000,-46.63330000),(28,'Mecânica Bela Vista','/uploads/oficinas/28/principal.jpg','Rua Treze de Maio, 500 - Bela Vista, São Paulo - SP','(11) 91111-0002',2,'Freios e Suspensão',4.8,-23.55820000,-46.64320000),(29,'Speed República','/uploads/oficinas/29/principal.jpg','Av. Ipiranga, 200 - República, São Paulo - SP','(11) 91111-0003',3,'Injeção Eletrônica',4.2,-23.54350000,-46.64150000),(30,'Garagem Liberdade','/uploads/oficinas/30/principal.jpg','Rua Galvão Bueno, 300 - Liberdade, São Paulo - SP','(11) 91111-0004',4,'Troca de Óleo',4.6,-23.55520000,-46.63510000),(31,'Oficina do Glicério','/uploads/oficinas/31/principal.jpg','Rua do Glicério, 450 - Liberdade, São Paulo - SP','(11) 91111-0005',5,'Pneus e Rodas',4.1,-23.55700000,-46.63000000),(32,'Stop Car Consolação','/uploads/oficinas/32/principal.jpg','Rua da Consolação, 800 - Centro, São Paulo - SP','(11) 91111-0006',6,'Alinhamento',4.7,-23.54800000,-46.64800000),(33,'Mecânica Santa Cecília','/uploads/oficinas/33/principal.jpg','Rua Canuto do Val, 120 - Santa Cecília, São Paulo - SP','(11) 91111-0007',1,'Motor e Câmbio',4.9,-23.54100000,-46.65100000),(34,'Flash Centro','/uploads/oficinas/34/principal.jpg','Av. São João, 1500 - Centro, São Paulo - SP','(11) 91111-0008',2,'Elétrica Automotiva',4.3,-23.53800000,-46.64200000),(35,'Master Oficinas','/uploads/oficinas/35/principal.jpg','Rua Augusta, 300 - Centro, São Paulo - SP','(11) 91111-0009',3,'Ar Condicionado',4.4,-23.54900000,-46.64950000),(36,'Prime Car Centro','/uploads/oficinas/36/principal.jpg','Rua Maria Paula, 60 - Bela Vista, São Paulo - SP','(11) 91111-0010',4,'Revisão Preventiva',4.8,-23.55200000,-46.63800000),(37,'Interlagos Motorsport','/uploads/oficinas/37/principal.jpg','Av. Interlagos, 2000 - Campo Grande, São Paulo - SP','(11) 92222-0001',5,'Performance e Motor',4.9,-23.67400000,-46.69100000),(38,'Mecânica Sto Amaro','/uploads/oficinas/38/principal.jpg','Rua Verbo Divino, 100 - Santo Amaro, São Paulo - SP','(11) 92222-0002',6,'Suspensão',4.6,-23.63500000,-46.70500000),(39,'Vila Mariana Auto Service','/uploads/oficinas/39/principal.jpg','Rua Domingos de Morais, 1500 - Vila Mariana, São Paulo - SP','(11) 92222-0003',1,'Freios ABS',4.7,-23.58900000,-46.63400000),(40,'Moema Car Care','/uploads/oficinas/40/principal.jpg','Av. Ibirapuera, 2500 - Moema, São Paulo - SP','(11) 92222-0004',2,'Importados',4.8,-23.60200000,-46.66200000),(41,'Jabaquara Oficina','/uploads/oficinas/41/principal.jpg','Rua das Perobas, 50 - Jabaquara, São Paulo - SP','(11) 92222-0005',3,'Mecânica Geral',4.4,-23.64500000,-46.64100000),(42,'Brooklin Service','/uploads/oficinas/42/principal.jpg','Av. Santo Amaro, 4500 - Brooklin, São Paulo - SP','(11) 92222-0006',4,'Troca de Óleo',4.5,-23.62100000,-46.68500000),(43,'Morumbi Garage','/uploads/oficinas/43/principal.jpg','Av. Giovanni Gronchi, 3000 - Morumbi, São Paulo - SP','(11) 92222-0007',5,'Diagnóstico Digital',4.7,-23.61500000,-46.72800000),(44,'Ipiranga Motores','/uploads/oficinas/44/principal.jpg','Rua Bom Pastor, 2000 - Ipiranga, São Paulo - SP','(11) 92222-0008',6,'Câmbio Automático',4.6,-23.59100000,-46.61100000),(45,'Saúde Auto Center','/uploads/oficinas/45/principal.jpg','Av. Jabaquara, 1800 - Saúde, São Paulo - SP','(11) 92222-0009',1,'Injeção Eletrônica',4.3,-23.61800000,-46.63900000),(46,'Capão Redondo Mecânica','/uploads/oficinas/46/principal.jpg','Estrada de Itapecerica, 3000 - Capão Redondo, São Paulo - SP','(11) 92222-0010',2,'Geral e Popular',4.2,-23.66100000,-46.76500000),(47,'Tatuapé Turbos','/uploads/oficinas/47/principal.jpg','Rua Tuiuti, 2000 - Tatuapé, São Paulo - SP','(11) 93333-0001',3,'Turbinas e Motor',4.8,-23.54100000,-46.57100000),(48,'Mooca Garage 1950','/uploads/oficinas/48/principal.jpg','Rua Javari, 400 - Mooca, São Paulo - SP','(11) 93333-0002',4,'Restauração',4.9,-23.55500000,-46.60200000),(49,'Itaquera Auto Tech','/uploads/oficinas/49/principal.jpg','Av. Jacu-Pêssego, 1500 - Itaquera, São Paulo - SP','(11) 93333-0003',5,'Câmbio',4.5,-23.54100000,-46.46800000),(50,'Carrão Freios','/uploads/oficinas/50/principal.jpg','Av. Conselheiro Carrão, 2500 - Carrão, São Paulo - SP','(11) 93333-0004',6,'Suspensão e Freio',4.4,-23.55900000,-46.54900000),(51,'Anália Franco Premium','/uploads/oficinas/51/principal.jpg','Rua Emília Marengo, 800 - Tatuapé, São Paulo - SP','(11) 93333-0005',1,'Carros de Luxo',4.9,-23.55100000,-46.56500000),(52,'Penha Centro Automotivo','/uploads/oficinas/52/principal.jpg','Av. Amador Bueno da Veiga, 1000 - Penha, São Paulo - SP','(11) 93333-0006',2,'Mecânica Geral',4.3,-23.52100000,-46.53500000),(53,'Belenzinho Reparos','/uploads/oficinas/53/principal.jpg','Rua Belém, 300 - Belenzinho, São Paulo - SP','(11) 93333-0007',3,'Escapamentos',4.1,-23.53900000,-46.59500000),(54,'São Miguel Diesel','/uploads/oficinas/54/principal.jpg','Av. Marechal Tito, 2000 - São Miguel, São Paulo - SP','(11) 93333-0008',4,'Motores Diesel',4.6,-23.49100000,-46.44500000),(55,'Vila Matilde Elétrica','/uploads/oficinas/55/principal.jpg','Rua Waldemar Carlos Pereira, 500 - Vila Matilde, São Paulo - SP','(11) 93333-0009',5,'Baterias e Elétrica',4.2,-23.53500000,-46.51900000),(56,'Sapopemba Mecânica','/uploads/oficinas/56/principal.jpg','Av. Sapopemba, 8000 - Sapopemba, São Paulo - SP','(11) 93333-0010',6,'Pneus e Suspensão',4.0,-23.60500000,-46.49500000),(57,'Pinheiros High-Tech','/uploads/oficinas/57/principal.jpg','Rua dos Pinheiros, 1200 - Pinheiros, São Paulo - SP','(11) 94444-0001',1,'Diagnóstico Computadorizado',4.8,-23.56100000,-46.68500000),(58,'Lapa Tradicional','/uploads/oficinas/58/principal.jpg','Rua Doze de Outubro, 500 - Lapa, São Paulo - SP','(11) 94444-0002',2,'Mecânica Geral',4.5,-23.52100000,-46.70500000),(59,'Perdizes Performance','/uploads/oficinas/59/principal.jpg','Rua Cardoso de Almeida, 1000 - Perdizes, São Paulo - SP','(11) 94444-0003',3,'Revisão 10k',4.7,-23.53500000,-46.67500000),(60,'Butantã Eco Auto','/uploads/oficinas/60/principal.jpg','Av. Vital Brasil, 800 - Butantã, São Paulo - SP','(11) 94444-0004',4,'Híbridos e Elétricos',4.9,-23.57100000,-46.71100000),(61,'Vila Madalena Garage','/uploads/oficinas/61/principal.jpg','Rua Harmonia, 300 - Vila Madalena, São Paulo - SP','(11) 94444-0005',5,'Customização',4.6,-23.55500000,-46.69100000),(62,'Jaguaré Mecânica','/uploads/oficinas/62/principal.jpg','Av. Corifeu de Azevedo Marques, 3000 - Jaguaré, São Paulo - SP','(11) 94444-0006',6,'Troca de Óleo',4.2,-23.54500000,-46.74500000),(63,'Pompeia Auto Center','/uploads/oficinas/63/principal.jpg','Av. Pompeia, 1500 - Vila Pompeia, São Paulo - SP','(11) 94444-0007',1,'Ar Condicionado',4.5,-23.52900000,-46.68500000),(64,'Vila Leopoldina Service','/uploads/oficinas/64/principal.jpg','Rua Carlos Weber, 700 - Vila Leopoldina, São Paulo - SP','(11) 94444-0008',2,'Suspensão',4.4,-23.53100000,-46.72500000),(65,'Alto de Pinheiros Oficina','/uploads/oficinas/65/principal.jpg','Av. Diógenes Ribeiro de Lima, 2000 - Pinheiros, São Paulo - SP','(11) 94444-0009',3,'Mecânica Geral',4.7,-23.54900000,-46.70500000),(66,'Raposo Rodas','/uploads/oficinas/66/principal.jpg','Rodovia Raposo Tavares, KM 15 - Butantã, São Paulo - SP','(11) 94444-0010',4,'Alinhamento 3D',4.3,-23.58500000,-46.75500000),(67,'Santana Express','/uploads/oficinas/67/principal.jpg','Rua Voluntários da Pátria, 2000 - Santana, São Paulo - SP','(11) 95555-0001',5,'Revisão Rápida',4.6,-23.50100000,-46.63500000),(68,'Tucuruvi Motores','/uploads/oficinas/68/principal.jpg','Av. Tucuruvi, 800 - Tucuruvi, São Paulo - SP','(11) 95555-0002',6,'Motor e Injeção',4.4,-23.48100000,-46.60500000),(69,'Casa Verde Oficina','/uploads/oficinas/69/principal.jpg','Av. Casa Verde, 1500 - Casa Verde, São Paulo - SP','(11) 95555-0003',1,'Lataria e Pintura',4.5,-23.50500000,-46.66500000),(70,'Vila Maria Diesel','/uploads/oficinas/70/principal.jpg','Rua Curuçá, 600 - Vila Maria, São Paulo - SP','(11) 95555-0004',2,'Caminhonetes e Diesel',4.7,-23.51500000,-46.58500000),(71,'Mandaqui Auto Center','/uploads/oficinas/71/principal.jpg','Av. Engenheiro Caetano Álvares, 3000 - Mandaqui, São Paulo - SP','(11) 95555-0005',3,'Suspensão',4.3,-23.47500000,-46.64500000),(72,'Limão Mecânica Especializada','/uploads/oficinas/72/principal.jpg','Av. Dep. Emílio Carlos, 1000 - Limão, São Paulo - SP','(11) 95555-0006',4,'Mecânica Geral',4.1,-23.50500000,-46.68500000),(73,'Imirim Car Service','/uploads/oficinas/73/principal.jpg','Av. Imirim, 2500 - Imirim, São Paulo - SP','(11) 95555-0007',5,'Elétrica',4.4,-23.48500000,-46.65500000),(74,'Tremembé Garage','/uploads/oficinas/74/principal.jpg','Av. Maria Amália Lopes de Azevedo, 500 - Tremembé, São Paulo - SP','(11) 95555-0008',6,'Freios',4.2,-23.45500000,-46.61500000),(75,'Freguesia do Ó Oficina','/uploads/oficinas/75/principal.jpg','Av. Itaberaba, 1200 - Freguesia do Ó, São Paulo - SP','(11) 95555-0009',1,'Motor',4.5,-23.48900000,-46.69500000),(76,'Jaçanã Mecânica','/uploads/oficinas/76/principal.jpg','Rua Benjamim Pereira, 300 - Jaçanã, São Paulo - SP','(11) 95555-0010',2,'Troca de Óleo e Filtros',4.3,-23.45100000,-46.58500000);
/*!40000 ALTER TABLE `oficinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicos`
--

DROP TABLE IF EXISTS `servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicos` (
  `id_servico` int(11) NOT NULL AUTO_INCREMENT,
  `nome_servico` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `preco_medio` decimal(10,2) DEFAULT NULL,
  `id_oficina` int(11) NOT NULL,
  PRIMARY KEY (`id_servico`),
  KEY `fk_servico_oficina` (`id_oficina`),
  CONSTRAINT `fk_servico_oficina` FOREIGN KEY (`id_oficina`) REFERENCES `oficinas` (`id_oficina`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicos`
--

LOCK TABLES `servicos` WRITE;
/*!40000 ALTER TABLE `servicos` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` enum('CLIENTE','MECANICO','ADMIN') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'João - Oficina São Jorge','','saojorge@meumecanico.com','hash123','MECANICO'),(2,'Carlos - Speed Car','','speedcar@meumecanico.com','hash123','MECANICO'),(3,'Zé - Mecânica do Zé','','mecanicaze@meumecanico.com','hash123','MECANICO'),(4,'Box 4 Rodas','','box4rodas@meumecanico.com','hash123','MECANICO'),(5,'Prime Motors','','primemotors@meumecanico.com','hash123','MECANICO'),(6,'Garage Pro','','garagepro@meumecanico.com','hash123','MECANICO'),(7,'Cliente Seed','','cliente@meumecanico.com','hash123','CLIENTE'),(8,'Geu','','geu@meumecanico.com','hash123','CLIENTE'),(9,'Thamires','1112345678','thamires@email.com','111111','CLIENTE');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-26 20:34:37
