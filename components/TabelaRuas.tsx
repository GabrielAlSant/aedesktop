import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  dados: Rua[];
};

export interface Rua {
  _id: string;
  nome: string;
  cidadeId: string;
  __v: number;
}

export default function TabelaRuas({ dados }: Props) {
  const [filtro, setFiltro] = useState("");

  const ruasFiltradas = dados.filter((rua) =>
    rua.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const AlterarStatusBuracos = async (ruaId: string) => {
    try {
      const response = await fetch(
        "https://projeto-vias-git-master-matheus-santos-andrades-projects.vercel.app/UPDATERUAS",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ruaId }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar requisição");
      }

      const resultado = await response.json();
      console.log("Resposta do servidor:", resultado);
      toast.success("Os status dos buracos dessa rua foram atualizados!");
    } catch (erro) {
      console.error(erro);
      toast.error("Falha ao arrumar os buracos.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Campo de busca */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Filtrar por nome da rua"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 10a7 7 0 1 0-14 0 7 7 0 0 0 14 0Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-sm text-left ">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Rua
              </th>
              <th scope="col" className="px-6 py-3">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {ruasFiltradas.map((rua) => (
              <tr
                key={rua._id}
                className="bg-white"
              >
                <td className="px-6 py-4 font-medium ">
                  {rua.nome}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => AlterarStatusBuracos(rua._id)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 3v1.5M14.25 3v1.5M3.75 6.75h16.5M4.5 6.75l.75 12a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25l.75-12"
                      />
                    </svg>
                    Arrumar buracos
                  </button>
                </td>
              </tr>
            ))}
            {ruasFiltradas.length === 0 && (
              <tr className="">
                <td
                  colSpan={2}
                  className="px-6 py-4 text-center "
                >
                  Nenhuma rua encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
