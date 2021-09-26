import { useEffect, useRef } from "react";

export const useComponentDidMount = () => {
    const didComponentMount = useRef(true);

    useEffect(() => {
        didComponentMount.current = false;
    }, []);

    return didComponentMount.current;
}