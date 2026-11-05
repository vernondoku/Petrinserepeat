// Mobile Lighthouse across the main pages, N runs each, reports the median.
// Run: npm run build && npm run lighthouse  (optionally: RUNS=3 node scripts/lighthouse.mjs)
import { spawn, execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire(import.meta.url);
// PAGES=/,/pricing/ limits the run to specific paths.
const PAGES = process.env.PAGES ? Object.fromEntries(process.env.PAGES.split(",").map((p) => [p.replace(/\//g, "") || "home", p])) : { home: "/", "mobile-dog-gym": "/mobile-dog-gym/", "our-pack": "/our-pack/", pricing: "/pricing/", faq: "/faq/" };
const RUNS = Number(process.env.RUNS || 3);
const METHOD = process.env.METHOD || "simulate"; // simulate (PageSpeed-style) or devtools (real throttling)
const DIR = process.env.DIR || "out";
const PORT = 4195;
let chrome;
try { chrome = require("playwright").chromium.executablePath(); } catch { chrome = process.env.CHROME_PATH; }
const server = spawn("python3", ["-m", "http.server", String(PORT)], { cwd: DIR, stdio: "ignore" });
await new Promise((r) => setTimeout(r, 1200));
fs.mkdirSync(".lighthouse", { recursive: true });
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const rows = [];
try {
  for (const [name, path] of Object.entries(PAGES)) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) {
      const out = `.lighthouse/${name}-${i}.json`;
      execFileSync("npx", ["lighthouse", `http://localhost:${PORT}${path}`, `--chrome-path=${chrome}`, "--chrome-flags=--headless=new --no-sandbox", "--output=json", `--output-path=${out}`, "--quiet", "--only-categories=performance,accessibility,best-practices,seo", "--form-factor=mobile", "--screenEmulation.mobile", `--throttling-method=${METHOD}`], { stdio: "ignore" });
      const r = JSON.parse(fs.readFileSync(out, "utf8"));
      runs.push({ perf: r.categories.performance.score * 100, a11y: r.categories.accessibility.score * 100, bp: r.categories["best-practices"].score * 100, seo: r.categories.seo.score * 100,
        lcp: r.audits["largest-contentful-paint"].numericValue, cls: r.audits["cumulative-layout-shift"].numericValue, tbt: r.audits["total-blocking-time"].numericValue, si: r.audits["speed-index"].numericValue });
    }
    const m = Object.fromEntries(Object.keys(runs[0]).map((k) => [k, median(runs.map((x) => x[k]))]));
    rows.push({ page: name, Perf: Math.round(m.perf), A11y: Math.round(m.a11y), BP: Math.round(m.bp), SEO: Math.round(m.seo), "LCP ms": Math.round(m.lcp), CLS: +m.cls.toFixed(3), "TBT ms": Math.round(m.tbt), "SI ms": Math.round(m.si) });
  }
} finally { server.kill(); }
console.table(rows);
