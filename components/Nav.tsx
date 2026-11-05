"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { captureAttribution, track } from "@/lib/tracking";

/** White nav from the mockup: wordmark left, links, pink "Book a groom" right. "Book a groom" goes to /book/ (service chooser). */
export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { captureAttribution(); }, []);
  useEffect(() => { setOpen(false); }, [path]);
  const active = (href: string) => path === href || (href !== "/" && path.startsWith(href));

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/92 backdrop-blur border-b border-navy/5">
        <nav className="wrap flex items-center justify-between gap-6 min-h-[70px]" aria-label="Primary">
          <Link href="/" aria-label={`${site.name} home`} className="flex items-center shrink-0">
            <img src="/media/wordmark.png" alt={site.name} className="h-7 md:h-8 w-auto" width="1254" height="200" />
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}
                className={`text-[15px] font-semibold py-2 border-b-2 transition-colors ${active(n.href) ? "border-pink text-navy" : "border-transparent text-ink-soft hover:text-navy hover:border-pink/50"}`}
                aria-current={active(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/book/" className="btn btn-primary btn-sm">Book a groom</Link>
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden w-11 h-11 inline-flex items-center justify-center text-navy">
              <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
              </svg>
            </button>
          </div>
        </nav>
        {open && (
          <div className="lg:hidden wrap pb-6 flex flex-col bg-white border-t border-navy/5">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={`py-4 border-b border-navy/5 disp text-[24px] ${active(n.href) ? "text-pink" : "text-navy"}`}>{n.label}</Link>
            ))}
            <a href={site.phoneHref} className="py-4 text-ink-soft font-semibold">{site.phone}</a>
          </div>
        )}
      </header>
      {/* sticky mobile bar: call + book */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur border-t border-navy/10" style={{ paddingBottom: "calc(8px + env(safe-area-inset-bottom))" }}>
        <a href={site.phoneHref} onClick={() => track("phone_click", { placement: "sticky_mobile" })} aria-label={`Call ${site.name} at ${site.phone}`}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] min-w-[48px] px-4 rounded-full bg-white border-2 border-navy/15 text-navy font-display font-bold text-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E5308D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>Call
        </a>
        <Link href="/book/" className="btn btn-primary flex-1 min-h-[48px] text-[16px]">Book a groom</Link>
      </div>
    </>
  );
}
