import React, { useRef, useEffect } from 'react';
import { TextureLoader } from 'three';

const GroundPlane = ({ position }) => {
    // Create a reference to the mesh
    const planeRef = useRef();

    useEffect(() => {
        // Load the texture for the ground plane
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load('/coast_sand_rocks_02_diff_4k.jpg');

        // Apply the texture to the plane material
        planeRef.current.material.map = texture;
        planeRef.current.material.needsUpdate = true; // Notify Three.js that the material has been updated
    }, []); // Empty dependency array ensures this effect runs once after the initial render

    return (
        <mesh
            receiveShadow // Allow the plane to receive shadows
            position={position} // Position of the plane in the 3D space
            rotation={[-Math.PI / 2, 0, 0]} // Rotate the plane to be horizontal
            ref={planeRef} // Reference to the mesh for texture application
        >
            <planeGeometry args={[100, 100]} /> {/* Define the size of the plane */}
            <meshStandardMaterial /> {/* Apply a standard material to the plane */}
        </mesh>
    );
};

export default GroundPlane;
