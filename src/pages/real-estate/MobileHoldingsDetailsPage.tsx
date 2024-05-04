import styled from "styled-components";
import { useState } from "react";
import { getSrc } from "../../sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import PagePlaceholder from "../../components/PagePlaceholder";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";
import { get100ViewportHeight } from "../../utils";

const Gallery = styled.div<{ show: boolean }>`
  width: 100vw;
  min-height: ${get100ViewportHeight(0.5)};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: ${NAV_BAR_HEIGHT}px auto 0;
  pointer-events: none;
  box-sizing: border-box;
  gap: 2px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 2s;
`;

const Item = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
`;

const Label = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 22px;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 2;
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  opacity: 0.6;
`;

const ImageContainer = styled.div`
  width: 100%;
  box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.5);
`;

const Image = styled.img`
  width: 100%;
  box-shadow: inset 0 0 100px black;
  z-index: -1;
  position: relative;
  display: block;
  min-height: 250px;
  object-fit: cover;
`;

export type HoldingDefinition = {
  name: string;
  image: SanityImageSource;
};

export default function MobileHoldingsDetailsPage({
  holdings,
}: {
  holdings?: HoldingDefinition[];
}) {
  const [numImagesLoaded, setNumImagesLoaded] = useState(0);

  return (
    <>
      <Gallery show={holdings ? numImagesLoaded === holdings.length : false}>
        {holdings?.map(({ name, image }, index) => (
          <Item key={name}>
            <Label>{name}</Label>
            <Gradient />
            <ImageContainer id={String(index)}>
              <Image
                src={getSrc(image)}
                onLoad={() => setNumImagesLoaded((prev) => prev + 1)}
              />
            </ImageContainer>
          </Item>
        ))}
      </Gallery>
      {(!holdings || numImagesLoaded !== holdings?.length) && (
        <PagePlaceholder />
      )}
    </>
  );
}
