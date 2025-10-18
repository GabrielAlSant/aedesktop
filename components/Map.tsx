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

// Centraliza o mapa na localização inicial
function SetViewOnLocation({ location }: { location: { latitude: number; longitude: number } }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView([-22.24781, -53.34810], 18);
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
    <div className="w-full h-full bg-[#1a1b1f] relative">
      {location ? (
        <div className="w-full h-full brightness-[2.05] contrast-[0.9] saturate-[0.9]">
          <MapContainer
            center={[-22.24781, -53.34810]}
            zoom={18}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
     
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            />

            <Marker
              position={[-22.24781, -53.34810]}
              icon={L.icon({ iconUrl: "/point.png", iconSize: [32, 32] })}
            >
              <Popup>Localização inicial</Popup>
            </Marker>

            {location && <SetViewOnLocation location={location} />}

 
            {markers.map((marker, index) => (
              <Marker
                key={index}
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
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-300">
          Obtendo localização...
        </div>
      )}
    </div>
  );
}
