//Modificado por Khenny

// Importa ferramentas do React para guardar dados do formulário e usar contexto
import { useState, useContext } from "react";
// Importa navegação entre páginas e links internos
import { useNavigate, Link } from "react-router-dom";
// Importa ícones da biblioteca lucide-react
import { ArrowLeft, Lock, Mail, User, Wrench } from "lucide-react";
// Importa o contexto de autenticação (responsável por controlar o usuário logado)
import { AuthContext } from "../context/AuthContext";
// Importa a imagem da logo do projeto
import logo from "../assets/logo-simples.png";
import axios from "axios";

// Função que representa a página de cadastro
export default function CadastrarUsuario() {
  // Guarda os dados digitados no formulário
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipo: "cliente",
  });

  // Guarda mensagens de erro
  const [erro, setErro] = useState("");

  // Pega a função login do contexto
  const { login } = useContext(AuthContext);

  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();

  // Atualiza os valores do formulário quando o usuário digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //logica usada para mudar o tipo do usuario sendo cadastrado
  //https://www.youtube.com/watch?v=BBQoBTu3lcA
  //https://tailwindcss.com/plus/ui-blocks/application-ui/forms/toggles
  const toggleUserType = () => {
    setForm((prev) => ({
      ...prev,
      tipo: prev.tipo === "cliente" ? "mecanico" : "cliente",
    }));
  };
  //
  // Envio dos dados do formulario para o backend
  //
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita recarregar a página
    setErro(""); // limpa erros antigos

    // Verifica se os campos obrigatórios foram preenchidos
    if (!form.nome || !form.email || !form.senha || !form.telefone) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    // Verifica se as duas senhas são iguais
    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    // Verifica se a senha tem pelo menos 6 caracteres
    if (form.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    //removendo o confirmar senha antes de mandar pro banco criando o objeto usuario
    const { confirmarSenha, ...usuario } = form;

    // envido o
    //https://salma-mohamed.medium.com/post-and-get-requests-on-both-reactjs-and-nodejs-part-1-basics-ddf9d6f219ff
    try {
      //chamada envio para o backend via post no endpoit usarios
      const respPost = await axios.post(
        "http://localhost:3000/usuarios",
        usuario,
      );

      // Faz login automaticamente após cadastro
      login(respPost.data);
      //envia o usuario para o perfil dele
      navigate("/perfil");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error === "Email já cadastrado") {
        setErro("Este email já está em uso.");
      } else {
        setErro("Erro ao cadastrar usuário.");
      }
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

          <div className="bg-slate-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-gray-700 font-semibold mb-3 text-center text-sm">
              Você deseja se cadastrar como:
            </label>
            <div className="flex items-center justify-center gap-4">
              {/* Opção Cliente */}
              <span
                className={`text-sm flex items-center gap-1 transition-colors ${form.tipo === "cliente" ? "font-bold text-sky-600" : "text-gray-400"}`}
              >
                <User size={16} /> Cliente
              </span>

              {/* Botão Switch para escolher entre mecanico e usuario */}
              <div
                onClick={toggleUserType}
                className={`relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  form.tipo === "mecanico" ? "bg-sky-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    form.tipo === "mecanico" ? "translate-x-8" : "translate-x-0"
                  }`}
                />
              </div>

              {/* Opção Mecânico */}
              <span
                className={`text-sm flex items-center gap-1 transition-colors ${form.tipo === "mecanico" ? "font-bold text-sky-600" : "text-gray-400"}`}
              >
                <Wrench size={16} /> Mecânico
              </span>
            </div>
          </div>

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
