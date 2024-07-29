import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Button3D = ({ position, onClick, label }) => {
    const buttonRef = useRef();
    const textureRef = useRef();

    useEffect(() => {
        // Create a canvas and draw text
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = 'bold 24px Arial';
        context.fillStyle = 'black';
        context.fillText(label, 10, 50); // Adjust text positioning

        // Create a texture from the canvas
        const texture = new THREE.CanvasTexture(canvas);
        textureRef.current = texture;
    }, [label]);

    useFrame(() => {
        if (buttonRef.current) {
            buttonRef.current.rotation.y += 0.01;
        }
    });

    return (
        <group position={position} onClick={onClick}>
            <mesh ref={buttonRef} scale={[2, 0.5, 1]}>
                <boxGeometry args={[2, 0.5, 1]} />
                <meshStandardMaterial map={textureRef.current} />
            </mesh>
        </group>
    );
};

export default Button3D;
