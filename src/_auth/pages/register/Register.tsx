import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import type { IRegisterFormValues } from '../../../types';
import { createAccount } from '../../../communication';
import Footer from '../../components/Footer';

const Register: React.FC = () => {
  const [err, setErr] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    defaultValues: {
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation(createAccount, {
    onError: (error: Error) => setErr(error.message),
    onSuccess: () => {
      reset();
      setSuccessMessage('Your account has been created');
    },
  });

  const onSubmit = handleSubmit((data) => {
    const { login, email, password } = data;
    mutation.mutate({ login, email, password });
  });

  const validatePassword = (val: string): boolean => {
    if (val.length < 8) return false;

    const hasDigit = /\d/.test(val);
    const hasLowerCase = /[a-z]/.test(val);
    const hasUpperCase = /[A-Z]/.test(val);
    const hasLetter = /[a-zA-Z]/.test(val);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val);

    return hasDigit && hasLowerCase && hasUpperCase && hasLetter && hasSpecialChar;
  };

  return (
    <div
      className="flex bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 flex-col justify-center items-center min-h-[100%] flex-1 pb-5"
      onClick={() => setErr(undefined)}
    >
      <Link to="/">
        <h2 className="text-7xl text-slate-700 md:text-8xl font-bold mb-10 font-navbarFotn ">
          <span className="text-blue-900">M</span>onsters
        </h2>
      </Link>
      <h3 className="text-gray-600 text-3xl font-bold">Create a new account</h3>
      <p className="text-gray-500 text-sm text-center mt-2">please enter your details</p>

      <form className="flex   flex-col  gap-5 mt-8" onSubmit={onSubmit}>
        <div className="flex flex-col md:flex-row gap-5 px-4  ">
          <label className="text-gray-500 text-sm font-bold flex-1 flex flex-col gap-1 min-w-[280px] md:min-w-[420px] lg:min-w-[390px] ">
            User Name
            <input
              placeholder="user name"
              type="text"
              className=" border rounded w-full py-3 px-2 font-normal bg-slate-300 outline-none border-none focus:ring focus:ring-blue-300 text-gray-700 placeholder:text-xs"
              {...register('login', {
                required: 'this field is required',
                minLength: { value: 3, message: 'Login should have at least 3 characters' },
                maxLength: { value: 30, message: 'Login should have at most 30 characters' },
              })}
            />
            {errors.login && <span className="text-rose-600  text-xs mt-1 px-2 md:px-0">{errors.login.message}</span>}
          </label>
        </div>
        <div className="flex flex-col  gap-5 px-4 ">
          <label className="text-gray-500 text-sm font-bold flex-1 flex flex-col gap-1 ">
            Email
            <input
              placeholder="email"
              type="email"
              className="border rounded w-full py-3 px-2 font-normal bg-slate-300 outline-none border-none focus:ring focus:ring-blue-300 text-gray-700 placeholder:text-xs"
              {...register('email', { required: 'this field is required' })}
            />
            {errors.email && <span className="text-rose-600  text-xs mt-1 px-2 md:px-0">{errors.email.message}</span>}
          </label>
          <label className="text-gray-500 text-sm font-bold flex-1 flex flex-col gap-1 ">
            Password
            <input
              placeholder="password"
              type="password"
              className="border rounded w-full py-3 px-2 font-normal bg-slate-300 outline-none border-none focus:ring focus:ring-blue-300 text-gray-700 placeholder:text-xs"
              {...register('password', {
                validate: (val) =>
                  validatePassword(val) ||
                  'Password should contain at least 8 characters with at least 1 digit, 1 letter, 1 upper case letter, 1 lower case letter, and 1 special character',
              })}
            />
            {errors.password && (
              <span className="text-rose-600  text-xs mt-1 px-2 md:px-0 max-w-[280px] md:max-w[400px] lg:max-w-[390px]  mx-auto  ">
                {errors.password.message}
              </span>
            )}
          </label>
          <label className="text-gray-500 text-sm font-bold flex-1 flex flex-col gap-1 ">
            Confirm Password
            <input
              placeholder="confirm password"
              type="password"
              className="border rounded w-full py-3 px-2 font-normal bg-slate-300 outline-none border-none focus:ring focus:ring-blue-300 text-gray-700 placeholder:text-xs"
              {...register('confirmPassword', {
                validate: (value) => {
                  const password = watch('password');
                  if (value !== password) {
                    return 'Passwords do not match';
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-rose-600  text-xs mt-1 px-2 md:px-0 max-w-[280px] md:max-w[400px] lg:max-w-[390px]  mx-auto  ">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
          {err && <span className=" text-rose-600 text-center"> {err}</span>}
        </div>
        {successMessage && (
          <span className="text-violet-800 font-semibold text-base text-center ">{successMessage}</span>
        )}
        <span className="text-slate-400 mx-auto text-base mt-3 mb-1">
          Already have an account?
          <Link to="/" className="ml-1 text-blue-700 font-semibold">
            Login
          </Link>
        </span>
        <span className="">
          <button
            disabled={mutation.isLoading}
            type="submit"
            className="bg-blue-500 rounded-md text-white min-w-full p-2 font-bold hover:bg-blue-400 text-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </span>
      </form>
    </div>
  );
};

export default Register;
