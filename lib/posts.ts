import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Service, ImgName } from "@/data/site";

export type Post = {
  slug: string; title: string; seoTitle: string; description: string; keyword: string; supporting: string[];
  date: string; refreshes: string | null; service: Service; cta: string; image: ImgName; imageAlt: string;
  readMinutes: number; review: string[]; html: string; excerpt: string; draft: boolean;
};

const dir = path.join(process.cwd(), "content", "posts");

export function getPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => {
    const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
    const html = marked.parse(content, { gfm: true }) as string;
    const excerpt = content.replace(/[#*_>\[\]()`|]/g, " ").replace(/\s+/g, " ").trim().slice(0, 180) + "…";
    return { ...(data as Omit<Post, "html" | "excerpt" | "draft">), html, excerpt, draft: Boolean((data as { draft?: boolean }).draft) };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) { return getPosts().find((p) => p.slug === slug); }
