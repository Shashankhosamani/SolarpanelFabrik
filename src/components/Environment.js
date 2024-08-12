import React from 'react';
import { Sky, Fog, Rain, Snow } from './WeatherEffects'; // Assume these components are defined
import Overcast from './Overcast';
import PartialCloud from './PartialCloud';
import Overlay from './Overlay';

// Environment component that renders different weather effects based on weatherCode
const Environment = ({ weatherCode }) => {
    // Function to determine which weather effect to render based on the weatherCode
    const renderWeatherEffect = () => {
        if (weatherCode === 0) {
            // Clear sky
            return <Sky />;
        } else if ([3].includes(weatherCode)) {
            // Overcast
            return <Overcast />;
        } else if ([2].includes(weatherCode)) {
            // Partial cloud cover
            return <PartialCloud />;
        } else if ([1].includes(weatherCode)) {
            // Light cloud cover
            return <Overlay />;
        } else if ([45, 48].includes(weatherCode)) {
            // Foggy conditions
            return <Fog />;
        } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
            // Rainy conditions
            return (
                <>
                    <Rain isThunderstorm={false} /> {/* Regular rain */}
                    <Overcast /> {/* Overcast clouds */}
                </>
            );
        } else if ([95, 96, 99].includes(weatherCode)) {
            // Thunderstorms
            return (
                <>
                    <Rain isThunderstorm={true} /> {/*thundestrom rain */}
                    <Overcast /> {/* Overcast clouds */}
                </>
            );
        } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
            // Snowy conditions
            return <Snow />;
        } else {
            // Default case: no weather effect
            return null;
        }
    };

    return (
        <>
            {renderWeatherEffect()} {/* Render the appropriate weather effect */}
        </>
    );
};

export default Environment;
