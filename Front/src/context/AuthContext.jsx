//por Khenny

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login com backend
  const login = async (email, senha) => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        senha,
      });
      const { token, user: userData } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Erro ao fazer login",
      };
    }
  };

  // Cadastro com backend
  const cadastrar = async (dados) => {
    try {
      const res = await axios.post("http://localhost:3000/usuarios", dados);
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Erro ao cadastrar",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, cadastrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
