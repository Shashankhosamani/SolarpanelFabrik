import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CustomSky = ({ time }) => {
    const skyRef = useRef();
    const sunRef = useRef();

    const skyShaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                topColor: { value: new THREE.Color(0x0077ff) },
                bottomColor: { value: new THREE.Color(0xffffff) },
                offset: { value: 33 },
                exponent: { value: 0.6 },
                time: { value: 0 }
            },
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float offset;
                uniform float exponent;
                uniform float time;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition + offset).y;
                    float dayProgress = (sin(time * 3.14159 / 12.0 - 3.14159 / 2.0) + 1.0) / 2.0;
                    vec3 dayTopColor = topColor;
                    vec3 dayBottomColor = bottomColor;
                    vec3 nightTopColor = vec3(0.0, 0.0, 0.05);
                    vec3 nightBottomColor = vec3(0.0, 0.0, 0.1);
                    vec3 currentTopColor = mix(nightTopColor, dayTopColor, dayProgress);
                    vec3 currentBottomColor = mix(nightBottomColor, dayBottomColor, dayProgress);
                    gl_FragColor = vec4(mix(currentBottomColor, currentTopColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
                }
            `,
            side: THREE.BackSide
        });
    }, []);

    useEffect(() => {
        if (time) {
            const date = new Date(time);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const timeValue = hours + minutes / 60;
            skyShaderMaterial.uniforms.time.value = timeValue;
        }
    }, [time, skyShaderMaterial]);

    useFrame(() => {
        if (sunRef.current) {
            const timeValue = skyShaderMaterial.uniforms.time.value;
            const angle = (timeValue / 24) * Math.PI * 2 - Math.PI / 2;
            sunRef.current.position.set(
                Math.cos(angle) * 1000,
                Math.sin(angle) * 1000,
                0
            );

            // Adjust sun intensity based on time
            const intensity = Math.max(0, Math.sin((timeValue / 24) * Math.PI * 2));
            sunRef.current.intensity = intensity;
        }
    });

    return (
        <>
            <mesh ref={skyRef}>
                <sphereGeometry args={[1000, 32, 15]} />
                <primitive object={skyShaderMaterial} attach="material" />
            </mesh>
            <directionalLight
                ref={sunRef}
                color={0xffffbb}
                intensity={1}
                position={[0, 1000, 0]}
            />
            <ambientLight intensity={0.1} /> {/* Add subtle ambient light */}
        </>
    );
};

export default CustomSky;