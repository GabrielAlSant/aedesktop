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
    <div className="bg-[#121314] rounded-2xl shadow-xl h-[675px] p-5 overflow-y-auto border border-[#2a2a2d]">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Ruas mais críticas</h2>
      <div className="space-y-4">
        {ruas.map((rua) => (
          <div
            key={rua.id}
            className="p-4 bg-[#202124] rounded-xl hover:bg-[#2a2b30] transition-colors"
          >
            <h3 className="text-md font-bold text-white mb-2">{rua.nome}</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <p>Buracos: <span className="text-orange-400 font-semibold">{rua.totalBuracos}</span></p>
              <p>Confirmações: <span className="text-orange-400 font-semibold">{rua.totalConfirmacoes}</span></p>
              <p>Criticidade: <span className="text-orange-400 font-semibold">{rua.totalCriticidade}</span></p>
              <p>Score: <span className="text-red-400 font-bold">{rua.score}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
