import React, { useState, useCallback } from 'react';
import { MeshInfo, AppConfig } from './types';
import FileUpload from './components/FileUpload';
import MeshList from './components/MeshList';
import Viewer from './components/Viewer';
import PresetSelector from './components/PresetSelector';
import { CubeIcon, DownloadIcon, SettingsIcon } from './components/icons';
import { getPresetById, getDefaultPreset } from './constants/presets';
import { defaultAppConfig, getCurrentPresetConfig } from './config/appConfig';
import { exportSelectedMeshes } from './utils/exportUtils';

const App: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [meshes, setMeshes] = useState<MeshInfo[]>([]);
  const [selectedMeshUuids, setSelectedMeshUuids] = useState<string[]>([]);
  const [hoveredMeshUuid, setHoveredMeshUuid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPresetSelector, setShowPresetSelector] = useState(false);
  
  // Configuration state
  const [config, setConfig] = useState<AppConfig>(defaultAppConfig);
  const currentPreset = getPresetById(config.currentPreset) || getDefaultPreset();
  const presetConfig = getCurrentPresetConfig(config.currentPreset);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.glb')) {
        if (fileUrl) {
            URL.revokeObjectURL(fileUrl);
        }
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        setMeshes([]);
        setSelectedMeshUuids([]);
        setError(null);
      } else {
        setError('Please upload a valid .glb file.');
        setFileUrl(null);
        setMeshes([]);
        setSelectedMeshUuids([]);
      }
    }
  }, [fileUrl]);

  const onMeshesExtracted = useCallback((extractedMeshes: MeshInfo[]) => {
    setMeshes(extractedMeshes);
  }, []);

  const toggleMeshVisibility = useCallback((uuid: string) => {
    setMeshes(prev =>
      prev.map(mesh =>
        mesh.uuid === uuid ? { ...mesh, visible: !mesh.visible } : mesh
      )
    );
  }, []);

  const toggleMeshSelection = useCallback((uuid: string) => {
    setSelectedMeshUuids(prev =>
      prev.includes(uuid)
        ? prev.filter(id => id !== uuid)
        : [...prev, uuid]
    );
  }, []);

  const handleDesignationChange = useCallback((uuid: string, designation: string) => {
    setMeshes(prev => {
      const updatedMeshes = prev.map(mesh => mesh.uuid === uuid ? { ...mesh, designation } : mesh);
      
      // Auto-completion logic (only if enabled and not allowing duplicates)
      if (presetConfig.autoComplete && !presetConfig.allowDuplicates) {
        const designatedMeshes = updatedMeshes.filter(mesh => mesh.designation);
        const undesignatedMeshes = updatedMeshes.filter(mesh => !mesh.designation);
        
        // Get all available designations (preset + custom)
        const allDesignations = [...currentPreset.designations, ...config.customDesignations];
        
        // If we have exactly one undesignated mesh left and we just designated the second-to-last
        if (undesignatedMeshes.length === 1 && designatedMeshes.length === allDesignations.length - 2) {
          const lastMesh = undesignatedMeshes[0];
          const remainingDesignation = allDesignations.find((d: string) => 
            d && !designatedMeshes.some(m => m.designation === d)
          );
          
          if (remainingDesignation) {
            // Auto-designate the last piece
            const finalMeshes = updatedMeshes.map(mesh => 
              mesh.uuid === lastMesh.uuid ? { ...mesh, designation: remainingDesignation } : mesh
            );
            
            // Auto-select the last piece for export
            setTimeout(() => {
              setSelectedMeshUuids(prev => 
                prev.includes(lastMesh.uuid) ? prev : [...prev, lastMesh.uuid]
              );
            }, 0);
            
            return finalMeshes;
          }
        }
      }
      
      return updatedMeshes;
    });
    
    // Also select the mesh for export when designating
    if (designation && !selectedMeshUuids.includes(uuid)) {
      setSelectedMeshUuids(prev => [...prev, uuid]);
    }
  }, [selectedMeshUuids, presetConfig, currentPreset, config.customDesignations]);

  const handlePresetChange = useCallback((presetId: string) => {
    setConfig(prev => ({
      ...prev,
      currentPreset: presetId
    }));
    
    // Clear designations when changing presets
    setMeshes(prev => prev.map(mesh => ({ ...mesh, designation: undefined })));
    setSelectedMeshUuids([]);
  }, []);

  const handleCustomDesignationsChange = useCallback((customDesignations: string[]) => {
    setConfig(prev => ({
      ...prev,
      customDesignations
    }));
  }, []);

  const handleReset = () => {
    if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
    }
    setFileUrl(null);
    setMeshes([]);
    setHoveredMeshUuid(null);
    setSelectedMeshUuids([]);
    setError(null);
  }

  const handleExport = () => {
    const selectedMeshesInfo = meshes.filter(mesh => selectedMeshUuids.includes(mesh.uuid));
    
    exportSelectedMeshes(
      selectedMeshesInfo,
      () => {
        // Success callback - could add a success message here if needed
      },
      (errorMessage) => {
        setError(errorMessage);
      }
    );
  };

  return (
    <div className="flex h-screen w-screen font-sans bg-gray-800 text-gray-200">
      <aside className="w-80 h-full bg-gray-900/70 backdrop-blur-sm flex flex-col p-4 border-r border-gray-700 shadow-2xl">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <CubeIcon className="w-8 h-8 mr-3 text-cyan-400" />
            <div>
              <h1 className="text-2xl font-bold tracking-wider">{config.ui.title}</h1>
              {config.ui.subtitle && (
                <p className="text-sm text-gray-400">{config.ui.subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowPresetSelector(!showPresetSelector)}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            title="Configure Presets"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </header>
        
        {showPresetSelector && (
          <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <PresetSelector
              currentPresetId={config.currentPreset}
              customDesignations={config.customDesignations}
              onPresetChange={handlePresetChange}
              onCustomDesignationsChange={handleCustomDesignationsChange}
            />
          </div>
        )}
        
        <FileUpload onChange={handleFileChange} onReset={handleReset} hasFile={!!fileUrl} />

        {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md my-4">{error}</div>}
        
        {meshes.length > 0 && (
          <>
            <div className="my-4">
              <button
                onClick={handleExport}
                disabled={selectedMeshUuids.length === 0}
                className="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 disabled:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Export Selected ({selectedMeshUuids.length})
              </button>
            </div>
            <MeshList
              meshes={meshes}
              selectedMeshUuids={selectedMeshUuids}
              currentPresetId={config.currentPreset}
              customDesignations={config.customDesignations}
              allowDuplicates={presetConfig.allowDuplicates}
              onToggleVisibility={toggleMeshVisibility}
              onToggleSelection={toggleMeshSelection}
              onHoverMesh={setHoveredMeshUuid}
              onChangeDesignation={handleDesignationChange}
            />
          </>
        )}
      </aside>

      <main className="flex-1 h-full">
        <Viewer 
          fileUrl={fileUrl} 
          meshes={meshes}
          selectedMeshUuids={selectedMeshUuids}
          hoveredMeshUuid={hoveredMeshUuid}
          onMeshesExtracted={onMeshesExtracted}
          onToggleSelection={toggleMeshSelection}
        />
      </main>
    </div>
  );
};

export default App;