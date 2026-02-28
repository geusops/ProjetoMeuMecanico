import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskPage from "./pages/TaskPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/task", element: <TaskPage /> },
]);

//aqui é onde eu digo para o react renderizar o componente App dentro do elemento com id 'root' no meu HTML
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
