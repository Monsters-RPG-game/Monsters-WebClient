import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';
import { confirmDeleteAccount } from '../../communication';
import { logout } from '../../controllers';
import type { IDeleteAccountFormProps } from '../../types';

const DeleteAccountForm: React.FC<IDeleteAccountFormProps> = ({ exit }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      password: '',
    },
  });

  const submitHandler = (data: { password: string }): void => {
    confirmDeleteAccount(data)
      .then(() => logout())
      .catch((err) => {
        setError((err as Error).message);
      });
  };

  return (
    <div className="h-[100%]">
      <h3 className="text-white text-sm font-bold flex-1 flex flex-col gap-1">Confirm account removal</h3>
      <form action="" className="h-full flex flex-col justify-center gap-y-6" onSubmit={handleSubmit(submitHandler)}>
        <div className="relative w-full">
          <label className="text-gray-500 text-sm font-bold flex-1 flex flex-col gap-1">
            Password
            <input
              {...register('password', {
                minLength: {
                  value: 8,
                  message: 'Password is too short.',
                },
                required: {
                  value: true,
                  message: 'Password is required',
                },
              })}
              type={isPasswordVisible ? 'text' : 'password'}
              id="confirm"
              placeholder="password"
              className="w-full h-10 shad-textarea"
              onChange={() => setError(undefined)}
            />
          </label>
          {!isPasswordVisible ? (
            <MdVisibility
              color="#cbd5e1"
              className="absolute top-[25%] right-0 m-2 cursor-pointer w-5 h-auto"
              onClick={() => setIsPasswordVisible(true)}
            />
          ) : (
            <AiFillEyeInvisible
              color="#cbd5e1"
              className="absolute top-[25%] right-0 m-2 cursor-pointer w-5 h-auto"
              onClick={() => setIsPasswordVisible(false)}
            />
          )}
        </div>

        {error ? <span className="text-rose-600">{error}</span> : null}
        <button
          type="submit"
          className="text-slate-200 font-bold bg-green-900 py-2 px-2 rounded-lg cursor-pointer disabled:opacity-60"
          disabled={!isValid}
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={() => exit()}
          className="text-slate-200 font-bold bg-rose-950 py-2 px-2 rounded-lg"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default DeleteAccountForm;
