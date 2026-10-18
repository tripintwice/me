import { useMotion, lerp, mixColors } from '../motion';

interface ToggleProps {
  id: number;
  enabled: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function Toggle({ id, enabled, onChange, disabled = false }: ToggleProps) {
  const on = useMotion(enabled ? 1 : 0, 19);
  const hover = useMotion(0, 20);

  const handleClick = () => {
    if (!disabled) onChange(!enabled);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      // Trigger hover animation
    }
  };

  return (
    <div
      className="relative cursor-pointer select-none"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={{ width: 39, height: 30, padding: '6px 5px' }}
    >
      {/* Hover glow */}
      <div
        className="absolute rounded-[10px]"
        style={{
          left: -1 - hover,
          top: -1 - hover,
          width: 30 + hover * 2,
          height: 18 + hover * 2,
          backgroundColor: `rgba(75, 126, 255, ${0.45 * hover})`
        }}
      />
      
      {/* Background */}
      <div
        className="absolute rounded-[9px]"
        style={{
          left: 0,
          top: 0,
          width: 29,
          height: 18,
          backgroundColor: mixColors('rgb(29, 33, 43)', 'rgb(75, 126, 255)', on)
        }}
      />
      
      {/* Knob */}
      <div
        className="absolute rounded-full"
        style={{
          left: lerp(4, 15, on),
          top: 4,
          width: 14,
          height: 14,
          backgroundColor: mixColors('rgb(133, 144, 156)', 'rgb(248, 249, 252)', on)
        }}
      />
    </div>
  );
}
