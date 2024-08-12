// SolarPowerChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

// Register chart components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const SolarPowerChart = ({ hours, predictedValues }) => {
    const data = {
        labels: hours,
        datasets: [
            {
                label: 'Predicted Solar Power Generation (W-h)',
                data: predictedValues,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw.toFixed(2)} W-h`;
                    }
                }
            }
        }
    };

    return <Line data={data} options={options} />;
};

export default SolarPowerChart;
