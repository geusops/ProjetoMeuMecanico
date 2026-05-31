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

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [MySQL](https://www.mysql.com/) v8 ou superior (ou XAMPP com MySQL ativo)
- [Git](https://git-scm.com/)

---

### 1. Banco de dados + dados

#### Via GUI (SGBD de sua preferência)

Para a criação do usuário, siga as instruções no arquivo `Database/MySQL/create_user.sql`.
Para a criação do banco de dados, use o arquivo `Database/MySQL/meu_mecanico.sql` ou `Database/MySQL/Meu_Mecanico_dump.sql` para importar as estruturas e dados do banco.

#### Via linha de comando

Execute os dois arquivos abaixo no MySQL, **nessa ordem**:

```bash
mysql -u root -p < Database/MySQL/create_user.sql
mysql -u root -p < Database/MySQL/meu_mecanico.sql
```

Isso cria o usuário `db_admin` (senha `pass123`) e importa as estruturas e dados do banco `meu_mecanico`.

---

### 2. Backend

Abra um terminal e execute:

```bash
cd Backend
npm install
npm run dev
```

O servidor rodará em **http://localhost:3000**.

> O arquivo `Backend/.env` já vem configurado no repositório com a chave JWT necessária. Não é preciso criá-lo manualmente.

---

### 3. Frontend

**Sem fechar o terminal do Backend**, abra um **novo terminal** e execute:

```bash
cd Front
npm install
npm run dev
```

A aplicação abrirá em **http://localhost:5173**.

---

### 4. Criar um usuário Admin

Para ter acesso ao Painel de administração (Clicar no nome do usuário > Acessar Painel Administrativo), o usuário precisa ser configurado como administrador.

1. Crie uma conta normalmente pela interface do site
2. No SGBD de sua preferência, execute:

```sql
USE meu_mecanico;
SELECT * FROM usuarios;
```

3. Localize o ID do usuário criado e execute:

```sql
UPDATE usuarios SET tipo = 'admin' WHERE id_usuario = <id_do_seu_usuario>;
```

---

## 📁 Estrutura de Pastas

```
ProjetoMeuMecanico/
├── Backend/    → API REST, rotas e lógica do servidor
├── Front/      → Interface React
├── Database/   → Scripts SQL e dump do banco
└── README.md
```

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