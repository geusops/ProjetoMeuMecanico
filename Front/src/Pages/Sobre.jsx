// Página Sobre Nós - Profissional e Detalhista
import { Wrench, Users, ShieldCheck, Award, MapPin } from "lucide-react";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Sobre o Meu Mecânico</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conectando motoristas a oficinas de confiança de forma simples, transparente e segura.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
              <Wrench className="text-sky-600" /> Nossa Missão
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Criamos uma plataforma que facilita a vida do motorista na hora de encontrar 
              uma oficina mecânica confiável, com avaliações reais e informações claras.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <ShieldCheck className="text-emerald-600 mb-4" size={40} />
              <h3 className="font-semibold text-lg">Transparência</h3>
              <p className="text-gray-600 text-sm">Avaliações verificadas por usuários reais</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <Users className="text-sky-600 mb-4" size={40} />
              <h3 className="font-semibold text-lg">Comunidade</h3>
              <p className="text-gray-600 text-sm">Conexão direta entre clientes e mecânicos</p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500">© 2026 Meu Mecânico - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
}