import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import { debounce } from "../utils/util";

const delay: number = 300;

// Took reference from : https://www.developerway.com/posts/debouncing-in-react to
// write below useDebounce hook as this takes a callback function and calls it in
// an efficient way without recreating for every state update from the parent by
// assinging it to ref and getting latest state from the callback function by calling it.


const useDebounce = (callback: Function) => {

    const ref = useRef<Function>();

    useEffect(() => {
        ref.current = callback;
    }, [callback])

    const memoisedDebounce = useMemo(() => {
        const func = (args: ChangeEvent) => {
            ref.current?.(args);
        }
        return debounce(func, delay)
    }, [])

    return memoisedDebounce
}

export default useDebounce;