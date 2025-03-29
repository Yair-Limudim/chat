import type { Model, ModelCategory } from "./types";

export const mockCategories: ModelCategory[] = [
  {
    id: "object-detection",
    name: "Object Detection",
    description: "Models that identify and locate objects within images",
    color: "#3b82f6" // blue
  },
  {
    id: "classification",
    name: "Classification",
    description: "Models that classify images into predefined categories",
    color: "#8b5cf6" // purple
  },
  {
    id: "segmentation",
    name: "Segmentation",
    description: "Models that segment images into different regions",
    color: "#ec4899" // pink
  }
];

export const mockModels: Model[] = [
  {
    id: "yolo-v8",
    name: "YOLO v8",
    description: "Real-time object detection with state-of-the-art accuracy",
    category: "object-detection",
    imageUrl: "/images/yolo.png",
    detailedDescription: "YOLO (You Only Look Once) is a state-of-the-art object detection algorithm that can detect multiple objects in an image in real-time. Version 8 brings improvements in accuracy and speed over previous versions. The model can detect 80 different types of objects including people, cars, animals, and everyday objects."
  },
  {
    id: "resnet-50",
    name: "ResNet-50",
    description: "Deep residual network for image classification tasks",
    category: "classification",
    imageUrl: "/images/resnet.png",
    detailedDescription: "ResNet-50 is a convolutional neural network that is 50 layers deep. It's a variant of the ResNet model which won the ImageNet challenge in 2015. The model has been trained on more than a million images and can classify images into 1000 object categories, such as keyboard, mouse, pencil, and many animals."
  },
  {
    id: "mask-rcnn",
    name: "Mask R-CNN",
    description: "Instance segmentation model for precise object detection",
    category: "segmentation",
    imageUrl: "/images/mask-rcnn.png",
    detailedDescription: "Mask R-CNN extends Faster R-CNN by adding a branch for predicting an object mask in parallel with the existing branch for bounding box recognition. It's designed for instance segmentation, which not only detects objects but also generates a high-quality segmentation mask for each instance."
  },
  {
    id: "efficientnet",
    name: "EfficientNet",
    description: "Scalable and efficient model for image classification",
    category: "classification",
    imageUrl: "/images/efficientnet.png",
    detailedDescription: "EfficientNet is a convolutional neural network architecture that uniformly scales all dimensions of depth/width/resolution using a compound coefficient. It achieves state-of-the-art accuracy on ImageNet while being an order of magnitude smaller and faster than previous models."
  },
  {
    id: "detr",
    name: "DETR",
    description: "End-to-End Object Detection with Transformers",
    category: "object-detection",
    imageUrl: "/images/detr.png",
    detailedDescription: "DETR (DEtection TRansformer) is a new approach to object detection that views object detection as a direct set prediction problem. It streamlines the detection pipeline by removing the need for many hand-designed components like non-maximum suppression or anchor generation."
  },
  {
    id: "unet",
    name: "U-Net",
    description: "Convolutional network for biomedical image segmentation",
    category: "segmentation",
    imageUrl: "/images/unet.png",
    detailedDescription: "U-Net is a convolutional neural network that was developed for biomedical image segmentation. The architecture contains two paths: a contracting path to capture context and a symmetric expanding path that enables precise localization. It's particularly effective for segmenting images where training data is limited."
  }
];