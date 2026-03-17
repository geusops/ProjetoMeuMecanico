//Modificado por Khenny

// Importa ferramentas do React para controlar dados e usar contexto
import { useState, useContext } from "react";

// Importa ferramentas para navegar entre páginas e criar links internos
import { useNavigate, Link } from "react-router-dom";

// Importa o contexto de autenticação (onde fica o login do usuário)
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  // Guarda os dados digitados no formulário
  const [form, setForm] = useState({ email: "", senha: "" });

  // Guarda mensagens de erro
  const [erro, setErro] = useState("");

  // Pega a função de login do contexto
  const { login } = useContext(AuthContext);

  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();

  // Função chamada quando o usuário digita nos campos
  const handleChange = (e) => {
    // Atualiza o valor do campo que foi alterado
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Função executada quando o formulário é enviado
  const handleSubmit = (e) => {
    // Impede o recarregamento da página
    e.preventDefault();

    // Limpa mensagens de erro antigas
    setErro("");

    // Verifica se email ou senha estão vazios
    if (!form.email || !form.senha) {
      setErro("Preencha email e senha.");
      return;
    }

    // Simulação de um usuário logado (no futuro virá do backend)
    const usuarioSimulado = {
      id: Date.now(), // gera um id simples
      nome: "Usuário Teste",
      email: form.email,
    };

    // Chama a função login e salva o usuário
    login(usuarioSimulado);

    // Redireciona para a página de perfil
    navigate("/perfil");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      {/* Caixa central do formulário */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10">
        {/* Título da página */}
        <h1 className="text-3xl font-bold text-sky-700 mb-8 text-center">
          Entrar na conta
        </h1>

        {/* Mostra mensagem de erro caso exista */}
        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {erro}
          </div>
        )}

        {/* Formulário de login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="seu@email.com"
              required
            />
          </div>

          {/* Campo de senha */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Botão para enviar o formulário */}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition shadow-md"
          >
            Entrar
          </button>
        </form>

        {/* Link para página de cadastro */}
        <p className="text-center text-gray-600 mt-6">
          Ainda não tem conta?{" "}
          <Link
            to="/cadastro"
            className="text-sky-600 hover:underline font-medium"
          >
            Cadastrar agora
          </Link>
        </p>
      </div>
    </div>
  );
}
