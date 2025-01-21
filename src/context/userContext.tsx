import {createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types";


const UserContext = createContext<{
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    change: boolean,
    setChange: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export function UserProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [change, setChange] = useState(true)

    return (
        <UserContext.Provider value={{user, setUser, loading, setLoading, change, setChange}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    return context
}