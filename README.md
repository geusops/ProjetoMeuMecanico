# Meu Mecânico

**Plataforma de conexão entre motoristas e oficinas mecânicas confiáveis.**

Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC) do Técnico em Desenvolvimento de Sistemas - EaD.

---

## 📋 Sobre o Projeto

O **Meu Mecânico** é uma plataforma web full-stack que permite aos motoristas encontrarem oficinas próximas, visualizarem avaliações reais e agendarem serviços, enquanto as oficinas podem se cadastrar, receber avaliações e gerenciar seu perfil.

### Tecnologias Utilizadas

- **Frontend**: React + Vite + React Router + Leaflet (Mapas)
- **Backend**: Node.js + Express
- **Banco de Dados**: MySQL (MariaDB)
- **Autenticação**: JWT + bcrypt
- **Outros**: Axios, Lucide React (ícones), Tailwind CSS

---

## 🚀 Como Rodar o Projeto

### 1. Pré-requisitos

- Instale o **XAMPP** (ou outro servidor local com MySQL)
- Instale o **Node.js** (versão 18 ou superior)
- Instale o **Git**

### 2. Configurar o Banco de Dados

1. Abra o **XAMPP** e inicie o **Apache** e o **MySQL**
2. Acesse o **phpMyAdmin** (`http://localhost/phpmyadmin`)
3. Crie um banco chamado **`meu_mecanico`**
4. Importe o arquivo:  
   `Database/MySQL/meu_mecanico_full_dump.sql`

### 3. Rodar o Backend

```Bash
cd Backend
npm install
npm run dev

O backend deve rodar em: http://localhost:3000
```

### 4. Rodar o Backend

```Bash
cd Front
npm install --legacy-peer-deps
npm run dev

O frontend deve abrir em: http://localhost:5173
```

#### 📁 Estrutura de Pastas

```Bash (desing)
textProjetoMeuMecanico/
├── Backend/  → API, rotas e lógica do servidor
├── Front/    → Interface
├── Database/ → Scripts SQL e dumps do banco
└── README.md
```

#### 🔑 Usuários de Teste

```Bash (desing)
Tipo    Email                    Senha 
Admin   admin@meumecanico.com    password
Cliente cliente@meumecanico.com  123456
Oficina saojorge@meumecanico.com 123456
```

#### Funcionalidades Desenvolvidas

```Bash (desing)
1.Cadastro e Login (com JWT)
2.Mapa interativo com geolocalização
3.Cadastro de Oficinas
4.Sistema de Avaliações
5.Painel Administrativo
6.Busca por proximidade
7.Filtros avançados
```

#### Equipe

```Bash (desing)
- Geuso Pinheiro da Silva
- Khenny Cristian Gonzales Jaldin
- José Ryan Silva Nery
```

#### Orientadora: Profª. Tatiana Carla de Mattos Valério Monteiro

```Bash (desing)
Desenvolvido em 2026
São Paulo - SP

Qualquer dúvida, entre em contato com a equipe.
```

##### 📝 Sobre este README

Este arquivo README foi elaborado com base no artigo:
RAUL LEITE. GitHub: como fazer um README.md bonitão. Medium, 2023. Disponível em: https://raullesteves.medium.com/github-como-fazer-um-readme-md-bonitão-c85c8f154f8. Acesso em: maio 2026.