// PlayerMovement.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

const PlayerMovement = () => {
    const { camera, gl } = useThree();
    const [isGrounded, setIsGrounded] = useState(true);
    const velocity = useRef(new Vector3(0, 0, 0));
    const moveDirection = useRef({ forward: false, backward: false, left: false, right: false });
    const mouseSensitivity = 0.1;  // Adjust sensitivity to a reasonable value
    const moveSpeed = 0.1;
    const gravity = -0.01;
    const jumpStrength = 0.2;
    const groundLevel = 0;

    useEffect(() => {
        const onKeyDown = (event) => {
            switch (event.key) {
                case 'w':
                case 'ArrowUp':
                    moveDirection.current.forward = true;
                    break;
                case 's':
                case 'ArrowDown':
                    moveDirection.current.backward = true;
                    break;
                case 'a':
                case 'ArrowLeft':
                    moveDirection.current.left = true;
                    break;
                case 'd':
                case 'ArrowRight':
                    moveDirection.current.right = true;
                    break;
                case ' ':
                    if (isGrounded) {
                        velocity.current.y = jumpStrength;
                        setIsGrounded(false);
                    }
                    break;
                default:
                    break;
            }
        };

        const onKeyUp = (event) => {
            switch (event.key) {
                case 'w':
                case 'ArrowUp':
                    moveDirection.current.forward = false;
                    break;
                case 's':
                case 'ArrowDown':
                    moveDirection.current.backward = false;
                    break;
                case 'a':
                case 'ArrowLeft':
                    moveDirection.current.left = false;
                    break;
                case 'd':
                case 'ArrowRight':
                    moveDirection.current.right = false;
                    break;
                default:
                    break;
            }
        };

        const onMouseMove = (event) => {
            if (document.pointerLockElement === gl.domElement) {
                const { movementX, movementY } = event;
                camera.rotation.y -= movementX * mouseSensitivity;
                camera.rotation.x -= movementY * mouseSensitivity;
                camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
            }
        };

        const onPointerLockChange = () => {
            if (document.pointerLockElement === gl.domElement) {
                document.addEventListener('mousemove', onMouseMove);
            } else {
                document.removeEventListener('mousemove', onMouseMove);
            }
        };

        const requestPointerLock = () => {
            gl.domElement.requestPointerLock().catch(console.error);
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        document.addEventListener('pointerlockchange', onPointerLockChange);

        gl.domElement.addEventListener('click', requestPointerLock);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            document.removeEventListener('pointerlockchange', onPointerLockChange);
            gl.domElement.removeEventListener('click', requestPointerLock);
            document.removeEventListener('mousemove', onMouseMove); // Ensure cleanup
        };
    }, [gl.domElement, camera]);

    useFrame(() => {
        const direction = new Vector3();
        if (moveDirection.current.forward) direction.z -= moveSpeed;
        if (moveDirection.current.backward) direction.z += moveSpeed;
        if (moveDirection.current.left) direction.x -= moveSpeed;
        if (moveDirection.current.right) direction.x += moveSpeed;

        direction.applyQuaternion(camera.quaternion);
        camera.position.add(direction);

        if (!isGrounded) {
            velocity.current.y += gravity; // Apply gravity
        }

        camera.position.add(velocity.current);

        if (camera.position.y <= groundLevel) {
            camera.position.y = groundLevel;
            velocity.current.y = 0;
            setIsGrounded(true);
        }
    });

    return null;
};

export default PlayerMovement;
