import type { Mesh, BufferGeometry, Material } from 'three';

export interface MeshInfo {
  uuid: string;
  name: string;
  visible: boolean;
  originalMesh: Mesh<BufferGeometry, Material | Material[]>;
  designation?: string;
}

export interface ExportOptions {
  binary?: boolean;
  includeSelectedOnly?: boolean;
  filename?: string;
}

// Utility types for Three.js objects
export type ThreeMesh = Mesh<BufferGeometry, Material | Material[]>;

// Configuration types
export interface ViewerConfig {
  camera: {
    position: [number, number, number];
    fov: number;
  };
  lighting: {
    ambientIntensity: number;
    directionalIntensities: number[];
  };
  materials: {
    hoverColor: string;
    selectionColor: string;
    hiddenOpacity: number;
  };
}

// New flexible designation system types
export interface DesignationPreset {
  id: string;
  name: string;
  description: string;
  designations: string[];
  category: 'games' | 'vehicles' | 'buildings' | 'characters' | 'furniture' | 'custom';
  icon?: string;
}

export interface AppConfig {
  currentPreset: string;
  customDesignations: string[];
  autoComplete: boolean;
  allowDuplicates: boolean;
  defaultExportName: string;
  ui: {
    title: string;
    subtitle?: string;
    theme: 'dark' | 'light';
    accentColor: string;
  };
}

export interface DesignationContext {
  preset: DesignationPreset;
  config: AppConfig;
  usedDesignations: Set<string>;
  availableDesignations: (currentDesignation?: string) => string[];
}
