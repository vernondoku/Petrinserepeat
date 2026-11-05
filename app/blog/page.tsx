import type { Metadata } from "next";
import Link from "next/link";
import Img from "@/components/Img";
import { FinalCTA } from "@/components/sections";
import { getListedPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Grooming tips & guides", description: "Plain-language answers from Pet Rinse Repeat: what grooming costs in Kansas City, mobile vs. salon, how often to groom, doodles, matting, desheds, puppies, anxious dogs, and nail care.", alternates: { canonical: "/blog/" } };

export default function Page() {
  const posts = getListedPosts();
  return (
    <>
      <section className="wrap pt-12 md:pt-16 pb-8">
        <p className="kick m-0">The blog</p>
        <h1 className="disp text-[36px] md:text-[48px] m-0">Grooming, <span className="accent">explained.</span></h1>
        <p className="text-ink-soft text-lg mt-3 m-0 max-w-[640px]">The questions people ask before they book — costs, mobile vs. salon, coat care, puppies, nervous dogs — answered by the team that grooms Kansas City every day.</p>
      </section>
      <section className="wrap pb-16">
        <ul className="m-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p) => (
            <li key={p.slug} className="card overflow-hidden flex flex-col">
              <Link href={`/blog/${p.slug}/`} className="no-underline flex flex-col h-full">
                <Img name={p.image} alt={p.imageAlt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="w-full h-[180px] object-cover" />
                <span className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-xs text-ink-soft">{new Date(p.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {p.readMinutes} min read</span>
                  <span className="font-display font-bold text-navy text-[19px] leading-snug">{p.title}</span>
                  <span className="text-ink-soft text-[15px] leading-relaxed">{p.description}</span>
                  <span className="text-pink font-semibold text-sm mt-auto pt-2">Read →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <FinalCTA service="mobile" placement="blog_index_final" />
    </>
  );
}
