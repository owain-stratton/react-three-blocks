import React from "react";
import "./App.scss";
import { Canvas, useFrame } from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { useSpring, a } from "react-spring/three";

// soften all shadows in the canvas
softShadows();

const Box = (props) => {
  const { position, args, color, speed } = props;
  const meshRef = React.useRef(null);

  useFrame(
    () => (meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01)
  );

  const [expand, setExpand] = React.useState(false);
  const styleProps = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  return (
    <a.mesh
      scale={styleProps.scale}
      onClick={() => setExpand(!expand)}
      castShadow
      position={position}
      ref={meshRef}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        speed={speed}
        factor={0.6}
        attach="material"
        color={color}
      />
    </a.mesh>
  );
};

function App() {
  return (
    <>
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.2} />
          </mesh>
          <Box
            position={[0, 1, 0]}
            args={[3, 2, 1]}
            color="lightblue"
            speed={2}
          />
          <Box position={[-2, 1, -5]} color="pink" speed={6} />
          <Box position={[5, 1, -2]} color="pink" speed={6} />
        </group>

        {/* Same as above */}
        {/* <Box>
          <meshStandardMaterial attach="material" />
        </Box> */}
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
