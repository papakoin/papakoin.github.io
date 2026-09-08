import { SunIcon } from "@/components/icons";

export function SectionHeading({
  eyebrow,
  title,
  kicker,
}: {
  eyebrow: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="max-w-xl">
      <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-charcoal/55 uppercase">
        <SunIcon size={14} className="text-sun-deep" />
        {eyebrow}
      </p>
      <h2 className="font-sans text-4xl font-semibold tracking-tight text-balance text-charcoal sm:text-5xl">
        {title}
      </h2>
      {kicker ? (
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">
          {kicker}
        </p>
      ) : null}
    </div>
  );
}
