import React from 'react';
import images from '../constants/images';

interface IProps{
    children:boolean;
    setOrderPopup: (value: boolean) => void;
}

const Popup:React.FC = ({children,setOrderPopup}) => {

    const BannerImg = {
        backgroundImage: `url(${images.CombatSceneImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
      };

  return (
    <>

{  (
    <div className='popup  ' >

<div  className='h-[100%]  w-screen fixed   left-0 bg-black/40 z-50 backdrop-blur-sm'>

<div style={BannerImg} className='fixed  top-0 left-0   p-4 shadow-md bg-white dark:bg-gray-900 rouded-md duration-200 w-full h-full'>

    {/* Header section */}
    <div className='flex items-center justify-between' />
    {/* Form section */}
    <div className=' h-full  '>


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