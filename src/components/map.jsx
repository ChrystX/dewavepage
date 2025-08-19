import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapLat = -7.8213449;
const mapLng = 110.3656522;

export default function LocationMap({ width = '100%', height = '300px', zoom = 15 }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    if (!isLoaded) return <p>Loading map…</p>;

    return (
        <GoogleMap
            mapContainerStyle={{ width, height }}
            center={{ lat: mapLat, lng: mapLng }}
            zoom={zoom}
        >
            <Marker position={{ lat: mapLat, lng: mapLng }} />
        </GoogleMap>
    );
}
