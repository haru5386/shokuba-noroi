import React, { useRef, useState } from "react";

const ClickOverlay = ({
  onClick,
  children,
}: {
  onClick: ({ x, y }: { x: number; y: number }) => void;
  children: React.ReactNode;
}) => {
  const overlayRef = useRef<HTMLButtonElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!overlayRef.current) return;
    const rect = overlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onClick && onClick({ x, y });
  };

  return (
    <button
      ref={overlayRef}
      type="button"
      className="absolute inset-0 cursor-pointer z-30 p-0 m-0 bg-transparent border-none"
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") handleClick(e as any);
      }}
      style={{
        cursor: isPressed
          ? "url(/punch-click.png), pointer"
          : "url(/punch-cursor.png), pointer",
      }}
    >
      {children}
    </button>
  );
};

export default ClickOverlay;
