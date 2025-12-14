import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Spinner from "../Components/Spinner";
import fallBackImage from "../assets/notFound.jpg";
const API_URL = import.meta.env.VITE_API_MANGA_URL;

const DetailsPage = ({setIsHome}) => {
    const { id } = useParams();
    const [manga, setManga] = useState({});
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(null);
    const [refetch, setRefetch] = useState(0);
    const [showMore, setShowMore] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        const getDetails = async () => {
            setIsHome(false)
            try {
                const res = await fetch(`${API_URL}/${id}`, {
                    signal: controller.signal,
                });
                if (!res.ok)
                    throw new Error("Failed When Try Fetch Data");
                const data = await res.json();
                if (controller.signal.aborted) return;
                if (!data.data) setNotFound(true);
                setManga(data?.data);
                if (!controller.signal.aborted) {
                    document.title = `Manimo - ${data.data.title}`;
                }
            } catch (err) {
                if (controller.signal.aborted) return;

                setError(err.message);
            } finally {
                
                // eslint-disable-next-line no-unsafe-finally
                if (controller.signal.aborted) return;
                setLoading(false);
            }
        };
        getDetails();
        return () => {
            controller.abort();
            document.title = "Manimo";
        };
    }, [id, refetch]);

    const synopsisPreview = (text) => {
        if (!text) return "No synopsis available.";

        if (text.includes(". ")) {
            return text.split(". ")[0] + ".";
        }
        return text.length > 180 ? text.slice(0, 180) + "..." : text;
    };

    return (
        <>
            {loading && <Spinner />}
            {error && (
                <div className="w-full  mt-10 flex justify-center items-center flex-col ">
                    <p className="text-white mb-4">{error}</p>
                    <button
                        className="text-blue-600 hover:text-blue-700 cursor-pointer duration-200"
                        onClick={() =>
                            setRefetch((prev) => prev + 1)
                        }>
                        ⟳ Try Get Data Again
                    </button>
                </div>
            )}
            {notFound && (
                <section className="mt-8 w-full flex justify-center items-center">
                    <div className="max-w-3xl w-full rounded-2xl bg-white dark:bg-slate-800 shadow-lg p-8 text-center">
                        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                            Manga Not Found
                        </h1>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            The API returned a 404 or no data for this
                            title.
                        </p>
                        <div className="mt-6 flex justify-center gap-3">
                            <button
                                onClick={() => {
                                    history.length <= 1
                                        ? navigate("/")
                                        : navigate(-1);
                                }}
                                className="px-4 py-2 rounded-md cursor-pointer bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100">
                                Go back
                            </button>
                            <Link
                                to="/"
                                className="px-4 py-2 rounded-md bg-indigo-600 text-white">
                                Go home
                            </Link>
                        </div>
                    </div>
                </section>
            )}
            {!loading && !error && (
                <div className="min-h-screen p-6  bg-slate-900 text-gray-800  ">
                    <div className="max-w-6xl mx-auto  ">
                        {/* Back / Breadcrumbs (design-only) */}
                        <div className="mb-6 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                            <button
                                onClick={() => {
                                    window.history.length < 1
                                        ? navigate("/")
                                        : navigate(-1);
                                }}
                                className="px-2 py-1 cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-slate-700">
                                ← Back
                            </button>
                            <nav className="flex items-center gap-2">
                                <Link
                                    to="/"
                                    className="opacity-70 cursor-pointer">
                                    Home
                                </Link>
                                <span className="opacity-50">/</span>
                                <span className="font-medium">
                                    {manga.title
                                        ? manga.title
                                        : "Not Found"}
                                </span>
                            </nav>
                        </div>

                        {/* Card */}
                        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Cover */}
                            <div className=" sm:col-span-4 md:col-span-2 lg:col-span-1  flex items-start">
                                <div className="w-full  rounded-xl overflow-hidden shadow-md bg-gray-200 dark:bg-slate-800 h-96">
                                    <img
                                        src={
                                            manga?.images?.jpg
                                                ?.large_image_url ??
                                            fallBackImage
                                        }
                                        loading="lazy"
                                        alt={`Photo For ${manga.title}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4 md:col-span-2 lg:col-span-3 ">
                                <article className="  dark:text-gray-200">
                                    <h3 className="text-lg font-semibold mb-5">
                                        BackGround
                                    </h3>
                                    <p className="leading-9">
                                        {manga.background}
                                    </p>
                                </article>
                            </div>
                            {/* Content */}
                            <div className="col-span-4 flex flex-col gap-4">
                                {/* Header: title + badges + stats */}
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div>
                                        <span className="text-xs px-3 mr-2 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200">
                                            {manga.type}
                                        </span>
                                        <span
                                            className={`text-xs px-3  py-1 rounded-full font-semibold bg-slate-800  ${manga.status ===
                                                "Finished"
                                                ? "text-green-600"
                                                : "text-orange-400"
                                                }`}>
                                            {manga.status}
                                        </span>
                                        <h1 className="text-2xl md:text-3xl mt-3 font-bold text-gray-900 dark:text-gray-100">
                                            {manga.title}
                                        </h1>
                                        <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                                            Alternative Title
                                            {manga?.titles.map(
                                                (title, i) => (
                                                    <p key={i}>
                                                        {` ${title.type} : ${title.title} `}
                                                    </p>
                                                )
                                            )}
                                        </div>

                                        {/* Genres badges */}
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {manga?.demographics?.map(
                                                (demographic) => (
                                                    <span
                                                        key={
                                                            demographic.mal_id
                                                        }
                                                        className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200">
                                                        {
                                                            demographic.name
                                                        }
                                                    </span>
                                                )
                                            )}
                                            {manga?.genres?.map(
                                                (genre) => (
                                                    <span
                                                        key={
                                                            genre.mal_id
                                                        }
                                                        className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200">
                                                        {genre.name}
                                                    </span>
                                                )
                                            )}
                                            {manga?.themes?.map(
                                                (theme) => (
                                                    <span
                                                        key={
                                                            theme.mal_id
                                                        }
                                                        className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200">
                                                        {theme.name}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Stats block (visual-only) */}
                                    <div className="flex gap-3 items-center">
                                        {manga?.chapters && (
                                            <>
                                                <div className="text-center">
                                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                                        Chapters
                                                    </div>
                                                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                        {
                                                            manga?.chapters
                                                        }
                                                    </div>
                                                </div>
                                                <div className="w-px h-8 bg-gray-200 dark:bg-slate-700 mx-2"></div>
                                            </>
                                        )}
                                        <div className="text-center">
                                            <div className="text-sm text-gray-500 dark:text-gray-300">
                                                Score
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                {manga?.score ??
                                                    "N/A"}
                                            </div>
                                        </div>
                                        <div className="w-px h-8 bg-gray-200 dark:bg-slate-700 mx-2"></div>
                                        <div className="text-center">
                                            <div className="text-sm text-gray-500 dark:text-gray-300">
                                                Rank
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                #
                                                {manga?.rank ?? "N/A"}
                                            </div>
                                        </div>
                                        <div className="w-px h-8 bg-gray-200 dark:bg-slate-700 mx-2"></div>
                                        <div className="text-center">
                                            <div className="text-sm text-gray-500 dark:text-gray-300">
                                                Popularity
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                {manga?.members ??
                                                    "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Synopsis */}
                                <article className="prose prose-sm max-w-none dark:prose-invert text-gray-700 dark:text-gray-200">
                                    <h3 className="text-lg font-semibold">
                                        Synopsis
                                    </h3>
                                    <p className="leading-relaxed">
                                        {showMore ? manga?.synopsis ?? "No synopsis available." : synopsisPreview(manga?.synopsis)}

                                    </p>

                                    {/* Show more design (non-functional) */}
                                    {!!manga?.synopsis && manga.synopsis.length > 180 && (
                                        <div className="mt-2">
                                            <button
                                                onClick={() => setShowMore((p) => !p)}
                                                className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline cursor-pointer"
                                                aria-expanded={showMore}
                                            >
                                                {showMore ? "Show less" : "Show more"}
                                            </button>
                                        </div>
                                    )}
                                </article>

                                {/* Grid: Creator/Studio & Dates/Links */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                    {/* Creator/Studio */}
                                    <div className="rounded-lg border border-gray-100 dark:border-slate-700 p-4">
                                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                            Creator / Studio
                                        </h4>
                                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                            <p>
                                                <span className="font-medium">
                                                    Author:
                                                </span>{" "}
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrance"
                                                    href={
                                                        manga
                                                            ?.authors[0]
                                                            ?.url ??
                                                        "N/A"
                                                    }
                                                    className="hover:text-gray-400 duration-200">
                                                    {manga?.authors[0]
                                                        ?.name ??
                                                        "N/A"}
                                                </a>
                                            </p>
                                            <p className="mt-1">
                                                <span className="font-medium">
                                                    Publisher :
                                                </span>{" "}
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrance"
                                                    href={
                                                        manga
                                                            ?.serializations[0]
                                                            ?.url ??
                                                        "N/A"
                                                    }
                                                    className="hover:text-gray-400 duration-200">
                                                    {manga
                                                        ?.serializations[0]
                                                        ?.name ??
                                                        "N/A"}
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Dates & Links */}
                                    <div className="rounded-lg border border-gray-100 dark:border-slate-700 p-4 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                                Dates & Links
                                            </h4>
                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                                <span className="font-medium">
                                                    From:
                                                </span>{" "}
                                                {new Date(
                                                    manga?.published
                                                        ?.from ??
                                                    "N/A"
                                                ).toLocaleDateString()}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                <span className="font-medium">
                                                    To:
                                                </span>{" "}
                                                {new Date(
                                                    manga?.published
                                                        ?.to ?? "N/A"
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrance"
                                                href={
                                                    manga?.url ??
                                                    "N/A"
                                                }
                                                className="flex-1 text-sm text-center px-3 py-2 rounded-md bg-indigo-600 text-white">
                                                View On MAL
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </section>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailsPage;
