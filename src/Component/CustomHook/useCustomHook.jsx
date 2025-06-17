import { useEffect, useState } from "react";
import { toast ,  ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useCustomHook = (url) => {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch data");
                const json = await response.json();
                if (isMounted) setData(json);
            } catch (err) {
                console.error(err);
                if (isMounted) {
                    setError(true);
                    toast.error("Failed to load data. Please try again.");
                }
            } finally {
                if (isMounted) setLoader(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);
    

    return { data, loader, error };
};


export default useCustomHook
