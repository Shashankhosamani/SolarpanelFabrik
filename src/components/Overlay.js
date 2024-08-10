import React from 'react';
import { Cloud } from '@react-three/drei';

const Overlay = () => {
    // Array to store the positions of the clouds
    const cloudPositions = [];

    // Constants for cloud positioning
    const spacing = 200; // Spacing between clouds
    const range = 50;    // Range to cover in the x and z directions

    // Generate cloud positions
    for (let x = -range; x <= range; x += spacing) {
        for (let z = -range; z <= range; z += spacing) {
            // Push the new position to the cloudPositions array
            cloudPositions.push([x, 50, z]);
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

export default Overlay;
