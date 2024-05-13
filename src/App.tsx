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
import Login from './_auth/pages/Login';
import ProfileInitializePage from './_root/pages/InitializeProfileLayout';
import SelectRacePage from './_root/pages/SelectRacePage';
import InitializeProfileLayout from './_root/pages/InitializeProfileLayout';

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
            <Route path="/login" element={<Login />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/credits" element={<CreditstSection />} />
          </Route>

          <Route element={isRootRdy ? <RootLayout /> : <RootLoader />}>
            <Route
            index
              path="/"
              element={<Home account={account as IUser} profile={profile as IUserProfile} addProfile={addProfile} />}
            />
              <Route
              path="/profile"
              element={<Home account={account as IUser} profile={profile as IUserProfile} addProfile={addProfile} />}
            />
               <Route
              path="/inventory"
              element={<Home account={account as IUser} profile={profile as IUserProfile} addProfile={addProfile} />}
            />
          </Route>
          <Route element={<InitializeProfileLayout />}>
            <Route path="profile-initialize" element={<SelectRacePage />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
