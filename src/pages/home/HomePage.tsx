import styled from "styled-components";
import LandingVideo from "../../assets/videos/tahari.m4v";
import PortfolioSection, {
  PORTFOLIO_SECTION_HEIGHT,
} from "../portfolio/PortfolioSection";
import useAppContext from "../../hooks/useAppContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ContactSection from "../contact/ContactSection";

const VideoSection = styled.video<{ opacity: number }>`
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  display: block;
  opacity: ${({ opacity }) => opacity};
`;

export default function HomePage() {
  const location = useLocation();

  const { scrollTop } = useAppContext();

  useEffect(() => {
    if (location.hash === "#portfolio") {
      window.scrollTo({
        top: window.innerHeight * (1 + (PORTFOLIO_SECTION_HEIGHT - 1) / 2),
        behavior: "smooth",
      });
    } else if (location.hash === "#contact") {
      window.scrollTo({
        top: window.innerHeight * (1 + PORTFOLIO_SECTION_HEIGHT),
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
        opacity={Math.max(
          (window.innerHeight - scrollTop) / window.innerHeight,
          0
        )}
      />
      <PortfolioSection />
      <ContactSection />
    </>
  );
}
