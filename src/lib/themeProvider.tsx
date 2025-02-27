"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0];

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

type ThemeMapping = Record<string, string>;

export const themeMapping: ThemeMapping = {
    default: "light-default",
    red: "red",
    orange: "orange",
    yellow: "yellow",
    green: "green",
    teal: "teal",
    blue: "blue",
    indigo: "indigo",
    pink: "pink",
    "dark-default": "dark-default",
    "dark-red": "dark-red",
    "dark-orange": "dark-orange",
    "dark-yellow": "dark-yellow",
    "dark-green": "dark-green",
    "dark-teal": "dark-teal",
    "dark-blue": "dark-blue",
    "dark-indigo": "dark-indigo",
    "dark-pink": "dark-pink",
    "system-default": "system-default",
    "system-red": "system-red",
    "system-orange": "system-orange",
    "system-yellow": "system-yellow",
    "system-green": "system-green",
    "system-teal": "system-teal",
    "system-blue": "system-blue",
    "system-indigo": "system-indigo",
    "system-pink": "system-pink",
};
