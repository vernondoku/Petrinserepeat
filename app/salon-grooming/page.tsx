import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Tiles, Steps, FAQ, FinalCTA, Icon, Reviews, Gallery } from "@/components/sections";
import Img from "@/components/Img";
import { site, pricingRules } from "@/data/site";

export const metadata: Metadata = {
  title: "Dog & Cat Grooming Salon in North Kansas City",
  description: "Full-service pet grooming salon at 2030 Swift Street, North Kansas City. Haircuts, baths, desheds, nail care, and cat grooming. Book a salon visit online.",
  alternates: { canonical: "/salon-grooming/" },
};

export default function Page() {
  const a = site.address;
  return (
    <>
      <Hero kick="Salon grooming" title={<>A fresh look.<br /><span className="accent">A happy bestie.</span></>}
        blurb="Professional, personalized grooming at our North Kansas City salon."
        service="salon" cta="Book a salon visit" secondary={{ href: "/pricing/", label: "See pricing" }}
        img="salon-lobby-2" alt="The Pet Rinse Repeat salon lobby: greenery wall, white reception desk, and the grooming room windows" imgPos="object-[center_55%]" placement="salon_hero" />
      <Tiles tint items={[
        { icon: "scissors", t: "Full groom", d: "A complete, customized grooming service for a clean, healthy coat." },
        { icon: "tub", t: "Bath & tidy", d: "A refreshing bath, brush, and neat-up to keep them looking great." },
        { icon: "paw", t: "Nail care", d: "Professional nail trim to keep your pet comfortable and ready to play." },
      ]} />
      <section className="wrap py-14 md:py-20 grid lg:grid-cols-2 gap-6 items-stretch">
        <Img name="salon-storefront" alt="Salon exterior with the Pet Rinse Repeat window wrap" sizes="(min-width: 1024px) 50vw, 100vw" className="w-full h-[280px] lg:h-full object-cover rounded-[24px] shadow-card" />
        <div className="card p-6 md:p-8 flex flex-col gap-4">
          <h2 className="disp text-[28px] md:text-[34px] m-0">Visit our salon</h2>
          <p className="m-0 flex gap-3 items-start text-navy font-semibold"><Icon name="pin" color="#E5308D" /><span>{a.street}<br />{a.city}, {a.state} {a.zip}</span></p>
          <p className="m-0 flex gap-3 items-start text-navy font-semibold"><Icon name="clock" color="#E5308D" /><span>{site.salonHours}</span></p>
          <p className="m-0 flex gap-3 items-start text-ink-soft"><Icon name="car" color="#E5308D" /><span>Easy access &amp; parking on Swift Street.</span></p>
          <p className="m-0 flex gap-3 items-start text-ink-soft"><Icon name="cat" color="#E5308D" /><span>Cats welcome: full cat grooming menu in the salon.</span></p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${a.street}, ${a.city}, ${a.state} ${a.zip}`)}`} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">Get directions</a>
            <a href={site.phoneHref} className="btn btn-ghost btn-sm">{site.phone}</a>
          </div>
        </div>
      </section>
      <Steps title="Booking a salon visit is simple." steps={[
        { icon: "chat", t: "Tell us about your pet", d: "Breed, size, and what you're after." },
        { icon: "calendar", t: "Pick a time", d: "Choose from real salon availability." },
        { icon: "scissors", t: "Drop off, pick up", d: "Your pet comes home fresh, clean, and happy." },
      ]} />
      <section className="wrap pb-14 md:pb-20">
        <div className="card p-6 md:p-8 flex flex-col gap-3">
          <h2 className="disp text-[26px] m-0">How salon pricing works</h2>
          <p className="text-ink-soft m-0 leading-relaxed">{pricingRules.summary} Full-service grooms start at <strong className="text-navy">$100/hr</strong>; oodles at $120/hr; large and XL desheds at $140/hr. Flat-coat bath & brush is a flat rate by weight, from $60.</p>
          <Link href="/pricing/" className="btn btn-ghost btn-sm self-start">See full pricing</Link>
        </div>
      </section>
      <Gallery kick="From the salon" items={[
        { img: "salon-golden-table", alt: "A Golden Retriever on the salon table while a groomer works on a paw" },
        { img: "dog-corgi-salon", alt: "A Corgi standing on the grooming table in the salon" },
        { img: "salon-groomer-sheepadoodle", alt: "A groomer finishing a sheepadoodle's face in the salon" },
        { img: "dog-pitbull-polish", alt: "A pit bull getting red nail polish at the salon" },
        { img: "dog-poodle-chiefs", alt: "A standard Poodle in a Chiefs jersey with yellow-dyed feet" },
        { img: "salon-floor", alt: "The salon grooming floor with its purple and green walls" },
        { img: "dog-shihtzu-salon", alt: "A black-and-white Shih Tzu mix after a trim" },
        { img: "cat-persian-salon", alt: "A Persian cat on the salon grooming table" },
      ]} />
      <section className="wrap pb-14 md:pb-20 grid lg:grid-cols-[1fr_1.4fr] gap-8 items-center">
        <div className="grid grid-cols-2 gap-4 items-start">
          <video className="w-full aspect-square object-cover rounded-[20px] shadow-card motion-reduce:hidden" src="/media/reel-happy.mp4" poster="/media/reel-happy-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-label="A happy dog in a bandana on the salon table" />
          <video className="w-full aspect-[9/16] object-cover rounded-[20px] shadow-card motion-reduce:hidden" src="/media/reel-wow.mp4" poster="/media/reel-wow-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-label="A doodle's finished groom at the salon" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="kick m-0">Follow along</p>
          <h2 className="disp text-[28px] md:text-[34px] m-0">See the grooms as <span className="accent">they happen.</span></h2>
          <p className="text-ink-soft m-0 leading-relaxed">Before-and-afters, nail polish days, and the occasional Chiefs jersey. We post from the salon and the vans.</p>
          <a href={site.social.instagram} target="_blank" rel="noopener" className="btn btn-ghost btn-sm self-start">@pet.rinse.repeat on Instagram</a>
        </div>
      </section>
      <Reviews service="salon" title={<>What salon clients <span className="accent">are saying.</span></>} />
      <FAQ items={[
        { q: "Where are you located?", a: `${a.street}, ${a.city}, ${a.state} ${a.zip} — the storefront with the Pet Rinse Repeat window wrap.` },
        { q: "What are your hours?", a: site.salonHours + "." },
        { q: "How is grooming priced?", a: pricingRules.summary },
        { q: "What's your cancellation policy?", a: site.cancellationPolicy },
        { q: "Do you groom cats at the salon?", a: "Yes. The salon has its own cat grooming menu, from brush-outs to full haircuts. Prefer the groomer to come to you? Here Kitty is our cat-only mobile service." },
      ]} />
      <FinalCTA service="salon" placement="salon_final" />
    </>
  );
}
