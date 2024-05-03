import React from 'react';
import Footer from '../components/Footer';
import RaceCard from '../components/RaceCard';
import RacesList from '../../constants/racesList';

const Races: React.FC = () => {
  return (
    <section className="w-full ">
      <div className="max-w-7xl mx-auto py-16">
        <h2 className="text-3xl font-extrabold font-navbarFont text-slate-700 border-b border-slate-200 pb-2">
          Exploring Races
        </h2>
        {RacesList.map((characterRace, index) => {
          return <RaceCard key={index} characterRace={characterRace} index={index} />;
        })}
      </div>
      <Footer />
    </section>
  );
};

export default Races;
