import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAccountStore, useProfileStore } from '../zustand/store';

const RootLayout: React.FC = () => {
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);
  const { initialized } = useProfileStore((state) => state.profile);

  return (
    <div className=" h-screen w-full ">
      <Navbar />
      {isLoggedIn && initialized ? (
        <section>
          <Outlet />
        </section>
      ) : isLoggedIn && !initialized ? (
        <Navigate to="/profile-initialize" />
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default RootLayout;
