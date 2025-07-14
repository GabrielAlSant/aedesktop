"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

export interface MarkerType {
  _id: string;
  latitude: number;
  longitude: number;
  descricao: string;
  status: string;
}

interface MapsProps {
  markers: MarkerType[];
  location: { latitude: number; longitude: number } | null;
}

function SetViewOnLocation({
  location,
}: {
  location: { latitude: number; longitude: number };
}) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView([location.latitude, location.longitude], 18);
    }
  }, [location, map]);

  return null;
}

export default function Maps({ markers, location }: MapsProps) {
  const imagePrioridade = (status: string) => {
    const iconUrl =
      status === "aberto"
        ? "/Prioridades/Aberto.png"
        : "/Prioridades/Fechado.png";

    return new L.Icon({
      iconUrl,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
    });
  };

  return (
    <div className="w-full h-[480px] mt-4 rounded-xl border border-gray-300 shadow-xl bg-white dark:bg-gray-800">
      {location ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={18}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", borderRadius: "12px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <SetViewOnLocation location={location} />

           <Marker
            key={location.latitude + location.longitude}
            position={[location.latitude, location.longitude]}
            icon={L.icon({ iconUrl: "/point.png", iconSize: [32, 32] })}
          >
            <Popup>Você está aqui</Popup>
          </Marker>

          {markers.map((marker, index) => (
            <Marker
              key={marker._id}
              position={[marker.latitude, marker.longitude]}
              icon={imagePrioridade(marker.status.toLowerCase())}
            >
              <Popup>
                <strong>Buraco {index + 1}</strong>
                <br />
                Status: {marker.status}
                <br />
                {marker.descricao}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-600 dark:text-gray-300">
          Obtendo localização...
        </div>
      )}
    </div>
  );
}
