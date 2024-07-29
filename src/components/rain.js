import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Rain = ({ count }) => {
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const drops = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [Math.random() * 100 - 50, Math.random() * 100, Math.random() * 100 - 50],
                speed: Math.random() * 0.02 + 0.02,
            });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        drops.forEach((drop, i) => {
            drop.position[1] -= drop.speed;
            if (drop.position[1] < 0) {
                drop.position[1] = 100;
            }
            dummy.position.set(drop.position[0], drop.position[1], drop.position[2]);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <cylinderGeometry args={[0.02, 0.02, 1, 32]} />
            <meshStandardMaterial color="while" />
        </instancedMesh>
    );
};

export default Rain;
