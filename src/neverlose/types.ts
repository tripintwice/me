export enum NeverlosePage {
  Rage = 'rage',
  Legit = 'legit',
  Players = 'players',
  World = 'world',
  Inventory = 'inventory',
  Miscellaneous = 'miscellaneous'
}

export enum ControlType {
  Toggle = 'toggle',
  Slider = 'slider',
  Select = 'select',
  MultiSelect = 'multiselect',
  Color = 'color',
  Chevron = 'chevron',
  Disabled = 'disabled'
}

export interface Row {
  label: string;
  type: ControlType;
  value?: string;
  amount?: number;
}

export interface CardData {
  title: string;
  rows: Row[];
  x: number;
  y: number;
  width: number;
}
