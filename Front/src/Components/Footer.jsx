/* Footer.jsx */
/** @format */
// Import necessary libraries
import logo from "../assets/logo-simples.png"; // Certifique-se de que o caminho para o logo esteja correto
import { FacebookIcon, Instagram, X, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5 bg-slate-100 border-t-2">
      <div className="text-center flex">
        {/* Logo meu mecanico e texto */}
        <div className="flex-col items-center px-6 w-2/5 bg-slate-100 rounded-lg p-6 m-6">
          {/* logo */}
          <a className="flex items-center gap-2 p-2 m-2">
            <img src={logo} alt="Logo Meu Mecânico" className="h-10 w-auto" />
            <span className="font-bold text-xl text-sky-500">Meu Mecânico</span>
          </a>
          {/* texto */}
          <p className="text-left text-gray-600 text-xl p-2 m-2">
            Conectando motoristas às melhores oficinas e mecânicos da região com
            transparência e facilidade
          </p>
        </div>

        {/* Links úteis*/}
        <div className="flex-col items-center px-6 bg-slate-100 rounded-lg p-6 m-6">
          <p className="text-lg font-bold text-left px-4">Links úteis</p>
          <a
            href="https://www.instagram.com"
            className="flex text-light mx-3 p-1 m-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i> Sobre nós
          </a>
          <a
            href="https://www.youtube.com"
            className="flex text-light mx-3 p-1 m-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube"></i> Perguntas frequentes
          </a>
          <a
            href="https://www.facebook.com"
            className="flex text-light mx-3 p-1 m-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i> Privacidade
          </a>
          <a
            href="https://www.twitter.com"
            className="flex text-light mx-3 p-1 m-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i> Termos de uso
          </a>
        </div>

        {/* Redes sociais */}
        <div className=" ml-auto  md:flex flex-col px-6 bg-slate-100 rounded-lg p-6 m-6 w-2/6">
          <p className="text-lg font-bold text-left px-4">Redes sociais</p>
          <div className="flex">
            <a
              href="https://www.instagram.com"
              className="flex text-light mx-3 p-1 m-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </a>
            <a
              href="https://www.youtube.com"
              className="flex text-light mx-3 p-1 m-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube />
            </a>
            <a
              href="https://www.facebook.com"
              className="flex text-light mx-3 p-1 m-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.twitter.com"
              className="flex text-light mx-3 p-1 m-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <X />
            </a>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t-2 p-10 w-full text-center text-gray-600">
        <p>&copy; 2026, Meu mecânico. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
