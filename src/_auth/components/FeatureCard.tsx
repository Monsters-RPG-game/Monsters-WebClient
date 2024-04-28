import React from 'react';

const FeatureCard: React.FC = ({ className, feature }) => {
  return (
    <div className={`cursor-pointer  rounded-lg py-10 flex flex-col items-center gap-6 hover:shadow-md ${className}`}>
      <feature.icon className="w-9 h-auto text-slate-700" />
      <h2 className="text-lg font-bold font-navbarFont text-slate-600">{feature.label}</h2>
      <span className="text-center px-4">{feature.textContent}</span>
    </div>
  );
};

export default FeatureCard;
