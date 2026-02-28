import logo from "../assets/logo-simples.png";
import { useState } from "react";

export default function Headers() {
  const [nav, setNav] = useState(false);

  return (
    <header className="w-full">
      <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
        {/* container configurado com FULL WIDTH, ou seja, sem bordas*/}
        <div className="w-full flex items-center h-20 px-6 md:px-20">
          {/* configuraçoes do logo  e menu*/}
          <div className="flex items-center gap-6">
            <a className="flex items-center gap-2">
              <img src={logo} alt="Logo Meu Mecânico" className="h-10 w-auto" />
              <span className="font-bold text-xl text-sky-500">
                Meu Mecânico
              </span>
            </a>

            {/* Menus */}
            <ul className="hidden md:flex items-center gap-4 text-gray-600 text-md">
              <li className="hover:text-sky-500 cursor-pointer">Início</li>
              <li className="hover:text-sky-500 cursor-pointer">Oficinas</li>
              <li className="hover:text-sky-500 cursor-pointer">Serviços</li>
              <li className="hover:text-sky-500 cursor-pointer">Contato</li>
            </ul>
          </div>

          {/* botoes */}
          <div className="ml-auto hidden md:flex items-center gap-3">
            <button className="rounded-full px-4 py-2 text-sky-500 border border-transparent shadow hover:bg-slate-700 hover:text-white transition">
              Entrar
            </button>

            <button className="rounded-full px-5 py-2 bg-sky-500 text-white shadow hover:bg-slate-700 transition">
              Cadastrar
            </button>
          </div>

          {/* BOTÃO MOBILE */}
          <button
            className="ml-auto md:hidden p-2"
            onClick={() => setNav(!nav)}
          >
            <svg
              className="w-6 h-6 text-gray-600"
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

        {/* MENU MOBILE */}
        {nav && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow">
            <ul className="flex flex-col p-4 gap-3 text-gray-600">
              <li>Início</li>
              <li>Oficinas</li>
              <li>Serviços</li>
              <li>Contato</li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
