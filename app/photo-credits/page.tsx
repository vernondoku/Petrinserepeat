import type { Metadata } from "next";
import Link from "next/link";
import landmarkPhotos from "@/data/landmark-photos.json";
import images from "@/data/images.json";
import { cities } from "@/data/site";

export const metadata: Metadata = { title: "Photo credits", description: "Credits and licenses for the landmark photographs used on Pet Rinse Repeat's service-area pages.", alternates: { canonical: "/photo-credits/" }, robots: { index: false, follow: true } };

type LP = { slug: string | null; landmark: string; file: string; alt: string; status: string; approved?: boolean; creator?: string | null; license?: string | null; licenseUrl?: string | null; source?: string | null };

export default function Page() {
  const used = (landmarkPhotos as LP[]).filter((x) => x.approved && x.file in images);
  return (
    <section className="wrap pt-12 md:pt-16 pb-16 max-w-[800px]">
      <p className="kick m-0">Credits</p>
      <h1 className="disp text-[32px] md:text-[40px] m-0">Landmark photo credits</h1>
      <p className="text-ink-soft mt-3">The photos of local landmarks on our <Link href="/service-areas/" className="text-pink font-semibold">service-area pages</Link> were taken by the photographers below and are used under the licenses noted. Each has been resized and converted to WebP; where we cropped, it says so. Photos of pets and of our salon and vans are our own.</p>
      {used.length === 0 ? <p className="text-ink-soft">No third-party landmark photos are in use yet.</p> : (
        <ul className="m-0 p-0 list-none grid gap-3 mt-6 text-[15px]">
          {used.map((x) => { const city = cities.find((c) => c.slug === x.slug); return (
            <li key={x.file} className="card p-4">
              <strong className="text-navy">{x.landmark}</strong> — <Link href={`/service-areas/${x.slug}/`} className="text-pink">{city ? `${city.name}, ${city.state}` : x.slug}</Link>
              <div className="text-ink-soft mt-1">
                {x.creator ? <>Photo by {x.creator}. </> : null}
                {x.license ? (x.licenseUrl ? <><a href={x.licenseUrl} target="_blank" rel="noopener" className="underline">{x.license}</a>. </> : <>{x.license}. </>) : null}
                {x.source ? <a href={x.source} target="_blank" rel="noopener nofollow" className="underline">Source</a> : null}
                {" "}· resized, converted to WebP.
              </div>
            </li>
          ); })}
        </ul>
      )}
    </section>
  );
}
