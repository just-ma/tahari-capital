import styled from "styled-components";
import { Fragment, useState } from "react";
import { getSrc } from "../../sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import PagePlaceholder from "../../components/PagePlaceholder";

const Gallery = styled.div<{ show: boolean }>`
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 50px auto 0;
  pointer-events: none;
  box-sizing: border-box;
  gap: 10px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 2s;
`;

const Label = styled.div`
  font-size: 18px;
  color: white;
  text-transform: uppercase;
  line-height: 2.1vw;
  padding: 5px 0;
  cursor: pointer;
  margin-top: 40px;
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
          <Fragment key={name}>
            <Label>{name}</Label>
            <ImageContainer id={String(index)}>
              <Image
                src={getSrc(image)}
                onLoad={() => setNumImagesLoaded((prev) => prev + 1)}
              />
            </ImageContainer>
          </Fragment>
        ))}
      </Gallery>
      {(!holdings || numImagesLoaded !== holdings?.length) && (
        <PagePlaceholder />
      )}
    </>
  );
}
