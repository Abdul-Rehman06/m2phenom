import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

export interface FileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  className?: string;
  label?: React.ReactNode;
  supportText?: React.ReactNode;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept,
  multiple = false,
  maxSize,
  className,
  label = "Drag and drop your files here or click to browse",
  supportText,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setError(null);
    
    const fileArray = Array.from(files);
    if (maxSize) {
      const oversized = fileArray.find(f => f.size > maxSize);
      if (oversized) {
        setError(`File ${oversized.name} exceeds maximum size of ${(maxSize / (1024 * 1024)).toFixed(2)}MB`);
        return;
      }
    }
    
    onUpload(multiple ? fileArray : [fileArray[0]]);
  };

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors",
          isDragging 
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
            : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
          {(supportText || accept) && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {supportText || `Supported formats: ${accept}`}
            </p>
          )}
        </div>
      </motion.div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};
