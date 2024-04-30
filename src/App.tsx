import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from 'react';
import RootLayout from './_root/RootLayout';
import Home from './_root/pages/Home';
import AuthLayout from './_auth/AuthLayout';
import Register from './_auth/pages/register/Register';
import LandingPage from './_auth/pages/LandingPage';
import Cookies from './tools/cookies';
import { loginUser } from './controllers';
import RootLoader from './components/RootLoader';
import AuthLoader from './components/AuthLoader';
import { useAccountStore, useProfileStore } from './zustand/store';
import { ETokenNames } from './enums';
import type { IUser, IUserProfile } from './types';
import Races from './_auth/pages/Races';
import Classes from './_auth/pages/Classes';
import CreditstSection from './_auth/pages/CreditstSection';

const App: React.FC = () => {
  const [isRootRdy, setIsRootRdy] = useState(false);
  const [isAuthRdy, setIsAuthRdy] = useState(false);
  const account = useAccountStore((state) => state.account);
  const profile = useProfileStore((state) => state.profile);
  const addProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    const accessToken = new Cookies().getToken(ETokenNames.Access);

    if (accessToken) {
      loginUser().catch((err) => console.log('Got err with preLogin', err));
    }

    setTimeout(() => {
      setIsRootRdy(true);
      setIsAuthRdy(true);
    }, 800);
  }, []);

  return (
    <main className=" h-screen dark:bg-white ">
      <Router>
        <Routes>
          <Route element={isAuthRdy ? <AuthLayout /> : <AuthLoader />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/races" element={<Races />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/credits" element={<CreditstSection />} />
          </Route>

          <Route element={isRootRdy ? <RootLayout /> : <RootLoader />}>
            <Route
              path="/*"
              element={<Home account={account as IUser} profile={profile as IUserProfile} addProfile={addProfile} />}
            />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
