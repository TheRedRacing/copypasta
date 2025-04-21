import Link from "next/link";

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
                    <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">LEGAL INFORMATION</h2>
                </div>
                <div className=""></div>
            </div>
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800">
                <div className="aspect-square"></div>
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800 flex items-center justify-center">
                    <p className="text-zinc-600 dark:text-zinc-400">Last updated March 09, 2025</p>
                </div>
                <div className="aspect-square"></div>
            </div>
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800 rounded-b-xl">
                <div className="px-12 py-8 col-start-1 col-end-9 row-start-1 row-end-1 border-r border-zinc-300 dark:border-zinc-800">
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-semibold text-primary-500">1. Introduction</h1>
                            <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">This Privacy Notice for CopyPasta (&apos;we&apos;, &apos;us&apos;, or &apos;our&apos;), describes how and why we might access, collect, store, use, and/or share (&apos;process&apos;) your personal information when you use our services (&apos;Services&apos;), including when you:</p>
                            <ul role="list" className="mt-1 text-sm list-disc marker:text-primary-500 space-y-1">
                                <li className="ml-4">
                                    Visit our website at{" "}
                                    <Link className="text-primary-500 hover:underline" href={"https://www.copy-pasta.ch/"}>
                                        www.copy-pasta.ch
                                    </Link>
                                    , or any website of ours that links to this Privacy Notice
                                </li>
                                <li className="ml-4">Use CopyPasta. Copy-pasta.ch is a web-based tool designed to streamline the process of copying and pasting text. It offers users a simple interface to manage and manipulate text snippets efficiently.</li>
                                <li className="ml-4">Engage with us in other related ways, including any sales, marketing, or events</li>
                            </ul>
                            <p className="mt-2 text-primary-500">Questions or concerns?</p>
                            <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">
                                Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at{" "}
                                <Link className="text-primary-500 hover:underline" href={"mailto:info@copy-pasta.ch"}>
                                    info@copy-pasta.ch
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}
