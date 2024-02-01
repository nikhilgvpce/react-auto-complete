import { useCallback, useRef } from "react";
import { Option } from "../SearchInput/SearchInput";

const fetchWrapper = async (searchString: string, ref: AbortController): Promise<Option[]> => {
    const url: string = "http://universities.hipolabs.com/search?name=";
    const results: Response = await fetch(url + `${searchString}`, { signal: ref?.signal });
    const options: Option[] = await results.json();
    return options;
}

const useFetch = (searchString: string, setResponse: Function, isLoading: boolean, setLoadingStatus: Function) => {
    const ref = useRef<AbortController>();
    let loading = isLoading;
    const fetchAPI = useCallback(async () => {
        try {
            if (ref && ref.current) {
                ref.current.abort();
                ref.current = undefined;
            }
            if (!searchString) {
                setResponse([]);
                if (loading) {
                    loading = false
                    setLoadingStatus(loading)
                }
                return;
            }
            ref.current = new AbortController();
            if (!loading) {
                loading = true;
                setLoadingStatus(loading)
            }
            const options: Option[] = await fetchWrapper(searchString, ref.current)
            setResponse(options.map(op => op.name));
            if (loading) {
                loading = false
                setLoadingStatus(loading)
            }
            ref.current = undefined;
        } catch (err) {
            console.log(err)
        }
    }, [searchString])
    return fetchAPI;
}

export default useFetch;