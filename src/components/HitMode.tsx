import React from 'react';
import Character from './Character';
import ClickOverlay from './ClickOverlay';
import RageBar from './RageBar';
import CurseText from './CurseText';  
import type { Item } from '../index.type';

type HitModeProps = {   
  characterImgs: string[];
  characterIdx: number;
  items: Item[];
  showCurse: boolean;
  handleRageClick: ({ x, y }: {
    x: number;
    y: number;
}) => Promise<void>
  reset: () => void;
  rage: number;
  role: string;
  displayText: string;
  isLoading: boolean;
}

const HitMode = ({ characterImgs, characterIdx, items, showCurse, handleRageClick, reset, rage, role, displayText, isLoading }: HitModeProps) => {
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 relative p-4">
    <h1 className="text-4xl font-bold mb-8">今天，又是哪位同事該死？</h1>
    <div className="flex items-center">
      <div className="relative">
        <Character characterImg={characterImgs[characterIdx]} items={items} />
        {!showCurse && (
          <ClickOverlay onClick={handleRageClick}>{null}</ClickOverlay>
        )}
        <div className="absolute top-0 -right-20">
          <RageBar value={rage} />
        </div>
      </div>
    </div>
    <div className="w-full flex flex-col items-center mt-4">
      <div className="text-2xl font-bold mt-2 text-gray-700">{role}</div>
      <CurseText>
        {isLoading ? '詛咒產生中...' : displayText}
      </CurseText>
    </div>
    {showCurse && (
      <button
        onClick={reset}
        className="text-grey-700 text-md mt-2 hover:text-red-800"
      >
        重來一次
      </button>
    )}
  </div>
  );
};

export default HitMode; 