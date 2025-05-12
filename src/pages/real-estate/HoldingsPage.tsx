import styled from "styled-components";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MEDIA_SIZE } from "../../constants";
import useGetDocument from "../../sanity/useGetDocument";
import { HoldingsPageDefinition, getSrc } from "../../sanity";
import { get100ViewportHeight } from "../../utils";
import { Helmet } from "react-helmet";

const Container = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  height: calc(${get100ViewportHeight()} - ${NAV_BAR_HEIGHT}px);
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 2s;

  @media ${MEDIA_SIZE.mobilePortrait} {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

const NavBarPlaceholder = styled.div`
  height: ${NAV_BAR_HEIGHT}px;
  width: 100vw;
`;

const Image = styled.img`
  position: absolute;
  pointer-events: none;
  z-index: -2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  transition: opacity 0.6s;

  @media ${MEDIA_SIZE.mobile} {
    opacity: 1;
  }
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 40%,
    rgba(0, 0, 0, 0) 100%
  );
  opacity: 0.8;
`;

const Label = styled.div`
  margin: 0 0 40px 40px;
  font-size: 4vw;
  line-height: 4vw;
  color: white;
  font-weight: 100;
  opacity: 0.5;
  transition: opacity 0.6s;
  text-transform: uppercase;

  @media ${MEDIA_SIZE.mobile} {
    opacity: 1;
  }

  @media ${MEDIA_SIZE.mobilePortrait} {
    font-size: 10vw;
    margin: auto;
  }

  @media ${MEDIA_SIZE.mobileLandscape} {
    margin: 0 0 20px 20px;
  }
`;

const Section = styled(Link)<{ mobileOrder: number }>`
  flex: 1 0 50vw;
  height: 50%;
  position: relative;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  text-decoration: none;

  &:hover ${Image}, &:hover ${Label} {
    opacity: 1;
  }

  @media ${MEDIA_SIZE.mobilePortrait} {
    height: auto;
    flex: 1 0 0;
    order: ${({ mobileOrder }) => mobileOrder};
  }
`;

export default function HoldingsPage() {
  const { data, isLoading } =
    useGetDocument<HoldingsPageDefinition>("holdingsPage");

  const [numImagesLoaded, setNumImagesLoaded] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Helmet>
        <title>TAHARI REAL ESTATE</title>
      </Helmet>
      <NavBarPlaceholder />
      <Container show={!isLoading && numImagesLoaded === 4}>
        <Section to="/holdings/commercial" mobileOrder={1}>
          <Image
            src={getSrc(data?.commercial)}
            onLoad={() => setNumImagesLoaded((prev) => prev + 1)}
          />
          <Gradient />
          <Label>Commercial</Label>
        </Section>
        <Section to="/holdings/retail" mobileOrder={2}>
          <Image
            src={getSrc(data?.retail)}
            onLoad={() => setNumImagesLoaded((prev) => prev + 1)}
          />
          <Gradient />
          <Label>Retail</Label>
        </Section>
        <Section to="/holdings/industrial" mobileOrder={3}>
          <Image
            src={getSrc(data?.industrial)}
            onLoad={() => setNumImagesLoaded((prev) => prev + 1)}
          />
          <Gradient />
          <Label>Industrial</Label>
        </Section>
        <Section to="/holdings/residential" mobileOrder={0}>
          <Image
            src={getSrc(data?.residential)}
            onLoad={() => setNumImagesLoaded((prev) => prev + 1)}
          />
          <Gradient />
          <Label>Residential</Label>
        </Section>
      </Container>
    </>
  );
}
