import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

function Box({ scale, active, color, ...rest }) {
  const first = useRef();

  const rand1 = Math.random()*6+1
  const rand2 = Math.random()*6+1
  const rand3 = Math.random()*6+1

  console.log(rand1,rand2,rand3)

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (active) {
      first.current.rotation.z = Math.sin(t / rand1) / 5;
      first.current.rotation.x = Math.sin(t / rand2) / 5;
      first.current.rotation.y = Math.sin(t / rand3) / 5;
    } else {
      const nt = 1.04;
      state.clock.start();

      first.current.rotation.z = first.current.rotation.z / nt;
      first.current.rotation.x = first.current.rotation.x / nt;
      first.current.rotation.y = first.current.rotation.y / nt;
    }
  });

  return (

      <RoundedBox {...rest} ref={first} castShadow receiveShadow>
        <meshStandardMaterial attach="material" color={color} />
      </RoundedBox>

  );
}

export default Box;
