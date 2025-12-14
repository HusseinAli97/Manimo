import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import DetailsPage from "./Pages/details.jsx";
import HomePage from "./Pages/home.jsx";
import NotFoundPage from "./Pages/not-found.jsx";
const API_URL = import.meta.env.VITE_API_BASE;

const App = () => {
    const [manga, setManga] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refetch, setRefetch] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchMode, setSearchMode] = useState(false);
    const timerID = useRef(null);
    const hadSearchRef = useRef(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalItems, setTotalItems] = useState(null);
    const [lastPage, setLastPage] = useState(null);
    const [hasNext, setHasNext] = useState(null);
    const [isHome, setIsHome] = useState(true);
    // Main Page
    useEffect(() => {
        const controller = new AbortController();
        const getManga = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `${API_URL}/manga?order_by=mal_id&page=${page}&limit=${limit}`,
                    {
                        signal: controller.signal,
                    }
                );
                if (!res.ok) throw new Error("Failed To Fetch Manga");
                const data = await res.json();
                setManga(data?.data ?? []);
                setTotalItems(data.pagination.items.total);
                setLastPage(data.pagination.last_visible_page);
                setHasNext(data.pagination.has_next_page);
            } catch (err) {
                if (err.name === "AbortError") return;
                setError(err.message);
            } finally {
                // eslint-disable-next-line no-unsafe-finally
                if (controller.signal.aborted) return;
                setLoading(false);
            }
        };
        getManga();
        return () => controller.abort();
    }, [refetch, limit, page]);

    // search
    useEffect(() => {
        // controller for stop fetching
        const controller = new AbortController();

        const trimmed = searchQuery.trim();
        if (trimmed.length >= 2) {
            hadSearchRef.current = true;
        }

        // this mean the user using search and del it
        if (hadSearchRef.current && trimmed.length === 0) {
            setSearchMode(false);
            // when input empty back to fetching prev effect
            setRefetch((prev) => prev + 1);
            hadSearchRef.current = false;
            // clear if any fetching happen
            return () => {
                controller.abort();
            };
        }

        // check if any timer still running after rerender
        if (trimmed.length < 2) {
            if (timerID.current) {
                clearTimeout(timerID.current);
                timerID.current = null;
            }
            setSearchMode(false);
            return () => {
                controller.abort();
            };
        }
        // if query more then 2 or more char
        setLoading(true);
        setError(null);
        setSearchMode(true);
        if (timerID.current) {
            clearTimeout(timerID.current);
            timerID.current = null;
        }

        timerID.current = setTimeout(() => {
            const getSearch = async () => {
                try {
                    const res = await fetch(
                        `${API_URL}/manga?q=${trimmed}&page=${page}&limit=${limit}`,
                        {
                            signal: controller.signal,
                        }
                    );
                    if (!res.ok)
                        throw new Error("Failed To Fetch Manga");
                    const data = await res.json();
                    // if we canceled fetch don't set any data if u got data before we canceled
                    if (controller.signal.aborted) return;
                    setSearchResult(data.data);
                    setTotalItems(data.pagination.items.total);
                    setLastPage(data.pagination.last_visible_page);

                    setHasNext(data.pagination.has_next_page);
                } catch (err) {
                    if (controller.signal.aborted) return;
                    setError(err.message);
                } finally {
                    // eslint-disable-next-line no-unsafe-finally
                    if (controller.signal.aborted) return;
                    setLoading(false);
                }
            };
            getSearch();
        }, 500);
        return () => {
            if (timerID.current) {
                clearTimeout(timerID.current);
                timerID.current = null;
            }
            controller.abort();
        };
    }, [searchQuery, limit, page]);

    const mangaItems = searchMode ? searchResult : manga;

    return (
        <>
            <Header
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                setLimit={setLimit}
                limit={limit}
                setPage={setPage}
                isHome={isHome}
                setIsHome={setIsHome}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            manga={mangaItems}
                            setRefetch={setRefetch}
                            error={error}
                            loading={loading}
                            page={page}
                            setPage={setPage}
                            totalItems={totalItems}
                            limit={limit}
                            has_next_page={hasNext}
                            lastPage={lastPage}
                            setIsHome={setIsHome}
                        />
                    }
                />
                <Route
                    path="/manga/:id"
                    element={<DetailsPage setIsHome={setIsHome} />}
                />
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
