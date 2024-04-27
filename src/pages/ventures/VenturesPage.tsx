import styled from "styled-components";
import BackgroundImageSrc from "../../assets/images/tahari-ventures-background.jpg";
import LogoImageSrc from "../../assets/graphics/tahari-ventures-logo.svg";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import Logo1 from "../../assets/images/ventures-theory.png";
import Logo2 from "../../assets/images/ventures-wework.png";
import Logo3 from "../../assets/images/ventures-cafeteria.jpg";
import Logo4 from "../../assets/images/ventures-tahari-asl.jpg";
import Logo5 from "../../assets/images/ventures-sweet-deliverance.png";
import Logo6 from "../../assets/images/ventures-zoa.jpg";
import Logo7 from "../../assets/images/ventures-t21.jpg";
import Logo8 from "../../assets/images/ventures-sci-fi-foods.png";
import Logo9 from "../../assets/images/ventures-t-tahari.png";
import Logo10 from "../../assets/images/ventures-anti.jpg";
import Logo11 from "../../assets/images/ventures-fit-match.jpg";
import Logo12 from "../../assets/images/ventures-catherine-malandrino.jpg";
import Logo13 from "../../assets/images/ventures-veri-uomo.png";
import Logo14 from "../../assets/images/ventures-iisli.jpg";
import Logo15 from "../../assets/images/ventures-rocksolid.jpg";
import Logo16 from "../../assets/images/ventures-morning-lady.jpg";
import { MEDIA_SIZE } from "../../constants";

const LOGOS = [
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
  Logo10,
  Logo11,
  Logo12,
  Logo13,
  Logo14,
  Logo15,
  Logo16,
];

const Section = styled.div<{ opacity: number }>`
  position: relative;
  width: 100vw;
  height: 100vh;
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
    padding: 0 20px 150px;
    gap: 10px;
  }
`;

const Logo = styled.img<{
  show: boolean;
  delay: number;
}>`
  user-select: none;
  transform: scale(0.8);
  opacity: ${({ show }) => (show ? 1 : 0)};
  margin-top: ${({ show }) => (show ? 30 : 0)}px;
  transition: 1s margin-top ${({ delay }) => delay}s cubic-bezier(0.4, 0, 0, 1),
    1s opacity ${({ delay }) => delay}s;

  @media ${MEDIA_SIZE.mobile} {
    display: block;
    max-width: 150px;
    max-height: 100px;
    width: auto;
    height: auto;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
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
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
  animation: fadeIn 1s forwards;
  opacity: 0;

  @media ${MEDIA_SIZE.mobile} {
    width: 90%;
  }
`;

export default function VenturesPage() {
  const [show, setShow] = useState(false);

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
        <BackgroundImage src={BackgroundImageSrc} />
        <LogoImage src={LogoImageSrc} draggable={false} />
      </Section>
      <LogosSection opacity={1}>
        {LOGOS.map((src, index) => (
          <Logo
            key={index}
            src={src}
            show={show}
            delay={show ? index * 0.1 : 0}
          />
        ))}
      </LogosSection>
    </>
  );
}
