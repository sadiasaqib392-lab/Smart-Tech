import React from 'react';
import officialSquareLogo from '../assets/images/smartech_official_logo.png';
import gearIconImg from '../assets/images/smartech_gear_icon.png';

interface SmartechLogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'icon-only' | 'exact-image';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showSubtitle?: boolean;
}

export const SmartechLogo: React.FC<SmartechLogoProps> = ({
  className = '',
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  showSubtitle = true,
}) => {
  // Dimension scales
  const iconSizes = {
    sm: 'w-11 h-11',
    md: 'w-14 h-14 sm:w-16 sm:h-16',
    lg: 'w-20 h-20',
    xl: 'w-26 h-26',
    '2xl': 'w-34 h-34',
  };

  const exactImageSizes = {
    sm: 'w-16 h-16',
    md: 'w-22 h-22 sm:w-26 sm:h-26',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
    '2xl': 'w-52 h-52',
  };

  const titleSizes = {
    sm: 'text-[20px] font-bold tracking-tight',
    md: 'text-[22px] sm:text-[23px] font-bold tracking-tight',
    lg: 'text-[28px] font-bold tracking-tight',
    xl: 'text-[34px] font-bold tracking-tight',
    '2xl': 'text-[42px] font-bold tracking-tight',
  };

  const subtitleSizes = {
    sm: 'text-[12px] font-bold tracking-wide',
    md: 'text-[14px] font-bold tracking-wide',
    lg: 'text-[15px] font-bold tracking-wide',
    xl: 'text-[18px] font-bold tracking-wide',
    '2xl': 'text-[22px] font-bold tracking-wide',
  };

  const isDark = theme === 'dark';

  // Exact image variant as provided by user
  if (variant === 'exact-image') {
    return (
      <div className={`inline-flex items-center justify-center ${exactImageSizes[size]} ${className}`}>
        <img
          src={officialSquareLogo}
          alt="SMARTECH Official Logo"
          className="w-full h-full object-contain rounded-lg shadow-xs"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Gear Icon with hardhat (exact from brochure)
  const LogoIcon = (
    <div className={`relative flex-shrink-0 ${iconSizes[size]} flex items-center justify-center`}>
      <img
        src={gearIconImg}
        alt="SMARTECH Logo Mark"
        className="w-full h-full object-contain drop-shadow-xs"
        referrerPolicy="no-referrer"
      />
    </div>
  );

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${iconSizes[size]} ${className}`}>
        <img
          src={officialSquareLogo}
          alt="SMARTECH Official Logo"
          className="w-full h-full object-contain rounded-md"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className={exactImageSizes[size]}>
          <img
            src={officialSquareLogo}
            alt="SMARTECH Official Logo"
            className="w-full h-full object-contain rounded-xl shadow-xs"
            referrerPolicy="no-referrer"
          />
        </div>
        {showSubtitle && (
          <span
            className={`mt-2 font-extrabold uppercase ${subtitleSizes[size]} ${
              isDark ? 'text-stone-300' : 'text-[#57534E]'
            }`}
          >
            ELECTRICAL & NETWORKING SOLUTIONS
          </span>
        )}
      </div>
    );
  }

  // Horizontal Variant (Default for Navbar, Headers, and Banners)
  return (
    <div className={`inline-flex items-center gap-3 sm:gap-3.5 ${className}`}>
      {LogoIcon}
      <div className="flex flex-col justify-center text-left">
        <span
          className={`font-bold uppercase leading-none font-adobe-arabic ${titleSizes[size]} ${
            isDark ? 'text-white' : 'text-[#18181B]'
          }`}
          style={{ fontFamily: "'Adobe Arabic', 'Amiri', 'Traditional Arabic', serif" }}
        >
          SMARTECH
        </span>
        {showSubtitle && (
          <span
            className={`mt-0.5 font-bold uppercase leading-tight font-adobe-arabic ${subtitleSizes[size]} ${
              isDark ? 'text-stone-300' : 'text-[#57534E]'
            }`}
            style={{ fontFamily: "'Adobe Arabic', 'Amiri', 'Traditional Arabic', serif" }}
          >
            ELECTRICAL & NETWORKING SOLUTIONS
          </span>
        )}
      </div>
    </div>
  );
};
