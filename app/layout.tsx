import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site, cities } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Mobile & Salon Pet Grooming | Kansas City`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, images: [{ url: "/media/van-side.jpg", width: 1600, height: 1200 }] },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/** Set NEXT_PUBLIC_GTM_ID in Vercel (production only) to turn on Google Tag Manager. */
const GTM = process.env.NEXT_PUBLIC_GTM_ID;

const a = site.address;
// Build the graph plainly (two businesses: salon at the storefront, mobile as a service-area business)
const salon = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  additionalType: "https://schema.org/PetStore",
  "@id": `${site.url}/#salon`,
  name: `${site.name} Groomery & Boutique`,
  description: "Full-service dog and cat grooming salon in North Kansas City.",
  url: `${site.url}/salon-grooming/`,
  telephone: "+1-816-606-4951",
  email: site.email,
  image: `${site.url}/media/salon-storefront.jpg`,
  logo: `${site.url}/media/logo-groomery.png`,
  address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.city, addressRegion: a.state, postalCode: a.zip, addressCountry: "US" },
  openingHours: site.salonHoursSchema,
  sameAs: Object.values(site.social),
  aggregateRating: { "@type": "AggregateRating", ratingValue: site.google.salon.rating, reviewCount: site.google.salon.reviewCount },
  priceRange: "$$",
};
const mobile = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#mobile`,
  name: `${site.name} Mobile Grooming`,
  description: "Mobile dog grooming that comes to your driveway across the Kansas City metro.",
  url: `${site.url}/mobile-grooming/`,
  telephone: "+1-816-606-4951",
  image: `${site.url}/media/van-side.jpg`,
  logo: `${site.url}/media/logo-mobile.png`,
  areaServed: cities.map((c) => ({ "@type": "City", name: `${c.name}, ${c.state}` })),
  sameAs: Object.values(site.social),
  aggregateRating: { "@type": "AggregateRating", ratingValue: site.google.mobile.rating, reviewCount: site.google.mobile.reviewCount },
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/plus-jakarta-sans-latin-800-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/plus-jakarta-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="icon" href="/media/favicon.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([salon, mobile]) }} />
        {GTM && (
          <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');` }} />
        )}
      </head>
      <body>
        {GTM && <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript>}
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
