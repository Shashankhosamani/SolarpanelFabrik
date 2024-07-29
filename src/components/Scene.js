import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SolarPanelWrapper from './solarpanel';
import Rain from './rain';
import Clouds from './Clouds';
import Button from './Button';
import { Html } from "@react-three/drei"
 // Make sure to import your CSS file

const Scene = () => {
    const [isRaining, setIsRaining] = useState(true);
    const [showClouds, setShowClouds] = useState(true);
    const [enableFog, setEnableFog] = useState(true);

    const toggleRain = () => setIsRaining(!isRaining);
    const toggleClouds = () => setShowClouds(!showClouds);
    const toggleFog = () => setEnableFog(!enableFog);

    return (
       
          
           
            <Canvas camera={{ position: [10, 10, 20], fov: 50 }} shadows>
                <ambientLight intensity={0.5} />
                <pointLight position={[100, 100, 100]} />
            
          

                {isRaining && <Rain count={1000} />}
                {showClouds && <Clouds count={100} />}

                <Suspense fallback={null}>
                    <SolarPanelWrapper />
                </Suspense>
            <Button position={[-10, 5, -15]} onClick={toggleRain} />
            <Button position={[-10, 3, -15]} onClick={toggleClouds} />
            <Button position={[-10, 1, -15]} onClick={toggleFog} />
                <OrbitControls />
            </Canvas>
    
    );
};

export default Scene;