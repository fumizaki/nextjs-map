"use client"

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type Position = {
    lat: number;
    lng: number;
    alt: number | null;
}

type Props = {
    center: Position;
    zoom?: number;
    currentLocation: Position;
}


export default function Map({
    center,
    zoom = 13,
    currentLocation
}: Props) {
  return (
      <MapContainer
        preferCanvas={true}
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[currentLocation.lat, currentLocation.lng]}>
          <Popup>
            This Marker icon is displayed correctly with <i>leaflet-defaulticon-compatibility</i>.
          </Popup>
        </Marker>
      </MapContainer>
  );
};