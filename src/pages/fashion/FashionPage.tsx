import styled from "styled-components";
import BackgroundImageSrc from "../../assets/images/fashion-background.jpg";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import FashionGallery from "./FashionGallery";

const Section = styled.div<{ opacity: number }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: black;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ opacity }) => opacity};
`;

const PrimaryBackgroundImage = styled.img`
  position: absolute;
  width: 30%;
  height: 100%;
  top: 0;
  right: 50%;
  z-index: 0;
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
  position: absolute;
  bottom: 50px;
  left: calc(50% + 30px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: fit-content;
  z-index: 1;
`;

const TitleOverflowContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 8vw;
`;

const TitleRow = styled.div<{ show: boolean }>`
  display: flex;
  margin-top: ${({ show }) => (show ? 0 : "8vw")};
  transition: 0.8s margin-top cubic-bezier(0.4, 0, 0, 1);
`;

const Title = styled.div`
  font-size: 8vw;
  line-height: 8vw;
  text-transform: uppercase;
  color: white;
  user-select: none;
`;

const Divider = styled.div`
  border-bottom: 1px solid white;
  margin-bottom: 15px;
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
  font-size: ${({ primary }) => (primary ? 5 : 2)}vw;
  line-height: ${({ primary }) => (primary ? 5 : 2)}vw;
  color: ${({ primary }) => (primary ? "white" : "#C3B6B6")};
  text-transform: uppercase;
  margin-bottom: ${({ show, primary }) => (show ? 0 : primary ? 7 : 3)}vw;
  transition: 0.6s margin-bottom ${({ delay }) => delay}s
    cubic-bezier(0.4, 0, 0, 1);
  display: block;
  cursor: default;
`;

const ItemOverflowContainer = styled.div<{ primary?: boolean }>`
  position: relative;
  overflow: hidden;
  height: ${({ primary }) => (primary ? 6.5 : 2)}vw;
  display: flex;
  align-items: flex-end;
  width: fit-content;
`;

const DescriptionContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  width: 31%;
  z-index: 1;
  font-size: 18px;
  line-height: 22px;
  white-space: pre-wrap;
  cursor: default;
`;

const ITEMS = [
  {
    primary: "$1B+",
    secondary: "Annual Revenue",
  },
  {
    primary: "40",
    secondary: "Countries",
  },
  {
    primary: "800",
    secondary: "Points of Sale",
  },
  {
    primary: "50",
    secondary: "Years",
  },
];

export default function FashionPage() {
  const { scrollTop } = useAppContext();

  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    setShow(scrollTop < window.innerHeight * 0.6);
  }, [scrollTop]);

  return (
    <>
      <Section
        opacity={Math.max(
          (window.innerHeight - scrollTop) / window.innerHeight,
          0
        )}
      >
        <PrimaryBackgroundImage src={BackgroundImageSrc} draggable={false} />
        <MainContainer>
          <TitleOverflowContainer>
            <TitleRow show={show}>
              <Title>Fashion</Title>
            </TitleRow>
          </TitleOverflowContainer>
          <Divider />
          <MenuContainer>
            {ITEMS.map(({ primary, secondary }, index) => (
              <>
                <ItemOverflowContainer key={index} primary>
                  <MenuItem show={show} delay={index * 2 * 0.06 + 0.2} primary>
                    {primary}
                  </MenuItem>
                </ItemOverflowContainer>
                <ItemOverflowContainer key={index}>
                  <MenuItem show={show} delay={(index * 2 + 1) * 0.06 + 0.2}>
                    {secondary}
                  </MenuItem>
                </ItemOverflowContainer>
              </>
            ))}
          </MenuContainer>
        </MainContainer>
      </Section>
      <Section opacity={Math.min(scrollTop / window.innerHeight, 1)}>
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
        <FashionGallery />
      </Section>
    </>
  );
}
