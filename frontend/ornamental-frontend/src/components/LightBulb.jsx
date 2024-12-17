import React from "react";

function LightBulb(props) {
    return (
        <mesh position={props.position}>
            <pointLight color={props.color} shadow-bias={-0.001} castShadow={true} intensity={props.intensity} />
            <sphereGeometry args={props.size} />
        </mesh>
    );
}

export default LightBulb;
