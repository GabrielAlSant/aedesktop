interface Props {
  TotalReport: number;
  TotalReportAberto: number;
  TotalReportFechado: number;
}

export default function Card({ TotalReport, TotalReportAberto, TotalReportFechado }: Props) {
  return (
    <div className="flex flex-wrap">
      <a
        href="#"
        className="block w-40 p-6 m-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Total de reportes
        </p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {TotalReport}
        </h5>
      </a>

      <a
        href="#"
        className="block w-40 p-6 m-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Reportes abertos
        </p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {TotalReportAberto}
        </h5>
      </a>

      <a
        href="#"
        className="block w-40 p-6 m-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Reportes fechados
        </p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {TotalReportFechado}
        </h5>
      </a>
    </div>
  );
}
