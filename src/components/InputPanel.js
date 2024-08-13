import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Html } from '@react-three/drei';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';

// OpenLayersMap Component
const OpenLayersMap = ({ onSelectLocation, onClose }) => {
    const mapRef = useRef();
    const mapInstance = useMemo(() => {
        return new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2
            })
        });
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            mapInstance.setTarget(mapRef.current);

            mapInstance.on('click', (event) => {
                const [lon, lat] = toLonLat(event.coordinate);
                onSelectLocation(lat, lon);
            });
        }

        return () => mapInstance.setTarget(undefined);
    }, [mapInstance, onSelectLocation]);

    return (
        <div style={mapStyles.container}>
            <div ref={mapRef} style={mapStyles.map}></div>
            <button onClick={onClose} style={mapStyles.closeButton}>Close Map</button>
        </div>
    );
};

// InputPanel Component
const InputPanel = ({ position, onSubmit }) => {
    const [latitude, setLatitude] = useState('13');
    const [longitude, setLongitude] = useState('77');
    const [efficiency, setEfficiency] = useState('0.15');
    const [area, setArea] = useState('0.33');
    const [currentTime, setCurrentTime] = useState('');
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSelectLocation = (lat, lon) => {
        setLatitude(lat.toFixed(4));
        setLongitude(lon.toFixed(4));
        setShowMap(false);
    };

    const panelWidth = 4;
    const panelHeight = 3;

    return (
        <group position={position}>
            {!showMap && (
                <mesh>
                    <planeGeometry args={[panelWidth, panelHeight]} />
                    <meshStandardMaterial color="Blue" opacity={0.8} transparent />
                    <Html transform position={[0, 0, 0.01]} rotation={[0, 0, 0]} scale={1}>
                        <div style={styles.container}>
                            <h2 style={styles.title}>Solar Panel Configuration</h2>
                            <div style={styles.field}>
                                <label style={styles.label}>Latitude:</label>
                                <input
                                    type="text"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Longitude:</label>
                                <input
                                    type="text"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Efficiency:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={efficiency}
                                    onChange={(e) => setEfficiency(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Area:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <button onClick={() => setShowMap(true)} style={styles.button}>
                                Select from Map
                            </button>
                            <button
                                onClick={() => onSubmit({
                                    latitude: parseFloat(latitude),
                                    longitude: parseFloat(longitude),
                                    efficiency: parseFloat(efficiency),
                                    area: parseFloat(area)
                                })}
                                style={styles.button}
                            >
                                Update
                            </button>
                            <div style={styles.time}>Current Time: {currentTime}</div>
                        </div>
                    </Html>
                </mesh>
            )}
            {showMap && (
                <Html fullscreen>
                    <OpenLayersMap
                        onSelectLocation={handleSelectLocation}
                        onClose={() => setShowMap(false)}
                    />
                </Html>
            )}
        </group>
    );
};

// Styles for the map and panel
const mapStyles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    }
};

// Styles for the panel
const styles = {
    container: {
        width: '100%',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        margin: '0 0 15px 0',
        fontSize: '24px',
        color: '#333'
    },
    field: {
        marginBottom: '15px'
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555'
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box'
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '12px 15px ',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '15px',
        marginRight: '2px'
    },
    time: {
        marginTop: '15px',
        fontSize: '16px',
        color: '#666'
    }
};

export default InputPanel;
