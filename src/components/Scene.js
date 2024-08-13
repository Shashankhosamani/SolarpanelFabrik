import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import SolarPanelWrapper from './solarpanel'; // Ensure this matches the correct file name
import './Scene.css'; // Import the CSS file for the crosshair

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

    return (
        <>
            <Canvas
                camera={{ position: [5, 5, 5], fov: 40 }}
                shadows
                onClick={requestPointerLock}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[100, 100, 100]} />
                <Suspense fallback={null}>
                    {/* Render weather effects directly if needed */}
                   
                    <SolarPanelWrapper />
                </Suspense>
                <PointerLockControls ref={controlsRef} />
                <MovementHandler controlsRef={controlsRef} isPointerLocked={isPointerLocked} />
            </Canvas>
            <div className="crosshair"></div> {/* Crosshair added */}
        </>
    );
};

export default Scene;
