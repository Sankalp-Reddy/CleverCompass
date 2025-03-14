
import React, { useState, useRef } from 'react';
import { Camera, X, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  onImageUploaded: (imageData: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setImage(imageData);
        onImageUploaded(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setImage(imageData);
        onImageUploaded(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        {!image ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`w-full rounded-xl border-2 border-dashed transition-colors
              ${isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 dark:border-gray-700'
              }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">
                Drag & Drop image or
              </p>
              <div className="mt-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Browse
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Upload equations, diagrams, or homework problems
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative rounded-xl overflow-hidden"
          >
            <img
              src={image}
              alt="Uploaded image"
              className="w-full h-auto max-h-64 object-contain bg-black/5 dark:bg-white/5"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 h-7 w-7"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
