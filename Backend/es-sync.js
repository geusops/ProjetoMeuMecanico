// es-sync.js - Módulo de sincronização MySQL -> Elasticsearch
// Este arquivo permite sincronizar uma oficina individual (para cadastros) ou todas (para manutenção).

import { Client } from "@elastic/elasticsearch";
import mysql from "mysql2/promise"; // Recomendado usar a versão promise para async/await

const esClient = new Client({ node: "http://localhost:9200" });

/**
 * Sincroniza uma única oficina no Elasticsearch.
 * Ideal para ser chamado dentro da rota de cadastro (POST /oficinas).
 * @param {Object} oficina - Objeto contendo os dados da oficina vindos do MySQL.
 */
export const syncSingleOficina = async (oficina) => {
  try {
    await esClient.index({
      index: "oficinas",
      id: String(oficina.id_oficina),
      document: {
        id_oficina: oficina.id_oficina,
        nome: oficina.nome,
        endereco: oficina.endereco,
        especialidade: oficina.especialidade || "",
        marcas: oficina.marcas || "",
        telefone: oficina.telefone,
        email: oficina.email,
        avaliacao: oficina.avaliacao,
        foto_path: oficina.foto_path,
        id_mecanico: oficina.id_mecanico,
        location: {
          lat: parseFloat(oficina.latitude_oficina),
          lon: parseFloat(oficina.longitude_oficina),
        },
      },
    });
    console.log(
      `✅ [ES] Oficina ${oficina.id_oficina} sincronizada com sucesso.`,
    );
  } catch (error) {
    console.error(
      `❌ [ES] Erro ao sincronizar oficina ${oficina.id_oficina}:`,
      error.message,
    );
    throw error;
  }
};

/**
 * Sincroniza todas as oficinas do banco de dados (Carga Total).
 */
export const syncAllOficinas = async () => {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "db_admin",
    password: "pass123",
    database: "meu_mecanico",
  });

  try {
    console.log("🔍 Iniciando sincronização total...");
    const [rows] = await con.execute("SELECT * FROM oficinas");

    if (rows.length === 0) {
      console.log("⚠️ Nenhuma oficina encontrada no MySQL.");
      return;
    }

    const operations = rows.flatMap((row) => [
      { index: { _index: "oficinas", _id: String(row.id_oficina) } },
      {
        id_oficina: row.id_oficina,
        nome: row.nome,
        endereco: row.endereco,
        especialidade: row.especialidade || "",
        marcas: row.marcas || "",
        telefone: row.telefone,
        email: row.email,
        avaliacao: row.avaliacao,
        foto_path: row.foto_path,
        id_mecanico: row.id_mecanico,
        location: {
          lat: parseFloat(row.latitude_oficina),
          lon: parseFloat(row.longitude_oficina),
        },
      },
    ]);

    const result = await esClient.bulk({ operations });

    if (result.errors) {
      console.error("⚠️ Alguns erros ocorreram durante o Bulk Sync.");
    } else {
      console.log(
        `✅ Sincronização total concluída: ${rows.length} oficinas processadas.`,
      );
    }
  } catch (error) {
    console.error("❌ Erro na carga total:", error);
  } finally {
    await con.end();
  }
};

// Se o arquivo for executado diretamente via 'node es-sync.js', faz a carga total
if (import.meta.url === `file://${process.argv[1]}`) {
  syncAllOficinas().then(() => process.exit());
}
