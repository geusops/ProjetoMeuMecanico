import { useState } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { v4 } from "uuid";

function App() {
  //lista de tarefas, onde cada tarefa tem um id, um título, uma descrição e um status de conclusão
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar programação",
      description:
        "Estudar programação todos os dias para melhorar minhas habilidades",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Fazer exercícios físicos",
      description: "Fazer exercícios físicos para manter a saúde em dia",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Ler um livro",
      description: "Ler um livro para relaxar a mente",
      isCompleted: false,
    },
    {
      id: 4,
      title: "Deletar tasks",
      description: "Deletar tasks que não são mais necessárias",
      isCompleted: false,
    },
  ]);

  //funcao para marcar ou desmarcar uma tarefa como concluída, recebendo o id da tarefa que foi clicada
  function onTaskClick(taksId) {
    //aqui eu recebo o id da tarefa que foi clicada
    //aqui eu crio um novo array de tarefas, onde eu vou atualizar a tarefa que foi clicada
    const newTasks = tasks.map((task) => {
      if (task.id === taksId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
          //aqui eu atualizo a tarefa que foi clicada, invertendo o valor de isCompleted, para marcar ou desmarcar a tarefa como concluída
        };
      }
      return task;
    });
    setTasks(newTasks);
  }

  //funcao para deletar uma tarefa, recebendo o id da tarefa que foi clicada
  function onDeleteTaskClick(taskId) {
    //aqui eu recebo o id da tarefa que foi clicada
    //aqui eu crio um novo array de tarefas, onde eu vou atualizar a tarefa que foi clicada
    const newTasks = tasks.filter((task) => task.id !== taskId); //aqui eu filtro as tarefas, deixando apenas as tarefas que não tem o id da tarefa que foi clicada
    setTasks(newTasks); //aqui eu atualizo o estado das tarefas, com o novo array de tarefas que foi criado, sem a tarefa que foi clicada.
  }

  //funcao para adicionar uma nova tarefa, recebendo o título e a descrição da nova tarefa
  function onAddTaskSubmit(title, description) {
    //aqui eu crio uma nova tarefa, com um id aleatório, um título e uma descrição vazios e o status de conclusão como false
    const newTask = {
      id: v4(), //aqui eu crio um id para a nova tarefa, baseado no tamanho do array de tarefas, para garantir que o id seja único
      title: title,
      description: description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]); //aqui eu atualizo o estado das tarefas, adicionando a nova tarefa ao array de tarefas existente, usando o operador spread para manter as tarefas anteriores e adicionar a nova tarefa no final do array
  }

  return (
    <div className="w-screen h-screen flex bg-slate-500 justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de tarefas
        </h1>
        <AddTask
          //aqui eu passo a funcao de adicionar tarefa para o componente de adicionar tarefa, para que ele possa chamar essa funcao quando o usuário clicar no botão de adicionar tarefa
          onAddTaskSubmit={onAddTaskSubmit}
        />
        <Tasks
          //aqui eu passo as tarefas para o componente de tarefas, para que ele possa mostrar as tarefas na tela
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
