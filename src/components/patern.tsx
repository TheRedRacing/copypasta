export default function Patern() {
    // svg grid pattern 16 columns x 16 columns with 1px stroke and rouded linear white gradient 
    return (
        <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
            <svg aria-hidden="true" className="absolute inset-x-0 inset-y-[-50%] h-[100%] w-full stroke-zinc-300">
                <defs>
                    <pattern id=":S1:" width="72" height="56" patternUnits="userSpaceOnUse" x="-12" y="4">
                        <path d="M.5 56V.5H72" fill="none"></path>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth="0" fill="url(#:S1:)"></rect>
            </svg>
            <svg viewBox="0 0 1113 440" aria-hidden="true" className="absolute inset-0 fill-white blur-[26px] dark:hidden">
                <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z"></path>
            </svg>
        </div>
    );
}