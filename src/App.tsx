import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";

// import { unstable_createResource as createResource } from "../../resources/cache";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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
  var loaded: boolean;
  var model: any;
}

function LoadPlayer() {
  const [onLoaded, setonLoaded] = useState(false);
  const [onLoading, setonLoading] = useState(false);

  const { scene } = useThree();
  if (!onLoaded && !onLoading) {
    setonLoading(true);
    new GLTFPlayer(
      scene,
      "assets/optimized_howie_v2.glb",
      "assets/audio/handsanitizersound_cut.wav",
      function () {
        console.log("function called");
        setonLoaded(true);
        // global.loaded = true;
      },
      4,
      { x: 0, y: -5, z: -10 },
      { x: -Math.PI / 2, y: 0, z: -Math.PI / 2 },
      true,
      true,
      true,
      true,
      2,
      191
    );
  }
  // useFrame(() => volcap.update());
  const mesh: any = useRef();
  return <mesh></mesh>;
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
      <Canvas camera={{ position: [0, 0, 0], up: [0, 1, 0] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[1, 1, 1]} />
        <LoadPlayer />
        <Controls />
      </Canvas>,
      document.getElementById("root")
    );
  }, []);

  return <div className="App"></div>;
}

export default App;
