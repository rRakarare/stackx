import React, { useState, useRef, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {RoundedBox, OrbitControls, Plane, useTexture, Reflector} from "@react-three/drei"
import { useSpring, animated, config } from '@react-spring/three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import Block from '../Block'

function Ground(props) {
  const [floor, normal] = useTexture(['/corn.jpg', '/blue.jpg'])
  return (
    <Reflector resolution={1024} args={[15, 15]} {...props}>
      {(Material, props) => <Material color="#f0f0f0" metalness={0} roughnessMap={floor} normalMap={normal} normalScale={[3, 3]} {...props} />}
    </Reflector>
  )
}

function Rig({ children }) {
  const ref = useRef()
  const vec = new THREE.Vector3()
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 4, 1.2, 4.5), 0.05)
  })
  return <group></group>
}

function StackCanvas() {

    const bevelRadius = 0.11;
    const bevelAmount = 7;

    const length = 2.1;
    const width = 1;
    const height = .5;

    const vertSpacing = .09;
    const hozSpacing = .06;

    const colors = [
      "#45739D",
        "#49C09C",
       "#EAAF56",
       "#CB5C5C"
      ]

    

    const [active, setActive] = useState(false);

    const { scale } = useSpring({ scale: active ? .9 : 1 })

    const springs = useSpring({
      first1: active ? [-(width+vertSpacing)/2-.3,-.2,.3]: [-(width+vertSpacing)/2,0,0],
      first2: active ? [+(width+vertSpacing)/2+.5,-.3,-.3]: [+(width+vertSpacing)/2,0,0],
      first3: active ? [-.2,height + hozSpacing,-(width+vertSpacing)/2 -.4]: [0,height + hozSpacing,-(width+vertSpacing)/2],
      first4: active ? [.5,height + hozSpacing,+(width+vertSpacing)/2 +.2]: [0,height + hozSpacing,+(width+vertSpacing)/2],
      first5: active ? [-(width+vertSpacing)/2 -.7,(height + hozSpacing)*2,-.4]: [-(width+vertSpacing)/2,(height + hozSpacing)*2,0],
      first6: active ? [+(width+vertSpacing)/2 + .4,(height + hozSpacing)*2 +.2,.2]: [+(width+vertSpacing)/2,(height + hozSpacing)*2,0],
      first7: active ? [-.4,(height + hozSpacing)*3 +.4,-(width+vertSpacing)/2 -.6]: [0,(height + hozSpacing)*3,-(width+vertSpacing)/2],
      first8: active ? [0,(height + hozSpacing)*3 +.5,+(width+vertSpacing)/2]: [0,(height + hozSpacing)*3,+(width+vertSpacing)/2],
      config: config.wobbly,
    })


    return (
        <Canvas>


          {/* <axesHelper /> */}

          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <ambientLight intensity={.3}/>
          <pointLight intensity={.4} position={[0,10,0]}/>

          <mesh onPointerOver={() => setActive(true)} onPointerLeave={() => setActive(false)}>
            <boxGeometry args={[2,2,2]}/>
            <meshPhongMaterial color="royalblue" transparent opacity={0}/>
          </mesh>

          <group position={[0,-.7,0]} >
            <animated.mesh scale={scale} position={springs.first1}>
            <Block   args={[width, height, length]} radius={bevelRadius} smoothness={bevelAmount} color={colors[0]} active={active}/>
            </animated.mesh>

            <animated.mesh scale={scale} position={springs.first2}>
            <Block   args={[width, height, length]} radius={bevelRadius} smoothness={bevelAmount} color={colors[0]} active={active}/>
            </animated.mesh>

            <animated.mesh scale={scale} position={springs.first3}>
            <Block   args={[length, height, width]} radius={bevelRadius} smoothness={bevelAmount} color={colors[1]} active={active}/>
            </animated.mesh>

            <animated.mesh scale={scale} position={springs.first4}>
            <Block   args={[length, height, width]} radius={bevelRadius} smoothness={bevelAmount} color={colors[1]} active={active}/>
            </animated.mesh>

            <animated.mesh scale={scale} position={springs.first5}>
            <Block   args={[width, height, length]} radius={bevelRadius} smoothness={bevelAmount} color={colors[2]} active={active}/>
            </animated.mesh>

            <animated.mesh scale={scale} position={springs.first6}>
            <Block   args={[width, height, length]} radius={bevelRadius} smoothness={bevelAmount} color={colors[2]} active={active}/>
            </animated.mesh>

            <animated.mesh scale={scale} position={springs.first7}>
            <Block   args={[length, height, width]} radius={bevelRadius} smoothness={bevelAmount} color={colors[3]} active={active}/>
            </animated.mesh>

            <animated.mesh scale={scale} position={springs.first8}>
            <Block   args={[length, height, width]} radius={bevelRadius} smoothness={bevelAmount} color={colors[3]} active={active}/>
            </animated.mesh>
          
          </group>
          <Suspense fallback={null}>
            <Rig>

            </Rig>

          <Ground mirror={1} blur={[500, 500]} mixBlur={35} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-z={-1} position-y={-1.6} />
          <EffectComposer multisampling={10}>
          <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.2} intensity={0.5} />
          <Bloom kernelSize={KernelSize.HUGE} luminanceThreshold={0} luminanceSmoothing={.4} intensity={0.1} />
        </EffectComposer>
          </Suspense>

         </Canvas>,
    )
}

export default StackCanvas
