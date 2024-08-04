// GroundPlane.js
import React, { useRef, useEffect } from 'react';
import { TextureLoader } from 'three';

const GroundPlane = ({ position }) => {
    const planeRef = useRef();

    useEffect(() => {
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load('/coast_sand_rocks_02_diff_4k.jpg');

        planeRef.current.material.map = texture;
        planeRef.current.material.needsUpdate = true;
    }, []);

    return (
        <mesh receiveShadow position={position} rotation={[-Math.PI / 2, 0, 0]} ref={planeRef}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial />
        </mesh>
    );
};

export default GroundPlane;
