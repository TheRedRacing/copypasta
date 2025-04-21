import Link from "next/link";

export default function FAQ() {
    const FAQ = [
        {
            question: "Is my data collected and stored?",
            answer: "No. This is a static site, and no data is collected or stored on a server. All data remains in your browser's local storage.",
        },
        {
            question: "Can I access my data from another device?",
            answer: "No. Since data is stored locally in your browser, it is not synced across devices. If you clear your browser storage, your data will be lost.",
        },
        {
            question: "Is my data encrypted?",
            answer: "Data stored in your browser's local storage is not encrypted by default. If security is a concern, consider using a secure storage extension or clearing local storage periodically.",
        },
        {
            question: "Can I reset my data?",
            answer: "Yes. You can clear your browser's local storage, which will remove all data associated with this site. This action is irreversible.",
        },
        {
            question: "How can I support the project?",
            answer: "You can find all information on how to support the project on the contact page.",
        },
    ];

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
                        Frequently asked questions
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
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800 rounded-b-xl">
                <div className="px-12 py-8 col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800">
                    <div className="flex flex-col space-y-6">
                        {FAQ.map((faq) => (
                            <div key={faq.question} className="flex flex-col pb-6 border-b border-zinc-300 dark:border-zinc-800 last:border-b-0 last:pb-0">
                                <h1 className="text-xl font-semibold text-primary-500">{faq.question}</h1>
                                <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">{faq.answer}</p>
                            </div>
                        ))}
                        <div className="flex flex-col pb-6 border-b border-zinc-300 dark:border-zinc-800 last:border-b-0 last:pb-0">
                            <h1 className="text-xl font-semibold text-primary-500">
                                Do you have a question that is not listed here?
                            </h1>
                            <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">
                                You can find all information on how to support the project on the contact page. If you have any other questions, feel free to reach out to us.
                            </p>
                            <Link href="/contact" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                                Ask your question <span aria-hidden="true">&rarr;</span>
                            </Link>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
