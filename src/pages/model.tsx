import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/image-uploader";
import { JsonViewer } from "@/components/ui/json-viewer";
import { useModelStore } from "@/lib/store";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { mockCategories } from "@/lib/mock-data";
import { PredictionResult, UploadedImage } from "@/lib/types";

const ModelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    models, 
    selectedModel, 
    uploadedImage,
    predictionResult,
    isLoading,
    error,
    fetchModels, 
    selectModel,
    setUploadedImage,
    setPredictionResult,
    setLoading,
    setError
  } = useModelStore();
  
  const [processingImage, setProcessingImage] = useState(false);

  useEffect(() => {
    if (models.length === 0) {
      fetchModels();
    }
    
    if (id) {
      selectModel(id);
    }
  }, [id, models.length, fetchModels, selectModel]);

  const handleImageUpload = (image: UploadedImage) => {
    setUploadedImage(image);
    setPredictionResult(null);
  };

  const handleProcessImage = async () => {
    if (!selectedModel || !uploadedImage || !uploadedImage.url) return;
    
    setProcessingImage(true);
    
    try {
      // In a real app, this would be an API call to your Python backend
      // For demo purposes, we'll simulate a response after a delay
      setTimeout(() => {
        const mockResult: PredictionResult = {
          modelId: selectedModel.id,
          imageId: uploadedImage.id,
          result: generateMockResult(selectedModel.id),
          timestamp: new Date().toISOString()
        };
        
        setPredictionResult(mockResult);
        setProcessingImage(false);
      }, 2000);
    } catch (err) {
      setError("Failed to process image. Please try again.");
      setProcessingImage(false);
      toast.error("Failed to process image");
    }
  };

  const generateMockResult = (modelId: string) => {
    switch (modelId) {
      case "yolo-v8":
        return {
          detections: [
            { class: "person", confidence: 0.92, bbox: [10, 20, 100, 200] },
            { class: "car", confidence: 0.87, bbox: [150, 120, 200, 100] },
            { class: "dog", confidence: 0.76, bbox: [300, 250, 80, 60] }
          ],
          inference_time: 0.045,
          model_version: "YOLOv8n"
        };
      case "resnet-50":
        return {
          classifications: [
            { class: "golden retriever", confidence: 0.89 },
            { class: "labrador", confidence: 0.08 },
            { class: "beagle", confidence: 0.02 }
          ],
          inference_time: 0.032,
          model_version: "ResNet-50"
        };
      case "mask-rcnn":
        return {
          instances: [
            { 
              class: "person", 
              confidence: 0.95, 
              bbox: [20, 30, 120, 240],
              mask: "base64_encoded_mask_data..." 
            },
            { 
              class: "bicycle", 
              confidence: 0.82, 
              bbox: [180, 150, 220, 180],
              mask: "base64_encoded_mask_data..." 
            }
          ],
          inference_time: 0.078,
          model_version: "Mask R-CNN"
        };
      default:
        return {
          result: "Model prediction completed successfully",
          confidence: 0.85,
          inference_time: 0.056,
          model_version: "Generic Model"
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  if (!selectedModel) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-8 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Model not found</h2>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </main>
      </div>
    );
  }

  const category = mockCategories.find(c => c.id === selectedModel.category);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <Button variant="outline" className="mb-6" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Models
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Model Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-3xl font-bold">{selectedModel.name}</h1>
              <Badge 
                style={{ backgroundColor: category?.color }}
                className="text-white"
              >
                {category?.name}
              </Badge>
            </div>
            
            <p className="text-muted-foreground mb-6">{selectedModel.description}</p>
            
            <div 
              className="h-48 bg-cover bg-center rounded-lg mb-6 flex items-center justify-center"
              style={{ backgroundColor: category?.color || '#3b82f6' }}
            >
              <span className="text-white text-3xl font-bold">{selectedModel.name}</span>
            </div>
            
            <h2 className="text-xl font-semibold mb-2">About this model</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {selectedModel.detailedDescription}
            </p>
          </div>
          
          {/* Image Upload and Results */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Test the model</h2>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
            
            {uploadedImage && uploadedImage.url && (
              <Button 
                className="w-full" 
                onClick={handleProcessImage}
                disabled={processingImage}
              >
                {processingImage ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Process Image'
                )}
              </Button>
            )}
            
            {predictionResult && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Results</h2>
                <JsonViewer data={predictionResult.result} />
              </div>
            )}
            
            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-md">
                {error}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModelPage;