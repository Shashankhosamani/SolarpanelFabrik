import React from 'react';
import { Cloud } from '@react-three/drei';

const Overcast = () => {
    // Array to store the positions of the clouds
    const cloudPositions = [];

    // Constants for cloud positioning
    const spacing = 20;         // Spacing between clouds
    const range = 90;           // Range to cover in the x and z directions
    const randomness = 90;      // Amount of random offset for cloud positions
    const yPosition = 50;       // Constant y position for clouds

    // Generate cloud positions with some randomness
    for (let x = -range; x <= range; x += spacing) {
        for (let z = -range; z <= range; z += spacing) {
            // Add some randomness to the x and z positions
            const randomX = x + Math.random() * randomness - randomness / 2;
            const randomZ = z + Math.random() * randomness - randomness / 2;
            // Push the new position to the cloudPositions array
            cloudPositions.push([randomX, yPosition, randomZ]);
        }
    }

    return (
        <>
            {/* Render each cloud at its computed position */}
            {cloudPositions.map((position, index) => (
                <Cloud
                    key={index}        // Unique key for each cloud to help React identify which items have changed
                    position={position} // Position of the cloud
                    speed={0.2}        // Speed at which the cloud moves
                    opacity={1}        // Opacity of the cloud
                    scale={4}          // Scale of the cloud
                    color="#D3D3D3"    // Color of the cloud
                />
            ))}
        </>
    );
};

export default Overcast;
