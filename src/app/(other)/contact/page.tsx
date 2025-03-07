import { BugAntIcon, ChatBubbleLeftRightIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Contact() {
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
                        Contact me
                    </h2>
                </div>
                <div className=""></div>
            </div>
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800">
                <div className="aspect-square"></div>
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800 flex items-center justify-center">
                    <p className="text-zinc-600 dark:text-zinc-400">
                        If you have any questions or feedback, feel free to reach out to me. 
                    </p>
                </div>
                <div className="aspect-square"></div>
            </div>
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800 rounded-b-xl">
                <div className="aspect-square"></div>
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800">
                    <div className="p-10 space-y-12">
                        <div className="flex gap-x-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                                <ChatBubbleLeftRightIcon aria-hidden="true" className="size-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base/7 font-semibold text-zinc-800 dark:text-zinc-200">
                                    Send me a message
                                </h3>
                                <p className="mt-2 text-base/7 text-zinc-600 dark:text-zinc-400">

                                </p>
                                <p className="mt-4 text-sm/6 font-semibold">
                                    <Link href="#" className="text-primary-600">
                                        Contact us <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                                <BugAntIcon aria-hidden="true" className="size-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base/7 font-semibold text-zinc-800 dark:text-zinc-200">Bug reports</h3>
                                <p className="mt-2 text-base/7 text-zinc-600 dark:text-zinc-400">
                                    You can report any bugs or issues you encounter while using the site.
                                </p>
                                <p className="mt-4 text-sm/6 font-semibold">
                                    <Link href="" className="text-primary-600">
                                        Report a bug <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                                <ComputerDesktopIcon aria-hidden="true" className="size-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base/7 font-semibold text-zinc-800 dark:text-zinc-200">Technical support</h3>
                                <p className="mt-2 text-base/7 text-zinc-600 dark:text-zinc-400">
                                    Sint aut modi porro consequatur architecto commodi qui consequatur. Dignissimos adipisci minima.
                                </p>
                                <p className="mt-4 text-sm/6 font-semibold">
                                    <a href="#" className="text-primary-600">
                                        Join our Discord <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aspect-square"></div>
            </div>
        </div>
    );
}
