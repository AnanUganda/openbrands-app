import React from "react";

interface SectionLabelProps {
  label: string;
  align?: 'center' | 'left';
  dark?: boolean;
}

export function SectionLabel({ label, align = 'center', dark = false }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
      <div className={`w-4 h-4 rounded-full ${dark ? 'bg-white text-[#0D0D0D]' : 'bg-[#0D0D0D] text-white'} flex items-center justify-center shrink-0 shadow-xs`}>
        <svg 
          viewBox="0 0 24 24" 
          className="w-2.5 h-2.5 fill-current animate-[spin_8s_linear_infinite]"
        >
          <path d="M12 1.5l2.9 6.3 6.9 0.7-5.1 4.7 1.4 6.8-6.1-3.4-6.1 3.4 1.4-6.8-5.1-4.7 6.9-0.7z" />
        </svg>
      </div>
      <span className={`text-xs font-semibold tracking-wide uppercase ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  );
}

