import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import SmoothScroll from "../components/SmoothScroll";
import TeamClient from "./TeamClient";
import Reveal from "../components/Reveal";

export default function OurTeamPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav isLightHero={true} />
      <main className="relative pt-24 min-h-screen bg-[var(--paper)]">
        <section className="relative bg-[var(--paper)] py-20 md:py-28 border-b border-[var(--line)]">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 text-center">
            <Reveal as="h1" className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light tracking-tight text-[var(--ink)]">
              The People
            </Reveal>
            <Reveal as="p" delay={120} className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-[var(--ivory-dim)]">
              Sampoorna is led by professionals who have sat on the other side of the table — as Development Commissioners, Directors and Planners. That is our unfair advantage, and yours.
            </Reveal>
          </div>
        </section>
        <TeamClient />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
