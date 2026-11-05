import Link from "next/link";
import { nav, site } from "@/data/site";
import FooterTagline from "./FooterTagline";

export default function Footer() {
  const a = site.address;
  return (
    <footer className="bg-navy text-white/80 pb-24 lg:pb-0">
      <div className="wrap py-14 grid gap-10 md:grid-cols-4 text-sm">
        <div className="flex flex-col gap-3 md:col-span-2">
          <img src="/media/badge-splash.webp" alt="" className="h-20 w-auto self-start" width="222" height="160" loading="lazy" />
          <FooterTagline />
          <span className="max-w-[360px]">Mobile dog grooming across the Kansas City metro, a full-service salon in North Kansas City, and cat-only mobile grooming with {site.herekitty.name}.</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="kick text-white/50">Services</span>
          {nav.map((n) => <Link key={n.href} href={n.href} className="hover:text-white">{n.label}</Link>)}
          <Link href="/gallery/" className="hover:text-white">Photo gallery</Link>
          <Link href="/book/" className="text-[#FF6FB5] font-bold">Book a groom</Link>
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
