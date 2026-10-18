import { useState } from 'react';
import { useMotion, mixColors } from '../motion';

interface SelectProps {
  id: number;
  value: string;
  width?: number;
  onOpen: () => void;
  isMulti?: boolean;
}

export default function Select({ id, value, width = 134, onOpen, isMulti = false }: SelectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const response = useMotion(isHovered ? 1 : 0, 20);

  return (
    <div
      className="relative cursor-pointer rounded-[5px] flex items-center px-2 select-none"
      style={{
        width,
        height: 23,
        backgroundColor: mixColors('rgb(25, 28, 38)', 'rgb(31, 38, 54)', response),
        border: `1px solid ${mixColors('rgb(32, 35, 46)', 'rgb(75, 126, 255)', response)}`
      }}
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ fontSize: 14, color: 'rgb(170, 173, 184)' }}>
        {value || 'Select'}
      </span>
      
      {/* Chevron down */}
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        className="absolute"
        style={{ right: 8, top: 8 }}
      >
        <path
          d="M 1 3 L 4 6 L 7 3"
          stroke="rgb(139, 143, 154)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
