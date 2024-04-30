import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import images from '../../constants/images';
import { sendToLoginPage } from '../../communication';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-tr from-slate-900 to-gray-800 px-14 2xl:px-0  ">
      <div className="mx-auto max-w-7xl flex font-heroSectionFont ">
        <div className="flex-1 text-slate-100 flex flex-col gap-3 py-48 sm:items-center lg:items-start">
          <span className=" text-5xl md:text-7xl lg:text-6xl font-semibold ">Pick Your race </span>
          <span className="text-5xl md:text-7xl lg:text-6xl  font-semibold">Master your class</span>
          <span className=" text-5xl md:text-7xl lg:text-6xl  font-semibold">and conquer</span>
          <span className="text-xl md:text-2xl   mt-6 text-slate-300">Begin your journey now!</span>
          <div className="flex gap-x-10 mt-7">
            <button
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
            <button className="border py-3 px-3.5 rounded  ">Read more</button>
          </div>
        </div>
        <div className="flex-1 my-auto pt-2 hidden lg:block">
          <img src={images.HeroImage4} alt="hero image" className="w-auto h-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
