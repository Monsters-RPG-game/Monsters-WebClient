import React from 'react';
import FeatureCard from './FeatureCard';
import gameFeatures from '../../constants/gameFeatures';

const FeaturesContainer: React.FC = () => {
  return (
    <section className="w-full py-8 px-10 xl:px-0 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl mt-8 font-heroSectionFont text-slate-700 font-semibold">What We Bring</h2>
        <div className="flex gap-5 w-full py-6 flex flex-wrap ">
          {gameFeatures.map((feature, index) => {
            return (
              <FeatureCard
                key={index}
                feature={feature}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(25.33%-21px)]  "
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesContainer;
