import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button";

const links = [
  ["HOME", "home"],
  ["SERVICES", "services"],
  ["ABOUT", "experience"],
  ["GALLERY", "gallery"],
  ["MEMBERSHIP", "membership"],
  ["CONTACT", "contact"]
];

export default function Navbar({ onBook }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the menu is open; close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const go = (id) => {
    const wasOpen = open;
    setOpen(false);
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    // The scroll-lock cleanup runs on the next commit — scrolling in the same
    // tick would be blocked while the menu is still open, so defer briefly.
    if (wasOpen) closeTimer.current = setTimeout(scroll, 90);
    else scroll();
  };

  return (
    <>
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <button className="brand" onClick={() => go("home")} aria-label="The Gentlemen's Room home">
          <span>THE GENTLEMEN'S</span>
          <strong>ROOM</strong>
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>

        <Button onClick={onBook} className="nav-cta">BOOK AN APPOINTMENT</Button>

        <button className="menu-trigger" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={23} />
        </button>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-top">
          <span>THE GENTLEMEN'S ROOM</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" tabIndex={open ? 0 : -1}><X size={25} /></button>
        </div>
        <div className="mobile-links">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)} tabIndex={open ? 0 : -1}>
              <span>{label}</span><span>↗</span>
            </button>
          ))}
        </div>
        <Button onClick={() => { setOpen(false); onBook(); }} className="mobile-book">BOOK AN APPOINTMENT</Button>
      </div>
    </>
  );
}
