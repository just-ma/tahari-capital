import { useEffect, useState } from "react";
import styled from "styled-components";
import { debounce } from "../../utils";
import { MEDIA_SIZE } from "../../constants";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getSrc } from "../../sanity";

const Container = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;

  @media ${MEDIA_SIZE.mobile} {
    width: 100%;
  }
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

export default function FashionGallery({
  images,
}: {
  images: SanityImageSource[] | undefined;
}) {
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
        if (prev === (images?.length || 5) - 1) {
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
      {images?.map((image, index) => (
        <Column
          key={index}
          active={index === activeIndex}
          onMouseEnter={() => handleMouseEnter(index)}
          introAnimation={introAnimation}
        >
          <ColumnImage
            src={getSrc(image)}
            draggable={false}
            delay={index * 0.15 + 0.2}
          />
        </Column>
      ))}
    </Container>
  );
}
