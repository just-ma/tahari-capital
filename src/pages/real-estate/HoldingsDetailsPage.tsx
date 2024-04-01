import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import useScreenSize from "../../hooks/useWindowSize";

const Spacer = styled.div`
  height: 20vh;
`;

const ImagesContainer = styled.div`
  width: 45vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 10% 0 auto;
  animation: fadeIn 2s forwards;
  pointer-events: none;
  opacity: 0;
  box-sizing: border-box;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const Menu = styled.div`
  position: fixed;
  top: 30%;
  right: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  opacity: 0;
  animation: fadeIn 2s 0.5s forwards;
`;

const Label = styled.div<{ active: boolean }>`
  font-size: 2vw;
  color: white;
  font-weight: lighter;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: opacity 0.6s;
  text-transform: uppercase;
  text-align: right;
  line-height: 2.1vw;
  padding: 5px 0;
  cursor: pointer;
`;

const Image = styled.img<{ active: boolean }>`
  width: 100%;
  opacity: ${({ active }) => (active ? 1 : 0.2)};
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
  const { windowHeight } = useScreenSize();

  const scrollMin = useRef(0);
  const scrollMax = useRef(windowHeight);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollToActiveIndex, setScrollToActiveIndex] = useState(0);

  const { scrollTop } = useAppContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const el = document.getElementById(String(scrollToActiveIndex));
      if (!el) {
        return;
      }

      clearInterval(intervalId);
      setActiveIndex(scrollToActiveIndex);
      window.scrollTo({
        top: el.offsetTop + (el.clientHeight - windowHeight) / 2,
        behavior: "smooth",
      });
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [scrollToActiveIndex]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const el = document.getElementById(String(activeIndex));
    if (!el) {
      return;
    }

    scrollMin.current = el.offsetTop;
    scrollMax.current = el.offsetTop + el.clientHeight;
  }, [activeIndex]);

  useEffect(() => {
    const halfWindowHeight = windowHeight / 2;
    if (scrollTop + halfWindowHeight > scrollMax.current) {
      setActiveIndex((prev) => Math.min(prev + 1, holdings.length - 1));
    } else if (scrollTop + halfWindowHeight < scrollMin.current) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [scrollTop]);

  return (
    <>
      <Menu>
        {holdings.map(({ label }, index) => (
          <Label
            key={label}
            onClick={() => setScrollToActiveIndex(index)}
            active={activeIndex === index}
          >
            {label}
          </Label>
        ))}
      </Menu>
      <Spacer />
      <ImagesContainer>
        {holdings.map(({ label, src }, index) => (
          <Image
            key={label}
            id={String(index)}
            src={src}
            active={activeIndex === index}
          />
        ))}
      </ImagesContainer>
      <Spacer />
    </>
  );
}
