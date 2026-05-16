import {
  Search,
  SlidersHorizontal,
  Star,
  ChevronRight,
  MapPin,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

// Khenny filtros de busca aprimorada com Claude.IA
import { useState } from "react";

function Oficinas(props) {
  // filtros - adicionado por Khenny
  const [busca, setBusca] = useState("");
  const [servicoFiltro, setServicoFiltro] = useState("");

  // filtros disponiveis pra serem usados
  const [avaliacaoMinima, setAvaliacaoMinima] = useState(0);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [marcasSelecionadas, setMarcasSelecionadas] = useState([]);

  // funcao ler os checkbox de filtro de servicos e atualizar a lista de filtros aplicados
  const handleFiltroCheck = (id, lista, setLista) => {
    if (lista.includes(id)) {
      setLista(lista.filter((item) => item !== id));
    } else {
      setLista([...lista, id]);
    }
  };

  // logica do filtro
  const oficinasFiltradas = props.oficinas.filter((oficina) => {
    const passaBusca = oficina.nome.toLowerCase().includes(busca.toLowerCase());
    //avaliacao
    const passaAvaliacao =
      !oficina.avaliacao || oficina.avaliacao >= avaliacaoMinima;

    // especialidades
    const especialidadesOficina =
      oficina.especialidade?.split(",").map((s) => s.trim()) || [];
    const passaServico =
      servicosSelecionados.length === 0 ||
      servicosSelecionados.some((s) => especialidadesOficina.includes(s));

    // marcas
    const marcasOficina = oficina.marcas?.split(",").map((m) => m.trim()) || [];
    const passaMarca =
      marcasSelecionadas.length === 0 ||
      marcasSelecionadas.some((m) => marcasOficina.includes(m));

    return passaBusca && passaAvaliacao && passaServico && passaMarca;
  });

  // funcao pra limpar os filtros
  const limparFiltros = () => {
    setBusca("");
    setAvaliacaoMinima(0);
    setServicoFiltro("");
    setServicosSelecionados([]);
    setMarcasSelecionadas([]);
  };

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

          <button className="text-sky-400" onClick={limparFiltros}>
            Limpar
          </button>
        </div>
        {/* div filtro tipos de servico */}
        <div className="flex-col p-6 pt-10">
          <h4 className="font-bold pb-4 text-gray-700">TIPOS DE SERVIÇO</h4>
          <div className="font-bold text-gray-800 border-b-2 pb-6">
            {/*  Mapeando os serviços dinamicamente  baseado na lista de especialidades disponivel*/}
            {Object.entries(props.mapaEspecialidades).map(([id, nome]) => (
              <div key={id} className="pb-1">
                <input
                  type="checkbox"
                  id={id}
                  checked={servicosSelecionados.includes(id)}
                  // aqui eu verifico foi selecionando. se sim eu chamo a funcao filtrocheck
                  onChange={() =>
                    handleFiltroCheck(
                      id,
                      servicosSelecionados,
                      setServicosSelecionados,
                    )
                  }
                />
                <label htmlFor={id}> {nome}</label>
              </div>
            ))}
          </div>
        </div>

        {/* div filtro marcas atendidas */}
        <div className="flex-col p-6 pt-2">
          <h4 className="font-bold pb-4 text-gray-700">MARCAS ATENDIDAS</h4>
          <div className="font-bold text-gray-800 border-b-2 grid grid-cols-2 pb-6">
            {/*  Mapeando os serviços dinamicamente  baseado na lista de marcas disponivel*/}
            {Object.entries(props.mapaMarcas).map(([id, nome]) => (
              <div key={id} className="pb-1">
                <input
                  type="checkbox"
                  id={id}
                  checked={marcasSelecionadas.includes(id)}
                  onChange={() =>
                    handleFiltroCheck(
                      id,
                      marcasSelecionadas,
                      setMarcasSelecionadas,
                    )
                  }
                />
                <label htmlFor={id}> {nome}</label>
              </div>
            ))}
          </div>
        </div>

        {/* div filtro avaliaçoes */}
        <div className="flex-col p-6 pt-2">
          <h4 className="font-bold pb-4 text-gray-700">AVALIAÇAO MÍNIMA</h4>
          <div className="font-bold text-gray-800 border-b-2 pb-6">
            <div className="flex gap-2 pb-1">
              {/*  aplicando mecanismo de filtro por avaliação, onde o usuário pode escolher a avaliação mínima que deseja ver nas oficinas listadas */}
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <input
                type="radio"
                name="avaliacao"
                onChange={() => setAvaliacaoMinima(5)}
              />
              <label> 5 Estrelas</label>
            </div>
            <div className="flex gap-2 pb-1">
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-slate-400" />
              <input
                type="radio"
                name="avaliacao"
                onChange={() => setAvaliacaoMinima(4)}
              />
              <label> 4 Estrelas +</label>
            </div>
            <div className="flex gap-2 pb-1">
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <input
                type="radio"
                name="avaliacao"
                onChange={() => setAvaliacaoMinima(3)}
              />
              <label> 3 Estrelas +</label>
            </div>
            <div className="flex gap-2 pb-1">
              <Star className="text-yellow-300" />
              <Star className="text-yellow-300" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <input
                type="radio"
                name="avaliacao"
                onChange={() => setAvaliacaoMinima(2)}
              />
              <label> 2 Estrelas +</label>
            </div>
            <div className="flex gap-2 pb-1">
              <Star className="text-yellow-300" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <Star className="text-slate-400" />
              <input
                type="radio"
                name="avaliacao"
                onChange={() => setAvaliacaoMinima(1)}
              />
              <label> 1 Estrela +</label>
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
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
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
            {/* Aqui está o segredo: 
       oficinasFiltradas tem TODAS.
       .slice(0, props.quantidadeLimite) pega do índice 0 até o limite escolhido.
    */}
            {oficinasFiltradas
              .slice(0, props.quantidadeLimite || 9) // Se não houver limite, assume 9 por segurança
              .map((oficina) => (
                <li className="p-4" key={oficina.id_oficina}>
                  <div className="shadow-md">
                    {/* ... restante do seu código (imagem, nome, etc) ... */}
                    <img
                      className="w-full rounded-t-lg"
                      src={`http://localhost:3000${oficina.foto_path}`}
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

                      <div className="flex flex-wrap gap-1 p-1 pb-2">
                        {/* aqui eu leio o mapeamento das especialidades. faço o split quando tme mais de um e mapeio o chave vs index */}
                        {oficina.especialidade
                          ?.split(",")
                          .map((chave, index) => (
                            <p
                              key={index}
                              className="bg-slate-200 text-black text-xs font-semibold rounded-full px-3 py-1 border-0 shadow-sm"
                            >
                              {props.mapaEspecialidades[chave.trim()] || chave}
                            </p>
                          ))}
                      </div>
                      <button className="border-2 w-full text-left text-gray-700 font-bold p-2 hover:bg-slate-700 hover:text-white">
                        <Link
                          className="flex justify-between"
                          to={`/oficinas/${oficina.id_oficina}`}
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
        {/* Seletor de Quantidade */}
        <div className="flex h-15 gap-2 rounded-lg py-2 px-2 justify-center m-12 border-b-2">
          <label className="text-gray-600 font-medium">Mostrar:</label>
          <select
            onChange={(e) => props.setQuantidadeLimite(Number(e.target.value))}
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="9">9 oficinas</option>
            <option value="12">12 oficinas</option>
            <option value="24">24 oficinas</option>
            <option value="50">Todas</option>
          </select>
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
