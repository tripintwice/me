interface CardProps {
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  children?: React.ReactNode;
}

export default function Card({ title, x, y, width, height, children }: CardProps) {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        width,
        height
      }}
    >
      {/* Title above card at -18px */}
      <div
        className="absolute select-none"
        style={{
          left: 12,
          top: -18,
          fontSize: 10,
          color: 'rgb(89, 94, 106)',
          fontWeight: 600,
          letterSpacing: '0.5px'
        }}
      >
        {title}
      </div>

      {/* Card background */}
      <div
        className="absolute rounded-[14px]"
        style={{
          left: 0,
          top: 0,
          width,
          height,
          backgroundColor: 'rgba(17, 19, 27, 0.878)',
        }}
      />

      {/* Card border */}
      <div
        className="absolute rounded-[14px]"
        style={{
          left: 0,
          top: 0,
          width,
          height,
          border: '1px solid rgb(31, 34, 44)',
          pointerEvents: 'none'
        }}
      />

      {/* Content */}
      <div
        className="absolute"
        style={{
          left: 0,
          top: 0,
          width,
          height,
          overflow: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
}
