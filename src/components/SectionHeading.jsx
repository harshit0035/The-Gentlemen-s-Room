import React from "react";

export default function SectionHeading({ eyebrow, title, children, align = "", delay = 0 }) {
  return (
    <div className={`section-heading ${align}`} data-reveal style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
