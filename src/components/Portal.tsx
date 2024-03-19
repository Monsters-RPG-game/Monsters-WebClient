import * as dialogs from './ui/alert-dialog';
import type { IPortalProps } from '../types/portal';

const Portal: React.FC<IPortalProps> = ({ children, openButton, handleClose, triggerFn, isPortalOpen, confirmButtonLabel, cancelButtonLabel }) => {


  return (
    <dialogs.AlertDialog open={isPortalOpen}  >
      <dialogs.AlertDialogTrigger>{openButton}</dialogs.AlertDialogTrigger>
      <dialogs.AlertDialogContent className="min-w-[270px]  bg-dark-2 border-dark-4 md:min-w-[700px] lg:min-w-[900px] h-[500px]  flex flex-col justify-between gap-8  ">
        <div className="h-[100%]">{children}</div>

        <div className="flex justify-end w-[100%] gap-2 mt-3">
          {cancelButtonLabel && <dialogs.AlertDialogCancel className="bg-transparent text-slate-400 border-none hover:bg-transparent hover:text-slate-300" onClick={handleClose}>
            {cancelButtonLabel}
          </dialogs.AlertDialogCancel>}
          <dialogs.AlertDialogAction className="bg-violet-800 hover:bg-violet-700" onClick={triggerFn}>
            {confirmButtonLabel}
          </dialogs.AlertDialogAction>
        </div>
      </dialogs.AlertDialogContent>
    </dialogs.AlertDialog>
  );
};

export default Portal;
