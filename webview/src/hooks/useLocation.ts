import { useState, useEffect } from 'react';

export const useLocation = () => {
    const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number, alt: number | null}>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            alt: position.coords.altitude
          });
        }, (error) => {
          setError(new Error(error.message));
        });
      }
      else {
        setError(new Error('Geolocation is not supported'));
      }
    }, []);

    return { currentLocation, error };
};