import React from 'react';
import { Viewer, Scene, Globe, CameraFlyTo } from 'resium';
import { Cartesian3, SceneMode } from 'cesium';

const CesiumMap = ({ onSelectLocation }) => {
    const handleClick = (movement) => {
        const viewer = movement.target;
        const cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
        if (cartesian) {
            const cartographic = Cartesian3.cartesianToCartographic(cartesian);
            const longitude = cartographic.longitude * (180 / Math.PI);
            const latitude = cartographic.latitude * (180 / Math.PI);
            onSelectLocation(latitude, longitude);
        }
    };

    return (
        <Viewer full onClick={handleClick}>
            <Scene mode={SceneMode.SCENE3D} />
            <Globe />
            <CameraFlyTo destination={Cartesian3.fromDegrees(0, 0, 20000000)} />
        </Viewer>
    );
};

export default CesiumMap;