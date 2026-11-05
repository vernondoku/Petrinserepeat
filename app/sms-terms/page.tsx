import type { Metadata } from "next";
import { site } from "@/data/site";
export const metadata: Metadata = { title: "SMS Terms", description: "Text message terms for Pet Rinse Repeat appointment notifications.", alternates: { canonical: "/sms-terms/" } };
/* Placeholder: replace with the old site's /sms-terms/ text once the content pull is reviewed. */
export default function Page() {
  return (
    <section className="wrap py-14 md:py-20 max-w-[760px] flex flex-col gap-4">
      <p className="kick m-0">Legal</p>
      <h1 className="disp text-[36px] md:text-[48px] m-0">SMS <span className="accent">terms</span></h1>
      <p className="text-ink-soft leading-relaxed m-0">When you book or give us your mobile number, you agree to receive appointment-related text messages from {site.legalName} (confirmations, reminders, on-our-way updates, and follow-ups). Message frequency depends on your bookings. Message and data rates may apply. Reply <strong>STOP</strong> to opt out or <strong>HELP</strong> for help. We do not sell your number or share it for others&apos; marketing.</p>
      <p className="text-ink-soft leading-relaxed m-0">Questions: <a href={`mailto:${site.email}`} className="text-pink font-semibold">{site.email}</a> · <a href={site.phoneHref} className="text-pink font-semibold">{site.phone}</a></p>
    </section>
  );
}
