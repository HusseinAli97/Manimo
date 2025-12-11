import { useState } from "react";
import { Link } from "react-router";

const MangaCard = ({ manga }) => {
    const [infoVisible, setInfoVisible] = useState(false);
    if (!manga) return;
    const {
        images,
        title,
        type,
        score,
        synopsis,
        genres,
        publishing,
    } = manga;
    return (
        <div className="relative my-3  ">
            {/* CARD */}
            <div className="relative overflow-hidden rounded-lg shadow-xl hover:scale-105   duration-300 bg-black">
                <img
                    src={
                        images.jpg.large_image_url && manga.images
                            ? images?.jpg?.large_image_url
                            : "../assets/main.png"
                    }
                    loading="lazy"
                    alt={`${title} Cover`}
                    className={` aspect-2/3   object-cover w-full transition-all duration-300  `}
                />

                <div className="absolute inset-0 z-30">
                    <div className="absolute w-70 sm:w-70 md:w-50 lg:w-60 xl:w-50 2xl:w-85 top-4 left-4 z-40 flex justify-between items-center">
                        <button
                            aria-label="Show info"
                            onClick={() =>
                                setInfoVisible((prev) => !prev)
                            }
                            className="h-12 w-12 grid place-items-center rounded-full cursor-pointer bg-linear-to-r from-sky-500/60 to-violet-400/60 focus:ring-1 focus:ring-sky-500 bg-gray-800 shadow-md transition-all duration-300 ">
                            <span className="text-2xl">👀</span>
                        </button>
                        <p className="text-gray-700 font-bold border border-transparent py-1 px-2 rounded shadow-2xl bg-linear-to-r from-sky-500/70 to-violet-400/70  ">
                            ⭐️ {manga.score && score && score}
                        </p>
                    </div>

                    <div
                        className={`absolute inset-0 z-35 flex items-center justify-center  transition-all duration-300 ${
                            infoVisible
                                ? " translate-y-0 pointer-events-auto "
                                : " translate-y-full pointer-events-none"
                        }`}>
                        <div className="w-full h-full rounded-lg bg-linear-to-r from-sky-500/40 to-violet-400/40 backdrop-blur-sm p-6 flex flex-col justify-center items-center ">
                            <h3
                                className="text-2xl font-bold text-white mb-3"
                                aria-label={title}>
                                {title}
                            </h3>

                            <p
                                className="text-white/90 md:text-md   "
                                area-label={synopsis}>
                                {manga.synopsis && synopsis
                                    ? synopsis.split(". ")[0].length >
                                      100
                                        ? synopsis
                                              .split(". ")[0]
                                              .slice(0, 100)
                                        : synopsis.split(". ")[0]
                                    : ""}
                            </p>
                            <Link
                                to={`/manga/${manga.mal_id}`}
                                aria-label={`View Details of ${title}`}
                                className="inline-block mt-4 text-white underline text-lg font-semibold">
                                Details →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* TITLE AT BOTTOM */}
                <div className="absolute  bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center  justify-between">
                        <h2 className="text-xl font-bold mb-1 text-white  text-shadow-lg text-shadow-gray-950">
                            {title}
                        </h2>
                        <h3 className="font-semibold text-yellow-400 text-2xl">
                            {publishing ? "ᯓ🏃🏻‍♀️‍➡️" : "✅️"}
                        </h3>
                    </div>

                    <div className="">
                        <span className="mr-1 text-xs border text-violet-300 rounded-sm px-1 bg-gray-900/20 shadow-lg">
                            {type}
                        </span>
                        {manga.genres &&
                            genres &&
                            Array.isArray(genres) &&
                            genres.map((genre) => (
                                <span
                                    key={genre.mal_id}
                                    className="mr-1 text-xs border text-violet-300 rounded-sm px-1 bg-gray-900/20 shadow-lg">
                                    {genre.name}
                                </span>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MangaCard;
