"use client";

import { useEffect, useRef } from "react";

const OFFSET = 4;
const SELECTOR = "button, input, textarea, a[href], [tabindex]:not([tabindex='-1'])";

export function FocusBlob() {
    const blobRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<Element | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const blob = blobRef.current;
        if (!blob) return;

        const hide = () => {
            blob.style.opacity = "0";
            activeRef.current = null;
        };

        const show = (el: Element) => {
            const r = el.getBoundingClientRect();

            // Élément hors écran ou invisible
            if (r.width <= 1 || r.height <= 1) return hide();

            const br = parseFloat(getComputedStyle(el).borderRadius) + OFFSET;

            blob.style.left = `${r.left + window.scrollX - OFFSET}px`;
            blob.style.top = `${r.top + window.scrollY - OFFSET}px`;
            blob.style.width = `${r.width + OFFSET * 2}px`;
            blob.style.height = `${r.height + OFFSET * 2}px`;
            blob.style.borderRadius = `${br}px`;
            blob.style.opacity = "1";
        };

        const onFocus = (e: FocusEvent) => {
            const el = e.target as Element;
            if (!el.matches(SELECTOR)) return;

            activeRef.current = el;

            // Annule un RAF en cours
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

            // Defer d'un frame pour laisser les animations s'installer (dialog, popover…)
            rafRef.current = requestAnimationFrame(() => {
                // Vérifie que l'élément est toujours le focused
                if (activeRef.current !== el) return;
                show(el);
            });
        };

        const onBlur = () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            hide();
        };

        // Cache le blob dès qu'un dialog/modal se ferme
        const onAnimationStart = (e: AnimationEvent) => {
            const target = e.target as Element;
            if (target.closest('[role="dialog"]')) hide();
        };

        document.addEventListener("focusin", onFocus);
        document.addEventListener("focusout", onBlur);
        document.addEventListener("animationstart", onAnimationStart);

        return () => {
            document.removeEventListener("focusin", onFocus, );
            document.removeEventListener("focusout", onBlur);
            document.removeEventListener("animationstart", onAnimationStart);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            ref={blobRef}
            aria-hidden
            className="absolute pointer-events-none z-[9999] opacity-0"
            style={{
                boxShadow: "0 0 0 2px rgb(var(--primary-500))",
                transition: "opacity 150ms ease",
            }}
        />
    );
}