import type { Metadata } from "next";
import Link from "next/link";
import { Hero, TrustStrip, FinalCTA, Reviews, Icon } from "@/components/sections";
import Img from "@/components/Img";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "About Pet Rinse Repeat", description: "Pet Rinse Repeat is a Kansas City grooming company founded by professional groomer Amy Ramatowski and business director Vernon Doku: a mobile van fleet, a North Kansas City salon, and cat-only mobile grooming.", alternates: { canonical: "/about/" } };

/* Facts below come from the old petrinserepeat.com/about-us/ page (Nov 5, 2026). Don't add claims that aren't on it. */
export default function Page() {
  return (
    <>
      <Hero kick="About us" title={<>Locally owned.<br /><span className="accent">Dog approved.</span></>}
        blurb="Pet Rinse Repeat is a Kansas City grooming company with a mobile van fleet, a full-service salon in North Kansas City, and a cat-only mobile service, Here Kitty."
        service="mobile" cta="Book mobile grooming" secondary={{ href: "/salon-grooming/", label: "Visit the salon" }}
        img="van-team" alt="The Pet Rinse Repeat team beside the mobile grooming van" placement="about_hero" />
      <TrustStrip />

      <section className="wrap py-14 md:py-20 grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 flex flex-col gap-4">
          <p className="kick m-0">Our story</p>
          <h2 className="disp text-[30px] md:text-[38px] m-0">A calmer kind of <span className="accent">grooming.</span></h2>
          <p className="text-ink-soft m-0 leading-relaxed text-lg">Pet Rinse Repeat was started by <strong className="text-navy">Amy Ramatowski</strong>, a professional groomer and the founder of the 501(c)(3) animal rescue People Helping Paws, and <strong className="text-navy">Vernon Doku</strong>, an IT consultant and business director. The idea was simple: step away from conventional, high-volume grooming and give every pet a relaxed, one-on-one experience.</p>
          <p className="text-ink-soft m-0 leading-relaxed">That started with a mobile van in the driveway and grew into a fleet, a full-service salon in North Kansas City, and Here Kitty, a mobile service that grooms only cats. Through all of it the approach hasn&rsquo;t changed — a gentle, calm environment, skilled hands, and pricing that reflects the actual time your pet needs.</p>
          <p className="text-ink-soft m-0 leading-relaxed">We&rsquo;re based in Kansas City, MO, and we&rsquo;re proud to be a familiar face on both sides of the state line.</p>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Img name="team-event" alt="A Pet Rinse Repeat groomer with a small white dog at a community event" sizes="(min-width: 1024px) 40vw, 100vw" className="w-full h-[260px] object-cover object-[center_40%] rounded-[24px] shadow-card" />
          <div className="card p-5 flex flex-col gap-2 text-[15px]">
            <span className="kick m-0">The salon</span>
            <span className="font-semibold text-navy">{site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}</span>
            <span className="text-ink-soft">{site.salonHours}</span>
            <span className="text-ink-soft">Mobile: {site.mobileHours}</span>
            <a href={site.phoneHref} className="text-pink font-semibold">{site.phone}</a>
          </div>
        </div>
      </section>

      <section className="wrap pb-14 md:pb-20">
        <p className="kick m-0">How we work</p>
        <h2 className="disp text-[28px] md:text-[34px] m-0 mb-6">What you can <span className="accent">count on.</span></h2>
        <ul className="m-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "paw", t: "One pet at a time", d: "Salon appointments are one-on-one. No kennels full of waiting dogs, no assembly line." },
            { icon: "sparkle", t: "Gentle, calm, loving", d: "A quiet environment and a patient groomer, especially for anxious or senior pets." },
            { icon: "calendar", t: "Priced on real time", d: "Your quote reflects the time your pet actually needs — coat condition, size, and temperament. Mobile costs a little more for the doorstep convenience." },
            { icon: "van", t: "Flexible scheduling", d: "Mobile routes across the metro, salon hours seven days a week, and online booking any time." },
          ].map((x) => (
            <li key={x.t} className="card p-5 flex flex-col gap-2">
              <span className="icon-tile"><Icon name={x.icon as never} color="#E5308D" /></span>
              <span className="font-display font-bold text-navy text-[17px]">{x.t}</span>
              <p className="m-0 text-ink-soft text-[15px] leading-relaxed">{x.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap pb-14 md:pb-20 grid lg:grid-cols-3 gap-4">
        {[
          { href: "/mobile-grooming/", t: "Mobile grooming", d: "Our vans come to your driveway across the KC metro, both sides of the state line." },
          { href: "/salon-grooming/", t: "Groomery & Boutique", d: `Full-service salon at ${site.address.street}, ${site.address.city}.` },
          { href: "/cat-grooming/", t: "Here Kitty", d: "Cat-only mobile grooming with a groomer who works with cats all day." },
        ].map((x) => (
          <Link key={x.href} href={x.href} className="card p-6 flex flex-col gap-2 no-underline hover:border-pink">
            <span className="disp text-[22px] text-navy">{x.t}</span>
            <span className="text-ink-soft text-[15px] leading-relaxed">{x.d}</span>
            <span className="text-pink font-semibold text-sm mt-1">Learn more →</span>
          </Link>
        ))}
      </section>

      <Reviews title={<>Why people <span className="accent">keep coming back.</span></>} />
      <section className="wrap pb-14">
        <div className="card-tint p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1"><h2 className="disp text-[24px] m-0">Want to groom with us?</h2><p className="text-ink-soft m-0 mt-1">We&rsquo;re always glad to hear from experienced groomers and bathers.</p></div>
          <Link href="/careers/" className="btn btn-ghost btn-sm self-start md:self-auto">Careers</Link>
        </div>
      </section>
      <FinalCTA service="salon" placement="about_final" />
    </>
  );
}
