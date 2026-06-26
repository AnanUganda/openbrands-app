import React from "react";

export function SectionLabel({ label, align = 'center' }: { label: string, align?: 'center' | 'left' }) {
  return (
    <div className={`flex ${align === 'center' ? 'justify-center' : 'justify-start'} mb-6`}>
      <div className="inline-flex items-center gap-3 pl-0 pr-4 py-1.5 rounded-r-md bg-[#161616] border border-white/[0.04]">
        <div className="w-1 h-5 bg-[#BFF549] rounded-full" />
        <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
      </div>
    </div>
  );
}
