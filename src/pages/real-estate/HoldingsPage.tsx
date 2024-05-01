import styled from "styled-components";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MEDIA_SIZE } from "../../constants";
import useGetDocument from "../../sanity/useGetDocument";
import { HoldingsPageDefinition, getSrc } from "../../sanity";
import { get100ViewportHeight } from "../../utils";

const Container = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  height: calc(${get100ViewportHeight()} - ${NAV_BAR_HEIGHT}px);
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 2s;

  @media ${MEDIA_SIZE.desktop} {
    flex-direction: row;
    flex-wrap: wrap;
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
    font-size: 10vw;
    opacity: 1;
    margin: auto;
  }
`;

const Section = styled(Link)`
  position: relative;
  flex: 1 0 0;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  text-decoration: none;

  &:hover ${Image}, &:hover ${Label} {
    opacity: 1;
  }

  @media ${MEDIA_SIZE.desktop} {
    flex: 1 0 50vw;
    height: 50%;
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
      <NavBarPlaceholder />
      <Container show={!isLoading && numImagesLoaded === 4}>
        <Section to="/holdings/commercial">
          <Image
            src={getSrc(data?.commercial)}
            onLoad={() => setNumImagesLoaded((prev) => prev + 1)}
          />
          <Gradient />
          <Label>Commercial</Label>
        </Section>
        <Section to="/holdings/retail">
          <Image
            src={getSrc(data?.retail)}
            onLoad={() => setNumImagesLoaded((prev) => prev + 1)}
          />
          <Gradient />
          <Label>Retail</Label>
        </Section>
        <Section to="/holdings/industrial">
          <Image
            src={getSrc(data?.industrial)}
            onLoad={() => setNumImagesLoaded((prev) => prev + 1)}
          />
          <Gradient />
          <Label>Industrial</Label>
        </Section>
        <Section to="/holdings/residential">
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
