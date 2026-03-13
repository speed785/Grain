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

## Product Analytics

Grain can optionally load PostHog for richer product analytics.

- Create a PostHog project
- Add `VITE_POSTHOG_KEY` as a GitHub repository variable used at build time
- Optionally add `VITE_POSTHOG_HOST`; default: `https://us.i.posthog.com`
- If `VITE_POSTHOG_KEY` is absent, analytics stays disabled
- Runtime errors are also forwarded to PostHog from uncaught exceptions, unhandled promise rejections, and React error boundaries

GitHub CLI examples:

```bash
gh variable set VITE_POSTHOG_KEY --body "phc_your_project_key" --repo speed785/Grain
gh variable set VITE_POSTHOG_HOST --body "https://us.i.posthog.com" --repo speed785/Grain
```

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
