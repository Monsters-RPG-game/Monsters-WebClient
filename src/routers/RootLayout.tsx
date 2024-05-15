import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home';
import { useAccountStore, useProfileStore } from '../zustand/store';
import type { IUser } from '../types';
import Navbar from '../components/Navbar';
import MobileNavbar from '../components/MobileNavbar';
import SelectRacePage from '../pages/SelectRacePage';

const RootLayout: React.FC = () => {
  const account = useAccountStore((state) => state.account);
  const profile = useProfileStore((state) => state.profile);
  const addProfile = useProfileStore((state) => state.setProfile);

  return (
    <div className=" h-screen flex flex-col w-full ">
      {profile?.initialized ? (
        <section className="flex-1">
          <Router>
            <Navbar />
            <MobileNavbar className="flex lg:hidden" />
            <Routes>
              <Route
                index
                path="/"
                element={<Home account={account as IUser} profile={profile} addProfile={addProfile} />}
              />
            </Routes>
          </Router>
        </section>
      ) : <SelectRacePage />}
    </div>
  );
};

export default RootLayout;
