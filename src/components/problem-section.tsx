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
    <section className="relative w-full py-24 md:py-32 bg-[#F7F7F7] overflow-hidden z-10">
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
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-6 max-w-[800px] mx-auto">
            Most property businesses already have what they need to grow.
          </h2>
          <p className="text-[22px] font-normal text-gray-600 max-w-3xl mx-auto">
            They’re just not using it properly.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-4">
            The gap isn’t visibility. It’s trust, systems, and conversion.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400/20 via-cyan-400 to-cyan-400/20 mx-auto rounded-full mt-8" />
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
            className="group relative p-8 rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md hover:border-cyan-200"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mb-8 shadow-inner ring-1 ring-cyan-100 group-hover:bg-cyan-100 group-hover:ring-cyan-300 transition-all duration-500">
                <Activity className="w-7 h-7 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-4 leading-snug">
                Trust Barrier
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Outdated sites, weak branding, and sloppy communication kill deals before the first conversation. Buyers decide in seconds.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative p-8 rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md hover:border-cyan-200"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mb-8 shadow-inner ring-1 ring-cyan-100 group-hover:bg-cyan-100 group-hover:ring-cyan-300 transition-all duration-500">
                <Target className="w-7 h-7 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-4 leading-snug">
                System Leakage
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Missed follow-ups and broken processes lose qualified prospects every month. In property, one lost inquiry can cost six figures.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative p-8 rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md hover:border-cyan-200"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mb-8 shadow-inner ring-1 ring-cyan-100 group-hover:bg-cyan-100 group-hover:ring-cyan-300 transition-all duration-500">
                <Unplug className="w-7 h-7 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-4 leading-snug">
                Invisible Growth
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Without clear tracking, you can’t answer: Which channel actually delivers? What’s our real conversion rate? Where should we double down?
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-20 text-center"
        >
          <p className="text-xl md:text-2xl font-medium text-[#1A1A1A] max-w-4xl mx-auto leading-relaxed">
            We eliminate these leaks and build the systems that create measurable, predictable growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
