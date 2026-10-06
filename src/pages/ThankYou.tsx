import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";

export function ThankYou() {
  return (
    <div className="relative w-full min-h-[70vh] bg-[#FBFBFB] text-[#0D0D0D] flex-1 flex items-center justify-center border-t border-gray-200/80 px-4 pt-32 pb-24">
      <Helmet>
        <title>Thank You | Open Brands</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-xl mx-auto text-center flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full bg-[#BFF549]/30 border border-[#BFF549] flex items-center justify-center mb-8">
          <CheckCircle2 className="w-8 h-8 text-[#70c910]" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.05] mb-6 text-balance">
          Got it, thank you.
        </h1>
        <p className="text-base sm:text-xl text-gray-600 font-medium leading-relaxed mb-10 text-balance">
          {"I'll send your website review within 24 hours. If you'd rather talk now, you can still book a call."}
        </p>
        <ButtonWithIcon to="/contact#book" variant="lime" size="lg">
          Book a call
        </ButtonWithIcon>
      </motion.div>
    </div>
  );
}
