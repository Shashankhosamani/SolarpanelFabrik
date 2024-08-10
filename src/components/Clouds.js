import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const Clouds = () => {
    const { scene } = useThree(); // Access the Three.js scene object from the useThree hook
    const cloudTexture = useTexture('cloud10.png'); // Load the cloud texture using the useTexture hook
    const cloudGroupRef = useRef(); // Reference for the group of clouds

    // useMemo is used to generate a large number of cloud instances only once, instead of on every render
    const cloudInstances = useMemo(() => {
        const instances = [];
        const cloudGeometry = new THREE.PlaneGeometry(64, 64); // Geometry for each cloud

        for (let i = 0; i < 5000; i++) { // Create 5000 cloud instances
            const position = new THREE.Vector3(
                Math.random() * 1000 - 500, // Random x position within [-500, 500]
                Math.random() * 200 + 200,  // Random y position within [200, 400]
                Math.random() * 1000 - 500  // Random z position within [-500, 500]
            );

            const rotation = new THREE.Euler(
                0,
                Math.random() * Math.PI * 2, // Random y-axis rotation
                Math.random() * Math.PI * 2  // Random z-axis rotation
            );

            const scale = new THREE.Vector3(
                Math.random() * 2 + 2, // Random x-scale within [2, 4]
                Math.random() * 2 + 1, // Random y-scale within [1, 3]
                Math.random() * 2 + 2  // Random z-scale within [2, 4]
            );

            const speed = Math.random() * 0.5 + 0.1; // Random speed for each cloud within [0.1, 0.6]

            instances.push({ position, rotation, scale, speed }); // Store each cloud's properties
        }

        return instances;
    }, []);

    useEffect(() => {
        // Create a material for the clouds with transparency and a texture
        const cloudMaterial = new THREE.MeshLambertMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.6,
            depthWrite: false, // Disable depth writing to avoid z-fighting
        });

        const cloudGroup = new THREE.Group(); // Create a group to hold all cloud meshes
        cloudGroupRef.current = cloudGroup;

        cloudInstances.forEach((instance) => {
            // Create a mesh for each cloud instance using the plane geometry and cloud material
            const cloudMesh = new THREE.Mesh(new THREE.PlaneGeometry(64, 64), cloudMaterial);
            cloudMesh.position.copy(instance.position); // Set the cloud's position
            cloudMesh.rotation.copy(instance.rotation); // Set the cloud's rotation
            cloudMesh.scale.copy(instance.scale);       // Set the cloud's scale
            cloudMesh.renderOrder = 1; // Set render order to ensure correct rendering with transparency
            cloudMesh.userData.speed = instance.speed; // Store speed in the mesh's userData
            cloudGroup.add(cloudMesh); // Add the cloud to the group

            // Create a perpendicular clone of the cloud for a more volumetric effect
            const perpendicularMesh = cloudMesh.clone();
            perpendicularMesh.rotation.x += Math.PI / 2; // Rotate the clone to be perpendicular
            cloudGroup.add(perpendicularMesh); // Add the perpendicular cloud to the group
        });

        scene.add(cloudGroup); // Add the cloud group to the scene

        return () => {
            scene.remove(cloudGroup); // Clean up by removing the cloud group from the scene on unmount
        };
    }, [scene, cloudTexture, cloudInstances]);

    useFrame((state, delta) => {
        if (cloudGroupRef.current) {
            cloudGroupRef.current.children.forEach((cloud) => {
                cloud.position.x += cloud.userData.speed * delta * 10; // Move each cloud along the x-axis based on its speed

                // Reset cloud position if it moves out of bounds
                if (cloud.position.x > 500) {
                    cloud.position.x = -500;
                }
            });
        }
    });

    return null; // This component doesn't render any JSX, it's purely for creating and animating the clouds in the scene
};

export default Clouds;
