import './App.css';
import React, { useEffect, useState } from 'react';
import Cookies from './tools/cookies';
import { loginUser } from './controllers';
import { ETokenNames } from './enums';
import { AuthLayout, RootLayout } from './routers';
import { useAccountStore } from './zustand/store';
import Loader from './components/AuthLoader';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);

  useEffect(() => {
    const accessToken = new Cookies().getToken(ETokenNames.Access);

    if (accessToken) {
      loginUser()
        .then(() => setIsReady(true))
        .catch((err) => {
          setIsReady(true);
          console.log('Got err with preLogin', err);
        });
    } else {
      setIsReady(true);
    }
  }, []);

  return (
    <main className=" h-screen dark:bg-white ">
      {!isReady ? <Loader /> : !isLoggedIn ? <AuthLayout /> : <RootLayout />}
    </main>
  );
};

export default App;
