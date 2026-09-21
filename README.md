# The Gentlemen's Room

Fictional luxury London barbershop concept project.

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Notes

- React + Vite
- No backend
- Booking flow is a frontend demo only
- No real appointment is created
- Images currently use remote Unsplash URLs so the project runs immediately
- Replace image URLs in `src/data/content.js` and `src/components/App.jsx` with local assets when desired
- The visual direction follows the provided blueprint: dark luxury, editorial British styling, brass accents, cinematic imagery and responsive layouts.

## Main files

- `src/App.jsx` — page composition and interactions
- `src/styles.css` — complete visual system and responsive CSS
- `src/data/content.js` — services, barbers, gallery and demo data
- `src/components/BookingModal.jsx` — multi-step booking UI
- `src/components/Navbar.jsx` — responsive navigation
- `src/components/Gallery.jsx` — responsive gallery + lightbox
- `src/components/Transformation.jsx` — before/after slider
