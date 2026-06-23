import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type UserProviderProps = {
  children: ReactNode
}

export type User = {
  id: number,
  name: string,
  email: string,
  password: string,
  city: string
}

type UserContextType = {
  user: User | null,
  login: (value: User) => void,
  logout: () => void
}

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);

    localStorage.setItem("currentUser", JSON.stringify(userData));
  }

  const logout = () => {
    setUser(null);

    localStorage.removeItem("currentUser");
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside userProvider")
  }
  return context;
}

export default UserProvider;