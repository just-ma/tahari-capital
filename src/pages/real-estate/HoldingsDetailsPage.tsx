import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import useWindowSize from "../../hooks/useWindowSize";
import MobileHoldingsDetailsPage from "./MobileHoldingsDetailsPage";
import { useQuery } from "@tanstack/react-query";
import { HoldingsListPageDefinition, client, getSrc } from "../../sanity";
import PagePlaceholder from "../../components/PagePlaceholder";
import { get100ViewportHeight } from "../../utils";

const Spacer = styled.div`
  height: ${get100ViewportHeight(0.2)};
`;

const ImagesContainer = styled.div<{ show: boolean }>`
  width: 45vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 10% 0 auto;
  pointer-events: none;
  opacity: 0;
  box-sizing: border-box;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 2s;
`;

const Menu = styled.div`
  position: fixed;
  top: 20%;
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
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: opacity 0.6s;
  text-transform: uppercase;
  text-align: right;
  line-height: 2.1vw;
  padding: 5px 0;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 100%;
  box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.5);
`;

const Image = styled.img<{ active: boolean }>`
  width: 100%;
  opacity: ${({ active }) => (active ? 1 : 0.2)};
  transition: opacity 0.5s;
  box-shadow: inset 0 0 100px black;
  z-index: -1;
  position: relative;
  display: block;
`;

const Title = styled.div`
  color: white;
  text-transform: uppercase;
  font-size: 3vw;
  font-weight: 100;
  margin-bottom: 20px;
`;

export type HoldingDefinition = {
  label: string;
  src: string;
};

export default function HoldingsDetailsPage({ title }: { title: string }) {
  const { windowHeight } = useWindowSize();

  const { data, isLoading } = useQuery({
    queryKey: [`holdings${title}`],
    queryFn: async (): Promise<HoldingsListPageDefinition> => {
      const response = await client.fetch(
        `*[_type == "holdingsListPage" && category == "${title.toLowerCase()}"]`
      );
      return response?.[0];
    },
  });

  const scrollMin = useRef(0);
  const scrollMax = useRef(windowHeight);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollToActiveIndex, setScrollToActiveIndex] = useState(0);
  const [numImagesLoaded, setNumImagesLoaded] = useState(0);

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
    if (!data?.holdings) {
      return;
    }

    const halfWindowHeight = windowHeight / 2;
    if (scrollTop + halfWindowHeight > scrollMax.current) {
      setActiveIndex((prev) => Math.min(prev + 1, data.holdings.length - 1));
    } else if (scrollTop + halfWindowHeight < scrollMin.current) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [scrollTop, data?.holdings]);

  const { isMobile } = useWindowSize();

  if (isMobile) {
    return <MobileHoldingsDetailsPage holdings={data?.holdings} />;
  }

  return (
    <>
      <Menu>
        <Title>{title}</Title>
        {data?.holdings.map(({ name }, index) => (
          <Label
            key={name}
            onClick={() => setScrollToActiveIndex(index)}
            active={activeIndex === index}
          >
            {name}
          </Label>
        ))}
      </Menu>
      <Spacer />
      <ImagesContainer
        show={!isLoading && numImagesLoaded === data?.holdings.length}
      >
        {data?.holdings.map(({ name, image }, index) => (
          <ImageContainer key={name} id={String(index)}>
            <Image
              src={getSrc(image)}
              active={activeIndex === index}
              onLoad={() => setNumImagesLoaded((prev) => prev + 1)}
            />
          </ImageContainer>
        ))}
      </ImagesContainer>
      {(isLoading || numImagesLoaded !== data?.holdings.length) && (
        <PagePlaceholder />
      )}
      <Spacer />
    </>
  );
}
