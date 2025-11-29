import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useDebounce(value, delay = 500) {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};


// it's for readOnly and detect 
const isMounted = (...args) => {

    let ismounted = false;

    const handleLoad = () => {
        if (args) console.info(this.args);;
    };

    useEffect(() => {
        ismounted = true
        if (this.ismounted) {
            window.addEventListener('load', handleLoad);
        };

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, [this.args]);
};


// let component use this function to detect and based on that change ui
function detectDevice(...component) {

    if (typeof component !== "function") {
        throw new Error('it must be functional component to detect devices')
    };

    return component;
};


const useIsMobile = (breakpoint = 768) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isMobile;
};


/**
 * @description
 * use navigate for only when ai suggestions are neeeded and redirecting to ai page from x page
*/

const customNavigate = (path) => {
    const navigate = useNavigate();

    return navigate(path, { state: path })
};


export { useDebounce, isMounted, detectDevice, useIsMobile, customNavigate };