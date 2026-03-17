//Criado por Khenny

// Importa hooks do React para usar contexto e executar código quando a página carregar
import { useContext, useEffect } from "react";

// Importa ferramenta para redirecionar o usuário entre páginas
import { useNavigate } from "react-router-dom";

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
      {/* Container central da página */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        {/* Título com o nome do usuário */}
        <h1 className="text-4xl font-bold text-sky-700 mb-6">
          Bem-vindo, {user.nome || "Usuário"}!
        </h1>

        <div className="space-y-6">
          {/* Área com informações da conta */}
          <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
            <h2 className="text-2xl font-semibold text-sky-800 mb-4">
              Informações da conta
            </h2>

            {/* Mostra o email do usuário */}
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>

            {/* Aqui podem ser adicionados mais dados quando existir backend */}
          </div>

          {/* Área de funcionalidades futuras */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Funcionalidades em breve
            </h2>

            {/* Lista de possíveis funções futuras */}
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Oficinas favoritas</li>
              <li>Histórico de agendamentos</li>
              <li>Editar perfil</li>
              <li>Alterar senha</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
