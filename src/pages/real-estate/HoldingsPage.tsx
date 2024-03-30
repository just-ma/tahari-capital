import styled from "styled-components";
import IndustrialImageSrc from "../../assets/images/holdings-industrial.jpg";
import CommercialImageSrc from "../../assets/images/holdings-commercial.jpg";
import RetailImageSrc from "../../assets/images/holdings-retail.jpg";
import ResidentialImageSrc from "../../assets/images/holdings-residential.jpg";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  height: 100vh;
  animation: fadeIn 2s forwards;
  opacity: 0;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const NavBarPlaceholder = styled.div`
  flex-shrink: 0;
  height: ${NAV_BAR_HEIGHT}px;
`;

const Image = styled.img`
  position: absolute;
  pointer-events: none;
  z-index: -2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  transition: opacity 0.6s;
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 40%,
    rgba(0, 0, 0, 0) 100%
  );
  opacity: 0.8;
`;

const Label = styled.div`
  margin-left: 160px;
  font-size: 6vw;
  color: white;
  font-weight: lighter;
  opacity: 0.5;
  transition: opacity 0.6s;
`;

const Row = styled(Link)`
  position: relative;
  flex: 2 0 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  &:hover ${Image}, &:hover ${Label} {
    opacity: 1;
  }
`;

export default function HoldingsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Container>
      <NavBarPlaceholder />
      <Row to="/holdings/industrial">
        <Image src={IndustrialImageSrc} />
        <Gradient />
        <Label>Industrial</Label>
      </Row>
      <Row to="/holdings/retail">
        <Image src={RetailImageSrc} />
        <Gradient />
        <Label>Retail</Label>
      </Row>
      <Row to="/holdings/commercial">
        <Image src={CommercialImageSrc} />
        <Gradient />
        <Label>Commercial</Label>
      </Row>
      <Row to="/holdings/residential">
        <Image src={ResidentialImageSrc} />
        <Gradient />
        <Label>Residential</Label>
      </Row>
    </Container>
  );
}
