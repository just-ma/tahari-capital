import { useState } from "react";
import styled from "styled-components";
import { debounce, get100ViewportHeight } from "../../utils";
import { MEDIA_SIZE } from "../../constants";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getSrc } from "../../sanity";

const Container = styled.div`
  width: 50vw;
  height: ${get100ViewportHeight()};
  display: flex;

  @media ${MEDIA_SIZE.mobile} {
    width: 100%;
  }
`;

const Column = styled.div<{ active: boolean }>`
  position: relative;
  flex-basis: 0;
  flex-grow: ${({ active }) => (active ? 3 : 1)};
  opacity: ${({ active }) => (active ? 1 : 0.2)};
  height: 100%;
  transition: flex-grow 0.5s cubic-bezier(0.4, 0, 0, 1), opacity 0.5s;
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
  const [activeIndex, setActiveIndex] = useState(1);

  const handleMouseEnter = debounce((index: number) => {
    setActiveIndex(index);
  }, 100);

  return (
    <Container>
      {images?.map((image, index) => (
        <Column
          key={index}
          active={index === activeIndex}
          onMouseEnter={() => handleMouseEnter(index)}
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
