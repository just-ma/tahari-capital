import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import HistoryCanvasContent from "./HistoryCanvasContent";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { ScrollControls } from "@react-three/drei";
import { Suspense } from "react";

const StyledCanvas = styled(Canvas)`
  height: 100vh !important;
  z-index: 0;
`;

export default function HistoryPage() {
  return (
    <StyledCanvas>
      <Suspense>
        <ScrollControls pages={20} damping={0.5}>
          <HistoryCanvasContent />
        </ScrollControls>
        <EffectComposer>
          <Vignette eskil={false} offset={-0.2} darkness={1} />
        </EffectComposer>
      </Suspense>
    </StyledCanvas>
  );
}
