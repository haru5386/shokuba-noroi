import type { Item } from '../index.type';
import Image from 'next/image';

type CharacterProps ={ characterImg?: string, items?: Item[] }
const Character = ({ characterImg, items = [] }: CharacterProps) => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {characterImg && <Image src={characterImg} alt="角色頭像" width={256} height={256} className="w-full h-full object-contain z-10" />}
      {items.map((item, idx) => (
        <Image
          key={idx}
          src={item.src}
          alt="item"
          width={120}
          height={120}
          className="absolute z-20"
          style={{ left: item.x, top: item.y, width: 120, height: 120 }}
        />
      ))}
    </div>
  );
};

export default Character; 