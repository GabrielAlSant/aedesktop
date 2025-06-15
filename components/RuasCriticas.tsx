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
    <div className="h-[650px] mt-5 w-[500px] overflow-y-scroll border border-gray-300 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
      {ruas.map((rua) => (
        <div
          key={rua.id}
          className="p-4 mb-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">{rua.nome}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Buracos: {rua.totalBuracos}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Confirmações: {rua.totalConfirmacoes}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Criticidade: {rua.totalCriticidade}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">Score: {rua.score}</p>
        </div>
      ))}
    </div>
  );
}
