// app/ver-buracos/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MarkerType } from "../../components/Map";
import Card from "../../components/Cards";
import RuasCriticas from "../../components/RuasCriticas";

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
    fetch("https://projeto-vias-sjrv.vercel.app/RETORNARTODOSBURACOS")
      .then((res) => res.json())
      .then((json) => setMarkers(json));
    console.log(markers);
  }, [markers]);

  useEffect(() => {
    fetch("https://projeto-vias-sjrv.vercel.app/TOTALREPORT")
      .then((res) => res.json())
      .then((json) => setDashBoardData(json));
  }, []);

  useEffect(() => {
    fetch("https://projeto-vias-sjrv.vercel.app/SCOREVIAS")
      .then((res) => res.json())
      .then((json) => setRuasCriticas(json));
  }, []);
  return (
    <div>
      <div className="flex">
        <div className="inline">
          <div className="flex flex-wrap ">
            {dashBoardData && (
              <Card
                TotalReport={dashBoardData.TotalReport}
                TotalReportAberto={dashBoardData.TotalReportAberto}
                TotalReportFechado={dashBoardData.TotalReportFechado}
              />
            )}
          </div>
          <div className="inline">
            {markers && <Maps markers={markers} location={location} />}
          </div>
        </div>

        <div className="inline">
          {ruasCriticas && <RuasCriticas ruas={ruasCriticas} />}
        </div>
      </div>
    </div>
  );
}
