import styled from "styled-components";
import BackgroundImageSrc from "../../assets/images/fashion-background.jpg";
import LogoImageSrc from "../../assets/images/elie-tahari-logo.png";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import FashionGallery from "./FashionGallery";

const Section = styled.div<{ opacity: number; reverse?: boolean }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(0deg, #000 50%, #201811 100%);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  opacity: ${({ opacity }) => opacity};
`;

const DescriptionSection = styled(Section)`
  background: linear-gradient(0deg, #3c3127 0%, #000 50%);
  justify-content: center;
  height: 90vh;
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
`;

const StatsBackgroundImage = styled.img`
  height: 100%;
  object-fit: cover;
  animation: fadeIn 2s forwards;
  opacity: 0;
  user-select: none;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const MainContainer = styled.div`
  margin-left: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: fit-content;
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
`;

const ItemOverflowContainer = styled.div<{ primary?: boolean }>`
  position: relative;
  overflow: hidden;
  height: ${({ primary }) => (primary ? 5 : 2.5)}vw;
  margin-top: ${({ primary }) => (primary ? 40 : 0)}px;
  display: flex;
  align-items: flex-end;
  width: fit-content;
`;

const DescriptionContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 600px;
  font-size: 20px;
  line-height: 26px;
  white-space: pre-wrap;
  cursor: default;
  text-align: justify;
  border-top: 1px solid #353535;
  border-bottom: 1px solid #353535;
  padding: 40px 120px;
  font-weight: lighter;
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
  const [init, setInit] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!init) {
      setInit(true);
      return;
    }

    setShow((prev) => prev || scrollTop > window.innerHeight * 0.6);
  }, [scrollTop, init]);

  return (
    <>
      <Section
        opacity={Math.max(
          (window.innerHeight - scrollTop) / window.innerHeight,
          0
        )}
      >
        <FashionGallery />
        <LogoImage src={LogoImageSrc} draggable={false} />
      </Section>
      <Section opacity={Math.min(scrollTop / window.innerHeight, 1)}>
        <StatsBackgroundImage src={BackgroundImageSrc} draggable={false} />
        <MainContainer>
          <MenuContainer>
            {ITEMS.map(({ primary, secondary }, index) => (
              <>
                <ItemOverflowContainer key={index} primary>
                  <MenuItem show={show} delay={index * 1.2} primary>
                    {primary}
                  </MenuItem>
                </ItemOverflowContainer>
                <ItemOverflowContainer key={`${index}-2`}>
                  <MenuItem show={show} delay={index * 1.2 + 0.1}>
                    {secondary}
                  </MenuItem>
                </ItemOverflowContainer>
              </>
            ))}
          </MenuContainer>
        </MainContainer>
      </Section>
      <DescriptionSection opacity={1}>
        <DescriptionContainer>
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
          building, new product development, strategic alliances, and entry into
          new channels.
        </DescriptionContainer>
      </DescriptionSection>
    </>
  );
}
