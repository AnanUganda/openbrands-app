interface PostImageProps {
  src?: string;
  alt: string;
  eager?: boolean;
}

/**
 * A post's cover image, falling back to a branded panel rather than stock
 * photography when the post has no image set in the CMS.
 */
export function PostImage({ src, alt, eager = false }: PostImageProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    );
  }

  return (
    <div className="w-full h-full bg-[#0D0D0D] flex items-center justify-center relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #BFF549 0 1px, transparent 1px 16px)",
        }}
      />
      <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#BFF549]/10 blur-2xl" aria-hidden="true" />
      <span className="relative text-lg font-bold tracking-tight text-white">
        Open Brands<span className="text-[#BFF549]">.</span>
      </span>
    </div>
  );
}
