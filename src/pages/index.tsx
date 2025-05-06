import React, { useState, useRef, useEffect } from "react";
import { Howl } from "howler";
import type { FC } from "react";
import type { Item } from "../index.type";
import EnterMode from "../components/EnterMode";
import HitMode from "../components/HitMode";
import Head from "next/head";

const characterImgs: string[] = Array.from(
  { length: 8 },
  (_, i) => `/assets/character-${i + 1}.png`
);
const itemImgs: string[] = Array.from(
  { length: 5 },
  (_, i) => `/assets/item-${i + 1}.png`
);
const defaultRoles = [
  "主管",
  "PM",
  "資深前端",
  "嘴砲王",
  "永遠在開會的同事",
  "只回 Slack 不看文件的人",
  "提案只會說「再優化」的人",
  "裝懂AI的人",
  "週五六點說「可以開個小會嗎」的人",
];


const Home: FC = () => {
  const [step, setStep] = useState<number>(1); // 1: 選角, 2: 發洩
  const [characterIdx, setCharacterIdx] = useState<number>(0);
  const [role, setRole] = useState<string>("主管");
  const [customRole, setCustomRole] = useState<string>("");
  const [rage, setRage] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const [showCurse, setShowCurse] = useState<boolean>(false);
  const [curseText, setCurseText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const punchSoundRef = useRef<Howl | null>(null);
  const bombSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      punchSoundRef.current = new Howl({ src: ["/sounds/punch.mp3"] });
      bombSoundRef.current = new Howl({ src: ["/sounds/bomb.mp3"] });
    }
  }, []);


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(2);
  };

  const onSelectCharacter = (direction: "right" | "left") => {
    if (direction === "right") {
      setCharacterIdx((characterIdx + 1) % 8);
    } else {
      setCharacterIdx((characterIdx + 7) % 8);
    }
  };

  const onSelectRole = (role: string, customRole: string = "") => {
    setRole(role);
    setCustomRole(customRole);
  };

  // 發洩模式
  const handleRageClick = async ({ x, y }: { x: number; y: number }) => {
    if (rage >= 30) return;
    punchSoundRef.current?.play();
    setRage(rage + 1);
    setItems([
      ...items,
      {
        src: itemImgs[Math.floor(Math.random() * itemImgs.length)],
        x: `${x - 60}px`,
        y: `${y - 60}px`,
      },
    ]);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/curse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role, rage: rage + 1 }),
        });
        const data = await response.json();
        setCurseText(data.curse);
      } catch (e) {
        console.error("Error fetching curse:", e);
        setCurseText(`詛咒失敗，請重試！`);
      } finally {
        setIsLoading(false);
        setShowCurse(true);
      }
      bombSoundRef.current?.play();
    }, 1500);
  };

  const reset = () => {
    setShowCurse(false);
    setRage(0);
    setItems([]);
    setStep(1);
    setCharacterIdx(0);
    setRole("主管");
    setCustomRole("");
  };

  const rageText =
    rage < 30 ? "快來瘋狂點擊人物發洩怒氣！" : "怒氣已爆表！準備接受制裁";

  const displayText = !showCurse ? rageText : curseText;

  return (
    <>
      <Head>
        <title>怒氣發洩同事詛咒機</title>
        <meta
          name="description"
          content="用幽默詛咒語錄發洩職場怒氣，支援 OpenAI 與 Redis 快取，體驗最紓壓的同事詛咒小遊戲！"
        />
        <meta property="og:title" content="怒氣發洩同事詛咒機" />
        <meta
          property="og:description"
          content="用幽默詛咒語錄發洩職場怒氣，支援 OpenAI 與 Redis 快取，體驗最紓壓的同事詛咒小遊戲！"
        />
        <meta property="og:type" content="website" />
      </Head>
      {step === 1 ? (
        <EnterMode
          onSubmit={onSubmit}
          onSelectCharacter={onSelectCharacter}
          onSelectRole={onSelectRole}
          characterImgs={characterImgs}
          defaultRoles={defaultRoles}
          characterIdx={characterIdx}
          role={role}
          customRole={customRole}
        />
      ) : (
        <HitMode
          characterImgs={characterImgs}
          characterIdx={characterIdx}
          items={items}
          showCurse={showCurse}
          handleRageClick={handleRageClick}
          reset={reset}
          rage={rage}
          role={role}
          displayText={displayText}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default Home;
