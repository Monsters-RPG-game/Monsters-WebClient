import React from 'react';
import { Link } from 'react-router-dom';
import images from '../constants/images';

const RaceFeatureContainer: React.FC = () => {
  return (
    <section className="w-full pt-10  px-10 xl:px-0 bg-gradient-to-b from-gray-300 to-gray-200 ">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-between pb-8 sm:pb-10 lg:pb-0 ">
        <div className="flex flex-col flex-1 ">
          <h2 className="text-slate-700 text-3xl font-bold font-heroSectionFont mb-14">Explore Races</h2>
          <span className="leading-relaxed text-lg text-slate-600 font-navbarFont">
            Embark on a Journey Through Diverse Races Delve into the rich tapestry of races awaiting you in our game!
            Each race brings forth its own set of distinctive traits, talents, and histories that will intricately weave
            into the fabric of your adventure. Uncover the secrets and strengths of each race as you prepare to embark
            on an unforgettable journey. Click below to unveil the mysteries and lore surrounding each race
          </span>
          <div className="flex justify-center mt-10">
            <Link to="/races">
              <button
                type="button"
                className="border px-2 py-2 border-slate-400 rounded
            font-semibold text-slate-500 hover:bg-gradient-to-tr from-slate-500 to-sky-700 hover:text-slate-100 transition-all "
              >
                Read more
              </button>
            </Link>
          </div>
        </div>
        <div className=" lg:flex flex-1 justify-center mx-auto lg:mx-left">
          <img src={images.RacesImage2} alt="Orc" className=" max-w-[150px] md:max-w-[300px] h-auto" />
        </div>
      </div>
    </section>
  );
};

export default RaceFeatureContainer;
