import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { focusClassName } from "@/lib/focus";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-500 dark:text-zinc-900 dark:hover:bg-primary-600",
        destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:text-zinc-900 dark:hover:bg-red-600",
        outline: "border text-zinc-600 hover:text-primary-600 border-gray-500/30 hover:border-primary-500/50 hover:bg-primary-50 dark:text-zinc-300 dark:hover:text-primary-500 dark:border-zinc-500/20 dark:hover:border-primary-500/30 dark:hover:bg-primary-500/10",
        outline_destructive: "border text-zinc-600 hover:text-red-600 border-gray-500/30 hover:border-red-500/50 hover:bg-red-50 dark:text-zinc-300 dark:hover:text-red-500 dark:border-zinc-500/20 dark:hover:border-red-500/30 dark:hover:bg-red-500/10",
        secondary: "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        ghost: "hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        link: "text-zinc-900 underline-offset-4 hover:underline hover:text-primary-400 dark:text-zinc-50",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-lg",
        sm: "h-8 px-6 rounded-lg",
        i8: "h-8 w-8 rounded-lg",
        i10: "h-10 w-10 rounded-lg",
        g: "h-5 w-6 rounded-md"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), focusClassName)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"



export { Button, buttonVariants }
