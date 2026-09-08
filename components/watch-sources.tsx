import { KickIcon, TwitchIcon, YouTubeIcon } from "@/components/icons";
import { site } from "@/lib/site";

const sources = [
  { href: site.links.twitch, label: "Twitch", icon: TwitchIcon },
  { href: site.links.youtube, label: "YouTube", icon: YouTubeIcon },
  { href: site.links.kick, label: "Kick", icon: KickIcon },
] as const;

export function WatchSources({
  variant = "glass",
}: {
  variant?: "glass" | "solid";
}) {
  const chip =
    variant === "glass"
      ? "bg-white/70 text-charcoal"
      : "bg-white text-charcoal shadow-[0_4px_16px_rgba(80,50,20,0.05)]";

  return (
    <div className="flex flex-wrap gap-2">
      {sources.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold no-underline ${chip}`}
        >
          <Icon size={12} />
          {label}
        </a>
      ))}
    </div>
  );
}
