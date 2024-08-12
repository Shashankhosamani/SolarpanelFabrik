// src/components/Scene.js
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import SolarPanelWrapper from './solarpanel';
import WeatherToggleButton from './Button';
import Rain from './rain';
import VolumetricFog from './Fog';
import Dayclouds from './Overcast';


const MovementHandler = ({ controlsRef, isPointerLocked }) => {
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
        if (!isPointerLocked || !controlsRef.current) return;

        const { forward, backward, left, right } = moveDirection.current;
        const speed = 0.1; // Adjust speed as necessary

        if (forward) controlsRef.current.moveForward(speed);
        if (backward) controlsRef.current.moveForward(-speed);
        if (left) controlsRef.current.moveRight(-speed);
        if (right) controlsRef.current.moveRight(speed);
    });

    return null;
};

const Scene = () => {
    const [showRain, setShowRain] = useState(false);
    const [showClouds, setShowClouds] = useState(false);
    const [showFog, setShowFog] = useState(false);
    const [isPointerLocked, setIsPointerLocked] = useState(false);
    const controlsRef = useRef();


    useEffect(() => {
        const handlePointerLockChange = () => {
            setIsPointerLocked(document.pointerLockElement === controlsRef.current?.domElement);
        };

        const handlePointerLockError = (error) => {
            console.error('Pointer lock error:', error);
            setIsPointerLocked(false);
        };

        document.addEventListener('pointerlockchange', handlePointerLockChange);
        document.addEventListener('pointerlockerror', handlePointerLockError);

        return () => {
            document.removeEventListener('pointerlockchange', handlePointerLockChange);
            document.removeEventListener('pointerlockerror', handlePointerLockError);
        };
    }, [controlsRef]);

    const requestPointerLock = () => {
        if (!isPointerLocked && controlsRef.current) {
            controlsRef.current.domElement.requestPointerLock().catch(error => {
                console.error("Pointer lock request failed:", error);
            });
        }
    };

    // Toggle rain visibility
    const toggleRain = () => {
        setShowRain(prev => !prev);
        console.log('Rain toggled:', !showRain);
    };

    // Toggle clouds visibility
    const toggleClouds = () => {
        setShowClouds(prev => !prev);
        console.log('Clouds toggled:', !showClouds);
    };

    // Toggle fog visibility
    const toggleFog = () => {
        setShowFog(prev => !prev);
        console.log('Fog toggled:', !showFog);
    };

    // Log the active weather effects
    useEffect(() => {
        console.log('Active Weather Effects:');
        if (showRain) console.log('Rain is active');
        if (showClouds) console.log('Clouds are active');
        if (showFog) console.log('Fog is active');
        if (!showRain && !showClouds && !showFog) console.log('No weather effects are active');
    }, [showRain, showClouds, showFog]);

    return (
        <Canvas
            camera={{ position: [5, 5, 5], fov: 40 }}
            shadows
            onClick={requestPointerLock}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[100, 100, 100]} />
            <Suspense fallback={null}>
                {/* Buttons for controlling weather effects */}
                <WeatherToggleButton position={[-20, 10, -10]} onClick={toggleFog} label="Toggle Fog" />
                <WeatherToggleButton position={[-20, 6, -10]} onClick={toggleRain} label="Toggle Rain" />
                <WeatherToggleButton position={[-20, 2, -10]} onClick={toggleClouds} label="Toggle Clouds" />

                {showRain && <Rain />}
                {showClouds && <Dayclouds />}
                {showFog && <VolumetricFog />}

                <SolarPanelWrapper />
              
            </Suspense>
            <PointerLockControls ref={controlsRef} />
            <MovementHandler controlsRef={controlsRef} isPointerLocked={isPointerLocked} />
        </Canvas>
    );
};

export default Scene;
