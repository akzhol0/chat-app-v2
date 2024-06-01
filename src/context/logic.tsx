import React, { createContext, useState } from "react";
import Cookie from "universal-cookie";
const cookie = new Cookie();

type ContextOverAllProps = {
  children: React.ReactNode;
};

type ContextProps = {
  isAuth: boolean;
  setIsAuth: (arg0: boolean) => void;
};

export const contextData = createContext({} as ContextProps);

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [isAuth, setIsAuth] = useState<boolean>(cookie.get("auth-token"));

  return (
    <contextData.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
