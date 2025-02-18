export default function Footer() {
    return (
        <footer className="mt-4 bg-white flex items-center justify-center border-t border-zinc-300 p-4 sm:px-10 lg:px-16">
            <p className="text-xs">&copy; {new Date().getFullYear()} Maxime Sickenberg.</p>
        </footer>
    );
}