// components/ScrollableList.tsx
import React from "react";

interface RuaInfo {
  id: string;
  nome: string;
  totalBuracos: number;
  totalConfirmacoes: number;
  totalCriticidade: number;
  score: number;
}

interface Props {
  ruas: RuaInfo[];
}

export default function RuasCriticas({ ruas }: Props) {
  return (
    <div className="h-[675px] mt-5 w-[370px] overflow-y-scroll shadow-xl  rounded-xl p-4 bg-[#fefefe]">
      <div className="text-2xl font-semibold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2">
        Ruas mais críticas
      </div>
      {ruas.map((rua) => (
        <div
          key={rua.id}
          className="p-4 mb-4 bg-[#f9fafb]  rounded-lg shadow-sm hover:bg-[#f3f4f6] dark:hover:bg-[#c5c6c9] transition duration-200"
        >
          <h2 className="text-lg font-bold  mb-1">
            {rua.nome}
          </h2>
          <div className="text-sm  space-y-1">
            <p>Buracos: <span className="font-medium">{rua.totalBuracos}</span></p>
            <p>Confirmações: <span className="font-medium">{rua.totalConfirmacoes}</span></p>
            <p>Criticidade: <span className="font-medium">{rua.totalCriticidade}</span></p>
            <p>
              Score:{" "}
              <span className="font-semibold text-[#b91c1c] dark:text-[#f87171]">
                {rua.score}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
