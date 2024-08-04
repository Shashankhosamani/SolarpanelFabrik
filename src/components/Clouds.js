import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const Clouds = () => {
    const { scene } = useThree();
    const cloudTexture = useTexture('cloud10.png');
    const cloudGroupRef = useRef();

    const cloudInstances = useMemo(() => {
        const instances = [];
        const cloudGeometry = new THREE.PlaneGeometry(64, 64);

        for (let i = 0; i < 5000; i++) {
            const position = new THREE.Vector3(
                Math.random() * 1000 - 500,
                Math.random() * 200 + 200,
                Math.random() * 1000 - 500
            );

            const rotation = new THREE.Euler(
                0,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );

            const scale = new THREE.Vector3(
                Math.random() * 2 + 2,
                Math.random() * 2 + 1,
                Math.random() * 2 + 2
            );

            const speed = Math.random() * 0.5 + 0.1; // Random speed for each cloud

            instances.push({ position, rotation, scale, speed });
        }

        return instances;
    }, []);

    useEffect(() => {
        const cloudMaterial = new THREE.MeshLambertMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.6,
            depthWrite: false,
        });

        const cloudGroup = new THREE.Group();
        cloudGroupRef.current = cloudGroup;

        cloudInstances.forEach((instance) => {
            const cloudMesh = new THREE.Mesh(new THREE.PlaneGeometry(64, 64), cloudMaterial);
            cloudMesh.position.copy(instance.position);
            cloudMesh.rotation.copy(instance.rotation);
            cloudMesh.scale.copy(instance.scale);
            cloudMesh.renderOrder = 1;
            cloudMesh.userData.speed = instance.speed; // Store speed in userData
            cloudGroup.add(cloudMesh);

            const perpendicularMesh = cloudMesh.clone();
            perpendicularMesh.rotation.x += Math.PI / 2;
            cloudGroup.add(perpendicularMesh);
        });

        scene.add(cloudGroup);

        return () => {
            scene.remove(cloudGroup);
        };
    }, [scene, cloudTexture, cloudInstances]);

    useFrame((state, delta) => {
        if (cloudGroupRef.current) {
            cloudGroupRef.current.children.forEach((cloud) => {
                cloud.position.x += cloud.userData.speed * delta * 10; // Move clouds along x-axis

                // If cloud moves out of bounds, reset its position
                if (cloud.position.x > 500) {
                    cloud.position.x = -500;
                }
            });
        }
    });

    return null;
};

export default Clouds;