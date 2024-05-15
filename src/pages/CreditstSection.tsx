import React from 'react';
import Footer from '../components/Footer';
import images from '../constants/images';

const CreditstSection: React.FC = () => {
  return (
    <section className="w-full ">
      <div className="max-w-7xl mx-auto py-20  px-14 xl:px-0 min-h-screen">
        <h2 className="text-3xl font-extrabold font-navbarFont text-slate-700 border-b pb-2">
          Usage Guidelines for Images
        </h2>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex-1 py-10 flex flex-col gap-10">
            <span className="text-base font-navbarFont leading-7">
              We would like to thank cleanpng.com for providing free PNG format images. All copyrights to the images
              used belong to their respective owners. Images from cleanpng.com may only be used for personal or
              non-commercial purposes. Commercial use may require additional consent or payment. Feel free to visit
              cleanpng.com to explore more images and learn more about the terms of use.
            </span>
          </div>
          <div className="hidden sm:block w-1/2">
            <img src={images.GuideLineImage} alt="" className="max-w-[450px] mx-auto lg:w-auto" />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default CreditstSection;
