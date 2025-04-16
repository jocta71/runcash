
import { AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const showErrorToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    variant: "destructive",
    className: "bg-[#1A191F] border-red-500",
    action: (
      <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
        <AlertCircle className="h-5 w-5 text-red-500" />
      </div>
    ),
  });
};
