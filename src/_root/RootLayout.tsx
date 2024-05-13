import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAccountStore, useProfileStore } from '../zustand/store';
import MobileNav from '../_auth/components/MobileNav';
import MobileNavbar from '../components/MobileNavbar';

const RootLayout: React.FC = () => {
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);
  const { initialized } = useProfileStore((state) => state.profile);




  return (
    <div className=" h-screen flex flex-col w-full ">
      <Navbar />
      {isLoggedIn && initialized ? (
        <section className="  flex-1">
          <Outlet />
        </section>
      ) : isLoggedIn && !initialized ? (
        <Navigate to="/profile-initialize" />
      ) : (
        <Navigate to="/" />
      )}
<MobileNavbar className="flex lg:hidden"/>
    </div>
  );
};

export default RootLayout;
