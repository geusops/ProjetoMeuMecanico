import {
  ArrowLeft,
  Car,
  CircleCheck,
  Clock,
  MapPin,
  MessageSquareX,
  PhoneIcon,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

function DetalhesOficina({ dados }) {
  const { id } = useParams();

  const oficinaSelecionada = dados.find((of) => of.id === parseInt(id));
  console.log({ oficinaSelecionada });
  if (!oficinaSelecionada) {
    return <h2>Oficina não encontrada</h2>;
  }
  return (
    // div de fundo
    <div>
      {/* div conteudo */}
      <div className="ml-80 mr-80 mt-8 mb-8 p-4">
        <div className="text-gray-700 mb-10">
          <Link className="flex gap-6" to="/oficinas">
            <ArrowLeft />
            <p>Voltar para lista de oficinas</p>
          </Link>
        </div>
        {/* titulo oficina */}
        <div className="flex justify-between ">
          <h2 className="text-5xl text-black font-bold text-left">
            {oficinaSelecionada.nome}
          </h2>
          <div className="flex gap-4 items-center">
            <Star />
            <p>{oficinaSelecionada.avaliacao}</p>
            <button className="flex gap-2 items-center rounded-md font-bold text-lg bg-sky-500 px-10 h-10 text-sky-50 border border-transparent shadow hover:bg-slate-700 hover:text-white transition">
              <MessageSquareX />
              Avaliar Oficina
            </button>
          </div>
        </div>
        {/* imagem */}
        <div className="pt-4 rounded-md">
          <img
            className="w-full rounded-t-lg"
            src={oficinaSelecionada.imagem}
            alt={oficinaSelecionada.nome}
          />
        </div>

        {/* dados oficina */}
        <div className="flex">
          {/* bloco esquerda com os dados da oficina */}
          <div>
            {/* sobre a oficina */}
            <div>
              <div className="flex gap-2 items-center pt-4">
                <ShieldCheck className="text-sky-400" />
                <h1 className="font-bold text-2xl text-black">
                  Sobre a Oficina
                </h1>
              </div>
              <h4 className="text-gray-600 text-xl pt-4">
                Pesquise por localização, compare serviços e agende com
                tranquilidade nas oficinas mais bem avaliadas da região.
              </h4>
            </div>
            {/* nossos serviços */}
            <div className="pt-6">
              <div className="flex gap-2 items-center pt-4">
                <Wrench className="text-sky-400" />
                <h1 className="font-bold text-2xl text-black">
                  Nossos Serviços
                </h1>
              </div>
              <div className="grid grid-cols-2">
                {/* item servicos */}
                <div className="flex shadow m-2 rounded-md">
                  <div className="pt-4 pl-2">
                    <CircleCheck
                      size={48}
                      className="text-sky-500 bg-sky-200 rounded-md border-1 p-3"
                    />
                  </div>
                  <div className="p-4">
                    <h1 className="text-black text-xl font-bold pb-5">
                      Revisão Geral
                    </h1>
                    <p className="text-gray-600">
                      Troca de óleo, filtros e inspeção de 40 itens de segurança
                    </p>
                  </div>
                </div>
                {/* item servicos */}
                <div className="flex shadow m-2 rounded-md">
                  <div className="pt-4 pl-2">
                    <CircleCheck
                      size={48}
                      className="text-sky-500 bg-sky-200 rounded-md border-1 p-3"
                    />
                  </div>
                  <div className="p-4">
                    <h1 className="text-black text-xl font-bold pb-5">
                      Revisão Geral
                    </h1>
                    <p className="text-gray-600">
                      Troca de óleo, filtros e inspeção de 40 itens de segurança
                    </p>
                  </div>
                </div>
                {/* item servicos */}
                <div className="flex shadow m-2 rounded-md">
                  <div className="pt-4 pl-2">
                    <CircleCheck
                      size={48}
                      className="text-sky-500 bg-sky-200 rounded-md border-1 p-3"
                    />
                  </div>
                  <div className="p-4">
                    <h1 className="text-black text-xl font-bold pb-5">
                      Revisão Geral
                    </h1>
                    <p className="text-gray-600">
                      Troca de óleo, filtros e inspeção de 40 itens de segurança
                    </p>
                  </div>
                </div>
                {/* item servicos */}
                <div className="flex shadow m-2 rounded-md">
                  <div className="pt-4 pl-2">
                    <CircleCheck
                      size={48}
                      className="text-sky-500 bg-sky-200 rounded-md border-1 p-3"
                    />
                  </div>
                  <div className="p-4">
                    <h1 className="text-black text-xl font-bold pb-5">
                      Revisão Geral
                    </h1>
                    <p className="text-gray-600">
                      Troca de óleo, filtros e inspeção de 40 itens de segurança
                    </p>
                  </div>
                </div>
                {/* item servicos */}
                <div className="flex shadow m-2 rounded-md">
                  <div className="pt-4 pl-2">
                    <CircleCheck
                      size={48}
                      className="text-sky-500 bg-sky-200 rounded-md border-1 p-3"
                    />
                  </div>
                  <div className="p-4">
                    <h1 className="text-black text-xl font-bold pb-5">
                      Revisão Geral
                    </h1>
                    <p className="text-gray-600">
                      Troca de óleo, filtros e inspeção de 40 itens de segurança
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* marcas atendidas */}
            <div className="pt-6">
              <div className="flex gap-2 items-center pt-4">
                <Car className="text-sky-400" />
                <h1 className="font-bold text-2xl text-black">
                  Marcas Atendidas
                </h1>
              </div>
              <div className="">
                {/* item servicos */}
                <div className="flex gap-2 m-4">
                  <p className="text-black p-1 bg-slate-100 rounded-full border border-gray-300">
                    Toyota
                  </p>
                  <p className="text-black p-1 bg-slate-100 rounded-full border border-gray-300">
                    Volkswagem
                  </p>
                  <p className="text-black p-1 bg-slate-100 rounded-full border border-gray-300">
                    Chevrolet
                  </p>
                  <p className="text-black p-1 bg-slate-100 rounded-full border border-gray-300">
                    Fiat
                  </p>
                  <p className="text-black p-1 bg-slate-100 rounded-full border border-gray-300">
                    BMW
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* painel direita */}
          <div className="bg-slate-100 rounded-md w-2/4 p-6 mt-2">
            <h1 className="font-bold text-2xl text-black">Onde Estamos</h1>
            <div className="flex gap-2 p-2 text-gray-700sm">
              <MapPin className="text-sky-500" />
              <p>{oficinaSelecionada.endereco}</p>
            </div>
            <div className="flex gap-2 p-2 text-gray-700">
              <PhoneIcon className="text-sky-500" />
              <p>{oficinaSelecionada.telefone}</p>
            </div>
            <div className="flex gap-2 p-2 text-gray-700sm">
              <Clock className="text-sky-500" />
              <p>{oficinaSelecionada.horario}</p>
            </div>
            <button className="flex gap-2 items-center rounded-md text-lg bg-sky-500 px-10 h-10 text-sky-50 border border-transparent shadow hover:bg-slate-700 hover:text-white transition">
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesOficina;
