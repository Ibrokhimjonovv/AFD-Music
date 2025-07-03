"use client";

import { createContext, useState } from "react";

// For Provider
const AccessContext = createContext();

const AccessProvider = ({ children }) => {
  const [test, setTest] = useState('test')
  return (
    <AccessContext.Provider
      value={{test}}
    >
      {children}
    </AccessContext.Provider>
  );
};

export { AccessContext, AccessProvider };
