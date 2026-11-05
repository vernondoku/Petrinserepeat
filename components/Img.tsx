import meta from "@/data/images.json";

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes"> & {
  /** basename of a file in public/media, e.g. "ath1" (no extension) */
  name: keyof typeof meta;
  /** CSS `sizes` hint. Defaults to a 3-column-ish layout. */
  sizes?: string;
  priority?: boolean;
};

/**
 * Responsive <img> backed by pre-generated WebP variants (480/800/1200 wide) in public/media.
 * Always emits width/height (no layout shift) and lazy-loads unless `priority` is set.
 */
export default function Img({ name, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw", priority, alt = "", className, ...rest }: Props) {
  const m = meta[name];
  const widths = m.widths;
  const srcSet = widths.map((w) => `/media/${name}-${w}.webp ${w}w`).join(", ");
  const fallback = widths.includes(800) ? 800 : widths[widths.length - 1];
  return (
    <img
      src={`/media/${name}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      {...rest}
    />
  );
}
