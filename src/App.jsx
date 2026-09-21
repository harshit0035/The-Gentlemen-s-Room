import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, Instagram, Facebook, MapPin, Clock3, X } from "lucide-react";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import SectionHeading from "./components/SectionHeading";
import BookingModal from "./components/BookingModal";
import Gallery from "./components/Gallery";
import Transformation from "./components/Transformation";
import { services, barbers, gallery, testimonials } from "./data/content";

const HERO = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2200&q=90";

function App() {
  const [booking, setBooking] = useState({ open: false, service: null, barber: null });
  const [testimonial, setTestimonial] = useState(0);
  const [barberOpen, setBarberOpen] = useState(null);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  // Scroll progress bar + back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-triggered reveals. Falls back to visible when JS-driven
  // observation isn't available or the user prefers reduced motion.
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!targets.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3400);
  }, []);

  // Barber profile panel: scroll lock + Escape to close
  useEffect(() => {
    if (!barberOpen) return;
    const onKey = (e) => e.key === "Escape" && setBarberOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [barberOpen]);

  const book = (service = null, barber = null) => setBooking({ open: true, service, barber });
  const closeBooking = () => setBooking({ open: false, service: null, barber: null });
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="app">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <Navbar onBook={() => book()} />

      <main>
        <section id="home" className="hero" style={{ "--hero": `url(${HERO})` }}>
          <div className="hero-overlay" />
          <div className="hero-content reveal">
            <span className="eyebrow">LONDON · EST. 2018</span>
            <h1>Made for the<br /><em>modern gentleman.</em></h1>
            <p>Exceptional cuts, traditional craftsmanship and modern grooming — all in an atmosphere designed to make every visit feel like an occasion.</p>
            <div className="hero-actions">
              <Button onClick={() => book()}>BOOK AN APPOINTMENT</Button>
              <button className="text-link" onClick={() => scrollTo("services")}>EXPLORE SERVICES <ArrowRight size={16} /></button>
            </div>
          </div>
          <div className="hero-bottom">
            <span>MON–FRI · 9 AM–8 PM</span>
            <div className="hero-crest" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="14" stroke="currentColor" strokeWidth="1" opacity=".45" />
                <path d="M15 3.5 L17.4 12.6 L26.5 15 L17.4 17.4 L15 26.5 L12.6 17.4 L3.5 15 L12.6 12.6 Z" fill="currentColor" opacity=".9" />
              </svg>
              <span>LONDON</span>
            </div>
            <button onClick={() => scrollTo("experience")}>SCROLL TO EXPLORE <ArrowDown size={15} /></button>
          </div>
        </section>

        <section id="experience" className="section experience">
          <div className="experience-image image-reveal" data-reveal><img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1400&q=90" alt="Luxury barber chair and grooming interior" loading="lazy" /></div>
          <div className="experience-copy" data-reveal>
            <SectionHeading eyebrow="THE EXPERIENCE" title="More than a haircut." />
            <p>From the first consultation to the final finish, every detail is considered. Our barbers combine traditional techniques with contemporary styling to create a grooming experience built around you.</p>
            <button className="text-link" onClick={() => scrollTo("craft")}>DISCOVER OUR STORY <ArrowRight size={16} /></button>
          </div>
        </section>

        <section id="services" className="section services-section">
          <SectionHeading eyebrow="OUR SERVICES" title="Refined from every angle." />
          <div className="services-list" data-reveal>
            {services.map((s, i) => (
              <div
                className="service-row"
                key={s.id}
                data-reveal
                style={{ transitionDelay: `${i * 70}ms` }}
                onClick={() => book(s.name)}
              >
                <span className="service-number">{s.id}</span>
                <div className="service-main">
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
                <strong>£{s.price}</strong>
                <button className="service-book" onClick={(e) => { e.stopPropagation(); book(s.name); }}>BOOK THIS SERVICE <ArrowRight size={15} /></button>
                <div className="service-preview"><img src={s.image} alt="" loading="lazy" /></div>
              </div>
            ))}
          </div>
          <button className="text-link all-services" data-reveal onClick={() => book()}>VIEW ALL SERVICES <ArrowRight size={16} /></button>
        </section>

        <section id="craft" className="craft-section">
          <img src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=2200&q=90" alt="Barber tools and craft" loading="lazy" />
          <div className="craft-overlay" />
          <div className="craft-copy" data-reveal>
            <span className="eyebrow">THE CRAFT</span>
            <h2>Craft is in<br /><em>the details.</em></h2>
          </div>
        </section>

        <section className="section barbers-section">
          <SectionHeading eyebrow="THE BARBERS" title="Masters of the craft." />
          <div className="barber-grid">
            {barbers.map((b, i) => (
              <button className="barber-card" key={b.name} data-reveal style={{ transitionDelay: `${i * 90}ms` }} onClick={() => setBarberOpen(b)}>
                <div className="barber-image"><img src={b.image} alt={`${b.name}, fictional barber`} loading="lazy" /><span>VIEW PROFILE ↗</span></div>
                <div className="barber-meta"><div><h3>{b.name}</h3><p>{b.role}</p></div><span>0{i + 1}</span></div>
              </button>
            ))}
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <SectionHeading eyebrow="THE SPACE" title="Inside The Gentlemen's Room." />
          <Gallery images={gallery} />
        </section>

        <section className="section transformation-section">
          <SectionHeading eyebrow="THE TRANSFORMATION" title="Precision you can see." />
          <div data-reveal>
            <Transformation />
          </div>
          <small className="concept-note">Concept/demo imagery — not real customer photography.</small>
        </section>

        <section id="membership" className="section membership-section">
          <div className="membership-copy" data-reveal>
            <SectionHeading eyebrow="THE GENTLEMAN'S CLUB" title="Make grooming a ritual." />
            <p>For those who prefer consistency, convenience and exceptional service, our membership gives you regular access to the chair, priority booking and a few extras along the way.</p>
            <button className="text-link" onClick={() => notify("Demo enquiry — membership messages aren't sent in this concept build.")}>ENQUIRE ABOUT MEMBERSHIP <ArrowRight size={16} /></button>
          </div>
          <div className="membership-options">
            <article data-reveal><span>01</span><h3>MONTHLY</h3><p>2 cuts<br />Priority booking<br />Member pricing</p><button onClick={() => notify("Demo enquiry — membership messages aren't sent in this concept build.")}>ENQUIRE ↗</button></article>
            <article className="featured" data-reveal style={{ transitionDelay: "120ms" }}><span>02</span><h3>PREMIUM</h3><p>2 cuts + beard<br />Priority booking<br />Complimentary refreshments</p><button onClick={() => notify("Demo enquiry — membership messages aren't sent in this concept build.")}>ENQUIRE ↗</button></article>
          </div>
        </section>

        <section className="section testimonials-section">
          <SectionHeading eyebrow="WHAT CLIENTS SAY" title="The details matter." />
          <div className="testimonial-wrap" data-reveal>
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote key={testimonial} className="t-fade" aria-live="polite">{testimonials[testimonial]}</blockquote>
            <div className="testimonial-controls">
              <button onClick={() => setTestimonial((testimonial - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial"><ChevronLeft /></button>
              <span>0{testimonial + 1} / 0{testimonials.length}</span>
              <button onClick={() => setTestimonial((testimonial + 1) % testimonials.length)} aria-label="Next testimonial"><ChevronRight /></button>
            </div>
            <small>Fictional concept content</small>
          </div>
        </section>

        <section id="contact" className="section location-section">
          <div className="location-visual" data-reveal>
            <div className="map-grid"></div><div className="map-pin"><MapPin size={22} /></div>
            <span>LONDON<br />UNITED KINGDOM</span>
          </div>
          <div className="location-copy" data-reveal>
            <SectionHeading eyebrow="THE LOCATION" title="Your chair is waiting." />
            <p className="location-name">London, United Kingdom</p>
            <div className="hours"><Clock3 size={18} /><div><p>MON–FRI · 9:00 AM – 8:00 PM</p><p>SAT · 9:00 AM – 6:00 PM</p><p>SUN · 10:00 AM – 4:00 PM</p></div></div>
            <div className="location-actions"><button className="text-link" onClick={() => notify("Demo location — no real address is provided for this concept.")}>GET DIRECTIONS <ArrowRight size={16} /></button><Button onClick={() => book()}>BOOK AN APPOINTMENT</Button></div>
          </div>
        </section>

        <section className="final-cta">
          <img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=2200&q=90" alt="" loading="lazy" />
          <div className="craft-overlay" />
          <div data-reveal><span className="eyebrow">YOUR NEXT APPOINTMENT</span><h2>Leave looking <em>sharper.</em></h2><Button onClick={() => book()}>BOOK AN APPOINTMENT</Button></div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span>THE GENTLEMEN'S</span><strong>ROOM</strong><p>Classic craft. Modern gentleman.</p></div>
        <div className="footer-links">
          {["Home", "Services", "About", "Gallery", "Membership", "Contact"].map(x => <button key={x} onClick={() => scrollTo(x === "About" ? "experience" : x.toLowerCase())}>{x}</button>)}
        </div>
        <div className="footer-social">
          <button onClick={() => notify("Demo link — social profiles aren't connected in this concept build.")} aria-label="Instagram (demo)"><Instagram size={17} /></button>
          <button onClick={() => notify("Demo link — social profiles aren't connected in this concept build.")} aria-label="Facebook (demo)"><Facebook size={17} /></button>
        </div>
        <div className="footer-bottom"><span>London, United Kingdom</span><span>© 2026 The Gentlemen's Room — Concept Project</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp size={16} /> TOP</button></div>
      </footer>

      <button className={"back-top" + (progress > 4 ? " show" : "")} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" tabIndex={progress > 4 ? 0 : -1}><ArrowUp size={18} /></button>

      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}

      {barberOpen && (
        <div className="profile-backdrop" role="dialog" aria-modal="true" aria-label={`${barberOpen.name} profile`} onMouseDown={e => e.target === e.currentTarget && setBarberOpen(null)}>
          <div className="profile-panel">
            <button className="icon-btn" onClick={() => setBarberOpen(null)} aria-label="Close profile"><X size={20} /></button>
            <img src={barberOpen.image} alt="" />
            <span className="eyebrow">THE BARBERS</span>
            <h2>{barberOpen.name}</h2>
            <p className="profile-role">{barberOpen.role}</p>
            <p>{barberOpen.bio}</p>
            <p className="profile-speciality">{barberOpen.speciality}</p>
            <Button onClick={() => { const current = barberOpen; setBarberOpen(null); book(null, current.name); }}>BOOK WITH {barberOpen.name.split(" ")[0].toUpperCase()}</Button>
          </div>
        </div>
      )}

      <BookingModal open={booking.open} onClose={closeBooking} initialService={booking.service} initialBarber={booking.barber} />
    </div>
  );
}

export default App;
