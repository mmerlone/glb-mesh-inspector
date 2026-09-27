import * as THREE from 'three';

export interface MaterialConfig {
  color?: string | number;
  emissive?: string | number;
  emissiveIntensity?: number;
  roughness?: number;
  metalness?: number;
  transparent?: boolean;
  opacity?: number;
}

export class MaterialFactory {
  private static materialCache = new Map<string, THREE.Material>();

  /**
   * Creates or retrieves a cached material with the given configuration
   */
  static createMaterial(config: MaterialConfig, cacheKey?: string): THREE.Material {
    const key = cacheKey || JSON.stringify(config);
    
    if (this.materialCache.has(key)) {
      return this.materialCache.get(key)!.clone();
    }

    const material = new THREE.MeshStandardMaterial({
      color: config.color || 0xffffff,
      emissive: config.emissive || 0x000000,
      emissiveIntensity: config.emissiveIntensity || 0,
      roughness: config.roughness ?? 0.5,
      metalness: config.metalness ?? 0.2,
      transparent: config.transparent || false,
      opacity: config.opacity ?? 1.0,
    });

    this.materialCache.set(key, material);
    return material.clone();
  }

  /**
   * Predefined material configurations
   */
  static readonly HOVER_MATERIAL = {
    color: 'orange',
    emissive: 'orange',
    emissiveIntensity: 0.5,
    roughness: 0.5,
    metalness: 0.2,
  } as const;

  static readonly SELECTION_MATERIAL = {
    color: '#0891b2', // Tailwind cyan-600
    emissive: '#22d3ee', // Tailwind cyan-400
    emissiveIntensity: 0.6,
    roughness: 0.4,
  } as const;

  static readonly HIDDEN_MATERIAL = {
    color: 0x666666,
    transparent: true,
    opacity: 0.3,
  } as const;

  /**
   * Convenience methods for common materials
   */
  static createHoverMaterial(): THREE.Material {
    return this.createMaterial(this.HOVER_MATERIAL, 'hover');
  }

  static createSelectionMaterial(): THREE.Material {
    return this.createMaterial(this.SELECTION_MATERIAL, 'selection');
  }

  static createHiddenMaterial(): THREE.Material {
    return this.createMaterial(this.HIDDEN_MATERIAL, 'hidden');
  }

  /**
   * Clears the material cache to free memory
   */
  static clearCache(): void {
    this.materialCache.clear();
  }
} 