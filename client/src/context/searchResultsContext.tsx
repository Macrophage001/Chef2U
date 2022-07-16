import { createContext } from "react";
import { IUser } from "../interfaces/IUser";

interface ISearchResultsContext {
    handleClickOnCard: (user: IUser) => void;
}

export const SearchResultsContext = createContext({} as ISearchResultsContext);