//Modificado por Khenny
import Headers from "./Components/Headers";
import Footer from "./Components/Footer";
import HomePage from "./Pages/home";
import Oficinas from "./Pages/Oficinas";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetalhesOficina from "./Pages/DetalhesOficina";
import Login from "./Pages/Login";
import CadastrarUsuario from "./Pages/CadastrarUsuário";
import Perfil from "./Pages/Perfil"; // ← acrescente esta linha
import { useState, useEffect } from "react"; //conexao com a API node
import axios from "axios"; //conexao com a API node

function App() {
  // consumindo a api node para ler as infos do banco
  // referencia: https://www.youtube.com/watch?v=mKmxc8TcWQ8
  const [oficinas, setOficinas] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:3000/oficinas");
    setOficinas(response.data.output_consulta);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    // colocando a aplicacao debaixo do chapeu do browser router
    <BrowserRouter>
      <Headers />
      {/* criando as rotas */}
      <Routes>
        <Route path="/" element={<HomePage oficinas={oficinas} />} />
        <Route path="/oficinas" element={<Oficinas oficinas={oficinas} />} />
        <Route
          // aqui eu adiciono o :id para ele usar o id para direcionar para a pagina de detalhes
          path="/oficinas/:id"
          element={<DetalhesOficina dados={oficinas} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastrarUsuario />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
