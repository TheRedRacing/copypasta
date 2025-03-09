import { SmallFooter } from "@/components/footer";
import { SmallHeader } from "@/components/header";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

export default async function AppLayout({ children }: LayoutProps) {
    return (
        <>
            <SmallHeader />
            <main className="flex-1 flex flex-col mt-14">
                <div className="flex-1 flex flex-col items-center mx-auto w-full max-w-6xl px-6 xl:px-0">
                    {children}
                </div>
            </main>
            <SmallFooter />
        </>
    );
}