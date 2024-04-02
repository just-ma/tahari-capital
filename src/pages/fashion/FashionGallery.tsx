import { useEffect, useState } from "react";
import styled from "styled-components";
import Image1 from "../../assets/images/fashion-gallery-1.jpg";
import Image2 from "../../assets/images/fashion-gallery-2.jpg";
import Image3 from "../../assets/images/fashion-gallery-3.jpg";
import Image4 from "../../assets/images/fashion-gallery-4.jpg";
import Image5 from "../../assets/images/fashion-gallery-5.jpg";
import { debounce } from "../../utils";

const Container = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
`;

const Column = styled.div<{ active: boolean; introAnimation: boolean }>`
  position: relative;
  flex-basis: 0;
  flex-grow: ${({ active }) => (active ? 3 : 1)};
  opacity: ${({ active }) => (active ? 1 : 0.2)};
  height: 100%;
  transition: flex-grow
      ${({ introAnimation }) =>
        introAnimation ? "0.15s" : "0.5s cubic-bezier(0.4, 0, 0, 1)"},
    opacity 0.5s;
`;

const ColumnImage = styled.img<{ delay: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  animation: fadeIn 2s ${({ delay }) => delay}s forwards;
  opacity: 0;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const IMAGES = [Image1, Image2, Image3, Image4, Image5];

export default function FashionGallery() {
  const [introAnimation, setIntroAnimation] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseEnter = debounce((index: number) => {
    if (introAnimation) {
      return;
    }

    setActiveIndex(index);
  }, 100);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === IMAGES.length - 1) {
          setIntroAnimation(false);
          clearInterval(interval);
          return prev;
        } else {
          return prev + 1;
        }
      });
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      {IMAGES.map((src, index) => (
        <Column
          key={index}
          active={index === activeIndex}
          onMouseEnter={() => handleMouseEnter(index)}
          introAnimation={introAnimation}
        >
          <ColumnImage src={src} draggable={false} delay={index * 0.15 + 0.2} />
        </Column>
      ))}
    </Container>
  );
}
