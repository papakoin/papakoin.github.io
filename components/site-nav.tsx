"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, SunIcon } from "@/components/icons";
import { site } from "@/lib/site";

const links = [
  { href: "/#watch", label: "Watch" },
  { href: "/#about", label: "About" },
  { href: "/#chat", label: "Chat" },
];

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/" || pathname === "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 p-3 sm:p-5">
      <div
        className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 pl-5 transition-all duration-300 sm:px-5 ${
          scrolled || !onHome
            ? "border-white/50 bg-cream/85 shadow-[0_10px_40px_rgba(80,50,20,0.08)] backdrop-blur-xl"
            : "border-white/40 bg-white/35 shadow-[0_8px_32px_rgba(80,50,20,0.06)] backdrop-blur-xl"
        }`}
      >
        <Link
          href={onHome ? "/#live" : "/"}
          className="flex items-center gap-2.5 text-charcoal no-underline"
        >
          <span className="grid size-8 place-items-center rounded-full bg-sun text-charcoal shadow-[0_2px_8px_rgba(245,215,110,0.55)]">
            <SunIcon size={16} />
          </span>
          <span className="text-[17px] font-semibold tracking-tight lowercase">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal/75 no-underline transition-colors hover:text-charcoal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#chat"
            className="hidden items-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-semibold text-charcoal no-underline shadow-[0_4px_16px_rgba(245,215,110,0.45)] transition hover:bg-sun-deep sm:inline-flex"
          >
            <span className="size-1.5 rounded-full bg-charcoal/70" />
            Join the chat
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-charcoal md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="pointer-events-auto mt-3 rounded-[28px] border border-white/50 bg-cream/92 p-5 shadow-xl backdrop-blur-xl md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-base font-medium text-charcoal no-underline hover:bg-white/60"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#chat"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-sun px-4 py-3 text-sm font-semibold text-charcoal no-underline"
              onClick={() => setOpen(false)}
            >
              Join the chat
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
