import styled, { css } from "styled-components";
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
  height: 100vh;

  @media ${MEDIA_SIZE.mobile} {
    flex-direction: column;
    height: fit-content;
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

  @media ${MEDIA_SIZE.mobile} {
    width: 90%;
  }
`;

const StatsBackgroundImage = styled.img<{ show: boolean }>`
  height: 100vh;
  object-fit: cover;
  user-select: none;

  @media ${MEDIA_SIZE.mobile} {
    width: 100%;
    height: auto;
    filter: ${({ show }) => (show ? "brightness(0.4) blur(4px)" : "none")};
    -webkit-backdrop-filter: ${({ show }) =>
      show ? "brightness(0.4) blur(4px)" : "none"};
    transition: 2s filter, 2s -webkit-backdrop-filter;
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
  font-size: 18px;
  line-height: 26px;
  white-space: pre-wrap;
  cursor: default;
  padding: 40px 0;
  margin: 0 auto;
  text-align: justify;

  @media ${MEDIA_SIZE.mobile} {
    font-size: 14px;
    line-height: 20px;
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
        <StatsBackgroundImage
          src={BackgroundImageSrc}
          draggable={false}
          show={show}
        />
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
            Elie Tahari is a global leader in fashion design and distribution of
            luxury lifestyle products. Our reputation and distinctive image of
            timeless design have been developed across a wide range of products,
            brands, distribution channels and international markets in four
            categories: apparel, footwear and accessories, home, and fragrance.
            {"\n\n"}
            For more than 50 years, Elie Tahari has sought to inspire women
            around the world with sexy, sophisticated and feminine designs. Our
            reputation and distinctive image have been developed across a wide
            range of products, brands, distribution channels and international
            markets.
            {"\n\n"}
            The Tahari brand name is one of the most widely recognized fashion
            brand names. We believe that our global reach, breadth of product
            offerings, and multichannel distribution are unique among luxury and
            apparel companies. Elie Tahari has been an innovator time and again,
            and believe that, under the direction of internationally renowned
            designer Elie Tahari, we have had a considerable influence on the
            women dress over the last five decades. We combine consumer insights
            with our design, marketing, along with our licensing alliances,
            broad lifestyle product collections with a unified vision.
          </Description>
        </DescriptionContainer>
        <FashionGallery />
      </DescriptionSection>
    </>
  );
}
