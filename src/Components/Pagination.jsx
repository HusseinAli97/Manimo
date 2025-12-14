import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaArrowLeft,
    FaArrowRight,
} from "react-icons/fa";
const Pagination = ({
    page,
    hasNext,
    setPage,
    totalItems,
    limit,
    lastPage,
}) => {
    return (
        <div className="flex items-center justify-between border-t bg-slate-700 border-white/10 px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-300">
                        Showed{" "}
                        <span className="font-medium">{Math.min(page * limit,totalItems) }</span>{" "}
                        of
                        <span className="font-medium">
                            {" "}
                            {totalItems}
                        </span>{" "}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        aria-label="Pagination"
                        className=" border-white/10 border-2 px-3 py-1 inline-flex -space-x-px rounded-md ">
                        {/* back */}
                        <button
                            onClick={() => setPage(1)}
                            title="FirstPage"
                            className="relative rounded-l-md  mr-2 p-2 text-gray-200 hover:bg-white/5 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent duration-300 ">
                            <FaAngleDoubleLeft
                                aria-hidden="true"
                                className="size-4"
                            />
                        </button>
                        {page === 1 ? (
                            <button
                                className="relative rounded-l-md  mr-2 p-2 hover:bg-white/5 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-transparent duration-300 "
                                disabled>
                                <FaArrowLeft
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </button>
                        ) : (
                            <button
                                onClick={() => setPage((p) => p - 1)}
                                className="relative rounded-l-md  mr-2 p-2 text-gray-200 hover:bg-white/5 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent duration-300 ">
                                <FaArrowLeft
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </button>
                        )}
                        {/* pages */}
                        <button
                            aria-current="page"
                            className=" hover:bg-slate-900  rounded-md px-4 py-2 text-sm font-semibold text-white duration-300 cursor-pointer ">
                            {page}
                        </button>
                        <span className=" px-4 py-2 text-sm font-semibold text-gray-400 ">
                            /
                        </span>
                        <button
                            aria-current="page"
                            className=" hover:bg-slate-900  rounded-md px-4 py-2 text-sm font-semibold text-white duration-300 cursor-pointer ">
                            {lastPage}
                        </button>{" "}
                        {/* next */}
                        {hasNext ? (
                            <button
                                onClick={() => setPage((p) => p + 1)}
                                className="relative rounded-r-md ml-2 p-2 text-gray-200 duration-300 hover:bg-white/5 cursor-pointer  ">
                                <FaArrowRight
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </button>
                        ) : (
                            <button
                                className="relative rounded-r-md ml-2 p-2 text-gray-200 duration-300 hover:bg-white/5 cursor-not-allowed  disabled:text-gray-500 disabled:hover:bg-transparent "
                                disabled>
                                <FaArrowRight
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </button>
                        )}

                        <button
                            onClick={() => setPage(lastPage)}
                            title="LastPage"
                            className="relative rounded-l-md  mr-2 p-2 text-gray-200 hover:bg-white/5 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent duration-300 ">
                            <FaAngleDoubleRight
                                aria-hidden="true"
                                className="size-4"
                            />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
