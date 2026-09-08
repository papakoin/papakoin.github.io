import Link from "next/link";
import {
  DiscordIcon,
  InstagramIcon,
  SunIcon,
  TikTokIcon,
  XIcon,
} from "@/components/icons";
import { site } from "@/lib/site";

const socials = [
  { href: site.links.instagram, label: "Instagram", icon: InstagramIcon },
  { href: site.links.x, label: "X", icon: XIcon },
  { href: site.links.tiktok, label: "TikTok", icon: TikTokIcon },
  { href: site.links.discord, label: "Discord", icon: DiscordIcon },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-charcoal/8 bg-cream px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-sun text-charcoal">
            <SunIcon size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight lowercase text-charcoal">
              {site.name}
            </p>
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} {site.community}
            </p>
          </div>
        </div>

        <nav aria-label="Social" className="flex flex-wrap items-center gap-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="grid size-11 place-items-center rounded-full bg-white text-charcoal shadow-[0_4px_16px_rgba(80,50,20,0.05)] transition hover:bg-sun"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </nav>

        <Link
          href="/privacy/"
          className="text-sm font-medium text-muted no-underline hover:text-charcoal"
        >
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}
