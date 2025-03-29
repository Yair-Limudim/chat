import { useEffect } from "react";
import { ModelCard } from "@/components/model-card";
import { Header } from "@/components/layout/header";
import { useModelStore } from "@/lib/store";
import { Loader2 } from "lucide-react";

const HomePage = () => {
  const { models, isLoading, fetchModels } = useModelStore();

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Model Showcase</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of AI models and test them with your own images
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;