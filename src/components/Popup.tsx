import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface IProps{
    children:boolean;
    setOrderPopup: (value: boolean) => void;
}

const Popup:React.FC = ({children,setOrderPopup}) => {

  return (
    <>

{  (
    <div className='popup'>

<div className='h-screen w-screen fixed top-[100px] left-0 bg-black/40 z-50 backdrop-blur-sm'>

<div className='fixed top-0 left-0   p-4 shadow-md bg-white dark:bg-gray-900 rouded-md duration-200 w-full h-full'>

    {/* Header section */}
    <div className='flex items-center justify-between' />
    {/* Form section */}
    <div className='mt-4 '>


    {children}



    </div>
</div>
</div>


    </div>
)}

    </>
  );
};

export default Popup;