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
  width: 45%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -10%);
  pointer-events: none;
  z-index: 2;
  animation: fadeIn 1s forwards;
  opacity: 0;
`;

const Shadow = styled.div`
  position: absolute;
  width: 35%;
  height: 10px;
  top: 60%;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: black;
  box-shadow: 0 0 100px 100px black;
  opacity: 0.6;
  z-index: 1;
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
        <Shadow />
        <LogoImage src={LogoImageSrc} draggable={false} />
      </Section>
    </>
  );
}
