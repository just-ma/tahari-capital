import { Link } from "react-router-dom";
import styled from "styled-components";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";

const Section = styled.div<{ opacity: number }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(0deg, #3c3127 0%, #000 50%, #14110f 100%);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ opacity }) => opacity};
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
  font-weight: lighter;
`;

const Divider = styled.div`
  border-bottom: 1px solid white;
`;

const MenuContainer = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 15px;
`;

const MenuItem = styled(Link)<{ show: boolean; delay: number }>`
  font-size: 3vw;
  line-height: 3vw;
  text-decoration: none;
  color: #988d86;
  text-transform: uppercase;
  user-select: none;
  margin-bottom: ${({ show }) => (show ? 0 : "4vw")};
  transition: 0.6s margin-bottom ${({ delay }) => delay}s
      cubic-bezier(0.4, 0, 0, 1),
    0.5s padding cubic-bezier(0.4, 0, 0, 1), 0.5s color;
  display: block;
  padding: 0 12px 0 0;
`;

const HoverCircle = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  top: 50%;
  left: 12px;
  transform: translate(0, -50%);
  background-color: white;
  opacity: 0;
  transition: 0.5s left cubic-bezier(0.4, 0, 0, 1), 0.3s opacity;
  pointer-events: none;
`;

const ItemRelativeContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: calc(3vw);
  display: flex;
  align-items: flex-end;
  width: fit-content;
  padding-left: 12px;

  &:hover ${HoverCircle} {
    opacity: 1;
    left: 0;
  }

  &:hover ${MenuItem} {
    padding: 0 0 0 12px;
    color: white;
  }
`;

const PlaceholderItem = styled(MenuItem)`
  color: transparent;
  pointer-events: none;
`;

const MENU_ITEMS = [
  {
    label: "Fashion",
    to: "/elie-tahari",
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
    setShow(scrollTop > window.innerHeight * 0.6);
  }, [scrollTop]);

  return (
    <Section opacity={Math.min(scrollTop / window.innerHeight, 1)}>
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
            <ItemRelativeContainer key={to}>
              <HoverCircle />
              <MenuItem to={to} show={show} delay={index * 0.06 + 0.2}>
                {label}
              </MenuItem>
            </ItemRelativeContainer>
          ))}
        </MenuContainer>
      </MainContainer>
    </Section>
  );
}
