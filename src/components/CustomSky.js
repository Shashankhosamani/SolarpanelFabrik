import React, { useMemo, useEffect } from 'react';
import { Sky } from '@react-three/drei';
import { Vector3 } from 'three';

const CustomSky = ({ time , weathercode}) => {
    const { sunPosition, isNight } = useMemo(() => {
        if (!time) {
            console.warn('CustomSky: time prop is undefined');
            return { sunPosition: new Vector3(0, 1, 0), isNight: false }; // Default to noon
        }

        const [datePart, timePart] = time.split(', ');
        const [timePortion, period] = timePart.split(' ');
        let [hours, minutes] = timePortion.split(':').map(Number);

        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        const isNight = hours >= 18 || hours < 5;

        if (isNight) {
            // Set sun position below the horizon at night
            return { sunPosition: new Vector3(0, -1, 0), isNight };
        }

        // Calculate the sun's position based on the time
        const fractionalDay = (hours + minutes / 60) / 12;
        const theta = Math.PI * 2 * (fractionalDay ); // Rotate sun over the course of the day
        const phi = Math.PI; // Adjust this value to change the sun's height

        const x = Math.sin(theta) * Math.cos(phi);
        const y = Math.sin(theta);
        const z = Math.cos(theta) * Math.cos(phi);

        return { sunPosition: new Vector3(x, y, z), isNight };
    }, [time]);

    const skyProps = useMemo(() => {
        if (!time) {
            return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 3, turbidity: 2 }; // Default to daytime
        }

        try {
            const [datePart, timePart] = time.split(', ');
            const [timePortion, period] = timePart.split(' ');
            let [hours, minutes] = timePortion.split(':').map(Number);

            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;

            // Adjust sky properties based on time of day
            if (hours >= 5 && hours < 8) {
                // Dawn
                return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 2, turbidity: 1 };
            } else if (hours >= 8 && hours < 17) {
                // Daytime
                return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 3, turbidity: 2 };
            } else if (hours >= 17 && hours < 19) {
                // Dusk
                return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 2, turbidity: 10 };
            } else {
                // Night
                return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: -3, turbidity: 2 };
            }
        } catch (error) {
            console.error('Error parsing time in CustomSky:', error);
            return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 3, turbidity: 2 }; // Default to daytime
        }
    }, [time]);

    useEffect(() => {
        // Example: Adding a defensive check before adding event listeners
        const element = document.getElementById('some-element');
        if (element) {
            element.addEventListener('someEvent', () => {
                // Event handler logic
            });
        }

        return () => {
            if (element) {
                element.removeEventListener('someEvent', () => {
                    // Event handler logic
                });
            }
        };
    }, []);

    return (
        <>
            <Sky
                distance={250}
                sunPosition={sunPosition}
                inclination={0}
                azimuth={0.25}
                {...skyProps}
            />
            {isNight && (
                <color attach="background" args={['#000000']} /> // Black background for night
            )}
        </>
    );
};

export default CustomSky;
