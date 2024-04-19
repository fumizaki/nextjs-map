"use client"

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import React from "react";

export type Position = {
    lat: number;
    lng: number;
    alt?: number | null;
}

export type Location = {
    position: Position;
    message: React.ReactNode;
}

type Props = {
    center: Position;
    zoom?: number;
    currentLocation: Position;
    locations?: Location[];
}


export default function Map({
    center,
    zoom = 13,
    currentLocation,
    locations = [],
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
        <Marker
            position={[currentLocation.lat, currentLocation.lng]}
            riseOnHover={true}
            >
          <Popup>
            {`You are here: ${currentLocation.lat}, ${currentLocation.lng}`}
          </Popup>
        </Marker>
        {locations.map(({ position, message }) => (
            <Marker
                key={`${position.lat}-${position.lng}`}
                position={[position.lat, position.lng]}
                riseOnHover={true}
                >
                <Popup>{message}</Popup>
            </Marker>
        ))}
      </MapContainer>
  );
};