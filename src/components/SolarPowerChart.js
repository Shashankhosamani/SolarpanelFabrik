// SolarPowerChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const SolarPowerChart = ({ data }) => {
    const chartData = {
        labels: data.map(point => point.time), // X-axis labels (time)
        datasets: [
            {
                label: 'Solar Power (W-h)',
                data: data.map(point => point.power), // Y-axis data (solar power)
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true,
            },
        ],
    };

    return (
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '300px', height: '300px' }}>
            <Line data={chartData} />
        </div>
    );
};

export default SolarPowerChart;
