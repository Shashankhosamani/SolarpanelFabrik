// src/components/DataOverlay.js
import React from 'react';
import { Line } from '@react-three/drei';

const DataOverlay = ({ data }) => {
    // Ensure data is an array with valid points
    const points = data.map(d => [d.x, d.y, d.z]);

    return (
        <mesh>
            {points.length > 1 && <Line points={points} color="red" />}
        </mesh>
    );
};

export default DataOverlay;
