// UC06 - Sistema de Login - Khenny

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  
  // Guarda o que o usuário digita (email e senha)
  const [form, setForm] = useState({ email: "", senha: "" });

  // Guarda mensagem de erro para mostrar na tela
  const [erro, setErro] = useState("");

  // Controla se o botão está carregando (Entrando...)
  const [loading, setLoading] = useState(false);

  // Pega a função de login que vem do sistema de autenticação
  const { login } = useContext(AuthContext);

  // Usado para mudar de página após o login
  const navigate = useNavigate();

  // Atualiza os campos quando o usuário digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Função executada quando o usuário clica em "Entrar"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    if (!form.email || !form.senha) {
      setErro("Preencha email e senha.");
      setLoading(false);
      return;
    }

    // Envia os dados para o backend verificar se o login está correto
    const resultado = await login(form.email, form.senha);

    if (resultado.success) {
      // Redireciona o usuário conforme seu tipo
      if (resultado.user?.tipo?.toUpperCase() === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }
    } else {
      setErro(resultado.error || "Email ou senha incorretos.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10">
        
        <h1 className="text-3xl font-bold text-sky-700 mb-8 text-center">
          Entrar na conta
        </h1>

        {/* Mostra erro caso o login falhe */}
        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
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

          <div>
            <label className="block text-gray-700 font-medium mb-2">Senha</label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition shadow-md disabled:opacity-70"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="text-sky-600 hover:underline font-medium">
            Cadastrar agora
          </Link>
        </p>
      </div>
    </div>
  );
}