import styled, { css } from "styled-components";
import TahariCapitalLogoSrc from "../assets/graphics/tahari-capital-logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MEDIA_SIZE } from "../constants";
import useGetDocument from "../sanity/useGetDocument";
import { ContactDefinition } from "../sanity";
import { PortableText } from "@portabletext/react";

const CURRENT_YEAR = new Date().getFullYear();

const Container = styled.div`
  color: #aca9a7;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 50px 50px 10px;
  box-sizing: border-box;
  text-transform: uppercase;
  cursor: default;

  @media ${MEDIA_SIZE.mobile} {
    padding: 50px 40px 10px;
  }
`;

const Content = styled.div`
  min-height: 240px;
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  gap: 150px;

  @media ${MEDIA_SIZE.mobile} {
    flex-wrap: wrap;
    gap: 50px 20px;
    height: fit-content;
    margin-bottom: 50px;
  }
`;

const Column = styled.div`
  flex-shrink: 0;
`;

const ColumnBody = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 22px;
`;

const ContactColumnBody = styled(ColumnBody)`
  gap: 10px;
`;

const Copyright = styled.div`
  align-self: center;
  user-select: none;
  color: #5e5e5e;
`;

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  color: #dbd5cf;
  margin-bottom: 20px;

  @media ${MEDIA_SIZE.mobile} {
    margin-bottom: 10px;
  }
`;

const linkCss = css<{ underline?: boolean }>`
  color: #aca9a7;
  text-decoration-color: #706760;
  transition: color 0.3s;
  width: fit-content;
  display: block;
  text-decoration: ${({ underline }) => (underline ? "underline" : "none")};

  &:hover {
    color: white;
  }
`;

const ExternalLink = styled.a<{ underline?: boolean }>`
  ${linkCss}
`;

const InteralLink = styled(Link)<{ underline?: boolean }>`
  ${linkCss}
`;

const Label = styled.div`
  color: #aca9a7;
  margin: 0;
  line-height: 18px;

  p {
    margin: 0;
  }
`;

const LogoColumn = styled.div`
  flex: 2 0 0;

  @media ${MEDIA_SIZE.mobile} {
    order: 1;
  }
`;

const Logo = styled.img`
  width: 200px;
  margin-top: 10px;
  user-select: none;
  cursor: pointer;

  @media ${MEDIA_SIZE.mobile} {
    width: auto;
    display: block;
    margin: 0 0 0 auto;
  }
`;

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data } = useGetDocument<ContactDefinition>("contact");

  const email = data?.email || "";
  const phone = data?.phone || "";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = () => {
    navigate("/");
    scrollToTop();
  };

  if (location.pathname === "/history") {
    return null;
  }

  return (
    <Container>
      <Content>
        <LogoColumn>
          <Logo src={TahariCapitalLogoSrc} onClick={handleLogoClick} />
        </LogoColumn>
        <Column>
          <Title>Contact</Title>
          <ContactColumnBody>
            <ExternalLink href={`mailto:${email}`} underline>
              {email}
            </ExternalLink>
            <ExternalLink href={`tel:${phone}`} underline>
              {phone}
            </ExternalLink>
            <Label>{data && <PortableText value={data.address} />}</Label>
          </ContactColumnBody>
        </Column>
        <Column>
          <Title>Sitemap</Title>
          <ColumnBody>
            <InteralLink to="/" onClick={scrollToTop}>
              Home
            </InteralLink>
            <InteralLink to="/#portfolio">Portfolio</InteralLink>
            {/* <InteralLink to="/history">History</InteralLink> */}
            <InteralLink to="/login">Login</InteralLink>
          </ColumnBody>
        </Column>
        <Column>
          <Title>Corporate</Title>
          <ColumnBody>
            <ExternalLink href="https://www.elietahari.com/">
              Elie Tahari
            </ExternalLink>
            <ExternalLink href="https://www.taharirealty.com/">
              Tahari Realty
            </ExternalLink>
            <InteralLink to="/">Tahari Logistics</InteralLink>
          </ColumnBody>
        </Column>
      </Content>
      <Copyright>© {CURRENT_YEAR} TAHARI CAPITAL</Copyright>
    </Container>
  );
}
