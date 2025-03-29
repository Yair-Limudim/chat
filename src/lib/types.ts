export interface Model {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  detailedDescription: string;
}

export interface ModelCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface PredictionResult {
  modelId: string;
  imageId: string;
  result: any;
  timestamp: string;
}

export interface UploadedImage {
  id: string;
  url: string;
  timestamp: string;
}