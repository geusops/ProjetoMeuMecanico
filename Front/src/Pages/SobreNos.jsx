export default function SobreNos() {
  return (
    <div className="pl-64 pr-64 pt-16 pb-16">
      {/* Quem Somos */}
      <div>
        <h1 className="font-bold text-3xl text-gray-700">Quem Somos</h1>
        <p className="pt-4 text-lg">
          Nascemos da união entre tecnologia e a necessidade real de tornar o
          mercado automotivo mais transparente e acessível. O Meu Mecânico é uma
          plataforma inteligente que conecta proprietários de veículos a
          oficinas mecânicas e profissionais qualificados de forma rápida e
          segura. Combinamos geolocalização e inovação para que você nunca fique
          na mão quando mais precisar de suporte para o seu carro.
        </p>
      </div>

      {/* Nossa Motivação */}
      <div className="pt-10">
        <h1 className="font-bold text-3xl text-gray-700">Nossa Motivação</h1>
        <p className="pt-4 text-lg">
          Sabemos que enfrentar problemas no carro ou encontrar um profissional
          de confiança em uma região desconhecida gera estresse e perda de
          tempo. Nossa motivação é transformar essa experiência. Queremos
          eliminar a incerteza do motorista no momento do sufoco e, ao mesmo
          tempo, dar voz e visibilidade digital às oficinas locais,
          impulsionando os pequenos e médios negócios do setor.
        </p>
      </div>

      {/* Nossos Objetivos */}
      <div className="pt-10">
        <h1 className="font-bold text-3xl text-gray-700">Nossos Objetivos</h1>
        <ul className="pt-4 space-y-4 text-base leading-relaxed">
          <li className="flex items-start">
            <span className="font-bold text-black mr-2">•</span>
            <span className="text-lg">
              <strong className="text-gray-700">Facilidade:</strong> Garantir
              que qualquer motorista encontre socorro ou manutenção preventiva a
              poucos quilômetros de distância, com precisão e agilidade.
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-black mr-2">•</span>
            <span className="text-lg">
              <strong className="text-gray-700">Fortalecimento Local:</strong>{" "}
              Servir como uma vitrine digital eficiente para que mecânicos e
              oficinas parceiras ampliem sua clientela.
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-black mr-2">•</span>
            <span className="text-lg">
              <strong className="text-gray-700">Confiança:</strong> Construir
              uma comunidade automotiva baseada em transparência, conectividade
              e suporte mútuo.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
