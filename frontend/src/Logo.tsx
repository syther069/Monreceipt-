

interface LogoProps {
  variant?: 'boxed' | 'icon' | 'horizontal';
  className?: string;
  onClick?: () => void;
}

export function Logo({ variant = 'boxed', className = '', onClick }: LogoProps) {
  if (variant === 'icon') {
    return (
      <svg onClick={onClick} className={`w-6 h-6 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" stroke="#0D0D0D" strokeWidth="2" fill="none"/>
        <line x1="6" y1="7" x2="18" y2="7" stroke="#0D0D0D" strokeWidth="1.5"/>
        <line x1="6" y1="11" x2="18" y2="11" stroke="#0D0D0D" strokeWidth="1.5"/>
        <line x1="6" y1="15" x2="14" y2="15" stroke="#0D0D0D" strokeWidth="1.5"/>
        <rect x="6" y="17" width="2" height="2" fill="#0D0D0D" stroke="none"/>
        <rect x="9" y="17" width="2" height="2" fill="#0D0D0D" stroke="none"/>
        <rect x="12" y="17" width="2" height="2" fill="#0D0D0D" stroke="none"/>
        <rect x="15" y="17" width="2" height="2" fill="#0D0D0D" stroke="none"/>
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div onClick={onClick} className={`flex items-center gap-3 ${className}`}>
        <Logo variant="icon" />
        <span className="text-lg font-semibold text-[#0D0D0D] tracking-tight">
          <span className="font-bold uppercase tracking-wider">MON</span>receipt
        </span>
      </div>
    );
  }

  // boxed (default)
  return (
    <div onClick={onClick} className={`inline-flex items-center gap-1 px-3 py-1.5 border-2 border-[#0D0D0D] bg-white ${className}`}>
      <span className="text-sm font-bold tracking-widest text-[#0D0D0D]">MON</span>
      <span className="text-sm font-normal text-[#0D0D0D]">receipt</span>
    </div>
  );
}
