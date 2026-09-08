import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
    ...props,
  };
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      <path
        d="M12 2.8v2.2M12 19v2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.8 12h2.2M19 12h2.2M4.4 19.6 6 18M18 6l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 5v14M6 13l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 20s-7-4.4-7-9.2C5 8 6.8 6.4 9 6.4c1.3 0 2.4.6 3 1.6.6-1 1.7-1.6 3-1.6 2.2 0 4 1.6 4 4.4 0 4.8-7 9.2-7 9.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SmileIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8.4 13.4c.9 1.5 2.2 2.2 3.6 2.2s2.7-.7 3.6-2.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="9.2" cy="10" r="1" fill="currentColor" />
      <circle cx="14.8" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

export function TwitchIcon(props: IconProps) {
  return (
    <svg {...base({ ...props, viewBox: "0 0 24 24" })}>
      <path
        fill="currentColor"
        d="M4.3 2 3 5.6v14.2h4.9V22h2.6l2.5-2.2h3.8L21 15.4V2H4.3Zm15 12.6-2.6 2.4h-4.1l-2.5 2.2v-2.2H6.6V3.7h12.7v10.9ZM16 7.2h-1.8v5.3H16V7.2Zm-4.5 0H9.7v5.3h1.8V7.2Z"
      />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        fill="currentColor"
        d="M22.5 8.2a3.1 3.1 0 0 0-2.2-2.2C18.4 5.6 12 5.6 12 5.6s-6.4 0-8.3.4A3.1 3.1 0 0 0 1.5 8.2 32 32 0 0 0 1.1 12a32 32 0 0 0 .4 3.8 3.1 3.1 0 0 0 2.2 2.2c1.9.4 8.3.4 8.3.4s6.4 0 8.3-.4a3.1 3.1 0 0 0 2.2-2.2 32 32 0 0 0 .4-3.8 32 32 0 0 0-.4-3.8ZM10 15.1V8.9l5.4 3.1L10 15.1Z"
      />
    </svg>
  );
}

export function KickIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        fill="currentColor"
        d="M5 4h5.2v5.1L14.4 4H20l-6.2 6.2L20 16.5h-5.6l-4.2-5.2V20H5V4Z"
      />
    </svg>
  );
}

export function DiscordIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        fill="currentColor"
        d="M18.9 5.6A16 16 0 0 0 14.9 4l-.4.7a14.6 14.6 0 0 1 3.7 1.4 13.3 13.3 0 0 0-12.4 0A14 14 0 0 1 9.5 4L9.1 4a16 16 0 0 0-4 1.6C2.4 9.6 1.7 13.5 2 17.3A16.4 16.4 0 0 0 7 19.8l.7-1.2a10.6 10.6 0 0 1-1.7-.8l.4-.3c3.3 1.5 6.9 1.5 10.2 0l.4.3c-.5.3-1.1.6-1.7.8l.7 1.2a16.4 16.4 0 0 0 5-2.5c.4-4.3-.6-8.2-2.1-11.7ZM9.4 14.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2-.8 2-1.8 2Zm5.2 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2-.8 2-1.8 2Z"
      />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect
        x="3.4"
        y="3.4"
        width="17.2"
        height="17.2"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        fill="currentColor"
        d="M17.6 3.5h2.7l-5.9 6.7 7 9.3h-5.5l-4.3-5.6-4.9 5.6H4l6.3-7.2-6.7-8.8h5.6l3.9 5.1 4.5-5.1Zm-1 14.4h1.5L7.5 5h-1.6l10.7 12.9Z"
      />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        fill="currentColor"
        d="M14.2 3c.4 2.6 1.8 4.3 4.3 4.6v2.7c-1.5 0-2.9-.5-4.1-1.3v6.3A6.3 6.3 0 1 1 9.6 8.9v2.8a3.6 3.6 0 1 0 2.5 3.4V3h2.1Z"
      />
    </svg>
  );
}
