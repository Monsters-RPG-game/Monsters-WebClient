import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useProfileStore } from '../../zustand/store';
import Navbar from '../../components/Navbar';

const InitializeProfileLayout: React.FC = () => {
  const profile = useProfileStore((state) => state.profile);
  console.log(profile?.initialized);

  if (profile?.initialized) {
    return <Navigate to="/terminal" />;
  }
  return (
    <div className="h-screen w-full">
      <Navbar />
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default InitializeProfileLayout;