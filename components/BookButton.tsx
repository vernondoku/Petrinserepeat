"use client";
import { useEffect, useState } from "react";
import { site, type Service } from "@/data/site";
import { bookingUrl, track } from "@/lib/tracking";

type Props = {
  service: Service;                   // which MoeGo storefront this button opens
  placement: string;                  // where on the site this button lives — becomes the analytics label
  children?: React.ReactNode;
  variant?: "primary" | "ghost" | "navy";
  className?: string;
};

const labels: Record<Service, string> = { mobile: "Book mobile grooming", salon: "Book a salon visit", cat: "Book cat grooming" };

/** Every "Book" button on the site. Fires booking_funnel_entry with placement + service and carries attribution to MoeGo. */
export default function BookButton({ service, placement, children, variant = "primary", className = "" }: Props) {
  const [href, setHref] = useState(site.booking[service]);
  useEffect(() => { setHref(bookingUrl(placement, service)); }, [placement, service]);
  return (
    <a href={href} target="_blank" rel="noopener" className={`btn btn-${variant} ${className}`}
      onClick={() => track("booking_funnel_entry", { placement, service })}>
      {children ?? labels[service]}
      <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
    </a>
  );
}
