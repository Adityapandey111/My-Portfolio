import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#151030]">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-transparent border-t-[#915eff] rounded-full animate-spin" />
        <div className="w-20 h-20 border-4 border-transparent border-t-[#00cea8] rounded-full animate-spin absolute top-0 left-0" 
             style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-[#915eff] rounded-full pulse-glow" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
