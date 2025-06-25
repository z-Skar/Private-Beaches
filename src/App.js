import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import GlobalStyles from 'styles/GlobalStyles';


import Beaches from "components/cards/Beaches.js";
import LifeguardForm from "components/forms/LifeguardForm";
import Home from "demos/Home";
import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import TermsOfServicePage from "pages/TermsOfService.js";
import PrivacyPolicyPage from "pages/PrivacyPolicy.js";
import BeachReservation from "pages/BeachReservation";
import ComponentRenderer from "ComponentRenderer.js";
import AdminDashbord from "components/admin/AdminDahsbord";
import ProtectedRoute from "ProtectedRoute";

import { StyledEngineProvider } from '@mui/joy/styles';
import { useAuth } from "contexts/AuthContext";

export default function App() {
  const { token } = useAuth();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GlobalStyles />
        <StyledEngineProvider>
            <Router>
              <Routes>
                <Route path="/components/:type/:subtype/:name" element={<ComponentRenderer />} />
                <Route path="/components/:type/:name" element={<ComponentRenderer />} />
                <Route path="/" element={<Home />} />
                {!token && <Route path="/Login.js" element={<LoginPage />} />}
                {!token && <Route path="/Signup.js" element={<SignupPage />} />}
                <Route path="/TermsOfService.js" element={<TermsOfServicePage />} />
                <Route path="/PrivacyPolicy.js" element={<PrivacyPolicyPage />} />
                <Route path="/Beaches.js" element={<Beaches />} />
                <Route path="/Lifeguards.js" element={<LifeguardForm />} />
                {token && <Route path="/Admin.js" element={<AdminDashbord />} />}
                <Route path="/Praia/:id" element={<ProtectedRoute> <BeachReservation /> </ProtectedRoute>} />
              </Routes>
            </Router>
        </StyledEngineProvider>
      </LocalizationProvider>
    </>
  );
}