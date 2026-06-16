# Kiryl Fursau — Portfolio site

A single-page, interactive CV/portfolio in a Revolut-inspired style (strict monochrome, Aeonik-style display type, pill buttons, flat design). Pure **HTML + CSS + vanilla JS** — no build step, no framework — so it runs as-is on GitHub Pages.

## Files
- `index.html` — all content/sections
- `styles.css` — Revolut-style design system + animations
- `script.js` — scroll reveals, animated counters, and ReactBits-style effects (BlurText, Magnet, SpotlightCard) recreated in vanilla JS
- `Kiryl_Fursau_Resume.pdf` — linked from the “Download CV” buttons

## Run locally
Just open `index.html` in a browser, or serve it:
```bash
cd site
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to GitHub Pages
1. Create a new repo (e.g. `kiryl-portfolio`) and push these files to the repo **root** (or a `/docs` folder).
2. GitHub → repo **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)` (or `/docs`).
3. Save. Your site goes live at `https://<username>.github.io/<repo>/` in ~1 minute.

> Tip: for a personal URL like `https://<username>.github.io/`, name the repo `<username>.github.io` and push to root.

## Notes
- Fonts load from Google Fonts (Inter) and Fontshare (General Sans — an Aeonik Pro substitute). Internet required for the exact display font; otherwise it falls back gracefully.
- Respects `prefers-reduced-motion`.
- `?preview` in the URL forces all animated elements visible (used for static screenshots).
- All metrics reflect real experience — swap any figure you want to adjust directly in `index.html`.
