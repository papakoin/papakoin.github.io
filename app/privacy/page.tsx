import type { Metadata } from "next";
import { SunIcon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for PapaKow Bot (ClutchBot) and ${site.community}.`,
};

export default function PrivacyPage() {
  return (
    <main className="bg-cream">
      <article className="mx-auto max-w-3xl px-6 pt-32 pb-16 sm:px-10 sm:pt-36 sm:pb-24">
        <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-charcoal/55 uppercase">
          <SunIcon size={14} className="text-sun-deep" />
          Privacy
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-charcoal">
          Privacy Policy
        </h1>
        <p className="mt-3 text-muted">
          PapaKow Bot (“ClutchBot”) · {site.community} · Last updated 1
          September 2026
        </p>

        <section className="mt-12 space-y-10 text-[17px] leading-relaxed text-charcoal/85">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-charcoal uppercase">
              What PapaKow Bot is
            </h2>
            <p className="mt-3">
              PapaKow Bot is a private, self-hosted chat bot built and operated
              by PapaKow for The Clutch Club community. It connects to
              PapaKow&apos;s own accounts on Twitch, Kick and YouTube to run
              chat commands, moderate chat and show stream alerts during
              PapaKow&apos;s live streams. It is not offered as a product or
              service to anyone else.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-charcoal uppercase">
              What data it accesses
            </h2>
            <p className="mt-3">
              With PapaKow&apos;s explicit authorization, the bot reads public
              live chat messages on PapaKow&apos;s channels and sends messages
              and moderation actions (such as removing a message) on
              PapaKow&apos;s behalf. On YouTube this uses the YouTube Data API
              with the youtube.force-ssl scope, authorized by the channel owner
              only.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-charcoal uppercase">
              What data it stores
            </h2>
            <p className="mt-3">
              Sign-in tokens for PapaKow&apos;s own accounts are stored only on
              PapaKow&apos;s personal computer and are never transmitted
              anywhere else. The bot keeps a local log of stream events (for
              example follows, subscriptions and raids) on that same computer
              for PapaKow&apos;s own stream analytics. Chat messages are
              processed in the moment and are not retained as a data set.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-charcoal uppercase">
              What it does not do
            </h2>
            <p className="mt-3">
              PapaKow Bot does not sell, share, publish or transfer any data to
              third parties. It does not track viewers, build profiles, serve
              ads or collect personal information from chat participants beyond
              the public messages a platform already displays. Google user data
              accessed through the YouTube API is used only to operate live chat
              on PapaKow&apos;s channel, is not shared with anyone, and is not
              used for any other purpose. Its use of information received from
              Google APIs adheres to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                className="font-medium text-charcoal underline decoration-sun decoration-2 underline-offset-2"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-charcoal uppercase">
              Revoking access
            </h2>
            <p className="mt-3">
              PapaKow can revoke the bot&apos;s access at any time via{" "}
              <a
                href="https://myaccount.google.com/permissions"
                className="font-medium text-charcoal underline decoration-sun decoration-2 underline-offset-2"
              >
                Google account permissions
              </a>
              , Twitch connection settings, or the Kick developer dashboard.
              Revoking access immediately stops the bot on that platform.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-charcoal uppercase">
              Contact
            </h2>
            <p className="mt-3">
              Questions about this policy:{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-charcoal underline decoration-sun decoration-2 underline-offset-2"
              >
                {site.email}
              </a>
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
