import { ChangeEvent, useState } from "react";
import Input from "../UIComponents/Input/Input";
import "./SearchInput.css";
import { getMatchedOption } from "../utils/util";
import useDebounce from "../hooks/useDebounce";
import Loader from "../Loader/Loader";
import useFetch from "../hooks/useFetch";
import { NO_RESULTS_FOUND } from "../constants";

export interface Option {
    name: string,
    code: string
}

const SearchInput = () => {

    const [searchString, setSearchString] = useState<string>('');
    const [response, setResponse] = useState<string[]>(['']);
    const [isLoading, setLoadingStatus] = useState<boolean>(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const search: string = event.target.value;
        setSearchString(search);
        debounceAPIRequest();
    }

    const fetchAPI = useFetch(searchString, setResponse, isLoading, setLoadingStatus)
    const debounceAPIRequest: Function = useDebounce(fetchAPI);

    const loadMatchedOptions = (): JSX.Element | JSX.Element[] => {
        let matchedOptions: JSX.Element[] = [];

        response.forEach((option, index) => {
            const result: JSX.Element | null = getMatchedOption(searchString, option, index);
            if (result && result.props.children[0]) {
                matchedOptions.push(result)
            }
        })

        if (!matchedOptions.length && searchString && !isLoading) return <>{NO_RESULTS_FOUND}</>;
        return matchedOptions;
    }

    return (
        <div className="input-wrapper">
            <Input placeholder="search unversities here..." value={searchString} onChange={handleChange} />
            <Loader isLoading={isLoading} />
            <div className="results">
                {loadMatchedOptions()}
            </div>
        </div>
    )
}

export default SearchInput;