import { useState } from "react";



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
    const response = await fetch("https://projeto-vias-sjrv.vercel.app/UPDATERUAS", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ruaId }),
    });

    console.log(ruaId)
    if (!response.ok) {
      throw new Error("Erro ao enviar requisição");
    }

    const resultado = await response.json();
    console.log("Resposta do servidor:", resultado);
    alert("Atualização enviada com sucesso!");
  } catch (erro) {
    console.error(erro);
    alert("Falha ao enviar atualização.");
  }
};


  return (
    <div className="p-4 max-w-4xl mx-auto">
      
<div className=" mx-auto">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text"
        placeholder="Filtrar por nome da rua"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
         className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</div>


    <div className="relative overflow-x-auto mt-5">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Cidade
                </th>
                <th scope="col" className="px-6 py-3">
                    Ação
                </th>
            </tr>
        </thead>
        <tbody>
  {ruasFiltradas.map((rua) => (
            <tr key={rua._id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {rua.nome}
                </th>
                <td className="px-6 py-4">
                 <button
                  onClick={() => AlterarStatusBuracos(rua._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Arrumar buracos desta rua
                </button>
                </td>
            </tr>
     ))}
{ruasFiltradas.length === 0 && (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td colSpan={3} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Nenhuma rua encontrada
              </td>
            </tr>
          )}
        </tbody>
    </table>
</div>

    </div>
  );
}

