import styled, { css } from "styled-components";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import { PORTFOLIO_SECTION_HEIGHT } from "../portfolio/PortfolioSection";

const Section = styled.div`
  position: relative;
  width: 100vw;
  height: 80vh;
  background-color: black;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
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

const menuItemCss = css<{ show: boolean; delay: number }>`
  font-size: 16px;
  line-height: 16px;
  color: white;
  text-transform: uppercase;
  margin-bottom: ${({ show }) => (show ? 0 : "20px")};
  transition: 0.6s margin-bottom ${({ delay }) => delay}s
    cubic-bezier(0.4, 0, 0, 1);
  display: block;
`;

const MenuItem = styled.div<{ show: boolean; delay: number }>`
  ${menuItemCss}
`;

const MenuLinkItem = styled.a<{ show: boolean; delay: number }>`
  ${menuItemCss}
`;

const ItemOverflowContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 16px;
  display: flex;
  align-items: flex-end;
  width: fit-content;
`;

const PlaceholderItem = styled(MenuItem)`
  color: transparent;
  pointer-events: none;
`;

const ItemBreak = styled.div`
  height: 16px;
`;

export default function ContactSection() {
  const { scrollTop } = useAppContext();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(scrollTop > window.innerHeight * (PORTFOLIO_SECTION_HEIGHT + 0.5));
  }, [scrollTop]);

  return (
    <Section>
      <MainContainer>
        <TitleOverflowContainer>
          <TitleRow show={show}>
            <Title>Contact</Title>
            <PlaceholderItem delay={0} show>
              jeremey@taharicapital.com
            </PlaceholderItem>
          </TitleRow>
        </TitleOverflowContainer>
        <Divider />
        <MenuContainer>
          <ItemOverflowContainer>
            <MenuLinkItem
              href={"mailto:jeremey@taharicapital.com"}
              show={show}
              delay={0 * 0.06 + 0.2}
            >
              jeremey@taharicapital.com
            </MenuLinkItem>
          </ItemOverflowContainer>
          <ItemBreak />
          <ItemOverflowContainer>
            <MenuLinkItem
              href={"tel:(917) 890-9902"}
              show={show}
              delay={1 * 0.06 + 0.2}
            >
              {"(917) 890-9902"}
            </MenuLinkItem>
          </ItemOverflowContainer>
          <ItemBreak />
          <ItemOverflowContainer>
            <MenuItem show={show} delay={2 * 0.06 + 0.2}>
              248 Mott Street
            </MenuItem>
          </ItemOverflowContainer>
          <ItemOverflowContainer>
            <MenuItem show={show} delay={3 * 0.06 + 0.2}>
              Suite 11
            </MenuItem>
          </ItemOverflowContainer>
          <ItemOverflowContainer>
            <MenuItem show={show} delay={4 * 0.06 + 0.2}>
              New York, New York, 10012
            </MenuItem>
          </ItemOverflowContainer>
        </MenuContainer>
      </MainContainer>
    </Section>
  );
}
