import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';

export interface ImageUploadProps {
  onUpload: (file: File) => void;
  maxSize?: number;
  className?: string;
  defaultImage?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
  uploadText?: React.ReactNode;
  dragText?: React.ReactNode;
  supportText?: React.ReactNode;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
  defaultImage,
  aspectRatio = 'auto',
  uploadText = "Click to upload",
  dragText = "or drag and drop",
  supportText,
}) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError("Please upload a valid image file.");
      return;
    }
    if (file.size > maxSize) {
      setError(`Image must be less than ${(maxSize / (1024 * 1024)).toFixed(2)}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onUpload(file);
  };

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: 'min-h-[200px]',
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
          }
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer overflow-hidden transition-colors",
          aspectClasses[aspectRatio],
          isDragging 
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
            : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />
        
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.img
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-2 p-6 text-center z-10"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-blue-600 dark:text-blue-400">{uploadText}</span> {dragText}
              </div>
              <p className="text-xs text-gray-500">
                {supportText || `PNG, JPG, GIF up to ${(maxSize / (1024 * 1024)).toFixed(0)}MB`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {preview && (
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center z-20">
            <span className="text-white font-medium text-sm">Change Image</span>
          </div>
        )}
      </motion.div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};
