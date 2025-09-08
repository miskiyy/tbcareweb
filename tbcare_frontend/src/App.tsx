import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/landing/Navbar";
import Footer from "./components/footer/footer";
import Home from "./pages/landing/Home";
import About from "./pages/landing/About";

function App() {
  const [activePage, setActivePage] = useState("Home");

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 font-inter text-gray-800 flex flex-col">
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
