import React, { useState } from 'react';
import { DesignationPreset } from '../types';
import { DESIGNATION_PRESETS, getPresetsByCategory } from '../constants/presets';
import CustomDesignationEditor from './CustomDesignationEditor';

interface PresetSelectorProps {
  currentPresetId: string;
  customDesignations: string[];
  onPresetChange: (presetId: string) => void;
  onCustomDesignationsChange: (designations: string[]) => void;
  className?: string;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({ 
  currentPresetId, 
  customDesignations,
  onPresetChange, 
  onCustomDesignationsChange,
  className = '' 
}) => {
  const [showCustomEditor, setShowCustomEditor] = useState(false);
  const categories = ['games', 'vehicles', 'buildings', 'characters', 'furniture', 'custom'];
  
  const getCurrentPreset = (): DesignationPreset => {
    return DESIGNATION_PRESETS.find(p => p.id === currentPresetId) || DESIGNATION_PRESETS[0];
  };

  const getAvailableDesignations = () => {
    const preset = getCurrentPreset();
    return [...preset.designations, ...customDesignations];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-300">Designation Preset</h3>
        <span className="text-xs text-gray-500">
          {getAvailableDesignations().length - 1} designations
        </span>
      </div>
      
      {/* Current preset display */}
      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getCurrentPreset().icon}</span>
          <div className="flex-1">
            <h4 className="font-medium text-gray-200">{getCurrentPreset().name}</h4>
            <p className="text-xs text-gray-400">{getCurrentPreset().description}</p>
          </div>
        </div>
      </div>

      {/* Preset selector */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Choose Preset
        </label>
        <select
          value={currentPresetId}
          onChange={(e) => onPresetChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        >
          {categories.map(category => {
            const categoryPresets = getPresetsByCategory(category);
            return (
              <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                {categoryPresets.map(preset => (
                  <option key={preset.id} value={preset.id}>
                    {preset.icon} {preset.name}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
      </div>

      {/* Custom designations toggle */}
      <div className="space-y-2">
        <button
          onClick={() => setShowCustomEditor(!showCustomEditor)}
          className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 rounded-md text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
        >
          {showCustomEditor ? 'Hide' : 'Show'} Custom Designations
          {customDesignations.length > 0 && (
            <span className="ml-2 px-2 py-1 bg-cyan-600 text-white text-xs rounded-full">
              {customDesignations.length}
            </span>
          )}
        </button>
      </div>

      {/* Custom designation editor */}
      {showCustomEditor && (
        <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <CustomDesignationEditor
            customDesignations={customDesignations}
            onDesignationsChange={onCustomDesignationsChange}
          />
        </div>
      )}

      {/* Available designations preview */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Available Designations
        </label>
        <div className="flex flex-wrap gap-1">
          {getAvailableDesignations()
            .filter(d => d !== '') // Exclude empty designation
            .map((designation, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs rounded-md border ${
                  customDesignations.includes(designation)
                    ? 'bg-purple-700 text-purple-200 border-purple-600'
                    : 'bg-gray-700 text-gray-300 border-gray-600'
                }`}
              >
                {designation}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PresetSelector; 