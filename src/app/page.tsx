import { Hero } from "@/components/hero";

// Homepage is the hero only (Mark, 2026-11-06): nothing below it — no
// sections, no CTA band, no database note. Every division, tool and
// page is still reachable from the header navigation and from the
// footer on the other pages. The footer is hidden on this page too
// (see src/components/footer.tsx), so the page ends at the hero.
export default function Home() {
  return (
    <div>
      <Hero />
    </div>
  );
}
