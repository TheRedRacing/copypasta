'use client';

import { BugAntIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Debug() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"outline"} size="i8">
                    <BugAntIcon className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[800px]">
                <SheetHeader>
                    <SheetTitle>Debug Information</SheetTitle>
                    <SheetDescription>View debug information about the current session.</SheetDescription>
                </SheetHeader>
                <div className="mt-4 flex flex-col rounded-md overflow-hidden border border-zinc-200">
                    <div className="bg-zinc-100 p-4 font-bold">Current Session</div>
                    <pre className="whitespace-pre-wrap break-all rounded-b-lg bg-zinc-50 px-4 py-6">{JSON.stringify("", null, 2)}</pre>
                </div>
            </SheetContent>
        </Sheet>
    );
}