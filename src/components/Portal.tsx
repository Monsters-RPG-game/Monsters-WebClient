import { useState } from 'react';
import type { IPortalProps } from '../types/portal';
import * as dialogs from './ui/alert-dialog';

const Portal: React.FC<IPortalProps> = ({ className, children, openButton, handleClose, isPortalOpen }) => {
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <dialogs.AlertDialog open={isPortalOpen}>
      <dialogs.AlertDialogTrigger>{openButton}</dialogs.AlertDialogTrigger>
      <dialogs.AlertDialogContent className={className}>
        <div className="h-[30%]">
          {children}
          {errorMsg && (
            <div className=" absolute top-1/2  w-full flex flex-col items-center ">
              <span className="text-2xl text-slate-300  ">{errorMsg}</span>
              <span className="text-base text-slate-400 ">please try again later</span>
            </div>
          )}
        </div>
        <dialogs.AlertDialogCancel
          className=" absolute top-0 right-0 bg-transparent text-slate-400 my-2 border-none hover:bg-transparent hover:text-slate-300"
          onClick={() => {
            handleClose();
            setErrorMsg('');
          }}
        >
          &#x2716;
        </dialogs.AlertDialogCancel>
      </dialogs.AlertDialogContent>
    </dialogs.AlertDialog>
  );
};

export default Portal;
