# TechMids branding

The TechMids brand guide, as a website and as PDFs.

> **Status: proposal v1.0, not signed off.** The display font (Bricolage Grotesque), the mono text in the logo tag, and the warm off-white light background are still open.

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | The guide as a single responsive page, with a light / dark / auto toggle |
| `assets/techmids-tokens.css` | Design tokens as CSS variables. The source of truth for colour, type, space, radius |
| `assets/guide.css` | Component styles used by the guide. Reads only tokens |
| `assets/site.css` | Web-only layout (top bar, draft banner, responsive rules) |
| `pdf/` | The guide as 16-page PDFs, light and dark |
| `print/` | Fixed-page source for the PDFs and the script that renders them |

## Changing a brand choice

Edit `assets/techmids-tokens.css`. For example, to try a different display font change `--font-display` (and the Google Fonts link in `index.html` and `print/guide.html`); to change the light background change `--graphite-50`.

## Preview locally

No build step. Serve the folder and open it:

```bash
python3 -m http.server 8000
```

## Rebuild the PDFs

```bash
npm install playwright && npx playwright install chromium
node print/render.js        # writes pdf/techmids-brand-guide-{light,dark}.pdf
```

`print/guide.html` and `index.html` hold the same content in two layouts; change both when the copy changes.

## Publishing

`.github/workflows/pages.yml` deploys to GitHub Pages on every push to `main`. In the repository settings, Pages → Build and deployment → Source must be set to **GitHub Actions**.
