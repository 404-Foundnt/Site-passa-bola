const fallbackSponsors = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/YouTube_2024.svg/300px-YouTube_2024.svg.png", alt: "YouTube" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Adidas_2022_logo.svg/300px-Adidas_2022_logo.svg.png", alt: "Adidas" },
  { src: "https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Puma_complete_logo.svg/300px-Puma_complete_logo.svg.png", alt: "Puma" }
];

export default function SponsorsRow({ items = [] }) {
  const list = items.length ? items : fallbackSponsors;
  const track = [...list, ...list];

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/10">
      <div className="px-6 py-4 flex items-center gap-8" style={{ animation: "ticker 18s linear infinite" }}>
        {track.map((item, index) => (
          <img
            key={`${item.src}-${index}`}
            src={item.src}
            alt={item.alt || "logo"}
            className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[rgba(16,12,36,0.9)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[rgba(16,12,36,0.9)] to-transparent" />
      <style>{`@keyframes ticker {0% {transform: translateX(0);} 100% {transform: translateX(-50%);}}`}</style>
    </div>
  );
}