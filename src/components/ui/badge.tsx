import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border", {
    variants: {
        variant: {
            gray: "bg-gray-50 text-gray-600 border-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-400/20",
            red: "bg-red-50 text-red-700 border-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:border-red-400/20",
            yellow: "bg-yellow-50 text-yellow-800 border-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:border-yellow-400/20",
            green: "bg-green-50 text-green-700 border-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
            blue: "bg-blue-50 text-blue-700 border-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/30",
            indigo: "bg-indigo-50 text-indigo-700 border-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:border-indigo-400/30",
            purple: "bg-purple-50 text-purple-700 border-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:border-purple-400/30",
            pink: "bg-pink-50 text-pink-700 border-pink-700/10 dark:bg-pink-400/10 dark:text-pink-400 dark:border-pink-400/20",
        },
    },
    defaultVariants: {
        variant: "gray",
    },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
