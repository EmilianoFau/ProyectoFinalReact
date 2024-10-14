import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useUsers = () => {
    return useContext(UserContext);
}

export function UsersProvider ({ children }) {
    const [users, setUsers] = useState([]);

    return (
        <UserContext.Provider value={{users, setUsers}}>
            {children}
        </UserContext.Provider>
    );
};