import * as THREE from "three";
import React, { useEffect, useRef, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  ReactThreeFiber,
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import { GLTFPlayer } from "three-volumetric/dist/index";

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

function LoadPlayer() {
  const { scene } = useThree();

  const volcap = new GLTFPlayer(
    scene,
    "assets/file.glb",
    function () {},
    0.05,
    { x: 0, y: -5, z: 0 }
  );
  // useFrame(() => volcap.update());
  const mesh: any = useRef();

  return <mesh></mesh>;
}

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh: any = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}

export function Controls() {
  const ref: any = useRef();
  const { camera, gl } = useThree();
  useFrame(() => ref.current.update());
  return (
    <orbitControls
      ref={ref}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.8}
    />
  );
}

function App(props: any) {
  useEffect(() => {
    ReactDOM.render(
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight />
        {/* <pointLight position={[1, 1, 1]} /> */}
        <Suspense fallback={<Box />}>{<LoadPlayer />}</Suspense>
        <Controls />
        {/* <Box position={[0, 0, 0]} /> */}
      </Canvas>,
      document.getElementById("root")
    );

    // Initialization here
  }, []);
  return <div className="App"></div>;
}

export default App;
