// UC04 - Painel Administrativo - Khenny

import { useState, useEffect, useContext } from  "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Admin() {
  
  // Pega as informações do usuário que está logado
  const { user } = useContext(AuthContext);
  

  // Serve para redirecionar o usuário para outra página
  const navigate = useNavigate();

  // Variáveis para guardar as listas
  const [usuarios, setUsuarios] =  useState([]);   // Lista de todos os usuários
  const [oficinas, setOficinas] = useState([]);   // Lista de todas as oficinas
  

  const [aba, setAba] = useState("oficinas");     // Controla qual aba está aberta (oficinas ou usuários)
  const [mensagem, setMensagem] = useState({ type: "", text: "" }); // Mensagem de sucesso ou erro
  const [loading, setLoading] = useState(true);   // Mostra "Carregando..." enquanto busca dados
  const [busca, setBusca] = useState("");         // Texto que a pessoa digita para pesquisar

  // Proteção: Só quem tem tipo ADMIN pode entrar nesta página
  useEffect(() => {
    if (!user || user.tipo?.toUpperCase() !== "ADMIN") {
      navigate("/home");
    }
  }, [user, navigate]);

  // Carrega os dados das oficinas e usuários assim que a página abre
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      try {
        const [resU, resO] = await Promise.all([
          axios.get("http://localhost:3000/admin/usuarios"),
          axios.get("http://localhost:3000/admin/oficinas")
        ]);
        setUsuarios(resU.data.usuarios || []);
        setOficinas(resO.data.oficinas || []);
      } catch (err) {
        console.error(err);
        showMessage("Erro ao carregar dados do servidor", "error");
      } finally {
        setLoading(false);
      }

    };
    carregarDados();
  }, []);

  // Função para mostrar mensagem na tela (sucesso ou erro)
  const showMessage = (text, type = "success") => {
    setMensagem({ type, text });
    setTimeout(() => setMensagem({ type: "", text: "" }), 5000);

  };

  // Função para excluir uma oficina
  const deletarOficina =  async (id, nome) => {
    if (!confirm(`Tem certeza que deseja excluir a oficina "${nome}"?`)) return;
    try {
      await axios.delete(`http://localhost:3000/admin/oficinas/${id}`);
      setOficinas(oficinas.filter(o => o.id_oficina !== id));
    showMessage(`Oficina "${nome}" excluída com sucesso!`, "success");
    } catch {
      showMessage("Erro ao excluir oficina.", "error");

    }
  };

  // Função para excluir um usuário
  const deletarUsuario = async (id, nome) => {

    if (!confirm(`Tem certeza que deseja excluir o usuário "${nome}"?`)) return;
    try {
      await axios.delete(`http://localhost:3000/admin/usuarios/${id}`);
      setUsuarios(usuarios.filter(u => u.id_usuario !== id));
      showMessage(`Usuário  "${nome}" excluído com sucesso!`, "success");
    } catch {
    showMessage("Erro ao excluir usuário.", "error");

    }
  };

  // Se não for ADMIN, não mostra nada
  if (!user || user.tipo?.toUpperCase() !== "ADMIN") return null;

  // Filtra os dados conforme a pessoa digita na busca
  const dadosFiltrados = (aba === "oficinas" ? oficinas : usuarios).filter(item =>
    JSON.stringify(item).toLowerCase().includes(busca.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className=" max-w-7xl mx-auto">

        {/* Cabeçalho do Painel */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-l-8 border-red-600">
          <div className=" flex justify-between items-center">
            <div>
              <h1 className=" text-4xl font-bold text-gray-800">🛡️ Painel Administrativo</h1>
              <p className="text-gray-500 mt-1">Gerenciamento completo da plataforma Meu Mecânico</p>
            </div>

            <div className="text-right">
              <p className=" text-sm text-gray-500">Administrador</p>
            <p className="font-bold text-xl text-red-600">{user.nome}</p>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <p className="text-gray-500 text-sm">Total de Oficinas</p>
            <p className="text-5xl font-bold text-sky-600 mt-2">{oficinas.length}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <p className="text-gray-500 text-sm ">Total de Usuários</p>
            <p className="text-5xl font-bold text-emerald-600 mt-2">{usuarios.length}</p>
          </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
            <p className="text-gray-500 text-sm">Administradores</p>
            <p className="text-5xl font-bold text-red-600 mt-2">
              {usuarios.filter(u => u.tipo?.toUpperCase() === "ADMIN").length}
            </p>

          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <p className="text-gray-500 text-sm ">Oficinas Ativas</p>
            <p className="text-5xl font-bold text-amber-600 mt-2">{oficinas.length}</p>
          </div>
        </div>

        {/* Mensagem de sucesso ou erro */}
        {mensagem.text &&  (
          <div className={`mb-6 p-4 rounded-2xl text-center font-medium ${mensagem.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {mensagem.text}
          </div>
        )}

        {/* Campo de Busca */}
        <input
          type="text"
        placeholder="🔍 Buscar por nome, email ou especialidade..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full p-4 mb-6 rounded-2xl border border-gray-300 focus:outline-none focus:border-sky-500 text-lg"
        />

        {/* Abas (Oficinas e Usuários) */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setAba("oficinas")} 
            className={`flex-1 py-4 text-lg font-semibold rounded-2xl transition ${aba === "oficinas" ? "bg-sky-600 text-white shadow-lg" : "bg-white hover:bg-gray-100"}`}
          >
            🏪 Oficinas ({oficinas.length})
          </button>
          <button 
            onClick={() => setAba("usuarios")} 
            className={`flex-1 py-4 text-lg font-semibold rounded-2xl transition ${aba === "usuarios" ? "bg-sky-600 text-white shadow-lg" : "bg-white hover:bg-gray-100"}`}
          >
            👥 Usuários ({usuarios.length})
         </button>
        </div>

        {/* Tabela */}
        {loading ? (
          <p className="text-center py-20 text-xl text-gray-500">Carregando painel administrativo...</p>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {aba === "oficinas" ? (
                    <>
                      <th className="p-6 text-left">ID</th>
                      <th className="p-6 text-left">Nome da Oficina</th>
                      <th className="p-6 text-left">Especialidade</th>
                     <th className="p-6 text-left">Ações</th>
                    </>
                  ) : (
                    <>
                      <th className="p-6 text-left">ID</th>
                      <th className="p-6 text-left">Nome</th>
                      <th className="p-6 text-left">Email</th>
                      <th className="p-6 text-left">Tipo</th>
                      <th className="p-6 text-left">Ações</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {dadosFiltrados.length === 0 ? (
                  <tr>
                  <td colSpan="5" className="p-12 text-center text-gray-500">Nenhum registro encontrado.</td>
                  </tr>
                ) : (
                  dadosFiltrados.map(item => (
                    <tr key={aba === "oficinas" ? item.id_oficina : item.id_usuario} className="border-t hover:bg-gray-50">
                      {aba === "oficinas" ? (
                        <>
                          <td className="p-6">{item.id_oficina}</td>
                          <td className="p-6 font-semibold">{item.nome}</td>
                          <td className="p-6 text-gray-600">{item.especialidade || "-"}</td>
                          <td className="p-6">
                            <button 
                              onClick={() => deletarOficina(item.id_oficina, item.nome)} 
                              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
                            >
                              Excluir
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-6">{item.id_usuario}</td>
                          <td className="p-6 font-semibold">{item.nome}</td>
                          <td className="p-6 text-gray-600">{item.email}</td>
                          <td className="p-6">
                            <span className={`px-5 py-1.5 rounded-full text-xs font-bold ${item.tipo?.toUpperCase() === "ADMIN" ? "bg-red-100 text-red-700" : "bg-sky-100 text-sky-700"}`}>
                             {item.tipo}
                            </span>
                          </td>
                          <td className="p-6">
                            {item.tipo?.toUpperCase() !== "ADMIN" && (
                              <button 
                                onClick={() => deletarUsuario(item.id_usuario, item.nome)} 
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
                              >
                              Excluir
                              </button>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
         </div>
        )}
      </div>
    </div>
  );
}