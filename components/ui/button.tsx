import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-8 py-3.5 rounded-full font-label-button text-label-button transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-primary-container dark:bg-primary-container text-surface-black dark:text-surface-black hover:scale-105 active:scale-95 shadow-lg shadow-primary-container/20":
              variant === "primary",
            "bg-surface-container-high/80 dark:bg-surface-container-high/80 text-text-primary dark:text-text-primary hover:bg-surface-container-highest dark:hover:bg-surface-container-highest hover:text-primary-container dark:hover:text-primary-container hover:scale-105 active:scale-95":
              variant === "secondary",
            "text-text-primary dark:text-text-primary hover:text-primary-container dark:hover:text-primary-container":
              variant === "ghost",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
