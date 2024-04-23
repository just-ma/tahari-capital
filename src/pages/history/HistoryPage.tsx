import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import HistoryCanvasContent from "./HistoryCanvasContent";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { ScrollControls } from "@react-three/drei";

const StyledCanvas = styled(Canvas)`
  height: 100vh !important;
`;

export default function HistoryPage() {
  return (
    <StyledCanvas>
      <ScrollControls pages={10} damping={0.5}>
        <HistoryCanvasContent />
      </ScrollControls>
      <EffectComposer>
        <DepthOfField
          focusDistance={0} // where to focus
          focalLength={0.05} // focal length
          bokehScale={10} // bokeh size
          height={500}
        />
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
        {/* <Noise opacity={0.02} /> */}
        <Vignette eskil={false} offset={-0.2} darkness={1} />
      </EffectComposer>
    </StyledCanvas>
  );
}
