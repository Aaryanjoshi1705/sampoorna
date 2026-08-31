import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import SmoothScroll from "../components/SmoothScroll";
import ContactClient from "./ContactClient";

export default function ContactPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav isLightHero={true} />
      <main className="relative min-h-screen bg-[var(--paper)]">
        <ContactClient />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
