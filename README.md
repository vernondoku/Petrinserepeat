# petrinserepeat.com

Static Next.js site for Pet Rinse Repeat (Kansas City mobile + salon pet grooming). Same stack as jogdatdog.com.

- Content and prices: `data/site.ts` (prices mirror the MoeGo service lists; booking links are one MoeGo storefront per service).
- Images: `public/media` with pre-generated WebP variants, metadata in `data/images.json`.
- Tracking: `lib/tracking.ts` — `booking_funnel_entry` (placement + service) and `phone_click` to the GTM dataLayer; MoeGo links carry gclid/UTMs.
- Deploy: push `main` → Vercel. Set `NEXT_PUBLIC_GTM_ID` for production.
- Redirects from the old WordPress URLs live in `vercel.json`.
