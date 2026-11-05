"use client";
import { site } from "@/data/site";
import { track } from "@/lib/tracking";

/** Tel: link styled as a button; fires phone_click with the placement. */
export default function CallButton({ placement, variant = "ghost", className = "", label = "Call now" }: { placement: string; variant?: "primary" | "ghost" | "navy" | "white"; className?: string; label?: string }) {
  const cls = variant === "white" ? "btn bg-white text-navy hover:bg-pink-soft" : `btn btn-${variant}`;
  return (
    <a href={site.phoneHref} className={`${cls} ${className}`} onClick={() => track("phone_click", { placement })} aria-label={`Call ${site.name} at ${site.phone}`}>
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z" /></svg>
      {label}
    </a>
  );
}
