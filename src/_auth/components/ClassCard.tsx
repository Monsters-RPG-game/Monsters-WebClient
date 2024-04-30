import React from 'react';

interface IClassCardProps {
  characterClass: {
    label: string;
    textContent: string;
    image: string;
  };
  index: number;
}

const ClassCard: React.FC<IClassCardProps> = ({ characterClass, index }) => {
  return (
    <div
      className={` mt-4 max-w-7xl mx-auto flex px-20  flex-col lg:flex-row justify-between pb-8 sm:pb-10 lg:pb-0 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className="flex flex-1 justify-center ">
        <img src={characterClass.image} alt="Orc" className="md:max-w-[450px] xl:max-w-[320px] h-auto" />
      </div>
      <div className="flex flex-col flex-1 justify-center ">
        <h2 className="text-slate-700 text-3xl font-bold font-heroSectionFont mb-10">{characterClass.label}</h2>
        <span className="leading-relaxed text-lg text-slate-600 font-navbarFont">{characterClass.textContent}</span>
      </div>
    </div>
  );
};

export default ClassCard;
