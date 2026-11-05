import Link from "next/link";
export default function NotFound() {
  return (
    <section className="band min-h-[60vh]"><div className="wrap py-20 flex flex-col gap-4 items-start">
      <p className="kick m-0">404</p>
      <h1 className="disp text-[40px] md:text-[56px] m-0">That page <span className="accent">ran off.</span></h1>
      <p className="text-ink-soft text-lg m-0">Try one of these instead.</p>
      <div className="flex flex-wrap gap-3"><Link href="/mobile-grooming/" className="btn btn-primary">Mobile grooming</Link><Link href="/salon-grooming/" className="btn btn-ghost">Salon</Link><Link href="/pricing/" className="btn btn-ghost">Pricing</Link></div>
    </div></section>
  );
}
