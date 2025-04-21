"use client";

import { useTheme } from "next-themes";
import { SwatchIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { focusClassName } from "@/lib/focus";
import { themeMapping } from "@/lib/themeProvider";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const colors = [
    { name: "Orange", value: "orange", color: "bg-orange-500" },
    { name: "Cyan", value: "cyan", color: "bg-cyan-500" },
    { name: "Red", value: "red", color: "bg-red-500" },
    { name: "Yellow", value: "yellow", color: "bg-yellow-500" },
    { name: "Green", value: "green", color: "bg-green-500" },
    { name: "Teal", value: "teal", color: "bg-teal-500" },
    { name: "Blue", value: "blue", color: "bg-blue-500" },
    { name: "Indigo", value: "indigo", color: "bg-indigo-500" },
    { name: "Pink", value: "pink", color: "bg-pink-500" },
];

const ThemeOption: React.FC = () => {
    const { theme, setTheme } = useTheme();

    function getTheme(DarkMode: "light" | "dark", selectedColor: string) {
        let key: string;

        if (DarkMode === "dark") {
            key = `dark-${selectedColor}`;
        } else {
            key = selectedColor;
        }

        console.log(key);

        setTheme(themeMapping[key] ?? themeMapping.default);
    }

    function getDarkMode(): "light" | "dark" {
        if (!theme) return "dark"; // Fallback par défaut

        if (theme.startsWith("dark")) {
            return "dark";
        } else {
            return "light";
        }
    }

    function getColor(): string {
        if (!theme) return "orange"; // Fallback si `theme` est undefined

        if (theme === "orange" || theme === "dark-orange") {
            return "orange";
        } else if (theme.startsWith("dark")) {
            return theme.replace("dark-", "");
        } else {
            return theme;
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size={"sm"} variant={"outline"} className={focusClassName}>
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
                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex flex-col items-center justify-center gap-2" onClick={() => getTheme("light", getColor())}>
                                <div className={cn("relative h-24 rounded-lg p-1 bg-zinc-50 border border-zinc-200 w-full overflow-hidden", getDarkMode() === "light" && "ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950")}>
                                    <div className="rounded-lg h-4 border border-zinc-300 p-1 flex items-center justify-between">
                                        <div className="w-6 h-2 bg-zinc-200 rounded-full"></div>
                                        <div className="w-4 h-2 bg-primary-500 rounded-full"></div>
                                    </div>
                                    <div className="py-1 space-y-px overflow-hidden">
                                        <div className="h-2 bg-zinc-200 rounded-t-lg"></div>
                                        <div className="h-2 bg-zinc-200"></div>
                                        <div className="h-2 bg-zinc-200"></div>
                                        <div className="h-2 bg-zinc-200"></div>
                                        <div className="h-2 bg-zinc-200 rounded-b-lg"></div>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 h-2 bg-primary-500"></div>
                                </div>
                                <div className="text-sm">Light</div>
                            </button>
                            <button type="button" className="flex flex-col items-center justify-center gap-2" onClick={() => getTheme("dark", getColor())}>
                                <div className={cn("relative h-24 rounded-lg p-1 bg-black w-full overflow-hidden", getDarkMode() === "dark" && "ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950")}>
                                    <div className="rounded-lg h-4 bg-white/20 p-1 flex items-center justify-between">
                                        <div className="w-6 h-2 bg-[#595959] rounded-full"></div>
                                        <div className="w-4 h-2 bg-primary-500 rounded-full"></div>
                                    </div>
                                    <div className="py-1 space-y-px rounded-lg overflow-hidden">
                                        <div className="h-2 bg-white/35 rounded-t-lg"></div>
                                        <div className="h-2 bg-white/35"></div>
                                        <div className="h-2 bg-white/35"></div>
                                        <div className="h-2 bg-white/35"></div>
                                        <div className="h-2 bg-white/35 rounded-b-lg"></div>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 h-2 bg-primary-600"></div>
                                </div>
                                <div className="text-sm">Dark</div>
                            </button>
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Choose the primary color of your application.</p>
                        <div className="flex gap-2">
                            {colors.map((color, themeIdx) => (
                                <button
                                    key={themeIdx}
                                    type="button"
                                    className={cn("relative overflow-hidden size-8 rounded-full border border-zinc-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:focus-visible:ring-offset-zinc-950", getColor() === color.value && "ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950")}
                                    onClick={() => {
                                        getTheme(getDarkMode(), color.value);
                                    }}
                                >
                                    <span className={cn(color.color, "absolute inset-0 rounded-full")}></span>
                                </button>
                            ))}
                        </div>
                        <p className="mt-6 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
                            Your color theme is : <span className="capitalize">{getColor()}</span>
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ThemeOption;
