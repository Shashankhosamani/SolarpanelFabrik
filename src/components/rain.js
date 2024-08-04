import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Rain = ({ isThunderstorm }) => {
    const rainCount = 10000;
    const rainGroupRef = useRef();
    const lightningRef = useRef();
    const { scene } = useThree();

    const raindrops = useMemo(() => {
        const drops = [];
        for (let i = 0; i < rainCount; i++) {
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

    useFrame(() => {
        if (rainGroupRef.current) {
            rainGroupRef.current.children.forEach((drop) => {
                drop.position.y -= 1; // Increase this value to make the raindrops fall faster
                if (drop.position.y < -100) {
                    drop.position.y = 100;
                }
            });
        }
    });

    useEffect(() => {
        if (isThunderstorm) {
            const interval = setInterval(() => {
                console.log('Thunderstorm effect triggered');
                if (scene.background) {
                    scene.background.set(0xffffff);
                } else {
                    scene.background = new THREE.Color(0xffffff);
                }
                if (lightningRef.current) {
                    lightningRef.current.intensity = 10;
                }
                setTimeout(() => {
                    if (scene.background) {
                        scene.background.set(0x333333);
                    } else {
                        scene.background = new THREE.Color(0x333333);
                    }
                    if (lightningRef.current) {
                        lightningRef.current.intensity = 0;
                    }
                }, 100);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [isThunderstorm, scene]);

    return (
        <>
            <group ref={rainGroupRef}>
                {raindrops}
            </group>
            <directionalLight ref={lightningRef} position={[0, 10, 0]} intensity={0} />
        </>
    );
};

export default Rain;
