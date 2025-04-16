
import { Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const showInfoToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    className: "bg-[#1A191F] border-blue-500",
    action: (
      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
        <Info className="h-5 w-5 text-blue-500" />
      </div>
    ),
  });
};
