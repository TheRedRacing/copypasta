import changelog from "@/changelog.json";

export default function Changelog() {

    const lastUpdate = changelog.changes[0]

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
                    <h2 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">Changelog {lastUpdate.version}</h2>
                </div>
                <div className=""></div>
            </div>
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800">
                <div className="aspect-square"></div>
                <div className="col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800 flex items-center justify-center">
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Last updated {new Date(lastUpdate.date).toLocaleString("default", { day: "2-digit" })} <span className="capitalize">{new Date(lastUpdate.date).toLocaleString("default", { month: "long" })}</span> {new Date(lastUpdate.date).toLocaleString("default", { year: "numeric" })}
                    </p>
                </div>
                <div className="aspect-square"></div>
            </div>
            <div className="grid grid-cols-12 grid-rows-1 border border-zinc-300 dark:border-zinc-800 rounded-b-xl">
                <div className="px-12 py-8 col-start-2 col-end-12 row-start-1 row-end-1 border-x border-zinc-300 dark:border-zinc-800">
                    <div className="flex flex-col space-y-6">
                        {changelog.changes.map((change) => (
                            <div key={change.version} className="flex flex-col pb-6 border-b border-zinc-300 dark:border-zinc-800 last:border-b-0 last:pb-0">
                                <div className="flex items-baseline gap-2">
                                    <h1 className="text-xl font-semibold text-primary-500">Version {change.version}</h1>
                                    <span className="text-xs text-zinc-600 dark:text-zinc-400">{change.date}</span>
                                </div>
                                {change.description && <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-line">{change.description}</p>}
                                {change.news.length > 0 && (
                                    <>
                                        <p className="mt-2 text-sm text-primary-500">News:</p>
                                        <ul role="list" className="mt-1 text-sm list-disc marker:text-primary-500 space-y-1">
                                            {change.news.map((n, index) => (
                                                <li key={index} className="ml-4 whitespace-pre-line">
                                                    {n}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {change.updates.length > 0 && (
                                    <>
                                        <p className="mt-2 text-sm text-primary-500">Updates:</p>
                                        <ul role="list" className="mt-1 text-sm list-disc marker:text-primary-500 space-y-1">
                                            {change.updates.map((n, index) => (
                                                <li key={index} className="ml-4 whitespace-pre-line">
                                                    {n}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {change.fixes.length > 0 && (
                                    <>
                                        <p className="mt-2 text-sm text-primary-500">Fixes:</p>
                                        <ul role="list" className="mt-1 text-sm list-disc marker:text-primary-500 space-y-1">
                                            {change.fixes.map((n, index) => (
                                                <li key={index} className="ml-4 whitespace-pre-line">
                                                    {n}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
