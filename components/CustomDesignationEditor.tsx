import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from './icons';

interface CustomDesignationEditorProps {
  customDesignations: string[];
  onDesignationsChange: (designations: string[]) => void;
  className?: string;
}

const CustomDesignationEditor: React.FC<CustomDesignationEditorProps> = ({
  customDesignations,
  onDesignationsChange,
  className = ''
}) => {
  const [newDesignation, setNewDesignation] = useState('');

  const addDesignation = () => {
    if (newDesignation.trim() && !customDesignations.includes(newDesignation.trim())) {
      onDesignationsChange([...customDesignations, newDesignation.trim()]);
      setNewDesignation('');
    }
  };

  const removeDesignation = (index: number) => {
    const updated = customDesignations.filter((_, i) => i !== index);
    onDesignationsChange(updated);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addDesignation();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-300">Custom Designations</h3>
        <span className="text-xs text-gray-500">
          {customDesignations.length} custom
        </span>
      </div>

      {/* Add new designation */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newDesignation}
          onChange={(e) => setNewDesignation(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add custom designation..."
          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        <button
          onClick={addDesignation}
          disabled={!newDesignation.trim()}
          className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:text-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Custom designations list */}
      {customDesignations.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Custom Designations
          </label>
          <div className="space-y-1">
            {customDesignations.map((designation, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-700 rounded-md"
              >
                <span className="text-sm text-gray-200">{designation}</span>
                <button
                  onClick={() => removeDesignation(index)}
                  className="p-1 text-gray-400 hover:text-red-400 hover:bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick templates */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Quick Templates
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            ['Front', 'Back', 'Left', 'Right'],
            ['Top', 'Bottom', 'Inside', 'Outside'],
            ['Main', 'Secondary', 'Detail', 'Base']
          ].map((template, templateIndex) => (
            <button
              key={templateIndex}
              onClick={() => onDesignationsChange([...customDesignations, ...template])}
              className="p-2 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded border border-gray-600 hover:border-gray-500 transition-colors"
            >
              {template.join(', ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomDesignationEditor; 