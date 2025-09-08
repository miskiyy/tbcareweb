import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/landing/Navbar";
import Footer from "./components/footer/footer";
import Home from "./pages/landing/Home";
import About from "./pages/landing/About";
import Download from "./pages/landing/Download";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

function AppContent() {
  const [activePage, setActivePage] = useState("Home");
  const location = useLocation();
  const hideLayout = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800 flex flex-col">
      {!hideLayout && <Navbar activePage={activePage} setActivePage={setActivePage} />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/download" element={<Download />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
