import styled, { css } from "styled-components";
import TahariCaptialLogo from "../assets/graphics/tahari-captial-logo.svg?react";
import { Link } from "react-router-dom";

const CURRENT_YEAR = new Date().getFullYear();
const EMAIL = "office@taharicaptial.com";

const Container = styled.div`
  color: #aca9a7;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 80px;
  padding: 50px 50px 10px;
  box-sizing: border-box;
  text-transform: uppercase;
  cursor: default;
`;

const Content = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  gap: 150px;
`;

const Column = styled.div`
  flex-shrink: 0;
`;

const ColumnBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10%;
  line-height: 22px;
`;

const Copyright = styled.div`
  align-self: center;
  user-select: none;
  color: #5e5e5e;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  color: #dbd5cf;
  margin-bottom: 20px;
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

const LogoColumn = styled.div`
  flex: 2 0 0;
`;

const StyledLogo = styled(TahariCaptialLogo)`
  width: 200px;
  user-select: none;
  cursor: pointer;
`;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <Content>
        <LogoColumn>
          <StyledLogo onClick={scrollToTop} />
        </LogoColumn>
        <Column>
          <Title>Contact</Title>
          <ColumnBody>
            <ExternalLink href={`mailto:${EMAIL}`} underline>
              {EMAIL}
            </ExternalLink>
          </ColumnBody>
        </Column>
        <Column>
          <Title>Sitemap</Title>
          <ColumnBody>
            <InteralLink to="#portfolio">Portfolio</InteralLink>
            <InteralLink to="/history">History</InteralLink>
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
