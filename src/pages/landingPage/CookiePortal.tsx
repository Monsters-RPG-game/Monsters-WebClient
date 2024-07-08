import type { SetStateAction } from 'react';
import React from 'react';
import { PiCookieDuotone } from 'react-icons/pi';
import Portal from '../../components/Portal';
import * as dialogs from '../../components/ui/alert-dialog';

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
        <div className="flex flex-col-reverse gap-2 mt-3 md:flex-row h-[10%]">
          <div className="flex flex-col w-3/4 mx-auto md:flex-row md:justify-end ">
            <dialogs.AlertDialogAction
              className="absolute right-[5%] bottom-[0] bg-blue-600 hover:bg-blue-500"
              onClick={() => {
                localStorage.setItem('privacyPolicy', '1');
                setOpen(false);
              }}
            >
              Accept
            </dialogs.AlertDialogAction>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default CookiePortal;
