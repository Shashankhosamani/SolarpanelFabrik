import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationPicker = ({ onLocationSelect }) => {
    const [position, setPosition] = useState(null);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition(e.latlng);
                onLocationSelect({ latitude: lat, longitude: lng });
            },
        });

        return position === null ? null : (
            <Marker position={position}></Marker>
        );
    };

    return (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <LocationMarker />
        </MapContainer>
    );
};

export default LocationPicker;
