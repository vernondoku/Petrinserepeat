import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/sections";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact", description: "Call, email, or visit Pet Rinse Repeat in North Kansas City.", alternates: { canonical: "/contact/" } };

export default function Page() {
  const a = site.address;
  return (
    <section className="band min-h-[60vh]">
      <div className="wrap py-14 md:py-20 grid md:grid-cols-2 gap-8 max-w-[960px]">
        <div className="flex flex-col gap-3">
          <p className="kick m-0">Contact</p>
          <h1 className="disp text-[36px] md:text-[48px] m-0">Say <span className="accent">hello.</span></h1>
          <p className="text-ink-soft text-lg m-0">Booking is fastest online. For everything else, we're a call or email away.</p>
          <Link href="/book/" className="btn btn-primary self-start mt-2">Book a groom</Link>
        </div>
        <div className="card p-6 md:p-8 flex flex-col gap-4 text-navy font-semibold">
          <a href={site.phoneHref} className="flex gap-3 items-center hover:text-pink"><Icon name="chat" color="#E5308D" />{site.phone}</a>
          <a href={`mailto:${site.email}`} className="flex gap-3 items-center hover:text-pink"><Icon name="sparkle" color="#E5308D" />{site.email}</a>
          <span className="flex gap-3 items-start"><Icon name="pin" color="#E5308D" /><span>{a.street}<br />{a.city}, {a.state} {a.zip}</span></span>
          <span className="flex gap-3 items-start"><Icon name="clock" color="#E5308D" /><span>Salon: {site.salonHours}</span></span>
        </div>
      </div>
    </section>
  );
}
