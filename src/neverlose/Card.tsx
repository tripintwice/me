import { Row as RowData, ControlType } from './types';
import Toggle from './controls/Toggle';
import Slider from './controls/Slider';
import Select from './controls/Select';

interface CardProps {
  title: string;
  x: number;
  y: number;
  width: number;
  rows: RowData[];
  onToggle: (index: number, value: boolean) => void;
  onSlider: (index: number, value: number) => void;
  onOpenSelect: (index: number, isMulti: boolean) => void;
}

export default function Card({ title, x, y, width, rows, onToggle, onSlider, onOpenSelect }: CardProps) {
  const height = rows.length * 37 + 12;

  return (
    <div
      className="absolute rounded-[14px]"
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: 'rgba(17, 19, 27, 0.88)',
        border: '1px solid rgb(31, 34, 44)'
      }}
    >
      {/* Card title */}
      <div
        className="absolute"
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

      {/* Rows */}
      {rows.map((row, index) => (
        <RowItem
          key={index}
          row={row}
          index={index}
          y={index * 37}
          width={width}
          onToggle={(value) => onToggle(index, value)}
          onSlider={(value) => onSlider(index, value)}
          onOpenSelect={() => onOpenSelect(index, row.type === ControlType.MultiSelect)}
        />
      ))}
    </div>
  );
}

interface RowItemProps {
  row: RowData;
  index: number;
  y: number;
  width: number;
  onToggle: (value: boolean) => void;
  onSlider: (value: number) => void;
  onOpenSelect: () => void;
}

function RowItem({ row, index, y, width, onToggle, onSlider, onOpenSelect }: RowItemProps) {
  const disabled = row.type === ControlType.Disabled;

  return (
    <div
      className="absolute"
      style={{
        left: 0,
        top: y,
        width,
        height: 37
      }}
    >
      {/* Divider line */}
      {index > 0 && (
        <div
          className="absolute"
          style={{
            left: 12,
            top: 0,
            width: width - 24,
            height: 1,
            backgroundColor: 'rgb(28, 31, 40)'
          }}
        />
      )}

      {/* Label */}
      <div
        className="absolute flex items-center select-none"
        style={{
          left: 13,
          top: 0,
          height: 37,
          fontSize: 15,
          color: disabled ? 'rgb(92, 96, 107)' : 'rgb(207, 209, 218)'
        }}
      >
        {row.label}
      </div>

      {/* Control */}
      <div
        className="absolute flex items-center"
        style={{
          right: 13,
          top: 0,
          height: 37
        }}
      >
        {row.type === ControlType.Toggle && (
          <Toggle
            id={index}
            enabled={false}
            onChange={onToggle}
          />
        )}

        {row.type === ControlType.Disabled && (
          <Toggle
            id={index}
            enabled={false}
            onChange={() => {}}
            disabled
          />
        )}

        {row.type === ControlType.Slider && (
          <Slider
            id={index}
            value={row.amount || 0}
            displayValue={row.value || '0%'}
            onChange={onSlider}
          />
        )}

        {(row.type === ControlType.Select || row.type === ControlType.MultiSelect) && (
          <Select
            id={index}
            value={row.value || ''}
            width={Math.min(134, width * 0.48)}
            onOpen={onOpenSelect}
            isMulti={row.type === ControlType.MultiSelect}
          />
        )}

        {row.type === ControlType.Color && (
          <div className="flex items-center gap-2">
            <div
              className="rounded-[5px]"
              style={{
                width: 15,
                height: 15,
                backgroundColor: 'rgb(102, 124, 246)'
              }}
            />
            <Toggle
              id={index}
              enabled={false}
              onChange={onToggle}
            />
          </div>
        )}

        {row.type === ControlType.Chevron && (
          <svg width="8" height="10" viewBox="0 0 8 10">
            <path
              d="M 2 2 L 5 5 L 2 8"
              stroke="rgb(187, 190, 199)"
              strokeWidth="1.3"
              fill="none"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
