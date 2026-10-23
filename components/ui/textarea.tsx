import { cn } from "@/lib/utils"
import { TextareaHTMLAttributes, forwardRef } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="font-label-nav text-label-nav text-on-surface-variant dark:text-on-surface-variant uppercase tracking-wider">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "px-4 py-3 rounded-lg bg-surface-container dark:bg-surface-container border border-outline-variant dark:border-outline-variant text-text-primary dark:text-text-primary placeholder:text-on-surface-variant dark:placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-primary-container focus:border-transparent transition-all min-h-[100px]",
            error && "border-error dark:border-error focus:ring-error dark:focus:ring-error",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-sm text-error dark:text-error">{error}</span>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"
