import type { Metadata } from "next";
import { Hero, Icon, FAQ, FinalCTA, type IconName } from "@/components/sections";
import BookButton from "@/components/BookButton";
import { pricingRules, mobilePricing, salonPricing, catPricing, type Service } from "@/data/site";

export const metadata: Metadata = {
  title: "Grooming Prices — Mobile, Salon & Cat",
  description: "Pet Rinse Repeat grooming prices. Mobile dog grooming $130–$170/hr, salon grooming $100–$140/hr, flat-rate baths by weight, and cat grooming. Hourly services have a one-hour minimum.",
  alternates: { canonical: "/pricing/" },
};

const fmt = (r: { rate: number; per: "hr" | "flat" }) => r.per === "hr" ? `$${r.rate}/hr` : `$${r.rate}`;

function Table({ groups }: { groups: { group: string; items: { name: string; rate: number; per: "hr" | "flat"; note?: string }[] }[] }) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((g) => (
        <div key={g.group}>
          <h3 className="kick m-0 mb-2 text-pink">{g.group}</h3>
          <ul className="m-0 p-0 list-none divide-y divide-navy/5">
            {g.items.map((it) => (
              <li key={it.name} className="py-2.5 flex justify-between gap-4 items-baseline">
                <span className="text-navy font-semibold">{it.name}{it.note && <span className="block text-ink-soft text-sm font-normal">{it.note}</span>}</span>
                <span className="font-display font-extrabold text-navy whitespace-nowrap">{fmt(it)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const cols: { key: Service; icon: IconName; t: string; d: string; from: string }[] = [
    { key: "mobile", icon: "van", t: "Mobile grooming", d: "Convenient, in-driveway grooming with professional, full-service care.", from: "$130–$170/hr" },
    { key: "salon", icon: "scissors", t: "Salon grooming", d: "A complete grooming experience at our North Kansas City salon.", from: "$100–$140/hr" },
    { key: "cat", icon: "cat", t: "Cat grooming", d: "Gentle, cat-specific grooming in our mobile cat spa.", from: "$120–$250" },
  ];
  const factors: { icon: IconName; t: string; d: string }[] = [
    { icon: "paw", t: "Size", d: "Your pet's size and weight." },
    { icon: "sparkle", t: "Coat", d: "Length, thickness, and condition." },
    { icon: "scissors", t: "Service", d: "The grooming services you choose." },
    { icon: "clock", t: "Hands-on time", d: "The time needed for a safe, quality groom." },
  ];
  return (
    <>
      <Hero kick="Pricing" title={<>Great grooming.<br /><span className="accent">Clear expectations.</span></>}
        blurb="Our grooming is priced by your pet's size, coat, and the services you need. Here's exactly how it works, with the rates we charge."
        service="mobile" cta="Book mobile grooming" secondary={{ href: "#salon", label: "Salon rates" }}
        img="van-team" alt="The Pet Rinse Repeat team with the mobile grooming van" placement="pricing_hero" />
      <section className="wrap -mt-6 md:-mt-8 relative z-10">
        <ul className="m-0 p-0 list-none grid md:grid-cols-3 gap-4">
          {cols.map((c) => (
            <li key={c.key} className="card p-6 flex flex-col gap-2 items-start">
              <span className="icon-tile"><Icon name={c.icon} /></span>
              <strong className="disp text-[22px]">{c.t}</strong>
              <span className="text-pink font-bold">{c.from}</span>
              <p className="text-ink-soft m-0 text-[15px] flex-1">{c.d}</p>
              <BookButton service={c.key} placement={`pricing_card_${c.key}`} className="btn-sm">Book now</BookButton>
            </li>
          ))}
        </ul>
      </section>
      <section className="wrap py-14">
        <div className="card-tint p-6 md:p-8">
          <h2 className="disp text-[24px] md:text-[28px] m-0 mb-2">What shapes your quote?</h2>
          <p className="text-ink-soft m-0 mb-6">{pricingRules.summary}</p>
          <ul className="m-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {factors.map((f) => <li key={f.t} className="flex gap-3 items-start"><span className="icon-tile"><Icon name={f.icon} /></span><div><strong className="block text-navy">{f.t}</strong><span className="text-ink-soft text-[15px]">{f.d}</span></div></li>)}
          </ul>
          <ul className="m-0 mt-6 p-0 list-none grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-ink-soft">
            {pricingRules.details.map((d) => <li key={d}>• {d}</li>)}
          </ul>
        </div>
      </section>
      <section className="wrap pb-14 grid lg:grid-cols-2 gap-6 items-start">
        <div id="mobile" className="card p-6 md:p-8 scroll-mt-24">
          <h2 className="disp text-[28px] m-0 mb-1">Mobile grooming</h2>
          <p className="text-ink-soft m-0 mb-5">We come to you. Hourly services: 1-hour minimum, then 15-minute increments.</p>
          <Table groups={mobilePricing} />
          <BookButton service="mobile" placement="pricing_mobile" className="mt-6" />
        </div>
        <div id="salon" className="card p-6 md:p-8 scroll-mt-24">
          <h2 className="disp text-[28px] m-0 mb-1">Salon grooming</h2>
          <p className="text-ink-soft m-0 mb-5">2030 Swift Street, North Kansas City. Hourly services: 1-hour minimum, then 15-minute increments.</p>
          <Table groups={salonPricing} />
          <BookButton service="salon" placement="pricing_salon" className="mt-6" />
        </div>
      </section>
      <section className="wrap pb-14">
        <div id="cat" className="card p-6 md:p-8 scroll-mt-24 max-w-[760px]">
          <h2 className="disp text-[28px] m-0 mb-1">Mobile cat grooming <span className="text-ink-soft text-lg font-sans font-normal">by Here Kitty</span></h2>
          <p className="text-ink-soft m-0 mb-5">Cat-only mobile grooming that comes to you. Flat rates per service.</p>
          <Table groups={[{ group: "Cat services", items: catPricing }]} />
          <BookButton service="cat" placement="pricing_cat" className="mt-6" />
        </div>
      </section>
      <FAQ items={[
        { q: "Why hourly?", a: "Because no two coats are the same. Hourly pricing based on hands-on time means you pay for the work your dog actually needs — no padded flat rates." },
        { q: "What's the minimum?", a: "One hour on hourly services. After that, time is billed in 15-minute increments at a quarter of the hourly rate." },
        { q: "Who decides the deshed size category?", a: "Your groomer, based on your dog's coat and build." },
      ]} />
      <FinalCTA service="mobile" placement="pricing_final" />
    </>
  );
}
