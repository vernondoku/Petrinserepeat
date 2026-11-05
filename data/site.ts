import type images from "./images.json";
export type ImgName = keyof typeof images;

/**
 * SITE CONTENT — Pet Rinse Repeat. Edit this file to change copy, prices, areas, FAQ.
 * Prices come straight from the three MoeGo service lists Vern exported on Nov 4, 2026
 * (mobile dog, salon, Here Kitty mobile cat). Do not invent numbers; if something is missing, say so.
 */

export type Service = "mobile" | "salon" | "cat";

export const site = {
  name: "Pet Rinse Repeat",
  legalName: "Pet Rinse Repeat LLC",
  tagline: "Let the groomer come to you.",
  description:
    "Kansas City pet grooming, your way: mobile dog grooming in your driveway, a full-service salon in North Kansas City, and cat-only mobile grooming.",
  url: "https://www.petrinserepeat.com",
  phone: "(816) 606-4951",
  phoneHref: "tel:+18166064951",
  email: "scheduling@petrinserepeat.com",
  address: { street: "2030 Swift Street", city: "North Kansas City", state: "MO", zip: "64116" },
  /** Posted on the salon door. */
  salonHours: "Tuesday–Saturday, 9:00 AM–5:00 PM",
  salonHoursSchema: ["Tu 09:00-17:00", "We 09:00-17:00", "Th 09:00-17:00", "Fr 09:00-17:00", "Sa 09:00-17:00"],
  /** One MoeGo storefront per service. Confirmed by Vern Nov 4, 2026. */
  booking: {
    mobile: "https://booking.moego.pet/ol/PetRinseRepeat/book",
    salon: "https://booking.moego.pet/ol/PetRinseRepeatGroomery/book",
    cat: "https://booking.moego.pet/ol/HereKittyMobileGrooming/book",
  } satisfies Record<Service, string>,
  /** Two Google Business Profiles, kept separate on purpose. Counts checked Nov 4, 2026. */
  google: {
    salon: { rating: 4.7, reviewCount: 776, url: "https://www.google.com/maps?cid=1949656064016998585" },
    mobile: { rating: 4.9, reviewCount: 38 },
  },
  social: {
    facebook: "https://www.facebook.com/petrinserepeat",
    instagram: "https://www.instagram.com/pet.rinse.repeat",
    pinterest: "https://www.pinterest.com/petrinserepeatpetgrooming",
  },
  herekitty: { name: "Here Kitty Grooming", url: "https://herekittygrooming.com" },
};

export const nav = [
  { href: "/mobile-grooming/", label: "Mobile grooming" },
  { href: "/salon-grooming/", label: "Salon" },
  { href: "/cat-grooming/", label: "Cat grooming" },
  { href: "/service-areas/", label: "Service areas" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
];

/** Cities with a live page on the old site (both URL generations). Each gets /service-areas/<slug>/. */
export const cities: { slug: string; name: string; state: "MO" | "KS" }[] = [
  { slug: "north-kansas-city-mo", name: "North Kansas City", state: "MO" },
  { slug: "kansas-city-mo", name: "Kansas City", state: "MO" },
  { slug: "kansas-city-ks", name: "Kansas City", state: "KS" },
  { slug: "gladstone-mo", name: "Gladstone", state: "MO" },
  { slug: "liberty-mo", name: "Liberty", state: "MO" },
  { slug: "parkville-mo", name: "Parkville", state: "MO" },
  { slug: "platte-city-mo", name: "Platte City", state: "MO" },
  { slug: "riverside-mo", name: "Riverside", state: "MO" },
  { slug: "smithville-mo", name: "Smithville", state: "MO" },
  { slug: "kearney-mo", name: "Kearney", state: "MO" },
  { slug: "independence-mo", name: "Independence", state: "MO" },
  { slug: "blue-springs-mo", name: "Blue Springs", state: "MO" },
  { slug: "lees-summit-mo", name: "Lee's Summit", state: "MO" },
  { slug: "raytown-mo", name: "Raytown", state: "MO" },
  { slug: "raymore-mo", name: "Raymore", state: "MO" },
  { slug: "grandview-mo", name: "Grandview", state: "MO" },
  { slug: "brookside-mo", name: "Brookside", state: "MO" },
  { slug: "ward-parkway-mo", name: "Ward Parkway", state: "MO" },
  { slug: "zona-rosa-mo", name: "Zona Rosa", state: "MO" },
  { slug: "overland-park-ks", name: "Overland Park", state: "KS" },
  { slug: "prairie-village-ks", name: "Prairie Village", state: "KS" },
  { slug: "leawood-ks", name: "Leawood", state: "KS" },
  { slug: "olathe-ks", name: "Olathe", state: "KS" },
  { slug: "lenexa-ks", name: "Lenexa", state: "KS" },
  { slug: "shawnee-ks", name: "Shawnee", state: "KS" },
  { slug: "merriam-ks", name: "Merriam", state: "KS" },
  { slug: "mission-ks", name: "Mission", state: "KS" },
  { slug: "fairway-ks", name: "Fairway", state: "KS" },
  { slug: "westwood-ks", name: "Westwood", state: "KS" },
  { slug: "bonner-springs-ks", name: "Bonner Springs", state: "KS" },
  { slug: "basehor-ks", name: "Basehor", state: "KS" },
  { slug: "lansing-ks", name: "Lansing", state: "KS" },
  { slug: "leavenworth-ks", name: "Leavenworth", state: "KS" },
];

/** How grooming is billed. Verbatim rule from Vern / the MoeGo catalog. */
export const pricingRules = {
  summary: "Haircuts and desheds are billed by the hour with a one-hour minimum. Time past the first hour is charged in 15-minute increments.",
  details: [
    "Prices are based on hands-on grooming time, not total time at the salon or in the van.",
    "One-hour minimum on hourly services; after that, 15-minute increments (a quarter of the hourly rate).",
    "Your groomer sets the size category for desheds based on your dog's coat and build.",
    "Bath & brush services are flat-rate by weight.",
  ],
};

type Rate = { name: string; rate: number; per: "hr" | "flat"; note?: string };

export const mobilePricing: { group: string; items: Rate[] }[] = [
  { group: "Haircuts & full service", items: [
    { name: "Full service groom", rate: 130, per: "hr" },
    { name: "Poodles, doodles & other oodles", rate: 140, per: "hr" },
    { name: "Puppy's first groom", rate: 130, per: "hr", note: "$140/hr for oodles" },
    { name: "Face, feet & fanny", rate: 130, per: "hr", note: "$140/hr for oodles" },
  ] },
  { group: "Desheds", items: [
    { name: "Small / medium double coat", rate: 130, per: "hr" },
    { name: "Large double coat", rate: 170, per: "hr" },
  ] },
  { group: "Flat-coat bath & brush out", items: [
    { name: "Small (1–22 lbs)", rate: 100, per: "flat" },
    { name: "Medium (23–57 lbs)", rate: 120, per: "flat" },
    { name: "Large (58–80 lbs)", rate: 140, per: "flat" },
    { name: "Extra large (81–120 lbs)", rate: 165, per: "flat" },
  ] },
  { group: "À la carte", items: [
    { name: "Nail care", rate: 50, per: "flat" },
    { name: "Nail trim & dremel, additional pet", rate: 20, per: "flat" },
  ] },
];

export const salonPricing: { group: string; items: Rate[] }[] = [
  { group: "Haircuts & full service", items: [
    { name: "Full service groom", rate: 100, per: "hr" },
    { name: "Poodles, doodles & other oodles", rate: 120, per: "hr" },
    { name: "Puppy's first groom", rate: 100, per: "flat" },
    { name: "Puppy 2-week desensitizing + nail trim", rate: 40, per: "flat" },
    { name: "Face, feet & fanny", rate: 100, per: "hr", note: "$120/hr for oodles" },
  ] },
  { group: "Desheds", items: [
    { name: "Small / medium double coat (Pom, long-coat Chi)", rate: 100, per: "hr" },
    { name: "Large / XL double coat (Husky, Golden, GSD)", rate: 140, per: "hr" },
  ] },
  { group: "Flat-coat bath & brush out", items: [
    { name: "X-small", rate: 60, per: "flat" },
    { name: "Small (1–22 lbs)", rate: 70, per: "flat" },
    { name: "Medium (23–57 lbs)", rate: 90, per: "flat" },
    { name: "Large (58–99 lbs)", rate: 100, per: "flat" },
    { name: "X-large (100–150 lbs)", rate: 125, per: "flat" },
  ] },
  { group: "À la carte", items: [
    { name: "Paw-ticure", rate: 40, per: "flat" },
    { name: "Sani & pant trim", rate: 35, per: "flat" },
    { name: "Sanitary trim", rate: 25, per: "flat" },
    { name: "Paw pads", rate: 20, per: "flat" },
    { name: "Nail care", rate: 20, per: "flat" },
    { name: "Ear cleaning", rate: 15, per: "flat" },
    { name: "Extra scissoring work", rate: 15, per: "flat" },
  ] },
  { group: "Salon cat grooming", items: [
    { name: "Cuddle Me Kitty Teddy Bear Glow Up", rate: 230, per: "flat", note: "medium & long coats" },
    { name: "Complete Purrrr Package (bath, brush, sani)", rate: 200, per: "flat", note: "short coats" },
    { name: "Happy Kitty Glow Up haircut, no bath", rate: 140, per: "flat" },
    { name: "Soft Kitty bath, brush out & sani", rate: 140, per: "flat" },
    { name: "Sleepy Kitty long-coat brush out + sani", rate: 100, per: "flat" },
    { name: "Sleepy Kitty short-coat brush out", rate: 80, per: "flat" },
    { name: "Purr, purr, purr mani/pedi", rate: 20, per: "flat" },
  ] },
];

/** Here Kitty mobile cat grooming (separate MoeGo account). */
export const catPricing: Rate[] = [
  { name: "Cuddle Me Kitty Teddy Bear Glow Up", rate: 250, per: "flat", note: "medium & long coats · about 2 hrs" },
  { name: "Complete Purrrr Package (bath, brush, sani)", rate: 200, per: "flat", note: "short coats · about 90 min" },
  { name: "Happy Kitty Glow Up haircut, no bath", rate: 170, per: "flat", note: "about 1 hr" },
  { name: "Soft Kitty bath, brush out & sani", rate: 150, per: "flat", note: "about 1 hr" },
  { name: "Sleepy Kitty long-coat brush out + sani", rate: 120, per: "flat" },
  { name: "Sleepy Kitty short-coat brush out", rate: 120, per: "flat" },
  { name: "Purr, purr, purr mani/pedi", rate: 50, per: "flat" },
];

/** Boarding pricing not yet provided by Vern (MoeGo lists it at $0). Page uses a contact CTA until it is. */
export const boardingPricing: Rate[] | null = null;

export const faqs: { q: string; a: string }[] = [
  { q: "How is grooming priced?", a: pricingRules.summary + " Bath & brush services are a flat rate by weight. You'll see the hourly rate for your dog's service when you book." },
  { q: "Where is the salon?", a: `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}. Open ${site.salonHours}.` },
  { q: "Do you groom cats?", a: "Yes, two ways. Our salon offers cat grooming at the North Kansas City location, and Here Kitty, our cat-only mobile service, comes to you." },
  { q: "How do I book?", a: "Online, any time. Each service has its own booking page — mobile dog grooming, the salon, and mobile cat grooming — so pick the one you want and choose a time." },
];
