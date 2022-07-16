import { createContext } from "react";
import { IUser } from "../interfaces/IUser";
import { IUserState } from "../interfaces/IUserState";

export const OrderContext = createContext({} as IUserState);
