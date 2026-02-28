import { ChevronRight, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  //funcao para navegar para a página de detalhes da tarefa, recebendo a tarefa que foi clicada
  function onSeeDetailsClick(task) {
    //variavle usada para criar a query string, onde eu passo o título e a descrição da tarefa
    //aqui eu tbm posso tratar os dados da tarefa, para evitar problemas com caracteres especiais, como espaços, acentos, etc
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);

    navigate(`/task?${query.toString()}`); //aqui eu navego para a página de detalhes da tarefa, passando a query string com os dados da tarefa
  }

  return (
    <div>
      <ul className="space-y-4 p-6 bg-slate-300 rounded-md shadow">
        {tasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <button
              onClick={() => onTaskClick(task.id)}
              className={`bg-slate-400 text-white p-2 rounded-md w-full text-left ${task.isCompleted && "line-through"}`}
            >
              {task.title}
            </button>
            <button
              onClick={() => onSeeDetailsClick(task)}
              className="bg-slate-400 p-2 rounded-md text-white"
            >
              <ChevronRight />

              {/* aqui eu uso o onclick para chamar a funcao de navegar para a página de detalhes da tarefa, passando a tarefa como parametro para popular o title e description da funcao/page exibir */}
            </button>
            <button
              className="bg-slate-400 p-2 rounded-md text-white"
              onClick={() => onDeleteTaskClick(task.id)}

              // aqui eu uso o onclick para chamar a funcao de deletar a tarefa, passando o id da tarefa como parametro para identificar qual tarefa deve ser deletada
            >
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
