Frontend deployment notes

Vercel
- Connect the `unified` folder as the project root (or deploy from repository and set root to `unified`).
- Build command: `npm run build`
- Output directory: `dist`
- Make sure to set production env variables (use `VITE_API_URL` for your backend).

Netlify
- Publish directory: `unified/dist`
- Build command: `npm run build` (set working directory to `unified` or configure in UI)

Local preview
- Install deps and build:
```bash
cd unified
npm ci
npm run build
npm run preview
```

Notes
- Keep backend credentials out of the frontend. Use `VITE_`-prefixed environment variables.
- `index.html` is configured to load the SPA entry at `/src/main.jsx`.