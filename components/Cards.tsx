import Image from "next/image";

interface Props {
  TotalReport: number | null;
  TotalReportAberto: number | null;
  TotalReportFechado: number | null;
} 

export default function Card({ TotalReport, TotalReportAberto, TotalReportFechado }: Props) {
  return (
    <div className="flex flex-wrap">
      <a
        href="#"
        className="block w-58 p-6 mr-5 mt-5 mb-5 shadow-xl bg-white rounded-lg hover:bg-gray-100"
      >
        <p className=" text-black text-xl text-center">
          Total de reportes
        </p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
        <div className="flex ml-13">
           <Image src="/DashBoardIcons/Todos.png" width={40} height={20} alt="a"/> <div className="mt-1.5">{TotalReport}</div>
        </div>
        </h5>
      </a>

      <a
        href="#"
        className="block w-58  p-6 m-5 bg-white  rounded-lg shadow-xl hover:bg-gray-100"
      >
        <p className=" text-red-700 text-xl text-center">
          Reportes abertos
        </p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-700">
         <div className="flex ml-10">
           <Image src="/DashBoardIcons/Abertos.png" width={40} height={20} alt="AbertosIcon"/> <div className="ml-2 mt-1.5">{TotalReportAberto}</div>
        </div>
        </h5>
      </a>

      <a
        href="#"
        className="block w-58  p-6 m-5 bg-white  rounded-lg shadow-xl hover:bg-gray-100"
      >
        <p className=" text-green-700 text-xl text-center">
          Reportes fechados
        </p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-700">
         <div className="flex ml-10">
           <Image src="/DashBoardIcons/Fechados.png" width={40} height={20} alt="a"/> <div className="ml-2 mt-1">{TotalReportFechado}</div>
        </div>
        </h5>
      </a>
    </div>
  );
}
