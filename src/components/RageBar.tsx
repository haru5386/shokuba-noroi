import React, { useState, useEffect } from 'react';
import Player from 'lottie-react';
import fireAnimation from '../assets/fire.json';

const RageBar = ({ value, max = 30 }:{ value: number, max?: number }) => {
  const percent = Math.min(value / max, 1);

  const [showFire, setShowFire] = useState(false);

  useEffect(() => {
    if (value > 15) {
      // 先顯示 fire，再觸發 opacity 1
      setShowFire(true);
    } else {
      setShowFire(false);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center h-64 justify-center">
      <div
        className={`
          w-20 h-20 -mb-4
          transition-opacity duration-700
          ${showFire && value > 15 ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ pointerEvents: 'none' }}
      >
        <Player
          autoplay
          loop
          animationData={fireAnimation}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="w-6 h-full bg-white border-2 border-black rounded-full flex flex-col-reverse overflow-hidden">
        <div
          className="transition-all duration-200"
          style={{
            height: `${percent * 100}%`,
            background: percent === 1 ? '#dc2626' : 'linear-gradient(to top, #f87171, #fbbf24)',
          }}
        />
      </div>
    </div>
  );
};

export default RageBar; 