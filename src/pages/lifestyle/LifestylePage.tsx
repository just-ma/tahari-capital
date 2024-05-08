import styled from "styled-components";
import LogoImageSrc from "../../assets/graphics/tahari-lifestyle-logo.svg";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import { MEDIA_SIZE } from "../../constants";
import useGetDocument from "../../sanity/useGetDocument";
import { LifestylePageDefinition, getSrc } from "../../sanity";
import { get100ViewportHeight } from "../../utils";

const Section = styled.div<{ opacity: number; reverse?: boolean }>`
  position: relative;
  width: 100vw;
  height: ${get100ViewportHeight()};
  display: flex;
  align-items: center;
  opacity: ${({ opacity }) => opacity};
  background-color: black;
`;

const BackgroundImage = styled.img<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 2s opacity;
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

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @media ${MEDIA_SIZE.mobilePortrait} {
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

  @media ${MEDIA_SIZE.mobilePortrait} {
    width: 80%;
  }
`;

const Gallery = styled.div<{ opacity: number }>`
  width: 100vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  opacity: ${({ opacity }) => opacity};
  gap: 2px;
  margin-top: 2px;
`;

const Row = styled.div`
  display: flex;
  gap: 2px;
  width: 100%;

  @media ${MEDIA_SIZE.mobilePortrait} {
    flex-direction: column;
  }
`;

const GalleryImage = styled.img`
  display: block;
  height: ${get100ViewportHeight(0.6)};
  flex: 1 0;
  object-fit: cover;

  @media ${MEDIA_SIZE.mobilePortrait} {
    height: auto;
    width: 100%;
    min-height: 200px;
    max-height: 400px;
  }
`;

export default function LifestylePage() {
  const { scrollTop } = useAppContext();

  const { data } = useGetDocument<LifestylePageDefinition>("lifestylePage");

  const [imageLoaded, setImageLoaded] = useState(false);

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
        <BackgroundImage
          src={getSrc(data?.primaryImage)}
          onLoad={() => setImageLoaded(true)}
          show={imageLoaded}
        />
        <Shadow />
        <LogoImage src={LogoImageSrc} draggable={false} />
      </Section>
      <Gallery opacity={Math.min(scrollTop / window.innerHeight, 1)}>
        {data?.gallery.map(({ image1, image2, image3 }, index) => (
          <Row key={index}>
            <GalleryImage src={getSrc(image1)} />
            {image2 && <GalleryImage src={getSrc(image2)} />}
            {image3 && <GalleryImage src={getSrc(image3)} />}
          </Row>
        ))}
      </Gallery>
    </>
  );
}
