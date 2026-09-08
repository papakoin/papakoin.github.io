"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { KickIcon, TwitchIcon, YouTubeIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { fallbackNowPlaying, site, type NowPlaying } from "@/lib/site";
import { fetchStreamStatus, nowPlayingFromStatus } from "@/lib/twitch";

const platforms = [
  {
    href: site.links.twitch,
    label: "Twitch",
    icon: TwitchIcon,
    className: "text-[#5c3d8f] bg-[#efe7fb] hover:bg-[#e4d7f8]",
  },
  {
    href: site.links.youtube,
    label: "YouTube",
    icon: YouTubeIcon,
    className: "text-[#9b2d2d] bg-[#fde8e8] hover:bg-[#f8d4d4]",
  },
  {
    href: site.links.kick,
    label: "Kick",
    icon: KickIcon,
    className: "text-[#1f6b32] bg-[#e5f6ea] hover:bg-[#d4eedc]",
  },
] as const;

export function NowPlaying() {
  const [now, setNow] = useState<NowPlaying>(fallbackNowPlaying);

  useEffect(() => {
    fetchStreamStatus().then((status) => {
      setNow(nowPlayingFromStatus(status));
    });
  }, []);

  return (
    <section id="watch" className="relative bg-cream px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow="Now playing" title={now.game} />
          <div className="mt-5 flex flex-wrap gap-2">
            {now.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sun/55 px-3 py-1 text-xs font-semibold tracking-wide text-charcoal"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-pretty text-muted">
            {now.blurb}
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {platforms.map(({ href, label, icon: Icon, className }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold no-underline transition ${className}`}
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[40px] bg-peach/35 blur-2xl" />
          <div className="overflow-hidden rounded-[32px] bg-peach/40 shadow-[0_24px_60px_rgba(120,70,40,0.12)]">
            <Image
              src={now.imageSrc}
              alt={now.imageAlt}
              width={1200}
              height={900}
              className="aspect-[4/3] h-full w-full object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
