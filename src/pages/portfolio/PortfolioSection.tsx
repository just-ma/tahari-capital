import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAppContext from "../../hooks/useAppContext";
import { useState } from "react";
import RealEstateBackgroundSrc from "../../assets/images/portfolio-real-estate.jpg";
import VenturesBackgroundSrc from "../../assets/images/portfolio-ventures.jpg";
import LogisticsBackgroundSrc from "../../assets/images/portfolio-logistics.jpg";
import FashionBackgroundSrc from "../../assets/images/portfolio-fashion.jpg";
import LifestyleBackgroundSrc from "../../assets/images/portfolio-lifestyle.jpg";
import { debounce } from "../../utils";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";
import useWindowSize from "../../hooks/useWindowSize";
import { MEDIA_SIZE } from "../../constants";

const Section = styled.div<{ opacity: number }>`
  position: relative;
  width: 100vw;
  height: calc(100vh - ${NAV_BAR_HEIGHT}px);
  opacity: ${({ opacity }) => opacity};
  display: flex;
  flex-direction: column;
`;

const Row = styled.div<{ active: boolean }>`
  position: relative;
  flex-basis: 0;
  flex-grow: ${({ active }) => (active ? 3 : 1)};
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
    height: ${({ expand }) => (expand ? "100px" : "30px")};
  }
`;

const RowTitle = styled.div<{ dim: boolean }>`
  font-size: 4vw;
  line-height: 4vw;
  margin-left: 100px;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
  font-weight: lighter;

  @media ${MEDIA_SIZE.mobile} {
    font-size: ${({ dim }) => (dim ? 26 : 30)}px;
    line-height: 30px;
    margin-left: 40px;
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

  &:last-of-type {
    padding-top: 5px;
  }

  &:hover {
    opacity: 1;
  }

  @media ${MEDIA_SIZE.mobile} {
    font-size: 30px;
    line-height: 30px;
    padding: 5px 55px 0;
    opacity: 1;
    font-weight: lighter;
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
`;

const MENU_ITEMS = [
  {
    label: "Fashion",
    to: "/fashion",
    src: FashionBackgroundSrc,
  },
  {
    label: "Real Estate",
    src: RealEstateBackgroundSrc,
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
  {
    label: "Lifestyle",
    to: "/lifestyle",
    src: LifestyleBackgroundSrc,
  },
  {
    label: "Ventures",
    to: "/ventures",
    src: VenturesBackgroundSrc,
  },
  {
    label: "Logistics",
    to: "/logistics",
    src: LogisticsBackgroundSrc,
  },
];

export default function PortfolioSection() {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseEnter = debounce((index: number) => {
    setActiveIndex(index);
  }, 100);

  const { scrollTop } = useAppContext();
  const { isMobile } = useWindowSize();

  return (
    <Section opacity={Math.min(scrollTop / window.innerHeight, 1)}>
      {MENU_ITEMS.map(({ label, to, subItems, src }, index) => (
        <Row
          key={index}
          active={isMobile || index === activeIndex}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => navigate(to || subItems?.[0].to || "/")}
        >
          <RowImage src={src} draggable={false} delay={index * 0.15 + 0.2} />
          <Shadow />
          <RowTitleContainer
            expand={!!subItems && (isMobile || index === activeIndex)}
          >
            <RowTitle dim={!!subItems}>{label}</RowTitle>
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
