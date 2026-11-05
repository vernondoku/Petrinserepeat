import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Img from "@/components/Img";
import BookButton from "@/components/BookButton";
import CallButton from "@/components/CallButton";
import { Tiles, FAQ, Reviews, MobilePolicies, Icon, Check } from "@/components/sections";
import { cities, site, pricingRules, type ImgName } from "@/data/site";
import cityContent from "@/data/cities-content.json";
import landmarkPhotos from "@/data/landmark-photos.json";
import images from "@/data/images.json";

export function generateStaticParams() { return cities.map((c) => ({ city: c.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params; const c = cities.find((x) => x.slug === city);
  if (!c) return {};
  return {
    title: `Mobile Dog & Cat Grooming in ${c.name}, ${c.state}`,
    description: `Pet Rinse Repeat brings professional mobile dog grooming to your driveway in ${c.name}, ${c.state}, plus cat-only mobile grooming with Here Kitty. One pet at a time, no cages, no car ride. Book online.`,
    alternates: { canonical: `/service-areas/${c.slug}/` },
  };
}

/** Real client photos rotate through the heroes until each city has its own landmark photo. */
const heroPool: { img: ImgName; alt: string; pos: string }[] = [
  { img: "van-doodle-fresh", alt: "A cream Goldendoodle, freshly groomed, in a bandana in the van", pos: "object-[center_30%]" },
  { img: "van-gsd", alt: "A German Shepherd in a bandana in the van", pos: "object-[center_30%]" },
  { img: "van-goldendoodle-bandana", alt: "A red Goldendoodle in a bandana after a groom in the van", pos: "object-[center_30%]" },
  { img: "van-shihtzu-pair", alt: "Two Shih Tzus in bows on the van table", pos: "object-[center_35%]" },
  { img: "van-golden", alt: "A Golden Retriever in the van after a groom", pos: "object-[center_30%]" },
  { img: "van-collie", alt: "A Rough Collie on the van table", pos: "object-[center_35%]" },
  { img: "van-doodle-white", alt: "A white doodle sitting on the van table", pos: "object-[center_30%]" },
  { img: "van-cockers", alt: "Two Cocker Spaniels in the van", pos: "object-[center_35%]" },
  { img: "van-sheltie", alt: "A Sheltie on the van table", pos: "object-[center_35%]" },
  { img: "van-cavalier", alt: "A Cavalier King Charles in the van", pos: "object-[center_30%]" },
  { img: "van-schnauzer", alt: "A black Schnauzer after a groom in the van", pos: "object-[center_30%]" },
  { img: "van-doodle-pair", alt: "Two doodles on the van table after their grooms", pos: "object-[center_35%]" },
  { img: "van-springer", alt: "A Springer Spaniel on the van table", pos: "object-[center_35%]" },
  { img: "van-shihtzu", alt: "A Shih Tzu after a groom in the van", pos: "object-[center_30%]" },
  { img: "van-chihuahua", alt: "A white Chihuahua in a bandana in the van", pos: "object-[center_30%]" },
  { img: "van-doodle-sit", alt: "A Goldendoodle sitting on the van table after a groom", pos: "object-[center_30%]" },
  { img: "dog-sheepadoodle-van", alt: "A sheepadoodle inside the van after a groom", pos: "object-[center_30%]" },
  { img: "dog-goldendoodle-chiefs", alt: "A Goldendoodle in a Chiefs bandana after a groom in the van", pos: "object-[center_35%]" },
  { img: "van-shepherd-pup", alt: "A black shepherd puppy in a bandana inside the van", pos: "object-[center_30%]" },
  { img: "van-side", alt: "The Pet Rinse Repeat mobile grooming van", pos: "object-[center_40%]" },
  { img: "dog-poodle-tux", alt: "A small poodle in a tuxedo harness on the van table", pos: "object-[center_35%]" },
  { img: "van-doodle-trio", alt: "Two doodles and a Golden lounging in the van", pos: "object-[center_40%]" },
  { img: "dog-bulldog-van", alt: "An English Bulldog on the table inside the van", pos: "object-[center_40%]" },
  { img: "van-curbside", alt: "The Pet Rinse Repeat van parked at a client's home", pos: "object-[center_60%]" },
  { img: "van-team", alt: "The Pet Rinse Repeat team beside the van", pos: "object-[center_45%]" },
  { img: "van-front", alt: "The front of the Pet Rinse Repeat mobile grooming van", pos: "object-[center_45%]" },
];

type LP = { slug: string | null; landmark: string; file: string; alt: string; status: string; approved?: boolean; pos?: string; creator?: string | null; license?: string | null; licenseUrl?: string | null; source?: string | null };
type Mark = string | { name: string; note?: string };

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params; const c = cities.find((x) => x.slug === city);
  if (!c) notFound();
  const where = `${c.name}, ${c.state}`;
  const idx = cities.findIndex((x) => x.slug === c.slug);
  const vanShots = heroPool.filter((h) => ["van-side", "van-curbside", "van-team", "van-front"].includes(h.img));
  const fallback = vanShots[idx % vanShots.length];
  const lp = (landmarkPhotos as LP[]).find((x) => x.slug === c.slug && x.approved && x.file in images);
  const hero = lp ? { img: lp.file as ImgName, alt: lp.alt, pos: lp.pos ?? "object-center" } : fallback;
  const local = (cityContent as { slug: string; neighborhoods: string[]; landmarks: Mark[] }[]).find((x) => x.slug === c.slug);
  const hoods = local?.neighborhoods ?? [];
  const marks = (local?.landmarks ?? []).map((m) => (typeof m === "string" ? { name: m } : m));
  const mo = cities.filter((x) => x.state === "MO"); const ks = cities.filter((x) => x.state === "KS");
  const p = (s: string) => `city_${s}_${c.slug}`;

  return (
    <>
      {/* Full-width landmark hero with headline over it */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Img name={hero.img} priority alt={hero.alt} sizes="100vw" className={`absolute inset-0 w-full h-full object-cover ${hero.pos}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/35 via-navy/40 to-navy/70" />
        <div className="wrap relative py-20 md:py-28 flex flex-col items-center text-center gap-5">
          <p className="kick m-0 text-white/80">Pet Rinse Repeat · mobile grooming</p>
          <h1 className="disp text-white text-[36px] md:text-[56px] leading-[1.05] m-0 max-w-[900px] [text-shadow:0_2px_18px_rgba(20,29,51,.7)]">Mobile Dog &amp; Cat Grooming <span className="text-pink">in {where}</span></h1>
          <p className="text-white text-lg leading-relaxed m-0 max-w-[760px] [text-shadow:0_1px_10px_rgba(20,29,51,.8)]">Looking for reliable, professional pet grooming in {where}? Pet Rinse Repeat brings mobile dog grooming straight to your driveway, and Here Kitty does the same for cats — one pet at a time, no cages, no car ride, no waiting all day.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <CallButton placement={p("hero")} variant="white" />
            <BookButton service="mobile" placement={p("hero")}>Book mobile dog grooming</BookButton>
            <BookButton service="cat" placement={p("hero_cat")} variant="navy" className="!bg-sky-dark">Book mobile cat grooming</BookButton>
          </div>
          {lp && (
            <p className="text-[12px] text-white/60 m-0">{lp.landmark}{lp.creator ? <> · photo: {lp.creator}{lp.license && !lp.license.toLowerCase().includes("public domain") && lp.licenseUrl ? <>, <a href={lp.licenseUrl} target="_blank" rel="noopener" className="underline">{lp.license}</a></> : lp.license ? " (public domain)" : null}, resized · <Link href="/photo-credits/" className="underline">credits</Link></> : null}</p>
          )}
        </div>
      </section>

      {/* Why owners choose us */}
      <section className="wrap pt-14 md:pt-20 pb-4 text-center">
        <p className="kick m-0">Why {c.name} pet owners choose us</p>
        <h2 className="disp text-[30px] md:text-[38px] m-0">Grooming that comes <span className="accent">to you.</span></h2>
      </section>
      <Tiles overlap={false} items={[
        { icon: "paw", t: "One-on-one, start to finish", d: "Your pet is the only one in the van. No kennels, no crowd, no noise." },
        { icon: "home", t: "No car ride, no drop-off", d: `We park in your ${c.name} driveway. Hand off at the door, get them back fresh.` },
        { icon: "van", t: "Clean, climate-controlled van", d: "Cleaned between appointments and kept comfortable year-round." },
        { icon: "sparkle", t: "Experienced groomers", d: "Patient hands for every breed, coat, size, and temperament." },
        { icon: "cat", t: "Cats too, with Here Kitty", d: "Our cat-only mobile service, with a groomer who works with cats all day." },
        { icon: "calendar", t: "Book online in two minutes", d: "Real availability for your address. Pick a time and you're set." },
      ]} />

      {/* Services */}
      <section className="wrap py-14 md:py-20 grid lg:grid-cols-2 gap-6">
        <div className="card p-6 md:p-8 flex flex-col gap-4">
          <span className="icon-tile"><Icon name="scissors" /></span>
          <h2 className="disp text-[26px] m-0">Dog grooming in {c.name}</h2>
          <p className="text-ink-soft m-0 leading-relaxed">Tailored to your dog&rsquo;s breed, coat, size, and temperament — from a bath and tidy to a full haircut.</p>
          <ul className="m-0 p-0 list-none grid gap-2 text-navy font-semibold text-[15px]">
            {["Bath & blow dry", "Breed-appropriate haircut or custom style", "De-shedding for double coats", "Nail trim & filing (add-on)", "Ear cleaning & sanitary trim"].map((x) => <li key={x} className="flex gap-2"><Check />{x}</li>)}
          </ul>
          <p className="text-ink-soft m-0 text-[15px]">{pricingRules.summary} <Link href="/pricing/" className="text-pink font-semibold">See pricing</Link>.</p>
          <div className="flex flex-wrap gap-3 pt-1"><BookButton service="mobile" placement={p("services")} className="btn-sm">Book mobile dog grooming</BookButton><CallButton placement={p("services")} className="btn-sm" /></div>
        </div>
        <div className="card p-6 md:p-8 flex flex-col gap-4">
          <span className="icon-tile-sky"><Icon name="cat" /></span>
          <h2 className="disp text-[26px] m-0">Cat grooming in {c.name}</h2>
          <p className="text-ink-soft m-0 leading-relaxed">Cats get their own van and their own groomer through {site.herekitty.name}. Staying home means no carrier ride and far less stress.</p>
          <ul className="m-0 p-0 list-none grid gap-2 text-navy font-semibold text-[15px]">
            {["Bath, brush-out & blow dry", "Lion cuts, teddy-bear trims & sanitary trims", "De-matting and coat maintenance", "Nail trim"].map((x) => <li key={x} className="flex gap-2"><Check />{x}</li>)}
          </ul>
          <p className="text-ink-soft m-0 text-[15px]">Cats must be in a carrier when the van arrives. <Link href="/cat-grooming/" className="text-pink font-semibold">About Here Kitty</Link>.</p>
          <div className="flex flex-wrap gap-3 pt-1"><BookButton service="cat" placement={p("services_cat")} className="btn-sm">Book mobile cat grooming</BookButton></div>
        </div>
      </section>

      {/* Reviews — honest heading, real mobile reviews */}
      <Reviews service="mobile" kick={`Trusted by pet owners across the metro`} title={<>What mobile clients <span className="accent">are saying.</span></>} />

      {/* Neighborhoods + attractions */}
      {(hoods.length > 0 || marks.length > 0) && (
        <section className="wrap pb-14 md:pb-20">
          <div className="card-tint p-6 md:p-8 grid md:grid-cols-5 gap-8">
            {hoods.length > 0 && (
              <div className="md:col-span-2">
                <p className="kick m-0">Across {c.name}</p>
                <h2 className="disp text-[24px] m-0 mb-3">Neighborhoods we serve</h2>
                <ul className="m-0 p-0 list-none flex flex-wrap gap-2">{hoods.map((h) => <li key={h} className="bg-white rounded-full px-3 py-1 text-sm font-semibold text-navy border border-navy/10">{h}</li>)}</ul>
                <p className="text-ink-soft text-[14px] mt-3 m-0">Not listed? We likely still come to you — book and we&rsquo;ll confirm, or call <a href={site.phoneHref} className="text-pink font-semibold">{site.phone}</a>.</p>
              </div>
            )}
            {marks.length > 0 && (
              <div className="md:col-span-3">
                <p className="kick m-0">Out and about</p>
                <h2 className="disp text-[24px] m-0 mb-3">Top spots in {c.name}</h2>
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

      <MobilePolicies city={c.name} />

      {/* FAQ */}
      <FAQ title={`Mobile grooming in ${c.name}: questions, answered`} items={[
        { q: `Do you serve all of ${c.name}?`, a: `We serve ${where} and the surrounding Kansas City metro. If you're on the edge of our route, book and we'll confirm, or call ${site.phone}.` },
        { q: "How is mobile grooming priced?", a: pricingRules.summary + " Mobile full-service grooms start at $130/hr, plus a $" + site.travelFee + " travel fee per visit." },
        { q: `How soon can you come to ${c.name}?`, a: "Mobile routes typically book 1–3 weeks out depending on the area. Booking online shows real availability for your address." },
        { q: "How long does an appointment take?", a: "It depends on size, coat, and condition — most dogs are done in one to two hours. You'll see an estimated duration for each service when you book." },
        { q: `Do you groom cats in ${c.name}?`, a: "Yes — through Here Kitty, our cat-only mobile grooming service, on its own van and schedule." },
        { q: "What are your mobile hours?", a: `${site.mobileHours}.` },
      ]} />

      {/* Book CTA */}
      <section className="wrap pb-14 md:pb-20">
        <div className="relative overflow-hidden rounded-[28px] bg-navy text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative flex-1 flex flex-col gap-2">
            <p className="kick m-0 text-white/70">Book mobile pet grooming in {where}</p>
            <h2 className="disp text-white text-[30px] md:text-[40px] m-0">Grooming in {c.name}, <span className="text-pink">done at home.</span></h2>
            <p className="text-white/75 m-0 text-lg">Book online in under two minutes, or call or text {site.phone}.</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <CallButton placement={p("final")} variant="white" />
            <BookButton service="mobile" placement={p("final")}>Book dog grooming</BookButton>
            <BookButton service="cat" placement={p("final_cat")} variant="navy" className="!bg-sky-dark">Book cat grooming</BookButton>
          </div>
        </div>
      </section>

      {/* Salon alternative */}
      <section className="wrap pb-14 md:pb-20">
        <div className="card p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="kick m-0">Looking for a more affordable option?</p>
            <h2 className="disp text-[24px] md:text-[28px] m-0">Visit our North Kansas City salon</h2>
            <p className="text-ink-soft m-0 mt-2 leading-relaxed">The Groomery &amp; Boutique at {site.address.street}, {site.address.city}. Same groomers, salon pricing, seven days a week. {site.salonHours}.</p>
          </div>
          <div className="flex flex-wrap gap-3"><BookButton service="salon" placement={p("salon")} variant="ghost">Book a salon visit</BookButton><Link href="/salon-grooming/" className="btn btn-ghost">Salon details</Link></div>
        </div>
      </section>

      {/* Service area lists */}
      <section className="wrap pb-16">
        <p className="kick m-0">We serve the greater Kansas City metro</p>
        <div className="grid md:grid-cols-2 gap-6 mt-3">
          <div><h2 className="disp text-[20px] m-0 mb-2">Missouri</h2><ul className="m-0 p-0 list-none flex flex-wrap gap-2">{mo.map((x) => <li key={x.slug}><Link href={`/service-areas/${x.slug}/`} className={`inline-flex items-center min-h-[40px] px-3.5 rounded-full border text-[14px] font-semibold no-underline ${x.slug === c.slug ? "bg-pink text-white border-pink" : "bg-white text-navy border-navy/10 hover:border-pink hover:text-pink"}`}>{x.name}</Link></li>)}</ul></div>
          <div><h2 className="disp text-[20px] m-0 mb-2">Kansas</h2><ul className="m-0 p-0 list-none flex flex-wrap gap-2">{ks.map((x) => <li key={x.slug}><Link href={`/service-areas/${x.slug}/`} className={`inline-flex items-center min-h-[40px] px-3.5 rounded-full border text-[14px] font-semibold no-underline ${x.slug === c.slug ? "bg-pink text-white border-pink" : "bg-white text-navy border-navy/10 hover:border-pink hover:text-pink"}`}>{x.name}</Link></li>)}</ul></div>
        </div>
      </section>
    </>
  );
}
