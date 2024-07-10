import type { SetStateAction } from 'react';
import React from 'react';
import { PiCookieDuotone } from 'react-icons/pi';
import Portal from './Portal';
import { PortalAction } from './PortalAction';

const CookieInfoClosed = (setOpen: React.Dispatch<SetStateAction<boolean>>): void => {
  localStorage.setItem('privacyPolicy', '1');
  setOpen(false);
};

interface ICookiePortal {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const CookiePortal: React.FC<ICookiePortal> = ({ open, setOpen }) => {
  return (
    <Portal className="bg-slate-100 " open={open} setOpen={setOpen} title="We use cookies">
      <div className="h-[100%] relative flex flex-col justify-evenly items-center align  px-2 md:px-10 lg:px-20">
        <PiCookieDuotone className="text-blue-400" size="150" />
        <p className="text-gray-700 text-base leading-7">
          We would like to inform you that our website uses cookies solely for account validation. Cookies are essential
          to ensure the security of your account and customize content according to your preferences. If you do not
          agree, leave this page, otherwise, click <span className="font-bold text-blue-400">&quot;Accept&quot;</span>{' '}
          to continue using our website.
        </p>
        <PortalAction cb={() => CookieInfoClosed(setOpen)}>Accept</PortalAction>
      </div>
    </Portal>
  );
};

export default CookiePortal;
