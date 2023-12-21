import React, { createContext, ReactNode } from "react";

interface AppContextType {
  bookmarks: string[];
  addToBookmarks: (id: string) => void;
  removeFromBookmarks: (id: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [bookmarks, setBookmarks] = React.useState<string[]>([]);

  const addToBookmarks = (id: string) => {
    setBookmarks((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeFromBookmarks = (id: string) => {
    setBookmarks((prev) => {
      if (!prev.includes(id)) return prev;
      return prev.filter((item) => item !== id);
    });
  };

  const contextValue: AppContextType = {
    bookmarks,
    addToBookmarks,
    removeFromBookmarks,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
