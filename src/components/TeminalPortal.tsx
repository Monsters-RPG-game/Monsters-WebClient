// import type { AxiosResponse } from 'axios';
// import * as dialogs from './ui/alert-dialog';
// import { setTodeleteAccount } from '../communication';

// interface ITerminalPortalProps {
//   triggerFn: (...params: unknown[]) => Promise<void>;
//   handleClose: () => void;
//   setTodeleteAccountHandler: (cb: (() => void) | (() => Promise<void>)) => void | Promise<void>;
//   confirmDeleteAccountHandler: (
//     value: boolean,
//     cb: () => Promise<void> | Promise<AxiosResponse>,
//     setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
//     setConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>,
//   ) => Promise<void>;
//   setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
//   setConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>;
//   confirmButtonLabel: string;
//   cancelButtonLabel: string;
//   deleteButtonLabel: string;
// }

// const TerminalPortal: React.FC<ITerminalPortalProps> = ({
//   triggerFn,
//   handleClose,
//   setTodeleteAccountHandler,
//   confirmDeleteAccountHandler,
//   setErrorMsg,
//   setConfirmDialog,
//   confirmButtonLabel,
//   cancelButtonLabel,
//   deleteButtonLabel,
// }) => {
//   return (
//     <div className="flex  flex-col-reverse  gap-2 mt-3 md:flex-row">
//       <div className="flex flex-col w-3/4 mx-auto md:flex-row md:justify-start md:px-6">
//         {deleteButtonLabel && (
//           <dialogs.AlertDialogAction
//             className=" bg-rose-800 hover:bg-rose-700 my-2"
//             onClick={
//               setTodeleteAccountHandler
//                 ? (): void | Promise<void> =>
//                     setTodeleteAccountHandler(async () =>
//                       confirmDeleteAccountHandler(true, setTodeleteAccount, setErrorMsg, setConfirmDialog),
//                     )
//                 : (): void => {}
//             }
//           >
//             {deleteButtonLabel}
//           </dialogs.AlertDialogAction>
//         )}
//       </div>
//       <div className="flex flex-col w-3/4 mx-auto md:flex-row md:justify-end ">
//         {cancelButtonLabel && (
//           <dialogs.AlertDialogCancel
//             className="bg-transparent  text-slate-400 my-2 border-none hover:bg-transparent hover:text-slate-300"
//             onClick={handleClose}
//           >
//             {cancelButtonLabel}
//           </dialogs.AlertDialogCancel>
//         )}
//         {confirmButtonLabel && (
//           <dialogs.AlertDialogAction className="bg-violet-800 hover:bg-violet-700" onClick={triggerFn}>
//             {confirmButtonLabel}
//           </dialogs.AlertDialogAction>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TerminalPortal;
