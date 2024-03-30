import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/NavBar";
import HomePage from "./pages/home/HomePage";
import { queryClient } from "./constants";
import PortfolioPage from "./pages/portfolio/PortfolioSection";
import { AppProvider } from "./hooks/useAppContext";
import FashionPage from "./pages/fashion/FashionPage";
import Footer from "./components/Footer";
import LogisticsPage from "./pages/logistics/LogisticsPage";
import HoldingsPage from "./pages/real-estate/HoldingsPage";
import IndustrialHoldingsPage from "./pages/real-estate/IndustrialHoldingsPage";
import RetailHoldingsPage from "./pages/real-estate/RetailHoldingsPage";
import CommercialHoldingsPage from "./pages/real-estate/CommercialHoldingsPage";
import ResidentialHoldingsPage from "./pages/real-estate/ResidentialHoldingsPage";

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

            {/* Portfolio - Real Estate - Holdings */}
            <Route path="/holdings" element={<HoldingsPage />} />

            {/* Portfolio - Real Estate - Holdings - Industrial */}
            <Route
              path="/holdings/industrial"
              element={<IndustrialHoldingsPage />}
            />

            {/* Portfolio - Real Estate - Holdings - Retail */}
            <Route path="/holdings/retail" element={<RetailHoldingsPage />} />

            {/* Portfolio - Real Estate - Holdings - Commercial */}
            <Route
              path="/holdings/commercial"
              element={<CommercialHoldingsPage />}
            />

            {/* Portfolio - Real Estate - Holdings - Residential */}
            <Route
              path="/holdings/residential"
              element={<ResidentialHoldingsPage />}
            />

            {/* Portfolio - Logistics */}
            <Route path="/logistics" element={<LogisticsPage />} />

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
