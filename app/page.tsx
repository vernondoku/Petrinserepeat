import { Hero, Tiles, ServiceCards, Included, Steps, TrustStrip, FAQ, FinalCTA } from "@/components/sections";

export default function Page() {
  return (
    <>
      <Hero kick="Kansas City pet grooming" title={<>Great grooming.<br /><span className="accent">Zero hassle.</span></>}
        blurb="Mobile dog grooming that comes to your driveway, a full-service salon in North Kansas City, and cat-only mobile grooming. Pick the one that fits your pet and book online."
        service="mobile" cta="Book mobile grooming" secondary={{ href: "/salon-grooming/", label: "Visit the salon" }}
        img="van-side" alt="The Pet Rinse Repeat mobile grooming van" placement="home_hero" />
      <Tiles items={[
        { icon: "home", t: "Convenient & easy", d: "We come to your home or office." },
        { icon: "paw", t: "Stress-less grooming", d: "A calm, familiar setting for your dog." },
        { icon: "sparkle", t: "Professional care", d: "Expert groomers with a gentle touch." },
      ]} />
      <TrustStrip />
      <ServiceCards placement="home_services" />
      <Included title={<>A full refresh, <span className="accent">right outside.</span></>}
        intro="Every full-service groom covers the basics, so your dog comes out clean, comfortable, and smelling great."
        items={["Breed-appropriate haircut", "Bath & blow dry", "De-shedding (as needed)", "Ear cleaning", "Sanitary trim", "Nail trim (add-on)"]}
        img="van-interior" alt="Inside the grooming van: table, lighting, and the Pet Rinse Repeat logo on the wall" />
      <Steps title="Booking is simple." steps={[
        { icon: "chat", t: "Tell us about your pet", d: "Pick a service and share a few details about your dog or cat." },
        { icon: "calendar", t: "Choose a time", d: "See real availability and grab the slot that works for you." },
        { icon: "van", t: "We take it from there", d: "Your groomer comes to you, or you drop by the salon. Fresh, clean, happy." },
      ]} />
      <FAQ />
      <FinalCTA service="mobile" placement="home_final" />
    </>
  );
}
