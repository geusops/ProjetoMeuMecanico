//Modificado por Khenny

//Importando as paginas
import Headers from "./Components/Headers";
import Footer from "./Components/Footer";
import HomePage from "./Pages/home";
import Oficinas from "./Pages/Oficinas";
import DetalhesOficina from "./Pages/DetalhesOficina";
import Login from "./Pages/Login";
import CadastrarUsuario from "./Pages/CadastrarUsuário";
import Perfil from "./Pages/Perfil";
import CadastrarOfina from "./Pages/CadastrarOficina";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react"; //conexao com a API node
import axios from "axios"; //conexao com a API node
import Location from "./Hooks/Location"; //Localizacao

function App() {
  // consumindo a api node para ler as infos do banco
  // referencia: https://www.youtube.com/watch?v=mKmxc8TcWQ8
  const [oficinas, setOficinas] = useState([]);

  // importantando o hook de localizacao
  const { coords, buscaLocalizacao, pesquisarEndereco } = Location();

  // Usamos useCallback para a função não ser recriada "do zero" toda hora
  const fetchAPI = useCallback(async (lat = -23.5489, lon = -46.6388) => {
    try {
      const response = await axios.get("http://localhost:3000/oficinas", {
        params: { lat, lon, raio: 20 },
      });
      setOficinas(response.data.output_consulta);
    } catch (erro) {
      console.error("Erro ao buscar oficinas: ", erro);
    }
  }, []); // Array vazio aqui indica que a função é estável

  // fetch inicial, para popular a home com as oficinais mais proximas das coordenadas iniciais.
  useEffect(() => {
    fetchAPI();
  }, []);

  // Monitora mudança de coordenadas
  useEffect(() => {
    if (coords) {
      console.log("Atualizando lista com:", coords);
      fetchAPI(coords.lat, coords.lon);
    }
  }, [coords, fetchAPI]);

  return (
    // colocando a aplicacao debaixo do chapeu do browser router
    <>
      <Headers />
      {/* criando as rotas */}
      <Routes>
        <Route
          path="/home"
          element={
            <HomePage
              oficinas={oficinas}
              coords={coords}
              onBuscarLocalizacao={buscaLocalizacao}
              onPesquisarEndereco={pesquisarEndereco}
            />
          }
        />
        <Route path="/oficinas" element={<Oficinas oficinas={oficinas} />} />
        <Route
          // aqui eu adiciono o :id para ele usar o id para direcionar para a pagina de detalhes
          path="/oficinas/:id"
          element={<DetalhesOficina dados={oficinas} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastrarUsuario />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cadastraroficina" element={<CadastrarOfina />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
