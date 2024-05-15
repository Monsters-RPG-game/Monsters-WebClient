import type { ReactNode } from 'react';

export type IPortalProps = {
  children: ReactNode;
  openButton: ReactNode;
  confirmButtonLabel?: string;
  cancelButtonLabel: string;
  deleteButtonLabel?: string;
  isPortalOpen: boolean;
  className?: string;
  triggerFn: (cb: () => void) => void;
  handleClose: () => void;
  setTodeleteAccountHandler?: (cb: (() => void) | (() => Promise<void>)) => void | Promise<void>;
};
