"use client"

import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

export default function MapWithMarkers({ mainPosition, positions }: { mainPosition: [number, number], positions: { lat: number, lon: number }[] }) {

  return <MapContainer center={mainPosition} scrollWheelZoom={true} zoom={13} className="w-screen h-80" >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={mainPosition}>
      <Popup>
        Principal
      </Popup>
    </Marker>
    {positions.map((position, index) => (
      <Marker key={index} position={position}>
        <Popup>
          Otro Punto {index}
        </Popup>
      </Marker>
    ))}
  </MapContainer>
}