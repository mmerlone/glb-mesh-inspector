import React from 'react';
import { MeshInfo, DesignationPreset } from '../types';
import { EyeIcon, EyeOffIcon, CubeIcon } from './icons';
import { getPresetById } from '../constants/presets';

interface MeshListProps {
  meshes: MeshInfo[];
  selectedMeshUuids: string[];
  currentPresetId: string;
  customDesignations: string[];
  allowDuplicates: boolean;
  onToggleVisibility: (uuid: string) => void;
  onToggleSelection: (uuid: string) => void;
  onHoverMesh: (uuid: string | null) => void;
  onChangeDesignation: (uuid: string, designation: string) => void;
}

const MeshList: React.FC<MeshListProps> = ({ 
  meshes, 
  selectedMeshUuids, 
  currentPresetId,
  customDesignations,
  allowDuplicates,
  onToggleVisibility, 
  onToggleSelection, 
  onHoverMesh, 
  onChangeDesignation 
}) => {
  const currentPreset = getPresetById(currentPresetId) || getPresetById('chess')!;
  
  // Get all used designations to filter out from other dropdowns
  const usedDesignations = new Set(meshes.map(mesh => mesh.designation).filter(Boolean));
  
  // Get available designations for each mesh
  const getAvailableDesignations = (currentMesh: MeshInfo) => {
    const allDesignations = [...currentPreset.designations, ...customDesignations];
    
    if (allowDuplicates) {
      // If duplicates are allowed, show all designations
      return allDesignations;
    }
    
    // If duplicates are not allowed, filter out used designations
    return allDesignations.filter(designation => 
      designation === '' || // Always show empty option
      designation === currentMesh.designation || // Show current designation
      !usedDesignations.has(designation) // Show unused designations
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-300 mb-3 border-b border-gray-700 pb-2">
        Model Components
        <span className="text-sm font-normal text-gray-500 ml-2">
          ({meshes.length} found)
        </span>
      </h2>
      <ul 
        className="space-y-2 overflow-y-auto pr-2 -mr-2"
        onMouseLeave={() => onHoverMesh(null)}
      >
        {meshes.map((mesh, index) => {
          const isSelected = selectedMeshUuids.includes(mesh.uuid);
          const availableDesignations = getAvailableDesignations(mesh);
          
          return (
            <li
              key={mesh.uuid}
              onMouseEnter={() => onHoverMesh(mesh.uuid)}
              onMouseLeave={() => onHoverMesh(null)}
              onClick={() => onToggleSelection(mesh.uuid)}
              className={`flex items-center p-2 rounded-md transition-colors duration-200 cursor-pointer ${
                isSelected 
                ? 'bg-cyan-700 hover:bg-cyan-600 text-white' 
                : 'bg-gray-800/50 hover:bg-gray-700/80'
              }`}
            >
              <CubeIcon className={`w-5 h-5 mr-3 flex-shrink-0 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
              <span className="flex-1 truncate text-sm" title={mesh.name || `Mesh ${index + 1}`}>
                {mesh.name || `Mesh ${index + 1}`}
              </span>
              <select
                className="ml-2 px-2 py-1 rounded bg-gray-700 text-gray-100 text-xs border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                value={mesh.designation || ''}
                onClick={e => e.stopPropagation()}
                onChange={e => onChangeDesignation(mesh.uuid, e.target.value)}
              >
                {availableDesignations.map(designation => (
                  <option key={designation} value={designation}>
                    {designation || '— designation —'}
                  </option>
                ))}
              </select>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent li's onClick from firing
                  onToggleVisibility(mesh.uuid)
                }}
                className="ml-3 p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                title={mesh.visible ? 'Hide Mesh' : 'Show Mesh'}
              >
                {mesh.visible ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeOffIcon className="w-5 h-5" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MeshList;