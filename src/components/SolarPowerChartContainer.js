// SolarPowerChartContainer.js
import React, { useEffect, useState } from 'react';
import SolarPowerChart from './SolarPowerChart';
import { fetchWeatherData, calculateEnergy } from './WeatherService';

const SolarPowerChartContainer = ({ latitude, longitude, baseEfficiency, area }) => {
    const [chartData, setChartData] = useState({ hours: [], predictedValues: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWeatherData(latitude, longitude);

                // Assume hourly data is present in response
                const hours = data.hourly.time.map(time => new Date(time).toLocaleTimeString());
                const ghiValues = data.hourly.direct_radiation;
                const temperatures = data.hourly.temperature_2m;

                // Calculate predicted energy values
                const predictedValues = ghiValues.map((ghi, index) =>
                    calculateEnergy(ghi, baseEfficiency, area, temperatures[index])
                );

                setChartData({ hours, predictedValues });
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 900000); // Update every 15 minutes
        return () => clearInterval(interval); // Cleanup on unmount
    }, [latitude, longitude, baseEfficiency, area]);

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <SolarPowerChart hours={chartData.hours} predictedValues={chartData.predictedValues} />
        </div>
    );
};

export default SolarPowerChartContainer;
