import {
  Info,
  MapPin,
  StoreIcon,
  WrenchIcon,
  ArrowLeft,
  Check,
  CircleCheck,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function CadastrarOfina() {
  // checa qual botao esta ativo
  const [ativo, setAtivo] = useState("minha_oficina");
  console.log(ativo);

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
                        placeholder="Ex: Auto Mecânica Silva"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        required
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
                        placeholder="Ex: Auto Mecânica Silva"
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
                    <input type="checkbox" id="motor" />
                    <label htmlFor="motor"> Motor e Transmissão</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="freios" />
                    <label htmlFor="freios"> Freios e Suspensão</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="eletrica" />
                    <label htmlFor="eletrica"> Elétrica e Baterias</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="ar" />
                    <label htmlFor="ar"> Ar-Condicionado</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="pneus" />
                    <label htmlFor="pneus"> Pneus e Alinhamento</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="troca-oleo" />
                    <label htmlFor="pneus"> Troca de óleo</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="ingecao" />
                    <label htmlFor="pneus"> Ingeção eletrônica</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="pintura" />
                    <label htmlFor="pneus"> Pintura e Funilaria</label>
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
                    <input type="checkbox" id="motor" />
                    <label htmlFor="motor"> Motor e Transmissão</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="freios" />
                    <label htmlFor="freios"> Freios e Suspensão</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="eletrica" />
                    <label htmlFor="eletrica"> Elétrica e Baterias</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="ar" />
                    <label htmlFor="ar"> Ar-Condicionado</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="pneus" />
                    <label htmlFor="pneus"> Pneus e Alinhamento</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="troca-oleo" />
                    <label htmlFor="pneus"> Troca de óleo</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="ingecao" />
                    <label htmlFor="pneus"> Ingeção eletrônica</label>
                  </div>
                  <div className="pb-1">
                    <input type="checkbox" id="pintura" />
                    <label htmlFor="pneus"> Pintura e Funilaria</label>
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
                            name="nome"
                            placeholder="00000-000"
                            className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            required
                          />
                          {/* botao */}
                          <button className="text-gray-700 bg-slate-200 rounded-md p-2">
                            Buscar
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
            <div className="flex gap-6">
              <button className="flex rounded-sm px-6 py-2 text-gray-700 border border-transparent shadow hover:bg-slate-700 hover:text-white transition">
                Descartar alteraçoes
              </button>
              <button className="flex gap-2 rounded-sm px-6 py-2 bg-sky-500 text-white shadow hover:bg-slate-700 transition">
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
export default CadastrarOfina;
