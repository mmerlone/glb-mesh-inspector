import React from 'react';
import { UploadIcon, TrashIcon } from './icons';

interface FileUploadProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  hasFile: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange, onReset, hasFile }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        ref={inputRef}
        onChange={onChange}
        accept=".glb"
        className="hidden"
        // Add key to reset input value so same file can be re-uploaded
        key={hasFile ? 'file-present' : 'no-file'}
      />
      <div className="flex space-x-2">
        <button
          onClick={handleButtonClick}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
        >
          <UploadIcon className="w-5 h-5 mr-2" />
          {hasFile ? 'Load New Model' : 'Load Model'}
        </button>
        {hasFile && (
           <button
             onClick={onReset}
             className="px-4 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
           >
             <TrashIcon className="w-5 h-5" />
           </button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
