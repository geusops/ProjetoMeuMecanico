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

    con.query(sql, [nome, telefone, email, senhaHash, tipo], (err, result) => {
      if (err) {
        console.error("❌ Erro no banco ao cadastrar:", err); // ← Adicionado
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ error: "Este email já está cadastrado" });
        }
        return res
          .status(500)
          .json({ error: "Erro interno ao cadastrar usuário" });
      }
      console.log("✅ Usuário cadastrado com ID:", result.insertId);
      res
        .status(201)
        .json({ message: "Usuário criado com sucesso!", id: result.insertId });
    });
  } catch (error) {
    console.error("❌ Erro ao hashear senha:", error);
    res.status(500).json({ error: "Erro ao processar cadastro" });
  }
});

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

    const token = jwt.sign(
      { id: user.id, email: user.email, tipo: user.tipo },
      process.env.JWT_SECRET || "secret_temp",
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
      },
    });
  });
});

//porta de servico - Khenny
app.listen(3000, () => {
  console.log("🚀 Backend rodando com sucesso na porta 3000");
  console.log("📍 Teste cadastro em: POST http://localhost:3000/usuarios");
});
