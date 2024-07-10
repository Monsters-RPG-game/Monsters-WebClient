import React, { useEffect, useState } from 'react';
import ClassFeatureContainer from '../components/ClassFeatureContainer';
import CookiePortal from '../components/CookiePortal';
import FeaturesContainer from '../components/FeaturesContainer';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import RaceFeatureContainer from '../components/RaceFeatureContainer';

const LandingPage: React.FC = () => {
  const [isPrivacyPopupVisible, setIsPrivacyPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    console.log('Landing page');
    const privacyPolicy = localStorage.getItem('privacyPolicy');

    if (!privacyPolicy) {
      setIsPrivacyPopupVisible(true);
    }
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <FeaturesContainer />
      <RaceFeatureContainer />
      <ClassFeatureContainer />
      <Footer />
      {isPrivacyPopupVisible && <CookiePortal open={isPrivacyPopupVisible} setOpen={setIsPrivacyPopupVisible} />}
    </div>
  );
};

export default LandingPage;
