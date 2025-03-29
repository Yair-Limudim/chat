import React, { useState } from "react";
import { ChevronDown, ChevronRight, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { toast } from "sonner";

interface JsonViewerProps {
  data: any;
  className?: string;
}

export function JsonViewer({ data, className }: JsonViewerProps) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const toggleExpand = (path: string) => {
    const newExpandedKeys = new Set(expandedKeys);
    if (newExpandedKeys.has(path)) {
      newExpandedKeys.delete(path);
    } else {
      newExpandedKeys.add(path);
    }
    setExpandedKeys(newExpandedKeys);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast.success("JSON copied to clipboard");
  };

  const renderValue = (value: any, path: string, depth: number = 0): React.ReactNode => {
    if (value === null) return <span className="text-gray-500">null</span>;
    if (value === undefined) return <span className="text-gray-500">undefined</span>;
    
    if (typeof value === "boolean") {
      return <span className="text-yellow-600 dark:text-yellow-400">{value.toString()}</span>;
    }
    
    if (typeof value === "number") {
      return <span className="text-blue-600 dark:text-blue-400">{value}</span>;
    }
    
    if (typeof value === "string") {
      return <span className="text-green-600 dark:text-green-400">"{value}"</span>;
    }
    
    if (Array.isArray(value)) {
      if (value.length === 0) return <span>[]</span>;
      
      const isExpanded = expandedKeys.has(path);
      
      return (
        <div>
          <div 
            className="inline-flex items-center cursor-pointer" 
            onClick={() => toggleExpand(path)}
          >
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            <span className="ml-1">[{value.length}]</span>
          </div>
          
          {isExpanded && (
            <div className="pl-4 border-l border-gray-300 dark:border-gray-700 ml-2">
              {value.map((item, index) => (
                <div key={`${path}.${index}`} className="my-1">
                  <span className="text-gray-500 mr-2">{index}:</span>
                  {renderValue(item, `${path}.${index}`, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    if (typeof value === "object") {
      const keys = Object.keys(value);
      if (keys.length === 0) return <span>{"{}"}</span>;
      
      const isExpanded = expandedKeys.has(path);
      
      return (
        <div>
          <div 
            className="inline-flex items-center cursor-pointer" 
            onClick={() => toggleExpand(path)}
          >
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            <span className="ml-1">{"{"}{keys.length}{"}"}</span>
          </div>
          
          {isExpanded && (
            <div className="pl-4 border-l border-gray-300 dark:border-gray-700 ml-2">
              {keys.map(key => (
                <div key={`${path}.${key}`} className="my-1">
                  <span className="text-purple-600 dark:text-purple-400 mr-2">"{key}":</span>
                  {renderValue(value[key], `${path}.${key}`, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return <span>{String(value)}</span>;
  };

  return (
    <div className={cn("rounded-md bg-muted/50 p-4 font-mono text-sm", className)}>
      <div className="flex justify-end mb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1" 
          onClick={copyToClipboard}
        >
          <Copy className="h-3.5 w-3.5" />
          <span>Copy</span>
        </Button>
      </div>
      <div className="overflow-auto">
        {renderValue(data, "root")}
      </div>
    </div>
  );
}