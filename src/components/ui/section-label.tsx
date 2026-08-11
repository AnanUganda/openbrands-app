import React from "react";

export function SectionLabel({ label, align = 'center' }: { label: string, align?: 'center' | 'left' }) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
      <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-[8px] text-white font-bold shrink-0">
        ★
      </div>
      <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
        {label}
      </span>
    </div>
  );
}
