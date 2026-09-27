import { AppConfig } from '../types';
import { getDefaultPreset } from '../constants/presets';

export const defaultAppConfig: AppConfig = {
  currentPreset: 'chess',
  customDesignations: [],
  autoComplete: true,
  allowDuplicates: false,
  defaultExportName: 'selected_components',
  ui: {
    title: 'Mesh Inspector',
    subtitle: '3D Model Component Extractor',
    theme: 'dark',
    accentColor: '#0891b2' // cyan-600
  }
};

export const appConfig = {
  ...defaultAppConfig,
  
  // Preset-specific configurations
  presets: {
    chess: {
      autoComplete: true,
      allowDuplicates: false,
      defaultExportName: 'chess_pieces'
    },
    vehicle: {
      autoComplete: false,
      allowDuplicates: true,
      defaultExportName: 'vehicle_parts'
    },
    building: {
      autoComplete: false,
      allowDuplicates: true,
      defaultExportName: 'building_components'
    },
    character: {
      autoComplete: true,
      allowDuplicates: false,
      defaultExportName: 'character_parts'
    },
    furniture: {
      autoComplete: false,
      allowDuplicates: true,
      defaultExportName: 'furniture_items'
    }
  },
  
  // UI themes
  themes: {
    dark: {
      background: 'bg-gray-800',
      sidebar: 'bg-gray-900/70',
      text: 'text-gray-200',
      accent: 'text-cyan-400',
      border: 'border-gray-700'
    },
    light: {
      background: 'bg-gray-100',
      sidebar: 'bg-white/90',
      text: 'text-gray-800',
      accent: 'text-blue-600',
      border: 'border-gray-300'
    }
  }
} as const;

// Helper function to get current preset configuration
export const getCurrentPresetConfig = (presetId: string) => {
  return appConfig.presets[presetId as keyof typeof appConfig.presets] || appConfig.presets.chess;
};

// Helper function to merge custom config with defaults
export const createAppConfig = (customConfig: Partial<AppConfig> = {}): AppConfig => {
  return {
    ...defaultAppConfig,
    ...customConfig,
    ui: {
      ...defaultAppConfig.ui,
      ...customConfig.ui,
    },
  };
}; 