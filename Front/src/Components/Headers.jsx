//Modificado por Khenny

// Importa ferramentas para criar links entre páginas e navegar entre rotas
import { Link, useNavigate } from "react-router-dom";

// Importa a logo do projeto
import logo from "../assets/logo-simples.png";

// Importa hooks do React
import { useState, useContext } from "react";

// Importa o contexto de autenticação (onde ficam os dados do usuário)
import { AuthContext } from "../context/AuthContext";

// Função que cria o componente do cabeçalho do site
export default function Headers() {
  // Controla se o menu mobile está aberto ou fechado
  const [nav, setNav] = useState(false);

  // Pega os dados do usuário e a função de logout do contexto
  const { user, logout } = useContext(AuthContext);

  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();

  // Função chamada quando o usuário clica em "Sair"
  const handleLogout = () => {
    logout(); // limpa os dados do usuário
    setNav(false); // fecha o menu mobile
    navigate("/"); // volta para a página inicial
  };

  // Pega apenas o primeiro nome do usuário
  // Exemplo: "João Silva" → "João"
  const primeiroNome = user?.nome?.split(" ")[0] || "Usuário";

  return (
    <header className="w-full">
      {/* Barra de navegação */}
      <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
        {/* Container principal */}
        <div className="w-full flex items-center h-20 px-6 md:px-20">
          {/* Logo e nome do sistema */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo Meu Mecânico" className="h-10 w-auto" />
              <span className="font-bold text-xl text-sky-500">
                Meu Mecânico
              </span>
            </Link>

            {/* Menu principal para telas grandes */}
            <ul className="hidden md:flex items-center gap-6 text-gray-600 text-md">
              <li className="hover:text-sky-500 transition">
                <Link to="/">Início</Link>
              </li>
              <li className="hover:text-sky-500 transition">
                <Link to="/oficinas">Oficinas</Link>
              </li>
              <li className="hover:text-sky-500 transition">Serviços</li>
              <li className="hover:text-sky-500 transition">Contato</li>
            </ul>
          </div>

          {/* Área direita com botões (desktop) */}
          <div className="ml-auto hidden md:flex items-center gap-4">
            {/* Se o usuário estiver logado */}
            {user ? (
              <>
                {/* Botão que leva ao perfil */}
                <Link
                  to="/perfil"
                  className="px-5 py-2.5 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition shadow-sm flex items-center gap-2"
                >
                  Olá, {primeiroNome}!<span className="text-lg">★</span>
                </Link>

                {/* Botão para sair da conta */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition"
                >
                  Sair
                </button>
              </>
            ) : (
              /* Se o usuário NÃO estiver logado */
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-sky-600 border border-sky-600 rounded-lg font-medium hover:bg-sky-50 transition"
                >
                  Entrar
                </Link>

                <Link
                  to="/cadastro"
                  className="px-5 py-2.5 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition shadow-sm"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          {/* Botão de menu (hambúrguer) para celular */}
          <button
            className="ml-auto md:hidden p-2 text-gray-600 hover:text-sky-600 transition"
            onClick={() => setNav(!nav)} // abre ou fecha o menu mobile
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={nav ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menu que aparece no celular */}
        {nav && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <ul className="flex flex-col p-5 gap-4 text-gray-700 text-base">
              {/* Links principais */}
              <li>
                <Link to="/" onClick={() => setNav(false)}>
                  Início
                </Link>
              </li>

              <li>
                <Link to="/oficinas" onClick={() => setNav(false)}>
                  Oficinas
                </Link>
              </li>

              <li>Serviços</li>
              <li>Contato</li>

              {/* Linha separadora */}
              <div className="h-px bg-gray-200 my-2"></div>

              {/* Opções dependem se o usuário está logado */}
              {user ? (
                <>
                  <li>
                    <Link to="/perfil" onClick={() => setNav(false)}>
                      Olá, {primeiroNome}! ★
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-left text-red-600 font-medium"
                    >
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={() => setNav(false)}>
                      Entrar
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/cadastro"
                      onClick={() => setNav(false)}
                      className="text-sky-600 font-medium"
                    >
                      Cadastrar (usuário)
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
