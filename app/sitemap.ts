import type { MetadataRoute } from "next";
import { site, cities } from "@/data/site";
import { getPosts } from "@/lib/posts";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const top = ["/", "/mobile-grooming/", "/salon-grooming/", "/cat-grooming/", "/pricing/", "/service-areas/", "/pet-boarding/", "/about/", "/blog/", "/contact/", "/careers/", "/privacy/", "/sms-terms/"];
  return [
    ...top.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...cities.map((c) => ({ url: `${site.url}/service-areas/${c.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...getPosts().filter((p) => !p.draft).map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
