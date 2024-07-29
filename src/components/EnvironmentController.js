import { Color, Fog, Mesh, PlaneGeometry, ShaderMaterial, TextureLoader, MeshStandardMaterial, Points, PointsMaterial, BufferGeometry, Float32BufferAttribute } from 'three';

// Function to create a rain effect
const createRain = () => {
    const geometry = new BufferGeometry();
    const count = 10000;
    const vertices = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
        vertices[i] = Math.random() * 2000 - 1000; // X
        vertices[i + 1] = Math.random() * 2000 - 1000; // Y
        vertices[i + 2] = Math.random() * 2000 - 1000; // Z
    }

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

    const material = new PointsMaterial({
        color: 0xaaaaaa,
        size: 0.5,
        transparent: true,
        opacity: 0.5,
    });

    return new Points(geometry, material);
};

// Function to create a cloud effect
const createClouds = () => {
    const textureLoader = new TextureLoader();
    const cloudTexture = textureLoader.load('path/to/cloudTexture.png'); // Replace with actual texture path

    const geometry = new PlaneGeometry(2000, 2000);
    const material = new MeshStandardMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.5,
       
    });

    return new Mesh(geometry, material);
};

export const updateEnvironment = (scene, weatherCode, time) => {
    const hour = new Date(time).getHours();
    const dayProgress = Math.sin((hour / 24) * Math.PI);

    // Check if scene and required objects exist
    const sky = scene.getObjectByName('sky');
    const sunLight = scene.getObjectByName('sunLight');
    const fog = scene.getObjectByName('fog');
    const rain = scene.getObjectByName('rain') || createRain(); // Create rain if not present
    const clouds = scene.getObjectByName('clouds') || createClouds(); // Create clouds if not present

    if (!sky || !sunLight) {
        console.error('Sky or sunLight not found in the scene.');
        return;
    }

    // Add rain and clouds to the scene if they don't exist
    if (!scene.getObjectByName('rain')) {
        scene.add(rain);
        rain.name = 'rain';
    }
    if (!scene.getObjectByName('clouds')) {
        scene.add(clouds);
        clouds.name = 'clouds';
    }

    // Update sky color based on time of day and weather
    const skyMaterial = sky.material;
    if (skyMaterial) {
        const baseTopColor = new Color(0x0077ff);
        const baseBottomColor = new Color(0xffffff);

        switch (true) {
            case weatherCode === 0:
                // Clear sky
                baseTopColor.setRGB(0x0077ff);
                baseBottomColor.setRGB(0xffffff);
                break;
            case [1, 2, 3].includes(weatherCode):
                // Mainly clear, partly cloudy, and overcast
                baseTopColor.setRGB(0x87ceeb); // Light sky blue
                baseBottomColor.setRGB(0xd3d3d3); // Light grey
                break;
            case [45, 48].includes(weatherCode):
                // Fog and depositing rime fog
                baseTopColor.setRGB(0x6c757d); // Grey
                baseBottomColor.setRGB(0x6c757d); // Grey
                break;
            case [51, 53, 55].includes(weatherCode):
                // Drizzle: Light, moderate, and dense intensity
                baseTopColor.setRGB(0x6c757d); // Grey-blue
                baseBottomColor.setRGB(0x6c757d); // Grey-blue
                break;
            case [56, 57].includes(weatherCode):
                // Freezing Drizzle: Light and dense intensity
                baseTopColor.setRGB(0x7f8c8d); // Light grey
                baseBottomColor.setRGB(0x7f8c8d); // Light grey
                break;
            case [61, 63, 65].includes(weatherCode):
                // Rain: Slight, moderate and heavy intensity
                baseTopColor.setRGB(0x4682b4); // Steel blue
                baseBottomColor.setRGB(0x4682b4); // Steel blue
                break;
            case [66, 67].includes(weatherCode):
                // Freezing Rain: Light and heavy intensity
                baseTopColor.setRGB(0x708090); // Slate grey
                baseBottomColor.setRGB(0x708090); // Slate grey
                break;
            case [71, 73, 75].includes(weatherCode):
                // Snow fall: Slight, moderate, and heavy intensity
                baseTopColor.setRGB(0xf0f8ff); // Alice blue
                baseBottomColor.setRGB(0xf0f8ff); // Alice blue
                break;
            case weatherCode === 77:
                // Snow grains
                baseTopColor.setRGB(0xf5f5f5); // White smoke
                baseBottomColor.setRGB(0xf5f5f5); // White smoke
                break;
            case [80, 81, 82].includes(weatherCode):
                // Rain showers: Slight, moderate, and violent
                baseTopColor.setRGB(0x4169e1); // Royal blue
                baseBottomColor.setRGB(0x4169e1); // Royal blue
                break;
            case [85, 86].includes(weatherCode):
                // Snow showers: Slight and heavy
                baseTopColor.setRGB(0xffffff); // White
                baseBottomColor.setRGB(0xffffff); // White
                break;
            case [95, 96, 99].includes(weatherCode):
                // Thunderstorm: Slight, moderate, and with hail
                baseTopColor.setRGB(0x4b0082); // Indigo
                baseBottomColor.setRGB(0x4b0082); // Indigo
                break;
            default:
                // Fallback color
                baseTopColor.setRGB(0x0077ff);
                baseBottomColor.setRGB(0xffffff);
                break;
        }

        skyMaterial.uniforms.topColor.value.lerp(baseTopColor, 0.1);
        skyMaterial.uniforms.bottomColor.value.lerp(baseBottomColor, 0.1);
        skyMaterial.uniforms.dayProgress.value = dayProgress;
    }

    // Update sun position and intensity
    if (sunLight) {
        sunLight.position.set(
            Math.sin((hour / 24) * Math.PI * 2) * 10,
            Math.sin((hour / 24) * Math.PI) * 10,
            Math.cos((hour / 24) * Math.PI * 2) * 10
        );
        sunLight.intensity = Math.max(0, dayProgress);
    }

    // Handle fog for specific weather codes
    if (fog) {
        if ([45, 48].includes(weatherCode)) {
            // Fog
            fog.visible = true;
            fog.color.setRGB(0.8, 0.8, 0.8);
            fog.near = 1;
            fog.far = 10;
        } else if ([51, 53, 55, 61, 63, 65].includes(weatherCode)) {
            // Rain or drizzle
            fog.visible = true;
            fog.color.setRGB(0.7, 0.7, 0.7);
            fog.near = 1;
            fog.far = 20;
        } else if ([71, 73, 75, 77].includes(weatherCode)) {
            // Snow
            fog.visible = true;
            fog.color.setRGB(0.9, 0.9, 0.9);
            fog.near = 1;
            fog.far = 30;
        } else {
            // No fog
            fog.visible = false;
        }
    }

    // Handle rain
    if (rain) {
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
            // Rain or drizzle
            rain.visible = true;
            // Optionally, update rain particle system here
        } else {
            // No rain
            rain.visible = false;
        }
    }

    // Handle clouds
    if (clouds) {
        if ([1, 2, 3, 45, 48].includes(weatherCode)) {
            // Partly cloudy, overcast, or fog
            clouds.visible = true;
            // Optionally, adjust cloud texture or density here
        } else {
            // No clouds
            clouds.visible = false;
        }
    }
};
