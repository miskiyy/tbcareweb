import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/landing/Navbar";
import Footer from "./components/footer/footer";
import Home from "./pages/landing/Home";
import About from "./pages/landing/About";
import Download from "./pages/landing/Download";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import DashboardHome from "./pages/Dashboard/Home";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import NotFound from "./pages/OtherPage/NotFound";
import FormBaru from "./pages/Dashboard/FormBaru";
import FormProgres from "./pages/Dashboard/FormProgres";
import Data from "./pages/Dashboard/Data";

function AppContent() {
  const [activePage, setActivePage] = useState("Home");
  const location = useLocation();
  const hideLayout = location.pathname === "/signin" || location.pathname === "/signup" || location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800 flex flex-col">
      <ScrollToTop />
      {!hideLayout && <Navbar activePage={activePage} setActivePage={setActivePage} />}
      <div className="flex-1">
        <Routes>
          {/* Landing Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/download" element={<Download />} />

          {/* Auth Pages */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Dashboard Layout */}
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<UserProfiles />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="blank" element={<Blank />} />
            <Route path="form-elements" element={<FormElements />} />
            <Route path="basic-tables" element={<BasicTables />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="avatars" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} />
            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />
            <Route path="formbaru" element={<FormBaru />} />
            <Route path="formprogres" element={<FormProgres />} />
            <Route path="data" element={<Data />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
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
