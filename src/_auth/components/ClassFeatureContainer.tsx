import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../constants/images';

const ClassFeatureContainer: React.FC = () => {
  return (
    <section className="w-full px-10 xl:px-0 ">
      <img src={images.Layer} alt="" className="w-auto h-auto hidden xl:block" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between ">
        <div className="flex flex-1 justify-center ">
          <img src={images.ClassesImage} alt="Orc" className="max-w-[150px] md:max-w-[300px] h-auto" />
        </div>
        <div className="flex flex-col flex-1 justify-center ">
          <div className="mb-14">
            <h2 className="text-slate-700 text-3xl font-bold font-heroSectionFont ">
              Master Your Path: Choose Your Class
            </h2>
            <span className="text-base text-slate-500">Coming soon</span>
          </div>

          <span className="leading-relaxed text-lg text-slate-600 font-navbarFont">
            Embark on your journey by choosing one of the four distinct classes available. Each class offers its own
            unique set of skills, abilities, and playstyles, promising a diverse and engaging experience. Whether you
            favor stealth and cunning, the arcane arts, brute strength, or a connection to nature, your class choice
            will define your adventure. Click below to learn more about each class
          </span>
          <div className="flex justify-center mt-10">
            <Link to="/classes">
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
      </div>
    </section>
  );
};

export default ClassFeatureContainer;
