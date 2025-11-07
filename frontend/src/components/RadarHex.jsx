import { memo, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * RadarHex — hexágono reativo leve (SVG puro)
 * props:
 *  - stats: { dri, chu, pas, vel, def, forc } (0-100)
 *  - size: px do SVG (ex.: 260)
 *  - color: cor principal (ex.: "#7C3AED")
 */
const AXES = [
  { key: "dri", label: "DRI" }, // drible
  { key: "chu", label: "CHU" }, // chute
  { key: "pas", label: "PAS" }, // passe
  { key: "vel", label: "VEL" }, // velocidade
  { key: "def", label: "DEF" }, // defesa
  { key: "forc", label: "FOR" }, // força/físico
];

function toPoint(cx, cy, r, angleRad) {
  return [cx + r * Math.cos(angleRad), cy + r * Math.sin(angleRad)];
}

function ringPoints(cx, cy, r, startAngleRad) {
  const step = (Math.PI * 2) / AXES.length;
  const pts = [];
  for (let i = 0; i < AXES.length; i++) {
    const a = startAngleRad + step * i;
    pts.push(toPoint(cx, cy, r, a));
  }
  return pts;
}

function polyToAttr(points) {
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

export default memo(function RadarHex({ stats, size = 260, color = "#7C3AED" }) {
  const pad = 16;
  const cx = size / 2;
  const cy = size / 2;
  const R = (size / 2) - pad;
  const start = -Math.PI / 2; // começa para cima (12h)

  const grid = useMemo(() => {
    const rings = [0.33, 0.66, 1].map((k) => ringPoints(cx, cy, R * k, start));
    return rings.map(polyToAttr);
  }, [cx, cy, R]);

  const axesLines = useMemo(() => {
    const step = (Math.PI * 2) / AXES.length;
    return AXES.map((_, i) => {
      const [x, y] = toPoint(cx, cy, R, start + step * i);
      return { x1: cx, y1: cy, x2: x, y2: y };
    });
  }, [cx, cy, R]);

  const poly = useMemo(() => {
    const step = (Math.PI * 2) / AXES.length;
    const pts = AXES.map((a, i) => {
      const v = Math.max(0, Math.min(100, Number(stats?.[a.key] ?? 0)));
      const r = (v / 100) * R;
      return toPoint(cx, cy, r, start + step * i);
    });
    return polyToAttr(pts);
  }, [stats, cx, cy, R]);

  const labels = useMemo(() => {
    const step = (Math.PI * 2) / AXES.length;
    return AXES.map((a, i) => {
      const [x, y] = toPoint(cx, cy, R + 14, start + step * i);
      return { ...a, x, y };
    });
  }, [cx, cy, R]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Atributos da jogadora (radar)">
      {/* grid */}
      {grid.map((g, i) => (
        <polygon key={i} points={g} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
      ))}

      {/* eixos */}
      {axesLines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="rgba(255,255,255,.15)" strokeWidth="1" />
      ))}

      {/* shape dos stats */}
      <motion.polygon
        points={poly}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        fill={color + "33"} /* 20% */
        stroke={color}
        strokeWidth="2"
      />

      {/* labels */}
      {labels.map((l) => (
        <text key={l.key} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle" className="text-[10px] font-semibold fill-white/80">
          {l.label}
        </text>
      ))}
    </svg>
  );
});
