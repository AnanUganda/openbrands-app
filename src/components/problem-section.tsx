import { motion } from "motion/react";
import { Activity, Target, Unplug } from "lucide-react";

export function ProblemSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-black overflow-hidden z-10">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 max-w-[650px] mx-auto">
            Most Businesses Don’t Need More Marketing.
          </h2>
          <p className="text-[22px] font-normal text-gray-400 max-w-3xl mx-auto">
            They need a system that actually brings in customers.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500/10 via-cyan-500/50 to-cyan-500/10 mx-auto rounded-full mt-8" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-cyan-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 shadow-inner ring-1 ring-white/20 group-hover:bg-cyan-500/20 group-hover:ring-cyan-500/50 transition-all duration-500">
                <Activity className="w-7 h-7 text-gray-300 group-hover:text-cyan-400 transition-colors duration-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-snug">
                Agencies focus on activity
              </h3>
              <p className="text-gray-400 text-lg font-medium">
                Likes. Clicks. Impressions.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-cyan-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 shadow-inner ring-1 ring-white/20 group-hover:bg-cyan-500/20 group-hover:ring-cyan-500/50 transition-all duration-500">
                <Target className="w-7 h-7 text-gray-300 group-hover:text-cyan-400 transition-colors duration-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-snug">
                Business owners want outcomes
              </h3>
              <p className="text-gray-400 text-lg font-medium">
                Calls. Appointments. Sales.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-cyan-500/30"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 shadow-inner ring-1 ring-white/20 group-hover:bg-cyan-500/20 group-hover:ring-cyan-500/50 transition-all duration-500">
                <Unplug className="w-7 h-7 text-gray-300 group-hover:text-cyan-400 transition-colors duration-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-snug">
                That gap is the problem
              </h3>
             <p className="text-gray-400 text-lg font-medium leading-relaxed">
                And it’s why many businesses lose trust in marketing.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
