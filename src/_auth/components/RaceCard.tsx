import React from 'react';

interface IRaceCardProps {
  characterRace: {
    label: string;
    textContent: string;
    image: string;
  };
  index: number;
}

const RaceCard: React.FC<IRaceCardProps> = ({ characterRace, index }) => {
  return (
    <div
      className={` mt-16 max-w-7xl mx-auto flex px-6 sm:px-10 bg-gradient-to-r py-4 rounded-xl  from-gray-100 via-gray-200 to-gray-300 flex-col lg:flex-row justify-between pb-8 sm:pb-10 lg:pb-0 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className="flex flex-1 justify-center ">
        <img
          src={characterRace.image}
          alt={characterRace.label}
          className="max-w-[180px] max-h-auto md:max-w-[400px] xl:max-w-[320px] h-auto"
        />
      </div>
      <div className="flex flex-col flex-1 justify-center ">
        <h2 className="text-slate-700 text-3xl font-bold font-heroSectionFont ">{characterRace.label}</h2>
        <span className="leading-relaxed text-lg text-slate-600 font-navbarFont py-2 mt-2">
          {characterRace.textContent}
        </span>
      </div>
    </div>
  );
};

export default RaceCard;
