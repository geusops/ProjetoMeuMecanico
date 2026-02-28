CREATE DATABASE meu_mecanico;
USE meu_mecanico;

-- =========================
-- TABELA USUARIOS
-- =========================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('CLIENTE', 'MECANICO', 'ADMIN') NOT NULL //definir tipo do usuario
);

-- =========================
-- TABELA CLIENTES
-- =========================
CREATE TABLE clientes (
    id_cliente INT PRIMARY KEY,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    CONSTRAINT fk_cliente_usuario
        FOREIGN KEY (id_cliente)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE //quando um usuario for deletado, o cliente correspondente também será deletado
);

-- =========================
-- TABELA MECANICOS
-- =========================
CREATE TABLE mecanicos (
    id_mecanico INT PRIMARY KEY,
    especialidades VARCHAR(255),
    telefone VARCHAR(20),
    CONSTRAINT fk_mecanico_usuario
        FOREIGN KEY (id_mecanico)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE //quando um usuario for deletado, o mecanico correspondente também será deletado
);

-- =========================
-- TABELA ADMINISTRADORES
-- =========================
CREATE TABLE administradores (
    id_admin INT PRIMARY KEY,
    CONSTRAINT fk_admin_usuario
        FOREIGN KEY (id_admin)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE //quando um usuario for deletado, o administrador correspondente também será deletado
);

-- =========================
-- TABELA OFICINAS
-- =========================
CREATE TABLE oficinas (
    id_oficina INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    id_mecanico INT NOT NULL,
    CONSTRAINT fk_oficina_mecanico
        FOREIGN KEY (id_mecanico)
        REFERENCES mecanicos(id_mecanico)
        ON DELETE CASCADE //quando um mecanico for deletado, a oficina correspondente também será deletada
);

-- =========================
-- TABELA SERVICOS
-- =========================
CREATE TABLE servicos (
    id_servico INT AUTO_INCREMENT PRIMARY KEY,
    nome_servico VARCHAR(100) NOT NULL,
    descricao TEXT, //optamos por text para permitir descrições mais detalhadas dos serviços
    preco_medio DECIMAL(10,2),
    id_oficina INT NOT NULL,
    CONSTRAINT fk_servico_oficina
        FOREIGN KEY (id_oficina)
        REFERENCES oficinas(id_oficina)
        ON DELETE CASCADE //quando uma oficina for deletada, os serviços correspondentes também serão deletados
);

-- =========================
-- TABELA AVALIACOES
-- =========================
CREATE TABLE avaliacoes (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_oficina INT NOT NULL,
    nota INT CHECK (nota BETWEEN 1 AND 5),
    comentario TEXT, //optamos por text para permitir comentários mais detalhados dos clientes
    data DATE,
    CONSTRAINT fk_avaliacao_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
        ON DELETE CASCADE, //quando um cliente for deletado, as avaliações correspondentes também serão deletadas
    CONSTRAINT fk_avaliacao_oficina
        FOREIGN KEY (id_oficina)
        REFERENCES oficinas(id_oficina)
        ON DELETE CASCADE //quando uma oficina for deletada, as avaliações correspondentes também serão deletadas
);
