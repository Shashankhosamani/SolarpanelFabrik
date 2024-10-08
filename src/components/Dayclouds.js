import React from 'react';
import { Cloud } from '@react-three/drei';

const Dayclouds = () => {
    // Array to store the positions of the clouds
    const cloudPositions = [];

    // Define spacing between clouds and the range of cloud positions
    const spacing = 20;
    const range = 100;

    // Generate positions for clouds in a grid pattern
    for (let x = -range; x <= range; x += spacing) {
        for (let z = -range; z <= range; z += spacing) {
            // Add cloud positions to the array with a fixed height
            cloudPositions.push([x, 50, z]);
        }
    }

    return (
        <>
            {/* Render a Cloud component for each position in the cloudPositions array */}
            {cloudPositions.map((position, index) => (
                <Cloud
                    key={index}       // Unique key for each cloud element
                    position={position} // Position of the cloud
                    speed={0.2}        // Speed at which the cloud moves
                    opacity={1}        // Opacity of the cloud
                    scale={4}          // Scale of the cloud
                    color="#FFFFFF"      // Color of the cloud
                />
            ))}
        </>
    );
};

export default Dayclouds;
