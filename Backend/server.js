import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";

const app = express();

//usado pra ter a capacidade de receber objetos json
app.use(express.json());

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

//inicio do serviço
app.get("/oficinas", (req, res) => {
  //resposta exibida na tela
  res.send({ output_consulta });
});

//https://salma-mohamed.medium.com/post-and-get-requests-on-both-reactjs-and-nodejs-part-1-basics-ddf9d6f219ff
app.post("/usuarios", (req, res) => {
  //mapeando os dados do formulario em variaveis
  const nome = req.body.nome;
  const telefone = req.body.telefone;
  const email = req.body.email;
  const senha = req.body.senha;
  const tipo = req.body.tipo;

  console.log(req.body);
  //envio para o banco de dados
  //as interrogacoes sao placeholders como aprendido no semestre passado
  //ref: https://stackoverflow.com/questions/44266248/escape-question-mark-characters-as-placeholders-for-mysql-query-in-nodejs
  const estruturaSQL = `INSERT INTO usuarios (nome, telefone, email, senha, tipo) VALUES (?, ?, ?, ?, ?)`;

  con.query(
    estruturaSQL,
    //inserindo os valores do placeholder
    [nome, telefone, email, senha, tipo],
    function (err, result) {
      if (err) {
        console.log(err);
        //deu errado :(
        return res.status(500).send("Erro ao inserir");
      }
      //deu tudo certo :)
      res.send("Usuario criado com sucesso");
    },
  );
});

//porta de servico
app.listen(3000);
