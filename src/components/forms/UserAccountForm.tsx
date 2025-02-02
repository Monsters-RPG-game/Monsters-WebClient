import React from 'react';
import { IoSettings } from 'react-icons/io5';
import type { EUserRace } from '../../enums';

const UserAccountForm: React.FC<{ userData: { login: string; race: EUserRace; lvl: number } }> = ({
  userData: { login, race, lvl },
}) => {
  console.log(login);
  console.log(race);
  console.log(lvl);

  return (
    <form className="h-[100%]">
      <h1 className="text-slate-200 text-2xl mb-10 flex items-center gap-x-2 ">
        <IoSettings />
        Account Settings
      </h1>
      <div className="flex flex-col mx-auto w-[60%]" />

      <div className="text-slate-300" />
    </form>
  );
};

export default UserAccountForm;
