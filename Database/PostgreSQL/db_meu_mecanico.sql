CREATE DATABASE meu_mecanico;

\c meu_mecanico;

-- =========================
-- TIPO ENUM PARA USUÁRIOS
-- =========================
CREATE TYPE tipo_usuario AS ENUM ('CLIENTE', 'MECANICO', 'ADMIN');

-- =========================
-- TABELA USUARIOS
-- =========================
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo tipo_usuario NOT NULL
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
        ON DELETE CASCADE
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
        ON DELETE CASCADE
);

-- =========================
-- TABELA ADMINISTRADORES
-- =========================
CREATE TABLE administradores (
    id_admin INT PRIMARY KEY,
    CONSTRAINT fk_admin_usuario
        FOREIGN KEY (id_admin)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);

-- =========================
-- TABELA OFICINAS
-- =========================
CREATE TABLE oficinas (
    id_oficina SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    id_mecanico INT NOT NULL,
    CONSTRAINT fk_oficina_mecanico
        FOREIGN KEY (id_mecanico)
        REFERENCES mecanicos(id_mecanico)
        ON DELETE CASCADE
);

-- =========================
-- TABELA SERVICOS
-- =========================
CREATE TABLE servicos (
    id_servico SERIAL PRIMARY KEY,
    nome_servico VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco_medio NUMERIC(10,2),
    id_oficina INT NOT NULL,
    CONSTRAINT fk_servico_oficina
        FOREIGN KEY (id_oficina)
        REFERENCES oficinas(id_oficina)
        ON DELETE CASCADE
);

-- =========================
-- TABELA AVALIACOES
-- =========================
CREATE TABLE avaliacoes (
    id_avaliacao SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_oficina INT NOT NULL,
    nota INT CHECK (nota BETWEEN 1 AND 5),
    comentario TEXT,
    data DATE,
    CONSTRAINT fk_avaliacao_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
        ON DELETE CASCADE,
    CONSTRAINT fk_avaliacao_oficina
        FOREIGN KEY (id_oficina)
        REFERENCES oficinas(id_oficina)
        ON DELETE CASCADE
);
