import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authIsReady, setAuthIsReady] = useState(false);
  return (
    <AuthContext.Provider value={{ user, setUser, authIsReady, setAuthIsReady }}>
      {children}
    </AuthContext.Provider>
  );
};
