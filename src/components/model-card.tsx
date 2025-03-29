import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Model } from "@/lib/types";
import { mockCategories } from "@/lib/mock-data";

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  const category = mockCategories.find(c => c.id === model.category);
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${model.imageUrl || 'https://placehold.co/600x400/3b82f6/FFFFFF/png?text=' + model.name})`,
          backgroundColor: category?.color || '#3b82f6'
        }}
      />
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{model.name}</CardTitle>
          <Badge 
            style={{ backgroundColor: category?.color }}
            className="text-white"
          >
            {category?.name || model.category}
          </Badge>
        </div>
        <CardDescription>{model.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {model.detailedDescription.substring(0, 120)}...
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/model/${model.id}`} className="flex items-center justify-center gap-2">
            Try this model <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}