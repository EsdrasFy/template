"use client";
import React, { createContext, ReactNode, useState } from "react";

type ContextValues = {
  userInfo: any;
  success: boolean;
  setUserInfo: Function;
  setSuccess: Function;
};

const UserContext = createContext<ContextValues | undefined>(undefined);

type AllProviderProps = {
  children: ReactNode;
};

const UserProvider: React.FC<AllProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [success, setSuccess] = useState(false);
  const contextValues: ContextValues = {
    userInfo,
    setUserInfo,
    success,
    setSuccess,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
