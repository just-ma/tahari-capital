import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import useWindowSize from "../../hooks/useWindowSize";
import MobileHoldingsDetailsPage from "./MobileHoldingsDetailsPage";
import { useQuery } from "@tanstack/react-query";
import { HoldingsListPageDefinition, client, getSrc } from "../../sanity";
import PagePlaceholder from "../../components/PagePlaceholder";
import { MEDIA_SIZE } from "../../constants";
import { Helmet } from "react-helmet";

const Spacer = styled.div`
  height: 180px;

  @media ${MEDIA_SIZE.mobileLandscape} {
    height: 100px;
  }
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

const Menu = styled.div<{ show: boolean }>`
  position: fixed;
  top: 20%;
  right: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.5s;
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

  const numHoldings = data?.holdings.length || 0;

  useEffect(() => {
    if (!data || numHoldings !== numImagesLoaded) {
      return;
    }

    const el = document.getElementById(
      data.holdings[scrollToActiveIndex]?.name
    );
    if (!el) {
      return;
    }

    setActiveIndex(scrollToActiveIndex);
    window.scrollTo({
      top: el.offsetTop + (el.clientHeight - windowHeight) / 2,
      behavior: "smooth",
    });
  }, [scrollToActiveIndex, data, numImagesLoaded]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (activeIndex === numHoldings) {
      scrollMin.current = scrollMax.current;
      return;
    }

    const el = document.getElementById(data.holdings[activeIndex]?.name);
    if (!el) {
      return;
    }

    scrollMin.current = el.offsetTop;
    scrollMax.current = el.offsetTop + el.clientHeight;
  }, [data, activeIndex]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const halfWindowHeight = windowHeight / 2;
    if (scrollTop + halfWindowHeight > scrollMax.current) {
      setActiveIndex((prev) => Math.min(prev + 1, numHoldings));
    } else if (scrollTop + halfWindowHeight < scrollMin.current) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [scrollTop, data]);

  const { isMobilePortrait } = useWindowSize();

  if (isMobilePortrait) {
    return <MobileHoldingsDetailsPage holdings={data?.holdings} />;
  }

  return (
    <>
      <Helmet>
        <title>{`TAHARI REAL ESTATE - ${title.toUpperCase()}`}</title>
      </Helmet>
      <Menu show={activeIndex !== numHoldings}>
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
      <ImagesContainer show={!isLoading && numImagesLoaded === numHoldings}>
        {data?.holdings.map(({ name, image }, index) => (
          <ImageContainer key={name} id={name}>
            <Image
              src={getSrc(image)}
              active={activeIndex === index}
              onLoad={() => setNumImagesLoaded((prev) => prev + 1)}
            />
          </ImageContainer>
        ))}
      </ImagesContainer>
      {(isLoading || numImagesLoaded !== numHoldings) && <PagePlaceholder />}
      <Spacer />
    </>
  );
}
