"use client";

import { useEffect, useRef } from "react";

export function FocusBlob() {
    const blobRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const blob = blobRef.current;
        if (!blob) return;

        const OFFSET = 4;
        const SELECTOR = "button, input, textarea, a[href], [tabindex]:not([tabindex='-1'])";

        const onFocus = (e: FocusEvent) => {
            const el = e.target as Element;

            if (el.tagName === "SELECT") return;
            if (!el.matches(SELECTOR)) return;

            const rect = el.getBoundingClientRect();
            if (rect.width <= 1 && rect.height <= 1) return;
            if (getComputedStyle(el).clip === "rect(0px, 0px, 0px, 0px)") return;

            const applyBlob = () => {
                const r = el.getBoundingClientRect();
                const isCombobox = el.getAttribute("role") === "combobox";
                const height = isCombobox ? (el as HTMLElement).offsetHeight : r.height;
                const br = parseFloat(getComputedStyle(el).borderRadius) + OFFSET;

                blob.style.transition = "none";
                blob.style.left = `${r.left - OFFSET}px`;
                blob.style.top = `${r.top - OFFSET}px`;
                blob.style.width = `${r.width + OFFSET * 2}px`;
                blob.style.height = `${height + OFFSET * 2}px`;
                blob.style.borderRadius = `${br}px`;

                void blob.offsetHeight;

                blob.style.transition = "opacity 150ms ease";
                blob.style.opacity = "1";
            };

            // cherche le parent dialog/modal en animation
            const dialogContent = el.closest('[role="dialog"]');
            if (dialogContent) {
                const onAnimEnd = () => {
                    applyBlob();
                    dialogContent.removeEventListener("animationend", onAnimEnd);
                };
                dialogContent.addEventListener("animationend", onAnimEnd);
            } else {
                applyBlob();
            }
        };

        const onBlur = (e: FocusEvent) => {
            const next = (e as FocusEvent & { relatedTarget: Element | null }).relatedTarget;
            if (!next || !next.matches(SELECTOR)) {
                blob.style.transition = "opacity 150ms ease";
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

    return <div ref={blobRef} aria-hidden className="fixed pointer-events-none z-[9999] opacity-0" style={{ boxShadow: "0 0 0 2px rgb(var(--primary-500))" }} />;
}
