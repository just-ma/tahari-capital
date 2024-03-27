import styled from "styled-components";

const CURRENT_YEAR = new Date().getFullYear();

const Container = styled.div`
  color: #aca9a7;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 50px;
  padding: 50px 50px 10px;
  box-sizing: border-box;
  text-transform: uppercase;
  cursor: default;
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
`;

const StyledLink = styled.a`
  color: #aca9a7;
  text-decoration-color: #706760;
  transition: color 0.3s;
  width: fit-content;

  &:hover {
    color: white;
  }
`;

export default function Footer() {
  return (
    <Container>
      <Contact>
        <Title>Contact</Title>
        <StyledLink href={"mailto:jeremey@taharicapital.com"}>
          jeremey@taharicapital.com
        </StyledLink>
        <StyledLink href={"tel:(917) 890-9902"}>{"(917) 890-9902"}</StyledLink>
        <div>
          <div>248 Mott Street</div>
          <div>Suite 11</div>
          <div>New York, New York, 10012</div>
        </div>
      </Contact>
      <Copyright>© {CURRENT_YEAR} TAHARI CAPITAL</Copyright>
    </Container>
  );
}
