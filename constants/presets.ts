import { DesignationPreset } from '../types';

export const DESIGNATION_PRESETS: DesignationPreset[] = [
  // Chess preset (original functionality)
  {
    id: 'chess',
    name: 'Chess Pieces',
    description: 'Standard chess piece designations',
    category: 'games',
    icon: '♔',
    designations: ['', 'King', 'Queen', 'Rook', 'Bishop', 'Knight', 'Pawn']
  },
  
  // Vehicle preset
  {
    id: 'vehicle',
    name: 'Vehicle Parts',
    description: 'Common vehicle component designations',
    category: 'vehicles',
    icon: '🚗',
    designations: ['', 'Body', 'Wheels', 'Engine', 'Interior', 'Lights', 'Mirrors', 'Bumpers', 'Doors', 'Windows', 'Exhaust', 'Suspension']
  },
  
  // Building preset
  {
    id: 'building',
    name: 'Building Components',
    description: 'Architectural and construction elements',
    category: 'buildings',
    icon: '🏢',
    designations: ['', 'Foundation', 'Walls', 'Roof', 'Windows', 'Doors', 'Stairs', 'Floors', 'Ceiling', 'Columns', 'Beams', 'Furniture']
  },
  
  // Character preset
  {
    id: 'character',
    name: 'Character Parts',
    description: 'Character model components',
    category: 'characters',
    icon: '👤',
    designations: ['', 'Head', 'Torso', 'Arms', 'Legs', 'Hands', 'Feet', 'Hair', 'Clothing', 'Accessories', 'Weapons', 'Props']
  },
  
  // Furniture preset
  {
    id: 'furniture',
    name: 'Furniture Items',
    description: 'Common furniture and home items',
    category: 'furniture',
    icon: '🪑',
    designations: ['', 'Chair', 'Table', 'Bed', 'Sofa', 'Cabinet', 'Shelf', 'Lamp', 'Mirror', 'Rug', 'Curtains', 'Decorations']
  },
  
  // Board game preset
  {
    id: 'board-game',
    name: 'Board Game Pieces',
    description: 'Generic board game components',
    category: 'games',
    icon: '🎲',
    designations: ['', 'Board', 'Tokens', 'Cards', 'Dice', 'Timer', 'Scoreboard', 'Instructions', 'Box', 'Accessories']
  },
  
  // Electronics preset
  {
    id: 'electronics',
    name: 'Electronic Components',
    description: 'Electronic device parts',
    category: 'custom',
    icon: '📱',
    designations: ['', 'Screen', 'Battery', 'Circuit', 'Buttons', 'Speaker', 'Camera', 'Antenna', 'Ports', 'Casing', 'Display']
  },
  
  // Kitchen preset
  {
    id: 'kitchen',
    name: 'Kitchen Items',
    description: 'Kitchen appliances and utensils',
    category: 'furniture',
    icon: '🍳',
    designations: ['', 'Stove', 'Refrigerator', 'Sink', 'Counter', 'Cabinets', 'Utensils', 'Appliances', 'Dishes', 'Storage']
  },
  
  // Garden preset
  {
    id: 'garden',
    name: 'Garden Elements',
    description: 'Landscaping and garden components',
    category: 'custom',
    icon: '🌱',
    designations: ['', 'Plants', 'Trees', 'Flowers', 'Path', 'Fence', 'Fountain', 'Bench', 'Lighting', 'Soil', 'Pots']
  }
];

export const getPresetById = (id: string): DesignationPreset | undefined => {
  return DESIGNATION_PRESETS.find(preset => preset.id === id);
};

export const getPresetsByCategory = (category: string): DesignationPreset[] => {
  return DESIGNATION_PRESETS.filter(preset => preset.category === category);
};

export const getDefaultPreset = (): DesignationPreset => {
  return DESIGNATION_PRESETS[0]; // Chess preset as default
}; 