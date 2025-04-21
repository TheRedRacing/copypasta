import * as React from "react";
import { focusClassName } from "@/lib/focus";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => {
    return <textarea className={cn("flex min-h-[200px] w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:placeholder:text-zinc-400", className, focusClassName)} ref={ref} {...props} />;
});
Textarea.displayName = "Textarea";

export { Textarea };
