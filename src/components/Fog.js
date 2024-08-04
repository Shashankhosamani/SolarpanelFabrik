import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const LinearFog = ({ color = 'white', near = 1, far = 100 }) => {
    const { scene } = useThree();

    useEffect(() => {
        scene.fog = new THREE.Fog(color, near, far);
        return () => {
            scene.fog = null;
        };
    }, [scene, color, near, far]);

    return null;
};

export default LinearFog;