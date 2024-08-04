// SolarPanelWrapper.js
import React, { useRef, useEffect, Suspense, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import WeatherPanel from './WeatherPanel';
import { fetchWeatherData, calculateEnergy } from './WeatherService';
import Environment from './Environment';
import CustomSky from './CustomSky';
import InputPanel from './InputPanel'; // Import InputPanel
import GroundPlane from './GroundPlane'; // Import GroundPlane


const SolarPanel = ({ position, id, onClick, energy }) => {
    const { scene } = useGLTF('/panel.glb');
    const panelRef = useRef();

    useEffect(() => {
        const clone = scene.clone();
        panelRef.current.add(clone);
    }, [scene]);

    return (
        <group
            ref={panelRef}
            position={position}
            onClick={(e) => {
                e.stopPropagation();
                onClick(id, energy);
            }}
        />
    );
};

const SolarPanelWrapper = () => {
    const [selectedPanel, setSelectedPanel] = useState(null);
    const [selectedPanelEnergy, setSelectedPanelEnergy] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [currentEnergy, setCurrentEnergy] = useState(0);
    const [weatherCode, setWeatherCode] = useState();
    const [panels, setPanels] = useState([]);
    const [localTime, setLocalTime] = useState('');

    const [panelConfig, setPanelConfig] = useState({
        latitude: 13,
        longitude: 77,
        efficiency: 0.15,
        area: 1.6
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWeatherData(panelConfig.latitude, panelConfig.longitude);
                setWeatherData(data);
                const energy = calculateEnergy(data.ghi, panelConfig.efficiency, panelConfig.area);
                setWeatherCode(data.weatherCode);
                setCurrentEnergy(energy);
                setLocalTime(data.localTime);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 3600000);
        return () => clearInterval(interval);
    }, [panelConfig]);

    useEffect(() => {
        const rows = 4;
        const cols = 5;
        const spacing = 3.5; // Adjust spacing between panels

        const newPanels = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const id = `${row}-${col}`;
                newPanels.push(
                    <SolarPanel
                        key={id}
                        id={id}
                        position={[col * spacing * 2, 0, row * spacing]}
                        onClick={(id) => {
                            setSelectedPanel(id);
                            setSelectedPanelEnergy(currentEnergy);
                        }}
                        energy={currentEnergy}
                        localTime={localTime}
                    />
                );
            }
        }
        setPanels(newPanels);
    }, [currentEnergy]);

    const handleConfigUpdate = (newConfig) => {
        setPanelConfig(newConfig);
    };
   
    const styles = {
        panel: {
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
            width: '250px',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            border: '1px solid #ddd'
        },
        title: {
            margin: '0 0 15px 0',
            fontSize: '22px',
            color: '#444',
            fontWeight: 'bold',
            textAlign: 'center'
        },
        text: {
            margin: '10px 0',
            fontSize: '16px',
            lineHeight: '1.5'
        },
        button: {
            display: 'block',
            marginTop: '15px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            textAlign: 'center',
            transition: 'background-color 0.3s ease',
            width: '100%'
        },
        buttonHover: {
            backgroundColor: '#0056b3'
        }
    };
    return (
        <Suspense fallback={null}>
            <ambientLight intensity={0.2} />

            {panels}

            <GroundPlane position={[0, -0.05, 0]} />

            <InputPanel position={[0, 5, -10]} onSubmit={handleConfigUpdate} />

            <Environment weatherCode={weatherCode} />

            {weatherData && (
                <WeatherPanel position={[-12, 5, -10]} weatherData={weatherData} />
            )}

            {weatherData && weatherData.localTime && (
                <CustomSky time={weatherData.localTime} />
            )}

            

            {selectedPanel && (
                <Html>
                    <div style={styles.panel}>
                        <h2 style={styles.title}>Panel Details</h2>
                        <p style={styles.text}>Selected Panel ID: <strong>{selectedPanel}</strong></p>
                        <p style={styles.text}>Energy Generated: <strong>{selectedPanelEnergy !== null ? selectedPanelEnergy.toFixed(2) : 'N/A'} W</strong></p>
                        <button style={styles.button} onClick={() => {
                            setSelectedPanel(null);
                            setSelectedPanelEnergy(null);
                        }}>Close</button>
                    </div>
                </Html>
            )}
        </Suspense>
        
    );
};

export default SolarPanelWrapper;
