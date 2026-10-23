import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

export type CardProps = HTMLAttributes<HTMLDivElement>

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "p-space-md rounded-2xl bg-surface-container-low dark:bg-surface-container-low border border-outline-variant/20 dark:border-outline-variant/20 hover:border-primary-container/40 dark:hover:border-primary-container/40 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
