const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 py-10  relative bottom-0">
            <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Logo / Brand */}
                <h3 className="text-lg font-semibold tracking-wide">
                    Manimo
                </h3>

                {/* Links */}
                <div className="flex gap-6 text-sm">
                    <a
                        href="#"
                        className="hover:text-white transition">
                        Home
                    </a>
                    <a
                        href="#"
                        className="hover:text-white transition">
                        Anime
                    </a>
                    <a
                        href="#"
                        className="hover:text-white transition">
                        Manga
                    </a>
                    <a
                        href="#"
                        className="hover:text-white transition">
                        Contact
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-xs text-gray-400">
                    © {new Date().getFullYear()} Manimo. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
