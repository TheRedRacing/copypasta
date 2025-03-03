import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Help() {
    return (
        <main className="flex-1 p-4 mt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:py-16">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                        Frequently asked questions
                    </h2>
                    <dl className="mt-6 divide-y divide-zinc-900/10">
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
                                    You can also buy me a coffee at <a href="https://buymeacoffee.com/theredracing" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">Buy Me a Coffee</a>.
                                    <br/>Your support helps keep this project going! 🚀
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </dl>
                </div>
            </div>
        </main>
    );
}
