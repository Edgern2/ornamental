import Box from "@/components/Box";
import LightBulb from "../components/LightBulb";
import Controls from "@/components/Controls";
import Draggable from "@/components/Draggable";
import Model from "@/components/Model";
import Skybox from "@/components/Skybox";
import Snowflake from "@/components/Snowflake";
import DeerSpawner from "@/components/DeerSpawner";

export default function MyScene(props) {
    return (
        <group>
            <Skybox />

            <Snowflake count={500} />

            <ambientLight intensity={0.7} color={"white"} />
            <Draggable>
                <LightBulb position={[0, 3, 0]} size={[0.2, 30, 10]} intensity={5} color={"beige"} />
            </Draggable>

            <DeerSpawner deerCount={props.numReindeers}></DeerSpawner>
            <Model file="/christmas_tree.glb" position={[0, 0, 0]} />
            <Model file="/room.glb" position={[0, 0, 0]} />
            <Controls rotate={0.7} />
        </group>
    );
}
