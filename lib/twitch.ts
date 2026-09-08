import { fallbackNowPlaying, type NowPlaying } from "@/lib/site";

export type LiveState = "live" | "offline" | "unknown";

export type StreamStatus = {
  state: LiveState;
  game: string | null;
  title: string | null;
  viewers: number | null;
};

const CHANNEL =
  process.env.NEXT_PUBLIC_TWITCH_CHANNEL?.trim().toLowerCase() || "papakow";

export function getTwitchChannel() {
  return CHANNEL;
}

export function twitchPlayerSrc(parent: string, channel = CHANNEL) {
  const params = new URLSearchParams({
    channel,
    parent,
    muted: "true",
    autoplay: "true",
  });
  return `https://player.twitch.tv/?${params.toString()}`;
}

/**
 * Best-effort live check for a static export (no server).
 * Helix requires a backend + Client-ID — see README.
 * decapi is a public CORS-friendly helper used only as a fallback.
 */
export async function fetchStreamStatus(
  channel = CHANNEL,
): Promise<StreamStatus> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);

  try {
    const [uptimeRes, gameRes, viewersRes] = await Promise.all([
      fetch(`https://decapi.me/twitch/uptime/${encodeURIComponent(channel)}`, {
        signal: controller.signal,
      }),
      fetch(`https://decapi.me/twitch/game/${encodeURIComponent(channel)}`, {
        signal: controller.signal,
      }),
      fetch(
        `https://decapi.me/twitch/viewercount/${encodeURIComponent(channel)}`,
        { signal: controller.signal },
      ),
    ]);

    const uptime = (await uptimeRes.text()).trim();
    const game = (await gameRes.text()).trim();
    const viewersRaw = (await viewersRes.text()).trim();
    const viewers = Number.parseInt(viewersRaw.replace(/[^\d]/g, ""), 10);
    const viewerCount = Number.isFinite(viewers) ? viewers : null;
    const lower = uptime.toLowerCase();

    if (
      lower.includes("offline") ||
      lower.includes("not found") ||
      lower.includes("is not live")
    ) {
      return { state: "offline", game: null, title: null, viewers: null };
    }

    if (uptime.length > 0 && !lower.includes("error")) {
      return {
        state: "live",
        game: game && !game.toLowerCase().includes("offline") ? game : null,
        title: null,
        viewers: viewerCount,
      };
    }
  } catch {
    // Network / CORS / timeout — keep the embed visible.
  } finally {
    clearTimeout(timer);
  }

  return { state: "unknown", game: null, title: null, viewers: null };
}

export function nowPlayingFromStatus(status: StreamStatus): NowPlaying {
  if (status.state === "live" && status.game) {
    return {
      ...fallbackNowPlaying,
      game: status.game,
      blurb: `Live right now — ${status.game}. Come hang.`,
    };
  }
  return fallbackNowPlaying;
}

/**
 * Twitch OAuth (client-side stub for the static site).
 *
 * TODO: Production should use the authorization code flow via a
 * Netlify / Vercel / GitHub-backed function:
 *   1. Register an app at https://dev.twitch.tv/console/apps
 *   2. Set TWITCH_CLIENT_ID + TWITCH_CLIENT_SECRET on the host
 *   3. Redirect to /api/auth/twitch/callback and exchange the code server-side
 *   4. Issue an httpOnly session cookie
 *
 * Implicit grant is only here so GitHub Pages can still demo sign-in
 * once NEXT_PUBLIC_TWITCH_CLIENT_ID is set.
 */
export function twitchAuthorizeUrl() {
  const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
  if (!clientId) return null;

  const redirect =
    process.env.NEXT_PUBLIC_TWITCH_REDIRECT_URI ||
    (typeof window !== "undefined" ? `${window.location.origin}/` : siteRedirectFallback());

  const url = new URL("https://id.twitch.tv/oauth2/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirect);
  url.searchParams.set("response_type", "token");
  url.searchParams.set("scope", "user:read:email");
  return url.toString();
}

function siteRedirectFallback() {
  return `${process.env.NEXT_PUBLIC_SITE_URL || "https://papakow.com"}/`;
}

export const SESSION_KEY = "papakow.twitch.session";

export type TwitchSession = {
  accessToken: string;
  displayName?: string;
};

export function readSession(): TwitchSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as TwitchSession) : null;
  } catch {
    return null;
  }
}

export function writeSession(session: TwitchSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function captureImplicitTokenFromHash(): TwitchSession | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  if (!accessToken) return null;
  const session: TwitchSession = { accessToken };
  writeSession(session);
  history.replaceState(null, "", window.location.pathname + window.location.search);
  return session;
}
