import styled from "styled-components";
import BackgroundImageSrc from "../../assets/images/tahari-logistics-background.jpg";
import LogoImageSrc from "../../assets/images/tahari-logsitics-logo.png";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";

const Section = styled.div<{ opacity: number; reverse?: boolean }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: black;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  opacity: ${({ opacity }) => opacity};
`;

const DescriptionSection = styled(Section)`
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
  width: 50%;
  object-fit: cover;
  animation: fadeIn 2s forwards;
  opacity: 0;
  user-select: none;
  position: sticky;
  top: 0;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const MainContainer = styled.div`
  margin-left: 6vw;
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
  line-height: 30px;
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
    primary: "10M+",
    secondary: "Units Anually",
  },
  {
    primary: "50+",
    secondary: "Luxury Brands",
  },
  {
    primary: "Hi-Tech",
    secondary: "WMS+RFID+EDI",
  },
  {
    primary: "Intl",
    secondary: "Shipping",
  },
];

export default function LogisticsPage() {
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

    setShow(scrollTop > window.innerHeight * 0.6);
  }, [scrollTop, init]);

  return (
    <>
      <Section
        opacity={Math.max(
          (window.innerHeight - scrollTop) / window.innerHeight,
          0
        )}
      >
        <LogoImage src={LogoImageSrc} draggable={false} />
      </Section>
      <Section opacity={Math.min(scrollTop / window.innerHeight, 1)}>
        <StatsBackgroundImage src={BackgroundImageSrc} draggable={false} />
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
      </Section>
      <DescriptionSection opacity={1}>
        <DescriptionContainer>
          {"\t"}
          Since 2003, Tahari Logistics has conducted full service third party
          logistics operations by shipping and fulfilling over fifty brands
          domestically and abroad. The firm gains a competitive advantage
          through its complete responsibility of the affiliated Tahari brand, as
          that standard of care is equally disseminated to all clients. The
          state of the art WMS and RFID coupled with the full steam tunnel and
          pressing capabilities sets apart Tahari Logistics to service nearly
          10M units annually across all consumer goods products.
        </DescriptionContainer>
      </DescriptionSection>
    </>
  );
}
