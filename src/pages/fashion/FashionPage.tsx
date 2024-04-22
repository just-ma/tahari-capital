import styled from "styled-components";
import BackgroundImageSrc from "../../assets/images/fashion-stats-background.jpg";
import LogoImageSrc from "../../assets/images/elie-tahari-logo.png";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import FashionGallery from "./FashionGallery";
import { MEDIA_SIZE } from "../../constants";
import BackgroundVideoSrc from "../../assets/videos/tahari-fashion.m4v";

const Section = styled.div<{
  opacity: number;
  reverse?: boolean;
}>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: black;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  opacity: ${({ opacity }) => opacity};
`;

const StatsSection = styled(Section)`
  height: fit-content;
`;

const DescriptionSection = styled(Section)`
  @media ${MEDIA_SIZE.mobile} {
    flex-direction: column;
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

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const StatsBackgroundImage = styled.img`
  height: 100%;
  object-fit: cover;
  user-select: none;

  @media ${MEDIA_SIZE.mobile} {
    width: 100%;
    height: auto;
    filter: brightness(0.5) blur(4px);
  }
`;

const MainContainer = styled.div`
  margin-left: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: fit-content;

  @media ${MEDIA_SIZE.mobile} {
    position: absolute;
    top: 30px;
    left: 20px;
    z-index: 1;
    margin: 0;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div<{
  show: boolean;
  delay: number;
  primary?: boolean;
}>`
  font-size: ${({ primary }) => (primary ? 5 : 2.5)}vw;
  line-height: ${({ primary }) => (primary ? 5 : 2.5)}vw;
  color: ${({ primary }) => (primary ? "white" : "#726969")};
  font-weight: ${({ primary }) => (primary ? "lighter" : "regular")};
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

const DescriptionContainer = styled.div`
  flex: 1 0 50%;
  padding: 0 50px;
  box-sizing: border-box;

  @media ${MEDIA_SIZE.mobile} {
    flex: 0 0 0;
    padding: 0;
  }
`;

const Description = styled.div`
  max-width: 480px;
  font-size: 20px;
  line-height: 30px;
  white-space: pre-wrap;
  cursor: default;
  text-align: justify;
  border-top: 1px solid #353535;
  border-bottom: 1px solid #353535;
  padding: 40px 0;
  font-weight: lighter;
  margin: 0 auto;

  @media ${MEDIA_SIZE.mobile} {
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
    padding: 60px 20px;
  }
`;

const ITEMS = [
  {
    primary: "$1B+",
    secondary: "Annual Revenue",
  },
  {
    primary: "800",
    secondary: "Points of Sale",
  },
  {
    primary: "50",
    secondary: "Years",
  },
  {
    primary: "40",
    secondary: "Countries",
  },
];

export default function FashionPage() {
  const { scrollTop } = useAppContext();

  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    setShow(scrollTop > window.innerHeight * 0.6);
  }, [scrollTop]);

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
        <LogoImage src={LogoImageSrc} draggable={false} />
      </Section>
      <StatsSection opacity={Math.min(scrollTop / window.innerHeight, 1)}>
        <StatsBackgroundImage src={BackgroundImageSrc} draggable={false} />
        <MainContainer>
          <MenuContainer>
            {ITEMS.map(({ primary, secondary }, index) => (
              <>
                <ItemOverflowContainer key={index} primary>
                  <MenuItem show={show} delay={show ? index * 0.5 : 0} primary>
                    {primary}
                  </MenuItem>
                </ItemOverflowContainer>
                <ItemOverflowContainer key={`${index}-2`}>
                  <MenuItem show={show} delay={show ? index * 0.5 + 0.1 : 0}>
                    {secondary}
                  </MenuItem>
                </ItemOverflowContainer>
              </>
            ))}
          </MenuContainer>
        </MainContainer>
      </StatsSection>
      <DescriptionSection opacity={1}>
        <DescriptionContainer>
          <Description>
            {"\t"}
            True to the entrepreneurial spirit that has driven Tahari Capital
            since its inception, the company combines the power of a corporate
            group with the flexibility of a start-up. The management of Tahari
            Capital is based on three fundamental values: imagination, audacity
            and tenacity. They mirror the personality of Elie Tahari who, from a
            small apparel company in 1973, has built an enduring player in the
            fashion industry. These values are translated into the vision of
            continual search for excellence. We believe long-term value can be
            created through a variety of strategic initiatives, including brand
            building, new product development, strategic alliances, and entry
            into new channels.
          </Description>
        </DescriptionContainer>
        <FashionGallery />
      </DescriptionSection>
    </>
  );
}
