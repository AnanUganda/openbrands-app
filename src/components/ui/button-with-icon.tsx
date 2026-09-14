import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonWithIconProps {
  children?: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  iconClassName?: string;
  variant?: "lime" | "dark" | "white" | "outline";
  size?: "default" | "sm" | "lg";
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  children = "Let's Collaborate",
  to,
  href,
  onClick,
  className,
  iconClassName,
  variant = "lime",
  size = "default",
  icon = <ArrowUpRight size={16} />,
  type = "button",
  disabled,
  target,
  rel,
}) => {
  const variantStyles = {
    lime: "bg-[#BFF549] text-black hover:bg-[#aee63d] shadow-[0_4px_20px_rgba(191,245,73,0.3)]",
    dark: "bg-[#0D0D0D] text-white hover:bg-black shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
    white: "bg-white text-[#0D0D0D] border border-gray-200 hover:bg-gray-50 shadow-sm",
    outline: "bg-transparent text-current border border-current/20 hover:border-current/40",
  };

  const iconCircleVariants = {
    lime: "bg-black text-[#BFF549]",
    dark: "bg-[#BFF549] text-black",
    white: "bg-[#0D0D0D] text-white",
    outline: "bg-current text-background",
  };

  const sizeStyles = {
    sm: "h-10 text-xs ps-5 pe-12 hover:ps-12 hover:pe-5",
    default: "h-12 text-sm ps-6 pe-14 hover:ps-14 hover:pe-6",
    lg: "h-14 text-base ps-7 pe-16 hover:ps-16 hover:pe-7 font-semibold",
  };

  const circleSizes = {
    sm: "w-8 h-8 group-hover:right-[calc(100%-36px)]",
    default: "w-10 h-10 group-hover:right-[calc(100%-44px)]",
    lg: "w-12 h-12 group-hover:right-[calc(100%-52px)]",
  };

  const commonClasses = cn(
    "relative font-medium rounded-full p-1 group transition-all duration-500 w-fit overflow-hidden cursor-pointer inline-flex items-center justify-center select-none",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const innerContent = (
    <>
      <span className="relative z-10 transition-all duration-500 flex items-center gap-2">
        {children}
      </span>
      <div
        className={cn(
          "absolute right-1 rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-45 shrink-0 shadow-xs",
          iconCircleVariants[variant],
          circleSizes[size],
          iconClassName
        )}
      >
        {icon}
      </div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={commonClasses} onClick={onClick}>
        {innerContent}
      </Link>
    );
  }

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("//");
    return (
      <a
        href={href}
        className={commonClasses}
        onClick={onClick}
        target={target || (isExternal ? "_blank" : undefined)}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={commonClasses} onClick={onClick}>
      {innerContent}
    </button>
  );
};

export default ButtonWithIcon;
