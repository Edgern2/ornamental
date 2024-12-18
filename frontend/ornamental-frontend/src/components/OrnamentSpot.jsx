import React, { useEffect, useRef, useState } from "react";
import { addOrnament } from "@/components/api/api";
import * as THREE from "three";
import { useParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { EJSON } from "bson";

export default function OrnamentSpot(props) {
    const cookies = useCookies();

    function removeAvail(event) {
        const sphere = new THREE.SphereGeometry(0.1, 30, 10);
        const material = new THREE.MeshPhysicalMaterial({ color: 0x000000 });
        const usedOrn = new THREE.Mesh(sphere, material);
        usedOrn.name = "ornament";
        usedOrn.position.set(...event.object.position);
        usedOrn.showAuthor = props.showAuthor;
        usedOrn.hideAuthor = props.hideAuthor;
        usedOrn.authorId = EJSON.parse(cookies.get("userId"));
        event.object.parent.add(usedOrn);
        event.object.parent.remove(event.object);
        console.log(event.object);
    }

    const { id } = useParams();
    const viableSpots = [
        [0.1, 1.9, 0.7],
        [-0.25, 2.38, 0.25],
        [-0.9, 0.7, 0.8],
        [0.4, 1.3, -0.95],
        [0.9, 0.8, -0.1],
        [0.8, 1.5, 0.3],
        [0.1, 2.5, -0.24],
        [-0.85, 1.45, -0.34],
    ];

    const [taken, setTaken] = useState([]);
    const [avail, setAvail] = useState([]);

    useEffect(() => {
        const availIndex = [...viableSpots.keys()];
        setTaken(
            props.ornaments?.map((orn) => {
                if (availIndex.includes(orn.position)) {
                    availIndex.splice(availIndex.indexOf(orn.position), 1);
                }
                return viableSpots[orn.position];
            })
        );

        setAvail(
            availIndex.map((index) => {
                return viableSpots[index];
            })
        );
    }, [props.ornaments]);

    return (
        <group>
            {avail.map((coord, index) => (
                <mesh
                    visible={props.choose}
                    name={"avail_ornament"}
                    position={coord}
                    key={index + taken.length}
                    onClick={(event) => {
                        if (props.choose) {
                            removeAvail(event);
                            let position;
                            for (position = 0; position < viableSpots.length; position++) {
                                if (
                                    viableSpots[position].every((value, index) => {
                                        return value == [...event.object.position][index];
                                    })
                                ) {
                                    break;
                                }
                            }
                            addOrnament(id, cookies.get("userId"), position, 0);
                        }
                    }}
                >
                    <sphereGeometry args={[0.1, 30, 10]} />
                    <meshPhysicalMaterial color={"white"} transparent={true} opacity={0.3} />
                </mesh>
            ))}
            {taken.map((coord, index) => (
                <mesh
                    name={"ornament"}
                    position={coord}
                    key={index}
                    showAuthor={props.showAuthor}
                    hideAuthor={props.hideAuthor}
                    authorId={props.ornaments[0].authorid}
                >
                    <sphereGeometry args={[0.1, 30, 10]} />
                    <meshPhysicalMaterial color={"black"} />
                </mesh>
            ))}
        </group>
    );
}
