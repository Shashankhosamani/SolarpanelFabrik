import React from 'react';
import { Html } from '@react-three/drei';
import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three';

// Component to display weather information in a 3D panel
const WeatherPanel = ({ position, weatherData }) => {
    const { ghi, temperature, rainAmount, localTime, timezone } = weatherData;

    return (
        <mesh position={position}>
            {/* 3D box geometry for the weather panel */}
            <boxGeometry args={[4, 2, 0.1]} />
            {/* Material for the box, giving it a white color with some roughness and metalness */}
            <meshStandardMaterial color="white" roughness={0.8} metalness={0.2} />
            {/* HTML overlay for displaying weather data */}
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

// Styles for the HTML overlay
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
