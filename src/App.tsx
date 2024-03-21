import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import { queryClient } from "./constants";
import styled from "styled-components";

const AppPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
`;

const Body = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/tahari-captial">
        <AppPage>
          <NavBar />
          <Body>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Body>
        </AppPage>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
