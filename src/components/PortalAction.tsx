import React, { type ReactNode } from 'react';
import * as dialogs from './ui/alert-dialog';

interface IActionProps {
  cb: () => void;
  children: ReactNode;
}

export const PortalAction: React.FC<IActionProps> = ({ cb, children }) => {
  return (
    <dialogs.AlertDialogAction
      className="flex flex-col-reverse  gap-2 mt-3 md:flex-row  h-[10%] bg-blue-600 hover:bg-blue-500"
      onClick={() => {
        cb();
      }}
    >
      {children}
    </dialogs.AlertDialogAction>
  );
};
