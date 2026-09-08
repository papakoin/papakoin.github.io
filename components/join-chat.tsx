"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { DiscordIcon, SmileIcon, TwitchIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { chatPreview, site, type ChatTone } from "@/lib/site";
import {
  captureImplicitTokenFromHash,
  clearSession,
  readSession,
  twitchAuthorizeUrl,
  type TwitchSession,
} from "@/lib/twitch";

const toneClass: Record<ChatTone | "local", string> = {
  peach: "bg-peach",
  sun: "bg-sun",
  sky: "bg-[#c9dff2]",
  coral: "bg-coral",
  local: "bg-sun-deep",
};

type Line = {
  id: string;
  user: string;
  text: string;
  time: string;
  tone: ChatTone | "local";
};

function stamp() {
  return new Date().toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function subscribeSession(onStoreChange: () => void) {
  captureImplicitTokenFromHash();
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("papakow-session", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("papakow-session", onStoreChange);
  };
}

function sessionSnapshot(): TwitchSession | null {
  return readSession();
}

export function JoinChat() {
  const session = useSyncExternalStore(
    subscribeSession,
    sessionSnapshot,
    () => null,
  );
  const [notice, setNotice] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [lines, setLines] = useState<Line[]>(
    chatPreview.map((m) => ({ ...m })),
  );

  function signIn() {
    const url = twitchAuthorizeUrl();
    if (!url) {
      setNotice(
        "Twitch sign-in is almost ready. Jump into chat on Twitch for now — the on-site login needs a Client ID (see the README).",
      );
      return;
    }
    // TODO: swap implicit grant for authorization-code + httpOnly cookie.
    window.location.assign(url);
  }

  function signOut() {
    clearSession();
    window.dispatchEvent(new Event("papakow-session"));
  }

  function send(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !session) return;
    setLines((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        user: session.displayName || "you",
        text,
        time: stamp(),
        tone: "local",
      },
    ]);
    setDraft("");
    setNotice(
      "Preview only — messages stay in this browser until Twitch chat OAuth is connected.",
    );
  }

  return (
    <section id="chat" className="bg-cream px-4 pb-16 sm:px-8 sm:pb-24">
      <div className="mx-auto max-w-6xl rounded-[36px] bg-sun-wash px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Join the chat"
              title="Sign in to chat."
              kicker="One conversation across Twitch, Kick, and YouTube. Be kind. Have fun. Let's build a positive community."
            />
            <div className="mt-8 flex flex-col gap-3">
              {session ? (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-charcoal/75">
                    Signed in
                    {session.displayName ? ` as ${session.displayName}` : ""}.
                    Welcome home.
                  </p>
                  <button
                    type="button"
                    onClick={signOut}
                    className="inline-flex h-14 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-charcoal shadow-[0_8px_24px_rgba(80,50,20,0.06)]"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={signIn}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-5 text-sm font-semibold text-charcoal shadow-[0_8px_24px_rgba(80,50,20,0.06)] transition hover:bg-cream"
                >
                  <TwitchIcon size={18} className="text-[#5c3d8f]" />
                  Sign in with Twitch
                </button>
              )}
              <a
                href={site.links.discord}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-5 text-sm font-semibold text-charcoal no-underline shadow-[0_8px_24px_rgba(80,50,20,0.06)] transition hover:bg-cream"
              >
                <DiscordIcon size={18} className="text-[#5865f2]" />
                Join our Discord
              </a>
              <a
                href={site.links.twitch}
                target="_blank"
                rel="noreferrer"
                className="text-center text-sm font-semibold text-charcoal underline decoration-sun decoration-2 underline-offset-4"
              >
                Follow on Twitch
              </a>
            </div>
            {notice ? (
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal/70">
                {notice}{" "}
                <a
                  href={site.links.twitch}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-charcoal underline decoration-sun decoration-2 underline-offset-2"
                >
                  Open Twitch
                </a>
              </p>
            ) : null}
          </div>

          <div className="rounded-[28px] bg-white p-5 shadow-[0_20px_50px_rgba(80,50,20,0.08)] sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-charcoal">Live chat</p>
                <p className="text-[11px] text-muted">
                  Twitch · Kick · YouTube
                </p>
              </div>
              <span className="rounded-full bg-sun px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-charcoal uppercase">
                Live
              </span>
            </div>
            <ul className="flex min-h-[260px] flex-col gap-4">
              {lines.map((line) => (
                <li key={line.id} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold text-charcoal/80 ${toneClass[line.tone]}`}
                  >
                    {line.user.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-charcoal">
                        {line.user}
                      </p>
                      <p className="shrink-0 text-[11px] text-muted">{line.time}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-charcoal/75">
                      {line.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <form
              onSubmit={send}
              className="mt-5 flex items-center gap-2 rounded-full bg-cream px-4 py-2.5"
            >
              <label className="sr-only" htmlFor="chat-draft">
                Chat message
              </label>
              <input
                id="chat-draft"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                disabled={!session}
                placeholder={
                  session
                    ? "Say something kind…"
                    : "Sign in to send a message..."
                }
                className="min-w-0 flex-1 bg-transparent text-sm text-charcoal outline-none placeholder:text-muted disabled:cursor-not-allowed"
              />
              <SmileIcon size={18} className="text-muted" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
