import styled from "styled-components";
import OneMainEastHamptonSrc from "../../assets/images/1-main-east-hampton.jpg";
import FortySixMainEastHamptonSrc from "../../assets/images/46-main-east-hampton.jpg";
import FortyEightMainEastHamptonSrc from "../../assets/images/48-main-east-hampton.jpg";
import FiftyFourMainEastHamptonSrc from "../../assets/images/54-main-east-hampton.jpg";
import FiftyThreeCircleEastHamptonSrc from "../../assets/images/53-circle-east-hampton.jpg";
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

const MENU = [
  {
    label: "1 Main St, East Hampton",
    src: OneMainEastHamptonSrc,
  },
  {
    label: "46 Main St, East Hampton",
    src: FortySixMainEastHamptonSrc,
  },
  {
    label: "48 Main St, East Hampton",
    src: FortyEightMainEastHamptonSrc,
  },
  {
    label: "54 Main St, East Hampton",
    src: FiftyFourMainEastHamptonSrc,
  },
  {
    label: "53 The Circle, East Hampton",
    src: FiftyThreeCircleEastHamptonSrc,
  },
];

export default function RetailHoldingsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Container>
      <Menu>
        {MENU.map(({ label }, index) => (
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
        {MENU.map(({ label, src }, index) => (
          <Image key={label} src={src} show={activeIndex === index} />
        ))}
      </ImageContainer>
    </Container>
  );
}
