import React, { useMemo, useEffect } from 'react';
import { Sky } from '@react-three/drei';
import { Vector3 } from 'three';

const CustomSky = ({ time, weathercode }) => {
    // useMemo to calculate sun position and whether it's night or day based on the provided time prop
    const { sunPosition, isNight } = useMemo(() => {
        if (!time) {
            console.warn('CustomSky: time prop is undefined');
            return { sunPosition: new Vector3(0, 1, 0), isNight: false }; // Default to noon if time is not provided
        }

        // Split the time string into date and time components
        const [datePart, timePart] = time.split(', ');
        const [timePortion, period] = timePart.split(' ');
        let [hours, minutes] = timePortion.split(':').map(Number);

        // Convert 12-hour time format to 24-hour format
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        // Determine if it's night time (6 PM to 5 AM)
        const isNight = hours >= 18 || hours < 5;

        if (isNight) {
            // Set sun position below the horizon at night
            return { sunPosition: new Vector3(0, -1, 0), isNight };
        }

        // Calculate the sun's position based on the time of day
        const fractionalDay = (hours + minutes / 60) / 24; // Fraction of the day passed
        const theta = Math.PI * 2 * (fractionalDay - 0.25); // Rotate sun over the course of the day
        const phi = Math.PI; // Set constant elevation angle of the sun

        // Convert spherical coordinates to Cartesian coordinates for sun position
        const x = Math.sin(theta) * Math.cos(phi);
        const y = Math.sin(theta);
        const z = Math.cos(theta) * Math.cos(phi);

        return { sunPosition: new Vector3(x, y, z), isNight };
    }, [time]);

    // useMemo to calculate the sky's appearance properties based on the time of day
    const skyProps = useMemo(() => {
        if (!time) {
            return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 3, turbidity: 2 }; // Default to daytime if time is not provided
        }

        try {
            // Parse time again for more detailed sky settings
            const [datePart, timePart] = time.split(', ');
            const [timePortion, period] = timePart.split(' ');
            let [hours, minutes] = timePortion.split(':').map(Number);

            // Convert 12-hour time format to 24-hour format
            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;

            // Adjust sky properties based on the time of day
            if (hours >= 5 && hours < 8) {
                // Dawn (early morning)
                return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 2, turbidity: 1 };
            } else if (hours >= 8 && hours < 17) {
                // Daytime (late morning to afternoon)
                return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 3, turbidity: 2 };
            } else if (hours >= 17 && hours < 19) {
                // Dusk (early evening)
                return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 2, turbidity: 10 };
            } else {
                // Night
                return { mieCoefficient: 0.1000, mieDirectionalG: 0.8, rayleigh: -1, turbidity: 50 };
            }
        } catch (error) {
            // Handle errors in time parsing gracefully by reverting to default sky settings
            console.error('Error parsing time in CustomSky:', error);
            return { mieCoefficient: 0.005, mieDirectionalG: 0.8, rayleigh: 3, turbidity: 2 }; // Default to daytime
        }
    }, [time]);

    // Example useEffect (not specifically related to the sky, just illustrative)
    useEffect(() => {
        const element = document.getElementById('some-element');
        if (element) {
            element.addEventListener('someEvent', () => {
                // Event handler logic (example)
            });
        }

        return () => {
            if (element) {
                element.removeEventListener('someEvent', () => {
                    // Cleanup event handler logic (example)
                });
            }
        };
    }, []);

    return (
        <>
            {/* Render the sky component from drei with calculated sun position and sky properties */}
            <Sky
                distance={250} // Distance of the sky dome from the camera
                sunPosition={sunPosition} // Sun's position in the sky
                inclination={0} // Inclination of the sky
                azimuth={0.25} // Azimuth angle
                {...skyProps} // Spread the calculated sky properties
            />
            {isNight && (
                <color attach="background" args={['#000000']} /> // Set background to black during the night
            )}
        </>
    );
};

export default CustomSky;
