import { createContext } from "react";

// ✅ Create context
export const AuthContext = createContext();

// ✅ Provider
const AuthProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  return (
    <AuthContext.Provider value={{ serverUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;