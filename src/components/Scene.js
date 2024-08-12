import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import SolarPanelWrapper from './solarpanel';
import WeatherToggleButton from './Button';
import Rain from './rain';
import VolumetricFog from './Fog';
import Dayclouds from './Overcast';

const MovementHandler = ({ controlsRef }) => {
    const moveDirection = useRef({ forward: false, backward: false, left: false, right: false });

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'w':
                case 'ArrowUp':
                    moveDirection.current.forward = true;
                    break;
                case 's':
                case 'ArrowDown':
                    moveDirection.current.backward = true;
                    break;
                case 'a':
                case 'ArrowLeft':
                    moveDirection.current.left = true;
                    break;
                case 'd':
                case 'ArrowRight':
                    moveDirection.current.right = true;
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event) => {
            switch (event.key) {
                case 'w':
                case 'ArrowUp':
                    moveDirection.current.forward = false;
                    break;
                case 's':
                case 'ArrowDown':
                    moveDirection.current.backward = false;
                    break;
                case 'a':
                case 'ArrowLeft':
                    moveDirection.current.left = false;
                    break;
                case 'd':
                case 'ArrowRight':
                    moveDirection.current.right = false;
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame(() => {
        const { forward, backward, left, right } = moveDirection.current;
        const speed = 0.1;

        if (controlsRef.current) {
            if (forward) controlsRef.current.moveForward(speed);
            if (backward) controlsRef.current.moveForward(-speed);
            if (left) controlsRef.current.moveRight(-speed);
            if (right) controlsRef.current.moveRight(speed);
        }
    });

    return null;
};

const Scene = () => {
    const [showRain, setShowRain] = useState(false);
    const [showClouds, setShowClouds] = useState(false);
    const [showFog, setShowFog] = useState(false);
    const controlsRef = useRef();

    const toggleRain = () => setShowRain(prev => !prev);
    const toggleClouds = () => setShowClouds(prev => !prev); // Corrected this line
    const toggleFog = () => setShowFog(prev => !prev);

    return (
        <Canvas camera={{ position: [10, 10, 20], fov: 50 }} shadows>
            <ambientLight intensity={0.5} />
            <pointLight position={[100, 100, 100]} />
            <Suspense fallback={null}>
                <WeatherToggleButton position={[-20, 10, -10]} onClick={toggleFog} label="Toggle Fog" />
                <WeatherToggleButton position={[-20, 6, -10]} onClick={toggleRain} label="Toggle Rain" />
                <WeatherToggleButton position={[-20, 2, -10]} onClick={toggleClouds} label="Toggle Clouds" />

                {showRain && <Rain />}
                {showClouds && <Dayclouds />}
                {showFog && <VolumetricFog />}

                <SolarPanelWrapper />
            </Suspense>
            <PointerLockControls ref={controlsRef} lookSpeed={0.1} />
            <MovementHandler controlsRef={controlsRef} />
        </Canvas>
    );
};

export default Scene;
