import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Tiles, Steps, FAQ, FinalCTA, Check, Reviews } from "@/components/sections";
import BookButton from "@/components/BookButton";
import { site, catPricing } from "@/data/site";

export const metadata: Metadata = {
  title: "Mobile Cat Grooming in Kansas City — Here Kitty",
  description: "Gentle, cat-specific mobile grooming that comes to you across the KC metro. Haircuts, baths, brush-outs, and nail trims in a calm, cat-only mobile spa. Book online.",
  alternates: { canonical: "/cat-grooming/" },
};

export default function Page() {
  return (
    <>
      <Hero kick="Mobile cat grooming" title={<>Big purrs.<br /><span className="accent">Less fuss.</span></>}
        blurb="Gentle, cat-specific grooming that comes to you in the KC metro, from Here Kitty, our cat-only mobile service."
        service="cat" cta="Book cat grooming" secondary={{ href: "/pricing/#cat", label: "See cat pricing" }}
        img="cat-persian-salon" alt="A black-and-white Persian cat lying calmly on the grooming table" imgPos="object-[center_40%]" placement="cat_hero" />
      <Tiles items={[
        { icon: "cat", t: "Cat-focused equipment", d: "Tools and table set up for cats, not borrowed from dogs." },
        { icon: "heart", t: "Experienced cat groomer", d: "Calm handling from someone who grooms cats all day." },
        { icon: "shield", t: "A calm, private environment", d: "No barking, no strangers, no waiting room." },
      ]} />
      <section className="wrap py-14 md:py-20 grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="disp text-[30px] md:text-[38px] m-0">Care tailored <span className="accent">to your cat.</span></h2>
          <p className="text-ink-soft leading-relaxed m-0">A calm, low-stress grooming experience in our cat-equipped mobile spa, designed with your cat's comfort and safety in mind.</p>
          <ul className="m-0 p-0 list-none flex flex-col gap-2">
            {["Cat-focused equipment", "Experienced cat groomer", "A calm, private environment"].map((i) => <li key={i} className="flex gap-2.5 items-start font-semibold text-navy"><Check />{i}</li>)}
          </ul>
        </div>
        <div className="card p-6 md:p-8 flex flex-col gap-3">
          <h2 className="disp text-[24px] m-0">Grooming options</h2>
          <ul className="m-0 p-0 list-none divide-y divide-navy/5">
            {catPricing.map((p) => (
              <li key={p.name} className="py-2.5 flex justify-between gap-4 items-baseline">
                <span className="text-navy font-semibold">{p.name}{p.note && <span className="block text-ink-soft text-sm font-normal">{p.note}</span>}</span>
                <span className="font-display font-extrabold text-navy whitespace-nowrap">${p.rate}</span>
              </li>
            ))}
          </ul>
          <BookButton service="cat" placement="cat_menu" className="self-start mt-2" />
        </div>
      </section>
      <Steps title="What to expect" steps={[
        { icon: "chat", t: "Tell us about your cat", d: "Coat, temperament, and what you need." },
        { icon: "calendar", t: "We schedule a convenient time", d: "Real availability, booked online." },
        { icon: "cat", t: "We groom in a calm, cat-friendly space", d: "Not all cats are comfortable with every service; we'll talk through the best option for yours." },
      ]} />
      <Reviews service="cat" title={<>Calm cats, <span className="accent">happy owners.</span></>} />
      <FAQ items={[
        { q: "Is this the same as the salon's cat grooming?", a: "No — Here Kitty is a separate, cat-only mobile service that comes to you. The salon also grooms cats on site, with its own menu and pricing." },
        { q: "How do I book?", a: `Online through the Here Kitty booking page, or call ${site.phone}.` },
      ]} />
      <p className="wrap pb-6 text-sm text-ink-soft">Here Kitty also has its own site: <Link href={site.herekitty.url} className="text-pink font-semibold">herekittygrooming.com</Link></p>
      <FinalCTA service="cat" placement="cat_final" title={<>Ready for a <span className="accent">calmer groom?</span></>} />
    </>
  );
}
