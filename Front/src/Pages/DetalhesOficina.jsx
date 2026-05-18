import {
  ArrowLeft,
  Car,
  CircleCheck,
  Mail,
  MapPin,
  MessageSquareX,
  PhoneIcon,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
//ADD Khenny
import { Link, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

//funcao pra renderizar os cards de serviços da oficina
export function ServiceCard({ titulo, descricao }) {
  // aqui eu faco o render dos cards
  return (
    <div className="flex items-start gap-4 p-4 shadow-sm border border-gray-100 rounded-xl bg-white hover:shadow-md transition">
      <div className="bg-sky-100 p-3 rounded-lg">
        <CircleCheck size={28} className="text-sky-600" />
      </div>
      <div>
        <h3 className="text-gray-900 font-bold text-lg">{titulo}</h3>
        <p className="text-gray-500 text-sm">
          {descricao || "Serviço especializado com garantia."}
        </p>
      </div>
    </div>
  );
}

function DetalhesOficina({ dados, mapaEspecialidades, mapaMarcas }) {
  const { id } = useParams();

  const oficinaSelecionada = dados.find((of) => of.id_oficina === parseInt(id));
  // ADD Khenny

  const { user } = useContext(AuthContext);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");
  const [mensagemAvaliacao, setMensagemAvaliacao] = useState("");
  // Adicione essa linha junto com os outros states (perto do mostrarForm, nota, etc.)
  const [servicoSelecionado, setServicoSelecionado] = useState(""); // state pra guardar o servico que o usuario selecionou e usar para o formulario de orçamento

  // busca as avaliacoes da oficina - Khenny
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    if (oficinaSelecionada) {
      axios
        .get(
          `http://localhost:3000/avaliacoes/${oficinaSelecionada.id_oficina}`,
        )
        .then((res) => setAvaliacoes(res.data.avaliacoes))
        .catch((err) => console.error(err));
    }
  }, [oficinaSelecionada]);

  const handleAvaliar = async (e) => {
    e.preventDefault();
    if (!user) {
      setMensagemAvaliacao("⚠️ Você precisa estar logado para avaliar.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/avaliacoes", {
        id_cliente: user.id,
        id_oficina: oficinaSelecionada.id_oficina,
        nota,
        comentario,
        data: new Date().toISOString().split("T")[0],
      });
      setMensagemAvaliacao("✅ Avaliação enviada com sucesso!");
      setMostrarForm(false);
    } catch (error) {
      setMensagemAvaliacao("❌ Erro ao enviar avaliação.");
      console.error(error);
    }
  };

  console.log({ oficinaSelecionada });
  if (!oficinaSelecionada) {
    return <h2>Oficina não encontrada</h2>;
  }

  //funcao para solcitar orcamento
  const handleSolicitarOrcamento = () => {
    //caso o botao seja pressionado sem que o usuario tenha escolhido o servico
    if (!servicoSelecionado) {
      alert("Por favor, selecione um serviço antes de solicitar o orçamento!");
      return;
    }

    console.log("Chave do serviço selecionado:", servicoSelecionado);
    console.log("ID da oficina:", oficinaSelecionada.id_oficina);

    // Exemplo de redirecionamento para a página do formulário levando a chave e a oficina na URL:
    // navigate(`/orcamento?oficina=${oficinaSelecionada.id_oficina}&servico=${servicoSelecionado}`);

    // Ou se for abrir um modal/outro formulário na mesma página, coloque a lógica aqui.
    alert(
      `Iniciando orçamento para o serviço: ${mapaEspecialidades[servicoSelecionado]}`,
    );
  };
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
            <button
              className="flex gap-2 items-center rounded-md font-bold text-lg bg-sky-500 px-10 h-10 text-sky-50 border border-transparent shadow hover:bg-slate-700 hover:text-white transition"
              onClick={() => setMostrarForm(!mostrarForm)}
            >
              <MessageSquareX />
              Avaliar Oficina
            </button>
          </div>
        </div>
        {/* imagem */}
        <div className="pt-4 rounded-md">
          <img
            className="w-full rounded-t-lg"
            src={`http://localhost:3000${oficinaSelecionada.foto_path}`}
            alt={oficinaSelecionada.nome}
          />
        </div>

        {/* UC03 - Formulário de avaliação */}
        {mostrarForm && (
          <div className="border rounded-md p-6 mt-4 bg-slate-50">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Deixe sua avaliação
            </h2>
            <form onSubmit={handleAvaliar} className="space-y-4">
              {/* Nota */}
              <div>
                <label className="text-gray-700 font-medium">
                  Nota (1 a 5)
                </label>
                <select
                  value={nota}
                  onChange={(e) => setNota(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
                >
                  <option value={1}>⭐ 1 - Ruim</option>
                  <option value={2}>⭐⭐ 2 - Regular</option>
                  <option value={3}>⭐⭐⭐ 3 - Bom</option>
                  <option value={4}>⭐⭐⭐⭐ 4 - Muito Bom</option>
                  <option value={5}>⭐⭐⭐⭐⭐ 5 - Excelente</option>
                </select>
              </div>
              {/* Comentário */}
              <div>
                <label className="text-gray-700 font-medium">Comentário</label>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Conte sua experiência com esta oficina..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="bg-sky-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-sky-600 transition"
              >
                Enviar Avaliação
              </button>
              {mensagemAvaliacao && (
                <p className="font-semibold mt-2">{mensagemAvaliacao}</p>
              )}
            </form>
          </div>
        )}

        {/* Avaliações da oficina */}
        {avaliacoes.length > 0 && (
          <div className="border rounded-md p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2 items-center">
              <Star className="text-yellow-400" /> Avaliações dos clientes
            </h2>
            {avaliacoes.map((av, index) => (
              <div key={index} className="border-b pb-4 mb-4">
                <div className="flex gap-2 items-center">
                  <p className="font-bold text-gray-800">{av.nome}</p>
                  <p className="text-yellow-500">{"⭐".repeat(av.nota)}</p>
                  <p className="text-gray-400 text-sm">{av.data}</p>
                </div>
                <p className="text-gray-600 mt-1">{av.comentario}</p>
              </div>
            ))}
          </div>
        )}

        {/* dados oficina */}
        <div className="flex">
          {/* bloco esquerda com os dados da oficina */}
          <div className="w-5/6">
            {/* sobre a oficina */}
            <div>
              <div className="flex gap-2 items-center pt-4">
                <ShieldCheck className="text-sky-400" />
                <h1 className="font-bold text-2xl text-black">
                  Sobre a Oficina
                </h1>
              </div>
              <h4 className="text-gray-600 text-xl pt-4">
                {oficinaSelecionada.descricao}
              </h4>
            </div>
            {/* nossos serviços */}
            <section className="pt-6">
              <div className="flex gap-2 items-center border-b border-gray-100 pb-2">
                <Wrench className="text-sky-500" />
                <h1 className="font-bold text-2xl text-black">
                  Nossos Serviços
                </h1>
              </div>
              {/* mapeando os servicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {oficinaSelecionada.especialidade
                  ?.split(",")
                  .map((chave) => chave.trim())
                  .filter((chave) => mapaEspecialidades[chave]) // Só renderiza se a chave existir no mapa
                  .map((chave) => (
                    <ServiceCard
                      key={chave}
                      titulo={mapaEspecialidades[chave]}
                      descricao={`Especialistas em ${mapaEspecialidades[chave].toLowerCase()}.`}
                    />
                  ))}
              </div>
            </section>
            {/* marcas atendidas */}
            <div className="pt-6">
              <div className="flex gap-2 items-center pt-4">
                <Car className="text-sky-400" />
                <h1 className="font-bold text-2xl text-black">
                  Marcas Atendidas
                </h1>
              </div>
              <div className="">
                {/* Transformamos a div estática em um container flexível e dinâmico */}
                <div className="flex flex-wrap gap-2 m-4">
                  {oficinaSelecionada.marcas ? (
                    oficinaSelecionada.marcas.split(",").map((chave) => {
                      const nomeMarca = mapaMarcas[chave.trim()];

                      // Se a chave existir no mapa, renderiza o "badge" da marca
                      return nomeMarca ? (
                        <p
                          key={chave}
                          className="text-black p-1 px-3 bg-slate-100 rounded-md border border-gray-300 text-sm"
                        >
                          {nomeMarca}
                        </p>
                      ) : null;
                    })
                  ) : (
                    <p className="text-gray-500 italic">
                      Consulte as marcas atendidas diretamente com a oficina.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* painel direita */}
          <div className="bg-slate-100 rounded-md p-6 mt-2">
            {/* informacoes de contato */}
            <div className="margin-bottom-4 border-b border-gray-300 pb-4">
              <h1 className="font-bold text-2xl text-black text-center pb-4">
                Informações de Contato
              </h1>
              {/* endereco */}
              <div className="flex gap-2 p-2 text-gray-700sm items-center">
                <MapPin className="text-sky-500" />
                <p>{oficinaSelecionada.endereco}</p>
              </div>
              {/* telefone */}
              <div className="flex gap-2 p-2 text-gray-700sm items-center">
                <PhoneIcon className="text-sky-500" />
                <p>{oficinaSelecionada.telefone}</p>
              </div>
              {/* horario */}
              <div className="flex gap-2 p-2 text-gray-700sm items-center">
                <Mail className="text-sky-500" />
                <p>{oficinaSelecionada.email}</p>
              </div>
            </div>
            <div className="pt-4">
              <div className="flex flex-col gap-3 border-b border-gray-300 text-center">
                <label className="font-bold text-lgs text-black text-center">
                  Selecione o serviço desejado:
                </label>
                <select
                  value={servicoSelecionado}
                  onChange={(e) => setServicoSelecionado(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Escolha um serviço
                  </option>
                  {oficinaSelecionada.especialidade ? (
                    oficinaSelecionada.especialidade
                      .split(",")
                      .map((chave) => chave.trim())
                      .filter((chave) => mapaEspecialidades[chave]) // Garante que existe no mapa
                      .map((chave) => (
                        <option key={chave} value={chave}>
                          {mapaEspecialidades[chave]}
                        </option>
                      ))
                  ) : (
                    <option disabled>Nenhum serviço disponível</option>
                  )}
                </select>
              </div>

              <div className="pt-4 px-4">
                <button
                  className="w-full flex gap-2 items-center justify-center rounded-md text-lg bg-sky-500 py-2 text-sky-50 border border-transparent shadow hover:bg-slate-700 transition font-bold"
                  onClick={handleSolicitarOrcamento}
                >
                  Solicitar Orçamento
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesOficina;
