import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Register from '../pages/register/Register';
import Races from '../pages/Races';
import Login from '../pages/Login';
import Classes from '../pages/Classes';
import CreditstSection from '../pages/CreditstSection';
import TopNavbar from '../components/TopNavbar';
import { LandingPage } from '../pages';

const AuthLayout: React.FC = () => {
  return (
    <Router>
      <TopNavbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/races" element={<Races />} />
        <Route path="/login" element={<Login />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/credits" element={<CreditstSection />} />
      </Routes>
    </Router>
  );
};

export default AuthLayout;
