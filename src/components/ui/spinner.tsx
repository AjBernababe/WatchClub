import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return <Loader2 className={cn("animate-spin", className)} />;
}
