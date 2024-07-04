import type { ReactNode } from 'react';

export type IPortalProps = {
  children: ReactNode;
  openButton: ReactNode;
  isPortalOpen: boolean;
  className: string;
  handleClose: () => void;
  // setTodeleteAccountHandler?: (cb: (() => void) | (() => Promise<void>)) => void | Promise<void>;
  // triggerFn: (...params: unknown[]) => Promise<void>;
  // confirmButtonLabel: string;
  // cancelButtonLabel: string;
  // deleteButtonLabel: string;
};
