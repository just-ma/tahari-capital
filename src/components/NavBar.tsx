import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import useAppContext from "../hooks/useAppContext";

export const NAV_BAR_HEIGHT = 40;

const Container = styled.div<{ background: boolean; delay: number }>`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  height: ${NAV_BAR_HEIGHT}px;
  padding: 0 20px;
  box-sizing: border-box;
  backdrop-filter: ${({ background }) =>
    background ? "brightness(0.8) blur(10px)" : "brightness(1) blur(0)"};
  overflow: hidden;
  animation: fadeIn 2s ${({ delay }) => delay}s forwards;
  opacity: 0;
  z-index: 10;
  transition: backdrop-filter 0.3s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TitleContainer = styled.div`
  flex: 6 0 auto;
`;

const ItemContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  width: fit-content;
  font-size: 14px;
  user-select: none;
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

const Item = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  height: fit-content;
  width: fit-content;

  &:hover ${HoverBackground} {
    width: 100%;
  }
`;

const MENU_ITEMS = [
  {
    label: "Portfolio",
    to: "/#portfolio",
  },
  { label: "History", to: "/history" },
  { label: "Contact", to: "/#contact" },
  { label: "Login", to: "/login" },
];

export default function NavBar() {
  const location = useLocation();

  const { scrollTop } = useAppContext();

  const isHome = location.pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container
      background={
        isHome
          ? scrollTop >= window.innerHeight - NAV_BAR_HEIGHT
          : scrollTop > NAV_BAR_HEIGHT
      }
      delay={isHome ? 1 : 0}
    >
      <TitleContainer>
        <Item>
          <HoverBackground />
          <StyledLink to="/" onClick={scrollToTop}>
            Tahari Capital
          </StyledLink>
        </Item>
      </TitleContainer>
      {MENU_ITEMS.map(({ label, to }) => (
        <ItemContainer>
          <Item key={label}>
            <HoverBackground />
            <StyledLink to={to}>{label}</StyledLink>
          </Item>
        </ItemContainer>
      ))}
    </Container>
  );
}
