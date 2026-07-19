

interface LogoProps {
  variant?: 'boxed' | 'icon' | 'horizontal';
  className?: string;
  onClick?: () => void;
}

export function Logo({ variant = 'boxed', className = '', onClick }: LogoProps) {
  if (variant === 'icon') {
    return (
      <svg 
        onClick={onClick} 
        className={`w-6 h-6 stroke-[#0D0D0D] ${className}`} 
        viewBox="0 0 24 24" 
        fill="none" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="13" y2="16" />
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div onClick={onClick} className={`flex items-center gap-2 cursor-pointer select-none ${className}`}>
        <Logo variant="icon" className="w-5 h-5 text-[#0D0D0D]" />
        <span className="font-sans text-sm tracking-wider text-[#0D0D0D] flex items-center font-bold">
          <span className="font-black uppercase tracking-widest mr-0.5">MON</span>RECEIPT
        </span>
      </div>
    );
  }

  // boxed (default)
  return (
    <div 
      onClick={onClick} 
      className={`group inline-flex items-center gap-2.5 px-3 py-1 border-2 border-[#0D0D0D] bg-[#0D0D0D] text-white hover:bg-white hover:text-[#0D0D0D] transition-all duration-150 cursor-pointer select-none ${className}`}
    >
      <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="13" y2="16" />
      </svg>
      <span className="font-sans text-xs tracking-widest font-black uppercase">
        MON<span className="font-light text-[#E5E7EB] group-hover:text-[#6B7280] transition-colors duration-150">RECEIPT</span>
      </span>
    </div>
  );
}
