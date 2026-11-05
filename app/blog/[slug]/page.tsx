import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Img from "@/components/Img";
import BookButton from "@/components/BookButton";
import { getPosts, getPost } from "@/lib/posts";
import { site } from "@/data/site";

export function generateStaticParams() { return getPosts().map((p) => ({ slug: p.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = getPost(slug);
  if (!p) return {};
  return { title: { absolute: p.seoTitle }, description: p.description, robots: p.draft ? { index: false, follow: true } : undefined, alternates: { canonical: `/blog/${p.slug}/` }, openGraph: { type: "article", title: p.title, description: p.description, publishedTime: p.date, images: [{ url: `/media/${p.image}.jpg` }] } };
}

const serviceHref: Record<string, string> = { mobile: "/mobile-grooming/", salon: "/salon-grooming/", cat: "/cat-grooming/" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = getPost(slug);
  if (!p) notFound();
  const others = getPosts().filter((x) => x.slug !== p.slug).slice(0, 3);
  const schema = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description, datePublished: p.date, dateModified: p.date,
    mainEntityOfPage: `${site.url}/blog/${p.slug}/`, image: `${site.url}/media/${p.image}.jpg`,
    author: { "@type": "Organization", name: site.name }, publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/media/logo-groomery.png` } },
  };
  const date = new Date(p.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="wrap pt-10 md:pt-14 pb-16">
        <div className="max-w-[760px] mx-auto">
          <p className="text-sm text-ink-soft m-0 mb-3"><Link href="/blog/" className="text-pink font-semibold">Blog</Link> · {date} · {p.readMinutes} min read</p>
          <h1 className="disp text-[32px] md:text-[44px] leading-[1.1] m-0">{p.title}</h1>
          <p className="text-ink-soft text-lg mt-4 m-0">{p.description}</p>
        </div>
        <Img name={p.image} alt={p.imageAlt} priority sizes="(min-width: 1024px) 900px, 100vw" className="w-full max-w-[900px] mx-auto h-[260px] md:h-[420px] object-cover rounded-[24px] shadow-card my-8" />
        <div className="prose max-w-[760px] mx-auto" dangerouslySetInnerHTML={{ __html: p.html }} />
        <div className="max-w-[760px] mx-auto mt-10 card p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1"><p className="kick m-0">Next step</p><p className="disp text-[22px] m-0">Pick a time online — it takes about two minutes.</p><p className="text-ink-soft m-0 mt-1 text-[15px]">Or call <a href={site.phoneHref} className="text-pink font-semibold">{site.phone}</a>. See <Link href="/pricing/" className="text-pink font-semibold">pricing</Link> or the <Link href={serviceHref[p.service]} className="text-pink font-semibold">service page</Link>.</p></div>
          <BookButton service={p.service} placement={`blog_${p.slug}`}>{p.cta}</BookButton>
        </div>
        {p.draft && p.review.length > 0 && (
          <aside className="max-w-[760px] mx-auto mt-8 rounded-2xl border-2 border-dashed border-sun/70 bg-white p-5 text-sm">
            <p className="m-0 font-bold text-navy">Draft — needs owner review before publishing</p>
            <ul className="m-0 mt-2 pl-5 text-ink-soft">{p.review.map((r) => <li key={r}>{r}</li>)}</ul>
          </aside>
        )}
        {others.length > 0 && (
          <div className="max-w-[760px] mx-auto mt-12">
            <p className="kick m-0 mb-3">Keep reading</p>
            <ul className="m-0 p-0 list-none grid sm:grid-cols-3 gap-4">
              {others.map((o) => <li key={o.slug}><Link href={`/blog/${o.slug}/`} className="card p-4 flex flex-col gap-1 no-underline h-full hover:border-pink"><span className="font-display font-bold text-navy text-[16px] leading-snug">{o.title}</span><span className="text-xs text-ink-soft">{o.readMinutes} min read</span></Link></li>)}
            </ul>
          </div>
        )}
      </article>
    </>
  );
}
