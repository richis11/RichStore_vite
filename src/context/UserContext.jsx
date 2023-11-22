import React, { createContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [user, SetUser] = useState({});

  return (
    <UserContext.Provider
      value={{
        user,
        SetUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
