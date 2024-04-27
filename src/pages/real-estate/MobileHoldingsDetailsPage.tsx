import styled from "styled-components";
import { Fragment } from "react";

const Gallery = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 50px auto 0;
  animation: fadeIn 2s forwards;
  pointer-events: none;
  opacity: 0;
  box-sizing: border-box;
  gap: 10px;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
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
  label: string;
  src: string;
};

export default function MobileHoldingsDetailsPage({
  holdings,
}: {
  holdings: HoldingDefinition[];
}) {
  return (
    <Gallery>
      {holdings.map(({ label, src }, index) => (
        <Fragment key={label}>
          <Label>{label}</Label>
          <ImageContainer id={String(index)}>
            <Image src={src} />
          </ImageContainer>
        </Fragment>
      ))}
    </Gallery>
  );
}
