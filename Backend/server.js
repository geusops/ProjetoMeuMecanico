//modificado por Khenny

import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//usado pra ter a capacidade de receber objetos json
app.use(express.json());

console.log("🔄 Iniciando servidor...");
//usando o chatgpt para descobrir como export o diretorio uploads para que o react consiga renderizar a imagem.
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

//
// Banco de dados
//
//
//referencia https://www.w3schools.com/nodejs/nodejs_mysql.asp

//configuração para conexao no banco de dados
let con = mysql.createConnection({
  host: "localhost",
  user: "db_admin",
  password: "pass123",
  database: "meu_mecanico",
});

// //testando conexcao
// con.connect(function (err) {
//   if (err) {
//     console.error("❌ ERRO AO CONECTAR NO BANCO:", err.message);
//     console.log("💡 Dicas:");
//     console.log("   - MySQL está rodando no XAMPP?");
//     console.log("   - Banco 'meu_mecanico' foi criado no phpMyAdmin?");
//     return;
//   }

//   console.log("✅ Conectado ao banco de dados 'meu_mecanico' com sucesso!");
// });

//testando a conexao
//https://www.w3schools.com/nodejs/nodejs_mysql.asp
let sql = "select * from oficinas";
let output_consulta;
con.connect(function (err) {
  if (err) throw err;
  con.query({ sql }, function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    output_consulta = result;
  });
});

//testando novo modelo de busca - Geu

app.get("/oficinas", (req, res) => {
  // Pegamos os valores da URL. Ex: /oficinas?lat=-23.54&lon=-46.45&raio=20
  const { lat, lon, raio } = req.query;

  // conversando dos valores para float
  const userLat = parseFloat(lat);
  const userLon = parseFloat(lon);
  const searchRaio = parseFloat(raio) || 10; // definindo 10km como padrão

  // Query para calcular a distancia das oficinas e filtrando pelo raio usando a função ST_Distance_Sphere no MySQL.
  //https://dev.mysql.com/doc/refman/8.4/en/spatial-convenience-functions.html

  // Aqui, a função ST_Distance_Sphere calcular a distancia entre dois pontos (point 1 e point 2). Nesse caso, um dos pontos é a localização da oficina (longitude_oficina e latitude_oficina) e o outro é a localização que vamos mandar, podendo ser a localizacao do usuário ou um placeholder fixo. HAVING distancia_km <= ? é usando para filtrar e trazer oficinas que estejam dentro de um raio definido. O resultado é ordenado pela distancia.
  const sql = `
    SELECT 
        * ,
        (ST_Distance_Sphere(
            point(longitude_oficina, latitude_oficina), 
            point(?, ?)
        ) / 1000) AS distancia_km
    FROM oficinas
    HAVING distancia_km <= ?
    ORDER BY distancia_km ASC
  `;

  // Importante ressaltar que nessa funcao, a longitude vem antes da latitude. Isso é um padrao do MySQL.
  con.query(sql, [userLon, userLat, searchRaio], (err, result) => {
    if (err) {
      console.error("Erro na busca:", err);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
    res.json({ output_consulta: result });
  });
});

// Rota raiz para teste no navegador - Khenny
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend Meu Mecânico está funcionando!",
    banco: "Conectado com sucesso",
  });
});

// //inicio do serviço - Khenny
// app.get("/oficinas", (req, res) => {
//   res.send({ output_consulta });
//   res.json({ message: "Rota /oficinas funcionando" });
// });

// old - geu
// //https://salma-mohamed.medium.com/post-and-get-requests-on-both-reactjs-and-nodejs-part-1-basics-ddf9d6f219ff
// app.post("/usuarios", (req, res) => {
//   //mapeando os dados do formulario em variaveis
//   const nome = req.body.nome;
//   const telefone = req.body.telefone;
//   const email = req.body.email;
//   const senha = req.body.senha;
//   const tipo = req.body.tipo;

//   console.log(req.body);
//   //envio para o banco de dados
//   //as interrogacoes sao placeholders como aprendido no semestre passado
//   //ref: https://stackoverflow.com/questions/44266248/escape-question-mark-characters-as-placeholders-for-mysql-query-in-nodejs
//   const estruturaSQL = `INSERT INTO usuarios (nome, telefone, email, senha, tipo) VALUES (?, ?, ?, ?, ?)`;

//   con.query(
//     estruturaSQL,
//     //inserindo os valores do placeholder
//     [nome, telefone, email, senha, tipo],
//     function (err, result) {
//       if (err) {
//         console.log(err);
//         //deu errado :(
//         return res.status(500).send("Erro ao inserir");
//       }
//       //deu tudo certo :)
//       res.send("Usuario criado com sucesso");
//     },
//   );
// });

// Rota de Cadastro - Khenny
app.post("/usuarios", async (req, res) => {
  console.log("📩 Dados recebidos no cadastro:", req.body); // ← Adicionado para debug

  const { nome, telefone, email, senha, tipo = "cliente" } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ error: "Nome, email e senha são obrigatórios" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const sql = `INSERT INTO usuarios (nome, telefone, email, senha, tipo) VALUES (?, ?, ?, ?, ?)`;

    // Alterado Khenny
    con.query(sql, [nome, telefone, email, senhaHash, tipo], (err, result) => {
      if (err) {
        console.error("❌ Erro no banco ao cadastrar:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ error: "Este email já está cadastrado" });
        }
        return res
          .status(500)
          .json({ error: "Erro interno ao cadastrar usuário" });
      }

      // ✅ Insere automaticamente na tabela clientes
      const novoId = result.insertId;
      con.query(
        "INSERT INTO clientes (id_cliente) VALUES (?)",
        [novoId],
        (err2) => {
          if (err2)
            console.error(
              "⚠️ Aviso: não foi possível inserir em clientes:",
              err2.message,
            );
        },
      );

      console.log("✅ Usuário cadastrado com ID:", novoId);
      res
        .status(201)
        .json({ message: "Usuário criado com sucesso!", id: novoId });
    });
  } catch (error) {
    console.error("❌ Erro ao hashear senha:", error);
    res.status(500).json({ error: "Erro ao processar cadastro" });
  }
});

// Backend/server.js (secção 3.5)
app.post("/login", (req, res) => {
  console.log("📩 Recebida requisição de login");
  const { email, senha } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ?";
  con.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    const user = results[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }
    // alterado Khenny - aqui estamos gerando um token JWT que inclui o id, email e tipo do usuário. O token é assinado com uma chave secreta (definida em .env ou um valor padrão) e tem validade de 7 dias. Esse token pode ser usado pelo frontend para autenticar requisições futuras, permitindo acesso a rotas protegidas.
    const token = jwt.sign(
      { id: user.id_usuario, email: user.email, tipo: user.tipo },
      process.env.JWT_SECRET || "secret_temp",
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login realizado com sucesso!",
      token,

      //alterado Khenny - aqui estamos retornando também os dados do usuário (id, nome, email e tipo) para o frontend, além do token. Isso pode ser útil para exibir informações do usuário na interface ou para lógica de autorização baseada no tipo de usuário.
      user: {
        id: user.id_usuario,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
      },
    });
  });
});

// Rota de Cadastro de Oficina
app.post("/oficinas", (req, res) => {
  console.log("📩 Dados recebidos no cadastro de oficina:", req.body);

  const {
    nome,
    telefone,
    email,
    endereco,
    especialidade,
    marcas,
    latitude_oficina,
    longitude_oficina,
    id_mecanico,
  } = req.body;

  if (!nome || !endereco) {
    return res.status(400).json({ error: "Nome e endereço são obrigatórios" });
  }

  // Vincula o ID do usuário na tabela intermediária 'mecanicos'
  // O "INSERT IGNORE" garante que se ele cadastrar uma segunda oficina no futuro, não dará erro de duplicidade
  const usuarioParaMecanico = `INSERT IGNORE INTO mecanicos (id_mecanico) VALUES (?)`;

  // mandando a query pro banco para inserir o id do usuario na tabela mecanicos
  con.query(usuarioParaMecanico, [id_mecanico], (errMecanico) => {
    if (errMecanico) {
      console.error("Erro ao ativar perfil de mecânico no banco:", errMecanico);
      return res
        .status(500)
        .json({ error: "Erro ao processar perfil profissional do usuário." });
    }

    // Convert o usuario convencional para mecanico
    con.query(
      `UPDATE usuarios SET tipo = 'mecanico' WHERE id_usuario = ?`,
      [id_mecanico],
      (errUpdate) => {
        if (errUpdate) {
          console.error(
            "Não foi possível atualizar o tipo do usuário para mecânico:",
            errUpdate.message,
          );
        }
      },
    );

    const sql = `INSERT INTO oficinas (nome, telefone, email, endereco, especialidade, marcas, latitude_oficina, longitude_oficina, id_mecanico) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        nome,
        telefone,
        email,
        endereco,
        especialidade,
        marcas,
        latitude_oficina,
        longitude_oficina,
        id_mecanico,
      ],
      (err, result) => {
        if (err) {
          console.error("❌ Erro ao cadastrar oficina:", err);
          return res
            .status(500)
            .json({ error: "Erro interno ao cadastrar oficina" });
        }
        console.log("✅ Oficina cadastrada com ID:", result.insertId);
        res.status(201).json({
          message: "Oficina cadastrada com sucesso!",
          id: result.insertId,
        });
      },
    );
  });
});

// ADD Khenny
app.post("/avaliacoes", (req, res) => {
  console.log("📩 Avaliação recebida:", req.body);
  const { id_cliente, id_oficina, nota, comentario, data } = req.body;

  if (!id_cliente || !id_oficina || !nota) {
    return res.status(400).json({ error: "Dados obrigatórios faltando" });
  }

  const sql = `INSERT INTO avaliacoes (id_cliente, id_oficina, nota, comentario, data) VALUES (?, ?, ?, ?, ?)`;
  con.query(
    sql,
    [id_cliente, id_oficina, nota, comentario, data],
    (err, result) => {
      if (err) {
        console.error("❌ Erro ao salvar avaliação:", err);
        return res.status(500).json({ error: "Erro ao salvar avaliação" });
      }
      console.log("✅ Avaliação salva com ID:", result.insertId);
      res.status(201).json({
        message: "Avaliação enviada com sucesso!",
        id: result.insertId,
      });
    },
  );
});

// GET avaliacoes por oficina - Khenny
app.get("/avaliacoes/:id_oficina", (req, res) => {
  const { id_oficina } = req.params;
  const sql = `
    SELECT a.nota, a.comentario, a.data, u.nome 
    FROM avaliacoes a
    JOIN usuarios u ON a.id_cliente = u.id_usuario
    WHERE a.id_oficina = ?
    ORDER BY a.data DESC
  `;
  con.query(sql, [id_oficina], (err, result) => {
    if (err) {
      console.error("❌s Erro ao buscar avaliações:", err);
      return res.status(500).json({ error: "Erro ao buscar avaliações" });
    }
    res.json({ avaliacoes: result });
  });
});

// UC04 - Rotas Admin - Khenny

// Listar todos os usuarios
app.get("/admin/usuarios", (req, res) => {
  con.query(
    "SELECT id_usuario, nome, email, tipo FROM usuarios",
    (err, result) => {
      if (err)
        return res.status(500).json({ error: "Erro ao buscar usuários" });
      res.json({ usuarios: result });
    },
  );
});

// Deletar usuario
app.delete("/admin/usuarios/:id", (req, res) => {
  const { id } = req.params;
  con.query("DELETE FROM usuarios WHERE id_usuario = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Erro ao deletar usuário" });
    res.json({ message: "Usuário removido com sucesso!" });
  });
});

// Listar todas as oficinas
app.get("/admin/oficinas", (req, res) => {
  con.query(
    "SELECT id_oficina, nome, endereco, especialidade, email FROM oficinas",
    (err, result) => {
      if (err)
        return res.status(500).json({ error: "Erro ao buscar oficinas" });
      res.json({ oficinas: result });
    },
  );
});

// Deletar oficina
app.delete("/admin/oficinas/:id", (req, res) => {
  const { id } = req.params;
  con.query("DELETE FROM oficinas WHERE id_oficina = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Erro ao deletar oficina" });
    res.json({ message: "Oficina removida com sucesso!" });
  });
});

//porta de servico - Khenny
app.listen(3000, () => {
  console.log("🚀 Backend rodando com sucesso na porta 3000");
  console.log("📍 Teste cadastro em: POST http://localhost:3000/usuarios");
});
