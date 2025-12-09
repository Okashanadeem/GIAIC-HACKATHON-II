"use client";

import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token"));

  useEffect(() => {
    // Here you would typically validate the token and fetch user data
    if (token) {
      // For now, we'll just set a dummy user if a token exists
      setUser({ username: "testuser" });
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    Cookies.set("token", newToken, { expires: 7 }); // expires in 7 days
  };

  const logout = () => {
    setToken(undefined);
    setUser(null);
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
