"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0];

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

type ThemeMapping = Record<string, string>;

export const themeMapping: ThemeMapping = {
    orange: "orange",
    red: "red",
    cyan: "cyan",
    yellow: "yellow",
    green: "green",
    teal: "teal",
    blue: "blue",
    indigo: "indigo",
    pink: "pink",
    "dark-orange": "dark-orange",
    "dark-red": "dark-red",
    "dark-cyan": "dark-cyan",
    "dark-yellow": "dark-yellow",
    "dark-green": "dark-green",
    "dark-teal": "dark-teal",
    "dark-blue": "dark-blue",
    "dark-indigo": "dark-indigo",
    "dark-pink": "dark-pink",
};
