import { Link } from "react-router";
import logo from "../assets/main.png";
import LimitSelector from "./LimitSelector";
const Header = ({
    setSearchQuery,
    searchQuery,
    setLimit,
    limit,
    setPage,
    isHome,
    setIsHome
}) => {
    return (
        <header>
            <nav className="bg-gray-700">
                <div className="container mx-auto py-4 flex justify-between items-center">
                    <div className="flex">
                        <img
                            src={logo}
                            className="h-12  "
                            alt="logo"
                        />
                    </div>

                    <div className="flex space-x-10">
                        <Link
                            to="/"
                            onClick={() => {
                                setSearchQuery("");
                                setPage(1);
                                setIsHome(true)
                            }}
                            className="flex items-center space-x-1">
                            <span className="mt-1 text-blue-600">
                                ｡𖦹°‧
                            </span>
                            <span className="text-gray-50">
                                All Manga
                            </span>
                        </Link>
                    </div>
                    <div className="text-white">
                        <input
                            className="w-md bg-gray-400 p-2 rounded-lg text-white placeholder:text-white  focus:outline-0"
                            type="text"
                            placeholder="Search on Manga"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                        />
                    </div>
                    {isHome && (
                        <div className="flex justify-center items-center gap-1">
                            <LimitSelector
                                limit={limit}
                                setLimit={setLimit}
                            />
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
