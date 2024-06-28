export type IDeleteAccountFormProps = {
  triggerFn: (...params: unknown[]) => Promise<void>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
};
