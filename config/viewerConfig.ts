import { ViewerConfig } from '../types';

export const defaultViewerConfig: ViewerConfig = {
  camera: {
    position: [0, 2, 5] as [number, number, number],
    fov: 50,
  },
  lighting: {
    ambientIntensity: 0.5,
    directionalIntensities: [1.5, 0.5], // Two directional lights
  },
  materials: {
    hoverColor: '#f97316', // orange-500
    selectionColor: '#0891b2', // cyan-600
    hiddenOpacity: 0.3,
  },
};

export const viewerConfig = {
  ...defaultViewerConfig,
  
  // Processing options
  processing: {
    splitMeshes: true,
    mergeProximity: true,
    proximityThreshold: 1e-4,
    defaultBaseName: 'Piece',
  },
  
  // UI options
  ui: {
    showBoundingBoxes: false,
    showWireframes: false,
    autoRotate: false,
    enableSelection: true,
    enableHover: true,
  },
  
  // Performance options
  performance: {
    maxMeshesToProcess: 1000,
    enableFrustumCulling: true,
    enableLOD: false,
    materialCacheSize: 100,
  },
  
  // Export options
  export: {
    defaultFormat: 'glb',
    defaultFilename: 'selected_pieces',
    includeMetadata: true,
  },
} as const;

// Helper function to merge custom config with defaults
export const createViewerConfig = (customConfig: Partial<ViewerConfig> = {}): ViewerConfig => {
  return {
    ...defaultViewerConfig,
    ...customConfig,
    camera: {
      ...defaultViewerConfig.camera,
      ...customConfig.camera,
    },
    lighting: {
      ...defaultViewerConfig.lighting,
      ...customConfig.lighting,
    },
    materials: {
      ...defaultViewerConfig.materials,
      ...customConfig.materials,
    },
  };
}; 