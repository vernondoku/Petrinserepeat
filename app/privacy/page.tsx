import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Pet Rinse Repeat LLC collects, uses, and protects your information when you visit petrinserepeat.com or book an appointment.",
  alternates: { canonical: "/privacy/" },
  robots: { index: true, follow: true },
};

const updated = "November 4, 2026";

export default function Page() {
  const H = ({ children }: { children: React.ReactNode }) => <h2 className="disp text-[26px] md:text-[30px] mt-10 mb-3">{children}</h2>;
  const P = ({ children }: { children: React.ReactNode }) => <p className="text-ink-soft leading-relaxed m-0 mb-4">{children}</p>;
  const UL = ({ items }: { items: React.ReactNode[] }) => <ul className="text-ink-soft leading-relaxed pl-5 mb-4 flex flex-col gap-1.5">{items.map((t, i) => <li key={i}>{t}</li>)}</ul>;
  return (
    <>
      <section className="band">
        <div className="wrap pt-14 md:pt-16 pb-12 flex flex-col gap-3">
          <p className="kick m-0">Legal</p>
          <h1 className="disp text-[40px] md:text-[56px] m-0">Privacy <span className="accent">policy</span></h1>
          <p className="text-ink-soft m-0">Last updated {updated}</p>
        </div>
      </section>
      <div>
        <article className="wrap max-w-[760px] py-12 md:py-16">
          <P>Pet Rinse Repeat LLC (&ldquo;Pet Rinse Repeat,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) runs mobile and salon pet grooming services in the Kansas City area. This policy explains what information we collect when you visit {site.url.replace("https://", "")} or book an appointment, how we use it, and the choices you have. Plain language on purpose: if anything here is unclear, email us at <a href={`mailto:${site.email}`} className="text-pink font-semibold underline">{site.email}</a>.</P>

          <H>What we collect</H>
          <P><strong>Information you give us.</strong> When you book, you provide your name, phone number, email, service address, and details about your dog (name, breed, weight, age, coat and behavior notes, and any health concerns you choose to share). Payment card details are entered on our booking provider&rsquo;s secure checkout; we never see or store full card numbers.</P>
          <P><strong>Information collected automatically.</strong> Like most websites, we use Google Analytics and Google Tag Manager to understand how visitors use the site: pages viewed, buttons clicked, approximate location, device and browser type, and the source that brought you here (for example a search engine or an ad). This is collected through cookies and similar technologies and is not used to identify you by name.</P>
          <P><strong>Messages.</strong> If you text or email us, we keep the conversation so we can follow up and keep a record of your requests.</P>

          <H>How we use it</H>
          <UL items={[
            "To schedule, confirm, and deliver your appointments, including routing our vans to your address.",
            "To keep your pet safe: groomers review the health and behavior notes you provide before each appointment.",
            "To send appointment confirmations, reminders, and follow-ups by text or email.",
            "To answer questions and resolve problems.",
            "To understand how the website performs and improve it.",
            "To measure advertising, so we know which ads actually lead to bookings.",
          ]} />

          <H>Text messages</H>
          <P>When you book or give us your mobile number, you agree to receive appointment-related text messages (confirmations, reminders, &ldquo;on our way&rdquo; updates, and follow-ups). Message frequency depends on your bookings. Message and data rates may apply. Reply <strong>STOP</strong> to any message to opt out, or <strong>HELP</strong> for help. We do not sell your number or share it for others&rsquo; marketing.</P>

          <H>Who we share it with</H>
          <P>We share information only with the services we need to run the business:</P>
          <UL items={[
            <><strong>MoeGo</strong> &mdash; our booking, scheduling, and client-management platform. Your booking details, pet profile, and payment information are processed by MoeGo and its payment processor under their own privacy policies.</>,
            <><strong>Google</strong> &mdash; Analytics, Tag Manager, and Ads, for site measurement and advertising attribution.</>,
            <><strong>Hosting and infrastructure providers</strong> that store and serve this website.</>,
          ]} />
          <P>We do not sell your personal information. We may disclose information if required by law or to protect the safety of our team, our clients, or their dogs.</P>

          <H>Cookies and your choices</H>
          <P>You can block or delete cookies in your browser settings; the site will still work. To opt out of Google Analytics across the web, Google offers a <a href="https://tools.google.com/dlpage/gaoptout" className="text-pink font-semibold underline" rel="noopener" target="_blank">browser add-on</a>. To opt out of personalized ads, use <a href="https://adssettings.google.com" className="text-pink font-semibold underline" rel="noopener" target="_blank">Google Ads Settings</a>.</P>

          <H>How long we keep it</H>
          <P>We keep client and pet records for as long as you are a client and for a reasonable period afterward for bookkeeping, tax, and legal purposes. Website analytics data is retained according to Google Analytics&rsquo; default settings. You can ask us to delete your account information at any time (see below); some records may be kept where the law requires.</P>

          <H>Your rights</H>
          <P>You can ask us to show you the personal information we hold about you, correct it, or delete it. Email <a href={`mailto:${site.email}`} className="text-pink font-semibold underline">{site.email}</a> and we&rsquo;ll respond within 30 days. If you have questions about information held by MoeGo, we can help you reach them too.</P>

          <H>Children</H>
          <P>Our services are for adults. We do not knowingly collect personal information from anyone under 18. If you believe a minor has given us information, contact us and we will delete it.</P>

          <H>Security</H>
          <P>This site is served over HTTPS, and payment is handled by our booking provider&rsquo;s PCI-compliant checkout. No system is perfectly secure, but we take reasonable steps to protect your information and limit who can access it.</P>

          <H>Changes</H>
          <P>If we change this policy, we&rsquo;ll update the date at the top of this page. Material changes will be noted on the site.</P>

          <H>Contact</H>
          <P>Pet Rinse Repeat LLC &middot; 2030 Swift Street, North Kansas City, MO 64116<br />
            <a href={site.phoneHref} className="text-pink font-semibold underline">{site.phone}</a> &middot; <a href={`mailto:${site.email}`} className="text-pink font-semibold underline">{site.email}</a></P>

          <p className="text-sm text-ink-soft mt-10 m-0"><Link href="/" className="text-pink font-semibold underline">Back home</Link></p>
        </article>
      </div>
    </>
  );
}
