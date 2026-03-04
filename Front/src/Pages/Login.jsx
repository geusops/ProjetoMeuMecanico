import { ArrowLeft, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-simples.png";

function Login() {
  return (
    <div>
      {/* botao de voltar */}
      <div className="p-6 ">
        <div className="text-gray-700 mb-10">
          <Link className="flex gap-6" to="/">
            <ArrowLeft />
            <p>Voltar para a página inicial</p>
          </Link>
        </div>
      </div>
      <div className="ml-96 mr-96 pl-36 pr-36">
        {/* logo e descricao */}
        <div className="pt-6 shadow">
          <div className="justify-items-center">
            <a className="flex gap-2">
              <img src={logo} alt="Logo Meu Mecânico" className="h-10 w-auto" />
              <span className="font-bold text-4xl text-sky-500">
                Meu Mecânico
              </span>
            </a>
            <p className=" text-gray-600 text-center text-lg mr-32 ml-32 m-2">
              Sua plataforma de confiança para manutenção automotiva
            </p>
          </div>

          {/* bem vindo */}
          <div className="p-4 border-t-2 pt-8">
            <h2 className="text-2xl text-black font-bold text-left">
              Bem-vindo de volta
            </h2>
            <p className="text-gray-600 text-lg text-left">
              Insira suas credenciais para acessar sua conta.
            </p>
          </div>
          {/* formulario login*/}
          <div className="p-4 m-2">
            {/* email */}
            <div className="">
              <p className="text-gray-600 text-lg text-left">E-mail</p>
              <div className="flex gap-2 bg-slate-50 border p-2 mt-2">
                <Mail className="text-gray-600" />
                <input
                  type="text"
                  placeholder="seu@email.com"
                  className="bg-slate-50"
                />
              </div>
            </div>
            {/* senha */}
            <div className="pt-2">
              <div className="flex gap-2 justify-between">
                <p className="text-gray-600 text-lg text-left">Senha</p>
                <p className="text-sky-500 text-md text-left">
                  Esqueceu a senha?
                </p>
              </div>
              <div className="flex gap-2 bg-slate-50 border p-2 mt-2">
                <Lock className="text-gray-600" />
                <input type="password" className="bg-slate-50" />
              </div>
            </div>
            {/* lembrar dispositivo */}
            <div className="pt-4 flex gap-2">
              <input type="checkbox" className="text-2xl" />
              <p className="font-bold">Lembrar dispositivo</p>
            </div>
            {/* botao entrar */}
            <div className="justify-items-center p-8">
              <button className="flex gap-2 items-center rounded-md text-lg bg-sky-500 px-32 h-10 text-sky-50 border border-transparent shadow hover:bg-slate-700 hover:text-white transition">
                Entrar na Conta
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
export default Login;
