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

function CadastrarOficina({ mapaEspecialidades }) {
  // checa qual botao esta ativo
  const [ativo, setAtivo] = useState("minha_oficina"); // Estado do endereço (CEP, rua, etc)

  // ref aos checkboxes de marcas
  const [marcas, setMarcas] = useState([]);

  // ref o formulario de endereco para envio ao backend
  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  // Exemplo interno: { e1: { ativo: true, preco: "350.00" }, e6: { ativo: false, preco: "" } }
  const [servicosForm, setServicosForm] = useState({});

  // estado para os campos da oficina - adicionado para envio ao backend
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    descricao: "",
  });
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //  handler que gerencia a ativação/desativação do serviço e preserva o preço digitado
  const handleServicoCheckbox = (chave) => {
    const atual = servicosForm[chave] || { ativo: false, preco: "" };
    setServicosForm({
      ...servicosForm,
      [chave]: { ...atual, ativo: !atual.ativo },
    });
  };

  //  handler focado em capturar as mudanças de digitação no input de preço médio
  const handleServicoPreco = (chave, valor) => {
    const statusAtual = servicosForm[chave] || { ativo: true, preco: "" };
    setServicosForm({
      ...servicosForm,
      [chave]: { ...statusAtual, preco: valor },
    });
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

  //funcao para enviar dados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    // Mapeia e filtra apenas os serviços marcados pelo mecânico que possuem valor numérico válido
    const listaServicosPrecos = Object.entries(servicosForm)
      .filter(([_, dados]) => dados.ativo && dados.preco)
      .map(([chave, dados]) => ({
        nomeServico: mapaEspecialidades[chave], // Envia o nome real por extenso ("Motor e Transmissão")
        descricao: `Serviço especializado de ${mapaEspecialidades[chave].toLowerCase()}`,
        precoMedio: parseFloat(dados.preco),
      }));

    // mapeia as especialidades selecionadas
    const resumoChaves = Object.entries(servicosForm)
      .filter(([_, dados]) => dados.ativo && dados.preco)
      .map(([chave, _]) => chave) // Pega apenas o ID (e1, e2...)
      .join(",");

    if (listaServicosPrecos.length === 0) {
      setMensagem("⚠️ Selecione ao menos um serviço e informe o preço médio.");
      return;
    }

    //setando endenreco completo
    const enderecoCompleto = `${endereco.rua}, ${endereco.numero || "s/n"} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, Brasil`;

    //geolicalizacao
    try {
      let lat = null;
      let lon = null;
      try {
        //usando o nomination para definir as coordenadas a partir do cep
        const geo = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${endereco.cep},Brasil&countrycodes=br&email=geuso002@gmail.com`,
        );
        const geoData = await geo.json();
        if (geoData.length > 0) {
          lat = parseFloat(geoData[0].lat);
          lon = parseFloat(geoData[0].lon);
        }
      } catch (e) {
        console.log("Não foi possível obter coordenadas", e.Message);
      }

      //submetendo os dados para o backend
      await axios.post("http://localhost:3000/oficinas", {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        descricao: form.descricao,
        endereco: enderecoCompleto,
        uf: endereco.estado,
        cidade: endereco.cidade,
        bairro: endereco.bairro,
        especialidade: resumoChaves,
        marcas: marcas.join(","),
        servicos: listaServicosPrecos,

        latitude_oficina: lat,
        longitude_oficina: lon,

        id_usuario: user?.id,
      });
      setMensagem("Oficina cadastrada com sucesso!");
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      setMensagem("Erro ao cadastrar. Tente novamente.");
      console.error(error);
    }
  };

  //referencia:
  //https://www.youtube.com/watch?v=155ywtYSpdY
  // funcao especifica para setar campos para serem usado no filtro da tela de oficinas
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
  const limparEndereco = (e) => {
    if (e) e.preventDefault(); // Evita o submit acidental do form ao limpar
    setEndereco({
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
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
      {/* tela cadastro */}
      <div className="w-full p-24 ml-16 mr-16">
        <div className="pr-32 pl-32">
          {/* titulo */}
          <div className="p-4 text-center">
            <h2 className="text-3xl text-black font-bold">
              Cadastrar nova oficina
            </h2>
            <p className="text-gray-600 text-md">
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
              <div className="p-4">
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
                    <div className="relative text-gray-500">
                      <input
                        type="text"
                        name="telefone"
                        placeholder="(11) 91234-5678"
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
                    <div className="relative text-gray-500">
                      <input
                        type="text"
                        name="cnpj"
                        placeholder="00.123.456/0001-00"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                {/* Campo Descricao */}
                <div className="mt-2">
                  <div className="flex gap-2">
                    <label className="text-gray-700 font-medium">
                      Descrição da oficina
                    </label>
                    <p className="text-red-600">*</p>
                  </div>
                  <div className="relative text-gray-500">
                    <textarea
                      name="descricao"
                      id="descricao"
                      value={form.descricao}
                      onChange={handleFormChange}
                      placeholder="Conte um pouco sobre a história, equipe e diferenciais da sua oficina..."
                      className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* especialidade e marcas */}
          <div className="border rounded-sm p-4 mt-6">
            {/* titulo */}
            <div className="flex gap-2 pl-6">
              <div className="content-center">
                <WrenchIcon
                  size={48}
                  className="text-sky-500 bg-sky-200 rounded-md border-1 p-3"
                />
              </div>
              <div className="content-between pl-4 pt-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Especialidades e Marcas
                </h2>
                <p className="text-gray-600 mb-8">
                  Quais serviços você oferece e quais veículos você atende?
                </p>
              </div>
            </div>
            <div>
              {/* Serviços Oferecidos Reestruturados */}
              <div>
                <div className="flex-col p-6 pt-10">
                  <h4 className="font-bold pb-2 text-black">
                    Serviços oferecidos e Preços Médios
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Marque as especialidades e digite o preço médio cobrado por
                    cada uma delas.
                  </p>
                  <div className="text-gray-600 pb-6 grid grid-cols-2 gap-4">
                    {Object.entries(mapaEspecialidades).map(
                      ([chave, descricao]) => {
                        const isChecked = servicosForm[chave]?.ativo || false;
                        return (
                          <div
                            key={chave}
                            className="flex items-center justify-between border p-3 rounded-md shadow-sm"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`servico-${chave}`}
                                value={chave}
                                checked={isChecked}
                                onChange={() => handleServicoCheckbox(chave)}
                                className="text-sky-500 focus:ring-sky-400"
                              />
                              <label
                                htmlFor={`servico-${chave}`}
                                className="text-gray-800 font-medium selection:bg-transparent cursor-pointer"
                              >
                                {descricao}
                              </label>
                            </div>

                            {/* Exibe o input numérico do preço somente se o checkbox estiver ativo */}
                            {isChecked && (
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-500 font-semibold">
                                  R$
                                </span>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  placeholder="Média"
                                  value={servicosForm[chave]?.preco || ""}
                                  onChange={(e) =>
                                    handleServicoPreco(chave, e.target.value)
                                  }
                                  className="w-24 px-2 py-1 bg-slate-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400 text-right"
                                  required
                                />
                              </div>
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>
              {/* Marcas atendidas */}
              <div>
                <div className="flex-col p-6 pt-10 border-t">
                  <div className="pb-4">
                    <h4 className="font-bold text-black">Marcas atendidas</h4>
                    <p className="text-sm text-gray-600">
                      Selecione as principais marcas
                    </p>
                  </div>
                  <div className="text-black pb-6 grid grid-cols-3">
                    <div className="pb-1">
                      <input
                        type="checkbox"
                        id="m1"
                        value="m1"
                        onChange={handleMarca}
                      />
                      <label htmlFor="m1"> Chevrolet</label>
                    </div>
                    <div className="pb-1">
                      <input
                        type="checkbox"
                        id="m2"
                        value="m2"
                        onChange={handleMarca}
                      />
                      <label htmlFor="m2"> Volkswagen</label>
                    </div>
                    <div className="pb-1">
                      <input
                        type="checkbox"
                        id="m3"
                        value="m3"
                        onChange={handleMarca}
                      />
                      <label htmlFor="m3"> Fiat</label>
                    </div>
                    <div className="pb-1">
                      <input
                        type="checkbox"
                        id="m4"
                        value="m4"
                        onChange={handleMarca}
                      />
                      <label htmlFor="m4"> Honda</label>
                    </div>
                    <div className="pb-1">
                      <input
                        type="checkbox"
                        id="m5"
                        value="m5"
                        onChange={handleMarca}
                      />
                      <label htmlFor="m5"> Toyota</label>
                    </div>
                    <div className="pb-1">
                      <input
                        type="checkbox"
                        id="m6"
                        value="m6"
                        onChange={handleMarca}
                      />
                      <label htmlFor="m6"> Nissan</label>
                    </div>
                    <div className="pb-1">
                      <input
                        type="checkbox"
                        id="m7"
                        value="m7"
                        onChange={handleMarca}
                      />
                      <label htmlFor="m7"> Renault</label>
                    </div>
                    <div className="pb-1">
                      <input
                        type="checkbox"
                        id="m8"
                        value="m8"
                        onChange={handleMarca}
                      />
                      <label htmlFor="m8"> Outros</label>
                    </div>
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
              <div className="p-4">
                <div>
                  {/* primeira linha */}
                  <div className="mb-2 w-full gap-2 flex">
                    {/* Campo cep */}
                    <div className="">
                      <div className="flex gap-2">
                        <label className="text-gray-700 font-medium">CEP</label>
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
                          type="button"
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
                          value={endereco.numero}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* segunda linha */}
                  <div className="w-full gap-2 flex justify-between">
                    {/* Campo complemento */}
                    <div className="w-full">
                      <label className="text-gray-700 font-medium">
                        Complemento
                      </label>
                      <input
                        type="text"
                        name="complemento"
                        placeholder="Garagem, subsolo, etc."
                        value={endereco.complemento}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                    {/* Campo bairro */}
                    <div className="w-full">
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
                    <div className="w-full">
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
                    <div className="w-full">
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
                      primeiro lugar nos resultados de busca por proximidade
                    </p>
                  </div>
                </div>
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
                Descartar alterações
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
