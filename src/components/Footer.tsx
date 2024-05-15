import React from 'react';
import { Link } from 'react-router-dom';
import footerItems from '../constants/footerItems';

const Footer: React.FC = () => {
  return (
    <nav className="w-full h-[100px]  bg-slate-800 boroder-t-2 px-9 xl:px-0 ">
      <section className="flex justify-between max-w-7xl mx-auto items-center h-full">
        <div className="text-slate-700 flex items-center">
          <h1 className="text-2xl font-semibold font-heroSectionFont text-slate-200 ">
            Monsters <span className="text-slate-500 text-2xl">.</span>
          </h1>
          <span className="text-slate-500 text-sm ">Monsters 2024</span>
          <Link to="/credits">
            <span className="text-slate-400 ml-5 ">Credits</span>
          </Link>
        </div>
        <div className="text-slate-200 ">
          <ul className="flex gap-14 font-semibold text-base">
            {footerItems.map(({ Link, Icon }, index) => {
              return (
                <a key={index} href={Link} target="_blank" rel="noreferrer" aria-label="Save">
                  <li>
                    <Icon className="w-5 h-auto text-slate-300 hover:text-slate-100" />
                  </li>
                </a>
              );
            })}
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default Footer;
