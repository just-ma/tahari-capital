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
import LoginPage from "./pages/login/LoginPage";
import RealtyPage from "./pages/realty/RealtyPage";
import VenturesPage from "./pages/ventures/VenturesPage";
import JeremeyTahariPage from "./pages/about/JeremeyTahariPage";
import { Helmet } from "react-helmet";
import HoldingsDetailsPage from "./pages/real-estate/HoldingsDetailsPage";
// import HistoryPage from "./pages/history/HistoryPage";
// import LifestylePage from "./pages/lifestyle/LifestylePage";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider>
          <NavBar />
          <Helmet>
            <title>TAHARI CAPITAL</title>
            <meta
              name="description"
              content="Currently managing a $300M+ portfolio of retail, residential, commercial, and industrial space, Tahari Capital is recognized for its unique attention to detail, clearly derived from its roots in fashion— where every stitch counts."
            />
          </Helmet>
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
              element={<HoldingsDetailsPage title="Industrial" />}
            />
            <Route
              path="/industrial"
              element={<Navigate replace to="/holdings/industrial" />}
            />

            {/* Portfolio - Real Estate - Holdings - Retail */}
            <Route
              path="/holdings/retail"
              element={<HoldingsDetailsPage title="Retail" />}
            />
            <Route
              path="/retail"
              element={<Navigate replace to="/holdings/retail" />}
            />

            {/* Portfolio - Real Estate - Holdings - Commercial */}
            <Route
              path="/holdings/commercial"
              element={<HoldingsDetailsPage title="Commercial" />}
            />
            <Route
              path="/commercial"
              element={<Navigate replace to="/holdings/commercial" />}
            />

            {/* Portfolio - Real Estate - Holdings - Residential */}
            <Route
              path="/holdings/residential"
              element={<HoldingsDetailsPage title="Residential" />}
            />
            <Route
              path="/residential"
              element={<Navigate replace to="/holdings/residential" />}
            />

            {/* Portfolio - Real Estate - Realty */}
            <Route path="/realty" element={<RealtyPage />} />

            {/* TODO:Portfolio - Lifestyle */}
            {/* <Route path="/lifestyle" element={<LifestylePage />} /> */}

            {/* Portfolio - Ventures */}
            <Route path="/ventures" element={<VenturesPage />} />

            {/* Portfolio - Logistics */}
            <Route path="/logistics" element={<LogisticsPage />} />

            {/* TODO: History */}
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
