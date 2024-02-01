import { Option } from "../SearchInput/SearchInput";

const styleMatchedCharcters = (matchedCharacters: string): JSX.Element => {
    return <strong className="matched-words" >{matchedCharacters}</strong>
}

const getMatchedOption = (searchString: string, option: string, index: number): JSX.Element | null => {
    const searchStringLength: number = searchString.length;
    let finalString: JSX.Element | null = null;
    if (!searchStringLength) {
        return null;
    }
    const startMatchIndex = option.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase());
    if (startMatchIndex > -1) {
        const key = option + index;
        const endMatchIndex: number = startMatchIndex + searchStringLength - 1;
        let matchedCharacters: string = '';
        let unMatchedCharacters: string = '';
        if (startMatchIndex == 0) {
            matchedCharacters = option.slice(startMatchIndex, endMatchIndex + 1);
            unMatchedCharacters = option.slice(endMatchIndex + 1);
            finalString =
                <li key={key}>
                    {styleMatchedCharcters(matchedCharacters)}{unMatchedCharacters}
                </li>
        } else if (endMatchIndex == searchStringLength - 1) {
            matchedCharacters = option.slice(startMatchIndex, endMatchIndex + 1);
            unMatchedCharacters = option.slice(0, startMatchIndex)
            finalString =
                <li key={key}>
                    {unMatchedCharacters}{styleMatchedCharcters(matchedCharacters)}
                </li>
        } else {
            matchedCharacters = option.slice(startMatchIndex, endMatchIndex + 1);
            finalString = <li key={key}>
                {option.slice(0, startMatchIndex)}{styleMatchedCharcters(matchedCharacters)}{option.slice(endMatchIndex + 1)}
            </li>
        }
    }

    return finalString
}

const debounce = (fn: Function, delay: number): Function => {
    let timerId: number | ReturnType<typeof setTimeout> | undefined;
    return (...args: any[]) => {
        if (timerId) {
            return;
        }
        timerId = setTimeout(() => {
            fn(...args);
            clearTimeout(timerId)
            timerId = undefined
        }, delay)
    }
}

const NO_RESULTS_FOUND: string = 'No results found';
const LOADING_MESSAGE: string = 'Fetching results...';

export {
    getMatchedOption,
    debounce,
    NO_RESULTS_FOUND,
    LOADING_MESSAGE
}