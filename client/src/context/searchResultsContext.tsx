import { createContext } from "react";

type SearchResultsType = any;

export const SearchResultsContext = createContext<SearchResultsType | null>(null);