import axios from "axios";
import { portinstance } from "axiosinstance/portinstance";
import { useEffect, useState } from "react";

// hook to fetch data with axios
function useFetch(url) {
    const [data, setData] = useState(null);
    const [iserror, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await portinstance(url);
                setData(response);
            } catch (error) {
                if (error?.response) {
                    setError(error.response.data);
                }
            }
        };

        fetchData();
    }, [url]);

    return { data, iserror };
};

export default useFetch;