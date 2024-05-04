import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import RacesList from '../../constants/racesList';
import { initProfile } from '../../communication';

const SelectRacePage: React.FC = () => {
  const [selectedRaceIndex, setSelectedRaceIndex] = useState<number>(0);

  const changeRaceHandler = (): void => {
    setSelectedRaceIndex((index) => {
      if (index === RacesList.length - 1) {
        return 0;
      }
      return index + 1;
    });
  };

  const { mutate } = useMutation({
    mutationFn: ({ race }) => {
      return initProfile(race);
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {},
  });

  const confirmRaceHandler = ({ race }) => {
    mutate({ race });
  };

  return (
    <div className="w-full  max-w-7xl mx-auto  py-14 flex flex-col items-center">
      <h1 className="text-center text-2xl  text-gray-500 font-navbarFont font-semibold">Select your race</h1>
      <div className=" pt-32 pb-10  md:pt-14  flex w-[94%] sm:w-[75%] md:w-[70%] justify-between">
        <button aria-label="Save" type="button" onClick={changeRaceHandler}>
          <IoIosArrowBack className="w-10 h-auto hover:scale-110 transition-all" />
        </button>
        <img
          src={RacesList[selectedRaceIndex].image}
          alt=""
          className=" max-w-auto max-h-[290px] sm:max-h-[400px] md:max-h-[520px]"
        />
        <button aria-label="Save" type="button" onClick={changeRaceHandler}>
          <IoIosArrowForward className="w-10 h-auto hover:scale-110 transition-all" />
        </button>
      </div>
      <span className="text-3xl text-slate-600 font-bold"> {RacesList[selectedRaceIndex].label}</span>
      <button
        type="button"
        onClick={() => confirmRaceHandler({ race: RacesList[selectedRaceIndex].label.toLocaleLowerCase() })}
        className="bg-blue-500 font-semibold text-white py-4 px-16 rounded my-20 sm:my-8"
      >
        Confirm
      </button>
    </div>
  );
};

export default SelectRacePage;
