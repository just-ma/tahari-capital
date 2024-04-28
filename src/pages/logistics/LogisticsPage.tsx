import styled, { css } from "styled-components";
import LogoImageSrc from "../../assets/images/tahari-logsitics-logo.png";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";
import BackgroundVideoSrc from "../../assets/videos/tahari-logistics.m4v";
import { MEDIA_SIZE } from "../../constants";
import useWindowSize from "../../hooks/useWindowSize";
import useGetDocument from "../../sanity/useGetDocument";
import { LogisticsPageDefinition, getSrc } from "../../sanity";
import { PortableText } from "@portabletext/react";

const Section = styled.div<{ opacity: number; reverse?: boolean }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: black;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  opacity: ${({ opacity }) => opacity};
`;

const LogoImage = styled.img`
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 40px));
  pointer-events: none;
  z-index: 2;
  animation: fadeIn 1s forwards;
  opacity: 0;

  @media ${MEDIA_SIZE.mobile} {
    width: 90%;
  }
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  user-select: none;
`;

const Shadow = styled.div`
  position: absolute;
  width: 35%;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  box-shadow: 0 0 80px 100px black;
  opacity: 0.4;
  z-index: 1;

  @media ${MEDIA_SIZE.mobile} {
    width: 70%;
  }
`;

const StatsSection = styled(Section)`
  height: fit-content;
  align-items: flex-start;

  @media ${MEDIA_SIZE.mobile} {
    flex-direction: column;
  }
`;

const StatsBackgroundImage = styled.img<{ show: boolean }>`
  flex: 1 0 50%;
  height: 100vh;
  object-fit: cover;
  animation: fadeIn 2s forwards;
  opacity: 0;
  user-select: none;
  position: sticky;
  top: ${NAV_BAR_HEIGHT}px;
  display: block;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @media ${MEDIA_SIZE.mobile} {
    width: 100vw;
    flex: auto;
    position: relative;
    top: 0;
    filter: ${({ show }) => (show ? "brightness(0.4) blur(4px)" : "none")};
    -webkit-backdrop-filter: ${({ show }) =>
      show ? "brightness(0.4) blur(4px)" : "none"};
    transition: 2s filter, 2s -webkit-backdrop-filter;
    object-position: right;
  }
`;

const HalfSection = styled.div`
  flex: 1 0 50%;
  height: 100%;

  @media ${MEDIA_SIZE.mobile} {
    flex: auto;
    height: fit-content;
  }
`;

const MenuContainer = styled.div`
  height: fit-content;
  width: 100%;
  padding: 200px 50px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${MEDIA_SIZE.mobile} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 40px;
  }
`;

const MenuItem = styled.div<{
  show: boolean;
  delay: number;
  primary?: boolean;
}>`
  ${({ primary }) =>
    primary
      ? css`
          font-size: 5vw;
          line-height: 5vw;
          color: white;
          font-weight: 100;
        `
      : css`
          font-size: 2.5vw;
          line-height: 2.5vw;
          color: #726969;
        `};
  text-transform: uppercase;
  margin-bottom: ${({ show, primary }) => (show ? 0 : primary ? 7 : 3)}vw;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 1s margin-bottom ${({ delay }) => delay}s
      cubic-bezier(0.4, 0, 0, 1),
    1s opacity ${({ delay }) => delay}s;
  display: block;
  cursor: default;

  @media ${MEDIA_SIZE.mobile} {
    font-size: ${({ primary }) => (primary ? 50 : 25)}px;
    line-height: ${({ primary }) => (primary ? 50 : 25)}px;
    color: ${({ primary }) => (primary ? "white" : "#d1cccc")};
  }
`;

const ItemOverflowContainer = styled.div<{ primary?: boolean }>`
  position: relative;
  overflow: hidden;
  height: ${({ primary }) => (primary ? 5 : 2.5)}vw;
  margin-top: ${({ primary }) => (primary ? 40 : 0)}px;
  display: flex;
  align-items: flex-end;
  width: fit-content;

  @media ${MEDIA_SIZE.mobile} {
    height: ${({ primary }) => (primary ? 50 : 25)}px;
    margin-top: ${({ primary }) => (primary ? 30 : 0)}px;
  }
`;

const Description = styled.div<{ show: boolean }>`
  width: 100%;
  font-size: 18px;
  line-height: 26px;
  white-space: pre-wrap;
  cursor: default;
  padding: 140px 50px 300px;
  box-sizing: border-box;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 1s bottom cubic-bezier(0.4, 0, 0, 1), 1s opacity;
  text-align: justify;

  @media ${MEDIA_SIZE.mobile} {
    font-size: 14px;
    line-height: 20px;
    padding: 100px 20px;
  }
`;

export default function LogisticsPage() {
  const { scrollTop } = useAppContext();

  const { data } = useGetDocument<LogisticsPageDefinition>("logisticsPage");

  const [showStats, setShowStats] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [init, setInit] = useState(false);

  const { isMobile } = useWindowSize();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!init) {
      setInit(true);
      return;
    }

    setShowStats(scrollTop > window.innerHeight * (isMobile ? 0.7 : 0.5));
    setShowDescription(scrollTop > window.innerHeight * 1.4);
  }, [scrollTop, init]);

  return (
    <>
      <Section
        opacity={Math.max(
          (window.innerHeight - scrollTop) / window.innerHeight,
          0
        )}
      >
        <BackgroundVideo
          src={BackgroundVideoSrc}
          autoPlay
          loop
          muted
          controls={false}
          playsInline
        />
        <Shadow />
        <LogoImage src={LogoImageSrc} draggable={false} />
      </Section>
      <StatsSection opacity={Math.min(scrollTop / window.innerHeight, 1)}>
        <StatsBackgroundImage
          src={getSrc(data?.statsImage)}
          draggable={false}
          show={showStats}
        />
        <HalfSection>
          <MenuContainer>
            {data?.stats.map(({ title, subtitle }, index) => (
              <>
                <ItemOverflowContainer key={index} primary>
                  <MenuItem
                    show={showStats}
                    delay={showStats ? index * 0.5 : 0}
                    primary
                  >
                    {title}
                  </MenuItem>
                </ItemOverflowContainer>
                <ItemOverflowContainer key={`${index}-2`}>
                  <MenuItem
                    show={showStats}
                    delay={showStats ? index * 0.5 + 0.1 : 0}
                  >
                    {subtitle}
                  </MenuItem>
                </ItemOverflowContainer>
              </>
            ))}
          </MenuContainer>
          <Description show={showDescription}>
            {data && <PortableText value={data.copy} />}
          </Description>
        </HalfSection>
      </StatsSection>
    </>
  );
}
