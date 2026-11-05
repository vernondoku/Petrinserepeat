import type { Metadata } from "next";
import { Hero, Tiles, FAQ } from "@/components/sections";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Pet Boarding in North Kansas City", description: "Pet boarding at the Pet Rinse Repeat salon in North Kansas City. Call for availability and rates.", alternates: { canonical: "/pet-boarding/" } };

/* Boarding pricing has not been provided yet (MoeGo lists it at $0), so this page asks people to call. Replace with rates when Vern supplies them. */
export default function Page() {
  return (
    <>
      <Hero kick="Pet boarding" title={<>A safe stay,<br /><span className="accent">close to home.</span></>}
        blurb={`Boarding at our North Kansas City salon. Call ${site.phone} for availability and rates.`}
        secondary={{ href: site.phoneHref, label: `Call ${site.phone}` }}
        img="salon-storefront" alt="The Pet Rinse Repeat salon storefront" placement="boarding_hero" />
      <Tiles tint items={[
        { icon: "pin", t: "At the salon", d: `${site.address.street}, ${site.address.city}.` },
        { icon: "scissors", t: "Add a groom", d: "Pair a stay with a bath or full groom before pickup." },
        { icon: "chat", t: "Ask us", d: "Call or email for dates and pricing." },
      ]} />
      <FAQ items={[
        { q: "How do I book boarding?", a: `Call ${site.phone} or email ${site.email} with your dates. Boarding isn't booked online yet.` },
        { q: "Can my dog get groomed during the stay?", a: "Yes — ask when you book and we'll schedule a groom before pickup." },
      ]} />
    </>
  );
}
