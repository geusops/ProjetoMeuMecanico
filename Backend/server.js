//sessao de imports
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

app.get("/oficinas", (req, res) => {
  const { lat, lon, raio } = req.query;

  const userLat = parseFloat(lat);
  const userLon = parseFloat(lon);
  const searchRaio = parseFloat(raio) || 10;

  //nessa funcao, a longitude vem antes da latitude o que é padrao do MySQL.
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

  //valida se teve erro de busca
  con.query(sql, [userLon, userLat, searchRaio], (err, result) => {
    if (err) {
      console.error("Erro na busca:", err);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
    res.json({ output_consulta: result });
  });
});

// Rota raiz para teste no navegador
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend Meu Mecânico está funcionando!",
    banco: "Conectado com sucesso",
  });
});

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

  const foto_default = "/uploads/oficinas/default-oficina.png";

  const {
    nome,
    foto_path = foto_default, // Usando a imagem padrão
    telefone,
    email,
    endereco,
    especialidade,
    marcas,
    servicos,
    latitude_oficina,
    longitude_oficina,
    id_usuario,
  } = req.body;

  if (!nome || !endereco) {
    return res.status(400).json({ error: "Nome e endereço são obrigatórios" });
  }

  // Vincula o ID do usuário na tabela intermediária 'mecanicos'
  // O "INSERT IGNORE" garante que se ele cadastrar uma segunda oficina no futuro, não dará erro de duplicidade
  const usuarioParaMecanico = `
    INSERT IGNORE INTO mecanicos (id_usuario)
    VALUES (?)
  `;

  // verifica se o usuário já possui perfil de mecânico
  const buscaMecanico = `
    SELECT id_mecanico
    FROM mecanicos
    WHERE id_usuario = ?
  `;

  // função responsável por criar a oficina após obter o id_mecanico real
  const criarOficina = (idMecanicoReal) => {
    // Atualiza o tipo do usuário para mecânico
    con.query(
      `UPDATE usuarios SET tipo = 'mecanico' WHERE id_usuario = ?`,
      [id_usuario],
      (errUpdate) => {
        if (errUpdate)
          console.error("Erro ao atualizar tipo:", errUpdate.message);
      },
    );

    // monta a query
    const sql = `
      INSERT INTO oficinas (
        nome, foto_path, endereco, telefone, email, id_mecanico,    
        especialidade, marcas, descricao, latitude_oficina, longitude_oficina, 
        uf, cidade, bairro          
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    con.query(
      sql,
      [
        nome,
        foto_path,
        endereco,
        telefone,
        email,
        idMecanicoReal,
        especialidade || "",
        marcas,
        req.body.descricao || "",
        latitude_oficina,
        longitude_oficina,
        req.body.uf,
        req.body.cidade,
        req.body.bairro,
      ],
      (err, result) => {
        if (err) {
          console.error("❌ Erro ao cadastrar oficina:", err);
          return res
            .status(500)
            .json({ error: "Erro interno ao cadastrar oficina" });
        }

        const idOficina = result.insertId;
        console.log("✅ Oficina cadastrada com ID:", idOficina);

        if (Array.isArray(servicos) && servicos.length > 0) {
          const sqlServicos = `
            INSERT INTO servicos (nome_servico, descricao, preco_medio, id_oficina)
            VALUES ?
          `;

          const valoresServicos = servicos.map((s) => [
            s.nomeServico,
            s.descricao,
            parseFloat(s.precoMedio) || 0,
            idOficina,
          ]);

          con.query(sqlServicos, [valoresServicos], (errServicos) => {
            if (errServicos) {
              console.error("❌ Erro ao cadastrar serviços:", errServicos);
              return res
                .status(500)
                .json({ error: "Erro ao salvar serviços." });
            }

            res
              .status(201)
              .json({ message: "Oficina e serviços salvos!", id: idOficina });
          });
        } else {
          res
            .status(201)
            .json({ message: "Oficina salva sem serviços.", id: idOficina });
        }
      },
    );
  };

  // verifica se já existe um mecânico vinculado a esse usuário
  con.query(buscaMecanico, [id_usuario], (errBusca, resultBusca) => {
    if (errBusca) {
      console.error("Erro ao buscar mecânico:", errBusca);

      return res.status(500).json({
        error: "Erro ao verificar perfil de mecânico.",
      });
    }

    // se já existir, reutiliza o id_mecanico existente
    if (resultBusca.length > 0) {
      const idMecanicoExistente = resultBusca[0].id_mecanico;

      console.log("Usuário já possui perfil de mecânico:", idMecanicoExistente);

      criarOficina(idMecanicoExistente);
    } else {
      // mandando a query pro banco para inserir o id do usuario na tabela mecanicos
      con.query(
        usuarioParaMecanico,
        [id_usuario],
        (errMecanico, resultMecanico) => {
          if (errMecanico) {
            console.error(
              "Erro ao ativar perfil de mecânico no banco:",
              errMecanico,
            );

            return res.status(500).json({
              error: "Erro ao processar perfil profissional do usuário.",
            });
          }

          const idMecanicoCriado = resultMecanico.insertId;

          console.log("✅ Perfil de mecânico criado:", idMecanicoCriado);

          criarOficina(idMecanicoCriado);
        },
      );
    }
  });
});

// ADD avaliacoes - Khenny
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

// Buscar serviços da oficina
app.get("/oficinas/:id/servicos", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      id_servico,
      nome_servico,
      descricao,
      preco_medio
    FROM servicos
    WHERE id_oficina = ?
  `;

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar serviços:", err);

      return res.status(500).json({
        error: "Erro ao buscar serviços",
      });
    }

    res.json({ servicos: result });
  });
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

// Rota para receber solicitações de orçamento
app.post("/orcamentos", (req, res) => {
  const { nome, telefone, email, servicoDesejado, descricao, id_oficina } =
    req.body;

  // Validação no servidor
  if (!nome || !telefone || !email || !servicoDesejado || !id_oficina) {
    return res
      .status(400)
      .json({ erro: "Todos os campos obrigatórios devem ser preenchidos." });
  }

  // Alinhando as variáveis com as colunas criadas no banco de dados
  const sql = `
        INSERT INTO orcamentos (nome, telefone, email, servico_desejado, descricao, id_oficina) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  // Executa a query utilizando sua conexão do MySQL (ex: db ou conexao)
  con.query(
    sql,
    [nome, telefone, email, servicoDesejado, descricao || null, id_oficina],
    (err, result) => {
      if (err) {
        console.error("Erro ao salvar orçamento no MySQL:", err);
        return res
          .status(500)
          .json({ erro: "Erro interno no servidor ao processar o orçamento." });
      }

      return res.status(201).json({
        mensagem: "Orçamento cadastrado com sucesso!",
        id_orcamento: result.insertId,
      });
    },
  );
});

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
  console.log("Backend rodando com sucesso na porta 3000");
});
