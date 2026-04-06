'use client';

import React, { createContext, useContext } from 'react';

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: true,
  toggleDarkMode: () => {},
});

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  return (
    <DarkModeContext.Provider value={{ isDarkMode: true, toggleDarkMode: () => {} }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
