import React from 'react';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const WeatherToggleButton = ({ position, onClick, label }) => {
    return (
        <mesh position={position} onClick={onClick}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color="#007bff" />
            <Html position={[0, 0, 0.01]} transform>
                <div style={styles.button}>
                    <span style={styles.text}>{label}</span>
                </div>
            </Html>
        </mesh>
    );
};

const styles = {
    button: {
        width: '150px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        userSelect: 'none',
    },
    text: {
        margin: '0',
    }
};

export default WeatherToggleButton;
