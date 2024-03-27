import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/NavBar";
import HomePage from "./pages/home/HomePage";
import { queryClient } from "./constants";
import PortfolioPage from "./pages/portfolio/PortfolioSection";
import { AppProvider } from "./hooks/useAppContext";
import FashionPage from "./pages/fashion/FashionPage";
import Footer from "./components/Footer";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/tahari-capital">
        <AppProvider>
          <NavBar />
          <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Portfolio */}
            <Route path="/portfolio" element={<PortfolioPage />} />

            {/* Portfolio - Fashion */}
            <Route path="/elie-tahari" element={<FashionPage />} />

            {/* History */}
            <Route path="/history" element={<></>} />

            {/* Contact */}
            <Route path="/contact" element={<></>} />

            {/* Login */}
            <Route path="/login" element={<></>} />
          </Routes>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
