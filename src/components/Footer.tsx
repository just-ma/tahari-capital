import styled from "styled-components";

const CURRENT_YEAR = new Date().getFullYear();

const Container = styled.div`
  color: white;
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  user-select: none;
`;

export default function Footer() {
  return <Container>© {CURRENT_YEAR} TAHARI CAPITAL</Container>;
}
