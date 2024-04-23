import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Sky,
  Sphere,
  useScroll,
  useTexture,
} from "@react-three/drei";
import DisplacementMap from "../../assets/images/terrain.jpg";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const LINE_NB_POINTS = 12000;

export default function HistoryCanvasContent() {
  const cameraGroup = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  const displacementMap = useTexture(DisplacementMap);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 100),
        new THREE.Vector3(0, -2.5, 20),
        new THREE.Vector3(0, -2.5, 0),
        new THREE.Vector3(0, 0, -20),
        new THREE.Vector3(-3, -1, -40),
        new THREE.Vector3(-4, -2, -60),
        new THREE.Vector3(-6, -2, -80),
        new THREE.Vector3(-4, -1, -100),
        new THREE.Vector3(-2, 0, -120),
        new THREE.Vector3(0, 3, -140),
        new THREE.Vector3(3, 4, -160),
        new THREE.Vector3(0, 0, -180),
        new THREE.Vector3(0, 0, -200),
        new THREE.Vector3(0, 0, -300),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve
      .getPoints(LINE_NB_POINTS)
      .filter((point) => point.z > -170 && point.z < 8);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.ellipse(0, -2, 0.05, 0.05, 0, Math.PI * 2);

    return shape;
  }, [curve]);

  const scroll = useScroll();

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );
    const curPoint = linePoints[curPointIndex];
    const pointAhead =
      linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

    const xDisplacement = (pointAhead.x - curPoint.x) * 80;

    // Math.PI / 2 -> LEFT
    // -Math.PI / 2 -> RIGHT

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 3);

    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current?.rotation.x,
        angleRotation,
        cameraGroup.current?.rotation.z
      )
    );

    cameraGroup.current?.quaternion.slerp(targetCameraQuaternion, delta * 2);

    cameraGroup.current?.position.lerp(curPoint, delta * 24);
  });

  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera fov={30} position={[-1, 0, 1]} makeDefault />
      </group>
      {/* <OrbitControls enableZoom={false} /> */}
      <fog attach="fog" args={["white", 0, 80]} />
      <pointLight intensity={20} position={[7, 5, 1]} />
      <Sky sunPosition={[7, 5, 1]} />
      <Environment preset="sunset" />
      {/* <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}>
        <LayerMaterial
          lighting="physical"
          transmission={1}
          side={THREE.BackSide}
        >
          <Gradient
            colorA={"white"}
            colorB={"black"}
            axes={"y"}
            start={0.5}
            end={0}
          />
        </LayerMaterial>
      </Sphere> */}
      <group position-y={1}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                // bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color={"white"} opacity={0.7} transparent />
        </mesh>
      </group>
      <group>
        <Plane
          args={[15, 5, 3000, 1000]}
          scale={15}
          position={[0, -4, -90]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        >
          <meshStandardMaterial
            attach="material"
            color="black"
            displacementMap={displacementMap}
          />
        </Plane>
        <Plane
          args={[1000, 1000]}
          position={[0, -4, -0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial attach="material" color="black" />
        </Plane>
      </group>
    </>
  );
}
