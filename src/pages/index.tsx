import React, { useState, useRef } from 'react';
import Character from '../components/Character';
import RageBar from '../components/RageBar';
import CurseText from '../components/CurseText';
import ClickOverlay from '../components/ClickOverlay';
import { Howl } from 'howler';
import type { FC } from 'react';
import type { Item } from '../index.type';

const characterImgs: string[] = Array.from({ length: 8 }, (_, i) => `/assets/character-${i + 1}.png`);
const itemImgs: string[] = Array.from({ length: 5 }, (_, i) => `/assets/item-${i + 1}.png`);
const defaultRoles = [
  '主管', 'PM', '資深前端', '嘴砲王',
  '永遠在開會的同事', '只回 Slack 不看文件的人',
  '提案只會說「再優化」的人', '裝懂AI的人',
  '週五六點說「可以開個小會嗎」的人',
];

const punchSound = new Howl({ src: ['/sounds/punch.mp3'] });
const bombSound = new Howl({ src: ['/sounds/bomb.mp3'] });

const Home: FC = () => {
  const [step, setStep] = useState<number>(1); // 1: 選角, 2: 發洩
  const [characterIdx, setCharacterIdx] = useState<number>(0);
  const [role, setRole] = useState<string>('主管');
  const [customRole, setCustomRole] = useState<string>('');
  const [rage, setRage] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const [showCurse, setShowCurse] = useState<boolean>(false);
  const [curseText, setCurseText] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  console.log('curseText',curseText)
  // 選角畫面
  if (step === 1) {
    return (
      <form
        className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4"
        onSubmit={e => {
          e.preventDefault();
          setStep(2);
        }}
      >
        <h1 className="text-4xl font-bold mb-8">今天，又是哪位同事該死？</h1>
        <div className="flex items-center mb-4">
          <button type="button" onClick={() => setCharacterIdx((characterIdx + 7) % 8)} className="text-3xl px-4">◀</button>
          <Character characterImg={characterImgs[characterIdx]} />
          <button type="button" onClick={() => setCharacterIdx((characterIdx + 1) % 8)} className="text-3xl px-4">▶</button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {defaultRoles.map((r) => (
            <button
              type="button"
              key={r}
              className={`px-3 py-1 rounded border ${role === r ? 'bg-blue-200 border-blue-500' : 'bg-white border-gray-300'}`}
              onClick={() => { setRole(r); setCustomRole(''); }}
            >{r}</button>
          ))}
        </div>
        <input
          className="border rounded px-2 py-1 mb-4"
          placeholder="自行輸入..."
          value={customRole}
          maxLength={10}
          onChange={e => { setCustomRole(e.target.value); setRole(e.target.value); }}
        />
        <button
          type="submit"
          className="bg-red-700 text-white text-2xl px-10 py-3 rounded-xl mt-2 hover:bg-red-800"
        >開始詛咒</button>
      </form>
    );
  }

  // 發洩模式
  const handleRageClick = async ({ x, y }: { x: number; y: number }) => {
    if (rage >= 30) return;
    punchSound.play();
    setRage(rage + 1);
    setItems([...items, {
      src: itemImgs[Math.floor(Math.random() * itemImgs.length)],
      x: `${x - 60}px`,
      y: `${y - 60}px`,
    }]);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setShowCurse(true);
      try {
        const response = await fetch('/api/curse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role, rage: rage + 1 }),
        });
        const data = await response.json();
        setCurseText(data.curse.replace('{職位}', role));
      } catch (e) {
        console.error('Error fetching curse:', e);
        setCurseText(`詛咒失敗，請重試！`);
      }
      bombSound.play();
    }, 1500);
  };

  const reset = () => {
    setShowCurse(false);
    setRage(0);
    setItems([]);
    setStep(1);
    setCharacterIdx(0);
    setRole('主管');
    setCustomRole('');
  };

  const rageText = rage < 30 ? '快來瘋狂點擊人物發洩怒氣！' : '怒氣已爆表！準備接受制裁';

  const displayText = !showCurse
    ? rageText
    : curseText;

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
          {!showCurse
            ? displayText
            : <span dangerouslySetInnerHTML={{ __html: curseText }} />}
        </CurseText>
      </div>
      {showCurse && <button onClick={reset} className="text-grey-700 text-md mt-2 hover:text-red-800">重來一次</button>}
    </div>
  );
};

export default Home; 