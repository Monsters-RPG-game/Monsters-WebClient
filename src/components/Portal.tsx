import { useState } from 'react';
import type { IPortalProps } from '../types/portal';
import * as dialogs from './ui/alert-dialog';

// const confirmDeleteAccountHandler = async (
//   value: boolean,
//   cb: () => Promise<void> | Promise<AxiosResponse>,
//   setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
//   setConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>,
// ): Promise<void> => {
//   try {
//     await cb();
//     setErrorMsg('');
//   } catch (error) {
//     console.log('Error', error);
//     setErrorMsg(`looks like ${(error as Error)?.message}`);

//     setTimeout(() => {
//       setErrorMsg('');
//     }, 4500);
//     return;
//   }
//   setConfirmDialog(value);
// };

const Portal: React.FC<IPortalProps> = ({ className, children, openButton, handleClose, isPortalOpen }) => {
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <dialogs.AlertDialog open={isPortalOpen}>
      <dialogs.AlertDialogTrigger>{openButton}</dialogs.AlertDialogTrigger>
      <dialogs.AlertDialogContent className={className}>
        <div className={confirmDialog ? 'h-[30%]' : 'h-[100%] relative '}>
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
            setConfirmDialog(false);
            setErrorMsg('');
          }}
        >
          &#x2716;
        </dialogs.AlertDialogCancel>
        {/* {!confirmDialog ? (
          <TerminalPortal
            triggerFn={triggerFn}
            handleClose={handleClose}
            setTodeleteAccountHandler={setTodeleteAccountHandler}
            confirmDeleteAccountHandler={confirmDeleteAccountHandler}
            confirmButtonLabel={confirmButtonLabel}
            cancelButtonLabel={cancelButtonLabel}
            deleteButtonLabel={deleteButtonLabel}
          />
        ) : (
          <DeleteAccountForm setErrorMsg={setErrorMsg} triggerFn={triggerFn} />
        )} */}
      </dialogs.AlertDialogContent>
    </dialogs.AlertDialog>
  );
};

export default Portal;
