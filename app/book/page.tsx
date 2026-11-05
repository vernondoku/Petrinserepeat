import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/sections";
import BookButton from "@/components/BookButton";
import { site, type Service } from "@/data/site";

export const metadata: Metadata = { title: "Book a Groom", description: "Choose mobile dog grooming, a salon visit, or mobile cat grooming and book online.", alternates: { canonical: "/book/" }, robots: { index: false, follow: true } };

export default function Page() {
  const opts: { key: Service; icon: IconName; t: string; d: string }[] = [
    { key: "mobile", icon: "van", t: "Mobile dog grooming", d: `We come to your driveway. Kansas City metro, ${site.mobileHours}.` },
    { key: "salon", icon: "scissors", t: "Salon visit", d: `${site.address.street}, North Kansas City. ${site.salonHours}.` },
    { key: "cat", icon: "cat", t: "Mobile cat grooming", d: "Here Kitty, our cat-only mobile service, comes to you." },
  ];
  return (
    <section className="band min-h-[70vh]">
      <div className="wrap py-14 md:py-20 flex flex-col gap-8 max-w-[860px]">
        <div className="flex flex-col gap-2">
          <p className="kick m-0">Book a groom</p>
          <h1 className="disp text-[36px] md:text-[48px] m-0">Which groom <span className="accent">are you after?</span></h1>
          <p className="text-ink-soft text-lg m-0">Each service books on its own page. Pick one and choose a time.</p>
        </div>
        <ul className="m-0 p-0 list-none grid gap-4">
          {opts.map((o) => (
            <li key={o.key} className="card p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="icon-tile"><Icon name={o.icon} /></span>
              <div className="flex-1"><strong className="block text-navy text-lg">{o.t}</strong><span className="text-ink-soft">{o.d}</span></div>
              <BookButton service={o.key} placement="book_page">Book</BookButton>
            </li>
          ))}
        </ul>
        <p className="text-ink-soft m-0">Rather talk to a person? Call <a href={site.phoneHref} className="text-pink font-semibold">{site.phone}</a> or email <a href={`mailto:${site.email}`} className="text-pink font-semibold">{site.email}</a>.</p>
      </div>
    </section>
  );
}
