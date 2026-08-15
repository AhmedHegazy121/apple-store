import { View, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

import Lights from "./Lights";
import Iphone from "./Iphone";
import Loader from "./Loader";

function ModelView({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Global Environmental Baseline Light */}
      <ambientLight intensity={0.3} />

      {/* Primary Context Camera Definition */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      {/* Custom Model Spotlights */}
      <Lights />

      {/* Orbit Interaction Bindings */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      {/* 3D Transform Group Wrapper */}
      <group
        ref={groupRef}
        name={`${index === 1 ? "small" : "large"}`}
        position={[0, 0, 0]}
      >
        {/* Fallback boundary handler async GLTF streams */}
        <Suspense fallback={<Loader />}>
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
}

export default ModelView;
