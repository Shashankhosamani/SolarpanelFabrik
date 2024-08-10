import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Rain = ({ isThunderstorm }) => {
    const rainCount = 10000; // Number of raindrops
    const rainGroupRef = useRef(); // Ref for the group containing raindrops
    const lightningRef = useRef(); // Ref for the directional light simulating lightning
    const { scene } = useThree(); // Access Three.js scene

    // Create raindrop meshes
    const raindrops = useMemo(() => {
        const drops = [];
        for (let i = 0; i < rainCount; i++) {
            // Random position for each raindrop
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;
            const z = Math.random() * 200 - 100;
            drops.push(
                <mesh key={i} position={[x, y, z]}>
                    <cylinderGeometry attach="geometry" args={[0.05, 0.05, 0.5, 32]} />
                    <meshBasicMaterial attach="material" color={0x888888} />
                </mesh>
            );
        }
        return drops;
    }, [rainCount]);

    // Update raindrop positions to simulate falling
    useFrame(() => {
        if (rainGroupRef.current) {
            rainGroupRef.current.children.forEach((drop) => {
                drop.position.y -= 1; // Adjust falling speed here
                if (drop.position.y < -100) {
                    drop.position.y = 100; // Reset position to the top
                }
            });
        }
    });

    // Handle thunderstorm effect
    useEffect(() => {
        if (isThunderstorm) {
            // Create a flash of lightning effect
            const interval = setInterval(() => {
                console.log('Thunderstorm effect triggered');

                // Simulate lightning by changing the background color and light intensity
                if (scene.background) {
                    scene.background.set(0xffffff); // Flash of white light
                } else {
                    scene.background = new THREE.Color(0xffffff);
                }
                if (lightningRef.current) {
                    lightningRef.current.intensity = 10; // Increase light intensity
                }
                setTimeout(() => {
                    // Reset background and light intensity after a short delay
                    if (scene.background) {
                        scene.background.set(0x333333); // Dark background
                    } else {
                        scene.background = new THREE.Color(0x333333);
                    }
                    if (lightningRef.current) {
                        lightningRef.current.intensity = 0; // Turn off light
                    }
                }, 100);
            }, 5000); // Flash every 5 seconds

            return () => clearInterval(interval); // Cleanup interval on component unmount
        }
    }, [isThunderstorm, scene]);

    return (
        <>
            {/* Group for all raindrop meshes */}
            <group ref={rainGroupRef}>
                {raindrops}
            </group>
            {/* Directional light used for lightning effect */}
            <directionalLight ref={lightningRef} position={[0, 10, 0]} intensity={0} />
        </>
    );
};

export default Rain;
