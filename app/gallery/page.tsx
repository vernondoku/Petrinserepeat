import type { Metadata } from "next";
import Img from "@/components/Img";
import { FinalCTA } from "@/components/sections";
import type { ImgName } from "@/data/site";
import alts from "@/data/photo-alts.json";

export const metadata: Metadata = { title: "Photo gallery", description: "Real Pet Rinse Repeat clients, fresh off the table — in the mobile grooming vans and at the North Kansas City salon.", alternates: { canonical: "/gallery/" } };

const extra: Record<string, string> = {
  "dog-goldendoodle-chiefs": "A Goldendoodle in a Chiefs bandana after a groom in the van",
  "dog-poodle-chiefs": "A standard Poodle in a Chiefs jersey with yellow-dyed feet",
  "dog-poodle-tux": "A small poodle in a tuxedo harness on the van table",
  "dog-sheepadoodle-van": "A sheepadoodle inside the van after a groom",
  "dog-bulldog-van": "An English Bulldog on the table inside the van",
  "dog-yorkie-hands": "A Yorkie's trimmed face held in the groomer's hands",
  "dog-shihtzu-chiefs": "A Shih Tzu mix in a Chiefs bandana",
  "cat-persian-salon": "A Persian cat on the salon grooming table",
  "dog-corgi-salon": "A Corgi on the salon grooming table",
  "dog-pitbull-polish": "A pit bull getting red nail polish at the salon",
  "salon-golden-table": "A Golden Retriever on the salon table while a groomer works on a paw",
  "dogs-doodle-lab": "A chocolate doodle and a yellow Lab, both grinning",
  "puppy-bow-chair": "A cream puppy with a sparkly bow on a yellow chair",
};
const all: Record<string, string> = { ...(alts as Record<string, string>), ...extra };
const van = Object.keys(all).filter((k) => k.startsWith("van-") && k !== "van-groomer-april");
const salon = Object.keys(all).filter((k) => k.startsWith("salon-") || k.endsWith("-salon") || k === "dog-poodle-chiefs" || k === "dog-pitbull-polish");
const misc = Object.keys(all).filter((k) => !van.includes(k) && !salon.includes(k) && k !== "van-groomer-april");

function Grid({ names }: { names: string[] }) {
  return (
    <ul className="m-0 p-0 list-none grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {names.map((n) => (
        <li key={n} className="rounded-[20px] overflow-hidden shadow-card aspect-square bg-white">
          <Img name={n as ImgName} alt={all[n]} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="w-full h-full object-cover" />
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <section className="wrap pt-12 md:pt-16 pb-8">
        <p className="kick m-0">Gallery</p>
        <h1 className="disp text-[36px] md:text-[48px] m-0">Fresh off <span className="accent">the table.</span></h1>
        <p className="text-ink-soft text-lg mt-3 m-0 max-w-[600px]">Real clients, photographed by the groomers who did the work — in the vans and at the salon.</p>
      </section>
      <section className="wrap pb-12"><h2 className="disp text-[26px] m-0 mb-4">In the van</h2><Grid names={[...van, ...misc.filter((k) => k.includes("van") || k.includes("doodle-lab") || k.includes("yorkie") || k.includes("shihtzu-chiefs") || k.includes("puppy"))]} /></section>
      <section className="wrap pb-16"><h2 className="disp text-[26px] m-0 mb-4">At the salon</h2><Grid names={salon} /></section>
      <FinalCTA service="mobile" placement="gallery_final" />
    </>
  );
}
