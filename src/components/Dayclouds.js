import React from 'react';
import { Cloud } from '@react-three/drei';

const Dayclouds =()=> {
    const cloudPositions = [];

    const spacing = 20;
    const range = 60;

    for (let x = -range; x <= range; x += spacing) {
        for (let z = -range; z <= range; z += spacing) {
            cloudPositions.push([x, 50, z]);
        }
    }

    return (
        <>
            {cloudPositions.map((position, index) => (
                <Cloud key={index} position={position} speed={0.2} opacity={1} scale={4} color="white" />
            ))}
        </>
    );
};
export default Dayclouds;