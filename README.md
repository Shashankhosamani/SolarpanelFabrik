# Solar Panel Digital Twin

This project is a React-based 3D simulation of solar panels and weather effects using React Three Fiber. It includes features like solar panel configuration, weather effects (rain, snow, fog), and real-time weather data integration using the Open Meteo API.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

Before running the application, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.


## Features

- **3D Solar Panels**: Visualize solar panels and their configurations.
- **Weather Effects**: Toggle rain, snow, fog, and clouds.
- **Real-Time Weather Data**: Fetch and display current weather conditions.
- **Interactive Controls**: Use buttons to toggle weather effects and configure solar panel parameters.

### Installation

1. Clone the repository:
   bash
   git clone https://github.com/Shashankhosamani/SolarpanelFabrik.git
   cd solarpanel-digital-twin
2. Install the dependencies:
    npm install
Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`
Launches the test runner in interactive watch mode.
See the section about running tests for more information.

### `npm run build`
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include hashes.
Your app is ready to be deployed!
See the section about deployment for more information.

### `npm run eject`
Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project. Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and medium deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you're ready for it.



## Components

### 1. `App.js`

- **Purpose**: Main application component that renders the `Scene` component.
- **Dependencies**: `Scene`, `./css/App.css`


### 2. `Scene.js`

- **Purpose**: Main scene setup with controls for toggling weather effects.
- **Dependencies**: `Canvas`, `OrbitControls`, `WeatherToggleButton`, `Rain`, `VolumetricFog`, `Dayclouds`, `SolarPanelWrapper`


### 3. `WeatherPanel.js`

- **Purpose**: Displays current weather data including GHI, temperature, rain amount, and local time.
- **Dependencies**: `Html`, `BoxGeometry`, `MeshStandardMaterial`


### 4. `WeatherEffects.js`

- **Purpose**: Exports weather effect components such as `Sky`, `Fog`, `Rain`, and `Snow`.
- **Dependencies**: `Sky`, `Fog`, `Rain`, `Snow`


### 5. `Rain.js`

- **Purpose**: Simulates rain and thunderstorm effects with configurable parameters.
- **Dependencies**: `THREE`, `useFrame`, `useThree`


### 6. `Snow.js`

- **Purpose**: Simulates snowfall and snowstorm effects with configurable parameters.
- **Dependencies**: `THREE`, `useFrame`, `useThree`


### 7. `GroundPlane.js`

- **Purpose**: Creates a textured ground plane for the scene.
- **Dependencies**: `TextureLoader`


### 8. `InputPanel.js`

- **Purpose**: UI panel for configuring solar panel parameters.
- **Dependencies**: `Html`, `PlaneGeometry`, `MeshStandardMaterial`


### 9. `LinearFog.js`

- **Purpose**: Adds linear fog to the scene.
- **Dependencies**: `THREE`, `useThree`


### 10. `Environment.js`

- **Purpose**: Renders different weather effects based on the weather code.
- **Dependencies**: `Overcast`, `PartialCloud`, `Overlay`, `Fog`, `Rain`, `Snow`

### 11.`solarpanel.js`

- **purpose**: Adds Solar-Panel Grid to the Scene.
- **Dependencies**: `@react-three/fiber`, `three`,'`react`,`@react-three/drei`,`./WeatherPanel`,`./WeatherService`,`./Environment`,`./InputPanel`,`./GroundPlane`,`./CustomSky`


### `API Integration`
The project uses the Open Meteo API to fetch real-time weather data. Ensure you have a stable internet connection for fetching weather information.

const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeatherData = async (latitude, longitude) => {
    const url = `${API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,rain,weathercode,direct_radiation&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}

### `Contributing`

Organisation Contributor, Fabrik.Space (https://www.linkedin.com/company/fabrikspace/)

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.


### `License`
This project is licensed under the MIT License - see the LICENSE file for details.

### `Learn More`
To learn more about Create React App and React, check out the following resources:

Create React App documentation [https://create-react-app.dev/docs/getting-started/] 
React documentation [https://reactjs.org/]

For information about code splitting, analyzing bundle size, making a progressive web app, advanced configuration, and troubleshooting, visit the official Create React App documentation.
