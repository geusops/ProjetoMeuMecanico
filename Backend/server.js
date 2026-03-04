import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

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

//porta de servico
app.listen(3000);
