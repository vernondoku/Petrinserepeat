"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";

const taglines: { match: (p: string) => boolean; line: React.ReactNode }[] = [
  { match: (p) => p.startsWith("/salon-grooming") || p.startsWith("/pet-boarding"), line: <>Bring them in.<br /><span className="accent">We&rsquo;ll do the rest.</span></> },
  { match: (p) => p.startsWith("/cat-grooming"), line: <>Calm cat grooming,<br /><span className="accent">at your door.</span></> },
  { match: (p) => p.startsWith("/mobile-grooming") || p.startsWith("/service-areas"), line: <>Let the groomer<br /><span className="accent">come to you.</span></> },
];
const defaultLine = <>Great grooming.<br /><span className="accent">Zero hassle.</span></>;

export default function Footer() {
  const a = site.address;
  const path = usePathname() ?? "/";
  const line = taglines.find((t) => t.match(path))?.line ?? defaultLine;
  return (
    <footer className="bg-navy text-white/80 pb-24 lg:pb-0">
      <div className="wrap py-14 grid gap-10 md:grid-cols-4 text-sm">
        <div className="flex flex-col gap-3 md:col-span-2">
          <img src="/media/badge-splash.png" alt="" className="h-20 w-auto self-start" width="1040" height="750" />
          <span className="disp text-white text-[24px]">{line}</span>
          <span className="max-w-[360px]">Mobile dog grooming across the Kansas City metro, a full-service salon in North Kansas City, and cat-only mobile grooming with {site.herekitty.name}.</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="kick text-white/50">Services</span>
          {nav.map((n) => <Link key={n.href} href={n.href} className="hover:text-white">{n.label}</Link>)}
          <Link href="/gallery/" className="hover:text-white">Photo gallery</Link>
          <Link href="/book/" className="text-pink font-bold">Book a groom</Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="kick text-white/50">Salon</span>
          <span>{a.street}<br />{a.city}, {a.state} {a.zip}</span>
          <span>{site.salonHours}</span>
          <a href={site.phoneHref} className="hover:text-white font-semibold">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
          <div className="flex gap-4 pt-2">
            <a href={site.social.facebook} target="_blank" rel="noopener" className="hover:text-white">Facebook</a>
            <a href={site.social.instagram} target="_blank" rel="noopener" className="hover:text-white">Instagram</a>
            <a href={site.social.pinterest} target="_blank" rel="noopener" className="hover:text-white">Pinterest</a>
          </div>
        </div>
      </div>
      <div className="wrap pb-8 text-xs text-white/50 flex flex-wrap gap-x-4 gap-y-1">
        <span>© {new Date().getFullYear()} {site.legalName}</span>
        <Link href="/privacy/" className="hover:text-white">Privacy</Link>
        <Link href="/sms-terms/" className="hover:text-white">SMS terms</Link>
      </div>
    </footer>
  );
}
