import React, { Suspense, useEffect, useMemo } from 'react';
import { Canvas, ThreeElements } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { MeshInfo } from '../types';
import { CubeIcon } from './icons';
import { splitMesh, groupAndMergeMeshes } from './MeshProcessor';
import { MaterialFactory } from './MaterialFactory';
import { viewerConfig } from '../config/viewerConfig';

// Added to fix TypeScript errors with JSX elements from react-three-fiber.
// This manually extends the JSX namespace, which should normally happen
// automatically but might fail in some project setups.
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

// Component to render a single mesh with highlighting logic
const DisplayMesh: React.FC<{ 
  mesh: THREE.Mesh; 
  info: MeshInfo; 
  isHovered: boolean;
  isSelected: boolean;
  onToggleSelection: (uuid: string) => void;
}> = ({ mesh, info, isHovered, isSelected, onToggleSelection }) => {
  // Create materials with dependencies to ensure React re-renders when state changes
  const hoverMaterial = useMemo(() => MaterialFactory.createHoverMaterial(), []);
  const selectionMaterial = useMemo(() => MaterialFactory.createSelectionMaterial(), []);

  // Force material update by creating a new material instance when state changes
  const currentMaterial = useMemo(() => {
    if (isHovered) return hoverMaterial;
    if (isSelected) return selectionMaterial;
    return mesh.material;
  }, [isHovered, isSelected, hoverMaterial, selectionMaterial, mesh.material]);

  return (
    <mesh
      geometry={mesh.geometry}
      position={mesh.position}
      rotation={mesh.rotation}
      scale={mesh.scale}
      visible={info.visible}
      material={currentMaterial}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleSelection(info.uuid);
      }}
    />
  );
};

// Component that loads the GLB and extracts meshes
const Model: React.FC<{
  fileUrl: string;
  meshes: MeshInfo[];
  hoveredMeshUuid: string | null;
  selectedMeshUuids: string[];
  onMeshesExtracted: (meshes: MeshInfo[]) => void;
  onToggleSelection: (uuid: string) => void;
}> = ({ fileUrl, meshes, hoveredMeshUuid, selectedMeshUuids, onMeshesExtracted, onToggleSelection }) => {
  const { scene } = useGLTF(fileUrl);

  useEffect(() => {
    if (!scene) return;
    
    const worldMeshes: THREE.Mesh[] = [];
    scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
            const meshClone = child.clone() as THREE.Mesh;
            meshClone.geometry = child.geometry.clone();

            // Apply world matrix to get geometry in a common world space
            // This is crucial for proximity checks to work correctly
            child.updateWorldMatrix(true, false);
            meshClone.geometry.applyMatrix4(child.matrixWorld);
            
            // Reset mesh's transform as it is now baked into the geometry
            meshClone.position.set(0, 0, 0);
            meshClone.rotation.set(0, 0, 0);
            meshClone.scale.set(1, 1, 1);
            
            worldMeshes.push(meshClone);
        }
    });
    
    if (worldMeshes.length === 0) {
        onMeshesExtracted([]);
        return;
    }
    
    const allSubMeshes: THREE.Mesh[] = [];
    worldMeshes.forEach(mesh => {
        const splitResult = splitMesh(mesh);
        allSubMeshes.push(...splitResult);
    });

    const baseName = worldMeshes[0].name || viewerConfig.processing.defaultBaseName;
    const finalGroupedMeshes = groupAndMergeMeshes(allSubMeshes, baseName);

    const meshInfos = finalGroupedMeshes.map(mesh => ({
        uuid: mesh.uuid,
        name: mesh.name,
        visible: true,
        originalMesh: mesh,
    }));

    onMeshesExtracted(meshInfos);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl, scene]);

  return (
    <group>
      {meshes.map(info => (
        <DisplayMesh
          key={info.uuid}
          mesh={info.originalMesh}
          info={info}
          isHovered={info.uuid === hoveredMeshUuid}
          isSelected={selectedMeshUuids.includes(info.uuid)}
          onToggleSelection={onToggleSelection}
        />
      ))}
    </group>
  );
};


// Main viewer component
const Viewer: React.FC<{
  fileUrl: string | null;
  meshes: MeshInfo[];
  hoveredMeshUuid: string | null;
  selectedMeshUuids: string[];
  onMeshesExtracted: (meshes: MeshInfo[]) => void;
  onToggleSelection: (uuid: string) => void;
}> = ({ fileUrl, meshes, hoveredMeshUuid, selectedMeshUuids, onMeshesExtracted, onToggleSelection }) => {
  return (
    <div className="w-full h-full bg-gray-800 relative">
      <Canvas camera={{ 
        position: viewerConfig.camera.position, 
        fov: viewerConfig.camera.fov 
      }}>
        <Suspense fallback={null}>
          <ambientLight intensity={viewerConfig.lighting.ambientIntensity} />
          <directionalLight position={[10, 10, 5]} intensity={viewerConfig.lighting.directionalIntensities[0]} />
          <directionalLight position={[-10, -10, -5]} intensity={viewerConfig.lighting.directionalIntensities[1]} />

          {fileUrl && (
            <Model 
              fileUrl={fileUrl} 
              meshes={meshes}
              hoveredMeshUuid={hoveredMeshUuid}
              selectedMeshUuids={selectedMeshUuids}
              onMeshesExtracted={onMeshesExtracted}
              onToggleSelection={onToggleSelection}
            />
          )}

          <Environment preset="city" />
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
      {!fileUrl && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-gray-500 bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm">
            <CubeIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h2 className="text-xl font-medium">Load a .glb model to start</h2>
            <p>Use the panel on the left to upload a file.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewer;