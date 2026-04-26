//Por Khenny

// Importa ferramentas do React para guardar dados do formulário e usar contexto
import { useState, useContext } from "react";

// Importa navegação entre páginas e links internos
import { useNavigate, Link } from "react-router-dom";

// Importa ícones da biblioteca lucide-react
import { ArrowLeft, Lock, Mail } from "lucide-react";

// Importa o contexto de autenticação (responsável por controlar o usuário logado)
import { AuthContext } from "../context/AuthContext";

// Importa a imagem da logo do projeto
import logo from "../assets/logo-simples.png";

// Função que representa a página de cadastro
export default function CadastrarUsuario() {
  // Guarda os dados digitados no formulário
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  // Guarda mensagens de erro
  const [erro, setErro] = useState("");

  // login por cadastrar
  const { cadastrar } = useContext(AuthContext);

  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();

  // Atualiza os valores do formulário quando o usuário digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Executa quando o usuário envia o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.nome || !form.email || !form.senha || !form.telefone) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (form.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // ✅ CHAMADA REAL PARA O BACKEND
    const resultado = await cadastrar({
      nome: form.nome,
      telefone: form.telefone,
      email: form.email,
      senha: form.senha,
      tipo: "cliente", // pode mudar para "oficina" depois
    });

    if (resultado.success) {
      alert("Cadastro realizado com sucesso!"); // temporário
      navigate("/login"); // ou diretamente para /perfil se quiser logar automático
    } else {
      setErro(resultado.error || "Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Botão para voltar para a página inicial */}
      <div className="p-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-700 hover:text-sky-600"
        >
          <ArrowLeft size={20} />
          <span>Voltar para a página inicial</span>
        </Link>
      </div>

      <div className="max-w-lg mx-auto px-6 py-12">
        {/* Logo e descrição do projeto */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-4">
            <img src={logo} alt="Logo Meu Mecânico" className="h-12 w-auto" />
            <span className="font-bold text-4xl text-sky-500">
              Meu Mecânico
            </span>
          </div>

          <p className="text-gray-600 text-lg">
            Sua plataforma de confiança para manutenção automotiva
          </p>
        </div>

        {/* Card onde fica o formulário */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Título do formulário */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Crie seu cadastro
          </h2>

          <p className="text-gray-600 mb-8">
            Insira seus dados para criarmos uma nova conta.
          </p>

          {/* Mostra erro caso exista */}
          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {erro}
            </div>
          )}

          {/* Formulário de cadastro */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo nome */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nome completo
              </label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex: João da Silva"
                className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                required
              />
            </div>

            {/* Campo telefone */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Telefone
              </label>
              <input
                type="tel"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="Ex: (11) 99999-9999"
                className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                required
              />
            </div>

            {/* Campo email com ícone */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full pl-10 px-4 py-3 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Campo senha */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Cadastre uma senha
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="password"
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-10 px-4 py-3 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Campo confirmar senha */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirme sua senha
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="password"
                  name="confirmarSenha"
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Repita a senha"
                  className="w-full pl-10 px-4 py-3 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Botão de cadastro */}
            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition shadow-md mt-4"
            >
              Cadastrar conta
            </button>
          </form>

          {/* Link para página de login */}
          <p className="text-center text-gray-600 mt-6">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="text-sky-600 hover:underline font-medium"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
