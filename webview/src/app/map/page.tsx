"use client"

import dynamic from "next/dynamic";
import { useLocation } from "@/hooks/useLocation";

const LazyMap = dynamic(() => import("@/components/map/Map"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  });
  

export default function MapPage() {

    const { currentLocation, error } = useLocation();

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!currentLocation) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <LazyMap
            center={currentLocation}
            zoom={13}
            currentLocation={currentLocation}
            />
        </div>
    );
}