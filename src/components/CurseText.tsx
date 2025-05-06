import React from 'react';

const CurseText = ({ children }:{ children: React.ReactNode }) => (
  <div className="w-full max-w-xl mx-auto mt-6 p-4 border-2 border-black rounded-xl shadow text-lg text-center font-bold min-h-[60px] bg-red-700 text-white [&>span]:!text-yellow-400 [&>span]:!font-bold">
    {children}
  </div>
);

export default CurseText; 