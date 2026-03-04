import {
  Search,
  SlidersHorizontal,
  Star,
  ChevronRight,
  MapPin,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
//import oficinas from "../App.jsx";

function Oficinas(props) {
  return (
    // div principal
    <div className="flex">
      {/* -------------------- */}
      {/* div do filtro - bloco da esquerda*/}
      {/* -------------------- */}
      <div className="border bg-slate-100 w-1/4">
        <div className="flex gap-2 justify-between p-6">
          <div className="flex gap-2 items-center">
            <SlidersHorizontal className="text-sky-400" />
            <h1 className="font-bold text-3xl text-black">Filtros</h1>
          </div>

          <button className="text-sky-400">Limpar</button>
        </div>
        {/* div filtro tipos de servico */}
        <div className="flex-col p-6 pt-10">
          <h4 className="font-bold pb-4 text-gray-700">TIPOS DE SERVIÇO</h4>
          <div className="font-bold text-gray-800 border-b-2 pb-6">
            <div className="pb-1">
              <input type="checkbox" id="motor" />
              <label htmlFor="motor"> Motor e Transmissão</label>
            </div>
            <div className="pb-1">
              <input type="checkbox" id="freios" />
              <label htmlFor="freios"> Freios de Suspensão</label>
            </div>
            <div className="pb-1">
              <input type="checkbox" id="eletrica" />
              <label htmlFor="eletrica"> Elétrica e Baterias</label>
            </div>
            <div className="pb-1">
              <input type="checkbox" id="ar" />
              <label htmlFor="ar"> Ar Condicionado</label>
            </div>
            <div className="pb-1">
              <input type="checkbox" id="pneus" />
              <label htmlFor="pneus"> Pneus e Alinhamento</label>
            </div>
          </div>
        </div>

        {/* div filtro marcas atendidas */}
        <div className="flex-col p-6 pt-2">
          <h4 className="font-bold pb-4 text-gray-700">MARCAS ATENDIDAS</h4>
          <div className="font-bold text-gray-800 border-b-2 grid grid-cols-2 pb-6">
            <div className="pb-1">
              <input type="checkbox" id="toyota" />
              <label htmlFor="toyota"> Toyota</label>
            </div>

            <div className="pb-1">
              <input type="checkbox" id="chevrolet" />
              <label htmlFor="chevrolet"> Chevrolet</label>
            </div>

            <div className="pb-1">
              <input type="checkbox" id="honda" />
              <label htmlFor="honda"> Honda</label>
            </div>

            <div className="pb-1">
              <input type="checkbox" id="hyundai" />
              <label htmlFor="hyundai"> Hyundai</label>
            </div>

            <div className="pb-1">
              <input type="checkbox" id="volkswagen" />
              <label htmlFor="volkswagen"> Volkswagen</label>
            </div>

            <div className="pb-1">
              <input type="checkbox" id="ford" />
              <label htmlFor="ford"> Ford</label>
            </div>

            <div className="pb-1">
              <input type="checkbox" id="fiat" />
              <label htmlFor="fiat"> Fiat</label>
            </div>

            <div className="pb-1">
              <input type="checkbox" id="renault" />
              <label htmlFor="renault"> Renault</label>
            </div>
          </div>
        </div>

        {/* div filtro avaliaçoes */}
        <div className="flex-col p-6 pt-2">
          <h4 className="font-bold pb-4 text-gray-700">AVALIAÇAO MÍNIMA</h4>
          <div className="font-bold text-gray-800 border-b-2 pb-6">
            <div className="flex gap-2 pb-1">
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <input type="checkbox" id="5" />
              <label htmlFor="5"> 5 Estrelas</label>
            </div>
            <div className="flex gap-2 pb-1">
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-slate-400" />
              <input type="checkbox" id="4" />
              <label htmlFor="4"> 4 Estrelas +</label>
            </div>
            <div className="flex gap-2 pb-1">
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <input type="checkbox" id="3" />
              <label htmlFor="3"> 3 Estrelas +</label>
            </div>
            <div className="flex gap-2 pb-1">
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <input type="checkbox" id="2" />
              <label htmlFor="2"> 2 Estrelas +</label>
            </div>
            <div className="flex gap-2 pb-1">
              <Star className="text-yellow-300" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <input type="checkbox" id="1" />
              <label htmlFor="1"> 1 Estrela +</label>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------- */}
      {/* div detalhes oficina - bloco da direita*/}
      {/* -------------------- */}
      <div className="p-10 w-3/4 border">
        {/* div titulo e caixa de pesquisa */}
        <div className="flex">
          <div className=" w-3/6">
            <h2 className="text-3xl text-black font-bold text-left">
              Oficinas em São Paulo
            </h2>
            <p className="text-gray-600 text-md text-left">
              Encontramos 6 oficinas mecânicas especializadas para você.
            </p>
          </div>
          <div className="flex gap-2 items-center pl-2 pr-2 w-3/6 justify-end">
            <div className="flex gap-2 border p-4">
              <Search />
              <input
                className="bg-slate-50 w-96"
                type="text"
                placeholder="Buscar oficina por nome..."
              ></input>
            </div>
          </div>
        </div>
        <div className="pt-10 flex gap-2">
          <p>Ordenar por:</p>
          <button className="border rounded-full">Mais Relevantes</button>
          <button>Melhor Avaliadas</button>
          <button>Mais Próximas</button>
          <button>Orçamento Grátis</button>
        </div>

        {/* Detalhes oficinas - GRID*/}
        <div className="">
          <ul className="rounded-md grid grid-cols-3">
            {/* usei o chatgpt para me explicar o mapeamento oficinas e renderizar cada oficina dentro de um li
          referencia https://react.dev/learn/rendering-lists*/}
            {/* adicionei tbm a validacao de props pois vscode estava reclamado */}
            {props.oficinas.map((oficina) => (
              <li className="p-4" key={oficina.id}>
                <div className="shadow-md">
                  {/* componentes */}
                  <img
                    className="w-full rounded-t-lg"
                    src={oficina.imagem}
                    alt={oficina.nome}
                  />
                  <div className="p-4">
                    <h2 className="text-2xl text-black font-bold text-left p-2">
                      {oficina.nome}
                    </h2>

                    <div className="flex gap-1 p-2 text-gray-700">
                      <MapPin />
                      <p>{oficina.endereco}</p>
                    </div>

                    <div className="flex p-1 pb-2">
                      <p className="bg-slate-200 rounded-full p-2 border-0">
                        {oficina.especialidade}
                      </p>
                    </div>
                    <button className="border-2 w-full text-left text-gray-700 font-bold p-2 hover:bg-slate-700 hover:text-white">
                      <Link
                        className="flex justify-between"
                        to={`/oficinas/${oficina.id}`}
                      >
                        {" "}
                        Ver Detalhes
                        <ChevronRight />
                      </Link>
                    </button>
                  </div>
                  <div className="flex p-4 pt-0 gap-2">
                    <Star />
                    <p>{oficina.avaliacao}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* paginas */}
        <div className="flex gap-3 justify-center p-8">
          <button className="border rounded-md p-2"> Anterior </button>
          <button className="border rounded-md p-2"> 1 </button>
          <button className="border rounded-md p-2"> 2 </button>
          <button className="border rounded-md p-2"> 3 </button>
          <button className="border rounded-md p-2"> Próximo </button>
        </div>

        {/* bloco supporte */}
        <div className="bg-sky-50 flex h-15 gap-2 rounded-lg py-2 px-2 justify-between m-4 border-dashed border-gray-200 border-2">
          {/* div icone e text */}
          <div className="flex">
            {/* botao */}
            <div className="w-32 flex items-center justify-center">
              <Wrench
                size={86}
                className="text-sky-500 p-4 bg-sky-200 rounded-full"
              />
            </div>
            {/* texto */}
            <div className="flex-col w-4/5">
              <p className="font-bold text-black text-2xl p-2 m-2">
                Não encontrou o que precisava?
              </p>
              <p className="text-gray-600 text-xl p-2 m-2">
                Cadastre seu estabelecimento no Meu Mecânico e alcance centenas
                de novos clientes na sua região todos os meses.
              </p>
            </div>
          </div>
          {/* botao */}
          <div className="content-center w-2/6 pr-6">
            <button className="rounded-md font-bold text-lg bg-sky-500 px-10 h-16 text-sky-50 border border-transparent shadow hover:bg-slate-700 hover:text-white transition">
              Falar com Suporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Oficinas;
