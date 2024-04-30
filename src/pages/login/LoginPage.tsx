import styled from "styled-components";
import { useEffect, useState } from "react";
import { MEDIA_SIZE } from "../../constants";
import TahariLogo from "../../assets/graphics/tahari-captial-logo.svg?react";
import useGetDocument from "../../sanity/useGetDocument";
import { LoginBackgroundDefinition, getSrc } from "../../sanity";
import { get100ViewportHeight } from "../../utils";

const Section = styled.div<{ reverse?: boolean }>`
  position: relative;
  width: 100vw;
  height: ${get100ViewportHeight()};
`;

const BackgroundImage = styled.img<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 2s opacity;
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
  backdrop-filter: brightness(0.6) blur(10px);
  -webkit-backdrop-filter: brightness(0.6) blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1;
  animation: slideIn 0.8s cubic-bezier(0.4, 0, 0, 1) forwards;

  @keyframes slideIn {
    to {
      right: 0;
    }
  }

  @media ${MEDIA_SIZE.mobile} {
    width: 100vw;
    right: -100vw;
    padding: 14px;
    backdrop-filter: brightness(0.4);
    -webkit-backdrop-filter: brightness(0.4);
  }
`;

const Logo = styled(TahariLogo)`
  width: 70%;
  margin: 0 auto;
  height: fit-content;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-top: 40px;
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
  border-radius: 7px;
  border: ${({ error }) =>
    error ? "#ffa2a2 solid 1px" : "rgba(255, 255, 255, 0.5) solid 1px"};
  outline: none;
  background-color: rgba(255, 255, 255, 0.4);
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
  margin-bottom: 14%;
`;

const SubmitButton = styled.button`
  color: white;
  font-size: 16px;
  background-color: black;
  width: 100%;
  text-transform: uppercase;
  cursor: pointer;
  height: 38px;
  border-radius: 7px;
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
  const { data } = useGetDocument<LoginBackgroundDefinition>("loginBackground");

  const [submitting, setSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
        <BackgroundImage
          src={getSrc(data?.image)}
          onLoad={() => setImageLoaded(true)}
          show={imageLoaded}
        />
        <Shadow />
        <Panel>
          <Logo />
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
              Investor Login
            </SubmitButton>
          </SubmitContainer>
        </Panel>
      </Section>
    </>
  );
}
