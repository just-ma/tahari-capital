import styled from "styled-components";

export const NAV_BAR_HEIGHT = 40;

const Container = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  height: ${NAV_BAR_HEIGHT}px;
  padding: 0 20px;
  box-sizing: border-box;
  /* backdrop-filter: brightness(0.5) blur(10px); */
  overflow: hidden;
  animation: fadeIn 2s 1s forwards;
  opacity: 0;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TitleItem = styled.div`
  flex: 6 0 auto;
`;

const Item = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: flex-end;
`;

const Label = styled.div`
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  width: fit-content;
  font-size: 14px;
  user-select: none;
`;

const MENU_ITEMS = [
  { label: "Portfolio" },
  { label: "History" },
  { label: "Contact" },
  { label: "Login" },
];

export default function NavBar() {
  return (
    <Container>
      <TitleItem>
        <Label>Tahari Capital</Label>
      </TitleItem>
      {MENU_ITEMS.map(({ label }) => (
        <Item key={label}>
          <Label>{label}</Label>
        </Item>
      ))}
    </Container>
  );
}
