# Deployment

## Production Readiness Checklist

- `npm ci`
- `npm run lint`
- `npm test -- --run`
- `npm run build`

## Static Hosting

Grain builds to `dist/` and can be deployed on any static host that supports Vite output.

## GitHub Pages

- Workflow: `.github/workflows/deploy-pages.yml`
- Default branch for deployment: `main`
- Build-time base path is set automatically from the repository name via `VITE_BASE_PATH`
- In repository settings, enable GitHub Pages with GitHub Actions as the source

## Free Metrics

Grain can optionally load GoatCounter for simple hosted analytics.

- Create a free GoatCounter site
- Add `VITE_GOATCOUNTER_DOMAIN=your-project.goatcounter.com` as a GitHub repository variable or secret used at build time
- If the variable is absent, no analytics script is loaded

## Branch Checks

- CI runs on `main`, `master`, `develop`, and pull requests targeting those branches
- Pull request source branches must match one of:
  - `feature/*`
  - `fix/*`
  - `chore/*`
  - `docs/*`
  - `refactor/*`
  - `test/*`
  - `release/*`

### Vercel

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Config file: `vercel.json`

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Config file: `netlify.toml`

## Notes

- The current app is fully client-side and does not require environment variables.
- If routes are added later, keep the SPA fallback redirect in place.
