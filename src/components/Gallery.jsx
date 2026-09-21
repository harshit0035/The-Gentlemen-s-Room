import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Gallery({ images }) {
  const [index, setIndex] = useState(null);
  const lightboxRef = useRef(null);
  const list = images || [];

  const close = () => setIndex(null);
  const prev = () => setIndex(i => (i == null ? i : (i - 1 + list.length) % list.length));
  const next = () => setIndex(i => (i == null ? i : (i + 1) % list.length));

  // Lightbox: keyboard navigation, page scroll lock, initial focus.
  useEffect(() => {
    if (index === null || !list.length) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    lightboxRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, list.length]);

  if (!list.length) return null;

  return (
    <>
      <div className="gallery-grid">
        {list.map((src, i) => (
          <button className={`gallery-item gallery-${i + 1}`} key={src} data-reveal style={{ transitionDelay: `${i * 60}ms` }} onClick={() => setIndex(i)} aria-label={`Open gallery image ${i + 1}`}>
            <img src={src} alt="The Gentlemen's Room barbershop concept" loading="lazy" />
            <span>VIEW</span>
          </button>
        ))}
      </div>
      {index !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery lightbox" ref={lightboxRef} tabIndex={-1} onMouseDown={e => e.target === e.currentTarget && close()}>
          <button className="icon-btn lightbox-close" onClick={close} aria-label="Close gallery"><X /></button>
          <button className="lightbox-arrow left" onClick={prev} aria-label="Previous image"><ChevronLeft /></button>
          <img src={list[index]} alt="Gallery enlarged" />
          <button className="lightbox-arrow right" onClick={next} aria-label="Next image"><ChevronRight /></button>
          <div className="lightbox-count">{String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}</div>
        </div>
      )}
    </>
  );
}
