import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNavItems=[
    {
      label:'Map',
      link:'/',
    },
    {
      label:'Profile',
      link:'/profile',
    },
    {
      label:'Inventory',
      link:'/inventory',
    },
  ];

  interface IMobilneNavbarProps{
    className:string;
  }
const MobileNavbar:React.FC<IMobilneNavbarProps> = ({className}) => {
const {pathname} = useLocation();

  return (
    <div className={`${className} flex `}>
    <ul className='flex w-full justify-between '>
    {MobileNavItems.map(({label,link},index)=>{
const isItemActive = pathname===link;
      return(
        <Link to={link} key={index}
        className={`w-full p-4 font-semibold text-sm text-center  text-gray-600 ${isItemActive&& 'bg-blue-100'}`}>
      <li>{label}</li></Link>
        );
    })}
    </ul>
          </div>
  );
};

export default MobileNavbar;