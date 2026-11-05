import Link from "next/link";
import Img from "./Img";
import BookButton from "./BookButton";
import { site, faqs as defaultFaqs, mobilePolicies, type Service, type ImgName } from "@/data/site";
import { reviews, reviewsByService } from "@/data/reviews";

/* ---------- small bits ---------- */

export const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E5308D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 mt-[3px]"><path d="m5 13 4 4L19 7" /></svg>
);

/** Decorative soap bubbles. Positioned absolutely inside a relative parent. */
export function Bubbles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <span className="bubble float w-16 h-16 right-[8%] top-[12%]" />
      <span className="bubble float-slow w-8 h-8 right-[22%] top-[38%]" />
      <span className="bubble float w-5 h-5 left-[6%] bottom-[18%]" />
      <span className="bubble float-slow w-10 h-10 left-[42%] bottom-[8%]" />
    </div>
  );
}

const icons = {
  home: "M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  paw: "M12 13c-3 0-6 2.2-6 5a2 2 0 0 0 2 2c1.2 0 2-.6 4-.6s2.8.6 4 .6a2 2 0 0 0 2-2c0-2.8-3-5-6-5zM7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  sparkle: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18",
  scissors: "M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4 8.1 15.9M14.5 9.5 20 20",
  tub: "M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0M4 19l-1 2M20 19l1 2",
  van: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM6 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M17 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3",
  cat: "M5 10 4 4l5 3h6l5-3-1 6a7 7 0 0 1-14 0zM9 13h.01M15 13h.01M10 16c1 1 3 1 4 0",
  pin: "M12 21s-6-5.5-6-10a6 6 0 1 1 12 0c0 4.5-6 10-6 10zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  chat: "M4 5h16v11H9l-5 4z",
  car: "M5 11l1.5-4h11L19 11M4 11h16v5H4zM7 16v2M17 16v2M7 13.5h.01M17 13.5h.01",
  heart: "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z",
  shield: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zM9 12l2 2 4-4",
};
export type IconName = keyof typeof icons;
export function Icon({ name, size = 22, color = "currentColor" }: { name: IconName; size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[name]} /></svg>;
}

/* ---------- hero ---------- */

type HeroProps = {
  kick: string;
  title: React.ReactNode;       // use <span className="accent"> for the pink line
  blurb: string;
  service?: Service;            // which BookButton; omit for a non-booking hero
  cta?: string;
  secondary?: { href: string; label: string };
  img: ImgName; alt: string; imgPos?: string;
  /** Optional muted looping video (public path, mp4) with a poster; falls back to `img` when reduced motion is preferred. */
  video?: { src: string; poster: string };
  placement: string;
};
export function Hero({ kick, title, blurb, service, cta, secondary, img, alt, imgPos = "object-center", video, placement }: HeroProps) {
  return (
    <section className="band">
      <Bubbles />
      <div className="wrap relative grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-center py-12 md:py-16">
        <div className="flex flex-col gap-5 rise">
          <p className="kick m-0">{kick}</p>
          <h1 className="disp text-[40px] md:text-[56px] m-0">{title}</h1>
          <p className="text-ink-soft text-lg leading-relaxed m-0 max-w-[520px]">{blurb}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            {service && <BookButton service={service} placement={placement}>{cta}</BookButton>}
            {secondary && <Link href={secondary.href} className="btn btn-ghost">{secondary.label}</Link>}
          </div>
        </div>
        <div className="rise d2">
          {video ? (
            <div className="relative w-full h-[300px] md:h-[440px] rounded-[24px] shadow-lift overflow-hidden bg-navy">
              <video className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden" src={video.src} poster={video.poster} autoPlay muted loop playsInline preload="metadata" aria-label={alt} />
              <Img name={img} priority alt={alt} sizes="(min-width: 1024px) 50vw, 100vw" className={`hidden motion-reduce:block w-full h-full object-cover ${imgPos}`} />
            </div>
          ) : (
            <Img name={img} priority alt={alt} sizes="(min-width: 1024px) 50vw, 100vw" className={`w-full h-[300px] md:h-[440px] object-cover ${imgPos} rounded-[24px] shadow-lift`} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- three benefit tiles ---------- */

export type Tile = { icon: IconName; t: string; d: string };
export function Tiles({ items, tint = false, overlap = true }: { items: Tile[]; tint?: boolean; overlap?: boolean }) {
  return (
    <section className={`wrap ${overlap ? "-mt-6 md:-mt-8" : "mt-6"} mb-10 relative z-10`}>
      <ul className="m-0 p-0 list-none grid sm:grid-cols-3 gap-4">
        {items.map((it) => (
          <li key={it.t} className="card p-5 flex gap-4 items-start">
            <span className={tint ? "icon-tile-sky" : "icon-tile"}><Icon name={it.icon} /></span>
            <div><strong className="block text-navy text-[17px] mb-1">{it.t}</strong><span className="text-ink-soft text-[15px] leading-snug">{it.d}</span></div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- "what's included" ---------- */

export function Included({ title, intro, items, img, alt, imgPos = "object-[center_25%]" }: { title: React.ReactNode; intro?: string; items: string[]; img: ImgName; alt: string; imgPos?: string }) {
  return (
    <section className="wrap py-14 md:py-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
      <Img name={img} alt={alt} sizes="(min-width: 1024px) 45vw, 100vw" className={`w-full h-[280px] lg:h-[400px] object-cover ${imgPos} rounded-[24px] shadow-card`} />
      <div className="flex flex-col gap-4">
        <h2 className="disp text-[30px] md:text-[38px] m-0">{title}</h2>
        {intro && <p className="text-ink-soft leading-relaxed m-0">{intro}</p>}
        <ul className="m-0 p-0 list-none grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {items.map((i) => <li key={i} className="flex gap-2.5 items-start font-semibold text-navy"><Check />{i}</li>)}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 3-step how it works ---------- */

export type Step = { icon: IconName; t: string; d: string };
export function Steps({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <section className="wrap pb-14 md:pb-20">
      <div className="card-tint p-6 md:p-8">
        <h2 className="disp text-[24px] md:text-[28px] m-0 mb-6 text-center">{title}</h2>
        <ol className="m-0 p-0 list-none grid md:grid-cols-3 gap-6 md:gap-4">
          {steps.map((s, i) => (
            <li key={s.t} className="flex gap-4 items-start relative">
              <span className="inline-flex w-11 h-11 rounded-full bg-pink text-white items-center justify-center shrink-0 font-display font-extrabold">{i + 1}</span>
              <div><strong className="block text-navy mb-0.5">{s.t}</strong><span className="text-ink-soft text-[15px] leading-snug">{s.d}</span></div>
              {i < steps.length - 1 && <span aria-hidden="true" className="hidden md:block absolute right-0 top-4 text-pink/60 text-xl">→</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- service cards (home, cat page hand-off) ---------- */

const services: { key: Service; icon: IconName; t: string; d: string; href: string }[] = [
  { key: "mobile", icon: "van", t: "Mobile grooming", d: "Convenient, in-driveway grooming with professional, full-service care.", href: "/mobile-grooming/" },
  { key: "salon", icon: "scissors", t: "Salon grooming", d: "A complete grooming experience at our North Kansas City salon.", href: "/salon-grooming/" },
  { key: "cat", icon: "cat", t: "Cat grooming", d: "Gentle, cat-specific grooming in our mobile cat spa.", href: "/cat-grooming/" },
];
const serviceImg: Record<Service, { img: ImgName; alt: string; pos: string }> = {
  mobile: { img: "van-goldendoodle-bandana", alt: "A red Goldendoodle in a bandana after a groom in the van", pos: "object-[center_12%]" },
  salon: { img: "salon-poodle-apricot", alt: "An apricot Standard Poodle at the salon", pos: "object-[center_8%]" },
  cat: { img: "cat-persian-salon", alt: "A black-and-white Persian cat on the grooming table", pos: "object-[center_30%]" },
};

export function ServiceCards({ placement }: { placement: string }) {
  return (
    <section className="wrap py-14 md:py-20">
      <ul className="m-0 p-0 list-none grid md:grid-cols-3 gap-5">
        {services.map((s) => (
          <li key={s.key} className="card overflow-hidden flex flex-col gap-3 items-start">
            <Img name={serviceImg[s.key].img} alt={serviceImg[s.key].alt} sizes="(min-width: 768px) 33vw, 100vw" className={`w-full h-[260px] object-cover ${serviceImg[s.key].pos}`} />
            <div className="p-6 md:p-7 pt-2 flex flex-col gap-3 items-start flex-1 w-full">
            <span className="icon-tile"><Icon name={s.icon} /></span>
            <strong className="disp text-[22px]">{s.t}</strong>
            <p className="text-ink-soft m-0 leading-snug flex-1">{s.d}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <BookButton service={s.key} placement={`${placement}_${s.key}`} className="btn-sm">Book now</BookButton>
              <Link href={s.href} className="btn btn-ghost btn-sm">Learn more</Link>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- FAQ ---------- */

export function FAQ({ items = defaultFaqs, title = "Questions, answered" }: { items?: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="wrap py-14 md:py-20 max-w-[860px]">
      <h2 className="disp text-[30px] md:text-[38px] m-0 mb-6">{title}</h2>
      <div className="flex flex-col gap-3">
        {items.map((f) => (
          <details key={f.q} className="card px-5 py-4 group">
            <summary className="cursor-pointer list-none flex justify-between items-center gap-4 font-bold text-navy">{f.q}<span aria-hidden="true" className="text-pink text-xl group-open:rotate-45 transition-transform">+</span></summary>
            <p className="text-ink-soft m-0 mt-3 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />
    </section>
  );
}

/* ---------- reviews ---------- */

const serviceLabel: Record<Service, string> = { mobile: "Mobile", salon: "Salon", cat: "Cat" };

/** Review showcase. With `service`, shows that business's own Google listing and its reviews; without, a homepage mix of all three. */
export function Reviews({ service, title, kick = "Hear from our clients" }: { service?: Service; title?: React.ReactNode; kick?: string }) {
  const g = service ? site.google[service] : null;
  const items = service ? reviewsByService[service].map((r) => ({ ...r, service })) : reviews;
  return (
    <section className="wrap py-14 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <p className="kick m-0">{kick}</p>
          <h2 className="disp text-[30px] md:text-[38px] m-0">{title ?? <>Happy pets, <span className="accent">happy people.</span></>}</h2>
        </div>
        {g ? (
          <a href={g.url} target="_blank" rel="noopener" className="inline-flex items-center gap-3 bg-white rounded-full pl-3.5 pr-5 py-2 no-underline self-start md:self-auto border border-navy/10 shadow-card">
            <span className="font-display font-extrabold text-[26px] leading-none text-navy">{g.rating.toFixed(1)}</span>
            <span className="flex flex-col leading-tight"><span aria-hidden="true" className="text-sun tracking-[2px] text-sm">★★★★★</span><span className="text-[12px] text-ink-soft">{g.reviewCount.toLocaleString()} Google reviews · {g.label} →</span></span>
          </a>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(Object.keys(site.google) as Service[]).map((k) => { const x = site.google[k]; return (
              <a key={k} href={x.url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5 no-underline border border-navy/10 text-sm text-navy font-semibold hover:border-pink">
                <span className="text-sun">★</span>{x.rating.toFixed(1)} <span className="text-ink-soft font-normal">· {x.reviewCount.toLocaleString()} · {serviceLabel[k]}</span>
              </a>
            ); })}
          </div>
        )}
      </div>
      <ul className="m-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.slice(0, 4).map((r) => (
          <li key={r.name} className="card p-5 flex flex-col gap-3">
            <span aria-hidden="true" className="text-sun tracking-[2px]">★★★★★</span>
            <p className="m-0 text-navy leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
            <span className="text-sm text-ink-soft font-semibold">{r.name}<span className="font-normal"> · {serviceLabel[r.service]}{r.when && r.when !== "recent" ? ` · ${r.when}` : ""}</span></span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-ink-soft mt-3 m-0">Quotes from public Google reviews{g ? ` of ${service === "cat" ? g.label : `${site.name} ${g.label}`}` : ""}. Reviewer names as shown on Google.</p>
    </section>
  );
}

/* ---------- photo gallery ---------- */

export const galleryDefault: { img: ImgName; alt: string }[] = [
        { img: "van-doodle-fresh", alt: "A cream Goldendoodle, freshly groomed, in a bandana in the van" },
        { img: "salon-husky-rainbow", alt: "A white Husky with rainbow-dyed ears" },
        { img: "dog-poodle-chiefs", alt: "dog-poodle-chiefs" },
        { img: "van-shihtzu-pair", alt: "Two Shih Tzus in bows on the van table" },
        { img: "salon-frenchie", alt: "A French Bulldog in a bandana at the salon" },
        { img: "van-sheepadoodle-tub", alt: "A sheepadoodle in the tub with its tongue out" },
        { img: "salon-goldendoodle-2", alt: "A cream Goldendoodle in a bandana at the salon" },
        { img: "van-cockers", alt: "Two Cocker Spaniels in the van" },
      ];

export function Gallery({ title = <>Fresh off <span className="accent">the table.</span></>, kick = "Real clients, real grooms", items = galleryDefault }: { title?: React.ReactNode; kick?: string; items?: { img: ImgName; alt: string }[] }) {
  return (
    <section className="wrap py-14 md:py-20">
      <p className="kick m-0">{kick}</p>
      <h2 className="disp text-[30px] md:text-[38px] m-0 mb-6">{title}</h2>
      <ul className="m-0 p-0 list-none grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.slice(0, 8).map((g) => (
          <li key={g.img} className="rounded-[20px] overflow-hidden shadow-card aspect-square bg-white">
            <Img name={g.img} alt={g.alt} sizes="(min-width: 768px) 25vw, 50vw" className="w-full h-full object-cover object-[center_18%]" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- mobile policies ---------- */

export function MobilePolicies({ city }: { city?: string }) {
  return (
    <section className="wrap pb-14 md:pb-20">
      <p className="kick m-0">Good to know before you book</p>
      <h2 className="disp text-[30px] md:text-[36px] m-0 mb-6">Mobile grooming, <span className="accent">the fine print.</span></h2>
      <ul className="m-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mobilePolicies.map((x) => (
          <li key={x.t} className="card p-5 flex flex-col gap-1.5">
            <span className="font-display font-bold text-navy text-[17px]">{x.t}</span>
            <p className="m-0 text-ink-soft text-[15px] leading-relaxed">{x.d}</p>
          </li>
        ))}
      </ul>
      {city && <p className="text-ink-soft text-[15px] mt-4 m-0">Questions about {city}? Call <a href={site.phoneHref} className="text-pink font-semibold">{site.phone}</a>.</p>}
    </section>
  );
}

/* ---------- trust strip + final CTA ---------- */

export function TrustStrip() {
  const g = site.google;
  return (
    <section className="bg-white border-y border-navy/5">
      <div className="wrap py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <a href={g.salon.url} target="_blank" rel="noopener" className="inline-flex items-center gap-3 bg-navy text-white rounded-full pl-3.5 pr-5 py-2 no-underline self-start shrink-0">
          <span className="font-display font-extrabold text-[26px] leading-none">{g.salon.rating}</span>
          <span className="flex flex-col leading-tight"><span aria-hidden="true" className="text-sun tracking-[2px] text-sm">★★★★★</span><span className="text-[12px] text-white/70">{g.salon.reviewCount.toLocaleString()} Google reviews · salon</span></span>
        </a>
        <div className="hidden md:flex flex-col text-[13px] text-ink-soft leading-tight shrink-0">
          <a href={g.mobile.url} target="_blank" rel="noopener" className="hover:text-pink"><span className="text-sun">★</span> {g.mobile.rating.toFixed(1)} · {g.mobile.reviewCount} reviews · mobile</a>
          <a href={g.cat.url} target="_blank" rel="noopener" className="hover:text-pink"><span className="text-sun">★</span> {g.cat.rating.toFixed(1)} · {g.cat.reviewCount} reviews · cats</a>
        </div>
        <ul className="m-0 p-0 list-none grid grid-cols-2 md:flex md:flex-wrap gap-x-6 gap-y-2 flex-1 text-[15px] font-semibold text-navy">
          <li className="flex items-center gap-2"><Icon name="van" color="#E5308D" /> Mobile grooming, KC metro</li>
          <li className="flex items-center gap-2"><Icon name="scissors" color="#E5308D" /> Full-service salon, NKC</li>
          <li className="flex items-center gap-2"><Icon name="cat" color="#E5308D" /> Cat-only mobile grooming</li>
          <li className="flex items-center gap-2"><Icon name="calendar" color="#E5308D" /> Book online, any time</li>
        </ul>
      </div>
    </section>
  );
}

export function FinalCTA({ service, placement, title = <>Ready for a <span className="accent">fresh look?</span></>, blurb = "Pick a time online in under two minutes." }: { service: Service; placement: string; title?: React.ReactNode; blurb?: string }) {
  return (
    <section className="wrap pb-16 md:pb-24">
      <div className="relative overflow-hidden rounded-[28px] bg-navy text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-6">
        <Bubbles className="opacity-60" />
        <div className="relative flex-1 flex flex-col gap-2">
          <h2 className="disp text-white text-[30px] md:text-[40px] m-0">{title}</h2>
          <p className="text-white/75 m-0 text-lg">{blurb}</p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <BookButton service={service} placement={placement} />
          <a href={site.phoneHref} className="btn btn-ghost">{site.phone}</a>
        </div>
      </div>
    </section>
  );
}
