import styled from "styled-components";
import LogoImageSrc from "../../assets/images/tahari-realty-logo.png";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";
import { MEDIA_SIZE } from "../../constants";
import useWindowSize from "../../hooks/useWindowSize";
import useGetDocument from "../../sanity/useGetDocument";
import { RealtyPageDefinition, getSrc } from "../../sanity";
import { PortableText } from "@portabletext/react";
import { get100ViewportHeight } from "../../utils";

const Section = styled.div<{ opacity: number; reverse?: boolean }>`
  position: relative;
  width: 100vw;
  height: ${get100ViewportHeight()};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ opacity }) => opacity};
`;

const ServicesSection = styled(Section)`
  height: fit-content;
  align-items: flex-start;

  @media ${MEDIA_SIZE.mobile} {
    flex-direction: column;
  }
`;

const BackgroundImage = styled.img<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 2s opacity;
`;

const ServicesBackgroundImage = styled.img`
  width: 0;
  height: ${get100ViewportHeight()};
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  flex: 1 0 50%;
  position: sticky;
  display: block;
  top: ${NAV_BAR_HEIGHT}px;

  @media ${MEDIA_SIZE.mobile} {
    opacity: 1;
    width: 100vw;
    flex: auto;
    position: relative;
    top: 0;
  }
`;

const HalfSection = styled.div`
  flex: 1 0 50%;
  height: 100%;

  @media ${MEDIA_SIZE.mobile} {
    flex: auto;
    height: fit-content;
  }
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

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @media ${MEDIA_SIZE.mobile} {
    width: 90%;
  }
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

  @media ${MEDIA_SIZE.mobile} {
    width: 70%;
  }
`;

const ServicesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 200px 100px 0;

  @media ${MEDIA_SIZE.mobile} {
    width: 100vw;
    height: fit-content;
    padding: 40px;
    box-sizing: border-box;
  }
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

  @media ${MEDIA_SIZE.mobile} {
    flex: 0 0 0;
    gap: 30px;
    margin-top: ${({ show }) => (show ? 0 : 40)}px;
    margin-bottom: ${({ show }) => (show ? 40 : 0)}px;
  }
`;

const ServiceIcon = styled.img`
  width: 80px;
  height: 80px;
  pointer-events: none;

  @media ${MEDIA_SIZE.mobile} {
    width: 50px;
    height: 50px;
  }
`;

const ServiceLabel = styled.div`
  color: white;
  text-transform: uppercase;
  font-size: 24px;
  line-height: 30px;
  white-space: pre-wrap;
  cursor: default;
  max-width: 200px;

  @media ${MEDIA_SIZE.mobile} {
    font-size: 20px;
    line-height: 26px;
  }
`;

const Description = styled.div<{ show: boolean }>`
  width: 100%;
  font-size: 18px;
  line-height: 26px;
  white-space: pre-wrap;
  cursor: default;
  padding: 140px 100px;
  box-sizing: border-box;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 1s bottom cubic-bezier(0.4, 0, 0, 1), 1s opacity;
  text-align: justify;

  @media ${MEDIA_SIZE.mobile} {
    font-size: 14px;
    line-height: 20px;
    padding: 60px 40px 10px;
  }
`;

export default function RealtyPage() {
  const { data } = useGetDocument<RealtyPageDefinition>("realtyPage");

  const [showServices, setShowServices] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { scrollTop } = useAppContext();
  const { isMobile } = useWindowSize();

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
        <BackgroundImage
          src={getSrc(
            (isMobile && data?.primaryImageMobile) || data?.primaryImage
          )}
          onLoad={() => setImageLoaded(true)}
          show={imageLoaded}
        />
        <Shadow />
        <LogoImage src={LogoImageSrc} draggable={false} />
      </Section>
      <ServicesSection opacity={Math.min(scrollTop / window.innerHeight, 1)}>
        {!isMobile && (
          <ServicesBackgroundImage src={getSrc(data?.secondaryImage)} />
        )}
        <HalfSection>
          <ServicesContainer>
            {data?.services.map(({ label, icon }, index) => (
              <ServiceItem
                show={showServices}
                delay={showServices ? 0.2 * index : 0}
                key={label}
              >
                <ServiceIcon src={getSrc(icon)} />
                <ServiceLabel>{label}</ServiceLabel>
              </ServiceItem>
            ))}
          </ServicesContainer>
          {isMobile && (
            <ServicesBackgroundImage src={getSrc(data?.secondaryImage)} />
          )}
          <Description show={showDescription}>
            {data && <PortableText value={data.copy} />}
          </Description>
        </HalfSection>
      </ServicesSection>
    </>
  );
}
