import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Tiles, Included, Steps, FAQ, FinalCTA } from "@/components/sections";
import { site, cities, pricingRules } from "@/data/site";

export const metadata: Metadata = {
  title: "Mobile Dog Grooming in Kansas City — We Come to You",
  description: "Professional mobile dog grooming that comes to your driveway across the Kansas City metro. Full-service haircuts, baths, and desheds in a climate-controlled van. Book online.",
  alternates: { canonical: "/mobile-grooming/" },
};

export default function Page() {
  return (
    <>
      <Hero kick="Mobile dog grooming" title={<>Their spa.<br /><span className="accent">Your driveway.</span></>}
        blurb="Professional dog grooming that comes to you in the Kansas City metro. No car ride, no kennel wait, no drop-off."
        service="mobile" cta="Book mobile grooming" secondary={{ href: "/service-areas/", label: "Check your area" }}
        img="van-curbside" alt="The Pet Rinse Repeat van parked at a client's home" imgPos="object-[center_60%]" placement="mobile_hero" />
      <Tiles items={[
        { icon: "home", t: "Convenient & easy", d: "We come to your home or office." },
        { icon: "paw", t: "Stress-less grooming", d: "A familiar, comfortable setting for your dog." },
        { icon: "sparkle", t: "Professional care", d: "Expert groomers with a gentle touch." },
      ]} />
      <Included title={<>A full refresh, <span className="accent">right outside.</span></>}
        items={["Breed-appropriate haircut", "Bath & blow dry", "De-shedding (as needed)", "Ear cleaning", "Sanitary trim", "Nail trim (add-on)"]}
        img="van-interior" alt="Grooming table and lighting inside the Pet Rinse Repeat van" />
      <Steps title="Booking mobile grooming is simple." steps={[
        { icon: "chat", t: "Tell us about your pet", d: "Share a few details and your location." },
        { icon: "calendar", t: "Pick your time", d: "Choose from real availability for your area." },
        { icon: "van", t: "We come to you", d: "Your dog gets a fresh, clean look at home." },
      ]} />
      <section className="wrap pb-14 md:pb-20 grid lg:grid-cols-2 gap-8">
        <div className="card p-6 md:p-8 flex flex-col gap-3">
          <h2 className="disp text-[26px] m-0">How mobile pricing works</h2>
          <p className="text-ink-soft m-0 leading-relaxed">{pricingRules.summary} Full-service grooms start at <strong className="text-navy">$130/hr</strong>; oodles at $140/hr; large desheds at $170/hr. Flat-coat bath & brush is a flat rate by weight, from $100.</p>
          <Link href="/pricing/" className="btn btn-ghost btn-sm self-start">See full pricing</Link>
        </div>
        <div className="card p-6 md:p-8 flex flex-col gap-3">
          <h2 className="disp text-[26px] m-0">Where we go</h2>
          <p className="text-ink-soft m-0 leading-relaxed">Both sides of the state line: {cities.slice(0, 8).map((c) => c.name).join(", ")}, and more.</p>
          <Link href="/service-areas/" className="btn btn-ghost btn-sm self-start">All service areas</Link>
        </div>
      </section>
      <FAQ items={[
        { q: "Where does the grooming happen?", a: "In the van, parked at your home or office. Your dog never leaves your property." },
        { q: "How long does a mobile groom take?", a: "It depends on size, coat, and condition. You'll see an estimated duration for each service when you book." },
        { q: "How is it priced?", a: pricingRules.summary },
        { q: "What areas do you serve?", a: `The Kansas City metro on both sides of the state line. Call ${site.phone} if you don't see your city listed.` },
      ]} />
      <FinalCTA service="mobile" placement="mobile_final" title={<>Let the groomer <span className="accent">come to you.</span></>} />
    </>
  );
}
