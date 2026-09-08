import Link from "next/link";
import { SunIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-cream px-6 pt-32 pb-24 text-center">
      <div>
        <span className="mx-auto mb-6 grid size-14 place-items-center rounded-full bg-sun text-charcoal">
          <SunIcon size={24} />
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-charcoal">
          This page is offline
        </h1>
        <p className="mt-3 text-muted">
          Nothing to see here — head home and hop in chat instead.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-sun px-5 py-3 text-sm font-semibold text-charcoal no-underline"
        >
          Back to papakow
        </Link>
      </div>
    </main>
  );
}
