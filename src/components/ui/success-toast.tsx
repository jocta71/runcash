
import { CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const showSuccessToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    className: "bg-[#1A191F] border-green-500",
    action: (
      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
        <CheckCircle className="h-5 w-5 text-green-500" />
      </div>
    ),
  });
};
