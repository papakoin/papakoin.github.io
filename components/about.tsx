"use client";

import { useState } from "react";
import { HeartIcon, SunIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

export function About() {
  const [more, setMore] = useState(false);

  return (
    <section id="about" className="relative bg-cream px-6 pb-24 sm:px-10 sm:pb-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={`About ${site.displayName}`} title="Who I am" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">
            Australian FPS player and indie game supporter. I stream out of OCE
            to build a positive community around great games, real
            conversations, and showing up for each other.
          </p>
          <p className="mt-5 flex items-start gap-3 max-w-xl text-[15px] leading-relaxed text-charcoal/80">
            <HeartIcon size={18} className="mt-0.5 shrink-0 text-coral" />
            <span>
              Proudly building <strong className="font-semibold">{site.community}</strong>{" "}
              — an Australian gaming community for clutch moments, LFG, and
              people who make the grind feel lighter.
            </span>
          </p>
          {more ? (
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-pretty text-muted">
              ClutchBot keeps chat commands, moderation, and alerts running
              across Twitch, Kick, and YouTube at once — privately, on my own
              hardware, just for this community. Come for the FPS bangers. Stay
              for the people.
            </p>
          ) : null}
          <button
            type="button"
            className="mt-6 text-sm font-semibold text-charcoal underline decoration-sun decoration-2 underline-offset-4 transition hover:decoration-coral"
            onClick={() => setMore((v) => !v)}
            aria-expanded={more}
          >
            {more ? "Show less" : "Find out more →"}
          </button>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-6 rounded-full bg-sun/50 blur-2xl" />
            <div className="relative grid size-56 place-items-center rounded-full bg-peach/70 text-sun-deep shadow-[0_20px_50px_rgba(232,155,136,0.28)] sm:size-72">
              <SunIcon size={88} />
              <span className="sr-only">{site.displayName} avatar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
