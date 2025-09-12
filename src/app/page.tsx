"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MarkerType } from "../../components/Map";
import Card from "../../components/Cards";
import RuasCriticas from "../../components/RuasCriticas";
import ProtectedRoute from "../context/protectRoute";

const Maps = dynamic(() => import("../../components/Map"), { ssr: false });

interface DashBoardData {
  TotalReport: number;
  TotalReportAberto: number;
  TotalReportFechado: number;
}

interface RuaInfo {
  id: string;
  nome: string;
  totalBuracos: number;
  totalConfirmacoes: number;
  totalCriticidade: number;
  score: number;
}

export default function VerBuracos() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [ruasCriticas, setRuasCriticas] = useState<RuaInfo[]>([]);
  const [dashBoardData, setDashBoardData] = useState<DashBoardData | null>(
    null
  );


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    }
  }, []);


  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
      console.error('NEXT_PUBLIC_DATABASE_URL is not defined');
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/RETORNARTODOSBURACOS`)
      .then((res) => res.json())
      .then((json) => setMarkers(json));
  }, []);


  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/TOTALREPORT`
    )
      .then((res) => res.json())
      .then((json) => setDashBoardData(json));
  }, [markers]);

  // Ruas críticas
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/SCOREVIAS`
    )
      .then((res) => res.json())
      .then((json) => setRuasCriticas(json));
  }, [markers]);

  return (
    <ProtectedRoute>
    <div className="p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="text-2xl font-extrabold">DashBoard</div>
          <div className="flex flex-wrap gap-4 mb-4">
            {dashBoardData ? (
              <Card
                TotalReport={dashBoardData.TotalReport || 0}
                TotalReportAberto={dashBoardData.TotalReportAberto || 0}
                TotalReportFechado={dashBoardData.TotalReportFechado || 0}
              />
            ) : (
              <Card
                TotalReport={0}
                TotalReportAberto={0}
                TotalReportFechado={0}
              />
            )}
          </div>
          <Maps markers={markers} location={location} />
        </div>

        <div className="w-full lg:w-[370px]">
          {ruasCriticas && <RuasCriticas ruas={ruasCriticas} />}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
