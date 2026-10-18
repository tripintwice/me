import Card from '../components/Card';

interface RagePageProps {
  onToggle: (cardIndex: number, rowIndex: number, value: boolean) => void;
  onSlider: (cardIndex: number, rowIndex: number, value: number) => void;
  onOpenSelect: (cardIndex: number, rowIndex: number, isMulti: boolean) => void;
}

export default function RagePage({ onToggle, onSlider, onOpenSelect }: RagePageProps) {
  // Позиции из C++:
  // Main: (167-158=9, 84-56=28), size (281, 221)
  // Other: (458-158=300, 84-56=28), size (277, 221)
  // Selection: (167-158=9, 340-56=284), size (281, 221)
  // Anti-Aim: (458-158=300, 340-56=284), size (277, 221)

  return (
    <div className="relative w-full h-full">
      {/* MAIN card */}
      <Card
        title="MAIN"
        x={9}
        y={28}
        width={281}
        height={221}
      />

      {/* OTHER card */}
      <Card
        title="OTHER"
        x={300}
        y={28}
        width={277}
        height={221}
      />

      {/* SELECTION card */}
      <Card
        title="SELECTION"
        x={9}
        y={284}
        width={281}
        height={221}
      />

      {/* ANTI-AIM card */}
      <Card
        title="ANTI-AIM"
        x={300}
        y={284}
        width={277}
        height={221}
      />
    </div>
  );
}
