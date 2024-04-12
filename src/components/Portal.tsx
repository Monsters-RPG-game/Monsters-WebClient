import React, { useState } from 'react';
import * as dialogs from './ui/alert-dialog';
import type { IPortalProps } from '../types/portal';

const Portal: React.FC<IPortalProps> = ({ className, children, openButton, handleClose, isPortalOpen, canExit }) => {
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <dialogs.AlertDialog open={isPortalOpen}>
      {openButton ? <dialogs.AlertDialogTrigger>{openButton}</dialogs.AlertDialogTrigger> : null}
      <dialogs.AlertDialogContent className={className}>
        {children}
        {errorMsg && (
          <div className="absolute top-1/2 w-full flex flex-col items-center">
            <span className="text-2xl text-slate-300 ">{errorMsg}</span>
            <span className="text-base text-slate-400">please try again later</span>
          </div>
        )}
        {canExit ? (
          <dialogs.AlertDialogCancel
            className="absolute top-0 right-0 bg-transparent text-slate-400 my-2 border-none hover:bg-transparent hover:text-slate-300"
            onClick={() => {
              handleClose();
              setErrorMsg('');
            }}
          >
            &#x2716;
          </dialogs.AlertDialogCancel>
        ) : null}
      </dialogs.AlertDialogContent>
    </dialogs.AlertDialog>
  );
};

export default Portal;
