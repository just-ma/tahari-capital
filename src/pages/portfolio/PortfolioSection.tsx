import { Link } from "react-router-dom";
import styled from "styled-components";
import BackgroundImageSrc from "../../assets/images/portfolio-background.jpg";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";

export const PORTFOLIO_SECTION_HEIGHT = 1.3;

const Section = styled.div<{ opacity: number }>`
  position: relative;
  width: 100vw;
  height: ${100 * PORTFOLIO_SECTION_HEIGHT}vh;
  background-color: black;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ opacity }) => opacity};
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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
`;

const MenuContainer = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

const MenuItem = styled(Link)<{ show: boolean; delay: number }>`
  font-size: 3vw;
  line-height: 3vw;
  text-decoration: none;
  color: white;
  text-transform: uppercase;
  user-select: none;
  margin-bottom: ${({ show }) => (show ? 0 : "4vw")};
  transition: 0.6s margin-bottom ${({ delay }) => delay}s
    cubic-bezier(0.4, 0, 0, 1);
  display: block;
  padding: 4px 8px;
`;

const HoverBackground = styled.div`
  position: absolute;
  z-index: -1;
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
  transition: 0.5s width cubic-bezier(0.4, 0, 0, 1);
`;

const ItemOverflowContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: calc(3vw + 8px);
  display: flex;
  align-items: flex-end;
  width: fit-content;

  &:hover ${HoverBackground} {
    width: 100%;
  }
`;

const PlaceholderItem = styled(MenuItem)`
  color: transparent;
  pointer-events: none;
`;

const MENU_ITEMS = [
  {
    label: "Fashion",
    to: "/fashion",
  },
  {
    label: "Real Estate",
    to: "/real-estate",
  },
  {
    label: "Lifestyle",
    to: "/lifestyle",
  },
  {
    label: "Ventures",
    to: "/ventures",
  },
  {
    label: "Logistics",
    to: "/logistics",
  },
];

export default function PortfolioSection() {
  const { scrollTop } = useAppContext();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(
      scrollTop > window.innerHeight * 0.8 &&
        scrollTop < window.innerHeight * (0.3 + PORTFOLIO_SECTION_HEIGHT)
    );
  }, [scrollTop]);

  return (
    <Section opacity={Math.min(scrollTop / window.innerHeight, 1)}>
      <BackgroundImage src={BackgroundImageSrc} draggable={false} />
      <MainContainer>
        <TitleOverflowContainer>
          <TitleRow show={show}>
            <Title>Portfolio</Title>
            <PlaceholderItem delay={0} show to="/">
              Real Estate
            </PlaceholderItem>
          </TitleRow>
        </TitleOverflowContainer>
        <Divider />
        <MenuContainer>
          {MENU_ITEMS.map(({ label, to }, index) => (
            <ItemOverflowContainer key={to}>
              <HoverBackground />
              <MenuItem to={to} show={show} delay={index * 0.06 + 0.2}>
                {label}
              </MenuItem>
            </ItemOverflowContainer>
          ))}
        </MenuContainer>
      </MainContainer>
    </Section>
  );
}
