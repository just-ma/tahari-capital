import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import useAppContext from "../hooks/useAppContext";
import TahariLogo from "../assets/graphics/tahari-logo.svg?react";
import { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { MEDIA_SIZE } from "../constants";
import HamburgerButton from "./HamburgerButton";

export const NAV_BAR_HEIGHT = 40;

const Container = styled.div<{
  background: boolean;
  delay: number;
  expand: boolean;
}>`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${({ expand }) => (expand ? 250 : NAV_BAR_HEIGHT)}px;
  backdrop-filter: ${({ background, expand }) =>
    expand
      ? "brightness(0.5) blur(4px)"
      : background
      ? "brightness(0.7) blur(10px)"
      : "brightness(1) blur(0)"};
  -webkit-backdrop-filter: ${({ background, expand }) =>
    expand
      ? "brightness(0.5) blur(4px)"
      : background
      ? "brightness(0.7) blur(10px)"
      : "brightness(1) blur(0)"};
  overflow: hidden;
  transition: backdrop-filter 0.5s, height 0.5s cubic-bezier(0.4, 0, 0, 1);
  animation: fadeIn 2s ${({ delay }) => delay}s forwards;
  opacity: 0;
  z-index: 10;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Bar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  height: ${NAV_BAR_HEIGHT}px;

  @media ${MEDIA_SIZE.mobile} {
    padding: 0 10px;
  }
`;

const TitleContainer = styled.div<{ show: boolean }>`
  flex: 9 0 auto;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 0.5s opacity;
`;

const Logo = styled(TahariLogo)`
  width: 120px;
  height: 16px;
`;

const ItemContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: flex-end;
`;

const itemLabelCss = css<{ hide: boolean }>`
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  width: fit-content;
  font-size: 14px;
  user-select: none;
  padding: 0 7px 0 0;
  color: #eaeaea;
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  transition: opacity 0.5s, color 0.5s;

  @media ${MEDIA_SIZE.mobile} {
    font-size: 20px;
  }
`;

const ItemLabel = styled.div<{ hide: boolean }>`
  ${itemLabelCss}
`;

const StyledLink = styled(Link)<{ hide: boolean }>`
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

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
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

  const [hide, setHide] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { scrollTop } = useAppContext();
  const { isMobile } = useWindowSize();

  const isHome = location.pathname === "/";
  const isFullHeightPage =
    location.pathname === "/history" || location.pathname === "/login";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setHide(
      !isFullHeightPage &&
        scrollTop >=
          document.documentElement.scrollHeight -
            window.innerHeight -
            NAV_BAR_HEIGHT
    );
  }, [scrollTop]);

  return (
    <Container
      background={
        !hide &&
        (isHome
          ? scrollTop >= window.innerHeight - NAV_BAR_HEIGHT
          : scrollTop > NAV_BAR_HEIGHT)
      }
      delay={isHome ? 1 : 0}
      expand={showMobileMenu}
    >
      <Bar>
        <TitleContainer show={!isHome || scrollTop >= window.innerHeight * 0.6}>
          <Item>
            <StyledLink to="/" onClick={scrollToTop} hide={hide}>
              <Logo />
            </StyledLink>
          </Item>
        </TitleContainer>
        {isMobile ? (
          <ItemContainer>
            <HamburgerButton
              show={showMobileMenu}
              onClick={() => setShowMobileMenu((prev) => !prev)}
              hide={hide}
            />
          </ItemContainer>
        ) : (
          MENU_ITEMS.map(({ label, to, onClick }) => (
            <ItemContainer key={label}>
              <Item>
                {to ? (
                  <StyledLink to={to} hide={hide}>
                    {label}
                  </StyledLink>
                ) : (
                  <ItemLabel onClick={onClick} hide={hide}>
                    {label}
                  </ItemLabel>
                )}
              </Item>
            </ItemContainer>
          ))
        )}
      </Bar>
      {isMobile && (
        <MobileMenu>
          {MENU_ITEMS.map(({ label, to, onClick }) => (
            <ItemContainer key={label}>
              <Item onClick={() => setShowMobileMenu(false)}>
                {to ? (
                  <StyledLink to={to} hide={hide}>
                    {label}
                  </StyledLink>
                ) : (
                  <ItemLabel onClick={onClick} hide={hide}>
                    {label}
                  </ItemLabel>
                )}
              </Item>
            </ItemContainer>
          ))}
        </MobileMenu>
      )}
    </Container>
  );
}
