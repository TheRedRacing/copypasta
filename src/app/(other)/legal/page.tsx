import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Legal() {
    return (
        <div className="w-full flex-1 flex flex-col py-24 -space-y-px">
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800 rounded-t-xl">
                <div className="aspect-square"></div>
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800"></div>
                <div className="aspect-square"></div>
            </div>
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800">
                <div className=""></div>
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800 py-10">
                    <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">
                        Legal Information
                    </h2>                    
                </div>
                <div className=""></div>
            </div>
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800">
                <div className="aspect-square"></div>
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800 flex items-center justify-center">
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Last Updated March 03, 2025
                    </p>
                </div>
                <div className="aspect-square"></div>
            </div>
            <div className="w-full border border-zinc-300 dark:border-zinc-800 rounded-b-xl">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            Is my data collected and stored?
                        </AccordionTrigger>
                        <AccordionContent>
                            No. This is a static site, and no data is collected or stored on a server. All data remains in your browser&apos;s local storage.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            Can I access my data from another device?
                        </AccordionTrigger>
                        <AccordionContent>
                            No. Since data is stored locally in your browser, it is not synced across devices. If you clear your browser storage, your data will be lost.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            Is my data encrypted?
                        </AccordionTrigger>
                        <AccordionContent>
                            Data stored in your browser&apos;s local storage is not encrypted by default. If security is a concern, consider using a secure storage extension or clearing local storage periodically.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                        <AccordionTrigger>
                            Can I reset my data?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes. You can clear your browser&apos;s local storage or use the reset option in the settings to remove all saved data.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                        <AccordionTrigger>
                            How can I support the project?
                        </AccordionTrigger>
                        <AccordionContent>
                            If you find this project useful, you can support me by giving a ⭐ on <a href="https://github.com/theredracing" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">GitHub</a>.
                            You can also buy me a coffee on <a href="https://buymeacoffee.com/theredracing" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">Buy Me a Coffee</a>.
                            <br />Your support helps keep this project going! 🚀
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
