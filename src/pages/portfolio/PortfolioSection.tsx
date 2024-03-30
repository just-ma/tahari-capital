import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
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
  margin: 7px 0 7px;
`;

const itemCss = css<{ show: boolean; delay: number }>`
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
`;

const Item = styled.div<{ show: boolean; delay: number }>`
  cursor: pointer;

  ${itemCss}
`;

const LinkItem = styled(Link)<{ show: boolean; delay: number }>`
  ${itemCss}
`;

const ItemRelativeContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: fit-content;
  margin: 5px 0 5px;
  transition: 0.5s height;

  &:hover ${Item}, &:hover ${LinkItem} {
    color: white;
  }
`;

const SubItemContainer = styled.div<{ show?: boolean }>`
  height: ${({ show }) => (show ? "calc(5vw + 20px);" : 0)};
  transition: 0.5s height cubic-bezier(0.4, 0, 0, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-left: 30px;

  ${ItemRelativeContainer} {
    margin: 3px 0 3px;
    height: 2.5vw;
  }

  ${LinkItem} {
    font-size: 2.5vw;
    line-height: 2.5vw;
  }
`;

const PlaceholderItem = styled(Item)`
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
    subItems: [
      {
        label: "Holdings",
        to: "/holdings",
      },
      {
        label: "Tahari Realty",
        to: "/tahari-realty",
      },
    ],
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
  const [showRealEstate, setShowRealEstate] = useState(false);

  useEffect(() => {
    const scrolled = scrollTop > window.innerHeight * 0.6;
    setShow(scrolled);
    if (!scrolled) {
      setShowRealEstate(false);
    }
  }, [scrollTop]);

  return (
    <Section opacity={Math.min(scrollTop / window.innerHeight, 1)}>
      <MainContainer>
        <TitleOverflowContainer>
          <TitleRow show={show}>
            <Title>Portfolio</Title>
            <PlaceholderItem delay={0} show>
              Real Estate
            </PlaceholderItem>
          </TitleRow>
        </TitleOverflowContainer>
        <Divider />
        <MenuContainer>
          {MENU_ITEMS.map(({ label, to, subItems }, index) => (
            <>
              <ItemRelativeContainer key={index}>
                {to ? (
                  <LinkItem to={to} show={show} delay={index * 0.06 + 0.2}>
                    {label}
                  </LinkItem>
                ) : (
                  <Item
                    show={show}
                    delay={index * 0.06 + 0.2}
                    onClick={() => setShowRealEstate((prev) => !prev)}
                  >
                    {label}
                  </Item>
                )}
              </ItemRelativeContainer>
              {subItems ? (
                <SubItemContainer show={showRealEstate}>
                  {subItems?.map(({ label, to }) => (
                    <ItemRelativeContainer key={index}>
                      <LinkItem to={to} show delay={index * 0.06 + 0.2}>
                        {label}
                      </LinkItem>
                    </ItemRelativeContainer>
                  ))}
                </SubItemContainer>
              ) : null}
            </>
          ))}
        </MenuContainer>
      </MainContainer>
    </Section>
  );
}
