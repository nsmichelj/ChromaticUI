import React from 'react';

export default function ColorSample({color, selected, onClick, children}: {color: string, selected?:boolean, onClick: () => void, children?: React.ReactNode}) {
  return (
    <div
      className={`${selected ? 'size-10' : 'size-8' } rounded-lg cursor-pointer transition-transform hover:scale-105`}
      style={{
        background: color || "#000000",
        outline: `${color || "#000000"} solid 2px`,
        outlineOffset: "2px",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
