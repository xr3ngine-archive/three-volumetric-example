import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";

// import { unstable_createResource as createResource } from "../../resources/cache";
// import { Encoder } from "three/examples/jsm/loaders/GLTFLoader";
import ReactDOM from "react-dom";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  ReactThreeFiber,
} from "react-three-fiber";

import { DracosisPlayer } from "three-volumetric/dist/index";

function LoadPlayer() {
  var callback = function () {
    console.log("drc");
  };
  var renderer = new THREE.WebGLRenderer();
  var scene = new THREE.Scene();
  new DracosisPlayer(
    scene,
    "../public/assets/sample.drcs",
    callback,
    true,
    true,
    0,
    -1,
    1,
    100
  );
}

function App(props: any) {
  useEffect(() => {
    LoadPlayer();
    ReactDOM.render(
      <div>hi</div>,
      // <Canvas camera={{ position: [0, 0, 0], up: [0, 1, 0] }}>
      //   <ambientLight intensity={0.2} />
      //   <pointLight position={[1, 1, 1]} />
      // </Canvas>,
      document.getElementById("root")
    );
  }, []);

  return <div className="App"></div>;
}

export default App;
