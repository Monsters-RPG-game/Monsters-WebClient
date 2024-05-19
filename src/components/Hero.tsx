import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import images from '../constants/images';
import { sendToLoginPage } from '../communication';

const Hero: React.FC = () => {
  return (
    <section className=" bg-gradient-to-tr from-slate-900 to-gray-800 px-14 2xl:px-0 max-w-[97%] rounded-2xl  mx-auto overflow-hidden relative  " style={{
      backgroundImage: `url(${images.HeroBackground})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <div className="w-full h-full absolute md:rounded-3xl left-0 top-0  opacity-75 z-10 pointer-events-none"></div>  
      <div className="mx-auto max-w-7xl flex font-heroSectionFont  ">
        <div className="flex-1 text-slate-100 flex flex-col gap-3 py-48 sm:items-center lg:items-start">
          <span className=" text-5xl md:text-7xl lg:text-6xl font-semibold ">Pick Your race </span>
          <span className="text-5xl md:text-7xl lg:text-6xl  font-semibold">Master your class</span>
          <span className=" text-5xl md:text-7xl lg:text-6xl  font-semibold">and conquer</span>
          <span className="text-xl md:text-2xl   mt-6 text-slate-300">Begin your journey now!</span>
          <div className="flex gap-x-10 mt-7">
            <button
              type="button"
              className="border py-3 px-3.5 rounded font-semibold flex items-center gap-1 hover:bg-slate-100 hover:text-slate-800  "
              onClick={(e) => {
                e.preventDefault();
                sendToLoginPage().catch((err) => {
                  console.log("Couldn't send to login page", err);
                });
              }}
            >
              Play now <FaArrowRight />
            </button>
            <button type="button" className="border py-3 px-3.5 rounded  ">
              Read more
            </button>
          </div>
          <div className=" flex  md:w-1/2 sm:justify-center lg:justify-start">
            <span className="text-gray-300 text-sm font-semi-bold py-1">Work in progress</span>
          </div>
        </div>
        <div className="flex-1 my-auto pt-2 hidden lg:block">
          <img src={images.HeroImage4} alt="hero img" className="w-auto h-auto mb-[-260px]"  />
        </div>
      </div>
    </section>
  );
};

export default Hero;
