import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three';

const WeatherPanel = ({ position, weatherData }) => {
    const { ghi, temperature, rainAmount, localTime, timezone } = weatherData;

   

    const panelRef = React.useRef();

    return (
        <mesh position={position} ref={panelRef}>
            <boxGeometry args={[4, 2, 0.1]} />
            <meshStandardMaterial color="white" roughness={0.8} metalness={0.2} />
            <Html position={[0, 0, 0.1]} transform>
                <div style={styles.panel}>
                    <h2 style={styles.title}>Current Weather</h2>
                    <p>GHI: {ghi.toFixed(2)} W/m²</p>
                    <p>Temperature: {temperature.toFixed(1)}°C</p>
                    <p>Rain: {rainAmount.toFixed(2)} mm</p>
                    <p>Time: {localTime}</p>
                    <p>Timezone: {timezone}</p>
                </div>
            </Html>
        </mesh>
    );
};

const styles = {
    panel: {
        width: '100%',
        padding: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Arial, sans-serif',
        color: '#333'
    },
    title: {
        margin: '0 0 10px 0',
        fontSize: '18px',
        color: '#555'
    }
};

export default WeatherPanel;
