import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import * as THREE from 'three';
import { MeshInfo } from '../types';

export interface ExportResult {
  success: boolean;
  error?: string;
}

export const exportSelectedMeshes = (
  selectedMeshesInfo: MeshInfo[],
  onSuccess: () => void,
  onError: (error: string) => void
): void => {
  if (selectedMeshesInfo.length === 0) {
    onError("No meshes selected to export.");
    return;
  }

  const exporter = new GLTFExporter();
  const group = new THREE.Group();
  
  selectedMeshesInfo.forEach((info, index) => {
    // Create a deep clone of the mesh with unique geometry and material
    const clonedMesh = info.originalMesh.clone();
    clonedMesh.geometry = info.originalMesh.geometry.clone();
    clonedMesh.material = Array.isArray(info.originalMesh.material) 
      ? info.originalMesh.material.map(mat => mat.clone())
      : info.originalMesh.material.clone();
    
    // Use designation as name, fallback to original name
    clonedMesh.name = info.designation || info.name || `Mesh_${index}`;
    clonedMesh.position.copy(info.originalMesh.position);
    clonedMesh.rotation.copy(info.originalMesh.rotation);
    clonedMesh.scale.copy(info.originalMesh.scale);
    
    group.add(clonedMesh);
  });
  
  exporter.parse(
    group,
    (result) => {
      if (result instanceof ArrayBuffer) {
        const blob = new Blob([result], { type: 'model/gltf-binary' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'selected_pieces.glb';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        onSuccess();
      }
    },
    (error) => {
      onError('Failed to export the model.');
    },
    { binary: true }
  );
}; 