import { Share2, Music } from 'lucide-react';
import { useMotion, mixColors } from './motion';
import { useState } from 'react';

interface NeverloseSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function NeverloseSidebar({ currentPage, onPageChange }: NeverloseSidebarProps) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountHovered, setAccountHovered] = useState(false);
  
  const accountResponse = useMotion(accountOpen ? 1 : accountHovered ? 0.5 : 0, 20);

  return (
    <div
      className="absolute left-0 top-0 h-full"
      style={{
        width: 158
      }}
    >
      {/* Main sidebar background - left rounded, right straight */}
      <div
        className="absolute left-0 top-0 h-full rounded-l-[14px]"
        style={{
          width: 158,
          backgroundColor: 'rgba(18, 21, 30, 0.91)'
        }}
      />
      
      {/* Right edge rectangle to make it straight */}
      <div
        className="absolute right-0 top-0 h-full"
        style={{
          width: 13,
          backgroundColor: 'rgba(18, 21, 30, 0.91)'
        }}
      />

      {/* Right border line */}
      <div
        className="absolute"
        style={{
          right: 0,
          top: 0,
          width: 1,
          height: 576,
          backgroundColor: 'rgb(30, 33, 43)'
        }}
      />
      
      {/* Logo box with better styling */}
      <div className="absolute" style={{ left: 15, top: 11 }}>
        <div
          className="rounded-[7px] flex items-center justify-center"
          style={{
            width: 30,
            height: 32,
            backgroundColor: 'rgb(8, 27, 48)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(94, 185, 255, 0.1)'
          }}
        >
          <span style={{ 
            fontSize: 16, 
            color: 'rgb(94, 185, 255)', 
            fontWeight: 700, 
            lineHeight: 1,
            textShadow: '0 0 8px rgba(94, 185, 255, 0.3)'
          }}>
            NL
          </span>
        </div>
      </div>

      {/* Neverlose text */}
      <div style={{ position: 'absolute', left: 53, top: 14 }}>
        <div style={{ fontSize: 16, color: 'rgb(228, 230, 236)', fontWeight: 700, lineHeight: 1 }}>
          Neverlose
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute"
        style={{
          left: 10,
          top: 56,
          width: 137,
          height: 1,
          backgroundColor: 'rgb(28, 31, 41)'
        }}
      />

      {/* TABS section label */}
      <div
        className="absolute select-none"
        style={{
          left: 16,
          top: 67,
          fontSize: 10,
          color: 'rgb(91, 96, 108)',
          fontWeight: 600,
          letterSpacing: '0.5px'
        }}
      >
        TABS
      </div>

      {/* Navigation */}
      <div style={{ position: 'absolute', left: 7, top: 84, width: 140 }}>
        <NavItem
          icon={<Share2 size={16} />}
          label="Socials"
          selected={currentPage === 'socials'}
          onClick={() => onPageChange('socials')}
        />
        
        <div style={{ marginTop: 6 }}>
          <NavItem
            icon={<Music size={16} />}
            label="Music"
            selected={currentPage === 'music'}
            onClick={() => onPageChange('music')}
          />
        </div>
      </div>

      {/* Account section */}
      <div
        className="absolute cursor-pointer rounded-[6px] transition-all duration-150"
        style={{
          left: 7,
          bottom: 7,
          width: 140,
          height: 38,
          backgroundColor: accountResponse > 0.001 
            ? `rgba(39, 43, 54, ${0.92 * accountResponse})` 
            : 'transparent'
        }}
        onClick={() => setAccountOpen(!accountOpen)}
        onMouseEnter={() => setAccountHovered(true)}
        onMouseLeave={() => setAccountHovered(false)}
      >
        {/* Avatar circle */}
        <div
          className="rounded-[14px] overflow-hidden"
          style={{
            position: 'absolute',
            left: 7,
            top: 5,
            width: 28,
            height: 28,
            backgroundColor: 'rgb(100, 100, 120)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <img 
            src="https://cataas.com/cat?width=28&height=28" 
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Username */}
        <div style={{ position: 'absolute', left: 43, top: 9 }}>
          <div style={{ fontSize: 14, color: 'rgb(225, 227, 233)', lineHeight: 1 }}>tripintwice</div>
        </div>
        {/* Chevron */}
        <svg
          width="8"
          height="10"
          viewBox="0 0 8 10"
          style={{ position: 'absolute', right: 8, top: 15 }}
        >
          <path
            d="M 2 2 L 5 5 L 2 8"
            stroke="rgb(181, 185, 195)"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, selected, onClick }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const response = useMotion(selected ? 1 : isHovered ? 0.48 : 0, 20);

  return (
    <div
      className="relative cursor-pointer rounded-[6px] flex items-center select-none transition-all duration-150"
      style={{
        height: 30,
        paddingLeft: 10,
        backgroundColor: response > 0.001 
          ? mixColors('rgba(18, 21, 30, 0)', 'rgb(39, 43, 54)', response)
          : 'transparent'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ 
        color: mixColors('rgb(137, 142, 153)', 'rgb(82, 141, 255)', response),
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.15s ease-out',
        transform: isHovered && !selected ? 'scale(1.05)' : 'scale(1)'
      }}>
        {icon}
      </div>
      <span style={{
        marginLeft: 11,
        fontSize: 15,
        lineHeight: 1,
        color: mixColors('rgb(145, 149, 159)', 'rgb(226, 228, 235)', response),
        fontWeight: selected ? 500 : 400
      }}>
        {label}
      </span>
    </div>
  );
}
