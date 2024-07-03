import type { SetStateAction } from 'react';
import React from 'react';
import { PiCookieDuotone } from 'react-icons/pi';
import Portal from '../../components/Portal';
import * as dialogs from '../../components/ui/alert-dialog';

interface ICookiePortal {
  isPrivacyPopupVisible: boolean;
  setIsPrivacyPopupVisible: React.Dispatch<SetStateAction<boolean>>;
}

const CookiePortal: React.FC<ICookiePortal> = ({ isPrivacyPopupVisible, setIsPrivacyPopupVisible }) => {
  return (
    <Portal
      handleClose={() => setIsPrivacyPopupVisible((prevState: boolean) => !prevState)}
      className="bg-slate-100 "
      isPortalOpen={isPrivacyPopupVisible}
    >
      <div className="h-[100%] relative">
        <div className="flex flex-col justify-evenly items-center h-[95%] px-2 md:px-10 lg:px-20">
          <PiCookieDuotone className="text-blue-400" size="130" />
          <h2 className="text-slate-600 font-heroSectionFont text-3xl font-bold tracking-tight">We use cookies</h2>
          <p className="text-gray-700 text-base leading-7">
            We would like to inform you that our website uses cookies solely for account validation. Cookies are
            essential to ensure the security of your account and customize content according to your preferences. If you
            do not agree, leave this page, otherwise, click{' '}
            <span className="font-bold text-blue-400">&quot;Accept&quot;</span> to continue using our website.
          </p>
          <div className="flex flex-col-reverse gap-2 mt-3 md:flex-row h-[10%]">
            <div className="flex flex-col w-3/4 mx-auto md:flex-row md:justify-end ">
              <dialogs.AlertDialogAction
                className="absolute right-[5%] bottom-[1%] bg-blue-600 hover:bg-blue-500"
                onClick={() => {
                  localStorage.setItem('privacyPolicy', '1');
                  setIsPrivacyPopupVisible(false);
                }}
              >
                Accept
              </dialogs.AlertDialogAction>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default CookiePortal;
