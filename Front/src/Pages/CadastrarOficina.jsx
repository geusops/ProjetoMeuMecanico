import {
  Info,
  MapPin,
  StoreIcon,
  WrenchIcon,
  ArrowLeft,
  CircleCheck,
} from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CadastrarOficina() {
  //
  // INÍCIO - bloco dos sets e states
  //

  // checa qual botao esta ativo
  const [ativo, setAtivo] = useState("minha_oficina"); // Estado do endereço (CEP, rua, etc)
  const [servicos, setServicos] = useState([]); // ref aos checkboxes de serviços
  const [marcas, setMarcas] = useState([]); // ref aos checkboxes de marcas
  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  }); // ref o formulario de endereco para envio ao backend

  // estado para os campos da oficina - adicionado para envio ao backend
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });
  const [mensagem, setMensagem] = useState("");

  //
  // FIM - bloco dos sets e states
  //

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // https://www.w3schools.com/react/react_forms_checkbox.asp
  // https://dev.to/collegewap/how-to-work-with-checkboxes-in-react-44bc
  // handler para os checkboxes de serviços.
  const handleServico = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setServicos([...servicos, value]); // aqui a gente adiciona o serviço selecionado no array de serviço
    } else {
      setServicos(servicos.filter((item) => item !== value));
    }
  };

  // handler para os checkboxes de marcas.
  const handleMarca = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMarcas([...marcas, value]); // aqui a gente adiciona o serviço selecionado no array de marcas
    } else {
      setMarcas(marcas.filter((item) => item !== value));
    }
  };

  console.log("Usuário logado:", user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    const enderecoCompleto = `${endereco.rua}, ${endereco.numero || "s/n"} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, Brasil`;
    try {
      // convertendo CEP em coordenadas via OpenStreetMap
      let lat = null;
      let lon = null;
      try {
        const geo = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${endereco.cep},Brasil&countrycodes=br&email=geuso002@gmail.com`,
        ); // aqui nós fazemos a requisicao para a API passando o cep como query.
        // precisei add meu email pessoa pq requisicao assim o openstreemaps nao aceita e dava um erro de CORS:
        // https://operations.osmfoundation.org/policies/nominatim/#requirements
        const geoData = await geo.json();
        console.log(geoData);
        if (geoData.length > 0) {
          lat = parseFloat(geoData[0].lat);
          lon = parseFloat(geoData[0].lon);
        }
        //com o retorno da api pegamos as coordenadas e atribuimos a lat e lon
        console.log("Coordenadas obtidas:", lat, lon);
      } catch (e) {
        console.log("Não foi possível obter coordenadas", e.Message);
      }

      await axios.post("http://localhost:3000/oficinas", {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        endereco: enderecoCompleto,
        especialidade: servicos.join(","), // aqui a gente junta os serviços caso haja mais que um selecionado
        marcas: marcas.join(","), // aqui a gente junta os marcas caso haja mais que um selecionado
        latitude_oficina: lat,
        longitude_oficina: lon,
        id_mecanico: user?.id || 1,
      });
      setMensagem("✅ Oficina cadastrada com sucesso!");
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      setMensagem("❌ Erro ao cadastrar. Tente novamente.");
      console.error(error);
    }
  };

  //referencia:
  //https://www.youtube.com/watch?v=155ywtYSpdY
  const consultaCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");

    if (!cep) return;

    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((res) => res.json())
      .then((data) => {
        setEndereco({
          ...endereco,
          rua: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
        });
      });
  };

  //usando o botao para limpar os campos autopreenchidos
  const limparEndereco = () => {
    setEndereco({
      ...endereco,
      cep: "",
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
    });
  };

  //IA ajudou aqui. Para permitir que o usuario digite os campos
  //Sem isso o campo ficava travado com o valor ou da api ou vazio
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({
      ...prev, // Mantém o que já estava preenchido
      [name]: value, // Atualiza apenas o campo que mudou (ex: 'rua', 'cidade')
    }));
  };

  return (
    <div className="flex">
      {/* abas */}
      <div className="p-6 pt-10 w-1/6 border">
        <button
          className="rounded-md text-sky-400 font-bold p-2 w-full bg-sky-100 flex justify-start"
          onClick={() => setAtivo("minha_oficina")}
        >
          <NavLink
            to="/minha-oficina"
            className={({ isActive }) =>
              isActive ? "bg-sky-100 text-sky-400" : "text-slate-400"
            }
          >
            Minha Oficina
          </NavLink>
        </button>
        <button
          className="rounded-md text-slate-400 font-bold p-2 w-full flex justify-start"
          onClick={() => setAtivo("avaliacoes")}
        >
          <NavLink
            to="/minha-oficina"
            className={({ isActive }) =>
              isActive ? "bg-sky-100 text-sky-400" : "text-slate-400"
            }
          >
            Avaliações
          </NavLink>
        </button>
        <button
          className="rounded-md text-slate-400 font-bold p-2 w-full flex justify-start"
          onClick={() => setAtivo("agendamentos")}
        >
          Agendamentos
        </button>
        <button
          className="rounded-md text-slate-400 font-bold p-2 w-full flex justify-start"
          onClick={() => setAtivo("financeiro")}
        >
          Financeiro
        </button>
      </div>
      {/* tela cadastro */}

      <div className="w-full p-24 ml-16 mr-16">
        <div className="">
          {/* titulo */}
          <div className="p-4">
            <h2 className="text-3xl text-black font-bold text-left">
              Cadastrar nova oficina
            </h2>
            <p className="text-gray-600 text-md text-left">
              Preencha os dados abaixo para que os cliente encontrem seu
              estabelecimento
            </p>
          </div>
          {/* informacoes da oficina */}
          <div className="border rounded-sm p-4">
            {/* titulo do formulario e icone */}
            <div className="flex gap-2 pl-6">
              {/* icone */}
              <div className="content-center">
                <StoreIcon
                  size={48}
                  className="text-sky-500 bg-sky-200 rounded-md border-1 p-3"
                />
              </div>
              {/* texto */}
              <div className="content-between pl-4 pt-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Informações do Estabelecimento
                </h2>
                <p className="text-gray-600 mb-8">
                  Identifique sua oficina para os usuários do Meu Mecânico.
                </p>
              </div>
            </div>
            {/* formulario */}
            <div className="">
              <form className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  {/* Campo nome */}
                  <div className="">
                    <div className="flex gap-2">
                      <label className="text-gray-700 font-medium">
                        Nome da Oficina
                      </label>
                      <p className="text-red-600">*</p>
                    </div>
                    <div className="text-gray-500">
                      <input
                        type="text"
                        name="nome"
                        placeholder="Ex: Auto Mecânica Silva"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        required
                        value={form.nome}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  {/* Campo email */}
                  <div className="">
                    <div className="flex gap-2">
                      <label className="text-gray-700 font-medium">
                        E-mail de contato profissional
                      </label>
                      <p className="text-red-600">*</p>
                    </div>
                    <div className="text-gray-500">
                      <input
                        type="text"
                        name="email"
                        placeholder="contato@oficina.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        required
                        value={form.email}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  {/* Campo telefone */}
                  <div className="">
                    <div className="flex gap-2">
                      <label className="text-gray-700 font-medium">
                        Telefone / WhatsApp
                      </label>
                      <p className="text-red-600">*</p>
                    </div>
                    <div className="relative absolute text-gray-500">
                      <input
                        type="text"
                        name="telefone"
                        placeholder="(11) 91234-5678)"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        required
                        value={form.telefone}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  {/* Campo cnpj */}
                  <div className="">
                    <label className="block text-gray-700 font-medium">
                      CNPJ (Opcional)
                    </label>
                    <div className="relative absolute text-gray-500">
                      <input
                        type="text"
                        name="nome"
                        placeholder="00.123.456/0001-00"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Campo Descricao */}
                <div className="">
                  <div className="flex gap-2">
                    <label className="text-gray-700 font-medium">
                      Descrição da oficina
                    </label>
                    <p className="text-red-600">*</p>
                  </div>
                  <div className="relative absolute text-gray-500">
                    <textarea
                      name="descricao"
                      id="descricao"
                      placeholder="Conte um pouco sobre a história, equipe e diferenciais da sua oficina..."
                      className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* especialidade e marcas */}
          <div className="border rounded-sm p-4 mt-6">
            {/* titulo do formulario e icone */}
            <div className="flex gap-2 pl-6">
              {/* icone */}
              <div className="content-center">
                <WrenchIcon
                  size={48}
                  className="text-sky-500 bg-sky-200 rounded-md border-1 p-3"
                />
              </div>
              {/* texto */}
              <div className="content-between pl-4 pt-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Especialidades e Marcas
                </h2>
                <p className="text-gray-600 mb-8">
                  Quais serviços você oferece e quais veículos você atende?
                </p>
              </div>
            </div>
            {/* formulario */}
            <div>
              {/* servicos oferecidos */}
              <div className="flex-col p-6 pt-10">
                <h4 className="font-bold pb-4 text-black">
                  Serviços oferecidos
                </h4>
                <div className="text-gray-600 pb-6 grid grid-cols-3">
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="motor"
                      value="e1"
                      onChange={handleServico}
                    />
                    <label htmlFor="motor"> Motor e Transmissão</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="freios"
                      value="e2"
                      onChange={handleServico}
                    />
                    <label htmlFor="freios"> Freios e Suspensão</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="eletrica"
                      value="e3"
                      onChange={handleServico}
                    />
                    <label htmlFor="eletrica"> Elétrica e Baterias</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="ar"
                      value="e4"
                      onChange={handleServico}
                    />
                    <label htmlFor="ar"> Ar-Condicionado</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="pneus"
                      value="e5"
                      onChange={handleServico}
                    />
                    <label htmlFor="pneus"> Pneus e Alinhamento</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="troca-oleo"
                      value="e6"
                      onChange={handleServico}
                    />
                    <label htmlFor="troca-oleo"> Troca de óleo</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="ingecao"
                      value="e7"
                      onChange={handleServico}
                    />
                    <label htmlFor="ingecao"> Injeção eletrônica</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="pintura"
                      value="e8"
                      onChange={handleServico}
                    />
                    <label htmlFor="pintura"> Pintura e Funilaria</label>
                  </div>
                </div>
              </div>
              {/* Marcas atendidas */}
              <div className="flex-col p-6 pt-10">
                <div className=" pb-4">
                  <h4 className="font-bold text-black">Marcas atendidas</h4>
                  <p className="text-sm text-gray-600">
                    Seleciona as principais marcas
                  </p>
                </div>
                <div className="text-gray-600 pb-6 grid grid-cols-3">
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="chevrolet"
                      value="m1"
                      onChange={handleMarca}
                    />
                    <label htmlFor="chevrolet"> Chevrolet</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="vw"
                      value="m2"
                      onChange={handleMarca}
                    />
                    <label htmlFor="vw"> Volkswagen</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="fiat"
                      value="m3"
                      onChange={handleMarca}
                    />
                    <label htmlFor="fiat"> Fiat</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="honda"
                      value="m4"
                      onChange={handleMarca}
                    />
                    <label htmlFor="honda"> Honda</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="toyota"
                      value="m5"
                      onChange={handleMarca}
                    />
                    <label htmlFor="toyota"> Toyota</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="nissan"
                      value="m6"
                      onChange={handleMarca}
                    />
                    <label htmlFor="nissan"> Nissan</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="renault"
                      value="m7"
                      onChange={handleMarca}
                    />
                    <label htmlFor="renault"> Renault</label>
                  </div>
                  <div className="pb-1">
                    <input
                      type="checkbox"
                      id="outros"
                      value="m8"
                      onChange={handleMarca}
                    />
                    <label htmlFor="outros"> Outros</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* localizacao */}
          <div className="border rounded-sm p-4 mt-6">
            {/* titulo do formulario e icone */}
            <div className="flex gap-2 pl-6">
              {/* icone */}
              <div className="content-center">
                <MapPin
                  size={48}
                  className="text-sky-500 bg-sky-200 rounded-md border-1 p-3"
                />
              </div>
              {/* texto */}
              <div className="content-between pl-4 pt-6">
                <h2 className="text-xl font-bold text-gray-800">Localização</h2>
                <p className="text-gray-600 mb-8">
                  Onde seus cliente podem encontrar sua oficina?
                </p>
              </div>
            </div>
            {/* formulario */}
            <div>
              {/* formulario */}
              <div className="">
                <form className="p-4">
                  <div className="">
                    {/* primeira linha */}
                    <div className="mb-2 w-full gap-2 flex">
                      {/* Campo cep */}
                      <div className="">
                        <div className="flex gap-2">
                          <label className="text-gray-700 font-medium">
                            CEP
                          </label>
                          <p className="text-red-600">*</p>
                        </div>
                        <div className="text-gray-500 flex gap-2">
                          <input
                            type="text"
                            name="cep"
                            placeholder="00000-000"
                            onBlur={consultaCEP}
                            onChange={handleChange}
                            value={endereco.cep}
                            className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            required
                          />
                          {/* botao */}
                          <button
                            onClick={limparEndereco}
                            className="text-gray-700 bg-slate-200 rounded-md p-2"
                          >
                            Limpar
                          </button>
                        </div>
                      </div>
                      {/* Campo rua */}
                      <div className="w-full">
                        <div className="flex gap-2">
                          <label className="text-gray-700 font-medium">
                            Logradouro (Rua/Avenida/Travessa)
                          </label>
                          <p className="text-red-600">*</p>
                        </div>
                        <div className="text-gray-500">
                          <input
                            type="text"
                            name="rua"
                            placeholder="Rua das Peças"
                            value={endereco.rua}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      {/* Campo numero */}
                      <div className="w-1/6">
                        <div className="flex gap-2">
                          <label className="text-gray-700 font-medium">
                            Número
                          </label>
                          <p className="text-red-600">*</p>
                        </div>
                        <div className="text-gray-500">
                          <input
                            type="text"
                            name="numero"
                            placeholder="123"
                            className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/* segunda linha */}
                    <div className="w-full gap-2 flex justify-between">
                      {/* Campo complemento */}
                      <div className="">
                        <label className="text-gray-700 font-medium">
                          Complemento
                        </label>
                        <input
                          type="text"
                          name="complemento"
                          placeholder="Garagem, subsolo, etc."
                          className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                      {/* Campo bairro */}
                      <div className="">
                        <div className="flex gap-2">
                          <label className="text-gray-700 font-medium">
                            Bairro
                          </label>
                          <p className="text-red-600">*</p>
                        </div>
                        <div className="text-gray-500">
                          <input
                            type="text"
                            name="bairro"
                            value={endereco.bairro}
                            onChange={handleChange}
                            placeholder="Centro"
                            className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      {/* Campo cidade */}
                      <div className="">
                        <div className="flex gap-2">
                          <label className="text-gray-700 font-medium">
                            Cidade
                          </label>
                          <p className="text-red-600">*</p>
                        </div>
                        <div className="text-gray-500">
                          <input
                            type="text"
                            name="cidade"
                            value={endereco.cidade}
                            onChange={handleChange}
                            placeholder="São Paulo"
                            className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      {/* Campo estado */}
                      <div className="">
                        <div className="flex gap-2">
                          <label className="text-gray-700 font-medium">
                            Estado (UF)
                          </label>
                          <p className="text-red-600">*</p>
                        </div>
                        <div className="text-gray-500">
                          <input
                            type="text"
                            name="estado"
                            placeholder="SP"
                            value={endereco.estado}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Campo dica */}
                  <div className="flex gap-2 mt-6 border rounded-md pl-6 p-4 border-dashed">
                    {/* icone */}
                    <div className="flex items-center justify-center">
                      <Info
                        size={48}
                        className="text-gray-500 p-3 rounded-full border"
                      />
                    </div>
                    {/* texto */}
                    <div className="content-between pl-4 pt-6">
                      <h4 className="text-lg font-bold text-gray-500">Dica:</h4>
                      <p className="text-gray-600 mb-8">
                        Oficinas com endereços completos e validados aparecem em
                        primeiro lugar nos restultados de busca por proximidade
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* botoes */}
          <div className="flex gap-6 p-4 mt-10 items-center justify-between ml-24 mr-24">
            <div className="text-gray-700">
              <Link className="flex gap-6" to="/home">
                <ArrowLeft />
                <p>Voltar para home</p>
              </Link>
            </div>

            {/* mensagem de feedback */}
            {mensagem && <p className="font-semibold text-lg">{mensagem}</p>}

            <div className="flex gap-6">
              <button className="flex rounded-sm px-6 py-2 text-gray-700 border border-transparent shadow hover:bg-slate-700 hover:text-white transition">
                Descartar alteraçoes
              </button>
              <button
                onClick={handleSubmit}
                className="flex gap-2 rounded-sm px-6 py-2 bg-sky-500 text-white shadow hover:bg-slate-700 transition"
              >
                <CircleCheck />
                Finalizar cadastro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CadastrarOficina;
