import React, { useRef, useState } from "react";

export default function Transformation() {
  const ref = useRef(null);
  const [value, setValue] = useState(50);

  const move = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    setValue((x / rect.width) * 100);
  };

  return (
    <div className="transform-wrap" ref={ref} onMouseMove={move}>
      <img className="transform-after" src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=85" alt="After grooming concept" />
      <div className="transform-before" style={{ width: `${value}%` }}>
        <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=85" alt="Before grooming concept" />
      </div>
      <div className="transform-line" style={{ left: `${value}%` }}><span>↔</span></div>
      <span className="transform-label before">BEFORE</span>
      <span className="transform-label after">AFTER</span>
      <input className="transform-range" type="range" min="0" max="100" value={value} onChange={e => setValue(Number(e.target.value))} aria-label="Before and after comparison" />
    </div>
  );
}
