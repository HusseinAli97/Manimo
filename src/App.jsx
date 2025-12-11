import { useEffect, useRef, useState } from "react";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import HomePage from "./Pages/home.jsx";
import "./Styles/globals.css";
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
    const prevQueryRef = useRef("");
    // top
    useEffect(() => {
        const controller = new AbortController();
        const getManga = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `${API_URL}/manga?page=1&limit=20`,
                    {
                        signal: controller.signal,
                    }
                );
                if (!res.ok) throw new Error("Failed To Fetch Manga");
                const data = await res.json();
                setManga(data?.data ?? []);
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
    }, [refetch]);
    // search

    useEffect(() => {
        const controller = new AbortController();

        const trimmed = searchQuery.trim();
        const prevTrimmed = prevQueryRef.current;

        if (prevTrimmed.length >= 2 && trimmed.length === 0) {
            searchMode(false);
            setRefetch((prev) => prev + 1);
            prevQueryRef.current = trimmed;
            return () => {
                controller.abort();
            };
        }
        if (trimmed.length < 2) {
            if (timerID.current) {
                clearTimeout(timerID.current);
                timerID.current = null;
            }
            prevQueryRef.current = trimmed;
            setSearchMode(false);
            return () => {
                controller.abort();
            };
        }

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
                        `${API_URL}/manga?q=${searchQuery}&page=1&limit=15`,
                        {
                            signal: controller.signal,
                        }
                    );
                    if (!res.ok)
                        throw new Error("Failed To Fetch Manga");
                    const data = await res.json();
                    if (controller.signal.aborted) return;
                    setSearchResult(data.data);
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
        prevQueryRef.current = trimmed;
        return () => {
            if (timerID.current) {
                clearTimeout(timerID.current);
                timerID.current = null;
            }
            controller.abort();
        };
    }, [searchQuery]);

    const mangaItems = searchMode ? searchResult : manga;

    return (
        <>
            <Header
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
            />
            <HomePage
                manga={mangaItems}
                setRefetch={setRefetch}
                error={error}
                loading={loading}
            />
            <Footer />
        </>
    );
};

export default App;
