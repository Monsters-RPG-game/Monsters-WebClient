import type { ReactNode, SetStateAction } from 'react';

export type IPortalProps = {
  title: string;
  className: string;
  children: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  openButton?: ReactNode;
};
