import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
//@ts-ignore
import { GLTFPlayer } from 'three-volumetric'

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh: any = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function App(props: any) {
  //const volcap = GLTFPlayer();

  useEffect(() => {

    ReactDOM.render(
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
      </Canvas>,
      document.getElementById('root')
    )
  
    // Initialization here

  }, [])
  return (
    <div className="App">

    </div>
  );
}

export default App;
