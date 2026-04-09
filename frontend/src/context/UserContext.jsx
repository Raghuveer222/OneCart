import React from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "./AuthContext";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  let [userData, setUserData] = useState(null);
  let { serverUrl } = useContext(AuthDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/getCurrentUser", {
        withCredentials: true,
      });

      setUserData(result.data);
    } catch (error) {
      // ✅ handle 401 properly
      if (error.response && error.response.status === 401) {
        setUserData(null); // user not logged in
      } else {
        console.log("Error fetching user data:", error);
      }
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <div>
      <UserDataContext.Provider value={value}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
