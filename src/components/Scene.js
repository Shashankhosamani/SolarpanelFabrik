import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SolarPanelWrapper from './solarpanel';
import WeatherToggleButton from './Button'; // Assuming Button.js is the component for the buttons
import Rain from './rain';
import VolumetricFog from './Fog';
import Dayclouds from './Dayclouds';

const Scene = () => {
    const [showRain, setShowRain] = useState(false);
    const [showClouds, setShowClouds] = useState(false);
    const [showFog, setShowFog] = useState(false);

    const toggleRain = () => {
        setShowRain(prev => !prev);
        console.log('Rain toggled:', !showRain);
    };

    const toggleClouds = () => {
        setShowClouds(prev => !prev);
        console.log('Clouds toggled:', !showClouds);
    };

    const toggleFog = () => {
        setShowFog(prev => !prev);
        console.log('Fog toggled:', !showFog);
    };

    useEffect(() => {
        console.log('Active Weather Effects:');
        if (showRain) console.log('Rain is active');
        if (showClouds) console.log('Clouds are active');
        if (showFog) console.log('Fog is active');
        if (!showRain && !showClouds && !showFog) console.log('No weather effects are active');
    }, [showRain, showClouds, showFog]);

    return (
        <Canvas camera={{ position: [10, 10, 20], fov: 50 }} shadows>
            <ambientLight intensity={0.5} />
            <pointLight position={[100, 100, 100]} />
            <Suspense fallback={null}>
                {/* Buttons for controlling weather effects */}
                <WeatherToggleButton position={[-20, 10, -10]} onClick={toggleFog} label="Toggle Fog" />
                <WeatherToggleButton position={[-20, 6, -10]} onClick={toggleRain} label="Toggle Rain" />
                <WeatherToggleButton position={[-20, 2, -10]} onClick={toggleClouds} label="Toggle Clouds" />
                
                {/* Weather effects */}
                {showRain && <Rain />}
                {showClouds && <Dayclouds />}
                {showFog && <VolumetricFog />}

                <SolarPanelWrapper />
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
};

export default Scene;
