import type { IPortalProps } from '../types/portal';
import * as dialogs from './ui/alert-dialog';

const Portal: React.FC<IPortalProps> = ({ title, className, children, open, setOpen, openButton }) => {
  return (
    <dialogs.AlertDialog open={open} onOpenChange={setOpen}>
      {openButton && <dialogs.AlertDialogTrigger>{openButton}</dialogs.AlertDialogTrigger>}
      <dialogs.AlertDialogContent className={className}>
        <div className=" relative flex flex-col justify-evenly items-center align  px-2 md:px-10 lg:px-20">
          <dialogs.AlertDialogTitle>
            <div className="text-slate-600 font-heroSectionFont text-3xl font-bold tracking-tight">{title}</div>
          </dialogs.AlertDialogTitle>
          <dialogs.AlertDialogDescription>{children}</dialogs.AlertDialogDescription>
        </div>
        <dialogs.AlertDialogCancel
          className=" absolute top-0 right-0 bg-transparent text-slate-400 my-2 border-none hover:bg-transparent hover:text-slate-300"
          onClick={() => {
            setOpen(false);
          }}
        >
          &#x2716;
        </dialogs.AlertDialogCancel>
      </dialogs.AlertDialogContent>
    </dialogs.AlertDialog>
  );
};

export default Portal;
