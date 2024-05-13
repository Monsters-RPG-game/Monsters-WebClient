import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAccountStore } from '../zustand/store';
import TopNavbar from './components/TopNavbar';

const AuthLayout: React.FC = () => {
  const { isLoggedIn } = useAccountStore.getState();
  console.log('isLoggedIn');
  console.log(isLoggedIn);

  return (
    <div className=" h-full w-full mx-auto flex flex-col overflow-hidden bg-slate-100">
      <TopNavbar />
      {!isLoggedIn ? (
        <section className="flex-1 h-full overflow-y-scroll custom-scrollbar">
          <Outlet />
        </section>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default AuthLayout;
