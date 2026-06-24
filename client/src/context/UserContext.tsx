import { createContext, useContext, useState, type ReactNode } from "react";

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

  const [user, setUser] = useState<User | null>(() => {
    const currentUser = localStorage.getItem("currentUser");

    return currentUser
      ? JSON.parse(currentUser)
      : null;
  });

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