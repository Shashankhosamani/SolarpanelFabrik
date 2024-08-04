// InputPanel.js
import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { PlaneGeometry, MeshStandardMaterial } from 'three';

const InputPanel = ({ position, onSubmit }) => {
    const [latitude, setLatitude] = useState('13');
    const [longitude, setLongitude] = useState('77');
    const [efficiency, setEfficiency] = useState('0.15');
    const [area, setArea] = useState('1.6');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Convert pixel dimensions to Three.js units
    const panelWidth = 4; // 400px / 100
    const panelHeight = 3; // 300px / 100

    return (
        <group position={position}>
            {/* 3D Panel */}
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
                                type="text"
                                value={efficiency}
                                onChange={(e) => setEfficiency(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Area (m²):</label>
                            <input
                                type="text"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                style={styles.input}
                            />
                        </div>
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
                    </div>
                </Html>
            </mesh>
        </group>
    );
};

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
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    time: {
        marginTop: '15px',
        fontSize: '16px',
        color: '#666'
    }
};

export default InputPanel;
