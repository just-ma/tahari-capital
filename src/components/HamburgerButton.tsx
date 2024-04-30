import styled from "styled-components";

const Container = styled.div<{ hide: boolean; show: boolean }>`
  position: relative;
  width: 20px;
  height: ${({ show }) => (show ? 20 : 16)}px;
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  transition: opacity 0.5s, height 0.5s;
`;

const LineContainer = styled.div<{ show: boolean }>`
  position: absolute;
  left: 0;
`;

const LineContainer1 = styled(LineContainer)`
  top: 0;
  transform-origin: left top;
  transform: rotate(${({ show }) => (show ? 45 : 0)}deg);
  transition: transform 0.5s;
`;

const LineContainer2 = styled(LineContainer)`
  top: 50%;
  transform: translate(0, -50%);
  opacity: ${({ show }) => (show ? 0 : 1)};
  transition: opacity 0.5s;
`;

const LineContainer3 = styled(LineContainer)`
  bottom: 0;
  transform-origin: left bottom;
  transform: rotate(${({ show }) => (show ? -45 : 0)}deg);
  transition: transform 0.5s;
`;

const Line = styled.div<{ show: boolean }>`
  width: ${({ show }) => (show ? 27 : 20)}px;
  height: 1px;
  background-color: white;
  transition: width 0.5s;
`;

export default function HamburgerButton({
  onClick,
  hide,
  show,
}: {
  onClick: () => void;
  hide: boolean;
  show: boolean;
}) {
  return (
    <Container onClick={onClick} hide={hide} show={show}>
      <LineContainer1 show={show}>
        <Line show={show} />
      </LineContainer1>
      <LineContainer2 show={show}>
        <Line show={false} />
      </LineContainer2>
      <LineContainer3 show={show}>
        <Line show={show} />
      </LineContainer3>
    </Container>
  );
}
