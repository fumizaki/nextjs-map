"use client"

import dynamic from "next/dynamic";
import { useLocation } from "@/hooks/useLocation";
import { Location } from "@/components/map/Map";
import { useState, useEffect, use } from "react";

const LazyMap = dynamic(() => import("@/components/map/Map"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  });
  

export default function MapPage() {

    const { currentLocation, isLoading, watchStatus, error } = useLocation();
    const [locations, setLocations] = useState<Location[]>([]);

    const fetchLocationList = async () => {
        const locations = await fetch("/api/location/list").then((res) => res.json());
        setLocations(locations);
    }

    useEffect(() => {
        fetchLocationList();
    }, [])

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
                zoom={11}
                currentLocation={currentLocation}
                locations={locations}
                />
        </div>
    );
}