import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

//funcao para criar o search params, populando os dados da tarefa, para que eu possa mostrar esses dados na página de detalhes da tarefa
function TaskPage() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const navigate = useNavigate(); //funcao para navegar entre as páginas, usando o hook useNavigate do react-router-dom

  //funcao para navegar para a página anterior, usando o botão de voltar, que fica no canto superior esquerdo da página de detalhes da tarefa
  function onBackButtonClick() {
    navigate(-1); //aqui eu navego para a página anterior, usando o navigate com o valor -1, que indica para voltar uma página no histórico de navegação do usuário
  }

  return (
    <div className="w-screen h-screen bg-slate-500 p-6">
      {/*aqui eu mostro os dados da tarefa na página de detalhes da tarefa, usando o título e a descrição que foram passados na query string */}
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative">
          <button
            onClick={onBackButtonClick}
            className="absolute left-0 bottom-0 top-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            Detalhes de tarefas
          </h1>
        </div>
        <div className="bg-slate-200 p-6 rounded-md shadow">
          <h2 className="text-xl font-bold text-slate-600 justify-center flex mb-4">
            {title}
          </h2>
          <p className="text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
