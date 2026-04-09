import React, { createContext } from "react";

// 1. Export statement ko consistent rakha hai
export const AuthDataContext = createContext();

function AuthContext({ children }) {
  let serverUrl = "https://onecart-backend-7ely.onrender.com";

  let value = {
    serverUrl,
  };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthContext;
