"use client";

import { useEffect, useRef } from "react";


export function FocusBlob() {
    const blobRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const blob = blobRef.current;
        if (!blob) return;
        const OFFSET = 4;

        const moveTo = (el: Element) => {
            const r = el.getBoundingClientRect();
            const br = parseFloat(getComputedStyle(el).borderRadius);
            blob.style.left = `${r.left - OFFSET}px`;
            blob.style.top = `${r.top - OFFSET}px`;
            blob.style.width = `${r.width + OFFSET * 2}px`;
            blob.style.height = `${r.height + OFFSET * 2}px`;
            blob.style.borderRadius = `${br + OFFSET}px`;
            blob.style.opacity = "1";
        };

        const SELECTOR = "button, input, textarea, select, a[href], [tabindex]:not([tabindex='-1'])";

        const onFocus = (e: FocusEvent) => {
            const el = e.target as Element;
            if (el.matches(SELECTOR)) moveTo(el);
        };
        const onBlur = (e: FocusEvent) => {
            const next = (e as any).relatedTarget as Element | null;
            if (!next || !next.matches(SELECTOR)) {
                blob.style.opacity = "0";
            }
        };

        document.addEventListener("focusin", onFocus);
        document.addEventListener("focusout", onBlur);
        return () => {
            document.removeEventListener("focusin", onFocus);
            document.removeEventListener("focusout", onBlur);
        };
    }, []);

    return (
        <div
            ref={blobRef}
            aria-hidden
            className="fixed pointer-events-none z-[9999] opacity-0"
            style={{
                boxShadow: "0 0 0 2px rgb(var(--primary-500))",
                transition: ["left 200ms cubic-bezier(0.34,1.2,0.64,1)", "top 200ms cubic-bezier(0.34,1.2,0.64,1)", "width 200ms cubic-bezier(0.34,1.2,0.64,1)", "height 200ms cubic-bezier(0.34,1.2,0.64,1)", "border-radius 200ms cubic-bezier(0.34,1.2,0.64,1)", "opacity 150ms ease"].join(", "),
            }}
        />
    );
}
