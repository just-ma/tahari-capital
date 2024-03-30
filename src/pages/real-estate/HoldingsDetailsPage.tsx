import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  gap: 50px;
  margin: 0 auto;
  cursor: default;
  animation: fadeIn 2s forwards;
  background: linear-gradient(0deg, #3c3127 0%, #000 50%, #14110f 100%);
  opacity: 0;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const Menu = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Label = styled.div<{ active: boolean }>`
  font-size: 3vw;
  color: white;
  font-weight: lighter;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: opacity 0.6s;
  text-transform: uppercase;
`;

const ImageContainer = styled.div`
  flex: 1 0 0;
  position: relative;
  pointer-events: none;
  height: 80vh;
`;

const Image = styled.img<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.5s;
`;

export type HoldingDefinition = {
  label: string;
  src: string;
};

export default function HoldingsDetailsPage({
  holdings,
}: {
  holdings: HoldingDefinition[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Container>
      <Menu>
        {holdings.map(({ label }, index) => (
          <Label
            key={label}
            onMouseEnter={() => setActiveIndex(index)}
            active={activeIndex === index}
          >
            {label}
          </Label>
        ))}
      </Menu>
      <ImageContainer>
        {holdings.map(({ label, src }, index) => (
          <Image key={label} src={src} show={activeIndex === index} />
        ))}
      </ImageContainer>
    </Container>
  );
}
