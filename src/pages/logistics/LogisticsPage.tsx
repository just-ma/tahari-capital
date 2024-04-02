import styled from "styled-components";
import BackgroundImageSrc from "../../assets/images/tahari-logistics-stats-background.jpg";
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

const StatsSection = styled(Section)`
  height: 250vh;
  align-items: flex-start;
`;

const StatsBackgroundImage = styled.img`
  flex: 1 0 50%;
  height: 40%;
  object-fit: cover;
  animation: fadeIn 2s forwards;
  opacity: 0;
  user-select: none;
  position: sticky;
  top: 0px;
  display: block;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const HalfSection = styled.div`
  flex: 1 0 50%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MenuContainer = styled.div`
  width: 100%;
  flex: 1 0 50%;
  padding: 0 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  width: 100%;
  flex: 1 0 50%;
  padding: 0 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Description = styled.div`
  width: 100%;
  max-width: 480px;
  font-size: 20px;
  line-height: 30px;
  white-space: pre-wrap;
  cursor: default;
  text-align: justify;
  border-top: 1px solid #353535;
  border-bottom: 1px solid #353535;
  padding: 40px 0;
  font-weight: lighter;
  margin-bottom: 50px;
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
      <StatsSection opacity={Math.min(scrollTop / window.innerHeight, 1)}>
        <StatsBackgroundImage src={BackgroundImageSrc} draggable={false} />
        <HalfSection>
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
          <DescriptionContainer>
            <Description>
              {"\t"}
              Since 2003, Tahari Logistics has conducted full service third
              party logistics operations by shipping and fulfilling over fifty
              brands domestically and abroad. The firm gains a competitive
              advantage through its complete responsibility of the affiliated
              Tahari brand, as that standard of care is equally disseminated to
              all clients. The state of the art WMS and RFID coupled with the
              full steam tunnel and pressing capabilities sets apart Tahari
              Logistics to service nearly 10M units annually across all consumer
              goods products.
            </Description>
          </DescriptionContainer>
        </HalfSection>
      </StatsSection>
    </>
  );
}
