import styled from "styled-components";
import BackgroundImageSrc from "../../assets/images/tahari-realty-background.jpg";
import ServicesBackgroundImageSrc from "../../assets/images/tahari-realty-services-background.jpg";
import BrokerageIconSrc from "../../assets/images/brokerage-icon.png";
import LendingIconSrc from "../../assets/images/lending-icon.png";
import CaptialAdvisoryIconSrc from "../../assets/images/captial-advisory-icon.png";
import PropertyMgmtIconSrc from "../../assets/images/property-mgmt-icon.png";
import ConstructionMgmtIconSrc from "../../assets/images/construction-mgmt-icon.png";
import LogoImageSrc from "../../assets/images/tahari-realty-logo.png";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";

const Section = styled.div<{ opacity: number; reverse?: boolean }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ opacity }) => opacity};
`;

const ServicesSection = styled(Section)`
  height: 235vh;
  align-items: flex-start;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  animation: fadeIn 2s forwards;
  opacity: 0;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const ServicesBackgroundImage = styled(BackgroundImage)`
  position: relative;
  flex: 1 0 50%;
  height: 100vh;
  position: sticky;
  display: block;
  width: 0;
  top: ${NAV_BAR_HEIGHT}px;
`;

const HalfSection = styled.div`
  flex: 1 0 50%;
  height: 100%;
`;

const LogoImage = styled.img`
  position: absolute;
  width: 45%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
  animation: fadeIn 1s forwards;
  opacity: 0;
`;

const Shadow = styled.div`
  position: absolute;
  width: 35%;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  box-shadow: 0 0 80px 100px black;
  opacity: 0.6;
  z-index: 0;
`;

const ServicesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 200px 100px 0;
`;

const ServiceItem = styled.div<{
  show: boolean;
  delay: number;
}>`
  flex: 1 0 0;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 50px;
  margin-top: ${({ show }) => (show ? 0 : 30)}px;
  margin-bottom: ${({ show }) => (show ? 30 : 0)}px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 1s margin-top ${({ delay }) => delay}s cubic-bezier(0.4, 0, 0, 1),
    1s margin-bottom ${({ delay }) => delay}s cubic-bezier(0.4, 0, 0, 1),
    1s opacity ${({ delay }) => delay}s;
`;

const ServiceIcon = styled.img`
  width: 80px;
  height: 80px;
  pointer-events: none;
`;

const ServiceLabel = styled.div`
  color: white;
  text-transform: uppercase;
  font-size: 24px;
  line-height: 30px;
  white-space: pre-wrap;
  cursor: default;
`;

const Description = styled.div<{ show: boolean }>`
  width: 100%;
  font-size: 22px;
  line-height: 30px;
  white-space: pre-wrap;
  cursor: default;
  padding: 140px 100px 0;
  box-sizing: border-box;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 1s bottom cubic-bezier(0.4, 0, 0, 1), 1s opacity;
`;

export default function RealtyPage() {
  const [showServices, setShowServices] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const { scrollTop } = useAppContext();

  useEffect(() => {
    setShowServices(scrollTop > window.innerHeight * 0.5);
    setShowDescription(scrollTop >= window.innerHeight * 1.25);
  }, [scrollTop]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Section
        opacity={Math.max(
          (window.innerHeight - scrollTop) / window.innerHeight,
          0
        )}
      >
        <BackgroundImage src={BackgroundImageSrc} />
        <Shadow />
        <LogoImage src={LogoImageSrc} draggable={false} />
      </Section>
      <ServicesSection opacity={Math.min(scrollTop / window.innerHeight, 1)}>
        <ServicesBackgroundImage src={ServicesBackgroundImageSrc} />
        <HalfSection>
          <ServicesContainer>
            <ServiceItem show={showServices} delay={0}>
              <ServiceIcon src={BrokerageIconSrc} />
              <ServiceLabel>Brokerage</ServiceLabel>
            </ServiceItem>
            <ServiceItem show={showServices} delay={showServices ? 0.2 : 0}>
              <ServiceIcon src={LendingIconSrc} />
              <ServiceLabel>Lending</ServiceLabel>
            </ServiceItem>
            <ServiceItem show={showServices} delay={showServices ? 2 * 0.2 : 0}>
              <ServiceIcon src={CaptialAdvisoryIconSrc} />
              <ServiceLabel>{"Captial \nAdvisory"}</ServiceLabel>
            </ServiceItem>
            <ServiceItem show={showServices} delay={showServices ? 3 * 0.2 : 0}>
              <ServiceIcon src={PropertyMgmtIconSrc} />
              <ServiceLabel>{"Property \nManagement"}</ServiceLabel>
            </ServiceItem>
            <ServiceItem show={showServices} delay={showServices ? 4 * 0.2 : 0}>
              <ServiceIcon src={ConstructionMgmtIconSrc} />
              <ServiceLabel>{"Construction \nManagement"}</ServiceLabel>
            </ServiceItem>
          </ServicesContainer>
          <Description show={showDescription}>
            Founded in 2021 by Jeremey Tahari, Tahari Realty is responsible for
            all activities and services related to the operation of the Tahari
            Capital portfolio of commercial properties and development projects.
            {"\n\n"}
            Tahari Realty includes professionals with extensive experience in
            office and retail leasing, property management, development,
            construction management, accounting and financial reporting.
            Leasing, Property Management and Construction Management
            professionals are assigned to each property to develop and execute a
            specific business plan to enhance and maximize the value of the
            asset. The Accounting group has a team of professionals who are
            dedicated to the processes of, budgeting, forecasting, bookkeeping
            and reporting in accordance with established industry best practices
            and audit procedures. The Construction Management group oversees
            projects ranging from tenant improvement work to major building
            renovations and new ground-up development.
            {"\n\n"}
            The integrated skill sets of these groups provide the in-house
            expertise required to deal with the complex local building codes,
            land use restrictions and other related regulations associated with
            the ownership of real estate assets in New York City and other areas
            of the country and across the globe.
          </Description>
        </HalfSection>
      </ServicesSection>
    </>
  );
}
