export default function BackgroundMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-[50vmax] h-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, var(--accent-color) 0%, transparent 60%)", opacity: 0.25, filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[40vmax] h-[40vmax] translate-x-1/2 translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, var(--secondary-color) 0%, transparent 65%)", opacity: 0.2, filter: "blur(100px)" }}
      />
    </div>
  );
}