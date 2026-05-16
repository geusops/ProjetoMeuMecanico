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
import CadastrarOficina from "./Pages/CadastrarOficina";
import Admin from "./Pages/Admin";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react"; //conexao com a API node
import axios from "axios"; //conexao com a API node
import Location from "./Hooks/Location"; //Localizacao
//adicionado por fora
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  // consumindo a api node para ler as infos do banco
  // referencia: https://www.youtube.com/watch?v=mKmxc8TcWQ8
  const [oficinas, setOficinas] = useState([]);

  // controlando a quantidade de oficinas renderizadas na home page.
  const [quantidadeLimite, setQuantidadeLimite] = useState(9);

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

  // Monitora mudança de coordenadas quando o usuario pesquisa um endereco ou clica pra buscar a localizacao atual
  useEffect(() => {
    if (coords) {
      console.log("Atualizando lista com:", coords);
      fetchAPI(coords.lat, coords.lon);
    }
  }, [coords, fetchAPI]);
  // Dentro do App.jsx, crie esta função específica para o arraste
  const handleArrasteMapa = useCallback(
    async (lat, lon) => {
      // 1. Opcional: Se o seu hook Location permitir, você pode atualizar o centro global aqui
      // Isso ajuda a manter a sincronia entre os componentes
      // setCoords({ lat, lon });

      await fetchAPI(lat, lon);
    },
    [fetchAPI],
  );

  // aqui eu mapeio as especialidades de chave para descricao. Assim simplificamos o que é armazenado no banco e renderizamos a descricao
  const MAPA_ESPECIALIDADES = {
    e1: "Motor e Transmissão",
    e2: "Freios e Suspensão",
    e3: "Elétrica e Baterias",
    e4: "Ar-Condicionado",
    e5: "Pneus e Alinhamento",
    e6: "Troca de óleo",
    e7: "Injeção eletrônica",
    e8: "Pintura e Funilaria",
  };

  // aqui eu mapeio as marcas de chave para descricao.
  const MAPA_MARCAS = {
    m1: "Chevrolet",
    m2: "Volkswagen",
    m3: "Fiat",
    m4: "Honda",
    m5: "Toyota",
    m6: "Nissan",
    m7: "Renault",
    m8: "Outros",
  };

  return (
    // colocando a aplicacao debaixo do chapeu do browser router
    <>
      <Headers />
      {/* criando as rotas */}
      <Routes>
        {/* Direcionando o / que é o padrao pra /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        {/* demais rotas */}
        <Route
          path="/home"
          element={
            <HomePage
              oficinas={oficinas.slice(0, quantidadeLimite)} //mandando as oficinas para home page para ser renderizados via props
              setQuantidadeLimite={setQuantidadeLimite}
              coords={coords} // mandando as coordenadas
              onBuscarLocalizacao={buscaLocalizacao} // mandando a funcao de buscar localizacao para a home
              onPesquisarEndereco={pesquisarEndereco} // mandando a funcao de pesquisar endereco para a home
              onArrasteMapa={handleArrasteMapa}
              mapaEspecialidades={MAPA_ESPECIALIDADES} // mandando o mapeamento das especialidades para a home
              mapaMarcas={MAPA_MARCAS}
            />
          }
        />
        <Route
          path="/oficinas"
          element={
            <Oficinas
              oficinas={oficinas}
              mapaEspecialidades={MAPA_ESPECIALIDADES} // mandando o mapeamento das especialidades para a pag de oficinas
              mapaMarcas={MAPA_MARCAS}
            />
          }
        />
        <Route
          // aqui eu adiciono o :id para ele usar o id para direcionar para a pagina de detalhes
          path="/oficinas/:id"
          element={
            <DetalhesOficina
              dados={oficinas}
              mapaEspecialidades={MAPA_ESPECIALIDADES} // mandando o mapeamento das especialidades para a pag de detalhes oficinas
              mapaMarcas={MAPA_MARCAS}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastrarUsuario />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route
          path="/oficinas/cadastrar"
          element={user ? <CadastrarOficina /> : <Navigate to="/login" />}
        />

        {/* NOVA ROTA - UC04 */}
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
