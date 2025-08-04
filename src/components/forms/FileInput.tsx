import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { UploadIcon, DocumentIcon, TrashIcon } from '../icons'; // Asumo que tienes estos iconos

interface FileInputProps {
  name: string;
  label: string;
  rules?: any;
}

export const FileInput: React.FC<FileInputProps> = ({ name, label, rules }) => {
  const { register, setValue, watch } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const file = watch(name);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type === "application/pdf") {
        setValue(name, selectedFile, { shouldValidate: true });
        setFileName(selectedFile.name);
      } else {
        alert("Por favor, selecciona solo archivos PDF.");
      }
    }
  };

  const handleRemoveFile = () => {
    setValue(name, null, { shouldValidate: true });
    setFileName(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="text-siafi-body-bold text-gray-700 block mb-2">{label}</label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-siafi-primary transition-colors duration-200"
        onClick={handleContainerClick}
      >
        <input
          type="file"
          accept="application/pdf"
          {...register(name, rules)}
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        {!file && (
          <div className="flex flex-col items-center">
            <UploadIcon className="w-12 h-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta tu CV.
            </p>
            <p className="text-xs text-gray-500">Solo PDF (máx. 10MB)</p>
          </div>
        )}
        {file && fileName && (
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <DocumentIcon className="w-6 h-6 text-siafi-primary" />
              <span className="text-sm font-medium text-gray-800">{fileName}</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Evita que el click se propague al contenedor
                handleRemoveFile();
              }}
              className="p-1 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
