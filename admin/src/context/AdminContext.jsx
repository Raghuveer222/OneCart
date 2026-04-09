import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

// ✅ Context
export const AdminContext = createContext();

// ✅ Provider
const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);

  const { serverUrl } = useContext(AuthContext);

  const getAdmin = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getAdmin`, {
        withCredentials: true,
      });
      setAdminData(result.data);
      console.log("Admin fetched:", result.data);
    } catch (error) {
      setAdminData(null);
      console.error("Admin fetch failed:", error);
    }
  };

  // ✅ FIX: useEffect outside function
  useEffect(() => {
    getAdmin();
  }, []);

  const value = { adminData, setAdminData, getAdmin };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;
