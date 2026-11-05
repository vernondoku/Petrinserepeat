// Smoke test: serves ./out, loads every page on a phone-sized viewport, and checks the things that must never break.
// Run: npm run build && npm test
import { chromium, devices } from "playwright";
import { spawn } from "node:child_process";

const PAGES = ["/", "/mobile-dog-gym/", "/dog-training/", "/pricing/", "/our-pack/", "/about/", "/faq/", "/book/"];
const server = spawn("python3", ["-m", "http.server", "4190"], { cwd: "out", stdio: "ignore" });
await new Promise((r) => setTimeout(r, 1200));
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
let failures = 0;
const fail = (m) => { failures++; console.log("  ✗", m); };
try {
  for (const path of PAGES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => { if (m.type() === "error" && !/fonts\.g|net::ERR_TUNNEL/.test(m.text())) errors.push(m.text()); });
    const res = await page.goto("http://localhost:4190" + path, { waitUntil: "load" });
    console.log(path);
    if (!res || res.status() !== 200) fail(`status ${res && res.status()}`);
    if ((await page.locator("h1").count()) !== 1) fail("expected exactly one h1");
    const book = page.locator('a[href*="booking.moego.pet"]');
    if ((await book.count()) < 1) fail("no MoeGo booking link");
    for (const h of await book.evaluateAll((as) => as.map((a) => a.href))) if (!h.startsWith("https://booking.moego.pet/ol/JogDatDog")) fail("bad booking href " + h);
    const sticky = page.locator('div.fixed.bottom-0 a[href*="moego"]');
    if (!(await sticky.first().isVisible())) fail("sticky mobile Book bar not visible");
    const wide = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    if (wide) fail("horizontal overflow on phone width");
    const noAlt = await page.locator("img:not([alt])").count();
    if (noAlt) fail(`${noAlt} images missing alt`);
    if (errors.length) fail("console/page errors: " + errors.slice(0, 2).join(" | "));
    await page.close();
  }
} finally { await browser.close(); server.kill(); }
console.log(failures ? `\n${failures} failure(s)` : "\nAll smoke checks passed");
process.exit(failures ? 1 : 0);
