import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import navbarLinks from '../../constants/navbarLinks';

interface IMobileNavProsp {
  isMobileMenuOpen: boolean;
  mobileMenuHandler: () => void;
}

const MobileNav: React.FC<IMobileNavProsp> = ({ isMobileMenuOpen, mobileMenuHandler }) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isMobileMenuOpen && (
        <div className="bg-gradient-to-tr z-100 from-slate-300 to-gray-100 h-screen absolute top-0 left-0 w-[70%] sm:w-[350px] ">
          <button type="button" aria-label="Save" className="mx-5 mt-5" onClick={mobileMenuHandler}>
            <IoClose className=" w-7 h-auto" />
          </button>
          <ul className="flex flex-col p-8 ">
            {navbarLinks.map(({ label, link }, index) => {
              if (link.startsWith('http')) {
                return (
                  <a rel="noreferrer" target="_blank" href={link} key={index} onClick={mobileMenuHandler}>
                    <li className="font-semibold font-heroSectionFont text-slate-600 py-5 text-2xl ">{label}</li>
                  </a>
                );
              }
              return (
                <Link onClick={mobileMenuHandler} to={link} key={index}>
                  <li className="font-semibold font-heroSectionFont text-slate-600 focus:border-2 py-5 text-2xl">
                    {label}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileNav;
