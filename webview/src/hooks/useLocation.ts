import { useState, useEffect, useRef } from 'react';


export type WatchStatus = {
    isWatching: boolean;
    watchId: number | null;
};


export const useLocation = () => {
    const [currentLocation, setCurrentLocation] = useState<
        { lat: number; lng: number; alt: number | null } | undefined
    >();
    const [isLocationAvailable, setIsLocationAvailable] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [watchStatus, setWatchStatus] = useState<WatchStatus>({
        isWatching: false,
        watchId: null,
    });
    const [error, setError] = useState<Error | null>(null);

    // 初回レンダリング時のみフラグを設定
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            setIsLoading(true);
            isFirstRender.current = false;
        }
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            setIsLocationAvailable(true);
        } else {
            setError(new Error('Geolocation is not supported'));
        }
    }, []);

    useEffect(() => {
        if (isLocationAvailable) {
            const watchId = navigator.geolocation.watchPosition((position) => {
                setCurrentLocation({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  alt: position.coords.altitude,
                });
            });
            setWatchStatus({ isWatching: true, watchId: watchId });
            // 位置取得に成功したらローディング状態を解除
            setIsLoading(false);
        }

        // クリーンアップ関数で位置監視を停止
        return () => {
            if (watchStatus.isWatching && watchStatus.watchId) {
                navigator.geolocation.clearWatch(watchStatus.watchId);
            }
        };
    }, [isLocationAvailable, watchStatus]); // isLocationAvailable が変化した時のみ実行

    return { currentLocation, isLocationAvailable, watchStatus, isLoading, error };
};