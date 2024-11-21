import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Layout } from "antd";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import PaymentPage from "./pages/PaymentPage";
import DoctorPage from "./pages/Doctorpage";
import MapViewPage from "./pages/MapViewPage";
import ChatAssistantPage from "./pages/ChatAssistancePage";
import PatientPage from "./pages/PatientPage";
import MapView from "./components/Maps/MapView";
import LocationSearch from "./components/Maps/LocationSearch";
import "bootstrap-icons/font/bootstrap-icons.css";

const { Content } = Layout;

const App = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  return (
    <Router>
      <Layout>
        <Navbar selectedKey={selectedKey} />
        <Content style={{ padding: "0 48 px" }}>
          <div
            style={{
              minHeight: 280,
              height: "100%",
              padding: 24,
              margin: 40,
              background: "white",
              borderRadius: 10,
            }}
          >
            <div style={{ padding: "10px", display: "grid" }}>
              <Routes>
                <Route path="/" element={<Navigate to="/patient" replace />} />{" "}
                {/* FIXME: Change this to login*/}
                <Route path="/login" element={<HomePage />} />
                <Route path="/patient" element={<PatientPage />} />
                <Route path="/doctor" element={<DoctorPage />} />
                <Route path="/mapview" element={<MapViewPage />} />
                <Route path="/chatassist" element={<ChatAssistantPage />} />
                <Route path="/patient/payment" element={<PaymentPage />} />
                {/* TODO: only to be used by Nikhil for now. Men at work kinda situation */}
                <Route path="/test" element={<LocationSearch />} />
                <Route path="/mapTest" element={<MapView />} />
              </Routes>
            </div>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
