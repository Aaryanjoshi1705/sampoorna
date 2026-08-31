import { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import SmoothScroll from "../components/SmoothScroll";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | SEZ, IFSC & Compliance Services - Sampoorna SEZ",
  description: "From establishing a Special Economic Zone to setting up an IFSC unit and staying compliant year after year — explore how Sampoorna supports Developers, Co-Developers, and SEZ Units at every stage.",
  alternates: {
    canonical: "https://sampoornasez.com/services",
  },
};

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav isLightHero={true} />
      <main className="relative min-h-screen">
        <ServicesClient />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
