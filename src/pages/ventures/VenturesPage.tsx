import styled, { css } from "styled-components";
import LogoImageSrc from "../../assets/graphics/tahari-ventures-logo.svg";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import { MEDIA_SIZE } from "../../constants";
import useGetDocument from "../../sanity/useGetDocument";
import { VenturesPageDefinition, getSrc } from "../../sanity";
import { get100ViewportHeight } from "../../utils";

const Section = styled.div<{ opacity: number }>`
  position: relative;
  width: 100vw;
  height: ${get100ViewportHeight()};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ opacity }) => opacity};
`;

const LogosSection = styled(Section)`
  height: fit-content;
  padding: 0 150px 150px;
  flex-wrap: wrap;
  gap: 50px;
  box-sizing: border-box;
  pointer-events: none;
  margin-top: -100px;

  @media ${MEDIA_SIZE.mobile} {
    padding: 0 15px 50px;
    gap: 30px;
  }
`;

const Logo = styled.img<{
  show: boolean;
  delay: number;
  grow: boolean;
}>`
  user-select: none;
  transform: scale(0.8);
  opacity: ${({ show }) => (show ? 1 : 0)};
  margin-top: ${({ show }) => (show ? 30 : 0)}px;
  transition: 1s margin-top ${({ delay }) => delay}s cubic-bezier(0.4, 0, 0, 1),
    1s opacity ${({ delay }) => delay}s;
  max-width: 500px;
  max-height: 200px;

  @media ${MEDIA_SIZE.mobile} {
    display: block;
    max-width: 100px;
    max-height: 70px;
    transform: scale(1);
    width: auto;
    height: auto;
    ${({ grow }) =>
      grow &&
      css`
        margin-left: 5%;
        margin-right: 5%;
      `}
  }
`;

const BackgroundImage = styled.img<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
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
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
  animation: fadeIn 1s forwards;
  opacity: 0;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @media ${MEDIA_SIZE.mobile} {
    width: 90%;
  }
`;

export default function VenturesPage() {
  const { data } = useGetDocument<VenturesPageDefinition>("venturesPage");

  const [show, setShow] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { scrollTop } = useAppContext();

  useEffect(() => {
    setShow(scrollTop > window.innerHeight * 0.15);
  }, [scrollTop]);

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
        <LogoImage src={LogoImageSrc} draggable={false} />
      </Section>
      <LogosSection opacity={1}>
        {data?.logos.map((logo, index) => (
          <Logo
            key={index}
            src={getSrc(logo)}
            show={show}
            delay={show ? index * 0.1 : 0}
            grow={index % 5 < 2}
          />
        ))}
      </LogosSection>
    </>
  );
}
