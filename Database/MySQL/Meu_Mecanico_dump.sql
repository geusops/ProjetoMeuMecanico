-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14/05/2026 às 04:48
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

--
-- Despejando dados para a tabela `avaliacoes`
--

INSERT INTO `avaliacoes` (`id_avaliacao`, `id_cliente`, `id_oficina`, `nota`, `comentario`, `data`) VALUES
(1, 7, 1, 5, 'Excelente atendimento', '2026-03-03'),
(2, 7, 2, 4, 'Bom serviço', '2026-03-03'),
(3, 7, 3, 5, 'Muito profissional', '2026-03-03'),
(4, 7, 4, 4, 'Serviço rápido', '2026-03-03'),
(5, 7, 5, 5, 'Oficina premium de alto nível', '2026-03-03'),
(6, 7, 6, 4, 'Diagnóstico preciso', '2026-03-03');

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
(7, '(11) 98888-7777', 'São Paulo - SP');

-- --------------------------------------------------------

--
-- Estrutura para tabela `mecanicos`
--

CREATE TABLE `mecanicos` (
  `id_mecanico` int(11) NOT NULL,
  `especialidades` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `mecanicos`
--

INSERT INTO `mecanicos` (`id_mecanico`, `especialidades`, `telefone`) VALUES
(1, 'Mecânica geral', '(11) 90000-0001'),
(2, 'Suspensão e freios', '(11) 90000-0002'),
(3, 'Motor e câmbio', '(11) 90000-0003'),
(4, 'Troca de óleo', '(11) 90000-0004'),
(5, 'Carros premium', '(11) 90000-0005'),
(6, 'Diagnóstico eletrônico', '(11) 90000-0006');

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
  `email` varchar(100) DEFAULT NULL,
  `id_mecanico` int(11) NOT NULL,
  `especialidade` varchar(100) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `avaliacao` decimal(2,1) DEFAULT NULL,
  `latitude_oficina` decimal(10,8) DEFAULT NULL,
  `longitude_oficina` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `oficinas`
--

INSERT INTO `oficinas` (`id_oficina`, `nome`, `foto_path`, `endereco`, `telefone`, `email`, `id_mecanico`, `especialidade`, `descricao`, `avaliacao`, `latitude_oficina`, `longitude_oficina`) VALUES
(1, 'Oficina São Jorge', '/uploads/oficinas/1/principal.jpg', 'Av. Paulista, 1200 - Bela Vista, São Paulo - SP', '(11) 90000-0001', NULL, 1, 'Mecânica geral', NULL, 4.7, -23.56141400, -46.65588100),
(2, 'Auto Center Speed Car', '/uploads/oficinas/2/principal.jpg', 'Rua Tuiuti, 850 - Tatuapé, São Paulo - SP', '(11) 90000-0002', NULL, 2, 'Suspensão e freios', NULL, 4.3, -23.54228100, -46.57245600),
(3, 'Mecânica do Zé', '/uploads/oficinas/3/principal.jpg', 'Av. Itaquera, 2300 - Itaquera, São Paulo - SP', '(11) 90000-0003', NULL, 3, 'Motor e câmbio', NULL, 4.8, -23.55393500, -46.49132500),
(4, 'Box 4 Rodas', '/uploads/oficinas/4/principal.jpg', 'Rua das Oficinas, 45 - Mooca, São Paulo - SP', '(11) 90000-0004', NULL, 4, 'Troca de óleo', NULL, 4.1, -23.55523400, -46.60412300),
(5, 'Prime Motors', '/uploads/oficinas/5/principal.jpg', 'Av. Interlagos, 4100 - Interlagos, São Paulo - SP', '(11) 90000-0005', NULL, 5, 'Carros premium', NULL, 4.9, -23.68285500, -46.69123400),
(6, 'Garage Pro', '/uploads/oficinas/6/principal.jpg', 'Rua dos Trilhos, 300 - Brás, São Paulo - SP', '(11) 90000-0006', NULL, 6, 'Diagnóstico eletrônico', NULL, 4.4, -23.54923400, -46.60123400),
(27, 'Centro Automotivo Sé', '/uploads/oficinas/27/principal.jpg', 'Praça da Sé, 100 - Sé, São Paulo - SP', '(11) 91111-0001', NULL, 1, 'Mecânica Geral', NULL, 4.5, -23.55050000, -46.63330000),
(28, 'Mecânica Bela Vista', '/uploads/oficinas/28/principal.jpg', 'Rua Treze de Maio, 500 - Bela Vista, São Paulo - SP', '(11) 91111-0002', NULL, 2, 'Freios e Suspensão', NULL, 4.8, -23.55820000, -46.64320000),
(29, 'Speed República', '/uploads/oficinas/29/principal.jpg', 'Av. Ipiranga, 200 - República, São Paulo - SP', '(11) 91111-0003', NULL, 3, 'Injeção Eletrônica', NULL, 4.2, -23.54350000, -46.64150000),
(30, 'Garagem Liberdade', '/uploads/oficinas/30/principal.jpg', 'Rua Galvão Bueno, 300 - Liberdade, São Paulo - SP', '(11) 91111-0004', NULL, 4, 'Troca de Óleo', NULL, 4.6, -23.55520000, -46.63510000),
(31, 'Oficina do Glicério', '/uploads/oficinas/31/principal.jpg', 'Rua do Glicério, 450 - Liberdade, São Paulo - SP', '(11) 91111-0005', NULL, 5, 'Pneus e Rodas', NULL, 4.1, -23.55700000, -46.63000000),
(32, 'Stop Car Consolação', '/uploads/oficinas/32/principal.jpg', 'Rua da Consolação, 800 - Centro, São Paulo - SP', '(11) 91111-0006', NULL, 6, 'Alinhamento', NULL, 4.7, -23.54800000, -46.64800000),
(33, 'Mecânica Santa Cecília', '/uploads/oficinas/33/principal.jpg', 'Rua Canuto do Val, 120 - Santa Cecília, São Paulo - SP', '(11) 91111-0007', NULL, 1, 'Motor e Câmbio', NULL, 4.9, -23.54100000, -46.65100000),
(34, 'Flash Centro', '/uploads/oficinas/34/principal.jpg', 'Av. São João, 1500 - Centro, São Paulo - SP', '(11) 91111-0008', NULL, 2, 'Elétrica Automotiva', NULL, 4.3, -23.53800000, -46.64200000),
(35, 'Master Oficinas', '/uploads/oficinas/35/principal.jpg', 'Rua Augusta, 300 - Centro, São Paulo - SP', '(11) 91111-0009', NULL, 3, 'Ar Condicionado', NULL, 4.4, -23.54900000, -46.64950000),
(36, 'Prime Car Centro', '/uploads/oficinas/36/principal.jpg', 'Rua Maria Paula, 60 - Bela Vista, São Paulo - SP', '(11) 91111-0010', NULL, 4, 'Revisão Preventiva', NULL, 4.8, -23.55200000, -46.63800000),
(37, 'Interlagos Motorsport', '/uploads/oficinas/37/principal.jpg', 'Av. Interlagos, 2000 - Campo Grande, São Paulo - SP', '(11) 92222-0001', NULL, 5, 'Performance e Motor', NULL, 4.9, -23.67400000, -46.69100000),
(38, 'Mecânica Sto Amaro', '/uploads/oficinas/38/principal.jpg', 'Rua Verbo Divino, 100 - Santo Amaro, São Paulo - SP', '(11) 92222-0002', NULL, 6, 'Suspensão', NULL, 4.6, -23.63500000, -46.70500000),
(39, 'Vila Mariana Auto Service', '/uploads/oficinas/39/principal.jpg', 'Rua Domingos de Morais, 1500 - Vila Mariana, São Paulo - SP', '(11) 92222-0003', NULL, 1, 'Freios ABS', NULL, 4.7, -23.58900000, -46.63400000),
(40, 'Moema Car Care', '/uploads/oficinas/40/principal.jpg', 'Av. Ibirapuera, 2500 - Moema, São Paulo - SP', '(11) 92222-0004', NULL, 2, 'Importados', NULL, 4.8, -23.60200000, -46.66200000),
(41, 'Jabaquara Oficina', '/uploads/oficinas/41/principal.jpg', 'Rua das Perobas, 50 - Jabaquara, São Paulo - SP', '(11) 92222-0005', NULL, 3, 'Mecânica Geral', NULL, 4.4, -23.64500000, -46.64100000),
(42, 'Brooklin Service', '/uploads/oficinas/42/principal.jpg', 'Av. Santo Amaro, 4500 - Brooklin, São Paulo - SP', '(11) 92222-0006', NULL, 4, 'Troca de Óleo', NULL, 4.5, -23.62100000, -46.68500000),
(43, 'Morumbi Garage', '/uploads/oficinas/43/principal.jpg', 'Av. Giovanni Gronchi, 3000 - Morumbi, São Paulo - SP', '(11) 92222-0007', NULL, 5, 'Diagnóstico Digital', NULL, 4.7, -23.61500000, -46.72800000),
(44, 'Ipiranga Motores', '/uploads/oficinas/44/principal.jpg', 'Rua Bom Pastor, 2000 - Ipiranga, São Paulo - SP', '(11) 92222-0008', NULL, 6, 'Câmbio Automático', NULL, 4.6, -23.59100000, -46.61100000),
(45, 'Saúde Auto Center', '/uploads/oficinas/45/principal.jpg', 'Av. Jabaquara, 1800 - Saúde, São Paulo - SP', '(11) 92222-0009', NULL, 1, 'Injeção Eletrônica', NULL, 4.3, -23.61800000, -46.63900000),
(46, 'Capão Redondo Mecânica', '/uploads/oficinas/46/principal.jpg', 'Estrada de Itapecerica, 3000 - Capão Redondo, São Paulo - SP', '(11) 92222-0010', NULL, 2, 'Geral e Popular', NULL, 4.2, -23.66100000, -46.76500000),
(47, 'Tatuapé Turbos', '/uploads/oficinas/47/principal.jpg', 'Rua Tuiuti, 2000 - Tatuapé, São Paulo - SP', '(11) 93333-0001', NULL, 3, 'Turbinas e Motor', NULL, 4.8, -23.54100000, -46.57100000),
(48, 'Mooca Garage 1950', '/uploads/oficinas/48/principal.jpg', 'Rua Javari, 400 - Mooca, São Paulo - SP', '(11) 93333-0002', NULL, 4, 'Restauração', NULL, 4.9, -23.55500000, -46.60200000),
(49, 'Itaquera Auto Tech', '/uploads/oficinas/49/principal.jpg', 'Av. Jacu-Pêssego, 1500 - Itaquera, São Paulo - SP', '(11) 93333-0003', NULL, 5, 'Câmbio', NULL, 4.5, -23.54100000, -46.46800000),
(50, 'Carrão Freios', '/uploads/oficinas/50/principal.jpg', 'Av. Conselheiro Carrão, 2500 - Carrão, São Paulo - SP', '(11) 93333-0004', NULL, 6, 'Suspensão e Freio', NULL, 4.4, -23.55900000, -46.54900000),
(51, 'Anália Franco Premium', '/uploads/oficinas/51/principal.jpg', 'Rua Emília Marengo, 800 - Tatuapé, São Paulo - SP', '(11) 93333-0005', NULL, 1, 'Carros de Luxo', NULL, 4.9, -23.55100000, -46.56500000),
(52, 'Penha Centro Automotivo', '/uploads/oficinas/52/principal.jpg', 'Av. Amador Bueno da Veiga, 1000 - Penha, São Paulo - SP', '(11) 93333-0006', NULL, 2, 'Mecânica Geral', NULL, 4.3, -23.52100000, -46.53500000),
(53, 'Belenzinho Reparos', '/uploads/oficinas/53/principal.jpg', 'Rua Belém, 300 - Belenzinho, São Paulo - SP', '(11) 93333-0007', NULL, 3, 'Escapamentos', NULL, 4.1, -23.53900000, -46.59500000),
(54, 'São Miguel Diesel', '/uploads/oficinas/54/principal.jpg', 'Av. Marechal Tito, 2000 - São Miguel, São Paulo - SP', '(11) 93333-0008', NULL, 4, 'Motores Diesel', NULL, 4.6, -23.49100000, -46.44500000),
(55, 'Vila Matilde Elétrica', '/uploads/oficinas/55/principal.jpg', 'Rua Waldemar Carlos Pereira, 500 - Vila Matilde, São Paulo - SP', '(11) 93333-0009', NULL, 5, 'Baterias e Elétrica', NULL, 4.2, -23.53500000, -46.51900000),
(56, 'Sapopemba Mecânica', '/uploads/oficinas/56/principal.jpg', 'Av. Sapopemba, 8000 - Sapopemba, São Paulo - SP', '(11) 93333-0010', NULL, 6, 'Pneus e Suspensão', NULL, 4.0, -23.60500000, -46.49500000),
(57, 'Pinheiros High-Tech', '/uploads/oficinas/57/principal.jpg', 'Rua dos Pinheiros, 1200 - Pinheiros, São Paulo - SP', '(11) 94444-0001', NULL, 1, 'Diagnóstico Computadorizado', NULL, 4.8, -23.56100000, -46.68500000),
(58, 'Lapa Tradicional', '/uploads/oficinas/58/principal.jpg', 'Rua Doze de Outubro, 500 - Lapa, São Paulo - SP', '(11) 94444-0002', NULL, 2, 'Mecânica Geral', NULL, 4.5, -23.52100000, -46.70500000),
(59, 'Perdizes Performance', '/uploads/oficinas/59/principal.jpg', 'Rua Cardoso de Almeida, 1000 - Perdizes, São Paulo - SP', '(11) 94444-0003', NULL, 3, 'Revisão 10k', NULL, 4.7, -23.53500000, -46.67500000),
(60, 'Butantã Eco Auto', '/uploads/oficinas/60/principal.jpg', 'Av. Vital Brasil, 800 - Butantã, São Paulo - SP', '(11) 94444-0004', NULL, 4, 'Híbridos e Elétricos', NULL, 4.9, -23.57100000, -46.71100000),
(61, 'Vila Madalena Garage', '/uploads/oficinas/61/principal.jpg', 'Rua Harmonia, 300 - Vila Madalena, São Paulo - SP', '(11) 94444-0005', NULL, 5, 'Customização', NULL, 4.6, -23.55500000, -46.69100000),
(62, 'Jaguaré Mecânica', '/uploads/oficinas/62/principal.jpg', 'Av. Corifeu de Azevedo Marques, 3000 - Jaguaré, São Paulo - SP', '(11) 94444-0006', NULL, 6, 'Troca de Óleo', NULL, 4.2, -23.54500000, -46.74500000),
(63, 'Pompeia Auto Center', '/uploads/oficinas/63/principal.jpg', 'Av. Pompeia, 1500 - Vila Pompeia, São Paulo - SP', '(11) 94444-0007', NULL, 1, 'Ar Condicionado', NULL, 4.5, -23.52900000, -46.68500000),
(64, 'Vila Leopoldina Service', '/uploads/oficinas/64/principal.jpg', 'Rua Carlos Weber, 700 - Vila Leopoldina, São Paulo - SP', '(11) 94444-0008', NULL, 2, 'Suspensão', NULL, 4.4, -23.53100000, -46.72500000),
(65, 'Alto de Pinheiros Oficina', '/uploads/oficinas/65/principal.jpg', 'Av. Diógenes Ribeiro de Lima, 2000 - Pinheiros, São Paulo - SP', '(11) 94444-0009', NULL, 3, 'Mecânica Geral', NULL, 4.7, -23.54900000, -46.70500000),
(66, 'Raposo Rodas', '/uploads/oficinas/66/principal.jpg', 'Rodovia Raposo Tavares, KM 15 - Butantã, São Paulo - SP', '(11) 94444-0010', NULL, 4, 'Alinhamento 3D', NULL, 4.3, -23.58500000, -46.75500000),
(67, 'Santana Express', '/uploads/oficinas/67/principal.jpg', 'Rua Voluntários da Pátria, 2000 - Santana, São Paulo - SP', '(11) 95555-0001', NULL, 5, 'Revisão Rápida', NULL, 4.6, -23.50100000, -46.63500000),
(68, 'Tucuruvi Motores', '/uploads/oficinas/68/principal.jpg', 'Av. Tucuruvi, 800 - Tucuruvi, São Paulo - SP', '(11) 95555-0002', NULL, 6, 'Motor e Injeção', NULL, 4.4, -23.48100000, -46.60500000),
(69, 'Casa Verde Oficina', '/uploads/oficinas/69/principal.jpg', 'Av. Casa Verde, 1500 - Casa Verde, São Paulo - SP', '(11) 95555-0003', NULL, 1, 'Lataria e Pintura', NULL, 4.5, -23.50500000, -46.66500000),
(70, 'Vila Maria Diesel', '/uploads/oficinas/70/principal.jpg', 'Rua Curuçá, 600 - Vila Maria, São Paulo - SP', '(11) 95555-0004', NULL, 2, 'Caminhonetes e Diesel', NULL, 4.7, -23.51500000, -46.58500000),
(71, 'Mandaqui Auto Center', '/uploads/oficinas/71/principal.jpg', 'Av. Engenheiro Caetano Álvares, 3000 - Mandaqui, São Paulo - SP', '(11) 95555-0005', NULL, 3, 'Suspensão', NULL, 4.3, -23.47500000, -46.64500000),
(72, 'Limão Mecânica Especializada', '/uploads/oficinas/72/principal.jpg', 'Av. Dep. Emílio Carlos, 1000 - Limão, São Paulo - SP', '(11) 95555-0006', NULL, 4, 'Mecânica Geral', NULL, 4.1, -23.50500000, -46.68500000),
(73, 'Imirim Car Service', '/uploads/oficinas/73/principal.jpg', 'Av. Imirim, 2500 - Imirim, São Paulo - SP', '(11) 95555-0007', NULL, 5, 'Elétrica', NULL, 4.4, -23.48500000, -46.65500000),
(74, 'Tremembé Garage', '/uploads/oficinas/74/principal.jpg', 'Av. Maria Amália Lopes de Azevedo, 500 - Tremembé, São Paulo - SP', '(11) 95555-0008', NULL, 6, 'Freios', NULL, 4.2, -23.45500000, -46.61500000),
(75, 'Freguesia do Ó Oficina', '/uploads/oficinas/75/principal.jpg', 'Av. Itaberaba, 1200 - Freguesia do Ó, São Paulo - SP', '(11) 95555-0009', NULL, 1, 'Motor', NULL, 4.5, -23.48900000, -46.69500000),
(76, 'Jaçanã Mecânica', '/uploads/oficinas/76/principal.jpg', 'Rua Benjamim Pereira, 300 - Jaçanã, São Paulo - SP', '(11) 95555-0010', NULL, 2, 'Troca de Óleo e Filtros', NULL, 4.3, -23.45100000, -46.58500000);

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
(1, 'João - Oficina São Jorge', '', 'saojorge@meumecanico.com', 'hash123', 'MECANICO'),
(2, 'Carlos - Speed Car', '', 'speedcar@meumecanico.com', 'hash123', 'MECANICO'),
(3, 'Zé - Mecânica do Zé', '', 'mecanicaze@meumecanico.com', 'hash123', 'MECANICO'),
(4, 'Box 4 Rodas', '', 'box4rodas@meumecanico.com', 'hash123', 'MECANICO'),
(5, 'Prime Motors', '', 'primemotors@meumecanico.com', 'hash123', 'MECANICO'),
(6, 'Garage Pro', '', 'garagepro@meumecanico.com', 'hash123', 'MECANICO'),
(7, 'Cliente Seed', '', 'cliente@meumecanico.com', 'hash123', 'CLIENTE'),
(8, 'Geu', '', 'geu@meumecanico.com', 'hash123', 'CLIENTE'),
(9, 'Thamires', '1112345678', 'thamires@email.com', '111111', 'CLIENTE'),
(12, 'Admin', '11999999999', 'admin@meumecanico.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN');

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
  ADD PRIMARY KEY (`id_mecanico`);

--
-- Índices de tabela `oficinas`
--
ALTER TABLE `oficinas`
  ADD PRIMARY KEY (`id_oficina`),
  ADD KEY `fk_oficina_mecanico` (`id_mecanico`);

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
  MODIFY `id_avaliacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `oficinas`
--
ALTER TABLE `oficinas`
  MODIFY `id_oficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT de tabela `servicos`
--
ALTER TABLE `servicos`
  MODIFY `id_servico` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
  ADD CONSTRAINT `fk_mecanico_usuario` FOREIGN KEY (`id_mecanico`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

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
