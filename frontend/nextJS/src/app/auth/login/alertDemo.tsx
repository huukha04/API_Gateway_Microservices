import { AlertCircleIcon} from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shacn/ui/alert"

export function AlertDemo() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <AlertCircleIcon />
        <AlertTitle>Demo.</AlertTitle>
        <AlertDescription>
          <p>Can you login with.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Admin: admin/admin123@</li>
            <li>Guest user: demo/demo123@</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
