import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import SmoothScroll from "../components/SmoothScroll";
import IfscClient from "./IfscClient";

export default function IfscPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav isLightHero={true} />
      <main className="relative bg-[var(--ink)] min-h-screen">
        <IfscClient />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
