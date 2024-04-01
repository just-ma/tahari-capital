import styled from "styled-components";
import BackgroundImageSrc from "../../assets/images/login-background.jpg";
import { useEffect, useState } from "react";

const Section = styled.div<{ reverse?: boolean }>`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  animation: fadeIn 2s forwards;
  opacity: 0;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  z-index: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  pointer-events: none;
`;

const Panel = styled.div`
  position: absolute;
  top: 0;
  right: -400px;
  height: 100%;
  width: 400px;
  backdrop-filter: brightness(0.5) blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16%;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1;
  animation: slideIn 0.8s cubic-bezier(0.4, 0, 0, 1) forwards;

  @keyframes slideIn {
    to {
      right: 0;
    }
  }
`;

const Title = styled.div`
  color: white;
  text-transform: uppercase;
  font-size: 40px;
  line-height: 45px;
  font-weight: lighter;
  white-space: pre-wrap;
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 20px 0 10px;
`;

const InputLabel = styled.label`
  color: white;
  font-size: 14px;
  text-transform: uppercase;
  user-select: none;
  margin: 0 0 4px 8px;
  display: block;
`;

const Input = styled.input<{ error: boolean }>`
  width: 100%;
  height: 38px;
  border-radius: 4px;
  border: ${({ error }) =>
    error ? "#ffa2a2 solid 1px" : "transparent solid 1px"};
  outline: none;
  background-color: rgba(255, 255, 255, 0.5);
  transition: background-color 0.4s, opacity 0.4s;
  padding: 0 12px;
  font-family: system-ui;
  box-sizing: border-box;
  font-size: 16px;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.7);
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const SubmitContainer = styled.div`
  height: 60px;
`;

const SubmitButton = styled.button`
  color: white;
  font-size: 16px;
  background-color: black;
  width: 100%;
  text-transform: uppercase;
  cursor: pointer;
  height: 38px;
  border-radius: 4px;
  border: none;
  outline: none;
  transition: 0.4s background-color, 0.4s opacity;
  user-select: none;

  &:hover {
    background-color: #1f1f1f;
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const Error = styled.div<{ show: boolean }>`
  margin-top: 10px;
  font-size: 14px;
  color: #ffa2a2;
  text-transform: uppercase;
  width: 100%;
  text-align: right;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleSubmit = () => {
    setShowError(false);
    setSubmitting(true);
    setTimeout(() => {
      setShowError(true);
      setSubmitting(false);
    }, 500 + 500 * Math.random());
  };

  const hideError = () => {
    setShowError(false);
  };

  return (
    <>
      <Section>
        <BackgroundImage src={BackgroundImageSrc} />
        <Shadow />
        <Panel>
          <Title>{"Investor\nLogin"}</Title>
          <div>
            <InputContainer>
              <InputLabel>Username</InputLabel>
              <Input
                spellCheck={false}
                disabled={submitting}
                onChange={hideError}
                error={showError}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                spellCheck={false}
                disabled={submitting}
                onChange={hideError}
                error={showError}
              />
            </InputContainer>
            <Error show={showError}>Incorrect Username or Password</Error>
          </div>
          <SubmitContainer>
            <SubmitButton onClick={handleSubmit} disabled={submitting}>
              Login
            </SubmitButton>
          </SubmitContainer>
        </Panel>
      </Section>
    </>
  );
}