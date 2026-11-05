import type { Metadata } from "next";
import { Hero, TrustStrip, FinalCTA } from "@/components/sections";
import Img from "@/components/Img";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "About Pet Rinse Repeat", description: "Kansas City pet grooming, mobile and salon. Meet Pet Rinse Repeat: a locally owned groomer with a mobile van fleet and a North Kansas City storefront.", alternates: { canonical: "/about/" } };

/* About copy is a placeholder until the content pull from the old site is reviewed. Only verified facts here. */
export default function Page() {
  return (
    <>
      <Hero kick="About us" title={<>Locally owned.<br /><span className="accent">Dog approved.</span></>}
        blurb="Pet Rinse Repeat is a Kansas City grooming company with a mobile van fleet, a full-service salon in North Kansas City, and a cat-only mobile service, Here Kitty."
        service="mobile" cta="Book mobile grooming" secondary={{ href: "/salon-grooming/", label: "Visit the salon" }}
        img="van-team" alt="The Pet Rinse Repeat team beside the mobile grooming van" placement="about_hero" />
      <TrustStrip />
      <section className="wrap py-14 md:py-20 grid lg:grid-cols-2 gap-6 items-stretch">
        <Img name="salon-storefront" alt="The Groomery & Boutique storefront on Swift Street" sizes="(min-width: 1024px) 50vw, 100vw" className="w-full h-[300px] lg:h-full object-cover rounded-[24px] shadow-card" />
        <div className="card p-6 md:p-8 flex flex-col gap-3">
          <h2 className="disp text-[28px] md:text-[34px] m-0">Three ways to groom</h2>
          <p className="text-ink-soft m-0 leading-relaxed"><strong className="text-navy">Mobile.</strong> Our vans come to your driveway across the KC metro, both sides of the state line.</p>
          <p className="text-ink-soft m-0 leading-relaxed"><strong className="text-navy">Salon.</strong> The Groomery &amp; Boutique at {site.address.street}, {site.address.city} — {site.salonHours}.</p>
          <p className="text-ink-soft m-0 leading-relaxed"><strong className="text-navy">Cats.</strong> Here Kitty, our cat-only mobile grooming service, with a groomer who works with cats all day.</p>
        </div>
      </section>
      <FinalCTA service="salon" placement="about_final" />
    </>
  );
}
