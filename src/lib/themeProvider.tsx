"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0];

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

export const rainbowStorageKey = "copypasta-rainbow";

export const colorThemes = ["orange", "red", "cyan", "yellow", "green", "teal", "blue", "indigo", "pink"] as const;

function RainbowThemeEffect() {
    const { theme, setTheme } = useTheme();

    React.useEffect(() => {
        if (localStorage.getItem(rainbowStorageKey) !== "true") return;

        const isDark = theme?.startsWith("dark") ?? true;
        const randomColor = colorThemes[Math.floor(Math.random() * colorThemes.length)];
        const key = isDark ? `dark-${randomColor}` : randomColor;

        setTheme(themeMapping[key] ?? themeMapping.default);
        // Only randomize once, when the app first loads.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <RainbowThemeEffect />
            {children}
        </NextThemesProvider>
    );
}
