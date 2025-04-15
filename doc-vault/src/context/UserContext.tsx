"use client";

import { createContext, useContext, useState } from "react";

interface UserContextType {
  firstName: string;
  lastName: string;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Smith");

  return (
    <UserContext.Provider value={{ firstName, lastName, setFirstName, setLastName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}