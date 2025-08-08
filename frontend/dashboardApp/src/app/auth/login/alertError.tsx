// app/auth/login/alertError.tsx
import { AlertCircleIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/ui/alert";

interface AlertErrorProps {
  children: React.ReactNode;
}

export function AlertError({ children }: AlertErrorProps) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4 mb-4">
      <Alert variant="destructive">
        <AlertCircleIcon className="h-5 w-5" />
        <AlertTitle>Failed!</AlertTitle>
        <AlertDescription>
          <p>{children}</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
