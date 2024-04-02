import styled from "styled-components";
import LandingVideo from "../../assets/videos/tahari-landing.m4v";
import PortfolioSection from "../portfolio/PortfolioSection";
import useAppContext from "../../hooks/useAppContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";

const VideoSection = styled.video<{ opacity: number }>`
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  display: block;
  opacity: ${({ opacity }) => opacity};
  pointer-events: none;
  user-select: none;
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
      <VideoSection
        src={LandingVideo}
        autoPlay
        loop
        muted
        controls={false}
        playsInline
        opacity={Math.max(
          (window.innerHeight - scrollTop) / window.innerHeight,
          0
        )}
      />
      <PortfolioSection />
    </>
  );
}
