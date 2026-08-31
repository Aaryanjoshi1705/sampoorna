import type { Metadata } from "next";
import ClientAbout from "./ClientAbout";

export const metadata: Metadata = {
  title: "About Sampoorna SEZ Consultancy Services | SEZ & IFSC Experts, Mumbai",
  description:
    "Sampoorna SEZ Consultancy Services is a Mumbai-based team of former SEZ Development Commissioners, Customs officials, and regulatory experts, offering end-to-end SEZ approvals, IFSC setup, and compliance services.",
  alternates: { canonical: "https://sampoornasez.com/about" },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sampoorna SEZ Consultancy Services",
  description:
    "End-to-end SEZ, IFSC, customs, and compliance consultancy services in India.",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Options Primo, 202, Marol Industrial Area, MIDC Cross Road No. 21, Near Vijay Nagar Flyover Bridge",
    addressLocality: "Andheri East, Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400093",
    addressCountry: "IN",
  },
  telephone: "+91-9930466732",
  email: "info@sampoornasez.com",
  areaServed: "IN",
  slogan: "Your Partner in Compliance",
};

export default function AboutPage() {
  return (
    <>
      {/* Organization / ProfessionalService structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
      />
      <ClientAbout />
    </>
  );
}
