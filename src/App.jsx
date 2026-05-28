import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RightPanel from "./components/RightPanel";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ImageDetail from "./pages/ImageDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", minHeight: "100vh", background: "#F0F6FF" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <Routes>
            <Route path="/" element={
              <div style={{ flex: 1, display: "flex" }}>
                <Home />
                <RightPanel />
              </div>
            } />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/image/:id" element={<ImageDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}