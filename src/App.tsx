import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import LoginPage from "./pages/login/LoginPage";
import RealtyPage from "./pages/realty/RealtyPage";
import VenturesPage from "./pages/ventures/VenturesPage";
import JeremeyTahariPage from "./pages/about/JeremeyTahariPage";
// import HistoryPage from "./pages/history/HistoryPage";
// import LifestylePage from "./pages/lifestyle/LifestylePage";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider>
          <NavBar />
          <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Portfolio */}
            <Route path="/portfolio" element={<PortfolioPage />} />

            {/* Portfolio - Fashion */}
            <Route path="/fashion" element={<FashionPage />} />

            {/* Portfolio - Real Estate - Holdings */}
            <Route path="/holdings" element={<HoldingsPage />} />

            {/* Portfolio - Real Estate - Holdings - Industrial */}
            <Route
              path="/holdings/industrial"
              element={<IndustrialHoldingsPage />}
            />
            <Route
              path="/industrial"
              element={<Navigate replace to="/holdings/industrial" />}
            />

            {/* Portfolio - Real Estate - Holdings - Retail */}
            <Route path="/holdings/retail" element={<RetailHoldingsPage />} />
            <Route
              path="/retail"
              element={<Navigate replace to="/holdings/retail" />}
            />

            {/* Portfolio - Real Estate - Holdings - Commercial */}
            <Route
              path="/holdings/commercial"
              element={<CommercialHoldingsPage />}
            />
            <Route
              path="/commercial"
              element={<Navigate replace to="/holdings/commercial" />}
            />

            {/* Portfolio - Real Estate - Holdings - Residential */}
            <Route
              path="/holdings/residential"
              element={<ResidentialHoldingsPage />}
            />
            <Route
              path="/residential"
              element={<Navigate replace to="/holdings/residential" />}
            />

            {/* Portfolio - Real Estate - Realty */}
            <Route path="/realty" element={<RealtyPage />} />

            {/* Portfolio - Lifestyle */}
            {/* <Route path="/lifestyle" element={<LifestylePage />} /> */}

            {/* Portfolio - Ventures */}
            <Route path="/ventures" element={<VenturesPage />} />

            {/* Portfolio - Logistics */}
            <Route path="/logistics" element={<LogisticsPage />} />

            {/* History */}
            {/* <Route path="/history" element={<HistoryPage />} /> */}

            {/* Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Jeremey Tahari */}
            <Route path="/jeremey-tahari" element={<JeremeyTahariPage />} />
          </Routes>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
