import { useState } from "react";
import styled from "styled-components";
import Image1 from "../../assets/images/fashion-gallery-1.jpg";
import Image2 from "../../assets/images/fashion-gallery-2.jpg";
import Image3 from "../../assets/images/fashion-gallery-3.jpg";
import Image4 from "../../assets/images/fashion-gallery-4.jpg";
import Image5 from "../../assets/images/fashion-gallery-5.jpg";

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
`;

const Column = styled.div<{ active: boolean }>`
  position: relative;
  flex-basis: 0;
  flex-grow: ${({ active }) => (active ? 3 : 1)};
  opacity: ${({ active }) => (active ? 1 : 0.4)};
  height: 100%;
  transition: flex-grow 0.5s cubic-bezier(0.4, 0, 0, 1), opacity 0.5s;
`;

const ColumnImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
`;

const IMAGES = [Image1, Image2, Image3, Image4, Image5];

export default function FashionGallery() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <Container>
      {IMAGES.map((src, index) => (
        <Column
          key={index}
          active={index === activeIndex}
          onMouseEnter={() => setActiveIndex(index)}
        >
          <ColumnImage src={src} draggable={false} />
        </Column>
      ))}
    </Container>
  );
}
