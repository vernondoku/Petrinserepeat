"use client";
import { usePathname } from "next/navigation";

const taglines: { match: (p: string) => boolean; line: React.ReactNode }[] = [
  { match: (p) => p.startsWith("/salon-grooming") || p.startsWith("/pet-boarding"), line: <>Bring them in.<br /><span className="accent">We&rsquo;ll do the rest.</span></> },
  { match: (p) => p.startsWith("/cat-grooming"), line: <>Calm cat grooming,<br /><span className="accent">at your door.</span></> },
  { match: (p) => p.startsWith("/mobile-grooming") || p.startsWith("/service-areas"), line: <>Let the groomer<br /><span className="accent">come to you.</span></> },
];
const defaultLine = <>Great grooming.<br /><span className="accent">Zero hassle.</span></>;

export default function FooterTagline() {
  const path = usePathname() ?? "/";
  const line = taglines.find((t) => t.match(path))?.line ?? defaultLine;
  return <span className="disp text-white text-[24px]">{line}</span>;
}
