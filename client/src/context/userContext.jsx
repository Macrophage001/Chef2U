import { useState, createContext } from 'react';

const UserContext = {}
UserContext.context = createContext({
    user: undefined,
});
const Provider = ({ children }) => {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);

    return (
        <UserContext.Provider value={{ user, cart, setUser, setCart }}>
            {children}
        </UserContext.Provider>
    );
};
UserContext.Provider = Provider;
UserContext.ActionTypes = {
    SET_USER: 'SET_USER',
    UPDATE_USER: 'UPDATE_USER',
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    REGISTER_USER: 'REGISTER_USER',
}
UserContext.Reducer = (state, action) => {
    switch (action.type) {
        case UserContext.ActionTypes.SET_USER:
            return { ...state, user: action.payload };
        case UserContext.ActionTypes.UPDATE_USER:
            return { ...state, user: { ...state.user, ...action.payload } };
        case UserContext.ActionTypes.LOGIN_USER:
            return { ...state, user: action.payload };
        case UserContext.ActionTypes.LOGOUT_USER:
            return { ...state, user: {} };
        case UserContext.ActionTypes.REGISTER_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

export default UserContext;
