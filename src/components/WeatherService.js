const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeatherData = async (latitude, longitude) => {
    const url = `${API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,rain,weathercode,direct_radiation&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    

    // Current local time
    const currentTime = new Date(data.current_weather.time);
    const localTimezone = data.timezone;

    // Get the current hour in the local time zone to find the index
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
    console.log(currentTime.toLocaleString(currentTime.getHours()));
    console.log(data.hourly.weathercode[currentHourIndex]);

    return {
        ghi: data.hourly.direct_radiation[currentHourIndex], // Using direct radiation as an approximation for GHI
        temperature: data.hourly.temperature_2m[currentHourIndex],
        rainAmount: data.hourly.rain[currentHourIndex],
        weatherCode: data.hourly.weathercode[currentHourIndex],
        time: data.hourly.time[currentHourIndex],
        localTime: currentTime.toLocaleString(currentTime.getHours()),
        timezone: localTimezone // Get local time
    };
};

export const calculateEnergy = (ghi, efficiency, area) => {
    return ghi * efficiency * area;
};
