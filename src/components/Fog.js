import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const LinearFog = ({ color = 'white', near = 1, far = 100 }) => {
    // Access the scene object from the Three.js context
    const { scene } = useThree();

    useEffect(() => {
        // Create and apply a linear fog to the scene
        scene.fog = new THREE.Fog(color, near, far);

        // Cleanup function to remove the fog when the component unmounts
        return () => {
            scene.fog = null;
        };
    }, [scene, color, near, far]); // Dependencies: update fog if color, near, or far change

    return null; // This component does not render anything
};

export default LinearFog;
