# 🔧 Meu Mecânico

**Plataforma de conexão entre motoristas e oficinas mecânicas confiáveis.**

Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC) do Técnico em Desenvolvimento de Sistemas - EaD.

---

## Sobre o Projeto

O **Meu Mecânico** é uma plataforma web full-stack que permite aos motoristas encontrarem oficinas próximas, visualizarem avaliações reais e agendarem serviços, enquanto as oficinas podem se cadastrar, receber avaliações e gerenciar seu perfil.

### Tecnologias Utilizadas

| Camada | Tecnologias |
|--------|------------|
| Frontend | React + Vite + React Router + Tailwind CSS + Leaflet |
| Backend | Node.js + Express |
| Banco de Dados | MySQL (MariaDB via XAMPP) |
| Autenticação | JWT + bcrypt |
| Outros | Axios, Lucide React, OpenStreetMap, ViaCEP |

---

## Como Rodar o Projeto

### 1. Pré-requisitos

- [XAMPP](https://www.apachefriends.org/) com MySQL ativo
- [Node.js](https://nodejs.org/) versão 18 ou superior
- [Git](https://git-scm.com/)

### 2. Configurar o Banco de Dados

1. Abra o **XAMPP** e inicie o **MySQL**
2. Acesse o **phpMyAdmin** em `http://localhost/phpmyadmin`
3. Crie um banco chamado `meu_mecanico`
4. Clique em **Importar** e selecione o arquivo:

5. Execute o script de usuário:

### 3. Rodar o Backend

```bash
cd Backend
npm install
npm run dev
```
> Backend disponível em: `http://localhost:3000`

### 4. Rodar o Frontend

```bash
cd Front
npm install --legacy-peer-deps
npm run dev
```
> Frontend disponível em: `http://localhost:5173`

---

## 📁 Estrutura de Pastas
ProjetoMeuMecanico/
├── Backend/    → API REST, rotas e lógica do servidor
├── Front/      → Interface React
├── Database/   → Scripts SQL e dump do banco
└── README.md

---

## 🔑 Usuários de Teste

| Tipo | Email | Senha |
|------|-------|-------|
| Admin | admin@meumecanico.com | password |
| Cliente | cliente@meumecanico.com | hash123 |
| Mecânico | saojorge@meumecanico.com | hash123 |

---

## Funcionalidades Implementadas

- 🔐 Cadastro e Login com autenticação JWT
- 🗺️ Mapa interativo com geolocalização (Leaflet + OpenStreetMap)
- 🏪 Cadastro de Oficinas com coordenadas automáticas via CEP
- ⭐ Sistema de Avaliações vinculado ao login
- 🛡️ Painel Administrativo (gerenciar oficinas e usuários)
- 📍 Busca por proximidade com ST_Distance_Sphere
- 🔍 Filtros avançados por nome, especialidade e avaliação

---

## 👥 Equipe

- **Geuso Pinheiro da Silva** — Desenvolvimento principal e estrutura do sistema
- **Khenny Cristian Gonzales Jaldin** — Desenvolvimento, autenticação, avaliações e documentação
- **José Ryan Silva Nery** — Testes, diagramas UML e documentação

**Orientadora:** Profª. Tatiana Carla de Mattos Valério Monteiro

---

*Desenvolvido em 2026 — São Paulo, SP*