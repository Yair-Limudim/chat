import { create } from "zustand";
import type { Model, PredictionResult, UploadedImage } from "./types";
import { mockModels } from "./mock-data";

interface ModelStore {
  models: Model[];
  selectedModel: Model | null;
  uploadedImage: UploadedImage | null;
  predictionResult: PredictionResult | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchModels: () => void;
  selectModel: (modelId: string) => void;
  setUploadedImage: (image: UploadedImage | null) => void;
  setPredictionResult: (result: PredictionResult | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useModelStore = create<ModelStore>((set, get) => ({
  models: [],
  selectedModel: null,
  uploadedImage: null,
  predictionResult: null,
  isLoading: false,
  error: null,
  
  fetchModels: () => {
    set({ isLoading: true, error: null });
    // In a real app, this would be an API call
    setTimeout(() => {
      set({ models: mockModels, isLoading: false });
    }, 500);
  },
  
  selectModel: (modelId: string) => {
    const { models } = get();
    const model = models.find(m => m.id === modelId) || null;
    set({ selectedModel: model, uploadedImage: null, predictionResult: null });
  },
  
  setUploadedImage: (image: UploadedImage | null) => {
    set({ uploadedImage: image, predictionResult: null });
  },
  
  setPredictionResult: (result: PredictionResult | null) => {
    set({ predictionResult: result });
  },
  
  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
  
  setError: (error: string | null) => {
    set({ error });
  }
}));