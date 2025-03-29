import { Header } from "@/components/layout/header";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Model Showcase</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Model Showcase is a platform that allows you to explore and test various AI models through a simple, intuitive interface.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
            <p>
              Our platform provides a collection of pre-trained AI models that you can test with your own images. Simply:
            </p>
            <ol className="list-decimal pl-6 space-y-2 my-4">
              <li>Browse the available models on the home page</li>
              <li>Select a model you're interested in</li>
              <li>Upload an image to test the model</li>
              <li>View the prediction results in a readable format</li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Models</h2>
            <p>
              We offer a variety of models for different computer vision tasks:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Object Detection</strong> - Models that identify and locate objects within images</li>
              <li><strong>Classification</strong> - Models that classify images into predefined categories</li>
              <li><strong>Segmentation</strong> - Models that segment images into different regions</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Technical Details</h2>
            <p>
              The frontend of this application is built with React, Vite, and Tailwind CSS. The models run on a Python backend that processes the images and returns predictions.
            </p>
            <p className="mt-4">
              For production use, we recommend deploying the Python backend on a server with GPU support for faster inference times.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;