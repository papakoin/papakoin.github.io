"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowDownIcon } from "@/components/icons";
import { WatchSources } from "@/components/watch-sources";
import { site } from "@/lib/site";
import {
  fetchStreamStatus,
  getTwitchChannel,
  twitchPlayerSrc,
  type LiveState,
} from "@/lib/twitch";

function subscribeNoop() {
  return () => {};
}

export function LiveHero() {
  const parent = useSyncExternalStore(
    subscribeNoop,
    () => window.location.hostname,
    () => null,
  );
  const [state, setState] = useState<LiveState>("unknown");
  const [game, setGame] = useState<string | null>(null);
  const [viewers, setViewers] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchStreamStatus(getTwitchChannel()).then((status) => {
      if (cancelled) return;
      setState(status.state);
      setGame(status.game);
      setViewers(status.viewers);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const live = state === "live";
  const offline = state === "offline";
  const playerSrc = parent ? twitchPlayerSrc(parent) : null;

  return (
    <section
      id="live"
      className="relative isolate min-h-dvh overflow-hidden bg-ink"
    >
      {!offline && playerSrc ? (
        <iframe
          title={`${site.displayName} live on Twitch`}
          src={playerSrc}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/offline-hero.png)",
          opacity: offline || !playerSrc ? 1 : 0,
          transition: "opacity 500ms ease",
        }}
        aria-hidden={!offline}
      />

      <div className="hero-vignette pointer-events-none absolute inset-0" />
      <div className="grain pointer-events-none absolute inset-0 opacity-40" />

      <div className="pointer-events-none absolute inset-0">
        <div className="flex h-full min-h-dvh flex-col justify-between px-4 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28">
          <div className="pointer-events-auto">
            {live ? (
              <p
                className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-charcoal/45 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md"
                aria-live="polite"
              >
                <span className="relative grid size-2 place-items-center">
                  <span className="absolute size-2 animate-ping rounded-full bg-live/80" />
                  <span className="size-2 rounded-full bg-live" />
                </span>
                Live
                {viewers != null ? (
                  <span className="font-medium tracking-normal normal-case text-white/80">
                    · {viewers.toLocaleString()} watching
                  </span>
                ) : null}
              </p>
            ) : offline ? (
              <p
                className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/40 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-charcoal uppercase backdrop-blur-md"
                aria-live="polite"
              >
                <span className="size-2 rounded-full bg-sun-deep" />
                Offline
              </p>
            ) : (
              <p className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/30 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-charcoal uppercase backdrop-blur-md">
                <span className="size-2 rounded-full bg-sun" />
                Stream
              </p>
            )}
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="pointer-events-auto max-w-lg">
              {offline ? (
                <div className="rounded-[28px] border border-white/50 bg-white/42 p-6 shadow-[0_20px_60px_rgba(60,40,10,0.12)] backdrop-blur-xl sm:p-8">
                  <h1 className="font-sans text-4xl font-semibold tracking-tight text-balance text-charcoal sm:text-5xl">
                    Offline — next stream soon
                  </h1>
                  <p className="mt-3 text-base leading-relaxed text-pretty text-charcoal/75 sm:text-lg">
                    {site.tagline} The Clutch Club is still open — come hang in
                    chat until we go live from {site.region}.
                  </p>
                  <div className="mt-5">
                    <WatchSources />
                  </div>
                </div>
              ) : (
                <div className="rounded-[24px] border border-white/40 bg-white/38 px-5 py-4 shadow-[0_12px_40px_rgba(60,40,10,0.1)] backdrop-blur-xl">
                  <p className="text-sm font-medium text-charcoal/80">
                    {live ? "Live now" : "Watch"}
                    <span className="mx-2 text-charcoal/35">•</span>
                    <span className="font-serif text-[1.35rem] italic text-coral">
                      {game || "PapaKow"}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-charcoal/65">
                    Streaming from {site.region}. One stream on Twitch, Kick,
                    and YouTube.
                  </p>
                  <div className="mt-3">
                    <WatchSources />
                  </div>
                </div>
              )}
            </div>

            <div className="pointer-events-auto flex items-center justify-between gap-4 sm:justify-end">
              <p className="hidden items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-white/85 uppercase sm:flex">
                <span className="size-1.5 rounded-full bg-sun" />
                Scroll to explore
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#chat"
                  className="inline-flex items-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-semibold text-charcoal no-underline shadow-[0_8px_24px_rgba(245,215,110,0.45)] transition hover:bg-sun-deep"
                >
                  Join the chat
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#watch"
                  className="grid size-12 place-items-center rounded-full border border-white/50 bg-white/35 text-charcoal backdrop-blur-md transition hover:bg-white/55"
                  aria-label="Scroll to now playing"
                >
                  <ArrowDownIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
