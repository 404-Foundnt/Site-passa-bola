import { motion } from "framer-motion";
export default function StatCard({ label, value, diff }){
  return (
    <motion.div className="card" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.25}}>
      <div className="text-sm text-white/60">{label}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
      <div className="text-xs mt-1 text-emerald-400">{diff}</div>
    </motion.div>
  );
}
