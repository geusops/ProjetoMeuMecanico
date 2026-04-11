//Modificado por Khenny
import {
  ChevronRight,
  Clock,
  Grid2X2,
  Map,
  MapPin,
  Navigation,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom"; // ← adicionado esta linha
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet"; //trabalhanodo com os mapas
import "leaflet/dist/leaflet.css"; //estilo do mapa

import { useState } from "react"; // usado para o "toggle"
import Location from "../Hooks/Location";

function HomePage(props) {
  const [visualizacao, setVisualizacao] = useState("lista"); // visualizacao padrao é a lista

  //bloco para lidar com a localizacao
  //referencia: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
  //1. achar localizacao do usuario
  const { coords, buscaLocalizacao, pesquisarEndereco } = Location();
  //vinculando com o caixa de texto para a busca
  const [textoBusca, setTextoBusca] = useState("");

  //2. funcao para dar o trigger de buscar a localizao ao clicar no botao
  const handleLocalizacao = () => {
    buscaLocalizacao(); // Isso faz o navegador pedir permissão e escrever no console
  };

  //https://giuliacajati.medium.com/all-about-openstreetmap-using-react-js-c24fd0856aca
  //3. posicao default - São Paulo
  const position = coords ? [coords.lat, coords.lon] : [-23.541, -46.456];

  // tentando conectar a API nodejs
  //referencia: https://www.youtube.com/watch?v=mKmxc8TcWQ8
  return (
    <div>
      {/* bloco azul */}
      <div className="w-full p-20 flex bg-sky-100 items-center justify-center">
        <div className="w-[1000px] space-y-4">
          {/* inicio blocos de texto */}
          <div className="flex justify-center">
            <h4 className="text-2xl text-sky-500 bg-sky-200 font-semibold border-8 border-sky-200 text-center rounded-full">
              Sua oficina de confiança, a um clique de distância
            </h4>
          </div>
          <h1 className="text-6xl text-black font-bold text-center">
            Encontre o melhor mecânico para o seu veículo agora
          </h1>
          <h4 className="text-gray-600 text-2xl text-center">
            Pesquise por localização, compare serviços e agende com
            tranquilidade nas oficinas mais bem avaliadas da região.
          </h4>
          {/* fim blocos de texto */}

          {/* bloco de pesquisa por localização/mapa */}
          <div className="flex h-15 bg-slate-50 gap-2 rounded-lg shadow py-2 px-2">
            {/* pin e caixa de pesquisa */}
            <div className="flex p-2 gap-1 w-3/5">
              <MapPin className="text-gray-700" />

              <input
                className="text-gray-700 w-full bg-slate-50"
                type="text"
                placeholder="Cidade, bairro ou CEP..."
                value={textoBusca}
                onChange={(e) => setTextoBusca(e.target.value)}
              />
            </div>
            {/* botoes */}
            <div className="flex gap-2 w-2/5 justify-end">
              <button
                className="flex gap-5 rounded-sm px-5 py-2 text-gray-700 border border-transparent shadow hover:bg-slate-700 hover:text-white transition"
                onClick={handleLocalizacao}
              >
                <Navigation />
                Localização Atual
              </button>
              <button
                onClick={() => pesquisarEndereco(textoBusca)} // Dispara a pesquisa
                className="flex gap-5 rounded-sm px-5 py-2 bg-sky-500 text-white shadow hover:bg-slate-700 transition"
              >
                <Search />
                Buscar
              </button>
            </div>
          </div>

          {/* Div para container dos benefícios */}
          <div className="flex justify-center p-6 gap-10 text-gray-700 text-lg">
            <div className="flex gap-1">
              <ShieldCheck />
              <p>Oficinas Certificadas</p>
            </div>
            <div className="flex gap-1">
              <Star />
              <p>Avaliações Reais</p>
            </div>
            <div className="flex gap-1">
              <Clock />
              <p>Agendamento Fácil</p>
            </div>
          </div>

          {/* Div para container dos benefícios */}
          <div className="flex justify-center p-6 gap-10 text-gray-700 text-lg">
            {/* ... os 3 benefícios ... */}
          </div>

          {/* Botão Meu Perfil - adicionado aqui */}
          <div className="flex justify-center mt-6">
            <Link to="/perfil">
              {/* <button
                className="flex items-center gap-2 px-8 py-4 bg-sky-500 text-white font-semibold text-xl rounded-lg shadow-lg hover:bg-sky-600 transition transform hover:scale-105"
              >
                <span>Meu Perfil</span>
                <Star className="w-6 h-6" />  
              </button>  */}
            </Link>
          </div>
        </div>
      </div>

      {/* bloco intermediario */}
      <div className="w-full p-10 flex items-center border-b-2 border-t-2 justify-between pr-20 pl-20">
        <div>
          <h2 className="text-3xl text-black font-bold text-left">
            Oficinas Próximas
          </h2>
          <p className="text-gray-600 text-md text-left">
            Exibindo oficinas em São Paulo
          </p>
        </div>

        {/* botoes */}
        <div className="flex gap-2 w-2/5 justify-end">
          <button
            onClick={() => setVisualizacao("lista")}
            className={`flex gap-5 rounded-sm px-5 py-2 transition shadow ${
              visualizacao === "lista"
                ? "bg-sky-500 text-white"
                : "text-gray-700 border border-transparent hover:bg-slate-700 hover:text-white"
            }`}
          >
            <Grid2X2 />
            Lista
          </button>
          <button
            onClick={() => setVisualizacao("mapa")}
            className={`flex gap-5 rounded-sm px-5 py-2 transition shadow ${
              visualizacao === "mapa"
                ? "bg-sky-500 text-white"
                : "text-gray-700 border border-transparent hover:bg-slate-700 hover:text-white"
            }`}
          >
            <Map />
            Mapa
          </button>
        </div>
      </div>

      {/* bloco grid de oficinas */}
      <div className="">
        {/* bloco de mapas - aparece quando o botao mapa é clicado */}
        {visualizacao === "mapa" && (
          // referencia mapa https://giuliacajati.medium.com/all-about-openstreetmap-using-react-js-c24fd0856aca
          //https://react-leaflet.js.org/

          <div className="h-[800px] w-full p-12">
            <MapContainer
              key={`${position[0]}-${position[1]}`} // forca a atualizacao do mapa para o novo endereço buscado
              center={position}
              zoom={14}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>Sua oficina está aqui!</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        {/* bloco de lista - aparece quando o botao lista é clicado */}
        {visualizacao === "lista" && (
          <ul className="rounded-md grid grid-cols-3 p-12">
            {props.oficinas.map((oficina) => (
              <li className="p-4" key={oficina.id_oficina}>
                <div className="shadow-md">
                  {/* componentes */}
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

                    <div className="flex p-1 pb-2">
                      <p className="bg-slate-200 rounded-full p-2 border-0">
                        {oficina.especialidade}
                      </p>
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
        )}
      </div>
      {/* bloco convite ao cadastro */}
      <div className="bg-sky-500 flex h-15 gap-2 rounded-lg shadow py-2 px-2 justify-between m-12 border-b-2">
        <div className="flex-col items-center px-6 w-2/5 rounded-lg p-6 m-6">
          {/* texto */}
          <p className="text-left font-bold text-white text-3xl p-2 m-2">
            Você possui uma oficina mecânica?
          </p>
          <p className="text-left text-white text-xl p-2 m-2">
            Cadastre seu estabelecimento no Meu Mecânico e alcance centenas de
            novos clientes na sua região todos os meses.
          </p>
        </div>
        <div className="p-10 content-center">
          <button className="rounded-md font-bold text-2xl bg-slate-50 px-20 h-20 text-sky-500 border border-transparent shadow hover:bg-slate-700 hover:text-white transition">
            Cadastrar Minha Oficina
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
