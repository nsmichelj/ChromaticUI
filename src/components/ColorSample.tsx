import React from 'react'

export default function ColorSample({color, onClick, children}: {color: string, onClick: () => void, children?: React.ReactNode}) {
  return (
    <div
      className="size-8 rounded-lg cursor-pointer transition-transform hover:scale-105"
      style={{
        background: color,
        outline: `${color} solid 2px`,
        outlineOffset: "2px",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
