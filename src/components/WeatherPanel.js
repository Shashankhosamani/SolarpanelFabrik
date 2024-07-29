import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei';


const WeatherPanel = ({ position, weatherData }) => {
    const { ghi, temperature, rainAmount, localTime,timezone} = weatherData;
  


    return (
        <group position={position}>
            <Html transform position={[0, 0, 0.1]} rotation={[0, 0, 0]} scale={1}>
                <div style={{ width: '400px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
                    <h2>Current Weather</h2>
                    <p>GHI: {ghi.toFixed(2)} W/m²</p>
                    <p>Temperature: {temperature.toFixed(1)}°C</p>
                    <p>Rain: {rainAmount.toFixed(2)} mm</p>
                    <p>time: {localTime}</p>
                    <p>timezone:{timezone}</p>

                   
                </div>
            </Html>
        </group>
    );
};

export default WeatherPanel;
