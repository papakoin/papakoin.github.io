# papakow.com

PapaKow's homepage — a live-first streamer site for **The Clutch Club**.

Sunny California *mood* (cream, soft yellow, peach) with Australia / OCE copy. Built with Next.js App Router, TypeScript, and Tailwind CSS, and statically exported so it can ship on GitHub Pages.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build    # writes a static site to /out
npm start        # serves /out locally
```

## Environment

Copy `.env.example` to `.env.local` when you need overrides.

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Defaults to `https://papakow.com`. Used for metadata and OAuth fallback. |
| `NEXT_PUBLIC_TWITCH_CHANNEL` | No | Defaults to `papakow`. Drives the player embed and live check. |
| `NEXT_PUBLIC_TWITCH_CLIENT_ID` | For on-site sign-in | From [Twitch developer console](https://dev.twitch.tv/console/apps). Leave empty to keep the Sign in button as a stub. |
| `NEXT_PUBLIC_TWITCH_REDIRECT_URI` | With client ID | Must match the Twitch app redirect exactly, e.g. `https://papakow.com/`. |
| `TWITCH_CLIENT_SECRET` | Later | **Do not** expose this to the browser. Needed only when a server function exchanges an OAuth code. |

The live pill uses a public uptime helper (decapi) from the browser so the static export can still detect live/offline. For production-grade status (viewer count, exact game, Helix rate limits), add a small serverless function that calls Twitch Helix with a Client-ID and cache the result.

## Twitch embed

The hero iframe is `https://player.twitch.tv/?channel=papakow`. Twitch requires `parent` to equal the page hostname (`localhost`, `papakow.com`, `papakoin.github.io`, …). The player sets this at runtime.

If the embed is blank, the domain is missing from the request — load the site from its real host rather than a preview IP.

## Twitch chat sign-in (stub)

`Sign in with Twitch` is wired, but incomplete on purpose:

1. Register a Twitch application.
2. Set `NEXT_PUBLIC_TWITCH_CLIENT_ID` and the redirect URL.
3. The static site currently uses **implicit grant** (`response_type=token`) so GitHub Pages can demo a client-side session.

**TODO — production auth**

- Prefer the **authorization code** flow.
- Exchange the code on a Netlify Function / Vercel Route Handler / similar.
- Store `TWITCH_CLIENT_SECRET` only on the server.
- Set an httpOnly session cookie.
- Then connect messages to Twitch chat (IRC / EventSub) instead of the local preview.

Until that exists, the chat card is a preview. Discord remains the always-on community door: https://discord.com/invite/ktCYEm5eZR

## Deploy

### GitHub Pages (this repo)

`next.config.ts` sets `output: "export"`. `.github/workflows/pages.yml` builds `/out` and deploys it.

In the repo: **Settings → Pages → Source → GitHub Actions**.

Custom domain: `public/CNAME` is `papakow.com`. Point DNS at GitHub Pages and allow HTTPS to finish.

### Netlify

`netlify.toml` publishes `out` after `npm run build`. No extra plugin is required for the static export.

## Privacy

ClutchBot's privacy policy lives at `/privacy` (and `/privacy.html` redirects there for old links).
