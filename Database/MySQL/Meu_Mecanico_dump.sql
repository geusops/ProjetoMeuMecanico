-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 31/05/2026 às 06:40
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `meu_mecanico`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `administradores`
--

CREATE TABLE `administradores` (
  `id_admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `avaliacoes`
--

CREATE TABLE `avaliacoes` (
  `id_avaliacao` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_oficina` int(11) NOT NULL,
  `nota` int(11) DEFAULT NULL CHECK (`nota` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `data` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `telefone`, `endereco`) VALUES
(5, '(11) 98888-7777', 'São Paulo - SP'),
(11, NULL, NULL),
(12, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `mecanicos`
--

CREATE TABLE `mecanicos` (
  `id_mecanico` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `mecanicos`
--

INSERT INTO `mecanicos` (`id_mecanico`, `id_usuario`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 11),
(8, 12);

-- --------------------------------------------------------

--
-- Estrutura para tabela `oficinas`
--

CREATE TABLE `oficinas` (
  `id_oficina` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `foto_path` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `id_mecanico` int(11) NOT NULL,
  `especialidade` text DEFAULT NULL,
  `marcas` text DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `avaliacao` decimal(2,1) DEFAULT NULL,
  `latitude_oficina` decimal(10,8) DEFAULT NULL,
  `longitude_oficina` decimal(11,8) DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `oficinas`
--

INSERT INTO `oficinas` (`id_oficina`, `nome`, `foto_path`, `endereco`, `telefone`, `email`, `id_mecanico`, `especialidade`, `marcas`, `descricao`, `avaliacao`, `latitude_oficina`, `longitude_oficina`, `uf`, `cidade`, `bairro`) VALUES
(1, 'Oficina São Jorge', '/uploads/oficinas/1/principal.jpg', 'Av. Paulista, 1200 - Bela Vista, São Paulo - SP', '(11) 90000-0001', 'contato.saojorge@gmail.com', 1, 'e1,e2,e6', 'm2,m4,m5,m6,m7', 'A Oficina São Jorge é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, Freios e Suspensão e Troca de óleo, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.7, -23.56141400, -46.65588100, 'SP', 'São Paulo', 'Bela Vista'),
(2, 'Auto Center Speed Car', '/uploads/oficinas/2/principal.jpg', 'Rua Tuiuti, 850 - Tatuapé, São Paulo - SP', '(11) 90000-0002', 'speedcar.autocenter@outlook.com', 2, 'e2,e5,e6', 'm1,m3,m5,m7,m8', 'A Auto Center Speed Car é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Freios e Suspensão, Pneus e Alinhamento e Troca de óleo, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.3, -23.54228100, -46.57245600, 'SP', 'São Paulo', 'Tatuapé'),
(3, 'Mecânica do Zé', '/uploads/oficinas/3/principal.jpg', 'Av. Itaquera, 2300 - Itaquera, São Paulo - SP', '(11) 90000-0003', 'mecanicadoze@hotmail.com', 3, 'e1,e3,e7', 'm1,m2,m3,m4,m5,m6,m7,m8', 'A Mecânica do Zé é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, Elétrica e Baterias e Injeção eletrônica, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.8, -23.55393500, -46.49132500, 'SP', 'São Paulo', 'Itaquera'),
(4, 'Box 4 Rodas', '/uploads/oficinas/4/principal.jpg', 'Rua das Oficinas, 45 - Mooca, São Paulo - SP', '(11) 90000-0004', 'atendimento@box4rodas.com.br', 4, 'e4,e6', 'm4', 'A Box 4 Rodas é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Ar-Condicionado e Troca de óleo, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.1, -23.55523400, -46.60412300, 'SP', 'São Paulo', 'Mooca'),
(5, 'Prime Motors', '/uploads/oficinas/5/principal.jpg', 'Av. Interlagos, 4100 - Interlagos, São Paulo - SP', '(11) 90000-0005', 'contato@primemotors.com.br', 5, 'e1,e5,e8', 'm1,m2,m6,m7,m8', 'A Prime Motors é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, Pneus e Alinhamento e Pintura e Funilaria, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.9, -23.68285500, -46.69123400, 'SP', 'São Paulo', 'Interlagos'),
(6, 'Garage Pro', '/uploads/oficinas/6/principal.jpg', 'Rua dos Trilhos, 300 - Brás, São Paulo - SP', '(11) 90000-0006', 'garagepro.sp@gmail.com', 6, 'e3,e4,e7', 'm1,m2,m3,m4,m5,m8', 'A Garage Pro é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Elétrica e Baterias, Ar-Condicionado e Injeção eletrônica, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.4, -23.54923400, -46.60123400, 'SP', 'São Paulo', 'Brás'),
(27, 'Centro Automotivo Sé', '/uploads/oficinas/27/principal.jpg', 'Praça da Sé, 100 - Sé, São Paulo - SP', '(11) 91111-0001', 'centroautomotivo.se@outlook.com', 1, 'e1,e2,e6', 'm1,m2,m3,m4,m5,m6,m7,m8', 'A Centro Automotivo Sé é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, Freios e Suspensão e Troca de óleo, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.5, -23.55050000, -46.63330000, 'SP', 'São Paulo', 'Sé'),
(28, 'Mecânica Bela Vista', '/uploads/oficinas/28/principal.jpg', 'Rua Treze de Maio, 500 - Bela Vista, São Paulo - SP', '(11) 91111-0002', 'mecanicabelavista@gmail.com', 2, 'e2,e5,e6', 'm4', 'A Mecânica Bela Vista é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Freios e Suspensão, Pneus e Alinhamento e Troca de óleo, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.8, -23.55820000, -46.64320000, 'SP', 'São Paulo', 'Bela Vista'),
(29, 'Speed República', '/uploads/oficinas/29/principal.jpg', 'Av. Ipiranga, 200 - República, São Paulo - SP', '(11) 91111-0003', 'speed.republica@hotmail.com', 3, 'e1,e7', 'm1,m2,m6,m7,m8', 'A Speed República é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Injeção eletrônica, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.2, -23.54350000, -46.64150000, 'SP', 'São Paulo', 'República'),
(30, 'Garagem Liberdade', '/uploads/oficinas/30/principal.jpg', 'Rua Galvão Bueno, 300 - Liberdade, São Paulo - SP', '(11) 91111-0004', 'financeiro@garagemliberdade.com.br', 4, 'e4,e6', 'm1,m2,m3,m4,m5,m8', 'A Garagem Liberdade é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Ar-Condicionado e Troca de óleo, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.6, -23.55520000, -46.63510000, 'SP', 'São Paulo', 'Liberdade'),
(31, 'Oficina do Glicério', '/uploads/oficinas/31/principal.jpg', 'Rua do Glicério, 450 - Liberdade, São Paulo - SP', '(11) 91111-0005', 'oficinadoglicerio@gmail.com', 5, 'e2,e5', 'm2,m4,m5,m6,m7', 'A Oficina do Glicério é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Freios e Suspensão e Pneus e Alinhamento, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.1, -23.55700000, -46.63000000, 'SP', 'São Paulo', 'Liberdade'),
(32, 'Stop Car Consolação', '/uploads/oficinas/32/principal.jpg', 'Rua da Consolação, 800 - Centro, São Paulo - SP', '(11) 91111-0006', 'stopcar.consolacao@outlook.com', 6, 'e2,e5', 'm1,m3,m5,m7,m8', 'A Stop Car Consolação é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Freios e Suspensão e Pneus e Alinhamento, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.7, -23.54800000, -46.64800000, 'SP', 'São Paulo', 'Centro'),
(33, 'Mecânica Santa Cecília', '/uploads/oficinas/33/principal.jpg', 'Rua Canuto do Val, 120 - Santa Cecília, São Paulo - SP', '(11) 91111-0007', 'mecanicasantacecilia@gmail.com', 1, 'e1,e3,e7', 'm1,m2,m3,m4,m5,m6,m7,m8', 'A Mecânica Santa Cecília é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, Elétrica e Baterias e Injeção eletrônica, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.9, -23.54100000, -46.65100000, 'SP', 'São Paulo', 'Santa Cecília'),
(34, 'Flash Centro', '/uploads/oficinas/34/principal.jpg', 'Av. São João, 1500 - Centro, São Paulo - SP', '(11) 91111-0008', 'flashcentro.sp@hotmail.com', 2, 'e3,e4,e7', 'm4', 'A Flash Centro é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Elétrica e Baterias, Ar-Condicionado e Injeção eletrônica, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.3, -23.53800000, -46.64200000, 'SP', 'São Paulo', 'Centro'),
(35, 'Master Oficinas', '/uploads/oficinas/35/principal.jpg', 'Rua Augusta, 300 - Centro, São Paulo - SP', '(11) 91111-0009', 'contato@masteroficinas.com.br', 3, 'e4', 'm1,m2,m6,m7,m8', 'A Master Oficinas é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Ar-Condicionado, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.4, -23.54900000, -46.64950000, 'SP', 'São Paulo', 'Centro'),
(36, 'Prime Car Centro', '/uploads/oficinas/36/principal.jpg', 'Rua Maria Paula, 60 - Bela Vista, São Paulo - SP', '(11) 91111-0010', 'primecarcentro@outlook.com', 4, 'e1', 'm1,m2,m3,m4,m5,m8', 'A Prime Car Centro é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.8, -23.55200000, -46.63800000, 'SP', 'São Paulo', 'Bela Vista'),
(37, 'Interlagos Motorsport', '/uploads/oficinas/37/principal.jpg', 'Av. Interlagos, 2000 - Campo Grande, São Paulo - SP', '(11) 92222-0001', 'interlagos_motorsport@gmail.com', 5, 'e1,e3', 'm2,m4,m5,m6,m7', 'A Interlagos Motorsport é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Elétrica e Baterias, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.9, -23.67400000, -46.69100000, 'SP', 'São Paulo', 'Campo Grande'),
(38, 'Mecânica Sto Amaro', '/uploads/oficinas/38/principal.jpg', 'Rua Verbo Divino, 100 - Santo Amaro, São Paulo - SP', '(11) 92222-0002', 'mecanicastoamaro@hotmail.com', 6, 'e1,e2', 'm1,m3,m5,m7,m8', 'A Mecânica Sto Amaro é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Freios e Suspensão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.6, -23.63500000, -46.70500000, 'SP', 'São Paulo', 'Santo Amaro'),
(39, 'Vila Mariana Auto Service', '/uploads/oficinas/39/principal.jpg', 'Rua Domingos de Morais, 1500 - Vila Mariana, São Paulo - SP', '(11) 92222-0003', 'contato@vilamarianaautoservice.com', 1, 'e1,e2', 'm1,m2,m3,m4,m5,m6,m7,m8', 'A Vila Mariana Auto Service é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Freios e Suspensão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.7, -23.58900000, -46.63400000, 'SP', 'São Paulo', 'Vila Mariana'),
(40, 'Moema Car Care', '/uploads/oficinas/40/principal.jpg', 'Av. Ibirapuera, 2500 - Moema, São Paulo - SP', '(11) 92222-0004', 'moemacarcare@outlook.com', 2, 'e1', 'm4', 'A Moema Car Care é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.8, -23.60200000, -46.66200000, 'SP', 'São Paulo', 'Moema'),
(41, 'Jabaquara Oficina', '/uploads/oficinas/41/principal.jpg', 'Rua das Perobas, 50 - Jabaquara, São Paulo - SP', '(11) 92222-0005', 'jabaquara.oficina@gmail.com', 3, 'e1,e2,e6', 'm1,m2,m6,m7,m8', 'A Jabaquara Oficina é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, Freios e Suspensão e Troca de óleo, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.4, -23.64500000, -46.64100000, 'SP', 'São Paulo', 'Jabaquara'),
(42, 'Brooklin Service', '/uploads/oficinas/42/principal.jpg', 'Av. Santo Amaro, 4500 - Brooklin, São Paulo - SP', '(11) 92222-0006', 'brooklinservice@hotmail.com', 4, 'e4,e6', 'm1,m2,m3,m4,m5,m8', 'A Brooklin Service é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Ar-Condicionado e Troca de óleo, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.5, -23.62100000, -46.68500000, 'SP', 'São Paulo', 'Brooklin'),
(43, 'Morumbi Garage', '/uploads/oficinas/43/principal.jpg', 'Av. Giovanni Gronchi, 3000 - Morumbi, São Paulo - SP', '(11) 92222-0007', 'morumbigarage@gmail.com', 5, 'e1,e7', 'm2,m4,m5,m6,m7', 'A Morumbi Garage é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Injeção eletrônica, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.7, -23.61500000, -46.72800000, 'SP', 'São Paulo', 'Morumbi'),
(44, 'Ipiranga Motores', '/uploads/oficinas/44/principal.jpg', 'Rua Bom Pastor, 2000 - Ipiranga, São Paulo - SP', '(11) 92222-0008', 'ipiranga.motores@outlook.com', 6, 'e1,e3', 'm1,m3,m5,m7,m8', 'A Ipiranga Motores é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Elétrica e Baterias, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.6, -23.59100000, -46.61100000, 'SP', 'São Paulo', 'Ipiranga'),
(45, 'Saúde Auto Center', '/uploads/oficinas/45/principal.jpg', 'Av. Jabaquara, 1800 - Saúde, São Paulo - SP', '(11) 92222-0009', 'saudeautocenter@gmail.com', 1, 'e1,e7', 'm1,m2,m3,m4,m5,m6,m7,m8', 'A Saúde Auto Center é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Injeção eletrônica, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.3, -23.61800000, -46.63900000, 'SP', 'São Paulo', 'Saúde'),
(46, 'Capão Redondo Mecânica', '/uploads/oficinas/46/principal.jpg', 'Estrada de Itapecerica, 3000 - Capão Redondo, São Paulo - SP', '(11) 92222-0010', 'capaoredondomecanica@hotmail.com', 2, 'e1', 'm4', 'A Capão Redondo Mecânica é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.2, -23.66100000, -46.76500000, 'SP', 'São Paulo', 'Capão Redondo'),
(47, 'Tatuapé Turbos', '/uploads/oficinas/47/principal.jpg', 'Rua Tuiuti, 2000 - Tatuapé, São Paulo - SP', '(11) 93333-0001', 'tatuapeturbos@outlook.com', 3, 'e1,e3,e7', 'm1,m2,m6,m7,m8', 'A Tatuapé Turbos é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, Elétrica e Baterias e Injeção eletrônica, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.8, -23.54100000, -46.57100000, 'SP', 'São Paulo', 'Tatuapé'),
(48, 'Mooca Garage 1950', '/uploads/oficinas/48/principal.jpg', 'Rua Javari, 400 - Mooca, São Paulo - SP', '(11) 93333-0002', 'moocagarage1950@gmail.com', 4, 'e1,e5,e8', 'm1,m2,m3,m4,m5,m8', 'A Mooca Garage 1950 é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, Pneus e Alinhamento e Pintura e Funilaria, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.9, -23.55500000, -46.60200000, 'SP', 'São Paulo', 'Mooca'),
(49, 'Itaquera Auto Tech', '/uploads/oficinas/49/principal.jpg', 'Av. Jacu-Pêssego, 1500 - Itaquera, São Paulo - SP', '(11) 93333-0003', 'itaquera.autotech@outlook.com', 5, 'e1,e3', 'm2,m4,m5,m6,m7', 'A Itaquera Auto Tech é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Elétrica e Baterias, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.5, -23.54100000, -46.46800000, 'SP', 'São Paulo', 'Itaquera'),
(50, 'Carrão Freios', '/uploads/oficinas/50/principal.jpg', 'Av. Conselheiro Carrão, 2500 - Carrão, São Paulo - SP', '(11) 93333-0004', 'carraofreios@hotmail.com', 6, 'e1,e2', 'm1,m3,m5,m7,m8', 'A Carrão Freios é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Freios e Suspensão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.4, -23.55900000, -46.54900000, 'SP', 'São Paulo', 'Carrão'),
(51, 'Anália Franco Premium', '/uploads/oficinas/51/principal.jpg', 'Rua Emília Marengo, 800 - Tatuapé, São Paulo - SP', '(11) 93333-0005', 'contato@analiafrancopremium.com.br', 1, 'e1', 'm1,m2,m3,m4,m5,m6,m7,m8', 'A Anália Franco Premium é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.9, -23.55100000, -46.56500000, 'SP', 'São Paulo', 'Tatuapé'),
(52, 'Penha Centro Automotivo', '/uploads/oficinas/52/principal.jpg', 'Av. Amador Bueno da Veiga, 1000 - Penha, São Paulo - SP', '(11) 93333-0006', 'penha.centroautomotivo@gmail.com', 2, 'e1', 'm4', 'A Penha Centro Automotivo é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.3, -23.52100000, -46.53500000, 'SP', 'São Paulo', 'Penha'),
(53, 'Belenzinho Reparos', '/uploads/oficinas/53/principal.jpg', 'Rua Belém, 300 - Belenzinho, São Paulo - SP', '(11) 93333-0007', 'belenzinhoreparos@outlook.com', 3, 'e1', 'm1,m2,m6,m7,m8', 'A Belenzinho Reparos é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.1, -23.53900000, -46.59500000, 'SP', 'São Paulo', 'Belenzinho'),
(54, 'São Miguel Diesel', '/uploads/oficinas/54/principal.jpg', 'Av. Marechal Tito, 2000 - São Miguel, São Paulo - SP', '(11) 93333-0008', 'saomigueldiesel@hotmail.com', 4, 'e1', 'm1,m2,m3,m4,m5,m8', 'A São Miguel Diesel é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.6, -23.49100000, -46.44500000, 'SP', 'São Paulo', 'São Miguel'),
(55, 'Vila Matilde Elétrica', '/uploads/oficinas/55/principal.jpg', 'Rua Waldemar Carlos Pereira, 500 - Vila Matilde, São Paulo - SP', '(11) 93333-0009', 'vilamatilde.eletrica@gmail.com', 5, 'e3,e4,e7', 'm2,m4,m5,m6,m7', 'A Vila Matilde Elétrica é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Elétrica e Baterias, Ar-Condicionado e Injeção eletrônica, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.2, -23.53500000, -46.51900000, 'SP', 'São Paulo', 'Vila Matilde'),
(56, 'Sapopemba Mecânica', '/uploads/oficinas/56/principal.jpg', 'Av. Sapopemba, 8000 - Sapopemba, São Paulo - SP', '(11) 93333-0010', 'sapopembamecanica@outlook.com', 6, 'e2,e5,e6', 'm1,m3,m5,m7,m8', 'A Sapopemba Mecânica é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Freios e Suspensão, Pneus e Alinhamento e Troca de óleo, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.0, -23.60500000, -46.49500000, 'SP', 'São Paulo', 'Sapopemba'),
(57, 'Pinheiros High-Tech', '/uploads/oficinas/57/principal.jpg', 'Rua dos Pinheiros, 1200 - Pinheiros, São Paulo - SP', '(11) 94444-0001', 'suporte@pinheiroshightech.com.br', 1, 'e1,e7', 'm1,m2,m3,m4,m5,m6,m7,m8', 'A Pinheiros High-Tech é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Injeção eletrônica, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.8, -23.56100000, -46.68500000, 'SP', 'São Paulo', 'Pinheiros'),
(58, 'Lapa Tradicional', '/uploads/oficinas/58/principal.jpg', 'Rua Doze de Outubro, 500 - Lapa, São Paulo - SP', '(11) 94444-0002', 'lapa.tradicional@gmail.com', 2, 'e1', 'm4', 'A Lapa Tradicional é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.5, -23.52100000, -46.70500000, 'SP', 'São Paulo', 'Lapa'),
(59, 'Perdizes Performance', '/uploads/oficinas/59/principal.jpg', 'Rua Cardoso de Almeida, 1000 - Perdizes, São Paulo - SP', '(11) 94444-0003', 'perdizesperformance@hotmail.com', 3, 'e1', 'm1,m2,m6,m7,m8', 'A Perdizes Performance é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.7, -23.53500000, -46.67500000, 'SP', 'São Paulo', 'Perdizes'),
(60, 'Butantã Eco Auto', '/uploads/oficinas/60/principal.jpg', 'Av. Vital Brasil, 800 - Butantã, São Paulo - SP', '(11) 94444-0004', 'butanta.ecoauto@outlook.com', 4, 'e1', 'm1,m2,m3,m4,m5,m8', 'A Butantã Eco Auto é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.9, -23.57100000, -46.71100000, 'SP', 'São Paulo', 'Butantã'),
(61, 'Vila Madalena Garage', '/uploads/oficinas/61/principal.jpg', 'Rua Harmonia, 300 - Vila Madalena, São Paulo - SP', '(11) 94444-0005', 'vilamadelenagarage@gmail.com', 5, 'e1', 'm2,m4,m5,m6,m7', 'A Vila Madalena Garage é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.6, -23.55500000, -46.69100000, 'SP', 'São Paulo', 'Vila Madalena'),
(62, 'Jaguaré Mecânica', '/uploads/oficinas/62/principal.jpg', 'Av. Corifeu de Azevedo Marques, 3000 - Jaguaré, São Paulo - SP', '(11) 94444-0006', 'jaguaremecanica@hotmail.com', 6, 'e4,e6', 'm1,m3,m5,m7,m8', 'A Jaguaré Mecânica é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Ar-Condicionado e Troca de óleo, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.2, -23.54500000, -46.74500000, 'SP', 'São Paulo', 'Jaguaré'),
(63, 'Pompeia Auto Center', '/uploads/oficinas/63/principal.jpg', 'Av. Pompeia, 1500 - Vila Pompeia, São Paulo - SP', '(11) 94444-0007', 'pompeiaautocenter@outlook.com', 1, 'e4', 'm1,m2,m3,m4,m5,m6,m7,m8', 'A Pompeia Auto Center é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Ar-Condicionado, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.5, -23.52900000, -46.68500000, 'SP', 'São Paulo', 'Vila Pompeia'),
(64, 'Vila Leopoldina Service', '/uploads/oficinas/64/principal.jpg', 'Rua Carlos Weber, 700 - Vila Leopoldina, São Paulo - SP', '(11) 94444-0008', 'vilaleopoldinaservice@gmail.com', 2, 'e2,e5', 'm4', 'A Vila Leopoldina Service é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Freios e Suspensão e Pneus e Alinhamento, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.4, -23.53100000, -46.72500000, 'SP', 'São Paulo', 'Vila Leopoldina'),
(65, 'Alto de Pinheiros Oficina', '/uploads/oficinas/65/principal.jpg', 'Av. Diógenes Ribeiro de Lima, 2000 - Pinheiros, São Paulo - SP', '(11) 94444-0009', 'altodepinheiros.oficina@outlook.com', 3, 'e1', 'm1,m2,m6,m7,m8', 'A Alto de Pinheiros Oficina é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.7, -23.54900000, -46.70500000, 'SP', 'São Paulo', 'Pinheiros'),
(66, 'Raposo Rodas', '/uploads/oficinas/66/principal.jpg', 'Rodovia Raposo Tavares, KM 15 - Butantã, São Paulo - SP', '(11) 94444-0010', 'raposorodas@hotmail.com', 4, 'e2,e5', 'm1,m2,m3,m4,m5,m8', 'A Raposo Rodas é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Freios e Suspensão e Pneus e Alinhamento, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.3, -23.58500000, -46.75500000, 'SP', 'São Paulo', 'Butantã'),
(67, 'Santana Express', '/uploads/oficinas/67/principal.jpg', 'Rua Voluntários da Pátria, 2000 - Santana, São Paulo - SP', '(11) 95555-0001', 'santanaexpress@gmail.com', 5, 'e1', 'm2,m4,m5,m6,m7', 'A Santana Express é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.6, -23.50100000, -46.63500000, 'SP', 'São Paulo', 'Santana'),
(68, 'Tucuruvi Motores', '/uploads/oficinas/68/principal.jpg', 'Av. Tucuruvi, 800 - Tucuruvi, São Paulo - SP', '(11) 95555-0002', 'tucuruvimotores@outlook.com', 6, 'e1,e7', 'm1,m3,m5,m7,m8', 'A Tucuruvi Motores é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Injeção eletrônica, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.4, -23.48100000, -46.60500000, 'SP', 'São Paulo', 'Tucuruvi'),
(69, 'Casa Verde Oficina', '/uploads/oficinas/69/principal.jpg', 'Av. Casa Verde, 1500 - Casa Verde, São Paulo - SP', '(11) 95555-0003', 'casaverdeoficina@hotmail.com', 1, 'e1,e5,e8', 'm1,m2,m3,m4,m5,m6,m7,m8', 'A Casa Verde Oficina é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, Pneus e Alinhamento e Pintura e Funilaria, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.5, -23.50500000, -46.66500000, 'SP', 'São Paulo', 'Casa Verde'),
(70, 'Vila Maria Diesel', '/uploads/oficinas/70/principal.jpg', 'Rua Curuçá, 600 - Vila Maria, São Paulo - SP', '(11) 95555-0004', 'vilamariadiesel@gmail.com', 2, 'e1', 'm4', 'A Vila Maria Diesel é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.7, -23.51500000, -46.58500000, 'SP', 'São Paulo', 'Vila Maria'),
(71, 'Mandaqui Auto Center', '/uploads/oficinas/71/principal.jpg', 'Av. Engenheiro Caetano Álvares, 3000 - Mandaqui, São Paulo - SP', '(11) 95555-0005', 'mandaquiautocenter@outlook.com', 3, 'e1,e2', 'm1,m2,m6,m7,m8', 'A Mandaqui Auto Center é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Freios e Suspensão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.3, -23.47500000, -46.64500000, 'SP', 'São Paulo', 'Mandaqui'),
(72, 'Limão Mecânica Especializada', '/uploads/oficinas/72/principal.jpg', 'Av. Dep. Emílio Carlos, 1000 - Limão, São Paulo - SP', '(11) 95555-0006', 'limao.mecanicaesp@gmail.com', 4, 'e1', 'm1,m2,m3,m4,m5,m8', 'A Limão Mecânica Especializada é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.1, -23.50500000, -46.68500000, 'SP', 'São Paulo', 'Limão'),
(73, 'Imirim Car Service', '/uploads/oficinas/73/principal.jpg', 'Av. Imirim, 2500 - Imirim, São Paulo - SP', '(11) 95555-0007', 'imirimcarservice@hotmail.com', 5, 'e3', 'm2,m4,m5,m6,m7', 'A Imirim Car Service é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Elétrica e Baterias, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.4, -23.48500000, -46.65500000, 'SP', 'São Paulo', 'Imirim'),
(74, 'Tremembé Garage', '/uploads/oficinas/74/principal.jpg', 'Av. Maria Amália Lopes de Azevedo, 500 - Tremembé, São Paulo - SP', '(11) 95555-0008', 'tremembegarage@outlook.com', 6, 'e1,e2', 'm1,m3,m5,m7,m8', 'A Tremembé Garage é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Freios e Suspensão, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.2, -23.45500000, -46.61500000, 'SP', 'São Paulo', 'Tremembé'),
(75, 'Freguesia do Ó Oficina', '/uploads/oficinas/75/principal.jpg', 'Av. Itaberaba, 1200 - Freguesia do Ó, São Paulo - SP', '(11) 95555-0009', 'freguesiadoo.oficina@gmail.com', 1, 'e1,e3', 'm1,m2,m3,m4,m5,m6,m7,m8', 'A Freguesia do Ó Oficina é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Motor e Transmissão e Elétrica e Baterias, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.5, -23.48900000, -46.69500000, 'SP', 'São Paulo', 'Freguesia do Ó'),
(76, 'Jaçanã Mecânica', '/uploads/oficinas/76/principal.jpg', 'Rua Benjamim Pereira, 300 - Jaçanã, São Paulo - SP', '(11) 95555-0010', 'jacanamecanica@hotmail.com', 2, 'e4,e6', 'm4', 'A Jaçanã Mecânica é referência em serviços automotivos de alta qualidade na região.\nContamos com uma equipa especializada em Ar-Condicionado e Troca de óleo, garantindo o melhor cuidado para o seu veículo.\nTrabalhamos com equipamentos modernos para oferecer diagnósticos precisos e soluções rápidas.\nVisite-nos e experimente um atendimento transparente e focado na sua segurança e satisfação.', 4.3, -23.45100000, -46.58500000, 'SP', 'São Paulo', 'Jaçanã'),
(89, 'Oficina do Isaac', '/uploads/oficinas/default-oficina.png', 'Rua Lagoa do Campelo, 66 - Itaquera, São Paulo - SP, Brasil', '11958677607', 'geuso002@gmail.com', 7, 'e1', 'm4', 'Testando a descrição', NULL, -23.54871750, -46.45624820, 'SP', 'São Paulo', 'Itaquera'),
(90, 'Oficina da Thamires', '/uploads/oficinas/default-oficina.png', 'Rua Lagoa do Campelo, 89 - Itaquera, São Paulo - SP, Brasil', '11958677607', 'geuso002@gmail.com', 7, 'e5,e6', 'm2,m5,m8', 'Uma bela descrição', NULL, -23.54871750, -46.45624820, 'SP', 'São Paulo', 'Itaquera');

-- --------------------------------------------------------

--
-- Estrutura para tabela `orcamentos`
--

CREATE TABLE `orcamentos` (
  `id_orcamento` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `servico_desejado` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `id_oficina` int(11) NOT NULL,
  `data_solicitacao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `orcamentos`
--

INSERT INTO `orcamentos` (`id_orcamento`, `nome`, `telefone`, `email`, `servico_desejado`, `descricao`, `id_oficina`, `data_solicitacao`) VALUES
(1, 'Geu', '11958677607', 'geuso002@gmail.com', 'e6', 'Testando formulário de orçamento', 27, '2026-05-19 00:15:22'),
(2, 'GEUSO PINHEIRO DA SILVA', '11958677607', 'geuso002@gmail.com', 'e3', 'hfhgvhgfg', 34, '2026-05-19 00:19:48');

-- --------------------------------------------------------

--
-- Estrutura para tabela `servicos`
--

CREATE TABLE `servicos` (
  `id_servico` int(11) NOT NULL,
  `nome_servico` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `preco_medio` decimal(10,2) DEFAULT NULL,
  `id_oficina` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `servicos`
--

INSERT INTO `servicos` (`id_servico`, `nome_servico`, `descricao`, `preco_medio`, `id_oficina`) VALUES
(3, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 1),
(4, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 1),
(5, 'Troca de óleo', 'Troca de óleo e filtros com produtos de qualidade.', 120.00, 1),
(6, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 2),
(7, 'Pneus e Alinhamento', 'Alinhamento, balanceamento e revisão de pneus.', 250.00, 2),
(8, 'Troca de óleo', 'Troca de óleo e filtros com produtos de qualidade.', 120.00, 2),
(9, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 3),
(10, 'Elétrica e Baterias', 'Diagnóstico elétrico e substituição de baterias.', 320.00, 3),
(11, 'Injeção eletrônica', 'Limpeza e reparo de sistemas de injeção eletrônica.', 480.00, 3),
(12, 'Ar-Condicionado', 'Carga de gás e manutenção de ar-condicionado automotivo.', 350.00, 4),
(13, 'Troca de óleo', 'Troca de óleo e filtros com produtos de qualidade.', 120.00, 4),
(14, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 5),
(15, 'Pneus e Alinhamento', 'Alinhamento, balanceamento e revisão de pneus.', 250.00, 5),
(16, 'Pintura e Funilaria', 'Serviços de pintura automotiva e reparos de funilaria.', 1500.00, 5),
(17, 'Elétrica e Baterias', 'Diagnóstico elétrico e substituição de baterias.', 320.00, 6),
(18, 'Ar-Condicionado', 'Carga de gás e manutenção de ar-condicionado automotivo.', 350.00, 6),
(19, 'Injeção eletrônica', 'Limpeza e reparo de sistemas de injeção eletrônica.', 480.00, 6),
(20, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 27),
(21, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 27),
(22, 'Troca de óleo', 'Troca de óleo e filtros com produtos de qualidade.', 120.00, 27),
(23, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 28),
(24, 'Pneus e Alinhamento', 'Alinhamento, balanceamento e revisão de pneus.', 250.00, 28),
(25, 'Troca de óleo', 'Troca de óleo e filtros com produtos de qualidade.', 120.00, 28),
(26, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 29),
(27, 'Injeção eletrônica', 'Limpeza e reparo de sistemas de injeção eletrônica.', 480.00, 29),
(28, 'Ar-Condicionado', 'Carga de gás e manutenção de ar-condicionado automotivo.', 350.00, 30),
(29, 'Troca de óleo', 'Troca de óleo e filtros com produtos de qualidade.', 120.00, 30),
(30, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 31),
(31, 'Pneus e Alinhamento', 'Alinhamento, balanceamento e revisão de pneus.', 250.00, 31),
(32, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 32),
(33, 'Pneus e Alinhamento', 'Alinhamento, balanceamento e revisão de pneus.', 250.00, 32),
(34, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 33),
(35, 'Elétrica e Baterias', 'Diagnóstico elétrico e substituição de baterias.', 320.00, 33),
(36, 'Injeção eletrônica', 'Limpeza e reparo de sistemas de injeção eletrônica.', 480.00, 33),
(37, 'Elétrica e Baterias', 'Diagnóstico elétrico e substituição de baterias.', 320.00, 34),
(38, 'Ar-Condicionado', 'Carga de gás e manutenção de ar-condicionado automotivo.', 350.00, 34),
(39, 'Injeção eletrônica', 'Limpeza e reparo de sistemas de injeção eletrônica.', 480.00, 34),
(40, 'Ar-Condicionado', 'Carga de gás e manutenção de ar-condicionado automotivo.', 350.00, 35),
(41, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 36),
(42, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 37),
(43, 'Elétrica e Baterias', 'Diagnóstico elétrico e substituição de baterias.', 320.00, 37),
(44, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 38),
(45, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 38),
(46, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 39),
(47, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 39),
(48, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 40),
(49, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 41),
(50, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 41),
(51, 'Troca de óleo', 'Troca de óleo e filtros com produtos de qualidade.', 120.00, 41),
(52, 'Ar-Condicionado', 'Carga de gás e manutenção de ar-condicionado automotivo.', 350.00, 42),
(53, 'Troca de óleo', 'Troca de óleo e filtros com produtos de qualidade.', 120.00, 42),
(54, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 43),
(55, 'Injeção eletrônica', 'Limpeza e reparo de sistemas de injeção eletrônica.', 480.00, 43),
(56, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 44),
(57, 'Elétrica e Baterias', 'Diagnóstico elétrico e substituição de baterias.', 320.00, 44),
(58, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 45),
(59, 'Injeção eletrônica', 'Limpeza e reparo de sistemas de injeção eletrônica.', 480.00, 45),
(60, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 46),
(61, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 47),
(62, 'Elétrica e Baterias', 'Diagnóstico elétrico e substituição de baterias.', 320.00, 47),
(63, 'Injeção eletrônica', 'Limpeza e reparo de sistemas de injeção eletrônica.', 480.00, 47),
(64, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 48),
(65, 'Pneus e Alinhamento', 'Alinhamento, balanceamento e revisão de pneus.', 250.00, 48),
(66, 'Pintura e Funilaria', 'Serviços de pintura automotiva e reparos de funilaria.', 1500.00, 48),
(67, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 49),
(68, 'Elétrica e Baterias', 'Diagnóstico elétrico e substituição de baterias.', 320.00, 49),
(69, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 50),
(70, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 50),
(71, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 51),
(72, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 52),
(73, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 53),
(74, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 54),
(75, 'Elétrica e Baterias', 'Diagnóstico elétrico e substituição de baterias.', 320.00, 55),
(76, 'Ar-Condicionado', 'Carga de gás e manutenção de ar-condicionado automotivo.', 350.00, 55),
(77, 'Injeção eletrônica', 'Limpeza e reparo de sistemas de injeção eletrônica.', 480.00, 55),
(78, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 56),
(79, 'Pneus e Alinhamento', 'Alinhamento, balanceamento e revisão de pneus.', 250.00, 56),
(80, 'Troca de óleo', 'Troca de óleo e filtros com produtos de qualidade.', 120.00, 56),
(81, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 57),
(82, 'Injeção eletrônica', 'Limpeza e reparo de sistemas de injeção eletrônica.', 480.00, 57),
(83, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 58),
(84, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 59),
(85, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 60),
(86, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 61),
(87, 'Ar-Condicionado', 'Carga de gás e manutenção de ar-condicionado automotivo.', 350.00, 62),
(88, 'Troca de óleo', 'Troca de óleo e filtros com produtos de qualidade.', 120.00, 62),
(89, 'Ar-Condicionado', 'Carga de gás e manutenção de ar-condicionado automotivo.', 350.00, 63),
(90, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 64),
(91, 'Pneus e Alinhamento', 'Alinhamento, balanceamento e revisão de pneus.', 250.00, 64),
(92, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 65),
(93, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 66),
(94, 'Pneus e Alinhamento', 'Alinhamento, balanceamento e revisão de pneus.', 250.00, 66),
(95, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 67),
(96, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 68),
(97, 'Injeção eletrônica', 'Limpeza e reparo de sistemas de injeção eletrônica.', 480.00, 68),
(98, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 69),
(99, 'Pneus e Alinhamento', 'Alinhamento, balanceamento e revisão de pneus.', 250.00, 69),
(100, 'Pintura e Funilaria', 'Serviços de pintura automotiva e reparos de funilaria.', 1500.00, 69),
(101, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 70),
(102, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 71),
(103, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 71),
(104, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 72),
(105, 'Elétrica e Baterias', 'Diagnóstico elétrico e substituição de baterias.', 320.00, 73),
(106, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 74),
(107, 'Freios e Suspensão', 'Revisão e troca de componentes de freios e suspensão.', 420.00, 74),
(108, 'Motor e Transmissão', 'Diagnóstico e manutenção completa de motor e transmissão.', 850.00, 75),
(109, 'Elétrica e Baterias', 'Diagnóstico elétrico e substituição de baterias.', 320.00, 75),
(110, 'Ar-Condicionado', 'Carga de gás e manutenção de ar-condicionado automotivo.', 350.00, 76),
(111, 'Troca de óleo', 'Troca de óleo e filtros com produtos de qualidade.', 120.00, 76),
(116, 'Motor e Transmissão', 'Serviço especializado de motor e transmissão', 149.99, 89),
(117, 'Pneus e Alinhamento', 'Serviço especializado de pneus e alinhamento', 100.00, 90),
(118, 'Troca de óleo', 'Serviço especializado de troca de óleo', 300.00, 90);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` enum('CLIENTE','MECANICO','ADMIN') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nome`, `telefone`, `email`, `senha`, `tipo`) VALUES
(1, 'João - Oficina São Jorge', '', 'saojorge@meumecanico.com', '$2b$10$m/u3csUgpz9QMnKECcVOQeSVDQRNmfpeNRsmg8.PXDlqbdyarO.MK', 'MECANICO'),
(2, 'Carlos - Speed Car', '', 'speedcar@meumecanico.com', 'hash123', 'MECANICO'),
(3, 'Zé - Mecânica do Zé', '', 'mecanicaze@meumecanico.com', 'hash123', 'MECANICO'),
(4, 'Box 4 Rodas', '', 'box4rodas@meumecanico.com', 'hash123', 'MECANICO'),
(5, 'Prime Motors', '', 'primemotors@meumecanico.com', 'hash123', 'MECANICO'),
(6, 'Garage Pro', '', 'garagepro@meumecanico.com', 'hash123', 'MECANICO'),
(8, 'Geu', '', 'geu@meumecanico.com', 'hash123', 'CLIENTE'),
(9, 'Thamires', '1112345678', 'thamires@email.com', '111111', 'CLIENTE'),
(10, 'Joao da Silva', '11 912345678', 'joao@meuemail.com', '$2b$10$B.JMsV8kn/b3dq5F7WF1Q.1j.7Cx/lq6/AVlYQi2f3CFEWTd1M79i', 'CLIENTE'),
(11, 'Geu', '11987654321', 'geu@email.com', '$2b$10$2LcPlKPalmd3A47isPH/I.UIofqTovP2NqiGY3tGHl.CUKDUv.PTe', 'MECANICO'),
(12, 'Isaac Andrade', '11958677607', 'isaac@gmail.com', '$2b$10$cQy4HruCH5o.y52xF6K4L.u9.HO6HgsuRNNhZ40CcFVEUkL6cntei', 'MECANICO'),
(29, 'Admin', '11999999999', 'admin@meumecanico.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN'),
(30, 'Cliente Teste', '11988888888', 'cliente@meumecanico.com', '$2b$10$m/u3csUgpz9QMnKECcVOQeSVDQRNmfpeNRsmg8.PXDlqbdyarO.MK', 'CLIENTE');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id_admin`);

--
-- Índices de tabela `avaliacoes`
--
ALTER TABLE `avaliacoes`
  ADD PRIMARY KEY (`id_avaliacao`),
  ADD KEY `fk_avaliacao_cliente` (`id_cliente`),
  ADD KEY `fk_avaliacao_oficina` (`id_oficina`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Índices de tabela `mecanicos`
--
ALTER TABLE `mecanicos`
  ADD PRIMARY KEY (`id_mecanico`),
  ADD KEY `fk_mecanico_usuario` (`id_usuario`);

--
-- Índices de tabela `oficinas`
--
ALTER TABLE `oficinas`
  ADD PRIMARY KEY (`id_oficina`),
  ADD KEY `fk_oficina_mecanico` (`id_mecanico`);

--
-- Índices de tabela `orcamentos`
--
ALTER TABLE `orcamentos`
  ADD PRIMARY KEY (`id_orcamento`);

--
-- Índices de tabela `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`id_servico`),
  ADD KEY `fk_servico_oficina` (`id_oficina`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `avaliacoes`
--
ALTER TABLE `avaliacoes`
  MODIFY `id_avaliacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `mecanicos`
--
ALTER TABLE `mecanicos`
  MODIFY `id_mecanico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `oficinas`
--
ALTER TABLE `oficinas`
  MODIFY `id_oficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de tabela `orcamentos`
--
ALTER TABLE `orcamentos`
  MODIFY `id_orcamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `servicos`
--
ALTER TABLE `servicos`
  MODIFY `id_servico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `administradores`
--
ALTER TABLE `administradores`
  ADD CONSTRAINT `fk_admin_usuario` FOREIGN KEY (`id_admin`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `avaliacoes`
--
ALTER TABLE `avaliacoes`
  ADD CONSTRAINT `fk_avaliacao_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_avaliacao_oficina` FOREIGN KEY (`id_oficina`) REFERENCES `oficinas` (`id_oficina`) ON DELETE CASCADE;

--
-- Restrições para tabelas `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `fk_cliente_usuario` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `mecanicos`
--
ALTER TABLE `mecanicos`
  ADD CONSTRAINT `fk_mecanico_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `oficinas`
--
ALTER TABLE `oficinas`
  ADD CONSTRAINT `fk_oficina_mecanico` FOREIGN KEY (`id_mecanico`) REFERENCES `mecanicos` (`id_mecanico`) ON DELETE CASCADE;

--
-- Restrições para tabelas `servicos`
--
ALTER TABLE `servicos`
  ADD CONSTRAINT `fk_servico_oficina` FOREIGN KEY (`id_oficina`) REFERENCES `oficinas` (`id_oficina`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
