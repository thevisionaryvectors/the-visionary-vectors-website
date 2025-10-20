'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if there's a stored preference
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      const darkMode = JSON.parse(storedDarkMode);
      setIsDarkMode(darkMode);
      document.documentElement.classList.toggle('dark', darkMode);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      console.log('=== Dark mode state changed ===');
      console.log('isDarkMode:', isDarkMode);
      // Update localStorage when dark mode changes
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      // Update document class
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        console.log('Added dark class to html element');
      } else {
        document.documentElement.classList.remove('dark');
        console.log('Removed dark class from html element');
      }
      console.log('HTML element classes:', document.documentElement.classList.toString());
    }
  }, [isDarkMode, mounted]);

  const toggleDarkMode = () => {
    console.log('toggleDarkMode called. Current isDarkMode:', isDarkMode);
    setIsDarkMode((prev) => {
      const newValue = !prev;
      console.log('Setting isDarkMode to:', newValue);
      
      // Immediately update the DOM
      if (newValue) {
        document.documentElement.classList.add('dark');
        console.log('Immediately added dark class');
      } else {
        document.documentElement.classList.remove('dark');
        console.log('Immediately removed dark class');
      }
      localStorage.setItem('darkMode', JSON.stringify(newValue));
      
      return newValue;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}