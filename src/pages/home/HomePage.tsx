import styled from "styled-components";
import LandingVideo from "../../assets/videos/tahari-landing.m4v";
import PortfolioSection from "../portfolio/PortfolioSection";
import useAppContext from "../../hooks/useAppContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";
import LogoSvg from "../../assets/graphics/tahari-captial-logo.svg?react";
import { MEDIA_SIZE } from "../../constants";

const MainSection = styled.div<{ opacity: number }>`
  height: 100vh;
  width: 100vw;
  position: relative;
  opacity: ${({ opacity }) => opacity};
  pointer-events: none;
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
`;

const Logo = styled(LogoSvg)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 45%;
  animation: fadeIn 2s forwards;
  opacity: 0;
  user-select: none;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media ${MEDIA_SIZE.mobile} {
    width: 90%;
  }
`;

export default function HomePage() {
  const location = useLocation();

  const { scrollTop } = useAppContext();

  useEffect(() => {
    if (location.hash === "#portfolio") {
      window.scrollTo({
        top: window.innerHeight - NAV_BAR_HEIGHT,
        behavior: "smooth",
      });
    }
  }, [location]);

  return (
    <>
      <MainSection
        opacity={Math.max(
          (window.innerHeight - scrollTop) / window.innerHeight,
          0
        )}
      >
        <Video
          src={LandingVideo}
          autoPlay
          loop
          muted
          controls={false}
          playsInline
        />
        <Logo />
      </MainSection>
      <PortfolioSection />
    </>
  );
}
