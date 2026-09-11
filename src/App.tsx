import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/ToastContainer';
import { HomePage } from './pages/HomePage';
import { PlannerPage } from './pages/PlannerPage';
import { GeneratingScreen } from './pages/GeneratingScreen';
import { ItineraryPage } from './pages/ItineraryPage';
import { StaycationPage } from './pages/StaycationPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { SavedTripsPage } from './pages/SavedTripsPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1D2521] selection:bg-[#F28C28]/20 selection:text-[#12372A]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plan" element={<PlannerPage />} />
            <Route path="/generating" element={<GeneratingScreen />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/staycations" element={<StaycationPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/saved" element={<SavedTripsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
