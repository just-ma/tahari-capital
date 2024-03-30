import styled from "styled-components";

const CURRENT_YEAR = new Date().getFullYear();

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

const ContactBody = styled.div`
  display: flex;
  gap: 10%;
  line-height: 22px;
`;

const Copyright = styled.div`
  align-self: flex-end;
  user-select: none;
  color: #5e5e5e;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  color: #dbd5cf;
  margin-bottom: 20px;
`;

const StyledLink = styled.a`
  color: #aca9a7;
  text-decoration-color: #706760;
  transition: color 0.3s;
  width: fit-content;
  display: block;

  &:hover {
    color: white;
  }
`;

export default function Footer() {
  return (
    <Container>
      <div>
        <Title>Contact</Title>
        <ContactBody>
          <div>
            <StyledLink href={"mailto:jeremey@taharicapital.com"}>
              jeremey@taharicapital.com
            </StyledLink>
            <StyledLink href={"tel:(917) 890-9902"}>
              {"(917) 890-9902"}
            </StyledLink>
          </div>
          <div>
            <div>248 Mott Street</div>
            <div>Suite 11</div>
            <div>New York, New York, 10012</div>
          </div>
        </ContactBody>
      </div>
      <Copyright>© {CURRENT_YEAR} TAHARI CAPITAL</Copyright>
    </Container>
  );
}
