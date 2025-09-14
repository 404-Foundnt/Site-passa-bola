import { motion, AnimatePresence } from "framer-motion";
export default function ScoreTicker({ items }){
  return (
    <div className="card overflow-hidden">
      <div className="text-sm text-white/60 mb-2">Placar ao vivo</div>
      <div className="h-10 relative">
        <AnimatePresence initial={false}>
          {items.map((m)=> (
            <motion.div key={m.home+m.away+m.minute} className="absolute inset-0 flex items-center justify-between"
              initial={{y:24,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-24,opacity:0}} transition={{duration:0.35}}>
              <div className="text-sm">{m.home} <span className="text-white/50">vs</span> {m.away}</div>
              <div className="text-lg font-mono">{m.score} <span className="text-white/50 text-xs ml-1">{m.minute}'</span></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
