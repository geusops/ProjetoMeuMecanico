//Criado por Khenny

// Importa hooks do React para usar contexto e executar código quando a página carregar
import { useContext, useEffect } from "react";

// Importa ferramenta para redirecionar o usuário entre páginas
import { useNavigate, Link } from "react-router-dom";

// Importa o contexto de autenticação (onde ficam os dados do usuário logado)
import { AuthContext } from "../context/AuthContext";

// Função que representa a página de Perfil
export default function Perfil() {
  // Pega os dados do usuário que estão no AuthContext
  const { user } = useContext(AuthContext);

  // Permite navegar para outras rotas (ex: login)
  const navigate = useNavigate();

  // useEffect executa quando a página carrega ou quando "user" muda
  useEffect(() => {
    // Se não existir usuário logado
    if (!user) {
      navigate("/login"); // redireciona para a página de login
    }
  }, [user, navigate]); // executa quando user ou navigate mudar

  // Se não tiver usuário, não renderiza nada
  // Isso evita aparecer conteúdo antes do redirecionamento
  if (!user) return null;

  // Parte visual da página
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Card de boas vindas */}
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-sky-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
              {user.nome?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-sky-700">
                Olá, {user.nome?.split(" ")[0]}! 👋
              </h1>
              <p className="text-gray-500">Bem-vindo ao seu painel</p>
            </div>
          </div>

          {/* Informações da conta */}
          <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
            <h2 className="text-xl font-semibold text-sky-800 mb-4">
              Informações da conta
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Nome:</strong> {user.nome}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-700">
                <strong>Tipo:</strong>{" "}
                <span className="bg-sky-200 text-sky-700 px-2 py-1 rounded-full text-sm font-semibold">
                  {user.tipo}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Botão Admin - aparece só para ADMIN */}
        {user.tipo === "ADMIN" && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl mt-6">
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              🛡️ Acesso Administrativo
            </h2>
            <p className="text-gray-600 mb-4">
              Gerencie usuários e oficinas da plataforma.
            </p>
            <Link to="/admin">
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2">
                Acessar Painel Administrativo →
              </button>
            </Link>
          </div>
        )}

        {/* Card de cadastrar oficina */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-sky-500">
          <h2 className="text-xl font-semibold text-sky-800 mb-2">
            Você tem uma oficina mecânica?
          </h2>
          <p className="text-gray-600 mb-4">
            Cadastre sua oficina e apareça no mapa para novos clientes na sua
            região.
          </p>
          <Link to="/oficinas/cadastrar">
            <button className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition">
              Cadastrar Minha Oficina →
            </button>
          </Link>
        </div>

        {/* Card de funcionalidades futuras */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Em breve</h2>
          <ul className="space-y-3 text-gray-500">
            <li className="flex items-center gap-2">⭐ Oficinas favoritas</li>
            <li className="flex items-center gap-2">
              📅 Histórico de agendamentos
            </li>
            <li className="flex items-center gap-2">✏️ Editar perfil</li>
            <li className="flex items-center gap-2">🔒 Alterar senha</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
