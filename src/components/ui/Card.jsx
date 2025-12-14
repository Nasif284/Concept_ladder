import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-gray-200 bg-white text-slate-950 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50",
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

export { Card }
