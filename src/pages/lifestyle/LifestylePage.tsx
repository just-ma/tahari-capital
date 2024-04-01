import styled from "styled-components";
import BackgroundImageSrc from "../../assets/images/tahari-lifestyle-background.jpg";
import LogoImageSrc from "../../assets/graphics/tahari-lifestyle-logo.svg";
import useAppContext from "../../hooks/useAppContext";
import { useEffect } from "react";

const Section = styled.div<{ opacity: number; reverse?: boolean }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  opacity: ${({ opacity }) => opacity};
  background-color: black;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  animation: fadeIn 2s forwards;
  opacity: 0;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const LogoImage = styled.img`
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 40px));
  pointer-events: none;
  z-index: 1;
  animation: fadeIn 1s forwards;
  opacity: 0;
`;

export default function LifestylePage() {
  const { scrollTop } = useAppContext();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Section
        opacity={Math.max(
          (window.innerHeight - scrollTop) / window.innerHeight,
          0
        )}
      >
        <BackgroundImage src={BackgroundImageSrc} />
        <LogoImage src={LogoImageSrc} draggable={false} />
      </Section>
    </>
  );
}
