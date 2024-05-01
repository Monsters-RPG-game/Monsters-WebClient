import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import navbarLinks from '../../constants/navbarLinks';
import MobileNav from './MobileNav';

const TopNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const mobileMenuHandler = (): void => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="w-full py-3 relative px-3 md:px-5 xl:px-0 ">
      <button onClick={mobileMenuHandler} className="lg:hidden mx-5" aria-label="Save" type="button">
        <GiHamburgerMenu />
      </button>
      <div className="hidden lg:flex max-w-7xl  justify-between mx-auto">
        <h1 className="text-2xl text-slate-900 font-navbarFont font-bold">
          <Link to="/">
            <span className="text-blue-900 font-extrabold">M</span>onsters
          </Link>
        </h1>
        <div className="flex items-center gap-10">
          <ul className="flex gap-10">
            {navbarLinks.map(({ label, link }, index) => {
              const isActive = pathname === link;

              if (link.startsWith('http')) {
                return (
                  <a rel="noreferrer" target="_blank" href={link} key={index}>
                    <li className="font-semibold font-navbarFont">{label}</li>
                  </a>
                );
              }
              return (
                <Link to={link} key={index}>
                  <li
                    className={`relative font-semibold font-navbarFont ${isActive && 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.75px] after:bg-gray-400 after:shadow-xs'}`}
                  >
                    {label}
                  </li>
                </Link>
              );
            })}
          </ul>
          <Link to="/register">
            <button
              type="button"
              className="border py-1 px-4 rounded border-slate-400 hover:bg-slate-800 hover:text-slate-100"
            >
              Join
            </button>
          </Link>
        </div>
      </div>

      <MobileNav isMobileMenuOpen={isMobileMenuOpen} mobileMenuHandler={mobileMenuHandler} />
    </nav>
  );
};

export default TopNavbar;
