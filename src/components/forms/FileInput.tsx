import React, { useRef, useState } from 'react';
import { UploadIcon, DocumentIcon, TrashIcon } from '../icons';

interface FileInputProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  name: string;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, value, onChange, name }, ref) => {
    const localInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      onChange(files && files.length > 0 ? files[0] : null);
    };

    const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onChange(null);
      if (localInputRef.current) {
        localInputRef.current.value = '';
      }
    };

    const handleContainerClick = () => {
      if (!value) {
        localInputRef.current?.click();
      }
    };

    const handleDragEvent = (e: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(isEntering);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const droppedFile = files[0];
        if (droppedFile.type === "application/pdf") {
          onChange(droppedFile);
        } else {
          alert("Por favor, selecciona solo archivos PDF.");
        }
      }
    };

    return (
      <div>
        <label className="text-siafi-body-bold text-gray-700 block mb-2">{label}</label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 
            ${!value ? 'cursor-pointer hover:border-siafi-primary' : 'cursor-default'}
            ${isDragging ? 'border-siafi-primary bg-blue-50' : 'border-gray-300'}
          `}
          onClick={handleContainerClick}
          onDragEnter={(e) => handleDragEvent(e, true)}
          onDragLeave={(e) => handleDragEvent(e, false)}
          onDragOver={(e) => e.preventDefault()} // Necesario para que onDrop funcione
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="application/pdf"
            name={name}
            ref={(e) => {
              if (typeof ref === 'function') ref(e);
              (localInputRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
            }}
            className="hidden"
            onChange={handleFileChange}
          />
          {!value ? (
            <div className="flex flex-col items-center pointer-events-none"> {/* Evita que los hijos interfieran con el drag */}
              <UploadIcon className="w-12 h-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta tu CV.
              </p>
              <p className="text-xs text-gray-500">Solo PDF (máx. 10MB)</p>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center space-x-2 overflow-hidden">
                <DocumentIcon className="w-6 h-6 text-siafi-primary flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800 truncate">{value.name}</span>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                aria-label="Eliminar archivo"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
