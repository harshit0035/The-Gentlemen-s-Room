export const services = [
  { id: "01", name: "THE GENTLEMAN'S CUT", desc: "Precision cut · Consultation · Styling", price: 38, image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85" },
  { id: "02", name: "SKIN FADE", desc: "Modern fade · Detail work · Finish", price: 42, image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85" },
  { id: "03", name: "BEARD & SHAPE", desc: "Hot towel · Sculpting · Finish", price: 28, image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=85" },
  { id: "04", name: "THE FULL EXPERIENCE", desc: "Haircut · Beard · Hot towel · Styling", price: 58, image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=85" },
  { id: "05", name: "THE SIGNATURE SHAVE", desc: "Traditional razor · Hot towel · Aftercare", price: 35, image: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=900&q=85" }
];

export const barbers = [
  { name: "James Whitmore", role: "Senior Barber", speciality: "Classic cuts · Scissor work · Traditional grooming", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=85", bio: "James brings a quiet precision to every appointment, balancing classic British technique with modern styling." },
  { name: "Daniel Hayes", role: "Master Barber", speciality: "Skin fades · Beard sculpting · Styling", image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=900&q=85", bio: "Daniel's approach is detail-led and contemporary, with a focus on shape, balance and an effortless finish." },
  { name: "Oliver Grant", role: "Creative Barber", speciality: "Editorial cuts · Texture · Modern grooming", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=85", bio: "Oliver works where traditional craft meets modern editorial styling, creating distinctive but wearable looks." }
];

export const gallery = [
  "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=85"
];

export const testimonials = [
  "Best haircut I've had in London. The attention to detail is exceptional.",
  "The atmosphere feels more like a private club than a barbershop.",
  "Consistently excellent. I've finally found my regular barber."
];

export const demoTimes = ["09:00", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

// Demo availability — the next five days from today, computed at load.
// Frontend-only: no availability is really being checked.
const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const demoDates = Array.from({ length: 5 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  return `${DAY_NAMES[d.getDay()]} ${d.getDate()}`;
});
