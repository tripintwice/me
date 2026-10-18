import { useState, useRef } from 'react';
import { useMotion, clamp } from '../motion';

interface SliderProps {
  id: number;
  value: number;
  displayValue: string;
  onChange: (value: number) => void;
}

export default function Slider({ id, value, displayValue, onChange }: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const shown = useMotion(value, 14);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateValue(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateValue(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const newValue = clamp((clientX - rect.left) / rect.width, 0, 1);
      onChange(newValue);
    }
  };

  useState(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  });

  return (
    <div className="flex items-center gap-3">
      {/* Slider track */}
      <div
        ref={sliderRef}
        className="relative cursor-pointer"
        style={{ width: 80, height: 19, padding: '8px 5px' }}
        onMouseDown={handleMouseDown}
      >
        {/* Background track */}
        <div
          className="absolute rounded-[2px]"
          style={{
            left: 0,
            top: 8,
            width: 80,
            height: 3,
            backgroundColor: 'rgb(34, 38, 48)'
          }}
        />
        
        {/* Filled track */}
        <div
          className="absolute rounded-[2px]"
          style={{
            left: 0,
            top: 8,
            width: 80 * shown,
            height: 3,
            backgroundColor: 'rgb(75, 126, 255)'
          }}
        />
        
        {/* Knob */}
        <div
          className="absolute rounded-full"
          style={{
            left: 80 * shown - 5.5,
            top: 6.5,
            width: 11,
            height: 11,
            backgroundColor: 'rgb(247, 248, 252)'
          }}
        />
      </div>

      {/* Value display */}
      <div
        className="rounded-[5px] flex items-center justify-center"
        style={{
          width: 42,
          height: 21,
          backgroundColor: 'rgb(25, 28, 38)',
          color: 'rgb(166, 169, 179)',
          fontSize: 14
        }}
      >
        {displayValue}
      </div>
    </div>
  );
}
