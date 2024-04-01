import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import useAppContext from "../hooks/useAppContext";
import TahariLogo from "../assets/graphics/tahari-logo.svg?react";

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
    background ? "brightness(0.7) blur(10px)" : "brightness(1) blur(0)"};
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

const TitleContainer = styled.div<{ show: boolean }>`
  flex: 6 0 auto;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 0.5s opacity;
`;

const Logo = styled(TahariLogo)`
  height: 16px;
`;

const ItemContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: flex-end;
`;

const itemLabelCss = css`
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  width: fit-content;
  font-size: 14px;
  user-select: none;
  padding: 0 7px 0 0;
  transition: 0.5s color;
  color: #eaeaea;
`;

const ItemLabel = styled.div`
  ${itemLabelCss}
`;

const StyledLink = styled(Link)`
  ${itemLabelCss}
`;

const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: fit-content;
  width: fit-content;

  &:hover ${ItemLabel}, &:hover ${StyledLink} {
    color: white;
  }
`;

const MENU_ITEMS = [
  {
    label: "Portfolio",
    to: "/#portfolio",
  },
  { label: "History", to: "/history" },
  {
    label: "Contact",
    onClick: () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    },
  },
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
      <TitleContainer show={!isHome || scrollTop >= window.innerHeight * 0.6}>
        <Item>
          <StyledLink to="/" onClick={scrollToTop}>
            <Logo />
          </StyledLink>
        </Item>
      </TitleContainer>
      {MENU_ITEMS.map(({ label, to, onClick }) => (
        <ItemContainer key={label}>
          <Item>
            {to ? (
              <StyledLink to={to}>{label}</StyledLink>
            ) : (
              <ItemLabel onClick={onClick}>{label}</ItemLabel>
            )}
          </Item>
        </ItemContainer>
      ))}
    </Container>
  );
}
