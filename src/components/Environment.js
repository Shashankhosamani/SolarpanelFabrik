// Environment.js
import React from 'react';
import { Sky, Fog, Rain, Snow } from './WeatherEffects'; // Assume these components are defined
import Dayclouds from './Dayclouds';


const Environment = ({ weatherCode }) => {
    const renderWeatherEffect = () => {
        if (weatherCode === 0) {
            return <Sky />;
        } else if ([1, 2, 3].includes(weatherCode)) {
            return <Dayclouds />;
        } else if ([45, 48].includes(weatherCode)) {
            return <Fog />;
        } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
            return (
                <>
                <Rain isThunderstorm={false} />
                <Dayclouds />
                </>
                )
         } else if ([95, 96, 99].includes(weatherCode)) {
        //     return <Rain isThunderstorm={true} />;
        } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
            return <Snow />;
        } else {
            return null;
        }
    };

    return (
    <>
            
            {renderWeatherEffect()}
    </>
        
           
           
       
    );
};

export default Environment;
