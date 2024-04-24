import { Image, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";

export default function HistoryCard({
  position,
  year,
  children,
  width = 1,
  height = 1,
  src,
  cameraPosition,
  align,
}: {
  position: [number, number, number];
  year: number;
  children: string;
  width?: number;
  height?: number;
  src: string;
  cameraPosition: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
  align: "left" | "right";
}) {
  const [opacity, setOpacity] = useState(0);

  useFrame(() => {
    if (cameraPosition.current) {
      const distance = cameraPosition.current.position.distanceTo(
        new THREE.Vector3(...position)
      );
      setOpacity(Math.max(0, Math.min(1, (25 - distance) / 10)));
    }
  });

  return (
    <group position={position}>
      <Text
        fontSize={0.4}
        anchorX={align}
        textAlign={align}
        anchorY={"bottom"}
        font={"./fonts/AeonikPro-Light.otf"}
        color={"black"}
        fillOpacity={opacity}
      >
        {year}
      </Text>
      <Text
        fontSize={0.13}
        maxWidth={2.7}
        anchorX={align}
        textAlign={align}
        anchorY={"top"}
        font={"./fonts/AeonikPro-Regular.otf"}
        color={"black"}
        fillOpacity={opacity}
      >
        {children}
      </Text>
      <Image
        url={src}
        position={[
          (align === "left" ? 0.5 : -0.5) * width,
          -0.5 * height - 0.1 + -0.17 * Math.ceil(children.length / 48),
          0,
        ]}
        scale={[width, height]}
        transparent
        opacity={opacity}
        radius={0.1}
      />
    </group>
  );
}
