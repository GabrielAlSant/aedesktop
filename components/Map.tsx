// components/Maps.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";


export interface MarkerType {
  _id: string;
  latitude: number;
  longitude: number;
  descricao: string
}

interface MapsProps {
  markers: MarkerType[];
  location: { latitude: number; longitude: number } | null;
}

function SetViewOnLocation({ location }: { location: { latitude: number; longitude: number } }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView([location.latitude, location.longitude], 18);
    }
  }, [location, map]);

  return null;
}

export default function Maps({ markers, location }: MapsProps) {
  const imagePrioridade = () => {
    return new L.Icon({
      iconUrl:
         "../Prioridades/Prioridade Alta.png",
         iconSize: [22, 22],
    });
  };

  return (
    <div className="w-[100%] h-[500px] p-6 ">
      {location && (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={18}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <SetViewOnLocation location={location} />

          <Marker
            position={[location.latitude, location.longitude]}
            icon={L.icon({ iconUrl: "/point.png", iconSize: [32, 32] })}
          >
            <Popup>Você está aqui</Popup>
          </Marker>

          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.latitude, marker.longitude]}
              icon={imagePrioridade()}
            >
              <Popup>Buraco {index + 1} - Reportado</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
