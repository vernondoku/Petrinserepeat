import type { Metadata } from "next";
import { site } from "@/data/site";
export const metadata: Metadata = { title: "Grooming Careers", description: "Join the Pet Rinse Repeat grooming team in Kansas City — mobile and salon positions.", alternates: { canonical: "/careers/" } };
export default function Page() {
  return (
    <section className="band min-h-[60vh]"><div className="wrap py-14 md:py-20 flex flex-col gap-4 max-w-[760px]">
      <p className="kick m-0">Careers</p>
      <h1 className="disp text-[36px] md:text-[48px] m-0">Groom with <span className="accent">us.</span></h1>
      <p className="text-ink-soft text-lg leading-relaxed m-0">Pet Rinse Repeat has mobile and salon grooming teams across the Kansas City metro. If you're a groomer or bather interested in joining, we'd like to hear from you.</p>
      <p className="text-ink-soft leading-relaxed m-0">Email <a href={`mailto:${site.email}`} className="text-pink font-semibold">{site.email}</a> with a short note about your experience and whether you're interested in mobile, salon, or either.</p>
    </div></section>
  );
}
