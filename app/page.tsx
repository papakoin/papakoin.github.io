import { About } from "@/components/about";
import { JoinChat } from "@/components/join-chat";
import { LiveHero } from "@/components/live-hero";
import { NowPlaying } from "@/components/now-playing";

export default function Home() {
  return (
    <main>
      <LiveHero />
      <NowPlaying />
      <About />
      <JoinChat />
    </main>
  );
}
