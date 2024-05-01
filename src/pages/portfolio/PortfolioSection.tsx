import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAppContext from "../../hooks/useAppContext";
import { useState } from "react";
import { debounce, get100ViewportHeight } from "../../utils";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";
import useWindowSize from "../../hooks/useWindowSize";
import { MEDIA_SIZE } from "../../constants";
import useGetDocument from "../../sanity/useGetDocument";
import { PortfolioImagesDefinition, getSrc } from "../../sanity";

const Section = styled.div<{ opacity: number }>`
  position: relative;
  width: 100vw;
  height: calc(${get100ViewportHeight()} - ${NAV_BAR_HEIGHT}px);
  opacity: ${({ opacity }) => opacity};
  display: flex;
  flex-direction: column;
`;

const Row = styled.div<{ active: boolean }>`
  position: relative;
  flex-basis: 0;
  /* flex-grow: ${({ active }) => (active ? 3 : 1)}; */
  flex-grow: ${({ active }) => (active ? 2.5 : 1)};
  opacity: ${({ active }) => (active ? 1 : 0.4)};
  width: 100%;
  transition: flex-grow 0.7s cubic-bezier(0.4, 0, 0, 1), opacity 0.5s 0.1s;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const RowImage = styled.img<{ delay: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  animation: fadeIn 2s ${({ delay }) => delay}s forwards;
  opacity: 0;
  z-index: -2;
  pointer-events: none;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const RowTitleContainer = styled.div<{ expand: boolean }>`
  width: 100%;
  height: ${({ expand }) => (expand ? "calc(10vw + 50px)" : "4.1vw")};
  overflow: hidden;
  color: white;
  text-transform: uppercase;
  z-index: 1;
  transition: height 0.7s cubic-bezier(0.4, 0, 0, 1);
  overflow: hidden;

  @media ${MEDIA_SIZE.mobile} {
    height: ${({ expand }) => (expand ? 80 : 40)}px;
    text-align: center;
  }
`;

const RowTitle = styled.div<{ dim: boolean }>`
  font-size: 4vw;
  line-height: 4vw;
  margin-left: 100px;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
  font-weight: 100;

  @media ${MEDIA_SIZE.mobile} {
    font-size: 30px;
    line-height: 40px;
    margin-left: 0;
    font-weight: 400;
    height: ${({ dim }) => (dim ? 0 : 40)}px;
    transition: height 0.7s cubic-bezier(0.4, 0, 0, 1);
    overflow: hidden;
  }
`;

const RowSubtitle = styled.div`
  width: 100%;
  padding: 20px 130px 10px;
  font-size: 3vw;
  line-height: 3vw;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.5s;
  font-weight: 100;

  &:last-of-type {
    padding-top: 5px;
  }

  &:hover {
    opacity: 1;
  }

  @media ${MEDIA_SIZE.mobile} {
    font-size: 30px;
    line-height: 40px;
    padding: 0;
    opacity: 1;
    font-weight: 400;
  }
`;

const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 30%,
    rgba(0, 0, 0, 0) 100%
  );
  pointer-events: none;

  @media ${MEDIA_SIZE.mobile} {
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 40%,
      rgba(0, 0, 0, 0.6) 100%
    );
    opacity: 0.6;
  }
`;

type MenuItemDefinition = {
  key: keyof PortfolioImagesDefinition;
  label: string;
  to?: string;
  subItems?: {
    label: string;
    to: string;
  }[];
};

const MENU_ITEMS: readonly MenuItemDefinition[] = [
  {
    key: "fashion",
    label: "Fashion",
    to: "/fashion",
  },
  {
    key: "realEstate",
    label: "Real Estate",
    subItems: [
      {
        label: "Holdings",
        to: "/holdings",
      },
      {
        label: "Realty",
        to: "/realty",
      },
    ],
  },
  // {
  //   key: "lifestyle",
  //   label: "Lifestyle",
  //   to: "/lifestyle",
  // },
  {
    key: "ventures",
    label: "Ventures",
    to: "/ventures",
  },
  {
    key: "logistics",
    label: "Logistics",
    to: "/logistics",
  },
];

export default function PortfolioSection() {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileExpand, setMobileExpand] = useState(false);

  const { data } = useGetDocument<PortfolioImagesDefinition>("portfolioImages");

  const handleMouseEnter = debounce((index: number) => {
    setActiveIndex(index);
  }, 100);

  const { scrollTop } = useAppContext();
  const { isMobile } = useWindowSize();

  const handleRowClick = (to?: string, secondaryTo?: string) => {
    if (isMobile && secondaryTo && !mobileExpand) {
      setMobileExpand(true);
      return;
    }

    navigate(to || secondaryTo || "/");
  };

  return (
    <Section opacity={Math.min(scrollTop / window.innerHeight, 1)}>
      {MENU_ITEMS.map(({ key, label, to, subItems }, index) => (
        <Row
          key={index}
          active={isMobile || index === activeIndex}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => handleRowClick(to, subItems?.[0].to)}
        >
          <RowImage
            src={getSrc(data?.[key])}
            draggable={false}
            delay={index * 0.15 + 0.2}
          />
          <Shadow />
          <RowTitleContainer
            expand={
              !!subItems && (isMobile ? mobileExpand : index === activeIndex)
            }
          >
            <RowTitle dim={(!isMobile || mobileExpand) && !!subItems}>
              {label}
            </RowTitle>
            {!!subItems &&
              subItems.map(({ label, to }) => (
                <RowSubtitle
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(to);
                  }}
                >
                  {label}
                </RowSubtitle>
              ))}
          </RowTitleContainer>
        </Row>
      ))}
    </Section>
  );
}
