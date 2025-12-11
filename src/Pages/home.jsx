import CardContainer from "../Components/CardContainer";
import MangaCard from "../Components/MangaCard";
import Spinner from "../Components/Spinner";
const HomePage = ({ loading, error, setRefetch, manga }) => {
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
                        }
                        >
                        ⟳ Try Get Data Again
                    </button>
                </div>
            )}
            {!loading && !error && manga.length === 0 && (
                <p>No Manga Founded</p>
            )}
            {!loading && !error && (
                <CardContainer>
                    {manga.map((item) => (
                        <MangaCard
                            key={item.mal_id}
                            manga={item}
                        />
                    ))}
                </CardContainer>
            )}
        </>
    );
};

export default HomePage;
