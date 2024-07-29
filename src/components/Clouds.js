import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Clouds = ({ count }) => {
    const cloudRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const clouds = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [Math.random() * 200 - 100, Math.random() * 20 + 50, Math.random() * 200 - 100],
                speed: Math.random() * 0.001 + 0.001,
            });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        clouds.forEach((cloud, i) => {
            cloud.position[0] += cloud.speed;
            if (cloud.position[0] > 100) {
                cloud.position[0] = -100;
            }
            dummy.position.set(cloud.position[0], cloud.position[1], cloud.position[2]);
            dummy.updateMatrix();
            cloudRef.current.setMatrixAt(i, dummy.matrix);
        });
        cloudRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={cloudRef} args={[null, null, count]}>
            <boxGeometry args={[10, 5, 10]} />
            <meshStandardMaterial color="white" />
        </instancedMesh>
    );
};

export default Clouds;
