import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero, Tiles, Steps, FAQ, FinalCTA, Reviews, MobilePolicies } from "@/components/sections";
import { cities, site, pricingRules } from "@/data/site";
import cityContent from "@/data/cities-content.json";

export function generateStaticParams() { return cities.map((c) => ({ city: c.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params; const c = cities.find((x) => x.slug === city);
  if (!c) return {};
  return {
    title: `Mobile Dog & Cat Grooming in ${c.name}, ${c.state}`,
    description: `Pet Rinse Repeat brings professional mobile dog grooming to your driveway in ${c.name}, ${c.state}. Full-service grooms, baths, desheds, and cat-only mobile grooming. Book online.`,
    alternates: { canonical: `/service-areas/${c.slug}/` },
  };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params; const c = cities.find((x) => x.slug === city);
  if (!c) notFound();
  const where = `${c.name}, ${c.state}`;
  type Mark = string | { name: string; note?: string };
  const local = (cityContent as { slug: string; neighborhoods: string[]; landmarks: Mark[] }[]).find((x) => x.slug === c.slug);
  const hoods = local?.neighborhoods ?? [];
  const marks = (local?.landmarks ?? []).map((m) => (typeof m === "string" ? { name: m } : m));
  return (
    <>
      <Hero kick={`Mobile grooming in ${where}`} title={<>Their spa.<br /><span className="accent">Your {c.name} driveway.</span></>}
        blurb={`Professional dog grooming that comes to you in ${where}. No car ride, no kennel wait — the groomer parks outside and your dog never leaves home.`}
        service="mobile" cta="Book mobile grooming" secondary={{ href: "/cat-grooming/", label: "Cat grooming" }}
        img="van-side" alt="The Pet Rinse Repeat mobile grooming van" placement={`city_hero_${c.slug}`} />
      <Tiles items={[
        { icon: "home", t: "Convenient & easy", d: `We come to your home or office in ${c.name}.` },
        { icon: "paw", t: "Stress-less grooming", d: "A familiar, comfortable setting for your dog." },
        { icon: "sparkle", t: "Professional care", d: "Expert groomers with a gentle touch." },
      ]} />
      <section className="wrap py-14 grid lg:grid-cols-2 gap-6">
        <div className="card p-6 md:p-8 flex flex-col gap-3">
          <h2 className="disp text-[26px] m-0">What we offer in {c.name}</h2>
          <ul className="m-0 p-0 list-none grid gap-2 text-navy font-semibold">
            <li>• Full-service haircuts and bath & blow dry</li>
            <li>• De-shedding for double coats</li>
            <li>• Flat-coat bath & brush out, flat rate by weight</li>
            <li>• Nail care</li>
            <li>• Cat-only mobile grooming with Here Kitty</li>
          </ul>
          <p className="text-ink-soft m-0 text-[15px]">{pricingRules.summary} <Link href="/pricing/" className="text-pink font-semibold">See pricing</Link>.</p>
        </div>
        <div className="card p-6 md:p-8 flex flex-col gap-3">
          <h2 className="disp text-[26px] m-0">Prefer the salon?</h2>
          <p className="text-ink-soft m-0 leading-relaxed">Our full-service salon is at {site.address.street}, {site.address.city}. {site.salonHours}.</p>
          <Link href="/salon-grooming/" className="btn btn-ghost btn-sm self-start">Salon grooming</Link>
        </div>
      </section>
      {(hoods.length > 0 || marks.length > 0) && (
        <section className="wrap pb-14">
          <div className="card-tint p-6 md:p-8 grid md:grid-cols-5 gap-8">
            {hoods.length > 0 && (
              <div className="md:col-span-2">
                <p className="kick m-0">Where we go</p>
                <h2 className="disp text-[24px] m-0 mb-3">Neighborhoods we serve in {c.name}</h2>
                <ul className="m-0 p-0 list-none flex flex-wrap gap-2">{hoods.map((h) => <li key={h} className="bg-white rounded-full px-3 py-1 text-sm font-semibold text-navy border border-navy/10">{h}</li>)}</ul>
                <p className="text-ink-soft text-[14px] mt-3 m-0">Not listed? We likely still come to you — book and we&rsquo;ll confirm.</p>
              </div>
            )}
            {marks.length > 0 && (
              <div className="md:col-span-3">
                <p className="kick m-0">Out and about</p>
                <h2 className="disp text-[24px] m-0 mb-3">Fresh groom, then a walk in {c.name}</h2>
                <ul className="m-0 p-0 list-none grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {marks.map((m) => (
                    <li key={m.name} className="flex gap-2.5 items-start">
                      <span aria-hidden="true" className="text-pink mt-[3px]">●</span>
                      <span><span className="font-semibold text-navy">{m.name}</span>{m.note && <span className="block text-ink-soft text-[14px]">{m.note}</span>}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
      <Steps title={`Booking in ${c.name} is simple.`} steps={[
        { icon: "chat", t: "Tell us about your pet", d: "Share a few details and your address." },
        { icon: "calendar", t: "Pick your time", d: `Choose from real availability for ${c.name}.` },
        { icon: "van", t: "We come to you", d: "Your dog gets a fresh, clean look at home." },
      ]} />
      <MobilePolicies city={c.name} />
      <Reviews service="mobile" title={<>What mobile clients <span className="accent">are saying.</span></>} />
      <FAQ items={[
        { q: `Do you serve all of ${c.name}?`, a: `We serve ${where} and the surrounding Kansas City metro. If you're on the edge of our route, book and we'll confirm, or call ${site.phone}.` },
        { q: "How is mobile grooming priced?", a: pricingRules.summary + " Mobile full-service grooms start at $130/hr, plus a $" + site.travelFee + " travel fee per visit." },
        { q: `How soon can you come to ${c.name}?`, a: "Mobile routes typically book 1–3 weeks out depending on the area. Booking online shows real availability for your address." },
        { q: "Do you groom cats in " + c.name + "?", a: "Yes — through Here Kitty, our cat-only mobile grooming service, on its own van and schedule." },
      ]} />
      <FinalCTA service="mobile" placement={`city_final_${c.slug}`} title={<>Grooming in {c.name}, <span className="accent">done at home.</span></>} />
    </>
  );
}
