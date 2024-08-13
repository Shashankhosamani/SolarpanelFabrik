const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Fetches weather data from Open-Meteo API based on latitude and longitude
export const fetchWeatherData = async (latitude, longitude) => {
    // Construct the URL for the API request
    const url = `${API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,rain,weathercode,direct_radiation&timezone=auto`;

    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // Extract the current local time and timezone from the response
    const currentTime = new Date(data.current_weather.time);
    const localTimezone = data.timezone;

    // Get the current hour and date for locating the corresponding data
    const currentHour = currentTime.getHours();
    const currentDate = currentTime.getDate();
    console.log(currentTime);

    // Find the index for the current hour in the hourly data
    const currentHourIndex = data.hourly.time.findIndex(hourTime => {
        const hourDate = new Date(hourTime);
        return hourDate.getHours() === currentHour && hourDate.getDate() === currentDate;
    });

    // Handle case where currentHourIndex is not found
    if (currentHourIndex === -1) {
        console.error('Current hour not found in hourly data');
        return;
    }

    // Log the local time and weather code for debugging
    console.log(currentTime.toLocaleString(currentTime.getHours()));
    console.log(data.hourly.weathercode[currentHourIndex]);

    // Return the relevant weather data
    return {
        ghi: data.hourly.direct_radiation[currentHourIndex], // Using direct radiation as an approximation for GHI
        temperature: data.hourly.temperature_2m[currentHourIndex],
        rainAmount: data.hourly.rain[currentHourIndex],
        weatherCode: data.hourly.weathercode[currentHourIndex],
        time: data.hourly.time[currentHourIndex],
        localTime: currentTime.toLocaleString(), // Get local time as a string
        timezone: localTimezone // Return the local timezone
    };
};

// Adjust efficiency based on temperature
const adjustEfficiencyForTemperature = (baseEfficiency, temperature) => {
    const temperatureCoefficient = 0.005; // 0.5% efficiency loss per degree above 25°C
    const referenceTemperature = 25; // Reference temperature in °C

    if (temperature > referenceTemperature) {
        const efficiencyLoss = (temperature - referenceTemperature) * temperatureCoefficient;
        return baseEfficiency * (1 - efficiencyLoss);
    }

    return baseEfficiency;
};

// Calculate the energy based on GHI, adjusted efficiency, and area
export const calculateEnergy = (ghi, baseEfficiency, area, temperature) => {
    const correctedGHI = ghi < 0 ? 0 : ghi;
    const adjustedEfficiency = adjustEfficiencyForTemperature(baseEfficiency, temperature);
    return correctedGHI * adjustedEfficiency * area * 0.25; // 0.25 represents the 15-minute interval
};
