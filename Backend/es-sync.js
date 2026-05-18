import { Client } from "@elastic/elasticsearch";
import mysql from "mysql";

const esClient = new Client({ node: "http://localhost:9200" });

const con = mysql.createConnection({
  host: "localhost",
  user: "db_admin",
  password: "pass123",
  database: "meu_mecanico",
});

con.connect((err) => {
  if (err) throw err;

  con.query("SELECT * FROM oficinas", async (err, rows) => {
    if (err) throw err;

    if (rows.length === 0) {
      console.log("⚠️  Nenhuma oficina encontrada no banco.");
      con.end();
      await esClient.close();
      return;
    }

    const operations = rows.flatMap((row) => [
      { index: { _index: "oficinas", _id: String(row.id_oficina) } },
      {
        id_oficina:    row.id_oficina,
        nome:          row.nome,
        endereco:      row.endereco,
        especialidade: row.especialidade || "",
        marcas:        row.marcas || "",
        telefone:      row.telefone,
        email:         row.email,
        avaliacao:     row.avaliacao,
        foto_path:     row.foto_path,
        id_mecanico:   row.id_mecanico,
        location: {
          lat: row.latitude_oficina,
          lon: row.longitude_oficina,
        },
      },
    ]);

    const result = await esClient.bulk({ operations });

    const erros = result.items.filter((i) => i.index?.error);
    if (erros.length > 0) {
      console.error("⚠️  Erros ao indexar:", JSON.stringify(erros, null, 2));
    }

    console.log(`✅ ${rows.length} oficina(s) sincronizada(s) com o Elasticsearch!`);

    con.end();
    await esClient.close();
  });
});
