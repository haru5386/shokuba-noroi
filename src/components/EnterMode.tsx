import React from 'react';
import Character from './Character';
type EnterModeProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onSelectCharacter: (direction: "left" | "right") => void;
  onSelectRole: (role: string, customRole: string) => void;
  characterImgs: string[];
  defaultRoles: string[];
  characterIdx: number;
  role: string;
  customRole: string;
};

const EnterMode = ({ onSubmit, onSelectCharacter, onSelectRole, characterImgs, defaultRoles, characterIdx, role, customRole }: EnterModeProps) => {
  

  return (
    <form
        className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4"
        onSubmit={onSubmit}
      >
        <h1 className="text-4xl font-bold mb-8">今天，又是哪位同事該死？</h1>
        <div className="flex items-center mb-4">
          <button
            type="button"
            onClick={() => onSelectCharacter("left")}
            className="text-3xl px-4"
          >
            ◀
          </button>
          <Character characterImg={characterImgs[characterIdx]} />
          <button
            type="button"
            onClick={() => onSelectCharacter("right")}
            className="text-3xl px-4"
          >
            ▶
          </button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {defaultRoles.map((r) => (
            <button
              type="button"
              key={r}
              className={`px-3 py-1 rounded border ${
                role === r
                  ? "bg-blue-200 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => onSelectRole(r, '')}
            >
              {r}
            </button>
          ))}
        </div>
        <input
          className="border rounded px-2 py-1 mb-4"
          placeholder="自行輸入..."
          value={customRole}
          maxLength={10}
          onChange={(e) => onSelectRole(e.target.value, e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-700 text-white text-2xl px-10 py-3 rounded-xl mt-2 hover:bg-red-800"
        >
          開始詛咒
        </button>
      </form>
  );
};

export default EnterMode; 