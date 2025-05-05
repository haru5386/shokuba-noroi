import type { Item } from '../index.type';

type CharacterProps ={ characterImg?: string, items?: Item[] }
const Character = ({ characterImg, items = [] }: CharacterProps) => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <img src={characterImg} alt="角色頭像" className="w-full h-full object-contain z-10" />
      {items.map((item, idx) => (
        <img
          key={idx}
          src={item.src}
          alt="item"
          className="absolute z-20"
          style={{ left: item.x, top: item.y, width: 120, height: 120 }}
        />
      ))}
    </div>
  );
};

export default Character; 