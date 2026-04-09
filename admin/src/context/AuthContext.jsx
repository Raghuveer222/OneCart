import { createContext } from "react";

// ✅ Create context
export const AuthContext = createContext();

// ✅ Provider
const AuthProvider = ({ children }) => {
  const serverUrl = "https://onecart-backend-7ely.onrender.com";

  return (
    <AuthContext.Provider value={{ serverUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
