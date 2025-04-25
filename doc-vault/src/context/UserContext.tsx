"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure: npm install jwt-decode

interface UserContextType {
  firstName: string;
  lastName: string;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("idToken");
    if (!token) return;
  
    try {
      const decoded: any = jwtDecode(token);
      setFirstName(decoded?.given_name || "");
      setLastName(decoded?.family_name || "");
    } catch (err) {
      console.error("❌ Error decoding token:", err);
    }
  }, []);
  

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
