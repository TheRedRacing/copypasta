"use client";

import { useTheme } from "next-themes";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { themeMapping } from "@/lib/themeProvider";

import { SwatchIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";

const colors = [
    { name: "Default", value: "default", color: "bg-cyan-500" },
    { name: "Red", value: "red", color: "bg-red-500" },
    { name: "Orange", value: "orange", color: "bg-orange-500" },
    { name: "Yellow", value: "yellow", color: "bg-yellow-500" },
    { name: "Green", value: "green", color: "bg-green-500" },
    { name: "Teal", value: "teal", color: "bg-teal-500" },
    { name: "Blue", value: "blue", color: "bg-blue-500" },
    { name: "Indigo", value: "indigo", color: "bg-indigo-500" },
    { name: "Pink", value: "pink", color: "bg-pink-500" },
];

const ThemeOption: React.FC = () => {
    const { theme, setTheme } = useTheme();

    function getTheme(DarkMode: 'light' | 'dark' | 'system', selectedColor: string) {
        let key: string;

        if (DarkMode === 'system') {
            key = `system-${selectedColor}`;
        } else if (DarkMode === 'dark') {
            key = `dark-${selectedColor}`;
        } else {
            key = selectedColor;
        }

        setTheme(themeMapping[key] ?? themeMapping.default);
    }

    function getDarkMode(): 'light' | 'dark' | 'system' {
        if (!theme) return "light"; // Fallback par défaut

        if (theme.startsWith("dark")) {
            return "dark";
        } else if (theme.startsWith("system")) {
            return "system";
        } else {
            return "light";
        }
    }

    function getColor(): string {
        if (!theme) return "default"; // Fallback si `theme` est undefined

        if (theme === "light-default" || theme === "dark-default" || theme === "system-default") {
            return "default";
        } else if (theme.startsWith("dark")) {
            return theme.replace("dark-", "");
        } else if (theme.startsWith("system")) {
            return theme.replace("system-", "");
        } else {
            return theme;
        }
    }


    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size={'sm'} variant={'outline'}>
                        <SwatchIcon className="size-5" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Personalize Copy-Pasta</DialogTitle>
                        <DialogDescription>Select Appearance and Theme.</DialogDescription>
                    </DialogHeader>

                    <div className="">
                        <p className="mb-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Choose the primary color of your application.</p>
                        <div className="grid grid-cols-3 gap-4">
                            <button
                                type="button"
                                className={cn(getDarkMode() === "light" ? "ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950" : "", "overflow-hidden rounded border border-zinc-300 bg-zinc-100 text-zinc-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:focus-visible:ring-offset-zinc-950")}
                                onClick={() => getTheme('light', getColor())}
                            >
                                <div className="w-full border-b border-zinc-200 py-1 dark:border-zinc-500">Light</div>
                                <div className="relative flex">
                                    <span className="h-8 w-full bg-white"></span>
                                    <span className="h-8 w-full bg-zinc-800"></span>
                                </div>
                            </button>
                            <button
                                type="button"
                                className={cn(getDarkMode() === "dark" ? "ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950" : "", "overflow-hidden rounded border border-zinc-300 bg-zinc-100 text-zinc-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:focus-visible:ring-offset-zinc-950")}
                                onClick={() => getTheme('dark', getColor())}
                            >
                                <div className="w-full border-b border-zinc-200 py-1 dark:border-zinc-500">Dark</div>
                                <div className="relative flex">
                                    <span className="h-8 w-full bg-white"></span>
                                    <span className="h-8 w-full bg-zinc-800"></span>
                                </div>
                            </button>
                            <button
                                type="button"
                                className={cn(getDarkMode() === "system" ? "ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950" : "", "overflow-hidden rounded border border-zinc-300 bg-zinc-100 text-zinc-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:focus-visible:ring-offset-zinc-950")}
                                onClick={() => getTheme('system', getColor())}
                            >
                                <div className="w-full border-b border-zinc-200 py-1 dark:border-zinc-500">System</div>
                                <div className="relative flex">
                                    <span className="h-8 w-full bg-white"></span>
                                    <span className="h-8 w-full bg-zinc-800"></span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Choose the primary color of your application.</p>
                        <div className="grid grid-cols-3 gap-4">
                            {colors.map((color, themeIdx) => (
                                <button
                                    key={themeIdx}
                                    type="button"
                                    className={cn(getColor() === color.value ? "ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950" : "", "overflow-hidden rounded border border-zinc-300 bg-zinc-100 text-zinc-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:focus-visible:ring-offset-zinc-950")}
                                    onClick={() => {
                                        getTheme(getDarkMode(), color.value);
                                    }}
                                >
                                    <div className="w-full border-b border-zinc-200 py-1 dark:border-zinc-500">{color.name}</div>
                                    <div className="relative flex">
                                        <span className="h-8 w-full bg-white"></span>
                                        <span className="h-8 w-full bg-zinc-800"></span>
                                        <span className={cn(color.color, "absolute inset-x-4 top-1.5 h-2 rounded-full")}></span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ThemeOption;