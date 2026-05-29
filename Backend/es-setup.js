//arquivo para criar o indices no Elasticsearch
// executado apenas ao iniciar o projeto pela primeira vez

import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: "http://localhost:9200" });

// Remove o índice se já existir para recriar do zero
await client.indices.delete({ index: "oficinas", ignore_unavailable: true });

await client.indices.create({
  index: "oficinas",
  body: {
    mappings: {
      properties: {
        id_oficina: { type: "integer" },
        nome: { type: "text", analyzer: "portuguese" },
        endereco: { type: "text", analyzer: "portuguese" },
        especialidade: { type: "text", analyzer: "portuguese" },
        marcas: { type: "text", analyzer: "portuguese" },
        telefone: { type: "keyword" },
        email: { type: "keyword" },
        avaliacao: { type: "float" },
        foto_path: { type: "keyword", index: false },
        id_mecanico: { type: "integer" },
        location: { type: "geo_point" },
      },
    },
  },
});

console.log("✅ Índice 'oficinas' criado com sucesso!");
await client.close();
