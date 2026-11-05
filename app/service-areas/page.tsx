import type { Metadata } from "next";
import Link from "next/link";
import { Hero, FinalCTA } from "@/components/sections";
import { cities } from "@/data/site";

export const metadata: Metadata = { title: "Mobile Grooming Service Areas — Kansas City Metro", description: "Pet Rinse Repeat mobile dog grooming serves the Kansas City metro on both sides of the state line. Find your city.", alternates: { canonical: "/service-areas/" } };

export default function Page() {
  const mo = cities.filter((c) => c.state === "MO"); const ks = cities.filter((c) => c.state === "KS");
  return (
    <>
      <Hero kick="Service areas" title={<>We come to <span className="accent">your neighborhood.</span></>}
        blurb="Mobile dog grooming across the Kansas City metro, Missouri and Kansas. Find your city below, or just book — we'll confirm your address."
        service="mobile" cta="Book mobile grooming" img="van-curbside" alt="The grooming van parked on a residential street" imgPos="object-[center_60%]" placement="areas_hero" />
      <section className="wrap py-14 grid md:grid-cols-2 gap-8">
        {[["Missouri", mo], ["Kansas", ks]].map(([label, list]) => (
          <div key={label as string} className="card p-6 md:p-8">
            <h2 className="disp text-[24px] m-0 mb-4">{label as string}</h2>
            <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
              {(list as typeof cities).map((c) => <li key={c.slug}><Link href={`/service-areas/${c.slug}/`} className="inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-full bg-lavender border border-navy/10 text-navy font-semibold text-[15px] hover:border-pink hover:text-pink active:bg-pink-soft no-underline">{c.name} <span aria-hidden="true" className="text-pink">→</span></Link></li>)}
            </ul>
          </div>
        ))}
      </section>
      <FinalCTA service="mobile" placement="areas_final" title={<>Don&apos;t see your city? <span className="accent">Ask us.</span></>} blurb="We add neighborhoods as routes fill in. Call or book and we'll confirm." />
    </>
  );
}
