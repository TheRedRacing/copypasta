import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-400 dark:text-zinc-900 dark:hover:bg-primary-500",
        destructive:
          "bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline:
          "ring-1 ring-inset text-zinc-600 hover:text-primary-600 ring-gray-500/10 hover:ring-primary-500/50 hover:bg-primary-50 dark:text-zinc-300 dark:hover:text-primary-400 dark:ring-zinc-400/20 dark:hover:ring-primary-400/30 dark:hover:bg-primary-400/10",
        secondary:
          "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        ghost: "hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-6",
        form: "h-10 px-8",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"


const buttonCardVariants = cva(
  "inline-flex items-center justify-center rounded-md bg-transparent h-8 px-4 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      variant: {
        default: "text-zinc-600 hover:text-primary-600 ring-gray-500/10 hover:ring-primary-500/50 hover:bg-primary-50 dark:text-zinc-300 dark:hover:text-primary-400 dark:ring-zinc-400/20 dark:hover:ring-primary-400/30 dark:hover:bg-primary-400/10",
        destructive: "text-zinc-600 hover:text-red-600 ring-red-500/10 hover:ring-red-500/50 hover:bg-red-50 dark:text-zinc-300 dark:hover:text-red-400 dark:ring-zinc-400/20 dark:hover:ring-red-400/30 dark:hover:bg-red-500/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonCardVariants> {
  asChild?: boolean
}

const ButtonCard = React.forwardRef<HTMLButtonElement, ButtonCardProps>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp className={cn(buttonCardVariants({ variant, className }))} ref={ref} {...props} />
  )
})
ButtonCard.displayName = "ButtonCard"



export { Button, ButtonCard, buttonVariants, buttonCardVariants }
