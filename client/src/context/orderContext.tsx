import React, { createContext } from "react";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import { IUser } from "../interfaces/IUser";

export const OrderContext = createContext({} as { user: any, setUser: any });
