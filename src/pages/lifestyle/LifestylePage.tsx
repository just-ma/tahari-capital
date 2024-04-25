import styled from "styled-components";
import BackgroundImageSrc from "../../assets/images/tahari-lifestyle-background.jpg";
import LogoImageSrc from "../../assets/graphics/tahari-lifestyle-logo.svg";
import useAppContext from "../../hooks/useAppContext";
import { useEffect } from "react";
import LifestyleImg1 from "../../assets/images/lifestyle-gallery-1.jpg";
import LifestyleImg2 from "../../assets/images/lifestyle-gallery-2.jpg";
import LifestyleImg3 from "../../assets/images/lifestyle-gallery-3.jpg";
import LifestyleImg4 from "../../assets/images/lifestyle-gallery-4.jpg";
import LifestyleImg5 from "../../assets/images/lifestyle-gallery-5.jpg";
import LifestyleImg6 from "../../assets/images/lifestyle-gallery-6.jpg";
import LifestyleImg7 from "../../assets/images/lifestyle-gallery-7.jpg";
import LifestyleImg8 from "../../assets/images/lifestyle-gallery-8.jpg";
import { MEDIA_SIZE } from "../../constants";

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
  transform: translate(-50%, -30%);
  pointer-events: none;
  z-index: 2;
  animation: fadeIn 1s forwards;
  opacity: 0;

  @media ${MEDIA_SIZE.mobile} {
    width: 90%;
  }
`;

const Shadow = styled.div`
  position: absolute;
  width: 35%;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
  background-color: black;
  box-shadow: 0 0 80px 100px black;
  opacity: 0.6;
  z-index: 1;

  @media ${MEDIA_SIZE.mobile} {
    width: 80%;
  }
`;

const Gallery = styled.div<{ opacity: number }>`
  width: 100vw;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  opacity: ${({ opacity }) => opacity};
  gap: 2px;
  margin-top: 2px;
`;

const GalleryImage = styled.img<{ grow?: boolean; full?: boolean }>`
  display: block;
  height: 60vh;
  flex: ${({ grow }) => (grow ? 1 : 0)} 0
    ${({ full }) => (full ? "100%" : "0px")};
  object-fit: cover;

  @media ${MEDIA_SIZE.mobile} {
    flex: 1 0 100%;
    height: auto;
    width: 100%;
    min-height: 200px;
    max-height: 400px;
  }
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
      <Gallery opacity={Math.min(scrollTop / window.innerHeight, 1)}>
        <GalleryImage src={LifestyleImg7} />
        <GalleryImage src={LifestyleImg6} grow />
        <GalleryImage src={LifestyleImg8} grow full />
        <GalleryImage src={LifestyleImg1} grow />
        <GalleryImage src={LifestyleImg4} />
        <GalleryImage src={LifestyleImg5} grow full />
        <GalleryImage src={LifestyleImg2} />
        <GalleryImage src={LifestyleImg3} grow />
      </Gallery>
    </>
  );
}
