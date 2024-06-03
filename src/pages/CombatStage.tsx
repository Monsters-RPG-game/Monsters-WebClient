import React from 'react';
import images from '../constants/images';
import { attack, leaveFight } from '../communication';
import type * as types from "../types"

interface IProps{
    fightModalHandler:()=>void;
    combat:types.IFightEntity | undefined;
}

const CombatStage:React.FC<IProps> = ({fightModalHandler,combat}) => {
   const combatLogs = combat?.log?.logs;
   const enemy = combat?.states?.current?.enemy[0]?.character

   console.log(enemy)
  return (
    <div>
    <div className=' h-[calc(100vh-180px)] max-w-[1800px] mx-auto'>
    <div className='flex flex-col lg:flex-row-reverse h-full justify-between '>
    <div className='flex justify-start lg:flex-col-reverse  lg:h-fit'>
    <div className='flex flex-col'>
      <span className='mx-auto text-rose-700 font-semibold text-md'>Enemy</span>
    <img src={images.RacesImage2} className='w-[110px] sm:w-[155px] md:w-[140px] lg:h-[350px]  lg:w-auto xl:h-[365px] xl:w-auto' alt="" />
    </div>
    <div className='flex flex-col  flex-1 gap-[1px]'>
        <span className=' mx-auto bg-green-600 text-slate-50 font-semibold text-md px-8 rounded-md'>29/100 <span className='text-xs text-rose-300 '>HP</span></span>
        <span className='mx-auto bg-blue-600 text-slate-100 font-semibold text-md px-8 rounded-lg'> 90/100 <span className='text-xs text-blue-100'>MP</span></span>
      </div>
    </div>
    <div className='flex justify-between lg:flex-col-reverse   lg:h-fit lg:my-auto '>
      <div className='flex flex-col  flex-1 gap-[1px]'>
        <span className=' mx-auto bg-green-600 text-slate-50 font-semibold text-md px-8 rounded-md'>29/100 <span className='text-xs text-rose-300 '>HP</span></span>
        <span className='mx-auto bg-blue-600 text-slate-100 font-semibold text-md px-8 rounded-lg'> 90/100 <span className='text-xs text-blue-100'>MP</span></span>
      </div>
    <div className='flex flex-col'>
    <span className='mx-auto text-white font-semibold text-md'>Player</span>
    <img src={images.RacesImage2} className='w-[110px] sm:w-[155px] md:w-[140px] lg:h-[350px] lg:w-auto xl:h-[365px] xl:w-auto' alt="" />
    </div>
    </div>
    </div>
    </div>
    <div className='flex  flex-row-reverse lg:flex-row justify-between max-w-[1600px] mx-auto'>
    <button 
    onClick={()=>attack(enemy)}
    className='bg-emerald-700 rounded-lg font-semibold text-slate-50 p-2'>Attack</button>
    <button className='bg-emerald-700 rounded-lg font-semibold text-slate-50 p-2'>Attack</button>
    <button className='bg-emerald-700 rounded-lg font-semibold text-slate-50 p-2'>Attack</button>
    <button className='bg-emerald-700 rounded-lg font-semibold text-slate-50 p-2'>Attack</button>
    <button 
    onClick={fightModalHandler}
    className='bg-rose-700 text-sm text-white px-2 rounded-md font-semibold'>Leave Fight</button>
    </div>
    </div>
  );
};

export default CombatStage;