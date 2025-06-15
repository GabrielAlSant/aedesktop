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
      <input
        type="text"
        placeholder="Filtrar por nome da rua"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="mb-4 w-full p-2 border rounded shadow"
      />

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nome</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {ruasFiltradas.map((rua) => (
            <tr key={rua._id} className="hover:bg-gray-50">
              <td className="border p-2">{rua.nome}</td>
              <td className="border p-2 text-center">
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
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                Nenhuma rua encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
