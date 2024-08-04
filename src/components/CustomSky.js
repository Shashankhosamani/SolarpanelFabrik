import React, { useMemo } from 'react';
import { Sky } from '@react-three/drei';
import { Vector3 } from 'three';

const CustomSky = ({ time }) => {
    const { sunPosition, isNight } = useMemo(() => {
        if (!time) {
            console.warn('CustomSky: time prop is undefined');
            return { sunPosition: new Vector3(0, 1, 0), isNight: false }; // Default to noon
        }

        try {
            const [datePart, timePart] = time.split(', ');
            const [timePortion, period] = timePart.split(' ');
            let [hours, minutes] = timePortion.split(':');
            hours = parseInt(hours);
            minutes = parseInt(minutes);

            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;

            const isNight = hours >= 21 || hours < 5;

            if (isNight) {
                // Set sun position below the horizon at night
                return { sunPosition: new Vector3(0, -1, 0), isNight };
            }

            // Calculate the sun's position based on the time
            const theta = Math.PI * ((hours - 12 + minutes / 60) / 12);
            const phi = Math.PI / 2;

            const x = Math.cos(theta) * Math.sin(phi);
            const y = Math.cos(phi);
            const z = Math.sin(theta) * Math.sin(phi);

            return { sunPosition: new Vector3(x, y, z), isNight };
        } catch (error) {
            console.error('Error parsing time in CustomSky:', error);
            return { sunPosition: new Vector3(0, 1, 0), isNight: false }; // Default to noon
        }
    }, [time]);

    const skyProps = useMemo(() => {
        if (!time) {
            return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 3, turbidity: 2 }; // Default to daytime
        }

        try {
            const [datePart, timePart] = time.split(', ');
            const [timePortion, period] = timePart.split(' ');
            let [hours, minutes] = timePortion.split(':');
            hours = parseInt(hours);

            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;

            // Adjust sky properties based on time of day
            if (hours >= 5 && hours < 8) {
                // Dawn
                return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 2, turbidity: 10 };
            } else if (hours >= 8 && hours < 17) {
                // Daytime
                return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 3, turbidity: 2 };
            } else if (hours >= 17 && hours < 19) {
                // Dusk
                return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 4, turbidity: 20 };
            } else {
                // Night
                return { mieCoefficient: 1.000, mieDirectionalG: 0.000, rayleigh: 1, turbidity: 10 };
            }
        } catch (error) {
            console.error('Error parsing time in CustomSky:', error);
            return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 3, turbidity: 2 }; // Default to daytime
        }
    }, [time]);

    return (
        <>
            <Sky
                distance={450000}
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
