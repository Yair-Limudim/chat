import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import type { UploadedImage } from "@/lib/types";

interface ImageUploaderProps {
  onImageUpload: (image: UploadedImage) => void;
  className?: string;
}

export function ImageUploader({ onImageUpload, className }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      
      const uploadedImage: UploadedImage = {
        id: uuidv4(),
        url: result,
        timestamp: new Date().toISOString()
      };
      
      onImageUpload(uploadedImage);
    };
    reader.readAsDataURL(file);
  };
  
  const clearImage = () => {
    setPreviewUrl(null);
    onImageUpload({
      id: "",
      url: "",
      timestamp: ""
    });
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        {!previewUrl ? (
          <div
            className={cn(
              "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors",
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-primary/50",
              className
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-background p-3">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Upload an image</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to upload
                </p>
              </div>
              <label htmlFor="file-upload">
                <Button variant="secondary" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Select Image
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-auto object-contain max-h-[400px]" 
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}