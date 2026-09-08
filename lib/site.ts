export const site = {
  name: "papakow",
  displayName: "PapaKow",
  community: "The Clutch Club",
  url: "https://papakow.com",
  email: "the.clutch.club01@gmail.com",
  channel: "papakow",
  region: "Australia / OCE",
  description:
    "PapaKow's home on the web — live FPS streams from Australia, indie game love, and The Clutch Club community.",
  tagline: "Good vibes, great games, better community.",
  links: {
    twitch: "https://www.twitch.tv/papakow",
    youtube: "https://www.youtube.com/@papakoww",
    kick: "https://kick.com/papakow",
    discord: "https://discord.gg/VMYGePuF6C",
    instagram: "https://www.instagram.com/papakow.clutch",
    x: "https://x.com/papakowclutch",
    tiktok: "https://www.tiktok.com/@papakow.clutch",
  },
} as const;

export type NowPlaying = {
  game: string;
  tags: string[];
  blurb: string;
  imageSrc: string;
  imageAlt: string;
};

/** Placeholder until a live Twitch Helix lookup is wired up. */
export const fallbackNowPlaying: NowPlaying = {
  game: "Valorant",
  tags: ["FPS", "Competitive"],
  blurb:
    "Locked in and climbing today. Unrated to Radiant, one game at a time.",
  imageSrc: "/images/now-playing-art.png",
  imageAlt:
    "Soft pastel coastal arena in cream, peach, and sun-yellow light",
};

export const chatSources = ["twitch", "kick", "youtube"] as const;
export type ChatSource = (typeof chatSources)[number] | "bot";

export const chatPreview = [
  {
    id: "1",
    user: "sunnyvale_",
    source: "twitch" as const,
    text: "LET'S GO that round was filthy",
    time: "10:24 AM",
    tone: "peach",
  },
  {
    id: "2",
    user: "clutchkingau",
    source: "kick" as const,
    text: "OCE represent. Clutch Club in the building.",
    time: "10:24 AM",
    tone: "sun",
  },
  {
    id: "3",
    user: "peachyaim",
    source: "youtube" as const,
    text: "Watching from papakow.com. This vibe is home.",
    time: "10:25 AM",
    tone: "sky",
  },
  {
    id: "4",
    user: "ClutchBot",
    source: "bot" as const,
    text: "Discord is open — come hang with The Clutch Club.",
    href: "https://discord.gg/VMYGePuF6C",
    time: "10:26 AM",
    tone: "coral",
  },
] as const;

export type ChatTone = (typeof chatPreview)[number]["tone"];
