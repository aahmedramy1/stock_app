import {useCallback, useEffect} from "react";

const useInfiniteScroll = (onBottomReach: () => void, shouldFetch: boolean) => {
    const handleScroll = useCallback(() => {
        const isBottom =
            document.body.scrollHeight - 300 < window.scrollY + window.innerHeight;
        if (isBottom && shouldFetch) {
            onBottomReach();
        }
    }, [onBottomReach, shouldFetch]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);
};

export default useInfiniteScroll;