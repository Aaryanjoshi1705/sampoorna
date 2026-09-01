import type { Metadata } from "next";
import Nav from "../components/Nav";
import Cursor from "../components/Cursor";
import SmoothScroll from "../components/SmoothScroll";
import ExpertiseClient from "./ExpertiseClient";

export const metadata: Metadata = {
  title: "Our Expertise | SEZ, IFSC, Customs, Tax & Business Advisory Services - Sampoorna SEZ",
  description:
    "From SEZ approvals and customs clearance to GST, audit, and business advisory — Sampoorna's full range of SEZ consultancy and compliance services in one place.",
  alternates: { canonical: "https://sampoornasez.com/our-expertise" },
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "SEZ and Business Compliance Consultancy",
  provider: {
    "@type": "ProfessionalService",
    name: "Sampoorna SEZ Consultancy Services",
    telephone: "+91-9930466732",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Options Primo, 202, Marol Industrial Area, MIDC Cross Road No. 21, Near Vijay Nagar Flyover Bridge",
      addressLocality: "Andheri East, Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400093",
      addressCountry: "IN",
    },
  },
  areaServed: "IN",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "SEZ and Compliance Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEZ Management & Operational Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEZ Online Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DCR/Planning Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Advisory" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Consulting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Process Consulting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Plan Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Setup in India" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax & Regulatory Compliance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Audit & Assurance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "GST Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maintain My Business" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Other Services" } },
    ],
  },
};

export default function OurExpertisePage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />

      {/* Service & OfferCatalog structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />

      <main className="relative">
        {/* ---------------- PAGE HEADER ---------------- */}
        <header className="relative flex h-[50vh] min-h-[380px] items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/port-night.jpg)" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,20,0.55),rgba(6,10,20,0.6),rgba(6,10,20,0.9))]" />
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10">
            <p className="eyebrow mb-5 !text-[#a9c2e6]">Services · Full Spectrum</p>
            <h1 className="max-w-4xl font-display text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.02] tracking-tight text-white text-balance">
              Our Expertise
            </h1>
          </div>
        </header>

        <ExpertiseClient />
      </main>
    </SmoothScroll>
  );
}
