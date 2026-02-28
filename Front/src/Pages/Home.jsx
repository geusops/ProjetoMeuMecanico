import {
  Clock,
  MapPin,
  Navigation,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";

function HomePage() {
  return (
    <div className="w-screen p-20 flex bg-sky-100 items-center justify-center">
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
          Pesquise por localização, compare serviços e agende com tranquilidade
          nas oficinas mais bem avaliadas da região.
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
            />
          </div>
          {/* botoes */}
          <div className="flex gap-2 w-2/5 justify-end">
            <button className="flex gap-5 rounded-sm px-5 py-2 text-gray-700 border border-transparent shadow hover:bg-slate-700 hover:text-white transition">
              <Navigation />
              Localização Atual
            </button>
            <button className="flex gap-5 rounded-sm px-5 py-2 bg-sky-500 text-white shadow hover:bg-slate-700 transition">
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
      </div>
    </div>
  );
}

export default HomePage;
