import styled from "styled-components";
import LandingVideo from "./assets/videos/tahari.m4v";

const VideoSection = styled.video`
  height: 100vh;
  width: 100vw;
  object-fit: cover;
`;

const Section2 = styled.div`
  height: 100vh;
  background-color: black;
`;

export default function HomePage() {
  return (
    <>
      <VideoSection src={LandingVideo} autoPlay loop />
      <Section2></Section2>
    </>
  );
}
