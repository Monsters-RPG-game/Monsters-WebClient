import type { ReactNode } from 'react';

export type IPortalProps = {
  canExit?: boolean;
  children: ReactNode;
  className?: string;
  handleClose: () => void;
  isPortalOpen: boolean;
  openButton?: ReactNode;
};
