import { useEffect, useState } from "react";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import HomePage from "./Pages/home.jsx";
import "./Styles/globals.css";
const API_URL = import.meta.env.VITE_API_BASE;

const App = () => {
    const [manga, setManga] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refetch, setRefetch] = useState(0);

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
                setManga(data?.data??[]);
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
    return (
        <>
            <Header />
            <HomePage
                manga={manga}
                setRefetch={setRefetch}
                error={error}
                loading={loading}
            />
            <Footer />
        </>
    );
};

export default App;
