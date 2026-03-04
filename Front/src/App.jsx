import Headers from "./Components/Headers";
import Footer from "./Components/Footer";
// import HomePage from "./Pages/home";
import Oficinas from "./Pages/Oficinas";

import oficina1 from "./assets/8.jpg";
import oficina2 from "./assets/7.jpg";
import oficina3 from "./assets/6.jpg";
import oficina4 from "./assets/5.jpg";
import oficina5 from "./assets/4.jpg";
import oficina6 from "./assets/3.jpg";

const oficinas = [
  {
    id: 1,
    nome: "Oficina São Jorge",
    imagem: oficina1,
    endereco: "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
    avaliacao: 4.6,
    especialidade: "Mecânica geral",
  },
  {
    id: 2,
    nome: "Auto Center Speed Car",
    imagem: oficina2,
    endereco: "Rua Tuiuti, 850 - Tatuapé, São Paulo - SP",
    avaliacao: 4.3,
    especialidade: "Suspensão e freios",
  },
  {
    id: 3,
    nome: "Mecânica do Zé",
    imagem: oficina3,
    endereco: "Av. Itaquera, 2300 - Itaquera, São Paulo - SP",
    avaliacao: 4.8,
    especialidade: "Motor e câmbio",
  },
  {
    id: 4,
    nome: "Box 4 Rodas",
    imagem: oficina4,
    endereco: "Rua das Oficinas, 45 - Mooca, São Paulo - SP",
    avaliacao: 4.1,
    especialidade: "Troca de óleo",
  },
  {
    id: 5,
    nome: "Prime Motors",
    imagem: oficina5,
    endereco: "Av. Interlagos, 4100 - Interlagos, São Paulo - SP",
    avaliacao: 4.9,
    especialidade: "Carros premium",
  },
  {
    id: 6,
    nome: "Garage Pro",
    imagem: oficina6,
    endereco: "Rua dos Trilhos, 300 - Brás, São Paulo - SP",
    avaliacao: 4.4,
    especialidade: "Diagnóstico eletrônico",
  },
];

function App() {
  return (
    <>
      <Headers />
      {/* <HomePage /> */}
      <Oficinas oficinas={oficinas} />
      <Footer />
    </>
  );
}

export default App;
