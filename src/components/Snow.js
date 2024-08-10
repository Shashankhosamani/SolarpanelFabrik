import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Snow = ({ isSnowstorm }) => {
    const snowCount = 10000; // Number of snowflakes
    const snowGroupRef = useRef(); // Reference to the group containing snowflakes
    const flurryRef = useRef(); // Reference to the light used for snowstorm effect
    const { scene } = useThree(); // Access to the scene

    // Create an array of snowflakes
    const snowflakes = useMemo(() => {
        const flakes = [];
        for (let i = 0; i < snowCount; i++) {
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;
            const z = Math.random() * 200 - 100;
            flakes.push(
                <mesh key={i} position={[x, y, z]}>
                    <sphereGeometry attach="geometry" args={[0.1, 16, 16]} />
                    <meshBasicMaterial attach="material" color={0xffffff} />
                </mesh>
            );
        }
        return flakes;
    }, [snowCount]);

    // Animate snowflakes
    useFrame(() => {
        if (snowGroupRef.current) {
            snowGroupRef.current.children.forEach((flake) => {
                flake.position.y -= 0.5; // Snowfall speed
                flake.position.x += (Math.random() - 0.5) * 0.1; // Simulate wind
                if (flake.position.y < -100) {
                    flake.position.y = 100; // Reset position when off-screen
                    flake.position.x = Math.random() * 200 - 100; // Random horizontal reset
                }
            });
        }
    });

    // Handle snowstorm effects
    useEffect(() => {
        if (isSnowstorm) {
            const interval = setInterval(() => {
                console.log('Snowstorm effect triggered');
                if (scene.background) {
                    scene.background.set(0xffffff); // Bright background during snowstorm
                } else {
                    scene.background = new THREE.Color(0xffffff);
                }
                if (flurryRef.current) {
                    flurryRef.current.intensity = 10; // Increase light intensity for snowstorm
                }
                setTimeout(() => {
                    if (scene.background) {
                        scene.background.set(0x333333); // Dark background after snowstorm
                    } else {
                        scene.background = new THREE.Color(0x333333);
                    }
                    if (flurryRef.current) {
                        flurryRef.current.intensity = 0; // Reset light intensity
                    }
                }, 100);
            }, 5000);

            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [isSnowstorm, scene]);

    return (
        <>
            <group ref={snowGroupRef}>
                {snowflakes}
            </group>
            <directionalLight ref={flurryRef} position={[0, 10, 0]} intensity={0} />
        </>
    );
};

export default Snow;
