import { BugAntIcon, ChatBubbleLeftRightIcon, GiftIcon } from "@heroicons/react/24/outline";
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
                        You can contact me for any questions, feedback, or support.
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
                                <p className="text-base/7 text-zinc-600 dark:text-zinc-400">
                                    If you have any questions or feedback, feel free to reach out to me directly via email or LinkedIn.
                                </p>
                                <div className="mt-2 flex flex-col text-sm/6 font-semibold">
                                    <Link href="mailto:info@copy-pasta.ch" className="text-primary-500 hover:underline">
                                        Email <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                    <Link href="https://www.linkedin.com/in/maxime-sickenberg/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                                        Linkedin <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-x-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                                <BugAntIcon aria-hidden="true" className="size-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base/7 font-semibold text-zinc-800 dark:text-zinc-200">Bug reports</h3>
                                <p className="text-base/7 text-zinc-600 dark:text-zinc-400">
                                    You can report any bugs or issues you encounter while using the site by opening an issue on GitHub.
                                </p>
                                <div className="mt-2 flex flex-col text-sm/6 font-semibold">
                                    <Link href="https://github.com/TheRedRacing/copypasta/issues" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                                        Report a bug <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-x-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                                <GiftIcon aria-hidden="true" className="size-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base/7 font-semibold text-zinc-800 dark:text-zinc-200">
                                    Support the project
                                </h3>
                                <p className="text-base/7 text-zinc-600 dark:text-zinc-400">
                                    If you find this project useful, you can support me by buying me a coffee or sponsoring the project on GitHub.
                                    <br />Your support helps keep this project going! 🚀
                                </p>
                                <div className="mt-2 flex flex-col text-sm/6 font-semibold">
                                    <Link href="https://github.com/TheRedRacing/copypasta" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                                        Github <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                    <Link href="https://buymeacoffee.com/theredracing" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                                        Buy Me a Coffee <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aspect-square"></div>
            </div>
        </div>
    );
}
