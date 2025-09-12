"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      const success = await login(username, password);

      if (!success) {
        toast.error("Usuário ou senha inválidos");
      } else {
        toast.success("Login realizado com sucesso!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao realizar login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-white text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 py-2 rounded transition
            ${loading 
              ? "bg-gray-500 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                     5.291A7.962 7.962 0 014 12H0c0 
                     3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processando...
            </>
          ) : (
            "Entrar"
          )}
        </button>
      </form>
    </div>
  );
}
