import { useState } from "react";
import axios from "axios";

export default function Location() {
  //coordenadas
  const [coords, setCoords] = useState(null);

  //Usei Gemini para melhorar esse hook
  //funcao para buscar localizacao via browser
  const buscaLocalizacao = () => {
    // O navegador pede permissão aqui
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const local = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setCoords(local);
        console.log("Localização encontrada:", local);
      },
      (err) => console.error("Erro no GPS:", err.message),
    );
  };

  // OPÇÃO 2: BUSCA POR TEXTO (Nominatim)
  const pesquisarEndereco = async (texto) => {
    try {
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${texto}`,
      );
      if (data.length > 0) {
        setCoords({
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        });
      }
    } catch (err) {
      console.error("Erro na busca" + err.message);
    }
  };

  return { coords, buscaLocalizacao, pesquisarEndereco };
}
