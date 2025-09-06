import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Dashboard/Home";
import Form from "./pages/Dashboard/Form";
import Data from "./pages/Dashboard/Data";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 p-6">
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="form" element={<Form />} />
                  <Route path="data" element={<Data />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
