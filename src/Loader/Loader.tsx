import { FC } from "react";
import "./Loader.css";
import { LOADING_MESSAGE } from "../utils/util";


interface LoaderProps {
    isLoading: boolean
}

const Loader: FC<LoaderProps> = ({ isLoading }): JSX.Element | null => {
    if (!isLoading) return null;
    return (
        <>
            <div>{LOADING_MESSAGE}</div>
            <div className='loader'></div>
        </>
    )
}

export default Loader;