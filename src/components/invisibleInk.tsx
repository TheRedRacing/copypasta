"use client";

import { motion } from "framer-motion";

interface InvisibleInkProps {
    text: string;
    isPrivate: boolean;
    className?: string;
}

export function InvisibleInk({ text, isPrivate, className = "" }: InvisibleInkProps) {
    return (
        <motion.span className={className} animate={isPrivate ? { filter: "blur(6px)", opacity: 0.6, userSelect: "none" } : { filter: "blur(0px)", opacity: 1, userSelect: "auto" }} transition={{ duration: 0.2, ease: "easeInOut" }} style={{ display: "inline-block" }}>
            {text}
        </motion.span>
    );
}
