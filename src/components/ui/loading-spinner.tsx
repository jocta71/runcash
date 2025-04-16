
import { Loader2 } from "lucide-react";
import React from "react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  text?: string;
  variant?: "default" | "primary" | "secondary" | "light";
}

const LoadingSpinner = ({ 
  size = 24, 
  className = "", 
  text,
  variant = "default"
}: LoadingSpinnerProps) => {
  // Define color variants
  const colorVariants = {
    default: "text-primary",
    primary: "text-[#00ff00]",
    secondary: "text-white",
    light: "text-gray-300"
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 
        className={`animate-spin ${colorVariants[variant]}`} 
        style={{ width: size, height: size }} 
      />
      {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
